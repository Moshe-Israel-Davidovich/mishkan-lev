import React from 'react';
import { Mail } from 'lucide-react';
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

  return (
    <aside className="floating-quick-bar" aria-label="פנייה מהירה לבוטיק">
      <span className="floating-bar-label">הזמנות ובירורים:</span>
      
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-wa-btn"
        title="פנייה ישירה ב-WhatsApp"
      >
        <WhatsAppIcon size={18} />
        <span>WhatsApp</span>
      </a>

      <a
        href={mailUrl}
        className="floating-mail-btn"
        title="פנייה ישירה במייל"
      >
        <Mail size={16} />
        <span>מייל</span>
      </a>
    </aside>
  );
}
