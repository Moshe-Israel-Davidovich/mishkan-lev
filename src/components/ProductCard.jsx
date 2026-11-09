import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Mail } from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { siteConfig } from '../config';

export function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // קישור ישיר ל-WhatsApp עם הודעה מוכנה ומדויקת לפריט זה
  const waMessage = `שלום משכן לב ✨\nאני מעוניין/ת להזמין את: ${product.name}\nמחיר: ₪${product.price}\n\nאשמח לקבל פרטים לביצוע תשלום (Bit / העברה) ומשלוח!`;
  const waUrl = `https://wa.me/${siteConfig.contact.whatsappPhone}?text=${encodeURIComponent(waMessage)}`;

  // קישור ישיר למייל עם נושא וגוף הודעה מוכנים להזמנה
  const mailSubject = encodeURIComponent(`הזמנת תכשיט: ${product.name} - משכן לב`);
  const mailBody = encodeURIComponent(
    `שלום צוות משכן לב,\n\nברצוני להזמין את התכשיט הבא:\n• פריט: ${product.name}\n• דגם/חומר: ${product.category}\n• מחיר: ₪${product.price}\n\nפרטי יצירת קשר שלי למשלוח:\nשם מלא:\nטלפון:\nכתובת מלאה למשלוח:\nהערות:\n\nתודה רבה!`
  );
  const mailUrl = `mailto:${siteConfig.contact.email}?subject=${mailSubject}&body=${mailBody}`;

  return (
    <article 
      className="product-card" 
      aria-label={product.name}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      
      {/* אזור תמונות נעות (Moving Images Slideshow) */}
      <div className="product-media-wrapper">
        
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
          <span className="product-category-tag">{product.category}</span>
          <div className="product-pricing">
            <span className="current-price">₪{product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="original-price">₪{product.originalPrice}</span>
            )}
          </div>
        </div>

        <h3 className="product-title">{product.name}</h3>
        <p className="product-subtitle">{product.subtitle}</p>

        {/* מפרט חומרים */}
        <div className="product-specs-box">
          <div className="spec-row">
            <span className="spec-label">חומר:</span>
            <span className="spec-val">{product.material}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">מידות:</span>
            <span className="spec-val">{product.dimensions}</span>
          </div>
        </div>

        {/* קישורים ישירים: וואטסאפ ומייל */}
        <div className="product-actions-group">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-direct-wa"
            title={`הזמנה ישירה בוואטסאפ של ${product.name}`}
          >
            <WhatsAppIcon size={19} />
            <span>הזמנה ישירה ב-WhatsApp</span>
          </a>

          <a
            href={mailUrl}
            className="btn-direct-mail"
            title={`הזמנה ישירה במייל של ${product.name}`}
          >
            <Mail size={18} />
            <span>הזמנה ישירה במייל</span>
          </a>
        </div>

        <div className="product-payment-hint">
          <span>✨ תשלום ב-Bit למספר: <strong>{siteConfig.contact.displayPhone}</strong> | משלוח מהיר לכל הארץ</span>
        </div>

      </div>

    </article>
  );
}
