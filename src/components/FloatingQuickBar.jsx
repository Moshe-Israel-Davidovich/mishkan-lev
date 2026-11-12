import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { siteConfig } from '../config';
import { WhatsAppIcon, BitIcon, GmailIcon } from './Icons';

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
    <aside className="floating-quick-bar floating-icons-only" aria-label="פנייה מהירה">
      {/* Official WhatsApp Icon */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-icon-btn floating-wa-btn-official"
        title="פנייה ב-WhatsApp"
        aria-label="פנייה ב-WhatsApp"
      >
        <WhatsAppIcon size={34} />
      </a>

      {/* Official Bit Icon */}
      <button
        type="button"
        className={`floating-icon-btn floating-bit-btn-official ${copiedBit ? 'copied' : ''}`}
        onClick={handleBitClick}
        title={copiedBit ? 'המספר לתשלום ב-Bit הועתק!' : `תשלום ב-Bit למספר: ${contact.displayPhone} (לחצו להעתקה)`}
        aria-label="העתקת מספר לתשלום ב-Bit"
      >
        {copiedBit ? <Check size={22} className="check-animate" /> : <BitIcon size={34} />}
        {copiedBit && <span className="bit-copied-badge">הועתק!</span>}
      </button>

      {/* Official Gmail Icon */}
      <a
        href={mailUrl}
        className="floating-icon-btn floating-mail-btn-official"
        title="פנייה בדוא&quot;ל"
        aria-label="פנייה בדוא&quot;ל"
      >
        <GmailIcon size={24} />
      </a>
    </aside>
  );
}
