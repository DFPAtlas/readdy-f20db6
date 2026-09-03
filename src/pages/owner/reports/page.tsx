import { useState, useMemo } from 'react';
import { reports } from '@/mocks/admin';

function SeverityBadge({ severity }: { severity: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    critical: { bg: 'rgba(255,43,90,0.2)', text: '#FF2DAA' },
    high: { bg: 'rgba(255,107,95,0.15)', text: '#FF6B5F' },
    medium: { bg: 'rgba(255,244,232,0.1)', text: 'rgba(255,244,232,0.7)' },
    low: { bg: 'rgba(46,229,157,0.1)', text: '#2EE59D' },
  };
  const s = colors[severity] || colors.low;
  return <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: s.bg, color: s.text }}>{severity.charAt(0).toUpperCase() + severity.slice(1)}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    open: { bg: 'rgba(255,107,95,0.15)', text: '#FF6B5F' },
    reviewing: { bg: 'rgba(255,244,232,0.1)', text: 'rgba(255,244,232,0.7)' },
    resolved: { bg: 'rgba(46,229,157,0.15)', text: '#2EE59D' },
    dismissed: { bg: 'rgba(255,244,232,0.05)', text: 'rgba(255,244,232,0.4)' },
    escalated: { bg: 'rgba(255,43,90,0.2)', text: '#FF2DAA' },
  };
  const s = colors[status] || colors.open;
  return <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: s.bg, color: s.text }}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
}

