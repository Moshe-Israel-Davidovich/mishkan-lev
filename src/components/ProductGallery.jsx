import React from 'react';
import { siteConfig } from '../config';
import { ProductCard } from './ProductCard';
import { GemIcon } from './Icons';

export function ProductGallery() {
  return (
    <section id="products-section" className="products-section" aria-labelledby="products-title">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <GemIcon size={16} />
            <span>הקולקציה</span>
          </div>
          <h2 id="products-title" className="section-title">
            שרשראות בית המקדש וירושלים
          </h2>
          <p className="section-subtitle">
            בחרו פריט להזמנה ישירה ב-WhatsApp או במייל | תשלום ב-Bit ומשלוח מהיר
          </p>
        </div>

        {/* 4 Products Grid */}
        <div className="products-grid">
          {siteConfig.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
