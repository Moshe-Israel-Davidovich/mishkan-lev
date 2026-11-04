import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { siteConfig } from '../config';
import { GemIcon, ShieldIcon, BitIcon, TruckIcon } from './Icons';

export function Hero() {
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

          <div className="hero-cta-group">
            <a href="#products-section" className="btn-primary">
              <span>לצפייה בכל התכשיטים</span>
              <ArrowLeft size={18} />
            </a>
            <a href="#vision-section" className="btn-secondary">
              החזון שמאחורי היצירה
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
                <span>העברה ישירה ללא כרטיסי אשראי</span>
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

        {/* Hero visual — 100% Modest Object Photography */}
        <div className="hero-visual">
          <div className="hero-image-frame">
            <img
              src="/images/products/item3_box.jpg"
              alt="תליון לב אם אשכחך ירושלים ובית המקדש בתיבת עץ זית מהודרת"
              className="hero-main-img"
              loading="eager"
            />
            <div className="hero-floating-card">
              <span className="floating-card-tag">מהדורה מיוחדת</span>
              <span className="floating-card-title">תליון לב "אם אשכחך"</span>
              <span className="floating-card-price">₪50 בלבד</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
