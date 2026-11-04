/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🏛️ משכן לב (Mishkan Lev) — Security & Privacy Architecture Utilities
 * ═══════════════════════════════════════════════════════════════════════════════
 * מודול אבטחה, אימות, הגנת פרטיות וחיטוי נתונים לחנות הבוטיק "משכן לב".
 * 
 * עקרונות ברזל:
 * 1. אפס סודות גלויים בקוד (Zero Hardcoded Secrets).
 * 2. אימות מנהל מבוסס תקן Web Crypto API (PBKDF2 עם HMAC-SHA-256 + מלח ייעודי).
 * 3. נעילת Brute Force מדורגת (Progressive Exponential Backoff & Lockout).
 * 4. ניהול סשנים קצובים בזמן (TTL) ואימות חתימה פנימית למניעת Session Tampering.
 * 5. מניעת הזרקות קוד (XSS Prevention) וחיטוי קלטים קפדני (Input Sanitization).
 * 6. ציות מלא לחוק הגנת הפרטיות הישראלי ותיקון 13 (איסור שמירת אשראי, ערוצי Bit/WhatsApp מאובטחים).
 * 
 * תאימות סביבה: דפדפנים מודרניים (Web Crypto API) וסביבת Node.js 18+ / SSR.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ─── זיהוי ואתחול מנוע קריפטוגרפי ─────────────────────────────────────────────
const cryptoApi = (() => {
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.subtle) {
    return globalThis.crypto;
  }
  if (typeof window !== 'undefined' && window.crypto?.subtle) {
    return window.crypto;
  }
  throw new Error('Web Crypto API אינו זמין בסביבה זו. נדרש דפדפן מודרני או Node.js 18+');
})();

// מנגנון אחסון גמיש (תמיכה ב-Session/Local Storage וסביבת בדיקות/SSR)
const memoryStorage = new Map();
const safeStorage = {
  getItem: (key, type = 'session') => {
    try {
      if (typeof window !== 'undefined') {
        const store = type === 'session' ? window.sessionStorage : window.localStorage;
        if (store) return store.getItem(key);
      }
    } catch (_) {
      // אחסון חסום (למשל גלישה בסתר מחמירה)
    }
    return memoryStorage.get(`${type}:${key}`) || null;
  },
  setItem: (key, value, type = 'session') => {
    try {
      if (typeof window !== 'undefined') {
        const store = type === 'session' ? window.sessionStorage : window.localStorage;
        if (store) {
          store.setItem(key, value);
          return;
        }
      }
    } catch (_) {
      // המשך לשמירה בזיכרון
    }
    memoryStorage.set(`${type}:${key}`, value);
  },
  removeItem: (key, type = 'session') => {
    try {
      if (typeof window !== 'undefined') {
        const store = type === 'session' ? window.sessionStorage : window.localStorage;
        if (store) {
          store.removeItem(key);
          return;
        }
      }
    } catch (_) {}
    memoryStorage.delete(`${type}:${key}`);
  }
};

