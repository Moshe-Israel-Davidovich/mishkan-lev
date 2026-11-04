import React from 'react';
import { siteConfig } from '../config';
import { ProductCard } from './ProductCard';
import { GemIcon } from './Icons';

export function ProductGallery({ onSelectForOrder }) {
  return (
    <section id="products-section" className="products-section" aria-labelledby="products-title">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <GemIcon size={16} />
            <span>קולקציית תכשיטי בית המקדש</span>
          </div>
          <h2 id="products-title" className="section-title">
            שרשראות ותליוני בית המקדש וירושלים
          </h2>
          <p className="section-subtitle">
            עבודת צורפות עדינה בדיוק מירבי, חומרים מובחרים ועמידים ליופי מלא משמעות
          </p>
        </div>

        {/* 4 Products Grid */}
        <div className="products-grid">
          {siteConfig.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectForOrder={onSelectForOrder}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
