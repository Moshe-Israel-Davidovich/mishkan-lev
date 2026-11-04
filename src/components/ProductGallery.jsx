import React from 'react';
import { CATEGORIES } from '../data/initialData';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Sparkles, Filter } from 'lucide-react';

export function ProductGallery() {
  const { filteredProducts, activeCategory, setActiveCategory } = useStore();

  return (
    <section id="products-section" className="products-section" aria-labelledby="products-title">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={15} />
            <span>הקולקציה הבלעדית</span>
          </div>
          <h2 id="products-title" className="section-title">
            שרשראות בית המקדש וירושלים
          </h2>
          <p className="section-subtitle">
            עבודת צורפות עדינה מלווה בדיוק מירבי, סמליות עמוקה וחומרים מובחרים
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="categories-filter-bar" role="toolbar" aria-label="סינון לפי קטגוריה">
          <div className="filter-label">
            <Filter size={16} />
            <span>סינון לפי סוג:</span>
          </div>
          <div className="filter-pills-list">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-category-notice">
            <p>לא נמצאו פריטים בקטגוריה שנבחרה.</p>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setActiveCategory('all')}
            >
              הצג את כל התכשיטים
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
