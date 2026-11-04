import React from 'react';
import { Heart, Landmark, Flame, Edit3 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAdmin } from '../context/AdminContext';

export function VisionSection() {
  const { storeConfig } = useStore();
  const { isAuthenticated, setIsAdminModalOpen } = useAdmin();
  const vision = storeConfig.vision || {};

  return (
    <section id="vision-section" className="vision-section" aria-labelledby="vision-title">
      <div className="section-container">
        
        <div className="vision-grid">
          
          {/* Text and story */}
          <div className="vision-main-content">
            <div className="section-badge gold-badge">
              <Heart size={15} />
              <span>{vision.badge || "החזון והשליחות שלנו"}</span>
            </div>

            <div className="title-with-admin">
              <h2 id="vision-title" className="vision-title">
                {vision.title || "לחבר את הלב לקדושת ירושלים ולבית המקדש"}
              </h2>
              {isAuthenticated && (
                <button
                  type="button"
                  className="admin-edit-pill"
                  onClick={() => setIsAdminModalOpen(true)}
                  title="ערוך טקסט חזון בפאנל ניהול"
                >
                  <Edit3 size={14} />
                  <span>ערוך חזון</span>
                </button>
              )}
            </div>

            <p className="vision-lead">
              {vision.subtitle}
            </p>

            <div className="vision-paragraphs">
              {(vision.paragraphs || []).map((p, idx) => (
                <p key={idx} className="vision-text-block">
                  {p}
                </p>
              ))}
            </div>

            {/* Quote block */}
            <blockquote className="vision-quote">
              <span className="quote-mark">“</span>
              <p>אם אשכחך ירושלים תשכח ימיני, תדבק לשוני לחכי אם לא אזכרכי...</p>
              <cite>— תהילים קל"ז</cite>
            </blockquote>
          </div>

          {/* Pillars Cards */}
          <div className="vision-pillars">
            <div className="pillar-card">
              <div className="pillar-icon-box">
                <Landmark size={26} className="pillar-icon" />
              </div>
              <h3 className="pillar-title">זיכרון חי של המקדש</h3>
              <p className="pillar-text">
                השרשראות נושאות מוטיבים היסטוריים ורוחניים מדויקים מבית המקדש השני, שער ניקנור וחומות ירושלים הקדומה.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-box">
                <Flame size={26} className="pillar-icon" />
              </div>
              <h3 className="pillar-title">איכות צורפות ללא פשרות</h3>
              <p className="pillar-text">
                עמידות מוגברת בציפוי זהב וכסף סטרלינג 925, ליטוש ידני עדין וחיתוכי לייזר קליגרפיים מהמעלה הראשונה.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-box">
                <Heart size={26} className="pillar-icon" />
              </div>
              <h3 className="pillar-title">מתנה מרגשת מכל הלב</h3>
              <p className="pillar-text">
                תכשיט בעל ערך פנימי עמוק לכל מי שאוהב את ירושלים — מושלם לבת/בר מצווה, ימי הולדת, שמחות ומתנת אהבה.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
