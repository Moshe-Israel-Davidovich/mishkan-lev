import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Sparkles } from 'lucide-react';
import { siteConfig } from '../config';
import { GemIcon, ShieldIcon, BitIcon, TruckIcon, WhatsAppIcon } from './Icons';

const BASE = import.meta.env?.BASE_URL || '/';
const getImg = (name) => `${BASE}images/products/${name}`;

const HERO_SHOWCASE_ITEMS = [
  {
    id: 'collection',
    label: 'כל הקולקציה ✨',
    tag: 'קולקציית ירושלים והמקדש',
    title: 'סדרת תכשיטי משכן לב השלמה',
    price: 'החל מ-₪25 | משלוח חינם מעל ₪150',
    img: getImg('collection_all_master.jpg'),
    alt: 'קולקציית תכשיטי בית המקדש וירושלים - כל הפריטים יחד על אבן ירושלמית ועץ זית'
  },
  {
    id: 'heart',
    label: 'תליון אם אשכחך',
    tag: 'מהדורה מיוחדת ✨',
    title: 'תליון לב "אם אשכחך ירושלים"',
    price: '₪50 בלבד',
    img: getImg('gold_heart_stone.jpg'),
    alt: 'תליון לב זהב אם אשכחך ירושלים על אבן ירושלמית מוארת'
  },
  {
    id: 'gates',
    label: 'שערי ירושלים',
    tag: 'הנמכר ביותר 🔥',
    title: 'שרשרת "שערי ירושלים"',
    price: '₪45 בלבד',
    img: getImg('gold_gates_arch.jpg'),
    alt: 'שרשרת שערי ירושלים תלויה על קשת אבן ירושלמית'
  },
  {
    id: 'silver',
    label: 'עולים לירושלים',
    tag: 'כסף סטרלינג 925 🕊️',
    title: 'שרשרת כסף "עולים לירושלים"',
    price: '₪35 בלבד',
    img: getImg('silver_temple_pomegranate.jpg'),
    alt: 'שרשרת כסף עולים לירושלים על ענף עם פריחת רימונים'
  }
];

export function Hero() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  // תמונות נעות בפתיח: החלפה אוטומטית חלקה כל 4.2 שניות
  useEffect(() => {
    if (isHeroPaused) return;

    const timer = setInterval(() => {
      setActiveItemIndex((prev) => (prev + 1) % HERO_SHOWCASE_ITEMS.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [isHeroPaused]);

  const activeItem = HERO_SHOWCASE_ITEMS[activeItemIndex];

  // קישורים ישירים ל-WhatsApp ולמייל
  const heroWaUrl = `https://wa.me/${siteConfig.contact.whatsappPhone}?text=${encodeURIComponent(
    'שלום משכן לב ✨ הגעתי מדף הנחיתה ואשמח להזמין תכשיט או לקבל פרטים נוספים!'
  )}`;
  const heroMailUrl = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
    'הזמנת תכשיט - פנייה מדף הנחיתה'
  )}&body=${encodeURIComponent(
    'שלום צוות משכן לב,\n\nראיתי את הקולקציה בדף הנחיתה ואשמח לפרטים לגבי הזמנה ותשלום.\n\nשם:\nטלפון:\nתכשיט מבוקש:\n\nתודה!'
  )}`;

  return (
    <section className="hero-section" aria-label="פתיח חנות משכן לב">
      <div className="hero-container">
        
        {/* Hero text */}
        <div className="hero-content">
          
          <div className="hero-badge">
            <GemIcon size={15} />
            <span>{siteConfig.brand.badge}</span>
          </div>

          <h1 className="hero-title">
            לענוד את הקדושה,
            <span className="hero-title-highlight">לחבר את הלב לירושלים</span>
          </h1>

          <p className="hero-description">
            בוטיק תכשיטים ישראלי המביא את יופיו של בית המקדש, חומות ירושלים ופסוקי הנצח לשרשראות כסף סטרלינג 925 וציפוי זהב 18K מובחרים, עמידים ומאירים.
          </p>

          {/* Direct Contact & Order CTA Group */}
          <div className="hero-cta-group">
            <a 
              href={heroWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-wa"
            >
              <WhatsAppIcon size={20} />
              <span>הזמנה מהירה ב-WhatsApp</span>
            </a>

            <a 
              href={heroMailUrl}
              className="btn-hero-mail"
            >
              <Mail size={19} />
              <span>הזמנה במייל</span>
            </a>

            <a href="#products-section" className="btn-hero-secondary">
              <span>לקולקציה המלאה</span>
              <ArrowLeft size={16} />
            </a>
          </div>

          {/* Trust ribbon */}
          <div className="trust-ribbon">
            <div className="trust-item">
              <ShieldIcon size={20} className="trust-icon" />
              <div>
                <strong>אחריות מלאה</strong>
                <span>על איכות החומרים והסוגרים</span>
              </div>
            </div>

            <div className="trust-item">
              <BitIcon size={20} className="trust-icon" />
              <div>
                <strong>תשלום קל ב-Bit</strong>
                <span>העברה ישירה ל-050-1234567</span>
              </div>
            </div>

            <div className="trust-item">
              <TruckIcon size={20} className="trust-icon" />
              <div>
                <strong>משלוחים לכל הארץ</strong>
                <span>חינם בהזמנה מעל ₪{siteConfig.shipping.freeThreshold}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Hero visual — תמונות נעות (Moving Showcase) */}
        <div 
          className="hero-visual"
          onMouseEnter={() => setIsHeroPaused(true)}
          onMouseLeave={() => setIsHeroPaused(false)}
          onTouchStart={() => setIsHeroPaused(true)}
          onTouchEnd={() => setIsHeroPaused(false)}
        >
          <div className="hero-image-frame">
            <img
              key={activeItem.id}
              src={activeItem.img}
              alt={activeItem.alt}
              className="hero-main-img hero-moving-img"
              loading="eager"
            />
            <div className="hero-floating-card">
              <span className="floating-card-tag">{activeItem.tag}</span>
              <span className="floating-card-title">{activeItem.title}</span>
              <span className="floating-card-price">{activeItem.price}</span>
            </div>
          </div>

          {/* Hero interactive switcher */}
          <div className="hero-switcher" role="tablist" aria-label="בחירת מבט קולקציה">
            {HERO_SHOWCASE_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={idx === activeItemIndex}
                className={`hero-switcher-btn ${idx === activeItemIndex ? 'active' : ''}`}
                onClick={() => setActiveItemIndex(idx)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
