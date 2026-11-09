import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '../config';
import { BrandEmblem, ShieldIcon, WhatsAppIcon, AccessibilityIcon } from './Icons';
import { useAccessibility } from '../context/AccessibilityContext';

export function Footer({ onOpenLegalDoc }) {
  const { setIsMenuOpen } = useAccessibility();

  const waLink = `https://wa.me/${siteConfig.contact.whatsappPhone}?text=${encodeURIComponent(
    'שלום משכן לב ✨'
  )}`;

  return (
    <footer id="contact-section" className="site-footer" role="contentinfo">
      <div className="footer-container">
        
        {/* Brand column */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <BrandEmblem size={28} />
            <span className="footer-brand-name">{siteConfig.brand.name}</span>
          </div>
          <p className="footer-brand-desc">
            תכשיטי בית המקדש וירושלים מכסף סטרלינג 925 וציפוי זהב 18K.
          </p>
          <div className="footer-security-seal">
            <ShieldIcon size={16} />
            <span>אתר מאובטח • ציות לחוק הגנת הצרכן • תשלום ישיר ב-Bit</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">ניווט מהיר</h4>
          <ul className="footer-links-list">
            <li><a href="#products-section">קולקציית התכשיטים</a></li>
            <li><a href="#contact-section">הזמנות ויצירת קשר</a></li>
            <li>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => setIsMenuOpen(true)}
              >
                <AccessibilityIcon size={14} style={{ display: 'inline', marginLeft: '5px' }} />
                <span>סרגל נגישות (ת"י 5568)</span>
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
                מדיניות ביטול עסקה והחזרות (חוק הגנת הצרכן)
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
                מדיניות פרטיות (תיקון 13)
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
          <h4 className="footer-col-title">יצירת קשר ושירות לקוחות</h4>
          <div className="contact-details-list">
            <div className="contact-item">
              <Phone size={16} className="contact-icon" />
              <span>{siteConfig.contact.displayPhone}</span>
            </div>

            <div className="contact-item">
              <WhatsAppIcon size={16} className="contact-icon" />
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="wa-link"
              >
                מענה ישיר ב-WhatsApp
              </a>
            </div>

            <div className="contact-item">
              <Mail size={16} className="contact-icon" />
              <span>{siteConfig.contact.email}</span>
            </div>

            <div className="contact-item">
              <MapPin size={16} className="contact-icon" />
              <span>{siteConfig.contact.address}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            כל הזכויות שמורות © {new Date().getFullYear()} {siteConfig.brand.name} — תכשיטי בית המקדש וירושלים.
          </p>
          <div className="footer-meta-tags">
            <span>יצירה ישראלית מקורית</span>
            <span>ציות מלא לדין הישראלי</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