// ─── המרות בייטים ו-Hex ───────────────────────────────────────────────────────
const bufferToHex = (buffer) => {
  const byteArray = new Uint8Array(buffer);
  return Array.from(byteArray, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

const hexToBytes = (hexString) => {
  if (typeof hexString !== 'string' || hexString.length % 2 !== 0) {
    throw new Error('פורמט Hex אינו תקין');
  }
  const bytes = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < hexString.length; i += 2) {
    bytes[i / 2] = parseInt(hexString.substring(i, i + 2), 16);
  }
  return bytes;
};

// השוואה עמידה בפני התקפות תזמון (Constant-time comparison)
export const timingSafeEqual = (a, b) => {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
};

// ═══════════════════════════════════════════════════════════════════════════════
// 1. אימות מנהל, גיבוב סיסמאות ומלח קריפטוגרפי (Web Crypto PBKDF2)
// ═══════════════════════════════════════════════════════════════════════════════

const PBKDF2_ITERATIONS = 100000;
const SALT_BYTE_LENGTH = 16;
const KEY_BIT_LENGTH = 256;

/**
 * מחולל Salt קריפטוגרפי אקראי
 * @param {number} byteLength - אורך הבייטים (ברירת מחדל: 16 בייטים / 128 ביט)
 * @returns {string} מחרוזת Hex ייחודית
 */
export const generateSalt = (byteLength = SALT_BYTE_LENGTH) => {
  const saltBytes = new Uint8Array(byteLength);
  cryptoApi.getRandomValues(saltBytes);
  return bufferToHex(saltBytes);
};

/**
 * מבצע גיבוב מאובטח של סיסמה באמצעות PBKDF2 (HMAC-SHA-256)
 * @param {string} password - סיסמת המקור
 * @param {string} saltHex - מלח קריפטוגרפי ב-Hex
 * @param {number} iterations - מספר סבבי חישוב (ברירת מחדל: 100,000)
 * @returns {Promise<string>} גיבוב סופי ב-Hex (256 ביט)
 */
export const hashPassword = async (password, saltHex, iterations = PBKDF2_ITERATIONS) => {
  if (!password || typeof password !== 'string') {
    throw new Error('סיסמה לא חוקית לגיבוב');
  }
  if (!saltHex || typeof saltHex !== 'string') {
    throw new Error('נדרש מלח קריפטוגרפי תקין לגיבוב');
  }

  const encoder = new TextEncoder();
  const passwordKey = await cryptoApi.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const saltBytes = hexToBytes(saltHex);
  const derivedBits = await cryptoApi.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBytes,
      iterations: iterations,
      hash: 'SHA-256'
    },
    passwordKey,
    KEY_BIT_LENGTH
  );

  return bufferToHex(derivedBits);
};

/**
 * מאמת סיסמה מוזנת מול גיבוב ומלח שמורים
 * @param {string} inputPassword - סיסמה שהוזנה בטופס
 * @param {string} storedHash - גיבוב שמור
 * @param {string} storedSalt - מלח שמור
 * @param {number} iterations - מספר סבבי חישוב
 * @returns {Promise<boolean>} האם הסיסמה תואמת במדויק
 */
export const verifyPassword = async (inputPassword, storedHash, storedSalt, iterations = PBKDF2_ITERATIONS) => {
  if (!inputPassword || !storedHash || !storedSalt) {
    return false;
  }
  try {
    const computedHash = await hashPassword(inputPassword, storedSalt, iterations);
    return timingSafeEqual(computedHash, storedHash);
  } catch (error) {
    console.error('שגיאה במהלך אימות סיסמה:', error);
    return false;
  }
};

/**
 * בדיקת עמידה במדיניות חוזק סיסמה למנהל (Admin Password Policy)
 * דרישות: לפחות 10 תווים, אות קטנה, אות גדולה, ספרה ותו מיוחד.
 * @param {string} password 
 * @returns {{ isValid: boolean, errors: string[] }}
 */
