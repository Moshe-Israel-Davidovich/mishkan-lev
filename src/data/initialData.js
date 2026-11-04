/**
 * 🏛️ משכן לב (Mishkan Lev) — נתוני ברירת מחדל של החנות, המוצרים והתכנים
 * 
 * הנתונים ניתנים לעריכה מלאה ע"י המנהל מפאנל הניהול, ונשמרים באופן מקומי ומאובטח.
 */

export const INITIAL_STORE_CONFIG = {
  storeName: "משכן לב",
  tagline: "תכשיטי בית המקדש וירושלים — קדושה ויופי מול הלב",
  announcement: "✨ משלוח מהיר לכל חלקי הארץ | תשלום נוח ומאובטח ב-Bit | אחריות מלאה על כל תכשיט",
  vision: {
    badge: "החזון והשליחות שלנו",
    title: "לחבר את הלב לקדושת ירושלים ולבית המקדש",
    subtitle: "יצירה ישראלית בעבודת יד מוקפדת המשלבת קדושה, זיכרון היסטורי ויופי עדין ביום-יום",
    paragraphs: [
      "ב'משכן לב' אנחנו מאמינים שבית המקדש וירושלים אינם רק זיכרון עתיק מן העבר, אלא מקור חי ופועם של אור, זהות, תקווה וחיבור פנימי עמוק. כל תכשיט בסדרה נוצר מתוך התרגשות, אהבה וכבוד עמוק למסורת הדורות.",
      "השרשראות שלנו מעוצבות בקפידה תוך הקפדה על חומרים מובחרים — כסף סטרלינג 925 וציפויי זהב עמידים בסטנדרט גבוה. הן נועדו להעניק לך, או למי שיקר ללבך, תזכורת יומיומית מוחשית לירושלים השלמה, ליופיה של העיר ולכמיהה התמידית לבית מקדשנו.",
      "כל הזמנה נארזת באהבה בסטודיו שלנו, עם תעודת אחריות מלאה וברכה מכל הלב."
    ],
    features: [
      {
        id: "craft",
        title: "צורפות בוטיק מדויקת",
        desc: "חיתוכי לייזר עדינים וגימור ידני מוקפד בכל מוטיב ושער"
      },
      {
        id: "materials",
        title: "חומרים איכותיים ועמידים",
        desc: "כסף סטרלינג 925 וציפוי זהב 18K עמיד לשמירה לאורך זמן"
      },
      {
        id: "service",
        title: "קשר אישי וישיר",
        desc: "מענה אנושי מהיר ב-WhatsApp, משלוח מהיר ותשלום פשוט ב-Bit"
      }
    ]
  },
  contact: {
    phone: "050-1234567",
    whatsapp: "972501234567",
    bitPhone: "050-1234567",
    bitName: "משכן לב - תכשיטים",
    email: "mishkan.lev.store@gmail.com",
    address: "ירושלים, ישראל",
    operatingHours: "ימים א'-ה': 09:00 - 19:00 | ימי ו': 09:00 - 13:00"
  },
  shipping: {
    standardShippingFee: 25,
    freeShippingThreshold: 150,
    estimatedDays: "3-7 ימי עסקים"
  }
};

