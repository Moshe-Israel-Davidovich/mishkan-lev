import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, Truck, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export function Hero() {
  const { storeConfig } = useStore();

  return (
    <section className="hero-section" aria-label="פתיח חנות משכן לב">
      <div className="hero-container">
        
        {/* Main hero content */}
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} className="badge-icon" />
            <span>סדרת תכשיטי מקדש וירושלים — מהדורה בלעדית</span>
          </div>

          <h1 className="hero-title">
            לענוד את הקדושה,
            <span className="hero-title-highlight">לחבר את הלב לירושלים</span>
          </h1>

          <p className="hero-description">
            בוטיק תכשיטים ישראלי ייחודי המביא את יופיו של בית המקדש, חומות ירושלים ופסוקי הנצח לתכשיטי כסף סטרלינג 925 וציפוי זהב 18K עמידים ומאירים.
          </p>

          <div className="hero-cta-group">
            <a href="#products-section" className="btn-primary">
              <span>לצפייה בכל התכשיטים</span>
              <ArrowLeft size={18} />
            </a>
            <a href="#vision-section" className="btn-secondary">
              החזון שמאחורי היצירה
            </a>
          </div>

          {/* Trust badges */}
          <div className="trust-ribbon">
            <div className="trust-item">
              <ShieldCheck size={20} className="trust-icon" />
              <div>
                <strong>אחריות מלאה</strong>
                <span>על איכות החומרים והציפוי</span>
              </div>
            </div>

            <div className="trust-item">
              <HeartHandshake size={20} className="trust-icon" />
              <div>
                <strong>תשלום קל ב-Bit</strong>
                <span>הזמנה ישירה ללא כרטיסי אשראי</span>
              </div>
            </div>

            <div className="trust-item">
              <Truck size={20} className="trust-icon" />
              <div>
                <strong>משלוחים לכל הארץ</strong>
                <span>חינם בהזמנה מעל ₪{storeConfig.shipping?.freeShippingThreshold || 150}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured visual montage */}
        <div className="hero-visual">
          <div className="hero-image-frame">
            <img
              src="/images/products/item3_macro.jpg"
              alt="תליון לב אם אשכחך ירושלים ובית המקדש"
              className="hero-main-img"
              loading="eager"
            />
            <div className="hero-floating-card">
              <span className="floating-card-tag">פריט הדגל</span>
              <span className="floating-card-title">תליון לב "אם אשכחך"</span>
              <span className="floating-card-price">רק ₪50</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
