import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, ShoppingBag, Check, Sparkles, MessageCircle, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';

export function ProductCard({ product }) {
  const { addToCart, setIsDrawerOpen } = useCart();
  const { storeConfig } = useStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const images = product.images && product.images.length > 0
    ? product.images
    : ['/images/products/item3_original.jpg'];

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleDirectWhatsApp = () => {
    const text = `שלום "משכן לב" ✨\nאני מעוניין/ת להזמין את התכשיט: *${product.name}* (מחיר: ₪${product.price}).\nאשמח לפרטים על תשלום ב-Bit ומשלוח. תודה!`;
    const phone = storeConfig.contact?.whatsapp || '972501234567';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <article className="product-card" aria-label={product.name}>
      
      {/* Visual media container with rotating carousel */}
      <div className="product-media-wrapper">
        
        {/* Badge */}
        {product.badge && (
          <span className="product-badge">
            {product.badge}
          </span>
        )}

        {/* Current Image */}
        <div className="carousel-view">
          <img
            src={images[currentImageIndex]}
            alt={`${product.name} - תמונה ${currentImageIndex + 1} מתוך ${images.length}`}
            className="product-image"
            loading="lazy"
          />

          {/* Navigation arrows (if more than 1 image) */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                className="carousel-btn carousel-btn-next"
                onClick={nextImage}
                aria-label="תמונה הבאה"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                className="carousel-btn carousel-btn-prev"
                onClick={prevImage}
                aria-label="תמונה קודמת"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Image index dots */}
          {images.length > 1 && (
            <div className="carousel-dots" role="tablist" aria-label="בחירת תמונת מוצר">
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
                  aria-label={`עבור לתמונה ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail preview strip */}
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

      {/* Product Information */}
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

        {/* Short description */}
        <p className="product-desc-text">
          {product.description}
        </p>

        {/* Specifications toggle / collapsible */}
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

        {/* Action Buttons */}
        <div className="product-actions">
          <button
            type="button"
            className={`btn-add-cart ${isAdded ? 'added' : ''}`}
            onClick={handleAddToCart}
            aria-live="polite"
          >
            {isAdded ? (
              <>
                <Check size={18} />
                <span>נוסף לעגלה!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={18} />
                <span>הוספה לעגלה</span>
              </>
            )}
          </button>

          <button
            type="button"
            className="btn-quick-wa"
            onClick={handleDirectWhatsApp}
            title="רכישה ישירה בוואטסאפ"
            aria-label={`רכישת ${product.name} בוואטסאפ`}
          >
            <MessageCircle size={18} />
            <span>הזמן ב-WhatsApp</span>
          </button>
        </div>

      </div>

    </article>
  );
}
