import React, { useState } from 'react';
import {
  X, Lock, ShieldCheck, Settings, Package, ShoppingBag,
  FileText, Key, Check, AlertTriangle, Plus, Trash2, Edit2,
  ExternalLink, MessageCircle, RefreshCw, Save
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useStore } from '../context/StoreContext';

export function AdminDashboardModal() {
  const {
    isAuthenticated,
    isAdminModalOpen,
    setIsAdminModalOpen,
    login,
    logout,
    changePassword,
    authRecord
  } = useAdmin();

  const {
    storeConfig,
    updateStoreConfig,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    legalContent,
    updateLegalContent,
    orders,
    updateOrderStatus,
    resetToDefaults
  } = useStore();

  const [activeTab, setActiveTab] = useState('store'); // 'store' | 'products' | 'orders' | 'legal' | 'security'
  
  // Login form state
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Password change state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passMsg, setPassMsg] = useState({ type: '', text: '' });

  // Store config editing state
  const [configForm, setConfigForm] = useState(storeConfig);
  const [configSaved, setConfigSaved] = useState(false);

  // Product editing modal/form state
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    subtitle: '',
    price: 35,
    originalPrice: 45,
    category: 'ציפוי זהב 18K',
    categorySlug: 'gold',
    material: '',
    dimensions: '',
    description: '',
    badge: '',
    inStock: true,
    images: ['/images/products/item3_original.jpg']
  });

  // Legal editing state
  const [selectedLegalKey, setSelectedLegalKey] = useState('terms');
  const [legalSections, setLegalSections] = useState(
    legalContent[selectedLegalKey]?.sections || []
  );
  const [legalSaved, setLegalSaved] = useState(false);

  if (!isAdminModalOpen) return null;

  // Handle Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    const result = await login(loginPassword);
    setIsLoggingIn(false);
    if (!result.success) {
      setLoginError(result.message);
    } else {
      setLoginPassword('');
    }
  };

  // Handle Store Config Save
  const handleSaveConfig = (e) => {
    e.preventDefault();
    updateStoreConfig(configForm);
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 2500);
  };

  // Handle Add / Edit Product
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editingProductId) {
      updateProduct(editingProductId, productForm);
      setEditingProductId(null);
    } else {
      addProduct(productForm);
      setIsAddingProduct(false);
    }
    setProductForm({
      name: '',
      subtitle: '',
      price: 35,
      originalPrice: 45,
      category: 'ציפוי זהב 18K',
      categorySlug: 'gold',
      material: '',
      dimensions: '',
      description: '',
      badge: '',
      inStock: true,
      images: ['/images/products/item3_original.jpg']
    });
  };

  const handleEditProductClick = (product) => {
    setEditingProductId(product.id);
    setProductForm({ ...product });
    setIsAddingProduct(true);
  };

  // Handle Password Change
  const handleChangePassSubmit = async (e) => {
    e.preventDefault();
    setPassMsg({ type: '', text: '' });
    if (newPass !== confirmPass) {
      setPassMsg({ type: 'error', text: 'אימות הסיסמה אינו תואם.' });
      return;
    }
    const res = await changePassword(currentPass, newPass);
    if (res.success) {
      setPassMsg({ type: 'success', text: res.message });
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
    } else {
      setPassMsg({ type: 'error', text: res.message });
    }
  };

  // Handle Legal Save
  const handleSaveLegal = () => {
    updateLegalContent(selectedLegalKey, { sections: legalSections });
    setLegalSaved(true);
    setTimeout(() => setLegalSaved(false), 2500);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="פאנל ניהול חנות">
      <div className="modal-backdrop" onClick={() => setIsAdminModalOpen(false)} />

      <div className="modal-card admin-modal-card">
        
        {/* Header */}
        <div className="modal-header admin-modal-header">
          <div className="admin-header-title-box">
            <ShieldCheck size={24} className="admin-icon-gold" />
            <div>
              <h2 className="modal-title">פאנל ניהול ושליטה — משכן לב</h2>
              <span className="admin-sub">ניהול תכנים, מוצרים, תשלום ב-Bit ומסד נתונים מאובטח</span>
            </div>
          </div>

          <div className="admin-top-actions">
            {isAuthenticated && (
              <button type="button" className="btn-logout" onClick={logout}>
                התנתק
              </button>
            )}
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsAdminModalOpen(false)}
              aria-label="סגור פאנל ניהול"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* NOT AUTHENTICATED: LOGIN FORM */}
        {!isAuthenticated ? (
          <div className="admin-login-view">
            <div className="login-shield-badge">
              <Lock size={36} />
            </div>
            <h3>אימות מנהל מערכת מאובטח</h3>
            <p className="login-hint">
              הגישה לאזור הניהול מוגנת בהצפנת Web Crypto API ונעילת Brute Force.
            </p>

            {authRecord?.isDefault && (
              <div className="default-pass-notice">
                <AlertTriangle size={16} />
                <span>סיסמת ראשונית מוגדרת למערכת: <strong>mishkan2026</strong> (מומלץ להחליף מיד בכניסה בלשונית אבטחה).</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="admin-login-form">
              <div className="form-group">
                <label htmlFor="admin-pass" className="form-label">
                  הזן סיסמת מנהל:
                </label>
                <input
                  id="admin-pass"
                  type="password"
                  required
                  autoFocus
                  className="form-input"
                  placeholder="הזן סיסמה..."
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>

              {loginError && (
                <div className="login-error-badge">
                  <AlertTriangle size={16} />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn-primary full-width"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'מאמת...' : 'כניסה למערכת'}
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED: FULL CMS TABS */
          <div className="admin-dashboard-container">
            
            {/* Tabs Bar */}
            <div className="admin-tabs-nav" role="tablist">
              <button
                type="button"
                className={`admin-tab ${activeTab === 'store' ? 'active' : ''}`}
                onClick={() => setActiveTab('store')}
              >
                <Settings size={17} />
                <span>חזון ופרטי עסק</span>
              </button>

              <button
                type="button"
                className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
                onClick={() => setActiveTab('products')}
              >
                <Package size={17} />
                <span>מוצרים ({products.length})</span>
              </button>

              <button
                type="button"
                className={`admin-tab ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <ShoppingBag size={17} />
                <span>הזמנות לקוחות ({orders.length})</span>
              </button>

              <button
                type="button"
                className={`admin-tab ${activeTab === 'legal' ? 'active' : ''}`}
                onClick={() => setActiveTab('legal')}
              >
                <FileText size={17} />
                <span>נהלים ומשפטיזציה</span>
              </button>

              <button
                type="button"
                className={`admin-tab ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <Key size={17} />
                <span>אבטחה וסיסמה</span>
              </button>
            </div>

            {/* TAB 1: Store & Vision Config */}
            {activeTab === 'store' && (
              <div className="admin-tab-pane">
                <form onSubmit={handleSaveConfig} className="admin-form">
                  <div className="tab-pane-header">
                    <h3>עריכת פרטי החנות, החזון ואמצעי הקשר</h3>
                    <button type="submit" className="btn-primary btn-sm">
                      <Save size={16} />
                      <span>{configSaved ? 'נשמר בהצלחה!' : 'שמור שינויים'}</span>
                    </button>
                  </div>

                  <div className="form-section-title">הודעה ראשית ושם חנות</div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">שם המותג</label>
                      <input
                        type="text"
                        className="form-input"
                        value={configForm.storeName}
                        onChange={(e) =>
                          setConfigForm({ ...configForm, storeName: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">תת-כותרת ראשית</label>
                      <input
                        type="text"
                        className="form-input"
                        value={configForm.tagline}
                        onChange={(e) =>
                          setConfigForm({ ...configForm, tagline: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-group full-width">
                      <label className="form-label">פס מבזק עליון (Announcement Bar)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={configForm.announcement}
                        onChange={(e) =>
                          setConfigForm({ ...configForm, announcement: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="form-section-title">תשתית תשלום ב-Bit וקשר ישיר</div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">מספר טלפון לתשלום ב-Bit</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="050-1234567"
                        value={configForm.contact?.bitPhone || ''}
                        onChange={(e) =>
                          setConfigForm({
                            ...configForm,
                            contact: { ...configForm.contact, bitPhone: e.target.value }
                          })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">שם בעל חשבון ה-Bit</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="משכן לב / שמך"
                        value={configForm.contact?.bitName || ''}
                        onChange={(e) =>
                          setConfigForm({
                            ...configForm,
                            contact: { ...configForm.contact, bitName: e.target.value }
                          })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">מספר WhatsApp להזמנות (בינלאומי, ללא +)</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="972501234567"
                        value={configForm.contact?.whatsapp || ''}
                        onChange={(e) =>
                          setConfigForm({
                            ...configForm,
                            contact: { ...configForm.contact, whatsapp: e.target.value }
                          })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">כתובת דוא"ל רשמית</label>
                      <input
                        type="email"
                        className="form-input"
                        value={configForm.contact?.email || ''}
                        onChange={(e) =>
                          setConfigForm({
                            ...configForm,
                            contact: { ...configForm.contact, email: e.target.value }
                          })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">דמי משלוח רגיל (₪)</label>
                      <input
                        type="number"
                        className="form-input"
                        value={configForm.shipping?.standardShippingFee || 25}
                        onChange={(e) =>
                          setConfigForm({
                            ...configForm,
                            shipping: {
                              ...configForm.shipping,
                              standardShippingFee: Number(e.target.value)
                            }
                          })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">רף קנייה למשלוח חינם (₪)</label>
                      <input
                        type="number"
                        className="form-input"
                        value={configForm.shipping?.freeShippingThreshold || 150}
                        onChange={(e) =>
                          setConfigForm({
                            ...configForm,
                            shipping: {
                              ...configForm.shipping,
                              freeShippingThreshold: Number(e.target.value)
                            }
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="form-section-title">חזון האתר וסיפור המותג</div>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label className="form-label">כותרת החזון</label>
                      <input
                        type="text"
                        className="form-input"
                        value={configForm.vision?.title || ''}
                        onChange={(e) =>
                          setConfigForm({
                            ...configForm,
                            vision: { ...configForm.vision, title: e.target.value }
                          })
                        }
                      />
                    </div>

                    <div className="form-group full-width">
                      <label className="form-label">תת-כותרת החזון</label>
                      <input
                        type="text"
                        className="form-input"
                        value={configForm.vision?.subtitle || ''}
                        onChange={(e) =>
                          setConfigForm({
                            ...configForm,
                            vision: { ...configForm.vision, subtitle: e.target.value }
                          })
                        }
                      />
                    </div>

                    {(configForm.vision?.paragraphs || []).map((p, idx) => (
                      <div key={idx} className="form-group full-width">
                        <label className="form-label">פסקה {idx + 1}</label>
                        <textarea
                          rows={3}
                          className="form-textarea"
                          value={p}
                          onChange={(e) => {
                            const newParas = [...configForm.vision.paragraphs];
                            newParas[idx] = e.target.value;
                            setConfigForm({
                              ...configForm,
                              vision: { ...configForm.vision, paragraphs: newParas }
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: Products Management */}
            {activeTab === 'products' && (
              <div className="admin-tab-pane">
                <div className="tab-pane-header">
                  <h3>ניהול קולקציית התכשיטים</h3>
                  <button
                    type="button"
                    className="btn-primary btn-sm"
                    onClick={() => {
                      setIsAddingProduct(!isAddingProduct);
                      setEditingProductId(null);
                    }}
                  >
                    <Plus size={16} />
                    <span>{isAddingProduct ? 'ביטול הוספה' : 'הוסף תכשיט חדש'}</span>
                  </button>
                </div>

                {/* Add/Edit Product Form */}
                {isAddingProduct && (
                  <form onSubmit={handleSaveProduct} className="product-edit-form">
                    <h4>{editingProductId ? 'עריכת תכשיט קיים' : 'הוספת תכשיט חדש לקולקציה'}</h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">שם התכשיט</label>
                        <input
                          type="text"
                          required
                          className="form-input"
                          value={productForm.name}
                          onChange={(e) =>
                            setProductForm({ ...productForm, name: e.target.value })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">מחיר בש"ח (₪)</label>
                        <input
                          type="number"
                          required
                          className="form-input"
                          value={productForm.price}
                          onChange={(e) =>
                            setProductForm({ ...productForm, price: Number(e.target.value) })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">מחיר קודם למבצע (אופציונלי)</label>
                        <input
                          type="number"
                          className="form-input"
                          value={productForm.originalPrice || ''}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              originalPrice: Number(e.target.value)
                            })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">קטגוריה</label>
                        <select
                          className="form-input"
                          value={productForm.categorySlug}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              categorySlug: e.target.value,
                              category:
                                e.target.value === 'gold'
                                  ? 'ציפוי זהב 18K'
                                  : e.target.value === 'silver'
                                  ? 'כסף סטרלינג 925'
                                  : 'תליוני לב וקדושה'
                            })
                          }
                        >
                          <option value="gold">ציפוי זהב 18K</option>
                          <option value="silver">כסף סטרלינג 925</option>
                          <option value="heart">תליוני לב וקדושה</option>
                        </select>
                      </div>

                      <div className="form-group full-width">
                        <label className="form-label">תיאור קצר</label>
                        <input
                          type="text"
                          className="form-input"
                          value={productForm.subtitle}
                          onChange={(e) =>
                            setProductForm({ ...productForm, subtitle: e.target.value })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">חומר</label>
                        <input
                          type="text"
                          className="form-input"
                          value={productForm.material}
                          onChange={(e) =>
                            setProductForm({ ...productForm, material: e.target.value })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">מידות</label>
                        <input
                          type="text"
                          className="form-input"
                          value={productForm.dimensions}
                          onChange={(e) =>
                            setProductForm({ ...productForm, dimensions: e.target.value })
                          }
                        />
                      </div>

                      <div className="form-group full-width">
                        <label className="form-label">תיאור מלא</label>
                        <textarea
                          rows={3}
                          className="form-textarea"
                          value={productForm.description}
                          onChange={(e) =>
                            setProductForm({ ...productForm, description: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn-primary">
                        שמור תכשיט
                      </button>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => setIsAddingProduct(false)}
                      >
                        ביטול
                      </button>
                    </div>
                  </form>
                )}

                {/* Products Table */}
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>תמונה</th>
                        <th>שם המוצר</th>
                        <th>מחיר</th>
                        <th>קטגוריה</th>
                        <th>סטטוס מלאי</th>
                        <th>פעולות</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <img
                              src={p.images?.[0] || '/images/products/item3_original.jpg'}
                              alt=""
                              className="table-thumb"
                            />
                          </td>
                          <td>
                            <strong>{p.name}</strong>
                            <div className="table-sub">{p.subtitle}</div>
                          </td>
                          <td>
                            <strong className="table-price">₪{p.price}</strong>
                          </td>
                          <td>{p.category}</td>
                          <td>
                            <button
                              type="button"
                              className={`stock-badge ${p.inStock ? 'in-stock' : 'out-of-stock'}`}
                              onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                            >
                              {p.inStock ? 'במלאי' : 'אזל'}
                            </button>
                          </td>
                          <td>
                            <div className="table-actions">
                              <button
                                type="button"
                                className="action-btn-edit"
                                onClick={() => handleEditProductClick(p)}
                                title="ערוך מוצר"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                type="button"
                                className="action-btn-del"
                                onClick={() => {
                                  if (confirm(`האם למחוק את ${p.name}?`)) {
                                    deleteProduct(p.id);
                                  }
                                }}
                                title="מחק מוצר"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: Orders List (CRM) */}
            {activeTab === 'orders' && (
              <div className="admin-tab-pane">
                <div className="tab-pane-header">
                  <h3>הזמנות ומעקב לקוחות</h3>
                  <span className="order-stats-badge">סה"כ {orders.length} הזמנות</span>
                </div>

                {orders.length === 0 ? (
                  <div className="empty-orders-view">
                    <ShoppingBag size={40} />
                    <p>טרם נכנסו הזמנות למערכת.</p>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders.map((ord) => (
                      <div key={ord.id} className="order-card">
                        <div className="order-card-header">
                          <div>
                            <strong className="order-id">{ord.id}</strong>
                            <span className="order-date">
                              {new Date(ord.createdAt).toLocaleString('he-IL')}
                            </span>
                          </div>

                          <div className="order-status-selector">
                            <label>סטטוס:</label>
                            <select
                              value={ord.status}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                              className="order-select"
                            >
                              <option value="חדש - ממתין לאישור תשלום">חדש - ממתין לאישור תשלום</option>
                              <option value="תשלום אושר ב-Bit">תשלום אושר ב-Bit</option>
                              <option value="נארז ונשלח ללקוח">נארז ונשלח ללקוח</option>
                              <option value="הושלם">הושלם</option>
                            </select>
                          </div>
                        </div>

                        <div className="order-details-grid">
                          <div className="order-customer-box">
                            <h4>פרטי הלקוח:</h4>
                            <p><strong>שם:</strong> {ord.customerInfo?.fullName}</p>
                            <p><strong>טלפון:</strong> {ord.customerInfo?.phone}</p>
                            {ord.customerInfo?.email && (
                              <p><strong>דוא"ל:</strong> {ord.customerInfo?.email}</p>
                            )}
                            <p>
                              <strong>משלוח:</strong>{' '}
                              {ord.customerInfo?.deliveryMethod === 'pickup'
                                ? 'איסוף עצמי בירושלים'
                                : `${ord.customerInfo?.street || ''}, ${ord.customerInfo?.city || ''}`}
                            </p>
                            {ord.customerInfo?.notes && (
                              <p><strong>הערות:</strong> {ord.customerInfo?.notes}</p>
                            )}
                          </div>

                          <div className="order-items-box">
                            <h4>פריטים בהזמנה:</h4>
                            <ul>
                              {(ord.items || []).map((it, idx) => (
                                <li key={idx}>
                                  {it.product.name} (כמות: {it.quantity}) — ₪
                                  {it.product.price * it.quantity}
                                </li>
                              ))}
                            </ul>
                            <div className="order-totals">
                              <span>משלוח: ₪{ord.shippingFee}</span>
                              <strong>סה"כ: ₪{ord.total}</strong>
                            </div>
                          </div>
                        </div>

                        {ord.customerInfo?.phone && (
                          <div className="order-card-footer">
                            <a
                              href={`https://wa.me/${ord.customerInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                                `שלום ${ord.customerInfo.fullName}, כאן משכן לב בנוגע להזמנתך ${ord.id} ✨`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-wa-order-contact"
                            >
                              <MessageCircle size={16} />
                              <span>פנה ללקוח בוואטסאפ</span>
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: Legal & Policies */}
            {activeTab === 'legal' && (
              <div className="admin-tab-pane">
                <div className="tab-pane-header">
                  <h3>עריכת נהלים, תקנון ומסמכים משפטיים</h3>
                  <button type="button" className="btn-primary btn-sm" onClick={handleSaveLegal}>
                    <Save size={16} />
                    <span>{legalSaved ? 'נשמר בהצלחה!' : 'שמור מסמך'}</span>
                  </button>
                </div>

                <div className="legal-doc-selector-bar">
                  {[
                    { id: 'terms', name: 'תקנון ותנאי שימוש' },
                    { id: 'cancellation', name: 'ביטול עסקה (חוק הגנת הצרכן)' },
                    { id: 'warranty', name: 'תעודת אחריות על תכשיטים' },
                    { id: 'privacy', name: 'מדיניות פרטיות (תיקון 13)' },
                    { id: 'accessibility', name: 'הצהרת נגישות (ת"י 5568)' }
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      className={`doc-pill ${selectedLegalKey === d.id ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedLegalKey(d.id);
                        setLegalSections(legalContent[d.id]?.sections || []);
                      }}
                    >
                      {d.name}
                    </button>
                  ))}
                </div>

                <div className="legal-editor-sections">
                  {legalSections.map((sec, idx) => (
                    <div key={idx} className="legal-edit-block">
                      <label className="form-label">סעיף {idx + 1} - כותרת:</label>
                      <input
                        type="text"
                        className="form-input"
                        value={sec.title}
                        onChange={(e) => {
                          const updated = [...legalSections];
                          updated[idx].title = e.target.value;
                          setLegalSections(updated);
                        }}
                      />

                      <label className="form-label" style={{ marginTop: '8px' }}>
                        תוכן הסעיף:
                      </label>
                      <textarea
                        rows={4}
                        className="form-textarea"
                        value={sec.content}
                        onChange={(e) => {
                          const updated = [...legalSections];
                          updated[idx].content = e.target.value;
                          setLegalSections(updated);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: Security & Password */}
            {activeTab === 'security' && (
              <div className="admin-tab-pane">
                <div className="tab-pane-header">
                  <h3>אבטחת מידע, סייבר והחלפת סיסמה</h3>
                </div>

                <div className="security-overview-card">
                  <div className="sec-item">
                    <ShieldCheck size={20} className="sec-icon-green" />
                    <div>
                      <strong>הצפנת גיבוב סיסמאות:</strong> PBKDF2 עם HMAC-SHA-256 (100,000 איטרציות) ומלח קריפטוגרפי אקראי של 16 בייטים.
                    </div>
                  </div>

                  <div className="sec-item">
                    <ShieldCheck size={20} className="sec-icon-green" />
                    <div>
                      <strong>הגנת Brute Force:</strong> נעילה מדורגת (Rate Limiting) לאחר 5 ניסיונות שגויים.
                    </div>
                  </div>

                  <div className="sec-item">
                    <ShieldCheck size={20} className="sec-icon-green" />
                    <div>
                      <strong>פרטיות לקוחות:</strong> אין איסוף כרטיסי אשראי באתר. תשלום ישיר בערוצי Bit בלבד.
                    </div>
                  </div>
                </div>

                <form onSubmit={handleChangePassSubmit} className="change-pass-form">
                  <h4>החלפת סיסמת מנהל</h4>
                  
                  {passMsg.text && (
                    <div className={`pass-msg-banner ${passMsg.type}`}>
                      {passMsg.type === 'success' ? <Check size={16} /> : <AlertTriangle size={16} />}
                      <span>{passMsg.text}</span>
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">סיסמה נוכחית</label>
                    <input
                      type="password"
                      required
                      className="form-input"
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">סיסמה חדשה (לפחות 8 תווים, אות ומספר)</label>
                    <input
                      type="password"
                      required
                      className="form-input"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">אימות סיסמה חדשה</label>
                    <input
                      type="password"
                      required
                      className="form-input"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn-primary">
                    עדכן סיסמה מאובטחת
                  </button>
                </form>

                <div className="danger-zone-box">
                  <h4>אזור איפוס מערכת</h4>
                  <p>איפוס כלל הנתונים המקומיים (מוצרים, טקסטי חזון, תקנונים) להגדרות היצרן המקוריות.</p>
                  <button
                    type="button"
                    className="btn-danger-reset"
                    onClick={() => {
                      if (confirm('אזהרה: פעולה זו תאפס את כל השינויים שביצעת להגדרות ברירת המחדל המקוריות. להמשיך?')) {
                        resetToDefaults();
                        alert('המערכת אופסה בהצלחה.');
                        window.location.reload();
                      }
                    }}
                  >
                    <RefreshCw size={16} />
                    <span>איפוס מלא לברירת מחדל</span>
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
