/**
 * בדיקות יחידה מקיפות למודול האבטחה (src/utils/security.js)
 */
import {
  generateSalt,
  hashPassword,
  verifyPassword,
  validatePasswordPolicy,
  createPasswordRecord,
  timingSafeEqual,
  getLockoutStatus,
  recordFailedLoginAttempt,
  recordSuccessfulLogin,
  resetRateLimit,
  generateSecureToken,
  computeHashSha256,
  createAdminSession,
  validateAdminSession,
  refreshAdminSession,
  clearAdminSession,
  escapeHtml,
  sanitizeText,
  sanitizeUrl,
  sanitizeCustomerData,
  maskPhoneNumber,
  maskEmail,
  generateOrderChecksum,
  verifyOrderChecksum,
  createSecureBitLink,
  createWhatsAppOrderLink
} from '../src/utils/security.js';

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    console.log(`  [PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`  [FAIL] ${testName}`);
    throw new Error(`Assertion failed: ${testName}`);
  }
}

async function runTests() {
  console.log('🧪 מתחיל הרצת בדיקות אבטחה ל-Mishkan Lev...\n');

  // 1. קריפטוגרפיה, מלח ואימות סיסמה
  console.log('--- 1. בדיקות מלח וגיבוב PBKDF2 ---');
  const salt1 = generateSalt(16);
  const salt2 = generateSalt(16);
  assert(salt1.length === 32, 'Salt 16 בייטים מייצר מחרוזת Hex של 32 תווים');
  assert(salt1 !== salt2, 'שני Salts אקראיים שונים לחלוטין');

  const testPass = 'MishkanLev#2026Secure';
  const hashed = await hashPassword(testPass, salt1, 10000); // 10k iterations for fast unit test
  assert(hashed.length === 64, 'תוצר הגיבוב הוא 256 ביט (64 תווים ב-Hex)');

  const isValidPass = await verifyPassword(testPass, hashed, salt1, 10000);
  assert(isValidPass === true, 'אימות סיסמה נכונה מחזיר true');

  const isWrongPass = await verifyPassword('WrongPassword123!', hashed, salt1, 10000);
  assert(isWrongPass === false, 'אימות סיסמה שגויה מחזיר false');

  const timingOk = timingSafeEqual('abcdef', 'abcdef');
  const timingFail = timingSafeEqual('abcdef', 'abcdeg');
  assert(timingOk === true && timingFail === false, 'timingSafeEqual פועל כשורה');

  // 2. מדיניות חוזק סיסמה
  console.log('\n--- 2. בדיקות מדיניות חוזק סיסמה ---');
  const weakPass1 = validatePasswordPolicy('short');
  assert(weakPass1.isValid === false, 'סיסמה קצרה נפסלת');

  const weakPass2 = validatePasswordPolicy('nouppercase123!');
  assert(weakPass2.isValid === false, 'סיסמה ללא אות גדולה נפסלת');

  const strongPass = validatePasswordPolicy('Jerusalem#Golden2026');
  assert(strongPass.isValid === true, 'סיסמה חזקה ומורכבת מתקבלת בהצלחה');

  const newRecord = await createPasswordRecord('Mishkan@Temple2026');
  assert(newRecord.salt && newRecord.hash && newRecord.iterations === 100000, 'createPasswordRecord מייצר מבנה תקין');

  // 3. מנגנון Brute Force Protection ו-Rate Limit
  console.log('\n--- 3. בדיקות מנגנון Rate Limit ונעילה מדורגת ---');
  resetRateLimit();
  let status = getLockoutStatus();
  assert(status.isLocked === false && status.failedAttempts === 0, 'מצב התחלתי נקי ללא נעילה');

  // 3 נסיונות כושלים
  recordFailedLoginAttempt();
  recordFailedLoginAttempt();
  recordFailedLoginAttempt();
  status = getLockoutStatus();
  assert(status.failedAttempts === 3 && status.isLocked === false, 'אחרי 3 נסיונות המערכת עדיין לא נעולה');

  // ניסיון 4 - נעילת דקה
  recordFailedLoginAttempt();
  status = getLockoutStatus();
  assert(status.isLocked === true && status.remainingSeconds > 0, 'בניסיון 4 נכנסת נעילה פעילה');

  // איפוס אחרי הצלחה
  recordSuccessfulLogin();
  status = getLockoutStatus();
  assert(status.isLocked === false && status.failedAttempts === 0, 'התחברות מוצלחת מאפסת את הנעילה');

  // 4. ניהול סשנים עם תוקף מוגבל (TTL)
  console.log('\n--- 4. בדיקות ניהול סשן מאובטח (TTL) ---');
  clearAdminSession();
  const session = await createAdminSession('admin_moshe', 60);
  assert(session.token.length === 64, 'טוקן סשן נוצר באורך 64 תווים Hex');
  assert(session.expiresAt > session.createdAt, 'תאריך תפוגה מאוחר מתאריך היצירה');

  const validCheck = await validateAdminSession();
  assert(validCheck.isValid === true && validCheck.session.adminId === 'admin_moshe', 'סשן פעיל מאומת בהצלחה');

  // זיוף חתימה
  const tamperedSession = { ...session, expiresAt: session.expiresAt + 1000000 };
  const tamperedCheck = await validateAdminSession(tamperedSession);
  assert(tamperedCheck.isValid === false, 'סשן עם שינוי תאריכים נפסל עקב אי-התאמת חתימה');

  const refreshed = await refreshAdminSession(30);
  assert(refreshed === true, 'רענון סשן קיים הצליח');

  clearAdminSession();
  const afterLogout = await validateAdminSession();
  assert(afterLogout.isValid === false, 'לאחר clearAdminSession אין סשן פעיל');

  // 5. חיטוי קלטים ומניעת XSS
  console.log('\n--- 5. בדיקות חיטוי קלטים ומניעת XSS ---');
  const dirtyHtml = '<script>alert("XSS")</script>תכשיט יפה';
  const cleanHtml = escapeHtml(dirtyHtml);
  assert(!cleanHtml.includes('<script>') && cleanHtml.includes('&lt;script&gt;'), 'escapeHtml ממיר תגיות סקריפט בבטחה');

  const dirtyText = '  <b>שלום</b>\x00\x07 עולם!  ';
  const sanitizedText = sanitizeText(dirtyText, 20);
  assert(sanitizedText === 'שלום עולם!', 'sanitizeText מסיר תגיות ותווי בקרה ומחטא רווחים');

  const safeUrl1 = sanitizeUrl('https://mishkanlev.co.il/product/1');
  const badUrl = sanitizeUrl('javascript:alert(document.cookie)');
  assert(safeUrl1.startsWith('https://'), 'URL חוקי נשמר');
  assert(badUrl === '#', 'URL עם פרוטוקול javascript נחסם ומוחלף ב-#');

  const customerInput = {
    fullName: '<img src=x onerror=alert(1)> דוד כהן',
    phone: '054-123-4567',
    email: 'DAVID@EXAMPLE.COM',
    address: 'רחוב יפו 15 <script>',
    notes: 'משלוח בבקשה'
  };
  const sanitizedCustomer = sanitizeCustomerData(customerInput);
  assert(!sanitizedCustomer.fullName.includes('<img'), 'שם לקוח חוטא מתגיות');
  assert(sanitizedCustomer.email === 'david@example.com', 'מייל מנורמל לאותיות קטנות');
  assert(sanitizedCustomer.isEmailValid === true, 'ולידציית מייל תקינה');
  assert(sanitizedCustomer.isPhoneValid === true, 'ולידציית טלפון תקינה');

  // 6. פרטיות לקוח, מסוך נתונים ותשלומים
  console.log('\n--- 6. בדיקות פרטיות, מסוך נתונים ותשלומים ---');
  const maskedPhone = maskPhoneNumber('0501234567');
  assert(maskedPhone === '050-***-4567', 'מסוך טלפון עובד במדויק');

  const maskedEmail = maskEmail('moshe.levi@mishkan.co.il');
  assert(maskedEmail.startsWith('m***i@'), 'מסוך דוא"ל מגן על התיבה');

  // בדיקת חותמת עסקה (Order Checksum)
  const cartItems = [
    { id: 'p1', price: 280, quantity: 1 },
    { id: 'p2', price: 350, quantity: 2 }
  ];
  const orderChecksum = await generateOrderChecksum(cartItems, 980, 'ORD-1001');
  assert(orderChecksum.length === 64, 'נוצרה חותמת עסקה ב-SHA-256');

  const isOrderAuthentic = await verifyOrderChecksum(cartItems, 980, 'ORD-1001', orderChecksum);
  assert(isOrderAuthentic === true, 'עסקה אותנטית מאומתת בהצלחה');

  const isTamperedOrder = await verifyOrderChecksum(cartItems, 500, 'ORD-1001', orderChecksum);
  assert(isTamperedOrder === false, 'ניסיון שינוי סכום זוהה ונפסל במדויק');

  // קישורי תשלום Bit ו-WhatsApp
  const bitLink = createSecureBitLink('0501234567', 980, 'ORD-1001');
  assert(bitLink.startsWith('https://bitpay.co.il/app/pay?phone=0501234567&amount=980.00'), 'קישור Bit נוצר תקין ומחוטא');

  const waLink = createWhatsAppOrderLink('972501234567', {
    orderId: 'ORD-1001',
    customer: sanitizedCustomer,
    items: cartItems,
    totalAmount: 980
  });
  assert(waLink.startsWith('https://wa.me/972501234567?text='), 'קישור WhatsApp נוצר עם טקסט מקודד');

  console.log(`\n🎉 כל ${passedTests}/${totalTests} בדיקות האבטחה עברו בהצלחה מלאה!`);
}

runTests().catch((err) => {
  console.error('❌ שגיאה בבדיקות האבטחה:', err);
  process.exit(1);
});
