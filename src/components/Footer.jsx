import React from 'react';
import { Heart, Phone, Mail, MapPin, MessageCircle, ShieldCheck, Lock, Sliders } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAdmin } from '../context/AdminContext';
import { useAccessibility } from '../context/AccessibilityContext';

export function Footer({ onOpenLegalDoc }) {
  const { storeConfig } = useStore();
  const { setIsAdminModalOpen, isAuthenticated } = useAdmin();
  const { setIsMenuOpen } = useAccessibility();

  const contact = storeConfig.contact || {};

  return (
    <footer id="contact-section" className="site-footer" role="contentinfo">
      <div className="footer-container">
        
        {/* Brand column */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <span className="logo-symbol">⛩️</span>
            <span className="footer-brand-name">{storeConfig.storeName}</span>
          </div>
          <p className="footer-brand-desc">
            בוטיק תכשיטים ייחודי המביא את קדושת בית המקדש, יפי ירושלים ופסוקי הנצח לשרשראות כסף וזהב בעיצוב ישראלי מוקפד.
          </p>
          <div className="footer-security-seal">
            <ShieldCheck size={18} className="seal-icon" />
            <span>אתר מאובטח | ציות לדין הישראלי | תשלום ב-Bit</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">ניווט מהיר</h4>
          <ul className="footer-links-list">
            <li><a href="#products-section">קולקציית התכשיטים</a></li>
            <li><a href="#vision-section">החזון שלנו</a></li>
            <li><a href="#craft-section">איכות ואחריות</a></li>
            <li>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => setIsMenuOpen(true)}
              >
                סרגל נגישות (ת"י 5568)
              </button>
            </li>
            <li>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => setIsAdminModalOpen(true)}
              >
                {isAuthenticated ? 'לוח ניהול חנות (מחובר)' : 'כניסת מנהל האתר'}
              </button>
            </li>
          </ul>
        </div>

        {/* Legal & Regulation Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">נהלים, שירות ומשפטיזציה</h4>
          <ul className="footer-links-list">
            <li>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => onOpenLegalDoc('terms')}
              >
                תקנון ותנאי שימוש
              </button>
            </li>
            <li>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => onOpenLegalDoc('cancellation')}
              >
                מדיניות ביטול עסקה והחזרות
              </button>
            </li>
            <li>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => onOpenLegalDoc('warranty')}
              >
                תעודת אחריות על תכשיטים
              </button>
            </li>
            <li>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => onOpenLegalDoc('privacy')}
              >
                מדיניות פרטיות ומאגרי מידע (תיקון 13)
              </button>
            </li>
            <li>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => onOpenLegalDoc('accessibility')}
              >
                הצהרת נגישות (ת"י 5568 AA)
              </button>
            </li>
          </ul>
        </div>

        {/* Contact column */}
        <div className="footer-col contact-col">
          <h4 className="footer-col-title">שירות לקוחות ויצירת קשר</h4>
          <div className="contact-details-list">
            <div className="contact-item">
              <Phone size={17} className="contact-icon" />
              <span>{contact.phone || '050-1234567'}</span>
            </div>

            <div className="contact-item">
              <MessageCircle size={17} className="contact-icon" />
              <a
                href={`https://wa.me/${contact.whatsapp || '972501234567'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="wa-link"
              >
                מענה מהיר ב-WhatsApp
              </a>
            </div>

            <div className="contact-item">
              <Mail size={17} className="contact-icon" />
              <span>{contact.email || 'mishkan.lev.store@gmail.com'}</span>
            </div>

            <div className="contact-item">
              <MapPin size={17} className="contact-icon" />
              <span>{contact.address || 'ירושלים, ישראל'}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom copyright line */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            כל הזכויות שמורות © {new Date().getFullYear()} משכן לב — תכשיטי בית המקדש וירושלים בע"מ.
          </p>
          <div className="footer-meta-tags">
            <span>נבנה באהבה בירושלים 🤍</span>
            <span>100% תאימות לדין הישראלי</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
