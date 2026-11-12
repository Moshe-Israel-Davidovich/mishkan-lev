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
            <span>תכשיטי ירושלים והמקדש</span>
          </div>
          <h2 id="products-title" className="section-title">
            סדרת תכשיטי בית המקדש וירושלים
          </h2>
          <p className="section-subtitle">
            לכבוד שבת ומועד, כמזכרת קודש אישית או כמתנה בעלת משמעות עמוקה
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
