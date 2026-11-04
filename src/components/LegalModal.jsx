import React, { useState } from 'react';
import { X, ShieldAlert, FileText, CheckCircle2, RotateCcw, Printer, Edit3 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAdmin } from '../context/AdminContext';

export function LegalModal({ activeDocId, onClose, onSelectDoc }) {
  const { legalContent } = useStore();
  const { isAuthenticated, setIsAdminModalOpen } = useAdmin();

  if (!activeDocId) return null;

  const currentDoc = legalContent[activeDocId] || legalContent.terms;

  const docTabs = [
    { id: 'terms', label: 'תקנון האתר' },
    { id: 'cancellation', label: 'ביטול עסקה והחזרות' },
    { id: 'warranty', label: 'תעודת אחריות' },
    { id: 'privacy', label: 'מדיניות פרטיות' },
    { id: 'accessibility', label: 'הצהרת נגישות' }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={currentDoc.title}>
      <div className="modal-backdrop" onClick={onClose} />

      <div className="modal-card legal-modal-card">
        
        {/* Header */}
        <div className="modal-header">
          <div className="legal-header-titles">
            <h2 className="modal-title">{currentDoc.title}</h2>
            <p className="legal-doc-subtitle">{currentDoc.subtitle}</p>
          </div>

          <div className="legal-header-actions">
            {isAuthenticated && (
              <button
                type="button"
                className="btn-edit-legal"
                onClick={() => {
                  onClose();
                  setIsAdminModalOpen(true);
                }}
                title="ערוך מסמך זה בפאנל ניהול"
              >
                <Edit3 size={16} />
                <span>עריכה בפאנל</span>
              </button>
            )}

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
            <span>גרסה: {currentDoc.version || '1.0.0'}</span>
            <span>תאימות: חוקי מדינת ישראל</span>
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
            <ShieldAlert size={16} />
            <span>מסמך זה מעודכן על פי הדין הישראלי, חוק הגנת הצרכן ותקנות שוויון זכויות.</span>
          </div>
          <button type="button" className="btn-secondary" onClick={onClose}>
            סגור
          </button>
        </div>

      </div>
    </div>
  );
}
