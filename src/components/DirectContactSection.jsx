import React, { useState } from 'react';
import { Mail, ArrowLeft, Copy, Check } from 'lucide-react';
import { siteConfig } from '../config';
import { WhatsAppIcon, BitIcon, ShieldIcon, TruckIcon } from './Icons';

export function DirectContactSection() {
  const { contact } = siteConfig;
  const [copiedBit, setCopiedBit] = useState(false);

  const waUrl = `https://wa.me/${contact.whatsappPhone}?text=${encodeURIComponent(
    'שלום משכן לב ✨ הגעתי מדף הנחיתה ואשמח לפרטים על התכשיטים וההזמנה!'
  )}`;

  const mailUrl = `mailto:${contact.email}?subject=${encodeURIComponent(
    'הזמנת תכשיטים / פנייה לבוטיק משכן לב'
  )}&body=${encodeURIComponent(
    'שלום צוות משכן לב,\n\nאשמח לפרטים לגבי הזמנה ותשלום.\n\nשם:\nטלפון:\nתכשיט מבוקש:\nכתובת למשלוח:\n\nתודה רבה!'
  )}`;

  const handleCopyBit = () => {
    if (navigator.clipboard && contact.displayPhone) {
      navigator.clipboard.writeText(contact.displayPhone);
      setCopiedBit(true);
      setTimeout(() => setCopiedBit(false), 2400);
    }
  };

  return (
    <section id="contact-section" className="contact-section" aria-labelledby="contact-heading">
      <div className="section-container">
        
        <div className="section-header">
          <div className="section-badge">
            <WhatsAppIcon size={16} />
            <span>הזמנה ישירה</span>
          </div>
          <h2 id="contact-heading" className="section-title">
            יצירת קשר ותשלום
          </h2>
          <p className="section-subtitle">
            פנייה ישירה ב-WhatsApp, במייל או תשלום ב-Bit
          </p>
        </div>

        <div className="contact-cards-grid">
          
          {/* WhatsApp Direct Card */}
          <div className="contact-card contact-card-wa">
            <div className="contact-card-icon wa-icon-bg">
              <WhatsAppIcon size={30} />
            </div>
            <h3>הזמנה ב-WhatsApp</h3>
            <p>
              שליחת הודעה ישירה עם הפריט המבוקש לתיאום משלוח מהיר.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-card-wa"
            >
              <span>פתיחת הודעה ב-WhatsApp</span>
              <ArrowLeft size={16} />
            </a>
            <span className="contact-card-note">זמינים למענה מהיר</span>
          </div>

          {/* Email Direct Card */}
          <div className="contact-card contact-card-mail">
            <div className="contact-card-icon mail-icon-bg">
              <Mail size={28} />
            </div>
            <h3>הזמנה בדוא"ל</h3>
            <p>
              שליחת מייל עם פרטי התכשיט והכתובת לקבלת אישור הזמנה.
            </p>
            <a
              href={mailUrl}
              className="btn-card-mail"
            >
              <span>שליחת מייל להזמנה</span>
              <ArrowLeft size={16} />
            </a>
            <span className="contact-card-note">{contact.email}</span>
          </div>

          {/* Bit Card - Strictly Bit */}
          <div className="contact-card contact-card-bit">
            <div className="contact-card-icon bit-icon-bg">
              <BitIcon size={28} />
            </div>
            <h3>תשלום ישיר ב-Bit</h3>
            <p>
              העברה מהירה ומאובטחת באפליקציית Bit ישירות למספר ללא צורך בכרטיסי אשראי.
            </p>
            <button
              type="button"
              onClick={handleCopyBit}
              className="btn-card-bit"
              title="לחצו להעתקת המספר לתשלום ב-Bit"
            >
              {copiedBit ? <Check size={18} /> : <Copy size={16} />}
              <span>{copiedBit ? 'המספר הועתק בהצלחה!' : `העתק מספר ל-Bit: ${contact.displayPhone}`}</span>
            </button>
            <span className="contact-card-note">נא לציין שם המזמין בהעברה ב-Bit</span>
          </div>

        </div>

        {/* Reassurance Ribbon — מוצג רק למטה בסוף העמוד */}
        <div className="contact-guarantee-ribbon">
          <div className="guarantee-item">
            <ShieldIcon size={22} className="guarantee-icon" />
            <div className="guarantee-text">
              <strong>אחריות מלאה</strong>
              <span>איכות החומרים והסוגרים</span>
            </div>
          </div>

          <div className="guarantee-item">
            <BitIcon size={22} className="guarantee-icon" />
            <div className="guarantee-text">
              <strong>תשלום קל ב-Bit</strong>
              <span>העברה ישירה ל-{contact.displayPhone}</span>
            </div>
          </div>

          <div className="guarantee-item">
            <TruckIcon size={22} className="guarantee-icon" />
            <div className="guarantee-text">
              <strong>משלוח מהיר לכל הארץ</strong>
              <span>חינם בהזמנה מעל ₪{siteConfig.shipping.freeThreshold}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
