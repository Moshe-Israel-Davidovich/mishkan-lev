import React, { useState } from 'react';
import { StoreProvider } from './context/StoreContext';
import { AdminProvider } from './context/AdminContext';
import { CartProvider } from './context/CartContext';
import { AccessibilityProvider } from './context/AccessibilityContext';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGallery } from './components/ProductGallery';
import { VisionSection } from './components/VisionSection';
import { CraftSection } from './components/CraftSection';
import { Footer } from './components/Footer';

import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { LegalModal } from './components/LegalModal';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';

import './styles/theme.css';

function MainApp() {
  const [activeLegalDoc, setActiveLegalDoc] = useState(null);

  return (
    <div className="site-root" dir="rtl">
      
      {/* WCAG 2.1 AA: Skip to main content */}
      <a href="#main-content" className="skip-to-content">
        דלג לתוכן מרכזי
      </a>

      {/* Main Header & Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ProductGallery />
        <VisionSection />
        <CraftSection />
      </main>

      {/* Footer with legal navigation */}
      <Footer onOpenLegalDoc={(docId) => setActiveLegalDoc(docId)} />

      {/* Overlays and Modals */}
      <CartDrawer />
      <CheckoutModal />
      <AdminDashboardModal />
      <LegalModal
        activeDocId={activeLegalDoc}
        onClose={() => setActiveLegalDoc(null)}
        onSelectDoc={(docId) => setActiveLegalDoc(docId)}
      />
      <AccessibilityToolbar
        onOpenLegalDoc={(docId) => setActiveLegalDoc(docId)}
      />

    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AdminProvider>
        <CartProvider>
          <AccessibilityProvider>
            <MainApp />
          </AccessibilityProvider>
        </CartProvider>
      </AdminProvider>
    </StoreProvider>
  );
}
