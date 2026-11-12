import React, { useState } from 'react';
import { ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../config';
import { BitIcon } from './Icons';

export function InfoAccordion() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sectionKey) => {
    setOpenSection((prev) => (prev === sectionKey ? null : sectionKey));
  };

  return (
    <section className="info-accordion-section" aria-label="מידע והסברים על התכשיטים וההזמנה">
      <div className="section-container info-accordion-container">
        
        {/* Accordion 1: למה תכשיטי ירושלים */}
        <div className={`accordion-card ${openSection === 'why' ? 'open' : ''}`}>
          <button
            type="button"
            className="accordion-header-btn"
            onClick={() => toggleSection('why')}
            aria-expanded={openSection === 'why'}
          >
            <div className="accordion-title-wrap">
              <Sparkles size={18} className="accordion-icon gold-icon" />
              <span className="accordion-title">למה תכשיטי בית המקדש וירושלים?</span>
            </div>
            <ChevronDown size={18} className={`chevron-indicator ${openSection === 'why' ? 'rotate' : ''}`} />
          </button>

          {openSection === 'why' && (
            <div className="accordion-drawer-body">
              <p>
                ירושלים ובית המקדש הם סמל חי של שורשים, קדושה וזיכרון נצחי. התכשיטים של <strong>משכן לב</strong> נוצרו מתוך אהבה עמוקה למסורת, בעבודת צורפות מוקפדת מכסף סטרלינג 925 וציפוי זהב 18K עמיד.
              </p>
              <p>
                ענידת התכשיט מעניקה תזכורת יומיומית של אור, חיבור ומשמעות עמוקה בכל צעד – כמתנה אישית מרגשת או מזכרת נצחית מעיר הקודש.
              </p>
            </div>
          )}
        </div>

        {/* Accordion 2: איך ההזמנה מתבצעת */}
        <div className={`accordion-card ${openSection === 'how' ? 'open' : ''}`}>
          <button
            type="button"
            className="accordion-header-btn"
            onClick={() => toggleSection('how')}
            aria-expanded={openSection === 'how'}
          >
            <div className="accordion-title-wrap">
              <CheckCircle2 size={18} className="accordion-icon green-icon" />
              <span className="accordion-title">איך ההזמנה מתבצעת? (ב-3 צעדים פשוטים)</span>
            </div>
            <ChevronDown size={18} className={`chevron-indicator ${openSection === 'how' ? 'rotate' : ''}`} />
          </button>

          {openSection === 'how' && (
            <div className="accordion-drawer-body">
              <div className="how-steps-grid">
                <div className="how-step-item">
                  <div className="step-num-badge">1</div>
                  <div>
                    <strong>בוחרים תכשיט</strong>
                    <span>לוחצים על "הזמנה ב-WhatsApp" או במייל ישירות מתחת לפריט המבוקש.</span>
                  </div>
                </div>

                <div className="how-step-item">
                  <div className="step-num-badge">2</div>
                  <div>
                    <strong>מעבירים תשלום ב-Bit</strong>
                    <span>ללא צורך בכרטיסי אשראי או בהרשמה – מעבירים ב-Bit ישירות למספר <strong>{siteConfig.contact.displayPhone}</strong>.</span>
                  </div>
                </div>

                <div className="how-step-item">
                  <div className="step-num-badge">3</div>
                  <div>
                    <strong>מקבלים במשלוח מהיר</strong>
                    <span>התכשיט נארז באריזת בוטיק מהודרת ונשלח ישירות אליכם לכל חלקי הארץ (משלוח חינם מעל ₪{siteConfig.shipping.freeThreshold}).</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
