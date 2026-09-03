import { useState } from 'react';
import { systemHealth } from '@/mocks/admin';

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string; glow: string }> = {
    healthy: { bg: 'rgba(46,229,157,0.15)', text: '#2EE59D', glow: '0 0 10px rgba(46,229,157,0.3)' },
    warning: { bg: 'rgba(255,107,95,0.15)', text: '#FF6B5F', glow: '0 0 10px rgba(255,107,95,0.3)' },
    error: { bg: 'rgba(255,43,90,0.2)', text: '#FF2DAA', glow: '0 0 10px rgba(255,43,90,0.3)' },
  };
  const s = colors[status] || colors.error;
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: s.bg, color: s.text }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.text, boxShadow: s.glow }}></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function OwnerSystemHealth() {
  const [lastCheck, setLastCheck] = useState('2026-07-07T10:05:00Z');
  const [checking, setChecking] = useState(false);

  const healthyCount = systemHealth.filter((h) => h.status === 'healthy').length;
  const warningCount = systemHealth.filter((h) => h.status === 'warning').length;
  const errorCount = systemHealth.filter((h) => h.status === 'error').length;

  const runHealthCheck = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      setLastCheck(new Date().toISOString());
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold" style={{ color: '#FFF4E8' }}>System Health</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,244,232,0.5)' }}>Monitor all connected services and infrastructure.</p>
        </div>
        <button onClick={runHealthCheck} disabled={checking} className="px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90 flex items-center gap-2" style={{ backgroundColor: '#FF2DAA', color: '#090812' }}>
          <i className={`ri-refresh-line ${checking ? 'animate-spin' : ''}`}></i>
          {checking ? 'Checking...' : 'Run Full Health Check'}
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl p-4 text-center" style={{ backgroundColor: 'rgba(46,229,157,0.1)', border: '1px solid rgba(46,229,157,0.2)' }}>
          <p className="text-3xl font-heading font-bold" style={{ color: '#2EE59D' }}>{healthyCount}</p>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,244,232,0.5)' }}>Healthy</p>
        </div>
        <div className="rounded-xl p-4 text-center" style={{ backgroundColor: 'rgba(255,107,95,0.1)', border: '1px solid rgba(255,107,95,0.2)' }}>
          <p className="text-3xl font-heading font-bold" style={{ color: '#FF6B5F' }}>{warningCount}</p>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,244,232,0.5)' }}>Warning</p>
        </div>
        <div className="rounded-xl p-4 text-center" style={{ backgroundColor: 'rgba(255,43,90,0.1)', border: '1px solid rgba(255,43,90,0.2)' }}>
          <p className="text-3xl font-heading font-bold" style={{ color: '#FF2DAA' }}>{errorCount}</p>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,244,232,0.5)' }}>Error</p>
        </div>
      </div>

      <p className="text-xs" style={{ color: 'rgba(255,244,232,0.3)' }}>Last checked: {new Date(lastCheck).toLocaleString('en-GB')}</p>

      {/* Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {systemHealth.map((h) => (
          <div key={h.id} className="rounded-xl p-5" style={{ backgroundColor: 'rgba(43,20,79,0.15)', border: `1px solid ${h.status === 'error' ? 'rgba(255,43,90,0.3)' : h.status === 'warning' ? 'rgba(255,107,95,0.3)' : 'rgba(43,20,79,0.3)'}` }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading text-sm font-semibold" style={{ color: '#FFF4E8' }}>{h.name}</h3>
              <StatusBadge status={h.status} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs" style={{ color: 'rgba(255,244,232,0.4)' }}>Response Time</span>
                <span className="text-xs font-medium" style={{ color: '#FFF4E8' }}>{h.response_time > 0 ? `${h.response_time}ms` : 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs" style={{ color: 'rgba(255,244,232,0.4)' }}>Last Checked</span>
                <span className="text-xs" style={{ color: 'rgba(255,244,232,0.5)' }}>{new Date(h.last_checked).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              </div>
              {h.error_message && (
                <div className="rounded-lg p-2 mt-2" style={{ backgroundColor: h.status === 'error' ? 'rgba(255,43,90,0.1)' : 'rgba(255,107,95,0.1)', border: `1px solid ${h.status === 'error' ? 'rgba(255,43,90,0.2)' : 'rgba(255,107,95,0.2)'}` }}>
                  <p className="text-xs" style={{ color: h.status === 'error' ? '#FF2DAA' : '#FF6B5F' }}>{h.error_message}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}