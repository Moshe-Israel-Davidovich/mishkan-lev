import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

const A11Y_STORAGE_KEY = 'mishkan_a11y_prefs_v1';

export function AccessibilityProvider({ children }) {
  const [textSize, setTextSize] = useState('normal'); // 'normal' | 'large' | 'xlarge'
  const [contrast, setContrast] = useState('normal'); // 'normal' | 'high' | 'inverted' | 'grayscale'
  const [readableFont, setReadableFont] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Load initial settings
  useEffect(() => {
    try {
      const saved = localStorage.getItem(A11Y_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.textSize) setTextSize(parsed.textSize);
        if (parsed.contrast) setContrast(parsed.contrast);
        if (parsed.readableFont !== undefined) setReadableFont(parsed.readableFont);
        if (parsed.highlightLinks !== undefined) setHighlightLinks(parsed.highlightLinks);
        if (parsed.reducedMotion !== undefined) setReducedMotion(parsed.reducedMotion);
      }
    } catch (e) {
      console.error('Failed to load a11y preferences', e);
    }
  }, []);

  // Sync to document.documentElement and localStorage
  useEffect(() => {
    const root = document.documentElement;

    // Text size
    if (textSize === 'normal') {
      root.removeAttribute('data-text-size');
    } else {
      root.setAttribute('data-text-size', textSize);
    }

    // Contrast
    if (contrast === 'normal') {
      root.removeAttribute('data-contrast');
    } else {
      root.setAttribute('data-contrast', contrast);
    }

    // Readable font
    if (readableFont) {
      root.setAttribute('data-readable-font', 'true');
    } else {
      root.removeAttribute('data-readable-font');
    }

    // Highlight links
    if (highlightLinks) {
      root.setAttribute('data-highlight-links', 'true');
    } else {
      root.removeAttribute('data-highlight-links');
    }

    // Reduced motion
    if (reducedMotion) {
      root.setAttribute('data-reduced-motion', 'true');
    } else {
      root.removeAttribute('data-reduced-motion');
    }

    // Save
    try {
      localStorage.setItem(
        A11Y_STORAGE_KEY,
        JSON.stringify({
          textSize,
          contrast,
          readableFont,
          highlightLinks,
          reducedMotion
        })
      );
    } catch (e) {
      console.error('Failed to save a11y preferences', e);
    }
  }, [textSize, contrast, readableFont, highlightLinks, reducedMotion]);

  // Reset to defaults
  const resetAccessibility = () => {
    setTextSize('normal');
    setContrast('normal');
    setReadableFont(false);
    setHighlightLinks(false);
    setReducedMotion(false);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        textSize,
        setTextSize,
        contrast,
        setContrast,
        readableFont,
        setReadableFont,
        highlightLinks,
        setHighlightLinks,
        reducedMotion,
        setReducedMotion,
        isMenuOpen,
        setIsMenuOpen,
        resetAccessibility
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
