import React from 'react';
import { siteConfig } from '../config';
import { BrandEmblem, GemIcon, ShieldIcon } from './Icons';

export function VisionSection() {
  const { vision } = siteConfig;

  return (
    <section id="vision-section" className="vision-section" aria-labelledby="vision-title">
      <div className="section-container">
        
        <div className="vision-grid">
          
          {/* Main story */}
          <div className="vision-main-content">
            <div className="section-badge">
              <BrandEmblem size={16} />
              <span>החזון והשליחות שלנו</span>
            </div>

            <h2 id="vision-title" className="vision-title">
              {vision.title}
            </h2>

            <p className="vision-lead">
              {vision.subtitle}
            </p>

            <p className="vision-text-block">
              {vision.lead}
            </p>

            {/* Psalms quote */}
            <blockquote className="vision-quote">
              <span className="quote-mark">“</span>
              <p>{vision.quote}</p>
              <cite>— {vision.quoteSource}</cite>
            </blockquote>

            {/* Vision authentic photography frame */}
            <div className="vision-image-card">
              <img
                src={`${import.meta.env.BASE_URL}images/products/gold_gates_wide.jpg`}
                alt="שרשרת שערי ירושלים על רקע קשת אבן ירושלמית ועצי זית באור שקיעה טבעי"
                className="vision-card-img"
                loading="lazy"
              />
              <div className="vision-image-badge">
                <span>צורפות ירושלמית אותנטית • חומרי גלם מובחרים • חיבור למקורות</span>
              </div>
            </div>
          </div>

          {/* Pillars */}
          <div className="vision-pillars">
            <div className="pillar-card">
              <div className="pillar-icon-box">
                <BrandEmblem size={24} />
              </div>
              <h3 className="pillar-title">זיכרון חי של המקדש</h3>
              <p className="pillar-text">
                השרשראות נושאות מוטיבים היסטוריים ורוחניים מדויקים מבית המקדש, שער ניקנור וחומות ירושלים העתיקה.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-box">
                <GemIcon size={24} />
              </div>
              <h3 className="pillar-title">איכות צורפות ללא פשרות</h3>
              <p className="pillar-text">
                כסף סטרלינג 925 וציפויי זהב עבים ועמידים למים, ליטוש ידני עדין וחיתוכי לייזר קליגרפיים מהמעלה הראשונה.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-box">
                <ShieldIcon size={24} />
              </div>
              <h3 className="pillar-title">שירות אישי ואחריות</h3>
              <p className="pillar-text">
                קשר ישיר ואנושי בוואטסאפ, אריזת מתנה מהודרת עם כל פריט, ואחריות מלאה לשקט הנפשי שלך.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
