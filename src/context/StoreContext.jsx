import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_STORE_CONFIG, INITIAL_PRODUCTS } from '../data/initialData';
import { defaultLegalContent, LEGAL_STORAGE_KEY } from '../data/legalContent';

const StoreContext = createContext();

const STORAGE_KEYS = {
  CONFIG: 'mishkan_store_config_v1',
  PRODUCTS: 'mishkan_products_v2',
  ORDERS: 'mishkan_orders_v1'
};

export function StoreProvider({ children }) {
  // Store configuration (vision, contacts, shipping)
  const [storeConfig, setStoreConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return saved ? JSON.parse(saved) : INITIAL_STORE_CONFIG;
    } catch {
      return INITIAL_STORE_CONFIG;
    }
  });

  // Products
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Legal texts
  const [legalContent, setLegalContent] = useState(() => {
    try {
      const saved = localStorage.getItem(LEGAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultLegalContent;
    } catch {
      return defaultLegalContent;
    }
  });

  // Orders received
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Selected category filter
  const [activeCategory, setActiveCategory] = useState('all');

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(storeConfig));
    } catch (e) {
      console.error('Failed to save storeConfig', e);
    }
  }, [storeConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(LEGAL_STORAGE_KEY, JSON.stringify(legalContent));
    } catch (e) {
      console.error('Failed to save legalContent', e);
    }
  }, [legalContent]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  }, [orders]);

  // Update store config
  const updateStoreConfig = (newConfig) => {
    setStoreConfig((prev) => ({
      ...prev,
      ...newConfig
    }));
  };

  // Add new product
  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: productData.id || `product-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  // Update product
  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  // Delete product
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Update legal content
  const updateLegalContent = (key, updatedData) => {
    setLegalContent((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...updatedData
      }
    }));
  };

  // Record an order
  const recordOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'חדש - ממתין לאישור תשלום'
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Reset all to defaults
  const resetToDefaults = () => {
    setStoreConfig(INITIAL_STORE_CONFIG);
    setProducts(INITIAL_PRODUCTS);
    setLegalContent(defaultLegalContent);
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(LEGAL_STORAGE_KEY);
  };

  // Filtered products list
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.categorySlug === activeCategory);

  return (
    <StoreContext.Provider
      value={{
        storeConfig,
        updateStoreConfig,
        products,
        filteredProducts,
        activeCategory,
        setActiveCategory,
        addProduct,
        updateProduct,
        deleteProduct,
        legalContent,
        updateLegalContent,
        orders,
        recordOrder,
        updateOrderStatus,
        resetToDefaults
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
