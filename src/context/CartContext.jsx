import React, { createContext, useContext, useState, useEffect } from 'react';
import { useStore } from './StoreContext';
import { createWhatsAppOrderLink, createSecureBitLink } from '../utils/security';

const CartContext = createContext();

const CART_STORAGE_KEY = 'mishkan_cart_v1';

export function CartProvider({ children }) {
  const { storeConfig, recordOrder } = useStore();
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('review'); // 'review' | 'details' | 'bit_payment' | 'success'

  // Customer form details
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    street: '',
    notes: '',
    deliveryMethod: 'delivery' // 'delivery' | 'pickup'
  });

  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [items]);

  // Cart actions
  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsDrawerOpen(true);
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear cart storage', e);
    }
  };

  // Calculations
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const isFreeShipping =
    customerInfo.deliveryMethod === 'pickup' ||
    subtotal >= (storeConfig.shipping?.freeShippingThreshold || 150);

  const shippingFee =
    customerInfo.deliveryMethod === 'pickup'
      ? 0
      : isFreeShipping
      ? 0
      : storeConfig.shipping?.standardShippingFee || 25;

  const total = subtotal + shippingFee;

  // Amount remaining for free shipping
  const amountForFreeShipping = Math.max(
    0,
    (storeConfig.shipping?.freeShippingThreshold || 150) - subtotal
  );

  // Formatted order summary for WhatsApp / Clipboard
  const getFormattedOrderText = () => {
    const lines = [
      ` שלום, ברצוני לבצע הזמנה מחנות הבוטיק "משכן לב" ✨`,
      `═══════════════════════════`,
      ...items.map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} (כמות: ${item.quantity}) — ₪${
            item.product.price * item.quantity
          }`
      ),
      `───────────────────────────`,
      `סה"כ פריטים: ₪${subtotal}`,
      customerInfo.deliveryMethod === 'pickup'
        ? `איסוף עצמי (ללא עלות)`
        : `משלוח: ${shippingFee === 0 ? 'חינם!' : `₪${shippingFee}`}`,
      `*לתשלום כולל: ₪${total}*`,
      `═══════════════════════════`,
      customerInfo.fullName ? `שם מלא: ${customerInfo.fullName}` : '',
      customerInfo.phone ? `טלפון: ${customerInfo.phone}` : '',
      customerInfo.email ? `אימייל: ${customerInfo.email}` : '',
      customerInfo.city && customerInfo.street
        ? `כתובת למשלוח: ${customerInfo.street}, ${customerInfo.city}`
        : '',
      customerInfo.notes ? `הערות להזמנה: ${customerInfo.notes}` : '',
      `אמצעי תשלום מועדף: Bit`
    ].filter(Boolean);

    return lines.join('\n');
  };

  // Copy order to clipboard
  const copyOrderToClipboard = async () => {
    const text = getFormattedOrderText();
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    }
  };

  // Generate WhatsApp order URL
  const getWhatsAppLink = () => {
    const text = getFormattedOrderText();
    const phone = storeConfig.contact?.whatsapp || '972501234567';
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  // Generate Bit payment link / instructions
  const getBitPaymentInfo = () => {
    const phone = storeConfig.contact?.bitPhone || storeConfig.contact?.phone || '0501234567';
    return {
      phone,
      recipientName: storeConfig.contact?.bitName || 'משכן לב',
      amount: total,
      instruction: `היכנסו לאפליקציית Bit, בחרו "העברת כסף", הזינו את המספר ${phone}, הקלידו סכום של ₪${total}, ובתיאור רשמו את שמכם ומספר הטלפון שלכם.`
    };
  };

  // Submit order
  const submitOrder = () => {
    const orderData = {
      items,
      subtotal,
      shippingFee,
      total,
      customerInfo,
      paymentMethod: 'Bit'
    };
    const savedOrder = recordOrder(orderData);
    setLastPlacedOrder(savedOrder);
    setCheckoutStep('bit_payment');
    return savedOrder;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemsCount,
        subtotal,
        shippingFee,
        total,
        isFreeShipping,
        amountForFreeShipping,
        isDrawerOpen,
        setIsDrawerOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        checkoutStep,
        setCheckoutStep,
        customerInfo,
        setCustomerInfo,
        lastPlacedOrder,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        copyOrderToClipboard,
        getWhatsAppLink,
        getBitPaymentInfo,
        submitOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
