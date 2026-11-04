/**
 * 🔒 משכן לב — כלי פרטיות, הגנה מסורקים וקישורי תשלום ישירים
 * 
 * מודול זה מונע מבוטים וסורקי רשת אוטומטיים לאסוף את מספרי הטלפון
 * של בעל העסק, ומספק פונקציות ליצירת קישורי WhatsApp ו-Bit מאובטחים.
 */

// קידוד בסיסי להסוואת מספרי טלפון מסורקי קוד פשוטים
export function decodeContact(encoded) {
  if (!encoded) return '';
  try {
    return atob(encoded);
  } catch {
    return encoded;
  }
}

export function encodeContact(plain) {
  if (!plain) return '';
  try {
    return btoa(plain);
  } catch {
    return plain;
  }
}

/**
 * יצירת קישור ישיר ל-WhatsApp עם הודעה מנוסחת היטב
 */
export function buildWhatsAppLink(phone, productName, price) {
  const cleanPhone = phone.replace(/\D/g, '');
  const greeting = 'שלום משכן לב ✨';
  const message = `${greeting}\nאני מעוניין/ת להזמין את התכשיט: *${productName}* במחיר ₪${price}.\nאשמח לקבל פרטים לביצוע תשלום ב-Bit ומשלוח. תודה!`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * העתקת טקסט ללוח (Clipboard) בצורה בטוחה
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch {
    return false;
  }
}
