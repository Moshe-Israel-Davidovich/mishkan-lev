import React from 'react';
import { GemIcon, ShieldIcon, TruckIcon } from './Icons';

export function CraftSection() {
  return (
    <section id="craft-section" className="craft-section" aria-labelledby="craft-title">
      <div className="section-container">
        
        <div className="section-header">
          <div className="section-badge">
            <GemIcon size={16} />
            <span>איכות צורפות ומסורת</span>
          </div>
          <h2 id="craft-title" className="section-title">
            איכות החומרים ואחריות מלאה
          </h2>
          <p className="section-subtitle">
            כל תכשיט נועד ללוות אותך לאורך זמן — הקפדה על חומרים מובחרים, גימור מושלם ועמידות
          </p>
        </div>

        <div className="craft-grid">
          
          <div className="craft-card">
            <div className="craft-icon-wrap">
              <GemIcon size={24} />
            </div>
            <h3>כסף סטרלינג 925</h3>
            <p>
              מתכת אצילה ויוקרתית הנושאת חותמת תקן 925. עמידה, זוהרת ומתאימה לענידה יומיומית נוחה.
            </p>
            <ul className="craft-features-list">
              <li>היפואלרגני וללא ניקל (Nickel-Free)</li>
              <li>ליטוש עדין בסטנדרט צורפות גבוה</li>
              <li>קל לחידוש והברקה במטלית כסף</li>
            </ul>
          </div>

          <div className="craft-card">
            <div className="craft-icon-wrap">
              <GemIcon size={24} />
            </div>
            <h3>ציפוי זהב 18K עבה</h3>
            <p>
              ציפוי זהב איכותי בטכנולוגיית Electroplating מתקדמת המעניקה עמידות גבוהה למים ולשחיקה.
            </p>
            <ul className="craft-features-list">
              <li>גוון זהב חם ואצילי בהשראת ירושלים</li>
              <li>שכבת הגנה נגד שריטות קלות</li>
              <li>עמידות מוגברת לענידה ממושכת</li>
            </ul>
          </div>

          <div className="craft-card">
            <div className="craft-icon-wrap">
              <ShieldIcon size={24} />
            </div>
            <h3>תעודת אחריות וביטחון</h3>
            <p>
              אנו עומדים מאחורי כל פריט שיוצא מהסטודיו. כל רכישה כוללת תעודת אחריות מפורטת.
            </p>
            <ul className="craft-features-list">
              <li>אחריות על פגמי ייצור וסוגרי שרשרת</li>
              <li>שירות לקוחות אישי ואכפתי ב-WhatsApp</li>
              <li>החלפה או החזר כספי מלא לפי חוק הגנת הצרכן</li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
