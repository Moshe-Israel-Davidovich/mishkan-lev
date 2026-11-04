import React, { useState } from 'react';
import { AccessibilityProvider } from './context/AccessibilityContext';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGallery } from './components/ProductGallery';
import { VisionSection } from './components/VisionSection';
import { CraftSection } from './components/CraftSection';
import { Footer } from './components/Footer';

import { QuickOrderModal } from './components/QuickOrderModal';
import { LegalModal } from './components/LegalModal';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';

import './styles/theme.css';

function MainLandingPage() {
  const [selectedProductForOrder, setSelectedProductForOrder] = useState(null);
  const [activeLegalDoc, setActiveLegalDoc] = useState(null);

  return (
    <div className="site-root" dir="rtl">
      
      {/* ת"י 5568 / WCAG 2.1 AA: קישור דילוג לתוכן המרכזי */}
      <a href="#main-content" className="skip-to-content">
        דלג לתוכן מרכזי
      </a>

      {/* סרגל עליון וניווט */}
      <Navbar />

      {/* גוף דף הנחיתה */}
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ProductGallery onSelectForOrder={(product) => setSelectedProductForOrder(product)} />
        <VisionSection />
        <CraftSection />
      </main>

      {/* פוטר ומידע משפטי */}
      <Footer onOpenLegalDoc={(docId) => setActiveLegalDoc(docId)} />

      {/* מודאל הזמנה מהירה ב-Bit / WhatsApp */}
      <QuickOrderModal
        product={selectedProductForOrder}
        onClose={() => setSelectedProductForOrder(null)}
      />

      {/* מודאל מסמכים משפטיים ונהלים (חוק הגנת הצרכן, אחריות ונגישות) */}
      <LegalModal
        activeDocId={activeLegalDoc}
        onClose={() => setActiveLegalDoc(null)}
        onSelectDoc={(docId) => setActiveLegalDoc(docId)}
      />

      {/* סרגל נגישות צף תקני */}
      <AccessibilityToolbar
        onOpenLegalDoc={(docId) => setActiveLegalDoc(docId)}
      />

    </div>
  );
}

export default function App() {
  return (
    <AccessibilityProvider>
      <MainLandingPage />
    </AccessibilityProvider>
  );
}
