import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { adminUsers } from '@/mocks/admin';

interface AdminUser {
  id: string;
  email: string;
  display_name: string;
  role: string;
  active: boolean;
  otp_enabled: boolean;
  otp_secret: string;
  recovery_codes: string[];
  last_login: string | null;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; needsOTP: boolean; needsSetup: boolean; error?: string }>;
  logout: () => void;
  verifyOTP: (code: string) => boolean;
  setupOTP: (secret: string) => boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  otpVerified: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

const STORAGE_KEY = 'offscript_admin_session';

function getStoredSession(): { user: AdminUser | null; otpVerified: boolean } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, otpVerified: false };
    const parsed = JSON.parse(raw);
    return { user: parsed.user || null, otpVerified: parsed.otpVerified || false };
  } catch {
    return { user: null, otpVerified: false };
  }
}

function setStoredSession(user: AdminUser | null, otpVerified: boolean) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, otpVerified }));
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const stored = getStoredSession();
  const [user, setUser] = useState<AdminUser | null>(stored.user);
  const [otpVerified, setOtpVerified] = useState(stored.otpVerified);
  const [isLoading] = useState(false);

  const isAuthenticated = user !== null;
  const isAdmin = user !== null && user.active;

  const login = useCallback(async (email: string, password: string) => {
    // TODO: Replace with Supabase auth call
    const found = adminUsers.find((u) => u.email === email && u.password === password);
    if (!found) {
      return { success: false, needsOTP: false, needsSetup: false, error: 'Invalid email or password' };
    }

    if (!found.active) {
      // TODO: Log denied attempt to audit_logs
      return { success: false, needsOTP: false, needsSetup: false, error: 'Account inactive. Access denied.' };
    }

    const { password: _p, ...userWithoutPassword } = found;
    const adminUser = userWithoutPassword as unknown as AdminUser;

    setUser(adminUser);
    setStoredSession(adminUser, false);

    if (!adminUser.otp_enabled) {
      return { success: true, needsOTP: false, needsSetup: true };
    }

    return { success: true, needsOTP: true, needsSetup: false };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setOtpVerified(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const verifyOTP = useCallback((code: string) => {
    // TODO: Replace with TOTP verification via Supabase Edge Function
    // For demo: accept "123456" as valid
    if (code === '123456') {
      setOtpVerified(true);
      setStoredSession(user, true);
      return true;
    }
    return false;
  }, [user]);

  const setupOTP = useCallback((secret: string) => {
    if (!user) return false;
    // TODO: Replace with Supabase update
    const updated = { ...user, otp_enabled: true, otp_secret: secret };
    setUser(updated);
    setOtpVerified(true);
    setStoredSession(updated, true);
    return true;
  }, [user]);

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        verifyOTP,
        setupOTP,
        isAuthenticated,
        isAdmin,
        otpVerified,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return ctx;
}