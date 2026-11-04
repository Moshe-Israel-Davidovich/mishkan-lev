import React, { useState } from 'react';
import { X, Copy, Check, MessageCircle, ShieldCheck, HeartHandshake } from 'lucide-react';
import { siteConfig } from '../config';
import { buildWhatsAppLink, copyToClipboard } from '../utils/privacy';
import { BitIcon, WhatsAppIcon } from './Icons';

export function QuickOrderModal({ product, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const handleCopyBit = async () => {
    const success = await copyToClipboard(siteConfig.contact.bitPhone);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const waLink = buildWhatsAppLink(
    siteConfig.contact.whatsappPhone,
    product.name,
    product.price
  );

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`הזמנה מהירה עבור ${product.name}`}
    >
      <div className="modal-backdrop" onClick={onClose} />

      <div className="modal-card quick-order-card">
        
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">הזמנה מהירה ב-Bit / WhatsApp</h2>
            <span className="modal-step-indicator">
              סגירת הזמנה ישירה ומאובטחת ללא צורך בהזנת כרטיסי אשראי
            </span>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="סגור חלון הזמנה"
          >
            <X size={20} />
          </button>
        </div>

        {/* Product summary strip */}
        <div className="quick-product-summary">
          <img
            src={product.images?.[0] || '/images/products/item3_original.jpg'}
            alt={product.name}
            className="quick-product-thumb"
          />
          <div className="quick-product-details">
            <h3 className="quick-product-name">{product.name}</h3>
            <span className="quick-product-mat">{product.material}</span>
            <div className="quick-product-price">
              <span>מחיר: </span>
              <strong>₪{product.price}</strong>
              {product.originalPrice && (
                <span className="quick-original-price">₪{product.originalPrice}</span>
              )}
            </div>
          </div>
        </div>

        {/* Direct Action 1: WhatsApp Checkout */}
        <div className="quick-actions-container">
          
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-quick-primary-wa"
          >
            <WhatsAppIcon size={22} />
            <span>הזמנה ישירה ב-WhatsApp (מומלץ)</span>
          </a>

          <div className="or-divider">
            <span>או העברה מיידית ב-Bit</span>
          </div>

          {/* Direct Action 2: Bit Payment Details */}
          <div className="bit-box-card">
            
            <div className="bit-box-header">
              <div className="bit-badge-box">
                <span className="bit-title-text">bit</span>
              </div>
              <div>
                <strong>העברת תשלום ישירה ב-Bit</strong>
                <span className="bit-sub">ללא עמלות וללא השארת פרטי אשראי ברשת</span>
              </div>
            </div>

            <div className="bit-number-row">
              <div className="bit-number-info">
                <span className="bit-label">מספר טלפון להעברה:</span>
                <span className="bit-phone-val">{siteConfig.contact.bitPhone}</span>
                <span className="bit-name-val">({siteConfig.contact.bitRecipientName})</span>
              </div>

              <button
                type="button"
                className={`btn-copy-bit ${copied ? 'copied' : ''}`}
                onClick={handleCopyBit}
                title="העתק מספר טלפון ל-Bit"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'הועתק!' : 'העתק מספר'}</span>
              </button>
            </div>

            <div className="bit-steps-simple">
              <ol>
                <li>מעבירים <strong>₪{product.price}</strong> באפליקציית Bit למספר שלמעלה.</li>
                <li>בתיאור ההעברה כותבים: <strong>{product.name}</strong> + שמכם.</li>
                <li>שולחים צילום מסך או הודעה ב-WhatsApp לקבלת אישור וכתובת למשלוח.</li>
              </ol>
            </div>

          </div>

          {/* Legal trust note */}
          <div className="quick-guarantee-note">
            <ShieldCheck size={16} />
            <span>
              אחריות מלאה על התכשיט • זכות ביטול עסקה תוך 14 יום לפי חוק הגנת הצרכן
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