export const INITIAL_PRODUCTS = [
  {
    id: "necklace-silver-temple",
    name: 'שרשרת כסף "עולים לירושלים"',
    subtitle: 'שער המקדש עם עולי רגל ועיטורי גפן עדינים',
    price: 35,
    originalPrice: 45,
    category: "כסף סטרלינג 925",
    categorySlug: "silver",
    material: "כסף סטרלינג 925 איכותי בגימור מבריק",
    dimensions: 'רוחב תליון: כ-4.8 ס"מ | אורך שרשרת: 45 ס"מ + 5 ס"מ חוליות הארכה',
    description: 'שרשרת כסף יפהפייה ועדינה, המשלבת את שער המקדש המפואר, צלליות עולי רגל בדרכם לעיר הקודש וסלסול גפן עשיר ומפורט. יצירה המבטאת שמחה, כמיהה וחיבור שורשי.',
    badge: "מומלץ הבוטיק",
    inStock: true,
    rating: 5.0,
    reviewsCount: 18,
    images: [
      "/images/products/item1_original.jpg",
      "/images/products/item1_lifestyle.jpg",
      "/images/products/item1_macro.jpg"
    ]
  },
  {
    id: "necklace-gold-jerusalem-gates",
    name: 'שרשרת זהב "שערי ירושלים"',
    subtitle: 'פנורמת חומות ירושלים עם שער המקדש ולב פנימי',
    price: 45,
    originalPrice: 60,
    category: "ציפוי זהב 18K",
    categorySlug: "gold",
    material: "ציפוי זהב 18K עבה בטכנולוגיה עמידה (Water-Resistant)",
    dimensions: 'רוחב תליון: כ-5.2 ס"מ | אורך שרשרת: 45 ס"מ + 5 ס"מ הארכה',
    description: 'פנורמה מוזהבת ועוצרת נשימה של חומות ירושלים, מגדלי העיר ושער בית המקדש, שבמרכזו מעוצב לב פנימי עדין ומלא משמעות. שרשרת שקוצרת אינסוף מחמאות ומפיצה אור.',
    badge: "הנמכר ביותר 🔥",
    inStock: true,
    rating: 4.9,
    reviewsCount: 32,
    images: [
      "/images/products/item2_original.jpg",
      "/images/products/item2_lifestyle.jpg",
      "/images/products/item2_box.jpg"
    ]
  },
  {
    id: "pendant-gold-heart-jerusalem",
    name: 'תליון לב זהב "אם אשכחך ירושלים"',
    subtitle: 'פסוק הזיכרון השלם בחצי לב וחזית המקדש בחצי לב',
    price: 50,
    originalPrice: 70,
    category: "תליוני לב וקדושה",
    categorySlug: "heart",
    material: "ציפוי זהב 18K איכותי ועמיד לאורך זמן",
    dimensions: 'גובה תליון: 2.8 ס"מ | רוחב: 2.6 ס"מ | שרשרת עדינה 45 ס"מ + 5 ס"מ',
    description: 'תליון לב עמוק ומרגש: צדו האחד כולל חיתוך אותיות קליגרפי מופתי של הפסוק המלא "אם אשכחך ירושלים תשכח ימיני", וצדו השני מציג תבליט מדויק של שער בית המקדש. תכשיט מושלם למתנה לאדם קרוב או לעצמך.',
    badge: "מהדורה מיוחדת ✨",
    inStock: true,
    rating: 5.0,
    reviewsCount: 44,
    images: [
      "/images/products/item3_original.jpg",
      "/images/products/item3_macro.jpg",
      "/images/products/item3_lifestyle.jpg",
      "/images/products/item3_portrait.jpg"
    ]
  },
  {
    id: "necklace-gold-temple-crown",
    name: 'שרשרת זהב "כתר המקדש"',
    subtitle: 'חזית המקדש ומגדלי החומה עם סלסול קשתות מלכותי',
    price: 25,
    originalPrice: 35,
    category: "ציפוי זהב 18K",
    categorySlug: "gold",
    material: "ציפוי זהב 18K מבריק עדין וקל משקל",
    dimensions: 'רוחב תליון: כ-3.8 ס"מ | אורך שרשרת: 42 ס"מ + 5 ס"מ הארכה',
    description: 'תכשיט יומיומי אלגנטי, עדין ונוח לענידה, המציג את חזית בית המקדש המפואר עם עיטורי כתר וסלסולים בסגנון צורפות וינטג\'. אידיאלי לענידה לבד או בשילוב שרשראות (Layering).',
    badge: "מחיר היכרות 🏷️",
    inStock: true,
    rating: 4.8,
    reviewsCount: 15,
    images: [
      "/images/products/item4_original.jpg",
      "/images/products/item4_lifestyle.jpg",
      "/images/products/item4_styled.jpg",
      "/images/products/item4_macro.jpg"
    ]
  }
];

export const CATEGORIES = [
  { id: "all", name: "כל התכשיטים" },
  { id: "gold", name: "ציפוי זהב 18K" },
  { id: "silver", name: "כסף סטרלינג 925" },
  { id: "heart", name: "תליוני לב וקדושה" }
];
