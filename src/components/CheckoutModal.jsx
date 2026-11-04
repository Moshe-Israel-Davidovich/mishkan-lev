import React, { useState } from 'react';
import { X, Check, Copy, ArrowLeft, Phone, Mail, MapPin, MessageCircle, Smartphone, ShieldCheck, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';

export function CheckoutModal() {
  const {
    items,
    subtotal,
    shippingFee,
    total,
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    checkoutStep,
    setCheckoutStep,
    customerInfo,
    setCustomerInfo,
    lastPlacedOrder,
    submitOrder,
    clearCart,
    getBitPaymentInfo,
    getWhatsAppLink
  } = useCart();

  const { storeConfig } = useStore();
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  if (!isCheckoutModalOpen) return null;

  const bitInfo = getBitPaymentInfo();

  // Validate Step 1
  const validateForm = () => {
    const errors = {};
    if (!customerInfo.fullName.trim()) {
      errors.fullName = 'נא להזין שם מלא';
    }
    if (!customerInfo.phone.trim() || customerInfo.phone.length < 9) {
      errors.phone = 'נא להזין מספר טלפון תקין';
    }
    if (customerInfo.deliveryMethod === 'delivery') {
      if (!customerInfo.city.trim()) errors.city = 'נא להזין עיר / ישוב';
      if (!customerInfo.street.trim()) errors.street = 'נא להזין כתובת מלאה (רחוב ומספר בית)';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextToPayment = (e) => {
    e.preventDefault();
    if (validateForm()) {
      submitOrder();
    }
  };

  const handleCopyBitPhone = async () => {
    try {
      await navigator.clipboard.writeText(bitInfo.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleFinishOrder = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (_) {}
    setCheckoutStep('success');
    clearCart();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="סיום הזמנה">
      <div className="modal-backdrop" onClick={() => setIsCheckoutModalOpen(false)} />

      <div className="modal-card checkout-modal-card">
        
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">
              {checkoutStep === 'details' && 'פרטי מקבל המשלוח וההזמנה'}
              {checkoutStep === 'bit_payment' && 'תשלום קל ומאובטח באפליקציית Bit'}
              {checkoutStep === 'success' && 'ההזמנה נקלטה בהצלחה! 🎉'}
            </h2>
            <span className="modal-step-indicator">
              {checkoutStep === 'details' && 'שלב 1 מתוך 2: הזנת פרטים'}
              {checkoutStep === 'bit_payment' && 'שלב 2 מתוך 2: ביצוע העברה ב-Bit'}
            </span>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={() => setIsCheckoutModalOpen(false)}
            aria-label="סגור חלון"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          
          {/* STEP 1: Details Form */}
          {checkoutStep === 'details' && (
            <form onSubmit={handleNextToPayment} className="checkout-form">
              
              {/* Delivery method toggle */}
              <div className="delivery-method-selector">
                <button
                  type="button"
                  className={`delivery-option ${
                    customerInfo.deliveryMethod === 'delivery' ? 'active' : ''
                  }`}
                  onClick={() =>
                    setCustomerInfo((prev) => ({ ...prev, deliveryMethod: 'delivery' }))
                  }
                >
                  <MapPin size={18} />
                  <span>משלוח עד הבית {shippingFee === 0 ? '(חינם!)' : `(₪${storeConfig.shipping?.standardShippingFee || 25})`}</span>
                </button>

                <button
                  type="button"
                  className={`delivery-option ${
                    customerInfo.deliveryMethod === 'pickup' ? 'active' : ''
                  }`}
                  onClick={() =>
                    setCustomerInfo((prev) => ({ ...prev, deliveryMethod: 'pickup' }))
                  }
                >
                  <HeartHandshake size={18} />
                  <span>איסוף עצמי בירושלים (ללא עלות)</span>
                </button>
              </div>

              {/* Customer input fields */}
              <div className="form-grid">
                
                <div className="form-group">
                  <label htmlFor="customer-name" className="form-label">
                    שם מלא <span className="req">*</span>
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    className={`form-input ${formErrors.fullName ? 'input-error' : ''}`}
                    placeholder="ישראל ישראלי"
                    value={customerInfo.fullName}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({ ...prev, fullName: e.target.value }))
                    }
                  />
                  {formErrors.fullName && (
                    <span className="error-text">{formErrors.fullName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="customer-phone" className="form-label">
                    מספר טלפון נייד (לתיאום ו-Bit) <span className="req">*</span>
                  </label>
                  <input
                    id="customer-phone"
                    type="tel"
                    required
                    className={`form-input ${formErrors.phone ? 'input-error' : ''}`}
                    placeholder="050-1234567"
                    value={customerInfo.phone}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))
                    }
                  />
                  {formErrors.phone && (
                    <span className="error-text">{formErrors.phone}</span>
                  )}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="customer-email" className="form-label">
                    כתובת דואר אלקטרוני (לשליחת קבלה ואישור)
                  </label>
                  <input
                    id="customer-email"
                    type="email"
                    className="form-input"
                    placeholder="your-email@gmail.com"
                    value={customerInfo.email}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                </div>

                {customerInfo.deliveryMethod === 'delivery' && (
                  <>
                    <div className="form-group">
                      <label htmlFor="customer-city" className="form-label">
                        עיר / ישוב <span className="req">*</span>
                      </label>
                      <input
                        id="customer-city"
                        type="text"
                        required
                        className={`form-input ${formErrors.city ? 'input-error' : ''}`}
                        placeholder="ירושלים / תל אביב..."
                        value={customerInfo.city}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({ ...prev, city: e.target.value }))
                        }
                      />
                      {formErrors.city && (
                        <span className="error-text">{formErrors.city}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="customer-street" className="form-label">
                        רחוב ומספר בית <span className="req">*</span>
                      </label>
                      <input
                        id="customer-street"
                        type="text"
                        required
                        className={`form-input ${formErrors.street ? 'input-error' : ''}`}
                        placeholder="הרצל 12, כניסה א', דירה 4"
                        value={customerInfo.street}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({ ...prev, street: e.target.value }))
                        }
                      />
                      {formErrors.street && (
                        <span className="error-text">{formErrors.street}</span>
                      )}
                    </div>
                  </>
                )}

                <div className="form-group full-width">
                  <label htmlFor="customer-notes" className="form-label">
                    הערות או ברכה אישית (אופציונלי)
                  </label>
                  <textarea
                    id="customer-notes"
                    rows={2}
                    className="form-textarea"
                    placeholder="אם התכשיט מיועד למתנה — ציינו כאן ונצרף כרטיס ברכה יפהפה ללא עלות..."
                    value={customerInfo.notes}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({ ...prev, notes: e.target.value }))
                    }
                  />
                </div>

              </div>

              {/* Order total preview */}
              <div className="checkout-summary-bar">
                <div className="summary-col">
                  <span>סה"כ לתשלום:</span>
                  <strong className="summary-total-val">₪{total}</strong>
                </div>
                <button type="submit" className="btn-primary">
                  <span>המשך לתשלום ב-Bit</span>
                  <ArrowLeft size={18} />
                </button>
              </div>

            </form>
          )}

          {/* STEP 2: Bit Payment Screen */}
          {checkoutStep === 'bit_payment' && (
            <div className="bit-payment-view">
              
              <div className="bit-banner">
                <div className="bit-logo-box">
                  <span className="bit-badge-text">bit</span>
                </div>
                <div className="bit-banner-text">
                  <h3>העברת תשלום קלה ב-Bit</h3>
                  <p>ללא צורך בהזנת כרטיס אשראי או השארת פרטים רגישים</p>
                </div>
              </div>

              {/* Payment Details Box */}
              <div className="bit-details-card">
                
                <div className="bit-detail-row">
                  <span className="bit-detail-label">סכום מדויק להעברה:</span>
                  <span className="bit-detail-amount">₪{total}</span>
                </div>

                <div className="bit-detail-row highlight-row">
                  <div>
                    <span className="bit-detail-label">מספר טלפון להעברה ב-Bit:</span>
                    <strong className="bit-phone-number">{bitInfo.phone}</strong>
                    <span className="bit-recipient-name">({bitInfo.recipientName})</span>
                  </div>

                  <button
                    type="button"
                    className={`btn-copy-bit ${copiedPhone ? 'copied' : ''}`}
                    onClick={handleCopyBitPhone}
                  >
                    {copiedPhone ? <Check size={16} /> : <Copy size={16} />}
                    <span>{copiedPhone ? 'הועתק!' : 'העתק מספר'}</span>
                  </button>
                </div>

                <div className="bit-instructions-list">
                  <h4>הוראות פשוטות לסיום:</h4>
                  <ol>
                    <li>פתחו את אפליקציית <strong>Bit</strong> בטלפון שלכם.</li>
                    <li>העבירו <strong>₪{total}</strong> למספר <strong>{bitInfo.phone}</strong>.</li>
                    <li>
                      בשורת "עבור מה התשלום?" באפליקציית Bit רשמו:{' '}
                      <strong>{customerInfo.fullName || 'משכן לב'} ({lastPlacedOrder?.id || 'הזמנה'})</strong>.
                    </li>
                    <li>
                      לאחר ביצוע ההעברה, לחצו על הכפתור הירוק למטה לעדכון בוואטסאפ או לאישור סופי!
                    </li>
                  </ol>
                </div>

              </div>

              {/* Action buttons */}
              <div className="bit-actions-group">
                <button
                  type="button"
                  className="btn-finish-payment"
                  onClick={handleFinishOrder}
                >
                  <Check size={18} />
                  <span>ביצעתי העברה ב-Bit — אשר הזמנה</span>
                </button>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wa-confirm"
                >
                  <MessageCircle size={18} />
                  <span>שליחת אישור צילום מסך ב-WhatsApp</span>
                </a>
              </div>

              <div className="bit-back-step">
                <button
                  type="button"
                  className="btn-link"
                  onClick={() => setCheckoutStep('details')}
                >
                  חזרה לעריכת פרטי המשלוח
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: Success Screen */}
          {checkoutStep === 'success' && (
            <div className="checkout-success-view">
              <div className="success-icon-wrap">
                <Check size={40} className="success-check-icon" />
              </div>

              <h3 className="success-title">תודה רבה! הזמנתך התקבלה בהתרגשות</h3>
              <p className="success-sub">
                מספר הזמנה שלך:{' '}
                <strong className="order-id-badge">{lastPlacedOrder?.id}</strong>
              </p>

              <div className="success-card">
                <h4>מה קורה עכשיו?</h4>
                <p>
                  1. ברגע שאישור ה-Bit מתקבל בסטודיו, אנו מתחילים באריזה מהודרת של התכשיט שלך באהבה.
                </p>
                <p>
                  2. יישלח אליך עדכון בוואטסאפ או ב-SMS עם מספר מעקב לחבילה.
                </p>
                <p>
                  3. התכשיט יגיע עם תעודת אחריות מלאה והוראות לשמירה על הברק.
                </p>
              </div>

              <div className="success-actions">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wa-checkout"
                >
                  <MessageCircle size={18} />
                  <span>לשאלות ובירורים מהירים בוואטסאפ</span>
                </a>

                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    setCheckoutStep('details');
                  }}
                >
                  סיום וחזרה לחנות
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
