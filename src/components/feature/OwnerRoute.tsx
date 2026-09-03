import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { OwnerLayout } from '@/components/feature/OwnerLayout';
import type { ReactNode } from 'react';

export function OwnerRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isAdmin, otpVerified } = useAdminAuth();

  if (!isAuthenticated) {
    return <Navigate to="/owner/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#090812' }}>
        <div className="text-center">
          <i className="ri-lock-line text-6xl mb-4 block" style={{ color: '#FF2DAA' }}></i>
          <h1 className="font-heading text-2xl font-bold mb-2" style={{ color: '#FFF4E8' }}>Access Denied</h1>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,244,232,0.5)' }}>Your account does not have admin privileges.</p>
          <a href="/" className="px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90 inline-block" style={{ backgroundColor: '#FF2DAA', color: '#090812' }}>
            Back to Website
          </a>
        </div>
      </div>
    );
  }

  return <OwnerLayout>{children}</OwnerLayout>;
}