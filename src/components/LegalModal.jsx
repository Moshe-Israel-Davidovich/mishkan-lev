import React from 'react';
import { X, ShieldCheck, Printer } from 'lucide-react';
import { defaultLegalContent } from '../data/legalContent';

export function LegalModal({ activeDocId, onClose, onSelectDoc }) {
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
