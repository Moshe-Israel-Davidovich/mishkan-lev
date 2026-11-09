import React from 'react';
import { Mail } from 'lucide-react';
import { siteConfig } from '../config';
import { BrandEmblem, AccessibilityIcon, WhatsAppIcon } from './Icons';
import { useAccessibility } from '../context/AccessibilityContext';

export function Navbar() {
  const { isMenuOpen, setIsMenuOpen } = useAccessibility();

  const waGeneralLink = `https://wa.me/${siteConfig.contact.whatsappPhone}?text=${encodeURIComponent(
    'שלום משכן לב, אשמח לפרטים נוספים על התכשיטים וההזמנות ✨'
  )}`;

  const mailGeneralLink = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
    'פנייה והזמנה מבוטיק משכן לב'
  )}`;

  return (
    <>
      {/* Top announcement bar */}
      <div className="announcement-bar">
        <span>{siteConfig.brand.announcement}</span>
      </div>

      {/* Main navigation header */}
      <header className="site-header" role="banner">
        <div className="header-container">
          
          {/* Logo & Brand */}
          <a href="#" className="brand-logo" aria-label="משכן לב - דף הבית">
            <div className="logo-symbol-box">
              <BrandEmblem size={28} />
            </div>
            <div className="brand-text">
              <span className="brand-name">{siteConfig.brand.name}</span>
              <span className="brand-tagline">{siteConfig.brand.tagline}</span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="desktop-nav" aria-label="ניווט ראשי">
            <a href="#products-section" className="nav-link">
              הקולקציה
            </a>
            <a href="#vision-section" className="nav-link">
              החזון שלנו
            </a>
            <a href="#craft-section" className="nav-link">
              איכות ואחריות
            </a>
            <a href="#contact-section" className="nav-link">
              יצירת קשר
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="header-actions">
            
            {/* Accessibility trigger */}
            <button
              type="button"
              className="action-icon-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              title="תפריט נגישות (תקן ת&quot;י 5568)"
              aria-label="פתח תפריט נגישות"
            >
              <AccessibilityIcon size={20} />
            </button>

            {/* Direct Email Contact Button */}
            <a
              href={mailGeneralLink}
              className="nav-mail-btn"
              title="פנייה ישירה במייל"
            >
              <Mail size={17} />
              <span className="nav-mail-text">מייל</span>
            </a>

            {/* Direct WhatsApp Contact Button */}
            <a
              href={waGeneralLink}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-wa-btn"
              title="פנייה מהירה בוואטסאפ"
            >
              <WhatsAppIcon size={18} />
              <span className="nav-wa-text">WhatsApp</span>
            </a>

          </div>

        </div>
      </header>
    </>
  );
}
