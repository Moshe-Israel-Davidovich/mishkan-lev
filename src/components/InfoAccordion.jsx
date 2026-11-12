import React, { useState } from 'react';
import { ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../config';

export function InfoAccordion() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sectionKey) => {
    setOpenSection((prev) => (prev === sectionKey ? null : sectionKey));
  };

  return (
    <section className="info-accordion-section" aria-label="כיסופים למקדש ופרטי הזמנה">
      <div className="section-container info-accordion-container">
        
        {/* Accordion 1: כיסופים למקדש — ניסוח תורני-דתי-לאומי ייצוגי */}
        <div className={`accordion-card ${openSection === 'why' ? 'open' : ''}`}>
          <button
            type="button"
            className="accordion-header-btn"
            onClick={() => toggleSection('why')}
            aria-expanded={openSection === 'why'}
          >
            <div className="accordion-title-wrap">
              <Sparkles size={18} className="accordion-icon gold-icon" />
              <span className="accordion-title">כיסופים למקדש – על החיבור לעיר הקודש</span>
            </div>
            <ChevronDown size={18} className={`chevron-indicator ${openSection === 'why' ? 'rotate' : ''}`} />
          </button>

          {openSection === 'why' && (
            <div className="accordion-drawer-body">
              <p className="accordion-lead-quote">
                "אִם אֶשְׁכָּחֵךְ יְרוּשָׁלָ‍ִם תִּשְׁכַּח יְמִינִי, תִּדְבַּק לְשׁוֹנִי לְחִכִּי אִם לֹא אֶזְכְּרֵכִי..."
              </p>
              <p>
                הכיסופים לעיר הקודש, למקום מקדשנו ולבניין ציון ואריאל מלווים את עם ישראל בכל תחנות הדורות – לא רק כזיכרון עבר, אלא כשאיפה חיה, פועמת ומאירה בלב כל אחד ואחת מאיתנו.
              </p>
              <p>
                תכשיטי <strong>משכן לב</strong> נועדו לשאת את יופיים של שערי המקדש, חומות ירושלים ופסוקי הנצח קרוב אל הלב בחיי היומיום – כאות של קדושה, שייכות שורשית וחיבור עמוק לגאולת ירושלים.
              </p>
            </div>
          )}
        </div>

        {/* Accordion 2: כיצד מתבצעת ההזמנה */}
        <div className={`accordion-card ${openSection === 'how' ? 'open' : ''}`}>
          <button
            type="button"
            className="accordion-header-btn"
            onClick={() => toggleSection('how')}
            aria-expanded={openSection === 'how'}
          >
            <div className="accordion-title-wrap">
              <CheckCircle2 size={18} className="accordion-icon green-icon" />
              <span className="accordion-title">כיצד מתבצעת ההזמנה והמשלוח?</span>
            </div>
            <ChevronDown size={18} className={`chevron-indicator ${openSection === 'how' ? 'rotate' : ''}`} />
          </button>

          {openSection === 'how' && (
            <div className="accordion-drawer-body">
              <div className="how-steps-grid">
                <div className="how-step-item">
                  <div className="step-num-badge">1</div>
                  <div>
                    <strong>בחירת התכשיט</strong>
                    <span>בוחרים את הדגם הרצוי ולוחצים על "הזמנה ב-WhatsApp" להזמנה ישירה ומהירה.</span>
                  </div>
                </div>

                <div className="how-step-item">
                  <div className="step-num-badge">2</div>
                  <div>
                    <strong>תשלום קל ב-Bit</strong>
                    <span>מעבירים תשלום ישירות באפליקציית Bit למספר <strong>{siteConfig.contact.displayPhone}</strong> – ללא צורך בכרטיס אשראי או בהרשמה.</span>
                  </div>
                </div>

                <div className="how-step-item">
                  <div className="step-num-badge">3</div>
                  <div>
                    <strong>משלוח מהיר עד הבית</strong>
                    <span>התכשיט נארז באריזת שי מכובדת ונשלח אליכם לכל חלקי הארץ (משלוח חינם בהזמנה מעל ₪{siteConfig.shipping.freeThreshold}).</span>
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
