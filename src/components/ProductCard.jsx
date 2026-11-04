import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { BitIcon, WhatsAppIcon } from './Icons';

export function ProductCard({ product, onSelectForOrder }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

        {/* Carousel image */}
        <div className="carousel-view">
          <img
            src={images[currentImageIndex]}
            alt={`${product.name} - תצוגה ${currentImageIndex + 1}`}
            className="product-image"
            loading="lazy"
          />

          {/* Navigation arrows (if > 1 image) */}
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

          {/* Dots */}
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

      {/* Product Details */}
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

        <p className="product-desc-text">
          {product.description}
        </p>

        {/* Specifications */}
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

        {/* Direct Order Button */}
        <button
          type="button"
          className="btn-direct-order"
          onClick={() => onSelectForOrder(product)}
        >
          <div className="direct-order-icons">
            <BitIcon size={18} />
            <WhatsAppIcon size={18} />
          </div>
          <span>להזמנה מהירה ב-Bit / WhatsApp</span>
        </button>

      </div>

    </article>
  );
}
