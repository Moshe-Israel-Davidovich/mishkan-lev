import React from 'react';
import { Type, Sun, Moon, Eye, ZapOff, RotateCcw, FileText, X } from 'lucide-react';
import { AccessibilityIcon } from './Icons';
import { useAccessibility } from '../context/AccessibilityContext';

export function AccessibilityToolbar({ onOpenLegalDoc }) {
  const {
    textSize,
    setTextSize,
    contrast,
    setContrast,
    readableFont,
    setReadableFont,
    highlightLinks,
    setHighlightLinks,
    reducedMotion,
    setReducedMotion,
    isMenuOpen,
    setIsMenuOpen,
    resetAccessibility
  } = useAccessibility();

  return (
    <>
      {/* Floating launcher trigger */}
      <button
        type="button"
        id="a11y-trigger-btn"
        className="a11y-floating-trigger"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="פתח סרגל נגישות (תקן ת&quot;י 5568)"
        aria-expanded={isMenuOpen}
        title="התאמות נגישות"
      >
        <AccessibilityIcon size={22} className="a11y-trigger-icon" />
        <span className="a11y-trigger-text">נגישות</span>
      </button>

      {/* Accessibility Menu Drawer */}
      {isMenuOpen && (
        <div
          className="a11y-menu-card"
          role="dialog"
          aria-modal="true"
          aria-label="סרגל התאמות נגישות"
        >
          {/* Header */}
          <div className="a11y-header">
            <div className="a11y-title-wrap">
              <AccessibilityIcon size={20} />
              <h3 className="a11y-title">סרגל נגישות (ת"י 5568 AA)</h3>
            </div>
            <button
              type="button"
              className="a11y-close-btn"
              onClick={() => setIsMenuOpen(false)}
              aria-label="סגור תפריט נגישות"
            >
              <X size={18} />
            </button>
          </div>

          <div className="a11y-body">
            
            {/* Text size */}
            <div className="a11y-group">
              <label className="a11y-label">
                <Type size={16} />
                <span>גודל טקסט:</span>
              </label>
              <div className="a11y-btn-row">
                <button
                  type="button"
                  className={`a11y-option-btn ${textSize === 'normal' ? 'active' : ''}`}
                  onClick={() => setTextSize('normal')}
                >
                  רגיל (100%)
                </button>
                <button
                  type="button"
                  className={`a11y-option-btn ${textSize === 'large' ? 'active' : ''}`}
                  onClick={() => setTextSize('large')}
                >
                  גדול (115%)
                </button>
                <button
                  type="button"
                  className={`a11y-option-btn ${textSize === 'xlarge' ? 'active' : ''}`}
                  onClick={() => setTextSize('xlarge')}
                >
                  ענק (130%)
                </button>
              </div>
            </div>

            {/* Contrast modes */}
            <div className="a11y-group">
              <label className="a11y-label">
                <Sun size={16} />
                <span>ניגודיות וצבעוניות:</span>
              </label>
              <div className="a11y-btn-grid">
                <button
                  type="button"
                  className={`a11y-option-btn ${contrast === 'normal' ? 'active' : ''}`}
                  onClick={() => setContrast('normal')}
                >
                  צבעים רגילים
                </button>
                <button
                  type="button"
                  className={`a11y-option-btn ${contrast === 'high' ? 'active' : ''}`}
                  onClick={() => setContrast('high')}
                >
                  ניגודיות גבוהה
                </button>
                <button
                  type="button"
                  className={`a11y-option-btn ${contrast === 'inverted' ? 'active' : ''}`}
                  onClick={() => setContrast('inverted')}
                >
                  היפוך צבעים
                </button>
                <button
                  type="button"
                  className={`a11y-option-btn ${contrast === 'grayscale' ? 'active' : ''}`}
                  onClick={() => setContrast('grayscale')}
                >
                  גווני אפור
                </button>
              </div>
            </div>

            {/* Toggles */}
            <div className="a11y-toggles-list">
              <button
                type="button"
                className={`a11y-toggle-row ${readableFont ? 'active' : ''}`}
                onClick={() => setReadableFont(!readableFont)}
              >
                <Eye size={17} />
                <span>גופן קריא במיוחד</span>
                <span className="toggle-indicator">{readableFont ? 'פעיל' : 'כבוי'}</span>
              </button>

              <button
                type="button"
                className={`a11y-toggle-row ${highlightLinks ? 'active' : ''}`}
                onClick={() => setHighlightLinks(!highlightLinks)}
              >
                <Type size={17} />
                <span>הדגשת קישורים</span>
                <span className="toggle-indicator">{highlightLinks ? 'פעיל' : 'כבוי'}</span>
              </button>

              <button
                type="button"
                className={`a11y-toggle-row ${reducedMotion ? 'active' : ''}`}
                onClick={() => setReducedMotion(!reducedMotion)}
              >
                <ZapOff size={17} />
                <span>ביטול תנועה והנפשות</span>
                <span className="toggle-indicator">{reducedMotion ? 'פעיל' : 'כבוי'}</span>
              </button>
            </div>

            {/* Statement link and Reset */}
            <div className="a11y-footer-actions">
              <button
                type="button"
                className="a11y-statement-btn"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenLegalDoc('accessibility');
                }}
              >
                <FileText size={16} />
                <span>הצהרת נגישות מפורטת</span>
              </button>

              <button
                type="button"
                className="a11y-reset-btn"
                onClick={resetAccessibility}
                title="אפס את כל התאמות הנגישות"
              >
                <RotateCcw size={15} />
                <span>איפוס</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
