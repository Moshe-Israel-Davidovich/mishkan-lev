import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { siteConfig } from '../config';
import { WhatsAppIcon } from './Icons';

export function FloatingQuickBar() {
  const { contact } = siteConfig;

  const waUrl = `https://wa.me/${contact.whatsappPhone}?text=${encodeURIComponent(
    'שלום משכן לב ✨ אשמח לפרטים על התכשיטים וההזמנות מדף הנחיתה'
  )}`;

  const mailUrl = `mailto:${contact.email}?subject=${encodeURIComponent(
    'הזמנת תכשיט - בוטיק משכן לב'
  )}`;

  const phoneUrl = `tel:${(contact.phone || contact.displayPhone || '').replace(/[^0-9]/g, '')}`;

  return (
    <aside className="floating-quick-bar" aria-label="פנייה והזמנה מהירה">
      <span className="floating-bar-label">הזמנה ישירה:</span>
      
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-wa-btn"
        title="פנייה ישירה ב-WhatsApp"
      >
        <WhatsAppIcon size={19} />
        <span>הזמנה ב-WhatsApp</span>
      </a>

      <a
        href={phoneUrl}
        className="floating-phone-btn"
        title={`חיוג / תשלום ב-Bit: ${contact.displayPhone}`}
      >
        <Phone size={16} />
        <span className="floating-phone-text">Bit / שיחה</span>
      </a>

      <a
        href={mailUrl}
        className="floating-mail-btn"
        title="פנייה ישירה במייל"
      >
        <Mail size={16} />
        <span className="floating-mail-text">מייל</span>
      </a>
    </aside>
  );
}
