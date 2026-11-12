import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { WhatsAppIcon, BitIcon } from './Icons';
import { siteConfig } from '../config';

export function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const [copiedBit, setCopiedBit] = useState(false);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);

  const images = product.images && product.images.length > 0
    ? product.images
    : ['/images/products/gold_heart_stone.jpg'];

  // התמונות הנעות: החלפה חלקה ואוטומטית של התמונות כל 3.8 שניות
  useEffect(() => {
    if (isPaused || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [isPaused, images.length]);

  const nextImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // תמיכה מלאה בסווייפ (Swipe Gestures) במובייל
  const handleTouchStart = (e) => {
    setIsPaused(true);
    if (e.touches && e.touches[0]) {
      setTouchStartX(e.touches[0].clientX);
      setTouchStartY(e.touches[0].clientY);
    }
  };

  const handleTouchEnd = (e) => {
    setIsPaused(false);
    if (touchStartX === null || !e.changedTouches || !e.changedTouches[0]) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;

    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  const handleCopyBit = () => {
    if (navigator.clipboard && siteConfig.contact.displayPhone) {
      navigator.clipboard.writeText(siteConfig.contact.displayPhone);
      setCopiedBit(true);
      setTimeout(() => setCopiedBit(false), 2400);
    }
  };

  // קישור ישיר ל-WhatsApp עם הודעה מוכנה ומדויקת לפריט זה
  const waMessage = `שלום משכן לב,\nאני מעוניין/ת להזמין את: ${product.name} (${product.subtitle})\nמחיר: ₪${product.price}\n\nאשמח לקבל פרטים לביצוע תשלום ב-Bit ומשלוח. תודה!`;
  const waUrl = `https://wa.me/${siteConfig.contact.whatsappPhone}?text=${encodeURIComponent(waMessage)}`;

  // קישור ישיר למייל עם נושא וגוף הודעה מוכנים להזמנה
  const mailSubject = encodeURIComponent(`הזמנת תכשיט: ${product.name} - משכן לב`);
  const mailBody = encodeURIComponent(
    `שלום צוות משכן לב,\n\nברצוני להזמין את התכשיט הבא:\n• פריט: ${product.name}\n• דגם: ${product.subtitle}\n• מחיר: ₪${product.price}\n\nפרטים למשלוח:\nשם מלא:\nטלפון:\nכתובת מלאה למשלוח:\n\nתודה רבה!`
  );
  const mailUrl = `mailto:${siteConfig.contact.email}?subject=${mailSubject}&body=${mailBody}`;

  return (
    <article 
      id={`product-${product.id}`}
      className="product-card" 
      aria-label={product.name}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      {/* אזור תמונות נעות עם תמיכת סווייפ במובייל */}
      <div 
        className="product-media-wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* תצוגת התמונה הנעה עם אנימציית מעבר חלקה */}
        <div className="carousel-view">
          <img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={`${product.name} - תצוגה ${currentImageIndex + 1}`}
            className="product-image moving-image"
            loading="lazy"
          />

          {/* חיצי מעבר ידני */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                className="carousel-btn carousel-btn-next"
                onClick={nextImage}
                aria-label="תמונה הבאה"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                className="carousel-btn carousel-btn-prev"
                onClick={prevImage}
                aria-label="תמונה קודמת"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* נקודות ניווט */}
          {images.length > 1 && (
            <div className="carousel-dots" role="tablist" aria-label="בחירת תמונה">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={idx === currentImageIndex}
                  className={`dot-indicator ${idx === currentImageIndex ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(idx);
                  }}
                  aria-label={`מעבר לתמונה ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* שורת תמונות ממוזערות */}
        {images.length > 1 && (
          <div className="thumbnail-strip">
            {images.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                className={`thumb-btn ${idx === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(idx)}
                aria-label={`תצוגה מקדימה ${idx + 1}`}
              >
                <img src={imgUrl} alt="" className="thumb-img" />
              </button>
            ))}
          </div>
        )}

      </div>

      {/* פרטי המוצר */}
      <div className="product-info">
        
        <div className="product-header">
          <h3 className="product-title">{product.name}</h3>
          <div className="product-pricing">
            <span className="current-price">₪{product.price}</span>
          </div>
        </div>

        <p className="product-subtitle">{product.subtitle}</p>

        {/* כפתורים קומפקטיים ונפתחים בשביל להזמין */}
        <div className="compact-order-bar">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-compact-wa"
            title={`הזמנה מהירה ב-WhatsApp של ${product.name}`}
          >
            <WhatsAppIcon size={18} />
            <span>הזמנה ב-WhatsApp</span>
          </a>

          <button
            type="button"
            className={`btn-compact-toggle ${isOrderDrawerOpen ? 'active' : ''}`}
            onClick={() => setIsOrderDrawerOpen(!isOrderDrawerOpen)}
            aria-expanded={isOrderDrawerOpen}
            title="אפשרויות תשלום ב-Bit ומייל"
          >
            <BitIcon size={16} />
            <span>ביט ומייל</span>
            {isOrderDrawerOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* מגירת הזמנה נפתחת (Bit ומייל) */}
        {isOrderDrawerOpen && (
          <div className="order-drawer-content">
            <div 
              className="drawer-bit-box"
              onClick={handleCopyBit}
              role="button"
              tabIndex={0}
              title="לחצו להעתקת המספר לתשלום ב-Bit"
            >
              <BitIcon size={18} className="bit-drawer-icon" />
              <div className="drawer-bit-text">
                {copiedBit ? (
                  <strong className="copied-toast">✅ המספר {siteConfig.contact.displayPhone} הועתק ל-Bit!</strong>
                ) : (
                  <>
                    <span>העברה ב-Bit למספר: <strong>{siteConfig.contact.displayPhone}</strong></span>
                    <span className="bit-tap-pill">(לחצו להעתקה)</span>
                  </>
                )}
              </div>
            </div>

            <a
              href={mailUrl}
              className="btn-drawer-mail"
              title={`הזמנה ישירה במייל של ${product.name}`}
            >
              <Mail size={16} />
              <span>הזמנה ישירה בדוא"ל</span>
            </a>

            <div className="drawer-shipping-hint">
              <span>משלוח לכל חלקי הארץ באריזת שי מכובדת</span>
            </div>
          </div>
        )}

      </div>

    </article>
  );
}
