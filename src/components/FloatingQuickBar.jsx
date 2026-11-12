import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { siteConfig } from '../config';
import { WhatsAppIcon, BitIcon } from './Icons';

export function FloatingQuickBar() {
  const { contact } = siteConfig;
  const [copiedBit, setCopiedBit] = useState(false);

  const waUrl = `https://wa.me/${contact.whatsappPhone}?text=${encodeURIComponent(
    'שלום משכן לב ✨ אשמח לפרטים על התכשיטים וההזמנות מדף הנחיתה'
  )}`;

  const mailUrl = `mailto:${contact.email}?subject=${encodeURIComponent(
    'הזמנת תכשיט - בוטיק משכן לב'
  )}`;

  const handleBitClick = () => {
    if (navigator.clipboard && contact.displayPhone) {
      navigator.clipboard.writeText(contact.displayPhone);
      setCopiedBit(true);
      setTimeout(() => setCopiedBit(false), 2400);
    }
  };

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

      <button
        type="button"
        className="floating-bit-btn"
        onClick={handleBitClick}
        title={`תשלום ב-Bit למספר: ${contact.displayPhone} (לחצו להעתקה)`}
      >
        <BitIcon size={16} />
        <span>{copiedBit ? '✅ הועתק!' : 'תשלום ב-Bit'}</span>
      </button>

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
