/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🏛️ משכן לב (Mishkan Lev) — קובץ הגדרות ראשי של האתר
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * כל פרטי האתר, הטלפונים, המחירים והתכשיטים מרוכזים בקובץ זה.
 * כדי לעדכן מספר טלפון ל-Bit, מספר וואטסאפ או מחיר שרשרת — 
 * פשוט עורכים את הערך הרצוי ושומרים את הקובץ.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};
const BASE = env.BASE_URL || '/';
const getImg = (name) => `${BASE}images/products/${name}`;

// ברירות מחדל בטוחות (הערכים מוחלפים אוטומטית מ-.env.local)
const defaultPhone = "050-1234567";
const defaultWa = "972501234567";
const defaultEmail = "contact@mishkan-lev.co.il";

export const siteConfig = {
  // פרטי המותג הראשיים
  brand: {
    name: env.VITE_BRAND_NAME || "משכן לב",
    tagline: "תכשיטי בית המקדש וירושלים",
    badge: "סדרת תכשיטי מקדש וירושלים — מהדורה בלעדית",
    announcement: "תכשיטי בית המקדש וירושלים • תשלום ישיר ב-Bit • משלוח לכל חלקי הארץ",
    businessId: env.VITE_BUSINESS_ID || "", // מספר ע.מ. / ח.פ. / עוסק פטור
    businessLegalName: env.VITE_BUSINESS_LEGAL_NAME || "משכן לב"
  },

  // החזון והשליחות שמאחורי היצירה
  vision: {
    title: "כיסופים למקדש ולבניין ירושלים",
    subtitle: "תכשיטים הנושאים את יופייה וקדושתה של עיר הקודש קרוב אל הלב",
    lead: "ב'משכן לב' אנו מבקשים לחבר בין יופייה של ירושלים לבין חיי היום-יום. התכשיטים נוצרו מתוך אהבה עמוקה למקדש ורצון לשאת תזכורת חיה ומתמדת לעיר שחוברה לה יחדיו.",
    quote: "אִם אֶשְׁכָּחֵךְ יְרוּשָׁלָ‍ִם תִּשְׁכַּח יְמִינִי, תִּדְבַּק לְשׁוֹנִי לְחִכִּי אִם לֹא אֶזְכְּרֵכִי...",
    quoteSource: "תהילים קל\"ז, ה'-ו'"
  },

  // פרטי יצירת קשר וסליקה (נטענים באופן מאובטח מ-.env.local ללא חשיפה ב-Git)
  contact: {
    // מספר הטלפון אליו הלקוחות יעבירו תשלום ב-Bit
    bitPhone: env.VITE_BIT_PHONE || env.VITE_PHONE || defaultPhone,
    bitRecipientName: env.VITE_BIT_RECIPIENT || "משכן לב",

    // מספר WhatsApp לקבלת הזמנות ופניות (בפורמט בינלאומי ללא פלוס וללא מקפים)
    whatsappPhone: env.VITE_WHATSAPP_PHONE || (env.VITE_PHONE ? env.VITE_PHONE.replace(/\D/g, '').replace(/^0/, '972') : defaultWa),
    
    // מספר לתצוגה באתר
    displayPhone: env.VITE_DISPLAY_PHONE || env.VITE_PHONE || defaultPhone,
    phone: env.VITE_PHONE || defaultPhone,

    // כתובת דוא"ל
    email: env.VITE_EMAIL || defaultEmail,
    address: env.VITE_ADDRESS || "ירושלים, ישראל",

    // פרטי רכז נגישות
    accessibilityCoordinatorName: env.VITE_A11Y_NAME || "הנהלת משכן לב",
    accessibilityPhone: env.VITE_A11Y_PHONE || env.VITE_PHONE || defaultPhone,
    accessibilityEmail: env.VITE_A11Y_EMAIL || env.VITE_EMAIL || defaultEmail
  },

  // מדיניות שילוח ואחריות
  shipping: {
    standardFee: 25,
    freeThreshold: 150,
    estimatedTime: "3-7 ימי עסקים לכל חלקי הארץ"
  },

  // קטלוג 4 השרשראות — מחירים מוחלטים ואותנטיים
  products: [
    {
      id: "silver-jerusalem-temple",
      name: 'שרשרת "עולים לירושלים"',
      subtitle: 'דגם שער המקדש ועולי הרגל',
      price: 35,
      images: [
        getImg('silver_temple_main.jpg'),
        getImg('silver_temple_pomegranate.jpg'),
        getImg('silver_temple_slate.jpg'),
        getImg('silver_temple_wide.jpg')
      ]
    },
    {
      id: "gold-jerusalem-gates",
      name: 'שרשרת "שערי ירושלים"',
      subtitle: 'דגם פנורמת חומות ירושלים ושער המקדש',
      price: 45,
      images: [
        getImg('gold_gates_arch.jpg'),
        getImg('gold_gates_flatlay.jpg'),
        getImg('gold_gates_macro.jpg'),
        getImg('gold_gates_linen.jpg')
      ]
    },
    {
      id: "gold-heart-jerusalem",
      name: 'תליון "אם אשכחך ירושלים"',
      subtitle: 'דגם חצי לב, שער המקדש ופסוק הזיכרון',
      price: 50,
      images: [
        getImg('gold_heart_stone.jpg'),
        getImg('gold_heart_cushion.jpg'),
        getImg('gold_heart_blossom.jpg'),
        getImg('gold_heart_wide.jpg')
      ]
    },
    {
      id: "gold-temple-crown",
      name: 'שרשרת "כתר המקדש"',
      subtitle: 'דגם חזית המקדש ומגדלי החומה',
      price: 25,
      images: [
        getImg('gold_crown_wood.jpg'),
        getImg('gold_crown_linen.jpg'),
        getImg('gold_crown_sunlight.jpg'),
        getImg('gold_crown_wide.jpg')
      ]
    }
  ]
};
