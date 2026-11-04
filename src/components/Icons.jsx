import React from 'react';

/**
 * 🏛️ משכן לב — סט אייקונים וקטוריים נקיים, קלאסיים ומינימליסטיים (SVG)
 * ללא אימוג'ים, ללא גרפיקת AI זועקת, וללא צבעי ניאון מנופחים.
 */

// סמל המותג — חזית שער המקדש והלב בקווי מתאר אלגנטיים
export function BrandEmblem({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* בסיס האבן */}
      <path d="M4 27H28" stroke="#C5A059" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M6 24H26" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" />
      {/* עמודי השער */}
      <path d="M9 24V11" stroke="#A6833E" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M23 24V11" stroke="#A6833E" strokeWidth="1.75" strokeLinecap="round" />
      {/* כותרת השער וכרכוב */}
      <path d="M7 11H25" stroke="#C5A059" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M8 8H24" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" />
      {/* שיני חומה עליונות עדינות */}
      <path d="M9 8V6M13 8V6M16 8V6M19 8V6M23 8V6" stroke="#A6833E" strokeWidth="1.5" strokeLinecap="round" />
      {/* לב פנימי עדין במרכז השער */}
      <path
        d="M16 19.5L14.2 17.7C12.8 16.3 12.8 14.5 14.2 13.5C15.2 12.8 16 13.4 16 13.4C16 13.4 16.8 12.8 17.8 13.5C19.2 14.5 19.2 16.3 17.8 17.7L16 19.5Z"
        fill="#C5A059"
        fillOpacity="0.85"
      />
    </svg>
  );
}

// סמל נגישות בינלאומי תקני (♿)
export function AccessibilityIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="4.5" r="2.5" />
      <path d="M10 8.5H14L15.5 14H18.5" />
      <path d="M10 11.5V17L7 20" />
      <path d="M13.5 17C12.5 19 10 20 8 19C5.8 18 5 15 6 13C6.7 11.7 8 11 9.5 11" />
    </svg>
  );
}

// מגן אחריות וביטחון
export function ShieldIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 22S4 18 4 11V5L12 2L20 5V11C20 18 12 22 12 22Z" />
      <path d="M9 12L11 14L15 9" />
    </svg>
  );
}

// משלוחים לכל הארץ
export function TruckIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="1" y="5" width="14" height="12" rx="1" />
      <polygon points="15 7 20 7 22 10 22 17 15 17 15 7" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

// אבן חן / צורפות מובחרת
export function GemIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 3H18L22 9L12 21L2 9L6 3Z" />
      <path d="M2 9H22" />
      <path d="M12 21L8 9L10 3" />
      <path d="M12 21L16 9L14 3" />
    </svg>
  );
}

// סמל Bit
export function BitIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M5.5 3C4.1 3 3 4.1 3 5.5V18.5C3 19.9 4.1 21 5.5 21H18.5C19.9 21 21 19.9 21 18.5V5.5C21 4.1 19.9 3 18.5 3H5.5ZM7 8H13C14.7 8 16 9.3 16 11C16 11.9 15.6 12.7 14.9 13.3C16 13.9 16.7 15 16.7 16.3C16.7 18.3 15 20 13 20H7V8ZM9.5 10.5V12.5H12.5C13 12.5 13.5 12 13.5 11.5C13.5 11 13 10.5 12.5 10.5H9.5ZM9.5 14.5V17.5H13C13.8 17.5 14.5 16.8 14.5 16C14.5 15.2 13.8 14.5 13 14.5H9.5Z" />
    </svg>
  );
}

// סמל WhatsApp
export function WhatsAppIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.37 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.44 19.65L5.27 16.61L5.07 16.3C4.25 14.99 3.82 13.47 3.82 11.91C3.82 7.38 7.51 3.69 12.05 3.69C14.25 3.69 16.31 4.55 17.86 6.11C19.42 7.66 20.27 9.72 20.27 11.92C20.28 16.46 16.58 20.15 12.05 20.15ZM16.57 14.39C16.32 14.27 15.1 13.67 14.88 13.59C14.65 13.51 14.48 13.47 14.32 13.72C14.15 13.97 13.67 14.53 13.52 14.7C13.38 14.87 13.23 14.89 12.98 14.77C12.73 14.65 11.93 14.38 10.98 13.54C10.24 12.88 9.74 12.07 9.6 11.82C9.45 11.57 9.58 11.44 9.71 11.31C9.82 11.2 9.95 11.02 10.08 10.88C10.2 10.73 10.25 10.63 10.33 10.46C10.41 10.3 10.37 10.15 10.31 10.03C10.25 9.91 9.76 8.7 9.55 8.21C9.35 7.73 9.15 7.79 9 7.78C8.86 7.78 8.69 7.77 8.52 7.77C8.36 7.77 8.09 7.83 7.86 8.08C7.63 8.33 7 8.92 7 10.13C7 11.34 7.88 12.51 8.01 12.67C8.13 12.84 9.75 15.34 12.23 16.41C12.82 16.67 13.28 16.82 13.64 16.93C14.23 17.12 14.77 17.09 15.2 17.03C15.68 16.96 16.67 16.43 16.88 15.86C17.08 15.29 17.08 14.8 17.02 14.7C16.96 14.6 16.81 14.52 16.57 14.39Z" />
    </svg>
  );
}
