import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Copy, Check, MessageCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';

export function CartDrawer() {
  const {
    items,
    itemsCount,
    subtotal,
    shippingFee,
    total,
    isFreeShipping,
    amountForFreeShipping,
    isDrawerOpen,
    setIsDrawerOpen,
    setIsCheckoutModalOpen,
    setCheckoutStep,
    updateQuantity,
    removeFromCart,
    copyOrderToClipboard,
    getWhatsAppLink
  } = useCart();

  const { storeConfig } = useStore();
  const [copied, setCopied] = useState(false);

  if (!isDrawerOpen) return null;

  const handleCopy = async () => {
    const ok = await copyOrderToClipboard();
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleProceedToCheckout = () => {
    setIsDrawerOpen(false);
    setCheckoutStep('details');
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="cart-drawer-overlay" role="dialog" aria-modal="true" aria-label="עגלת קניות">
      <div className="cart-drawer-backdrop" onClick={() => setIsDrawerOpen(false)} />

      <div className="cart-drawer-content">
        
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <ShoppingBag size={22} className="drawer-icon" />
            <h2 className="drawer-title">עגלת הקניות שלך</h2>
            <span className="drawer-count">({itemsCount} פריטים)</span>
          </div>

          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="סגור עגלת קניות"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free shipping progress bar */}
        <div className="shipping-progress-box">
          {amountForFreeShipping > 0 ? (
            <p className="shipping-progress-text">
              עוד <strong>₪{amountForFreeShipping}</strong> למשלוח חינם! 🚚
            </p>
          ) : (
            <p className="shipping-progress-text free-unlocked">
              🎉 מזל טוב! קיבלת <strong>משלוח חינם</strong> לכל הארץ!
            </p>
          )}
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min(
                  100,
                  (subtotal / (storeConfig.shipping?.freeShippingThreshold || 150)) * 100
                )}%`
              }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="drawer-items-list">
          {items.length === 0 ? (
            <div className="empty-cart-view">
              <ShoppingBag size={48} className="empty-icon" />
              <p className="empty-title">העגלה שלך עדיין ריקה</p>
              <p className="empty-sub">בחר שרשרת שתאיר את היום ותחבר אותך לירושלים</p>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setIsDrawerOpen(false)}
              >
                חזרה לקולקציה
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product.id} className="cart-item-card">
                <img
                  src={product.images?.[0] || '/images/products/item3_original.jpg'}
                  alt={product.name}
                  className="cart-item-img"
                />

                <div className="cart-item-details">
                  <div className="cart-item-header">
                    <h3 className="cart-item-name">{product.name}</h3>
                    <button
                      type="button"
                      className="cart-item-remove-btn"
                      onClick={() => removeFromCart(product.id)}
                      title="הסר פריט"
                      aria-label={`הסר את ${product.name} מהעגלה`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <span className="cart-item-cat">{product.category}</span>

                  <div className="cart-item-footer">
                    <div className="qty-controls">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(product.id, -1)}
                        aria-label="הפחת כמות"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="qty-value">{quantity}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(product.id, 1)}
                        aria-label="הוסף כמות"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="cart-item-pricing">
                      <span className="cart-item-total-price">
                        ₪{product.price * quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Actions */}
        {items.length > 0 && (
          <div className="drawer-footer">
            
            <div className="drawer-summary-lines">
              <div className="summary-line">
                <span>סכום ביניים פריטים:</span>
                <span>₪{subtotal}</span>
              </div>
              <div className="summary-line">
                <span>משלוח:</span>
                <span>{shippingFee === 0 ? 'חינם' : `₪${shippingFee}`}</span>
              </div>
              <div className="summary-line total-line">
                <span>סה"כ לתשלום:</span>
                <span className="total-highlight">₪{total}</span>
              </div>
            </div>

            {/* Main Action: Proceed to Bit Checkout */}
            <button
              type="button"
              className="btn-checkout-bit"
              onClick={handleProceedToCheckout}
            >
              <span>המשך להזמנה ותשלום ב-Bit</span>
              <ArrowLeft size={18} />
            </button>

            {/* Alternative Action: WhatsApp / Clipboard */}
            <div className="drawer-secondary-actions">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa-checkout"
                title="שליחת פרטי ההזמנה לוואטסאפ של החנות"
              >
                <MessageCircle size={17} />
                <span>שליחה ישירה ל-WhatsApp</span>
              </a>

              <button
                type="button"
                className={`btn-copy-order ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
                title="העתקת פירוט ההזמנה ללוח להדבקה במייל או בהודעה"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'הועתק בהצלחה!' : 'העתקת פירוט'}</span>
              </button>
            </div>

            <div className="drawer-security-note">
              <ShieldCheck size={15} />
              <span>תשלום מאובטח ב-Bit | ללא שמירת כרטיסי אשראי</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
