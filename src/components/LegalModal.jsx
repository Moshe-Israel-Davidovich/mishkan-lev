import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Printer, Send, CheckCircle2 } from 'lucide-react';
import { defaultLegalContent } from '../data/legalContent';
import { siteConfig } from '../config';
import { WhatsAppIcon } from './Icons';

export function LegalModal({ activeDocId, onClose, onSelectDoc }) {
  const [cancelName, setCancelName] = useState('');
  const [cancelContact, setCancelContact] = useState('');
  const [cancelOrder, setCancelOrder] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [cancelSent, setCancelSent] = useState(false);

  // סגירה במקש Escape (WCAG 2.1.2)
  useEffect(() => {
    if (!activeDocId) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDocId, onClose]);

  if (!activeDocId) return null;

  const currentDoc = defaultLegalContent[activeDocId] || defaultLegalContent.terms;

  const docTabs = [
    { id: 'terms', label: 'תקנון האתר' },
    { id: 'cancellation', label: 'ביטול עסקה (חוק הגנת הצרכן)' },
    { id: 'warranty', label: 'תעודת אחריות על תכשיטים' },
    { id: 'privacy', label: 'מדיניות פרטיות (תיקון 13)' },
    { id: 'accessibility', label: 'הצהרת נגישות (ת"י 5568)' }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleSendCancellationWa = (e) => {
    e.preventDefault();
    if (!cancelName.trim() || !cancelContact.trim()) {
      alert('נא למלא שם וטלפון/מייל ליצירת קשר');
      return;
    }
    const msg = `שלום הנהלת ${siteConfig.brand.name},\nברצוני להודיע על ביטול עסקה בהתאם לחוק הגנת הצרכן:\n• שם מלא: ${cancelName}\n• טלפון/מייל: ${cancelContact}\n• מספר הזמנה/תאריך: ${cancelOrder || 'לא צוין'}\n• סיבה/הערות: ${cancelReason || 'אין'}\n\nאשמח לקבל אישור ופרטי החזר. תודה!`;
    const url = `https://wa.me/${siteConfig.contact.whatsappPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setCancelSent(true);
  };

  const handleSendCancellationMail = (e) => {
    e.preventDefault();
    if (!cancelName.trim() || !cancelContact.trim()) {
      alert('נא למלא שם וטלפון/מייל ליצירת קשר');
      return;
    }
    const subject = encodeURIComponent(`הודעת ביטול עסקה - ${cancelName}`);
    const body = encodeURIComponent(
      `שלום הנהלת ${siteConfig.brand.name},\n\nברצוני להודיע על ביטול עסקה בהתאם לחוק הגנת הצרכן:\n• שם מלא: ${cancelName}\n• טלפון/דוא"ל לחזרה: ${cancelContact}\n• מספר הזמנה או תאריך: ${cancelOrder || 'לא צוין'}\n• סיבת הביטול / הערות: ${cancelReason || 'ללא'}\n\nבברכה,\n${cancelName}`
    );
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
    setCancelSent(true);
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={currentDoc.title}
    >
      <div className="modal-backdrop" onClick={onClose} />

      <div className="modal-card legal-modal-card">
        
        {/* Header */}
        <div className="modal-header">
          <div className="legal-header-titles">
            <h2 className="modal-title">{currentDoc.title}</h2>
            <p className="legal-doc-subtitle">{currentDoc.subtitle}</p>
          </div>

          <div className="legal-header-actions">
            <button
              type="button"
              className="btn-icon-print"
              onClick={handlePrint}
              title="הדפס מסמך זה"
              aria-label="הדפס מסמך"
            >
              <Printer size={18} />
            </button>

            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="סגור חלון מסמכים משפטיים"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab selection */}
        <div className="legal-tabs-bar" role="tablist">
          {docTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={tab.id === activeDocId}
              className={`legal-tab-btn ${tab.id === activeDocId ? 'active' : ''}`}
              onClick={() => onSelectDoc(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body content */}
        <div className="modal-body legal-modal-body">
          <div className="legal-meta-bar">
            <span>עודכן לאחרונה: {currentDoc.lastUpdated || 'נובמבר 2026'}</span>
            <span>תאימות מלאה: חוק הגנת הצרכן (מכר מרחוק) ותקן נגישות ת"י 5568 AA</span>
          </div>

          {/* טופס הודעת ביטול עסקה דיגיטלי (דרישת תיקון חוק הגנת הצרכן) */}
          {activeDocId === 'cancellation' && (
            <div className="cancellation-quick-form-card" aria-label="טופס דיגיטלי להודעת ביטול עסקה">
              <div className="cancellation-form-header">
                <h4>טופס דיגיטלי להודעת ביטול עסקה (לפי חוק הגנת הצרכן)</h4>
                <p>ניתן למסור הודעת ביטול בטופס מהיר זה, ב-WhatsApp או בדוא"ל. מענה יינתן בהקדם.</p>
              </div>

              {cancelSent ? (
                <div className="cancellation-success-toast">
                  <CheckCircle2 size={20} color="#2E7D32" />
                  <span>הודעת הביטול הוכנה ונשלחה בהצלחה! ניצור עמך קשר להסדרת ההחזר.</span>
                </div>
              ) : (
                <form className="cancellation-form-fields" onSubmit={handleSendCancellationWa}>
                  <div className="cancel-inputs-grid">
                    <div className="cancel-field">
                      <label htmlFor="cancel-name">שם מלא *</label>
                      <input
                        id="cancel-name"
                        type="text"
                        required
                        value={cancelName}
                        onChange={(e) => setCancelName(e.target.value)}
                        placeholder="שם פרטי ומשפחה"
                      />
                    </div>
                    <div className="cancel-field">
                      <label htmlFor="cancel-contact">טלפון או דוא"ל לחזרה *</label>
                      <input
                        id="cancel-contact"
                        type="text"
                        required
                        value={cancelContact}
                        onChange={(e) => setCancelContact(e.target.value)}
                        placeholder="050-0000000 / email@example.com"
                      />
                    </div>
                    <div className="cancel-field">
                      <label htmlFor="cancel-order">מספר הזמנה או תאריך רכישה</label>
                      <input
                        id="cancel-order"
                        type="text"
                        value={cancelOrder}
                        onChange={(e) => setCancelOrder(e.target.value)}
                        placeholder="למשל: תאריך ביצוע ההזמנה"
                      />
                    </div>
                  </div>

                  <div className="cancel-field full-width">
                    <label htmlFor="cancel-reason">סיבת הביטול / הערות (אופציונלי)</label>
                    <input
                      id="cancel-reason"
                      type="text"
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      placeholder="חרטה / פגם / אי-התאמה"
                    />
                  </div>

                  <div className="cancel-actions-row">
                    <button
                      type="button"
                      className="btn-cancel-wa"
                      onClick={handleSendCancellationWa}
                    >
                      <WhatsAppIcon size={18} />
                      <span>שליחת הודעת ביטול ב-WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      className="btn-cancel-mail"
                      onClick={handleSendCancellationMail}
                    >
                      <Send size={16} />
                      <span>שליחה בדוא"ל</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          <div className="legal-sections-container">
            {(currentDoc.sections || []).map((sec, idx) => (
              <div key={sec.id || idx} className="legal-section-block">
                <h3 className="legal-sec-title">{sec.title}</h3>
                <div className="legal-sec-content">
                  {sec.content.split('\n\n').map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer legal-modal-footer">
          <div className="legal-footer-note">
            <ShieldCheck size={16} />
            <span>הגנה צרכנית מלאה • 14 ימי ביטול עסקה כחוק • אפס כרטיסי אשראי שמורים באתר</span>
          </div>
          <button type="button" className="btn-secondary" onClick={onClose}>
            סגור
          </button>
        </div>

      </div>
    </div>
  );
}
