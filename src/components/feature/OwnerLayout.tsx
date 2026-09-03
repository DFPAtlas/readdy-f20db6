import { useState, type ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { navItems } from '@/mocks/admin';
import { useAdminAuth } from '@/context/AdminAuthContext';

function OwnerSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
      style={{
        backgroundColor: '#0a0a12',
        borderColor: '#1a1a2e',
      }}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b" style={{ borderColor: '#1a1a2e' }}>
        {!collapsed && (
          <span className="font-heading text-lg font-bold tracking-tight">
            <span style={{ color: '#FFF4E8' }}>Off</span>
            <span style={{ color: '#FF2DAA' }}>Script</span>
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors cursor-pointer ml-auto"
        >
          <i className={`text-sm ${collapsed ? 'ri-arrow-right-s-line' : 'ri-arrow-left-s-line'}`} style={{ color: '#FF2DAA' }}></i>
        </button>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-all cursor-pointer ${
                isActive
                  ? 'border-r-2'
                  : 'hover:bg-white/5'
              } ${collapsed ? 'justify-center' : ''}`}
              style={{
                borderColor: isActive ? '#FF2DAA' : 'transparent',
                color: isActive ? '#FF2DAA' : '#FFF4E8',
              }}
            >
              <span className="w-5 h-5 flex items-center justify-center">
                <i className={`${item.icon} text-lg`}></i>
              </span>
              {!collapsed && (
                <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t" style={{ borderColor: '#1a1a2e' }}>
        <button
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all cursor-pointer ${collapsed ? 'justify-center' : ''}`}
          style={{ color: '#FF6B5F' }}
        >
          <span className="w-5 h-5 flex items-center justify-center">
            <i className="ri-logout-box-r-line text-lg"></i>
          </span>
          {!collapsed && <span className="text-sm font-medium">Back to Site</span>}
        </button>
      </div>
    </aside>
  );
}

export function OwnerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#090812' }}>
      <OwnerSidebar />
      <main className="ml-64 transition-all duration-300">
        <div className="p-6 md:p-8 min-h-screen">{children}</div>
      </main>
    </div>
  );
}