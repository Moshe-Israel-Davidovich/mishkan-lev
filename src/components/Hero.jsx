import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowDown } from 'lucide-react';
import { siteConfig } from '../config';
import { GemIcon, ShieldIcon, BitIcon, TruckIcon } from './Icons';

const BASE = import.meta.env?.BASE_URL || '/';
const getImg = (name) => `${BASE}images/products/${name}`;

const HERO_SHOWCASE_ITEMS = [
  {
    id: 'collection',
    targetId: 'products-section',
    label: '✨ כל הקולקציה',
    tag: 'קולקציית ירושלים והמקדש',
    title: 'סדרת תכשיטי משכן לב השלמה',
    price: 'החל מ-₪25 | משלוח חינם מעל ₪150',
    img: getImg('collection_all_master.jpg'),
    alt: 'קולקציית תכשיטי בית המקדש וירושלים - כל הפריטים יחד'
  },
  {
    id: 'heart',
    targetId: 'product-gold-heart-jerusalem',
    label: 'תליון אם אשכחך',
    tag: 'מהדורה מיוחדת ✨',
    title: 'תליון לב "אם אשכחך ירושלים"',
    price: '₪50 בלבד',
    img: getImg('gold_heart_stone.jpg'),
    alt: 'תליון לב זהב אם אשכחך ירושלים'
  },
  {
    id: 'gates',
    targetId: 'product-gold-jerusalem-gates',
    label: 'שערי ירושלים',
    tag: 'הנמכר ביותר 🔥',
    title: 'שרשרת "שערי ירושלים"',
    price: '₪45 בלבד',
    img: getImg('gold_gates_arch.jpg'),
    alt: 'שרשרת שערי ירושלים'
  },
  {
    id: 'silver',
    targetId: 'product-silver-jerusalem-temple',
    label: 'עולים לירושלים',
    tag: 'כסף סטרלינג 925 🕊️',
    title: 'שרשרת כסף "עולים לירושלים"',
    price: '₪35 בלבד',
    img: getImg('silver_temple_pomegranate.jpg'),
    alt: 'שרשרת כסף עולים לירושלים'
  },
  {
    id: 'crown',
    targetId: 'product-gold-temple-crown',
    label: 'כתר המקדש',
    tag: 'ציפוי זהב 18K 👑',
    title: 'שרשרת זהב "כתר המקדש"',
    price: '₪25 בלבד',
    img: getImg('gold_crown_wood.jpg'),
    alt: 'שרשרת זהב כתר המקדש'
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

  // לחיצה מובילה ישירות לתכשיט לפי השם או התמונה
  const scrollToProduct = (targetId) => {
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('highlight-target-card');
      setTimeout(() => {
        el.classList.remove('highlight-target-card');
      }, 2200);
    }
  };

  const handlePillClick = (idx, targetId) => {
    setActiveItemIndex(idx);
    scrollToProduct(targetId);
  };

  const activeItem = HERO_SHOWCASE_ITEMS[activeItemIndex];

  return (
    <section className="hero-section" aria-label="פתיח חנות משכן לב">
      <div className="hero-container hero-image-first-container">
        
        {/* כותרת מותג תמציתית */}
        <div className="hero-compact-header">
          <div className="hero-badge">
            <GemIcon size={14} />
            <span>בוטיק משכן לב</span>
          </div>

          <h1 className="hero-title">
            תכשיטי בית המקדש
            <span className="hero-title-highlight">וירושלים</span>
          </h1>

          <p className="hero-description">
            שרשראות כסף סטרלינג 925 וציפוי זהב 18K מובחרים. לחצו על התמונה או על הפריט למעבר ישיר:
          </p>
        </div>

        {/* דבר ראשון: התמונות הנעות (לחיצה מובילה ישירות לתכשיט) */}
        <div 
          className="hero-visual"
          onMouseEnter={() => setIsHeroPaused(true)}
          onMouseLeave={() => setIsHeroPaused(false)}
          onFocus={() => setIsHeroPaused(true)}
          onBlur={() => setIsHeroPaused(false)}
          onTouchStart={handleHeroTouchStart}
          onTouchEnd={handleHeroTouchEnd}
        >
          <div 
            className="hero-image-frame clickable-frame"
            onClick={() => scrollToProduct(activeItem.targetId)}
            role="button"
            tabIndex={0}
            title={`לחצו לצפייה ב-${activeItem.title}`}
          >
            <img
              key={activeItem.id}
              src={activeItem.img}
              alt={activeItem.alt}
              className="hero-main-img hero-moving-img"
              loading="eager"
            />
            <div className="image-click-hint">
              <span>{activeItem.label} – לצפייה בפריט</span>
              <ArrowDown size={14} />
            </div>
          </div>

          {/* לחיצה מובילה ישירות לתכשיט לפי השם */}
          <div className="hero-switcher" role="tablist" aria-label="בחירת מבט ומעבר ישיר לתכשיט">
            {HERO_SHOWCASE_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={idx === activeItemIndex}
                className={`hero-switcher-btn ${idx === activeItemIndex ? 'active' : ''}`}
                onClick={() => handlePillClick(idx, item.targetId)}
                title={`מעבר ישיר ל-${item.label}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* ביטחון ואיכות (רק ביט) */}
        <div className="trust-ribbon">
          <div className="trust-item">
            <ShieldIcon size={18} className="trust-icon" />
            <div>
              <strong>אחריות מלאה</strong>
              <span>איכות החומרים והסוגרים</span>
            </div>
          </div>

          <div className="trust-item">
            <BitIcon size={18} className="trust-icon" />
            <div>
              <strong>תשלום קל ב-Bit</strong>
              <span>העברה ישירה ל-{siteConfig.contact.displayPhone}</span>
            </div>
          </div>

          <div className="trust-item">
            <TruckIcon size={18} className="trust-icon" />
            <div>
              <strong>משלוח מהיר לכל הארץ</strong>
              <span>חינם בהזמנה מעל ₪{siteConfig.shipping.freeThreshold}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
