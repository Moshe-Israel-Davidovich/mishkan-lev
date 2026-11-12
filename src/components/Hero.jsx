import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { siteConfig } from '../config';
import { GemIcon } from './Icons';

const BASE = import.meta.env?.BASE_URL || '/';
const getImg = (name) => `${BASE}images/products/${name}`;

const HERO_SHOWCASE_ITEMS = [
  {
    id: 'collection',
    targetId: 'products-section',
    label: 'כל הקולקציה',
    tag: 'קולקציית ירושלים והמקדש',
    title: 'סדרת תכשיטי משכן לב',
    price: 'החל מ-₪25 | משלוח לכל הארץ',
    img: getImg('collection_all_master.jpg'),
    alt: 'קולקציית תכשיטי בית המקדש וירושלים - כל הפריטים יחד'
  },
  {
    id: 'heart',
    targetId: 'product-gold-heart-jerusalem',
    label: 'תליון אם אשכחך',
    tag: 'שער המקדש ופסוק הזיכרון',
    title: 'תליון "אם אשכחך ירושלים"',
    price: '₪50',
    img: getImg('gold_heart_stone.jpg'),
    alt: 'תליון אם אשכחך ירושלים'
  },
  {
    id: 'gates',
    targetId: 'product-gold-jerusalem-gates',
    label: 'שערי ירושלים',
    tag: 'פנורמת חומות ושער המקדש',
    title: 'שרשרת "שערי ירושלים"',
    price: '₪45',
    img: getImg('gold_gates_arch.jpg'),
    alt: 'שרשרת שערי ירושלים'
  },
  {
    id: 'silver',
    targetId: 'product-silver-jerusalem-temple',
    label: 'עולים לירושלים',
    tag: 'עולי הרגל ושער המקדש',
    title: 'שרשרת "עולים לירושלים"',
    price: '₪35',
    img: getImg('silver_temple_pomegranate.jpg'),
    alt: 'שרשרת עולים לירושלים'
  },
  {
    id: 'crown',
    targetId: 'product-gold-temple-crown',
    label: 'כתר המקדש',
    tag: 'חזית המקדש ומגדלי החומה',
    title: 'שרשרת "כתר המקדש"',
    price: '₪25',
    img: getImg('gold_crown_wood.jpg'),
    alt: 'שרשרת כתר המקדש'
  }
];

export function Hero() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);

  // תמונות נעות בפתיח: החלפה אוטומטית חלקה כל 4.2 שניות
  useEffect(() => {
    if (isHeroPaused) return;

    const timer = setInterval(() => {
      setActiveItemIndex((prev) => (prev + 1) % HERO_SHOWCASE_ITEMS.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [isHeroPaused]);

  // סווייפ מגע אינטואיטיבי (Swipe Gestures) למובייל
  const handleHeroTouchStart = (e) => {
    setIsHeroPaused(true);
    if (e.touches && e.touches[0]) {
      setTouchStartX(e.touches[0].clientX);
      setTouchStartY(e.touches[0].clientY);
    }
  };

  const handleHeroTouchEnd = (e) => {
    setIsHeroPaused(false);
    if (touchStartX === null || !e.changedTouches || !e.changedTouches[0]) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;

    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        setActiveItemIndex((prev) => (prev + 1) % HERO_SHOWCASE_ITEMS.length);
      } else {
        setActiveItemIndex((prev) => (prev - 1 + HERO_SHOWCASE_ITEMS.length) % HERO_SHOWCASE_ITEMS.length);
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  // לחיצה על כפתור בחירה: מציגה את התכשיט בתמונה הראשית בלבד (ללא גלילה כפויה)
  const handlePillClick = (idx) => {
    setActiveItemIndex(idx);
    setIsHeroPaused(true); // עוצר החלפה אוטומטית כדי לאפשר התרשמות רגועה מהפריט
  };

  // מעבר ישיר ומדויק לכרטיסיית הפריט — מיקום מאוזן ויפה מתחת לסרגל העליון
  const scrollToProduct = (targetId) => {
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) {
      const navOffset = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const targetY = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth'
      });
      el.classList.add('highlight-target-card');
      setTimeout(() => {
        el.classList.remove('highlight-target-card');
      }, 2200);
    }
  };

  const activeItem = HERO_SHOWCASE_ITEMS[activeItemIndex];

  return (
    <section className="hero-section" aria-label="פתיח חנות משכן לב">
      <div className="hero-container hero-image-first-container">
        
        {/* כותרת מותג תמציתית וייצוגית */}
        <div className="hero-compact-header">
          <div className="hero-badge">
            <GemIcon size={14} />
            <span>משכן לב • ירושלים עיר הקודש</span>
          </div>

          <h1 className="hero-title">
            לענוד את הקודש,
            <span className="hero-title-highlight">לחבר את הלב לירושלים</span>
          </h1>

          <p className="hero-description">
            סדרת תכשיטי בית המקדש, חומות ירושלים ופסוקי הנצח. בחרו דגם לצפייה בתמונה:
          </p>
        </div>

        {/* דבר ראשון: התמונות הנעות והחלפת מבטים */}
        <div 
          className="hero-visual"
          onMouseEnter={() => setIsHeroPaused(true)}
          onMouseLeave={() => setIsHeroPaused(false)}
          onFocus={() => setIsHeroPaused(true)}
          onBlur={() => setIsHeroPaused(false)}
          onTouchStart={handleHeroTouchStart}
          onTouchEnd={handleHeroTouchEnd}
        >
          {/* 1. תצוגת התמונה הראשית של הפריט הנבחר — ראשונה במסך */}
          <div 
            className="hero-image-frame"
            role="region"
            aria-label={`תמונת ${activeItem.title}`}
          >
            <img
              key={activeItem.id}
              src={activeItem.img}
              alt={activeItem.alt}
              className="hero-main-img hero-moving-img"
              loading="eager"
            />
          </div>

          {/* 2. כפתורי בחירת התכשיט — מחזירים למתחת לתמונה בלבד */}
          <div className="hero-switcher" role="tablist" aria-label="בחירת תכשיט לתצוגה">
            {HERO_SHOWCASE_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={idx === activeItemIndex}
                className={`hero-switcher-btn ${idx === activeItemIndex ? 'active' : ''}`}
                onClick={() => handlePillClick(idx)}
                title={`הצגת ${item.label} בתמונה הראשית`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* 3. כפתור גישה יחיד לפריט הנבחר — מוביל למטה רק כשהלקוח מתרשם ומחליט */}
          <button
            type="button"
            className="hero-access-product-btn"
            onClick={() => scrollToProduct(activeItem.targetId)}
            title={`למעבר לפרטי ${activeItem.title} והזמנה`}
          >
            <span>למעבר ל{activeItem.id === 'collection' ? 'כל הקולקציה' : `דגם ${activeItem.label}`} והזמנה</span>
            <ArrowDown size={15} />
          </button>
        </div>

      </div>
    </section>
  );
}