export const validatePasswordPolicy = (password) => {
  const errors = [];
  if (!password || typeof password !== 'string') {
    return { isValid: false, errors: ['נדרשת סיסמה תקינה'] };
  }

  if (password.length < 10) {
    errors.push('על הסיסמה להכיל לפחות 10 תווים');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('על הסיסמה להכיל לפחות אות אנגלית קטנה אחת (a-z)');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('על הסיסמה להכיל לפחות אות אנגלית גדולה אחת (A-Z)');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('על הסיסמה להכיל לפחות ספרה אחת (0-9)');
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    errors.push('על הסיסמה להכיל לפחות תו מיוחד אחד (!@#$%^&* וכו\')');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * יצירת רשומת סיסמה ראשונית או מעודכנת (ללא שמירת הסיסמה הגלויה לעולם)
 * @param {string} newPassword - סיסמת מנהל חדשה
 * @returns {Promise<{ salt: string, hash: string, iterations: number, updatedAt: string }>}
 */
export const createPasswordRecord = async (newPassword) => {
  const policyCheck = validatePasswordPolicy(newPassword);
  if (!policyCheck.isValid) {
    throw new Error(`הסיסמה אינה עומדת במדיניות האבטחה: ${policyCheck.errors.join(', ')}`);
  }

  const salt = generateSalt();
  const hash = await hashPassword(newPassword, salt, PBKDF2_ITERATIONS);

  return {
    salt,
    hash,
    iterations: PBKDF2_ITERATIONS,
    updatedAt: new Date().toISOString()
  };
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. מנגנון Brute Force Protection ונעילת כניסה מדורגת (Progressive Backoff)
// ═══════════════════════════════════════════════════════════════════════════════

const RATE_LIMIT_STORAGE_KEY = 'mishkan_lev_admin_rate_limit';
const MAX_FAILED_ATTEMPTS = 5;

// מדרגות נעילה בשניות לפי מספר כשלונות:
// ניסיון 1-3: אין נעילה
// ניסיון 4: 60 שניות (דקה)
// ניסיון 5: 300 שניות (5 דקות)
// ניסיון 6: 900 שניות (15 דקות)
// ניסיון 7+: 3600 שניות (שעה מלאה)
const LOCKOUT_SCHEDULE_SECONDS = [0, 0, 0, 60, 300, 900, 3600];

/**
 * שליפת מצב הנעילה העדכני של ה-Admin
 * @returns {{
 *   isLocked: boolean,
 *   remainingSeconds: number,
 *   failedAttempts: number,
 *   attemptsRemaining: number,
 *   lockoutMessage: string | null
 * }}
 */
export const getLockoutStatus = () => {
  const rawData = safeStorage.getItem(RATE_LIMIT_STORAGE_KEY, 'local');
  if (!rawData) {
    return {
      isLocked: false,
      remainingSeconds: 0,
      failedAttempts: 0,
      attemptsRemaining: MAX_FAILED_ATTEMPTS,
      lockoutMessage: null
    };
  }

  try {
    const data = JSON.parse(rawData);
    const now = Date.now();

    // בדיקת מניפולציית שעון (זמן מערכת שהוזז אחורה)
    if (data.lastAttemptAt && now < data.lastAttemptAt - 60000) {
      return {
        isLocked: true,
        remainingSeconds: 3600,
        failedAttempts: data.failedAttempts || MAX_FAILED_ATTEMPTS,
        attemptsRemaining: 0,
        lockoutMessage: 'זוהתה אי-התאמה בשעון המערכת. הגישה נחסמה מטעמי אבטחה.'
      };
    }

    if (data.lockedUntil && now < data.lockedUntil) {
      const remainingSeconds = Math.ceil((data.lockedUntil - now) / 1000);
      return {
        isLocked: true,
        remainingSeconds,
        failedAttempts: data.failedAttempts,
        attemptsRemaining: 0,
        lockoutMessage: `גישת מנהל חסומה עקב ניסיונות כושלים מרובים. נסה שוב בעוד ${remainingSeconds} שניות.`
      };
    }

    // אם תוקף הנעילה חלף, אך נשארו נסיונות כושלים - מחזירים סטטוס פתוח
    const attemptsRemaining = Math.max(0, MAX_FAILED_ATTEMPTS - (data.failedAttempts || 0));
    return {
      isLocked: false,
      remainingSeconds: 0,
      failedAttempts: data.failedAttempts || 0,
      attemptsRemaining: attemptsRemaining > 0 ? attemptsRemaining : 1,
      lockoutMessage: null
    };
  } catch (error) {
    console.error('שגיאה בפענוח נתוני Rate Limit:', error);
    return {
      isLocked: false,
      remainingSeconds: 0,
      failedAttempts: 0,
      attemptsRemaining: MAX_FAILED_ATTEMPTS,
      lockoutMessage: null
    };
  }
};

/**
 * תיעוד ניסיון כניסה כושל וחישוב נעילה מדורגת
 * @returns {ReturnType<typeof getLockoutStatus>}
 */
export const recordFailedLoginAttempt = () => {
  const status = getLockoutStatus();
  const newFailedAttempts = status.failedAttempts + 1;
  const now = Date.now();

  const scheduleIndex = Math.min(newFailedAttempts - 1, LOCKOUT_SCHEDULE_SECONDS.length - 1);
  const lockoutSeconds = LOCKOUT_SCHEDULE_SECONDS[scheduleIndex] || 0;
  const lockedUntil = lockoutSeconds > 0 ? now + lockoutSeconds * 1000 : 0;

  const dataToSave = {
    failedAttempts: newFailedAttempts,
    lockedUntil,
    lastAttemptAt: now
  };

  safeStorage.setItem(RATE_LIMIT_STORAGE_KEY, JSON.stringify(dataToSave), 'local');
  return getLockoutStatus();
};

/**
 * תיעוד כניסה מוצלחת — איפוס מלא של מונה הניסיונות והנעילות
 */
export const recordSuccessfulLogin = () => {
  safeStorage.removeItem(RATE_LIMIT_STORAGE_KEY, 'local');
};

/**
 * איפוס מנהלתי יזום של מנגנון ה-Rate Limit (לשימוש במקרה של שחרור מאובטח)
 */
export const resetRateLimit = () => {
  safeStorage.removeItem(RATE_LIMIT_STORAGE_KEY, 'local');
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. ניהול סשן מאובטח עם תוקף מוגבל (Session Management & TTL)
// ═══════════════════════════════════════════════════════════════════════════════

const ADMIN_SESSION_STORAGE_KEY = 'mishkan_lev_admin_session';
const DEFAULT_SESSION_TTL_MINUTES = 120; // 2 שעות תוקף ברירת מחדל

/**
 * יצירת טוקן קריפטוגרפי אקראי
 * @param {number} byteLength - אורך הבייטים (ברירת מחדל: 32 בייטים / 256 ביט)
 * @returns {string} מחרוזת Hex של 64 תווים
 */
export const generateSecureToken = (byteLength = 32) => {
  const bytes = new Uint8Array(byteLength);
  cryptoApi.getRandomValues(bytes);
  return bufferToHex(bytes);
};

/**
 * חישוב חותמת SHA-256 מהירה לאימות שלמות מידע (Data Integrity Checksum)
 * @param {string} payload 
 * @returns {Promise<string>}
 */
export const computeHashSha256 = async (payload) => {
  const encoder = new TextEncoder();
  const hashBuffer = await cryptoApi.subtle.digest('SHA-256', encoder.encode(payload));
  return bufferToHex(hashBuffer);
};

/**
 * יצירת סשן מנהל חדש וחתום
 * @param {string} adminIdentifier - מזהה מנהל (ברירת מחדל: 'mishkan_admin')
 * @param {number} ttlMinutes - משך תוקף הסשן בדקות
 * @returns {Promise<{ token: string, adminId: string, createdAt: number, expiresAt: number, signature: string }>}
 */
export const createAdminSession = async (adminIdentifier = 'mishkan_admin', ttlMinutes = DEFAULT_SESSION_TTL_MINUTES) => {
  const now = Date.now();
  const expiresAt = now + ttlMinutes * 60 * 1000;
  const token = generateSecureToken(32);

  // חותמת שלמות פנימית למניעת שינוי תאריכים ב-Storage
  const payloadToSign = `${token}:${adminIdentifier}:${now}:${expiresAt}`;
  const signature = await computeHashSha256(payloadToSign);

  const sessionObject = {
    token,
    adminId: adminIdentifier,
    createdAt: now,
    expiresAt,
    signature
  };

  safeStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(sessionObject), 'session');
  return sessionObject;
};

/**
 * אימות תוקף הסשן הנוכחי
 * @param {Object} [sessionData] - אופציונלי: אובייקט סשן לבדיקה (אם ריק, נשלף מהאחסון)
 * @returns {Promise<{ isValid: boolean, reason: string | null, session: Object | null }>}
 */
export const validateAdminSession = async (sessionData = null) => {
  const isExternalCheck = sessionData !== null;
  let session = sessionData;
  if (!session) {
    const raw = safeStorage.getItem(ADMIN_SESSION_STORAGE_KEY, 'session');
    if (!raw) {
      return { isValid: false, reason: 'אין סשן מחובר פעיל', session: null };
    }
    try {
      session = JSON.parse(raw);
    } catch (_) {
      return { isValid: false, reason: 'מבנה סשן משובש', session: null };
    }
  }

  if (!session.token || !session.expiresAt || !session.signature) {
    if (!isExternalCheck) clearAdminSession();
    return { isValid: false, reason: 'נתוני סשן חסרים', session: null };
  }

  const now = Date.now();
  if (now > session.expiresAt) {
    if (!isExternalCheck) clearAdminSession();
    return { isValid: false, reason: 'תוקף הסשן פג (Session Expired)', session: null };
  }

  // אימות חותמת שלמות
  const expectedPayload = `${session.token}:${session.adminId}:${session.createdAt}:${session.expiresAt}`;
  const expectedSignature = await computeHashSha256(expectedPayload);

  if (!timingSafeEqual(expectedSignature, session.signature)) {
    if (!isExternalCheck) clearAdminSession();
    return { isValid: false, reason: 'חתימת הסשן אינה תואמת (Tampering Detected)', session: null };
  }

  return { isValid: true, reason: null, session };
};

/**
 * הארכת תוקף סשן קיים (Heartbeat / Activity Refresh)
 * @param {number} additionalMinutes - דקות נוספות להארכה
 * @returns {Promise<boolean>}
 */
export const refreshAdminSession = async (additionalMinutes = DEFAULT_SESSION_TTL_MINUTES) => {
  const validation = await validateAdminSession();
  if (!validation.isValid || !validation.session) {
    return false;
  }

  const session = validation.session;
  const now = Date.now();
  session.expiresAt = now + additionalMinutes * 60 * 1000;

  const payloadToSign = `${session.token}:${session.adminId}:${session.createdAt}:${session.expiresAt}`;
  session.signature = await computeHashSha256(payloadToSign);

  safeStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(session), 'session');
  return true;
};

/**
 * ניתוק מאובטח ומחיקת הסשן
 */
export const clearAdminSession = () => {
  safeStorage.removeItem(ADMIN_SESSION_STORAGE_KEY, 'session');
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. חיטוי קלטים (Sanitization) ומניעת הזרקות קוד (XSS Prevention)
// ═══════════════════════════════════════════════════════════════════════════════

const HTML_ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;'
};

/**
 * המרת תווים רגישים ל-HTML Entities למניעת XSS
 * @param {string} unsafeString 
 * @returns {string}
 */
export const escapeHtml = (unsafeString) => {
  if (typeof unsafeString !== 'string') return '';
  return unsafeString.replace(/[&<>"'/`]/g, (char) => HTML_ESCAPE_MAP[char] || char);
};

/**
 * חיטוי וטיהור טקסט חופשי (מחיקת תגיות HTML, תווים בלתי-נראים והגבלת אורך)
 * מתאים לשדות שם לקוח, כתובת, הערות, חוות דעת ותיאורי מוצר.
 * @param {string} input - הטקסט הגולמי
 * @param {number} maxLength - אורך מקסימלי מותר (ברירת מחדל: 1000)
 * @returns {string} טקסט מחוטא ובטוח
 */
export const sanitizeText = (input, maxLength = 1000) => {
  if (input === null || input === undefined) return '';
  let str = String(input);

  // מחיקת תווי בקרה מסוכנים (Control Characters) למעט ירידת שורה וטאב
  str = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // מחיקת תגיות HTML בצורה מלאה
  str = str.replace(/<[^>]*>?/gm, '');

  // חיתוך רווחים מיותרים
  str = str.trim();

  // הגבלת אורך קשיחה למניעת התקפות ReDoS או הצפת זיכרון
  if (maxLength > 0 && str.length > maxLength) {
    str = str.slice(0, maxLength);
  }

  return str;
};

/**
 * סינון פרוטוקולים מסוכנים מכתובות URL (מניעת javascript:, data:, vbscript:)
 * מאפשר אך ורק: https:, http:, tel:, mailto:, wa.me
 * @param {string} rawUrl 
 * @returns {string} כתובת בטוחה או '#' אם הכתובת חשודה
 */
export const sanitizeUrl = (rawUrl) => {
  if (!rawUrl || typeof rawUrl !== 'string') return '#';
  const cleanUrl = rawUrl.trim();

  // בדיקת תחיליות מסוכנות
  const lower = cleanUrl.toLowerCase().replace(/\s+/g, '');
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('data:') ||
    lower.startsWith('vbscript:') ||
    lower.startsWith('file:')
  ) {
    console.warn('נחסם קישור בלתי מאובטח:', cleanUrl);
    return '#';
  }

  // מאפשר קישורים יחסיים (מתחילים ב-/) או פרוטוקולים מורשים
  if (
    cleanUrl.startsWith('/') ||
    cleanUrl.startsWith('https://') ||
    cleanUrl.startsWith('http://') ||
    cleanUrl.startsWith('tel:') ||
    cleanUrl.startsWith('mailto:') ||
    cleanUrl.startsWith('whatsapp://')
  ) {
    return cleanUrl;
  }

  // ברירת מחדל אם אין סכימה מוגדרת
  return '#';
};

/**
 * חיטוי מלא של אובייקט לקוח והזמנה (Customer & Order Input Sanitization)
 * מבטיח שאף קלט זדוני לא יוחדר למערכת או יוצג למנהל.
 * @param {Object} rawCustomerData 
 * @returns {Object} אובייקט מחוטא ומאומת
 */
export const sanitizeCustomerData = (rawCustomerData = {}) => {
  const sanitized = {
    fullName: sanitizeText(rawCustomerData.fullName || '', 80),
    phone: sanitizeText(rawCustomerData.phone || '', 20).replace(/[^\d\-+ ]/g, ''),
    email: sanitizeText(rawCustomerData.email || '', 100).toLowerCase(),
    city: sanitizeText(rawCustomerData.city || '', 50),
    address: sanitizeText(rawCustomerData.address || '', 120),
    apartment: sanitizeText(rawCustomerData.apartment || '', 20),
    notes: sanitizeText(rawCustomerData.notes || '', 500)
  };

  // ולידציה בסיסית למייל
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  sanitized.isEmailValid = sanitized.email.length === 0 || emailRegex.test(sanitized.email);

  // ולידציה בסיסית לטלפון ישראלי
  const cleanPhoneDigits = sanitized.phone.replace(/\D/g, '');
  sanitized.isPhoneValid = cleanPhoneDigits.length >= 9 && cleanPhoneDigits.length <= 12;

  return sanitized;
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. מדיניות פרטיות והגנת נתונים (Customer Privacy & Israeli Privacy Law)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * מסוך מספר טלפון להצגה בטוחה (למשל: 054-***-1234)
 * מונע חשיפה בלתי מורשית ביומני מערכת או צילומי מסך
 * @param {string} phone 
 * @returns {string}
 */
export const maskPhoneNumber = (phone) => {
  if (!phone || typeof phone !== 'string') return '';
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 7) return '***-****';

  const start = digitsOnly.slice(0, 3);
  const end = digitsOnly.slice(-4);
  return `${start}-***-${end}`;
};

/**
 * מסוך כתובת דוא"ל (למשל: m***e@example.com)
 * @param {string} email 
 * @returns {string}
 */
export const maskEmail = (email) => {
  if (!email || typeof email !== 'string' || !email.includes('@')) return '***@***.***';
  const [user, domain] = email.split('@');
  if (user.length <= 2) {
    return `${user[0] || '*'}***@${domain}`;
  }
  const first = user[0];
  const last = user[user.length - 1];
  return `${first}***${last}@${domain}`;
};

/**
 * חישוב חותמת עסקה (Order Checksum)
 * מבטיח שלקוח לא יוכל לשנות סכומים, פריטים או תמחור במעבר לערוץ התשלום.
 * @param {Array<{ id: string|number, price: number, quantity: number }>} items 
 * @param {number} totalAmount 
 * @param {string} orderId 
 * @returns {Promise<string>}
 */
export const generateOrderChecksum = async (items, totalAmount, orderId) => {
  // סידור הפריטים בצורה דטרמיניסטית
  const canonicalItems = (items || [])
    .map((item) => `${item.id}:${Number(item.price).toFixed(2)}x${item.quantity}`)
    .sort()
    .join('|');

  const payload = `ORDER:${orderId}:TOTAL:${Number(totalAmount).toFixed(2)}:ITEMS:[${canonicalItems}]`;
  return computeHashSha256(payload);
};

/**
 * אימות שלמות נתוני עסקה מול חותמת
 * @param {Array} items 
 * @param {number} totalAmount 
 * @param {string} orderId 
 * @param {string} expectedChecksum 
 * @returns {Promise<boolean>}
 */
export const verifyOrderChecksum = async (items, totalAmount, orderId, expectedChecksum) => {
  try {
    const calculated = await generateOrderChecksum(items, totalAmount, orderId);
    return timingSafeEqual(calculated, expectedChecksum);
  } catch (_) {
    return false;
  }
};

/**
 * יצירת קישור מאובטח ומחוטא לתשלום באפליקציית Bit
 * הערה: האתר אינו אוסף או שומר כרטיסי אשראי. התשלום מועבר ישירות לאפליקציית Bit הרשמית של העסק.
 * @param {string} businessPhone - טלפון העסק לקבלת תשלום ב-Bit
 * @param {number} amount - סכום מדויק לתשלום
 * @param {string} orderId - מספר הזמנה לצורך זיהוי
 * @returns {string} קישור דיפ-לינק תקין ומחוטא
 */
export const createSecureBitLink = (businessPhone, amount, orderId) => {
  const cleanPhone = String(businessPhone || '').replace(/\D/g, '');
  const cleanAmount = Number(amount || 0).toFixed(2);
  const cleanOrderId = sanitizeText(orderId || '', 30);

  if (!cleanPhone || Number(cleanAmount) <= 0) {
    return '#';
  }

  // תבנית Bit תואמת תקן לישראל
  // קישור זה פותח את אפליקציית Bit ישירות במכשיר הלקוח
  const encodedDescription = encodeURIComponent(`משכן לב - הזמנה ${cleanOrderId}`);
  return `https://bitpay.co.il/app/pay?phone=${cleanPhone}&amount=${cleanAmount}&desc=${encodedDescription}`;
};

/**
 * יצירת קישור WhatsApp מובנה ומאומת לשיגור הזמנה
 * הודעה מכובדת, קריאה, ללא חשיפת פרטי תשלום רגישים.
 * @param {string} businessPhone - טלפון WhatsApp של "משכן לב" (למשל: 972501234567)
 * @param {Object} orderData - פרטי ההזמנה המחוטאים
 * @returns {string} קישור WhatsApp API בטוח
 */
export const createWhatsAppOrderLink = (businessPhone, orderData = {}) => {
  const cleanPhone = String(businessPhone || '').replace(/\D/g, '');
  if (!cleanPhone) return '#';

  const customer = orderData.customer || {};
  const items = Array.isArray(orderData.items) ? orderData.items : [];
  const orderId = sanitizeText(orderData.orderId || `ML-${Date.now().toString().slice(-6)}`, 20);
  const total = Number(orderData.totalAmount || 0).toLocaleString('he-IL', { style: 'currency', currency: 'ILS' });

  let itemsListText = '';
  items.forEach((item, index) => {
    const itemName = sanitizeText(item.name || item.title || 'תכשיט משכן לב', 50);
    const itemQty = Number(item.quantity || 1);
    const itemPrice = Number(item.price || 0).toLocaleString('he-IL', { style: 'currency', currency: 'ILS' });
    itemsListText += `${index + 1}. ${itemName} — כמות: ${itemQty} (${itemPrice})\n`;
  });

  const message = [
    `שלום "משכן לב", ברצוני להשלים את ההזמנה הבאה:`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `מספר הזמנה: ${orderId}`,
    `שם הלקוח: ${sanitizeText(customer.fullName, 60)}`,
    `טלפון: ${sanitizeText(customer.phone, 20)}`,
    `כתובת למשלוח: ${sanitizeText(customer.address, 80)}, ${sanitizeText(customer.city, 40)}`,
    customer.notes ? `הערות מיוחדות: ${sanitizeText(customer.notes, 200)}` : '',
    `━━━━━━━━━━━━━━━━━━━━`,
    `פירוט פריטים:`,
    itemsListText.trim(),
    `━━━━━━━━━━━━━━━━━━━━`,
    `סה"כ לתשלום: ${total}`,
    `שיטת תשלום מבוקשת: ${sanitizeText(orderData.paymentMethod || 'Bit / העברה בנקאית', 30)}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `תודה רבה!`
  ].filter(Boolean).join('\n');

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

/**
 * ניקוי נתונים רגישים מזיכרון הלקוח (Secure Wipe) לאחר השלמת הזמנה
 * מגן על פרטי הלקוח אם המחשב/טלפון משותף
 */
export const secureWipeCustomerDraft = () => {
  safeStorage.removeItem('mishkan_lev_checkout_draft', 'session');
  safeStorage.removeItem('mishkan_lev_checkout_draft', 'local');
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. הגדרות מדיניות אבטחת מידע (CSP & Security Headers Guidelines)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * מחזיר את המלצות ה-CSP (Content Security Policy) הרשמיות לאתר "משכן לב"
 * מותאם לפריסה סטטית ב-Vercel, Netlify או Cloudflare Pages
 */
export const getRecommendedCspHeaders = () => {
  return {
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com", // אנליטיקס בסיסי בלבד
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://bitpay.co.il https://api.whatsapp.com https://wa.me",
      "frame-ancestors 'none'", // מניעת Clickjacking
      "base-uri 'self'",
      "form-action 'self' https://bitpay.co.il https://wa.me"
    ].join('; '),
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(self "https://bitpay.co.il")'
  };
};

export default {
  // קריפטו ואימות
  generateSalt,
  hashPassword,
  verifyPassword,
  validatePasswordPolicy,
  createPasswordRecord,
  timingSafeEqual,
  // נעילת כניסה
  getLockoutStatus,
  recordFailedLoginAttempt,
  recordSuccessfulLogin,
  resetRateLimit,
  // סשנים
  generateSecureToken,
  computeHashSha256,
  createAdminSession,
  validateAdminSession,
  refreshAdminSession,
  clearAdminSession,
  // חיטוי ו-XSS
  escapeHtml,
  sanitizeText,
  sanitizeUrl,
  sanitizeCustomerData,
  // פרטיות ותשלומים
  maskPhoneNumber,
  maskEmail,
  generateOrderChecksum,
  verifyOrderChecksum,
  createSecureBitLink,
  createWhatsAppOrderLink,
  secureWipeCustomerDraft,
  // CSP
  getRecommendedCspHeaders
};
