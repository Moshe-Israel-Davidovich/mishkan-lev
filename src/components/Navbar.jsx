import React from 'react';
import { ShoppingBag, Lock, Sliders, Sparkles, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import { useAccessibility } from '../context/AccessibilityContext';

export function Navbar() {
  const { storeConfig } = useStore();
  const { itemsCount, setIsDrawerOpen } = useCart();
  const { setIsAdminModalOpen, isAuthenticated } = useAdmin();
  const { isMenuOpen, setIsMenuOpen } = useAccessibility();

  return (
    <>
      {/* Top announcement bar */}
      <div className="announcement-bar">
        <span>{storeConfig.announcement}</span>
      </div>

      {/* Main navigation header */}
      <header className="site-header" role="banner">
        <div className="header-container">
          
          {/* Logo & Brand */}
          <a href="#" className="brand-logo" aria-label="משכן לב - דף הבית">
            <div className="logo-symbol">
              <span className="temple-arch">⛩️</span>
              <Heart className="logo-heart-icon" size={14} />
            </div>
            <div className="brand-text">
              <span className="brand-name">{storeConfig.storeName}</span>
              <span className="brand-tagline">תכשיטי בית המקדש וירושלים</span>
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

          {/* Action buttons */}
          <div className="header-actions">
            
            {/* Accessibility toggle button */}
            <button
              type="button"
              className="action-icon-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              title="תפריט נגישות (תקן ת&quot;י 5568)"
              aria-label="פתח תפריט נגישות"
            >
              <Sliders size={20} />
            </button>

            {/* Admin login button */}
            <button
              type="button"
              className={`action-icon-btn ${isAuthenticated ? 'admin-active' : ''}`}
              onClick={() => setIsAdminModalOpen(true)}
              title={isAuthenticated ? 'ניהול חנות (מחובר)' : 'כניסת מנהל'}
              aria-label={isAuthenticated ? 'פתח לוח ניהול' : 'כניסת מנהל'}
            >
              <Lock size={19} />
              {isAuthenticated && <span className="admin-status-dot" />}
            </button>

            {/* Cart Button */}
            <button
              type="button"
              className="cart-btn"
              onClick={() => setIsDrawerOpen(true)}
              aria-label={`עגלת קניות, ${itemsCount} פריטים`}
            >
              <ShoppingBag size={20} />
              <span className="cart-btn-label">עגלה</span>
              {itemsCount > 0 && (
                <span className="cart-badge animate-scale" aria-live="polite">
                  {itemsCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </header>
    </>
  );
}
