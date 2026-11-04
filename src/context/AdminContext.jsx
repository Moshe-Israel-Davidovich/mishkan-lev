import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createPasswordRecord,
  verifyPassword,
  validatePasswordPolicy,
  createAdminSession,
  validateAdminSession,
  clearAdminSession,
  recordFailedLoginAttempt,
  recordSuccessfulLogin,
  getLockoutStatus
} from '../utils/security';

const AdminContext = createContext();

const ADMIN_STORAGE_KEY = 'mishkan_admin_credentials_v1';

// Default initial password record for "mishkan2026"
const DEFAULT_INITIAL_RECORD = {
  salt: '8e3a9d1588de6e8605a250f1f637bed8',
  hash: 'b082838be4cfcae9ff27ecdb6d50274fe0f8afb4e9543899c02049e19551a8ae',
  iterations: 100000,
  updatedAt: new Date().toISOString(),
  isDefault: true
};

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [authRecord, setAuthRecord] = useState(() => {
    try {
      const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_INITIAL_RECORD;
    } catch {
      return DEFAULT_INITIAL_RECORD;
    }
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Check active session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const result = await validateAdminSession();
        if (result.isValid) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkSession();
  }, []);

  // Sync auth record to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(authRecord));
    } catch (e) {
      console.error('Failed to save auth record', e);
    }
  }, [authRecord]);

  // Login handler
  const login = async (password) => {
    // 1. Check lockout
    const lockout = getLockoutStatus();
    if (lockout.isLocked) {
      const minutes = Math.ceil(lockout.remainingSeconds / 60);
      return {
        success: false,
        message: `הגישה ננעלה זמנית עקב ריבוי ניסיונות כושלים. יש להמתין ${minutes} דקות.`
      };
    }

    // 2. Verify password
    try {
      const isValid = await verifyPassword(
        password,
        authRecord.hash,
        authRecord.salt
      );

      if (!isValid) {
        const attempt = recordFailedLoginAttempt();
        const remaining = attempt.maxAttempts - attempt.attempts;
        return {
          success: false,
          message:
            remaining > 0
              ? `סיסמה שגויה. נותרו ${remaining} ניסיונות לפני נעילה זמנית.`
              : `סיסמה שגויה. המערכת ננעלה להגנה על המידע.`
        };
      }

      // 3. Success
      recordSuccessfulLogin();
      await createAdminSession('admin');
      setIsAuthenticated(true);
      return {
        success: true,
        isDefaultPassword: authRecord.isDefault
      };
    } catch (err) {
      return {
        success: false,
        message: 'שגיאה באימות הסיסמה. אנא נסה שנית.'
      };
    }
  };

  // Logout handler
  const logout = () => {
    clearAdminSession();
    setIsAuthenticated(false);
    setIsAdminModalOpen(false);
  };

  // Change password handler
  const changePassword = async (currentPassword, newPassword) => {
    // 1. Verify current password
    const isCurrentValid = await verifyPassword(
      currentPassword,
      authRecord.hash,
      authRecord.salt
    );
    if (!isCurrentValid) {
      return {
        success: false,
        message: 'הסיסמה הנוכחית שהוזנה אינה נכונה.'
      };
    }

    // 2. Validate password policy
    const policy = validatePasswordPolicy(newPassword);
    if (!policy.isValid) {
      return {
        success: false,
        message: policy.errors[0] || 'הסיסמה החדשה אינה עומדת בדרישות האבטחה.'
      };
    }

    // 3. Hash and store new password
    try {
      const newRecord = await createPasswordRecord(newPassword);
      setAuthRecord({
        ...newRecord,
        isDefault: false
      });
      return {
        success: true,
        message: 'הסיסמה שונתה בהצלחה!'
      };
    } catch (err) {
      return {
        success: false,
        message: 'אירעה שגיאה בגיבוב הסיסמה החדשה.'
      };
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        isCheckingAuth,
        isAdminModalOpen,
        setIsAdminModalOpen,
        authRecord,
        login,
        logout,
        changePassword
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
