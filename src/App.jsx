import React, { useState } from 'react';
import { AccessibilityProvider } from './context/AccessibilityContext';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InfoAccordion } from './components/InfoAccordion';
import { ProductGallery } from './components/ProductGallery';
import { DirectContactSection } from './components/DirectContactSection';
import { Footer } from './components/Footer';

import { FloatingQuickBar } from './components/FloatingQuickBar';
import { LegalModal } from './components/LegalModal';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';

import './styles/theme.css';

function MainLandingPage() {
  const [activeLegalDoc, setActiveLegalDoc] = useState(null);

  return (
    <div className="site-root" dir="rtl">
      
      {/* ת"י 5568 / WCAG 2.1 AA: קישור דילוג לתוכן המרכזי */}
      <a href="#main-content" className="skip-to-content">
        דלג לתוכן מרכזי
      </a>

      {/* סרגל עליון וניווט מהיר */}
      <Navbar />

      {/* גוף דף הנחיתה — פשוט, קל וממיר */}
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <InfoAccordion />
        <ProductGallery />
        <DirectContactSection />
      </main>

      {/* פוטר */}
      <Footer onOpenLegalDoc={(docId) => setActiveLegalDoc(docId)} />

      {/* סרגל צף תחתון עם גישה ישירה לווטסאפ ולמייל */}
      <FloatingQuickBar />

      {/* מודאל מסמכים משפטיים ונהלים (נפתח בלחיצה מהפוטר בלבד) */}
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