export default function OwnerReports() {
  const [activeTab, setActiveTab] = useState('open');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [selectedReport, setSelectedReport] = useState<(typeof reports)[0] | null>(null);
  const [reason, setReason] = useState('');

  const tabs = [
    { key: 'open', label: 'Open', count: reports.filter((r) => r.status === 'open').length },
    { key: 'reviewing', label: 'Reviewing', count: reports.filter((r) => r.status === 'reviewing').length },
    { key: 'resolved', label: 'Resolved', count: reports.filter((r) => r.status === 'resolved').length },
    { key: 'dismissed', label: 'Dismissed', count: reports.filter((r) => r.status === 'dismissed').length },
    { key: 'escalated', label: 'Escalated', count: reports.filter((r) => r.status === 'escalated').length },
  ];

  const filtered = useMemo(() => reports.filter((r) => r.status === activeTab), [activeTab]);

  const openModal = (action: string, report: (typeof reports)[0]) => {
    setModalAction(action);
    setSelectedReport(report);
    setModalOpen(true);
    setReason('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold" style={{ color: '#FFF4E8' }}>Reports</h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,244,232,0.5)' }}>User reports, safety flags, and moderation queue.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ backgroundColor: 'rgba(43,20,79,0.3)' }}>
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setActiveTab(t.key)} className="flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2" style={{ backgroundColor: activeTab === t.key ? 'rgba(255,45,170,0.2)' : 'transparent', color: activeTab === t.key ? '#FF2DAA' : 'rgba(255,244,232,0.5)' }}>
            {t.label} <span className="px-1.5 py-0.5 rounded-full text-xs" style={{ backgroundColor: activeTab === t.key ? 'rgba(255,45,170,0.2)' : 'rgba(255,244,232,0.1)', color: activeTab === t.key ? '#FF2DAA' : 'rgba(255,244,232,0.5)' }}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* Report Cards */}
      <div className="space-y-4">
        {filtered.map((r) => (
          <div key={r.id} className="rounded-xl p-6" style={{ backgroundColor: 'rgba(43,20,79,0.15)', border: '1px solid rgba(43,20,79,0.3)' }}>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <SeverityBadge severity={r.severity} />
                  <StatusBadge status={r.status} />
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(43,20,79,0.3)', color: 'rgba(255,244,232,0.5)' }}>{r.target_type}</span>
                </div>
                <h3 className="font-heading text-base font-semibold" style={{ color: '#FFF4E8' }}>{r.reason}</h3>
              </div>
              <span className="text-xs" style={{ color: 'rgba(255,244,232,0.3)' }}>{new Date(r.created_at).toLocaleDateString('en-GB')}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(9,8,18,0.4)' }}>
                <p className="text-xs" style={{ color: 'rgba(255,244,232,0.4)' }}>Reporter</p>
                <p className="text-sm font-medium mt-1" style={{ color: '#FFF4E8' }}>{r.reporter_name}</p>
              </div>
              <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(9,8,18,0.4)' }}>
                <p className="text-xs" style={{ color: 'rgba(255,244,232,0.4)' }}>Reported</p>
                <p className="text-sm font-medium mt-1" style={{ color: '#FFF4E8' }}>{r.reported_name}</p>
              </div>
            </div>

            <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: 'rgba(43,20,79,0.2)', border: '1px solid rgba(43,20,79,0.3)' }}>
              <p className="text-xs font-medium mb-2" style={{ color: '#FF2DAA' }}><i className="ri-robot-2-line mr-1"></i>AI Summary</p>
              <p className="text-sm" style={{ color: 'rgba(255,244,232,0.6)' }}>{r.ai_summary}</p>
            </div>

            {r.assigned_to && (
              <p className="text-xs mb-3" style={{ color: 'rgba(255,244,232,0.4)' }}>Assigned to: <span style={{ color: '#FF6B5F' }}>{r.assigned_to}</span></p>
            )}

            {r.status === 'open' || r.status === 'reviewing' ? (
              <div className="flex flex-wrap gap-2">
                {r.status === 'open' && <button onClick={() => openModal('review', r)} className="px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90" style={{ backgroundColor: 'rgba(255,244,232,0.1)', color: '#FFF4E8', border: '1px solid rgba(255,244,232,0.2)' }}>Start Review</button>}
                <button onClick={() => openModal('warn', r)} className="px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90" style={{ backgroundColor: '#FF6B5F', color: '#090812' }}>Warn</button>
                <button onClick={() => openModal('suspend', r)} className="px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90" style={{ backgroundColor: 'rgba(255,43,90,0.2)', color: '#FF2DAA', border: '1px solid rgba(255,43,90,0.3)' }}>Suspend</button>
                <button onClick={() => openModal('ban', r)} className="px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90" style={{ backgroundColor: '#FF2DAA', color: '#090812' }}>Ban</button>
                <button onClick={() => openModal('dismiss', r)} className="px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90" style={{ backgroundColor: 'rgba(255,244,232,0.05)', color: 'rgba(255,244,232,0.5)', border: '1px solid rgba(255,244,232,0.1)' }}>Dismiss</button>
                <button onClick={() => openModal('escalate', r)} className="px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90" style={{ backgroundColor: 'rgba(255,43,90,0.15)', color: '#FF2DAA', border: '1px solid rgba(255,43,90,0.3)' }}>Escalate</button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {r.status === 'escalated' && <button onClick={() => openModal('resolve', r)} className="px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90" style={{ backgroundColor: '#2EE59D', color: '#090812' }}>Resolve</button>}
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 rounded-xl" style={{ backgroundColor: 'rgba(43,20,79,0.15)', border: '1px solid rgba(43,20,79,0.3)' }}>
            <i className="ri-check-double-line text-4xl mb-3 block" style={{ color: 'rgba(255,244,232,0.2)' }}></i>
            <p className="text-sm" style={{ color: 'rgba(255,244,232,0.4)' }}>No reports in this queue.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(9,8,18,0.8)' }}>
          <div className="w-full max-w-md rounded-2xl p-6" style={{ backgroundColor: '#0a0a12', border: '1px solid rgba(43,20,79,0.5)' }}>
            <h3 className="font-heading text-lg font-semibold mb-3" style={{ color: '#FFF4E8' }}>{modalAction.charAt(0).toUpperCase() + modalAction.slice(1)} Report</h3>
            <p className="text-sm mb-4" style={{ color: 'rgba(255,244,232,0.5)' }}>Report against {selectedReport.reported_name}. Action requires reason.</p>
            <textarea value={reason} onChange={(e) => setReason(e.target.value)} maxLength={500} className="w-full px-3 py-2 rounded-xl text-sm outline-none mb-4 resize-none" style={{ backgroundColor: 'rgba(43,20,79,0.3)', border: '1px solid rgba(43,20,79,0.5)', color: '#FFF4E8' }} rows={3} placeholder="Enter reason for audit log..." />
            <div className="flex gap-3">
              <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all hover:bg-white/5" style={{ color: 'rgba(255,244,232,0.6)', border: '1px solid rgba(43,20,79,0.5)' }}>Cancel</button>
              <button onClick={() => { setModalOpen(false); setReason(''); }} disabled={!reason.trim()} className="flex-1 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all" style={{ backgroundColor: '#FF2DAA', color: '#090812', opacity: reason.trim() ? 1 : 0.5 }}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}