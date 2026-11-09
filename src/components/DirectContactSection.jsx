import React from 'react';
import { Phone, Mail, ArrowLeft } from 'lucide-react';
import { siteConfig } from '../config';
import { WhatsAppIcon, BitIcon, ShieldIcon, TruckIcon } from './Icons';

export function DirectContactSection() {
  const { contact } = siteConfig;

  const waUrl = `https://wa.me/${contact.whatsappPhone}?text=${encodeURIComponent(
    'שלום משכן לב ✨ הגעתי מדף הנחיתה ואשמח לפרטים על התכשיטים וההזמנה!'
  )}`;

  const mailUrl = `mailto:${contact.email}?subject=${encodeURIComponent(
    'הזמנת תכשיטים / פנייה לבוטיק משכן לב'
  )}&body=${encodeURIComponent(
    'שלום צוות משכן לב,\n\nאשמח לפרטים לגבי הזמנה ותשלום.\n\nשם:\nטלפון:\nתכשיט מבוקש:\nכתובת למשלוח:\n\nתודה רבה!'
  )}`;

  return (
    <section id="contact-section" className="contact-section" aria-labelledby="contact-heading">
      <div className="section-container">
        
        <div className="section-header">
          <div className="section-badge">
            <WhatsAppIcon size={16} />
            <span>הזמנות ושירות אישי</span>
          </div>
          <h2 id="contact-heading" className="section-title">
            יצירת קשר והזמנות ישירות
          </h2>
          <p className="section-subtitle">
            אנו זמינים לכל שאלה, תיאום משלוח ותשלום נוח וישיר
          </p>
        </div>

        <div className="contact-cards-grid">
          
          {/* WhatsApp Direct Card */}
          <div className="contact-card contact-card-wa">
            <div className="contact-card-icon wa-icon-bg">
              <WhatsAppIcon size={30} />
            </div>
            <h3>מענה מהיר ב-WhatsApp</h3>
            <p>
              שליחת הודעה ישירה לנציג הבוטיק, קבלת ייעוץ אישי, תמונות נוספות ותיאום הזמנה מהיר.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-card-wa"
            >
              <span>פתיחת שיחה ב-WhatsApp</span>
              <ArrowLeft size={16} />
            </a>
            <span className="contact-card-note">זמינים עבורכם ברוב שעות היום</span>
          </div>

          {/* Email Direct Card */}
          <div className="contact-card contact-card-mail">
            <div className="contact-card-icon mail-icon-bg">
              <Mail size={28} />
            </div>
            <h3>פנייה והזמנה בדוא"ל</h3>
            <p>
              מעדיפים במייל? שלחו לנו את פרטי התכשיט והמשלוח, ונחזור אליכם עם אישור הזמנה מסודר.
            </p>
            <a
              href={mailUrl}
              className="btn-card-mail"
            >
              <span>שליחת מייל ישיר</span>
              <ArrowLeft size={16} />
            </a>
            <span className="contact-card-note">{contact.email}</span>
          </div>

          {/* Bit & Phone Card */}
          <div className="contact-card contact-card-bit">
            <div className="contact-card-icon bit-icon-bg">
              <BitIcon size={28} />
            </div>
            <h3>תשלום נוח ב-Bit / שיחה</h3>
            <p>
              העברה מהירה ומאובטחת באפליקציית Bit ללא כרטיסי אשראי, או שיחה ישירה למענה אנושי.
            </p>
            <a
              href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
              className="btn-card-phone"
            >
              <Phone size={16} />
              <span>{contact.displayPhone}</span>
            </a>
            <span className="contact-card-note">נא לציין שם בהעברה ב-Bit</span>
          </div>

        </div>

        {/* Reassurance Ribbon */}
        <div className="contact-guarantee-ribbon">
          <div className="guarantee-item">
            <ShieldIcon size={18} />
            <span>אחריות מלאה על כל תכשיט</span>
          </div>
          <div className="guarantee-item">
            <TruckIcon size={18} />
            <span>משלוחים מהירים לכל חלקי הארץ</span>
          </div>
          <div className="guarantee-item">
            <BitIcon size={18} />
            <span>תשלום מאובטח וישיר</span>
          </div>
        </div>

      </div>
    </section>
  );
}
