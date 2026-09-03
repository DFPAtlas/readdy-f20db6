import { useState, useMemo } from 'react';
import { verifications } from '@/mocks/admin';

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    approved: { bg: 'rgba(46,229,157,0.15)', text: '#2EE59D' },
    pending: { bg: 'rgba(255,107,95,0.15)', text: '#FF6B5F' },
    rejected: { bg: 'rgba(255,43,90,0.15)', text: '#FF2DAA' },
    resubmit: { bg: 'rgba(255,244,232,0.1)', text: 'rgba(255,244,232,0.7)' },
  };
  const s = colors[status] || colors.pending;
  return <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: s.bg, color: s.text }}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
}

export default function OwnerVerification() {
  const [activeTab, setActiveTab] = useState('pending');
  const [confirmModal, setConfirmModal] = useState<{ open: boolean; action: string; verificationId: string; memberName: string }>({ open: false, action: '', verificationId: '', memberName: '' });
  const [reason, setReason] = useState('');

  const tabs = [
    { key: 'pending', label: 'Pending', count: verifications.filter((v) => v.status === 'pending').length },
    { key: 'approved', label: 'Approved', count: verifications.filter((v) => v.status === 'approved').length },
    { key: 'rejected', label: 'Rejected', count: verifications.filter((v) => v.status === 'rejected').length },
    { key: 'resubmit', label: 'Resubmit', count: verifications.filter((v) => v.status === 'resubmit').length },
  ];

  const filtered = useMemo(() => verifications.filter((v) => v.status === activeTab), [activeTab]);

  const openConfirm = (action: string, id: string, name: string) => {
    setConfirmModal({ open: true, action, verificationId: id, memberName: name });
    setReason('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold" style={{ color: '#FFF4E8' }}>Verification Queue</h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,244,232,0.5)' }}>Review identity verifications, selfies, and 18+ checks.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ backgroundColor: 'rgba(43,20,79,0.3)' }}>
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setActiveTab(t.key)} className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2" style={{ backgroundColor: activeTab === t.key ? 'rgba(255,45,170,0.2)' : 'transparent', color: activeTab === t.key ? '#FF2DAA' : 'rgba(255,244,232,0.5)' }}>
            {t.label}
            <span className="px-1.5 py-0.5 rounded-full text-xs" style={{ backgroundColor: activeTab === t.key ? 'rgba(255,45,170,0.2)' : 'rgba(255,244,232,0.1)', color: activeTab === t.key ? '#FF2DAA' : 'rgba(255,244,232,0.5)' }}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {filtered.map((v) => (
          <div key={v.id} className="rounded-xl p-6" style={{ backgroundColor: 'rgba(43,20,79,0.15)', border: '1px solid rgba(43,20,79,0.3)' }}>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Photos */}
              <div className="flex gap-4 shrink-0">
                <div className="w-32 h-40 rounded-xl overflow-hidden shrink-0" style={{ backgroundColor: '#1a1a2e' }}>
                  <img src={v.profile_photo} alt="Profile" className="w-full h-full object-cover object-top" />
                </div>
                <div className="w-32 h-40 rounded-xl overflow-hidden shrink-0" style={{ backgroundColor: '#1a1a2e' }}>
                  <img src={v.selfie_photo} alt="Selfie" className="w-full h-full object-cover object-top" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading text-lg font-semibold" style={{ color: '#FFF4E8' }}>{v.member_name}</h3>
                    <p className="text-xs mt-1" style={{ color: 'rgba(255,244,232,0.4)' }}>DOB: {v.date_of_birth} | Age verified: {v.age_verified ? 'Yes' : 'No'}</p>
                  </div>
                  <StatusBadge status={v.status} />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(9,8,18,0.4)' }}>
                    <p className="text-xs" style={{ color: 'rgba(255,244,232,0.4)' }}>AI Check</p>
                    <p className="text-sm font-medium mt-1" style={{ color: v.ai_check_result === 'match' ? '#2EE59D' : v.ai_check_result === 'needs_review' ? '#FF6B5F' : '#FF2DAA' }}>{v.ai_check_result}</p>
                  </div>
                  <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(9,8,18,0.4)' }}>
                    <p className="text-xs" style={{ color: 'rgba(255,244,232,0.4)' }}>Risk Score</p>
                    <p className="text-sm font-medium mt-1" style={{ color: v.risk_score < 30 ? '#2EE59D' : v.risk_score < 60 ? '#FF6B5F' : '#FF2DAA' }}>{v.risk_score}/100</p>
                  </div>
                  <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(9,8,18,0.4)' }}>
                    <p className="text-xs" style={{ color: 'rgba(255,244,232,0.4)' }}>Submitted</p>
                    <p className="text-sm font-medium mt-1" style={{ color: '#FFF4E8' }}>{new Date(v.submitted_at).toLocaleDateString('en-GB')}</p>
                  </div>
                  <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(9,8,18,0.4)' }}>
                    <p className="text-xs" style={{ color: 'rgba(255,244,232,0.4)' }}>18+ Status</p>
                    <p className="text-sm font-medium mt-1" style={{ color: v.age_verified ? '#2EE59D' : '#FF6B5F' }}>{v.age_verified ? 'Verified' : 'Unverified'}</p>
                  </div>
                </div>

                {v.rejection_reason && (
                  <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(255,43,90,0.1)', border: '1px solid rgba(255,43,90,0.2)' }}>
                    <p className="text-xs font-medium" style={{ color: '#FF2DAA' }}>Rejection reason</p>
                    <p className="text-sm mt-1" style={{ color: 'rgba(255,244,232,0.6)' }}>{v.rejection_reason}</p>
                  </div>
                )}
                {v.resubmit_reason && (
                  <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(255,107,95,0.1)', border: '1px solid rgba(255,107,95,0.2)' }}>
                    <p className="text-xs font-medium" style={{ color: '#FF6B5F' }}>Resubmit reason</p>
                    <p className="text-sm mt-1" style={{ color: 'rgba(255,244,232,0.6)' }}>{v.resubmit_reason}</p>
                  </div>
                )}

                {v.status === 'pending' && (
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => openConfirm('approve', v.id, v.member_name)} className="px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90" style={{ backgroundColor: '#2EE59D', color: '#090812' }}>Approve</button>
                    <button onClick={() => openConfirm('reject', v.id, v.member_name)} className="px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90" style={{ backgroundColor: '#FF2DAA', color: '#090812' }}>Reject</button>
                    <button onClick={() => openConfirm('resubmit', v.id, v.member_name)} className="px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90" style={{ backgroundColor: '#FF6B5F', color: '#090812' }}>Request Resubmit</button>
                    <button onClick={() => openConfirm('suspend', v.id, v.member_name)} className="px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90" style={{ backgroundColor: 'rgba(255,43,90,0.2)', color: '#FF2DAA', border: '1px solid rgba(255,43,90,0.3)' }}>Suspend Account</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 rounded-xl" style={{ backgroundColor: 'rgba(43,20,79,0.15)', border: '1px solid rgba(43,20,79,0.3)' }}>
            <i className="ri-check-double-line text-4xl mb-3 block" style={{ color: 'rgba(255,244,232,0.2)' }}></i>
            <p className="text-sm" style={{ color: 'rgba(255,244,232,0.4)' }}>No verifications in this queue.</p>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(9,8,18,0.8)' }}>
          <div className="w-full max-w-md rounded-2xl p-6" style={{ backgroundColor: '#0a0a12', border: '1px solid rgba(43,20,79,0.5)' }}>
            <h3 className="font-heading text-lg font-semibold mb-3" style={{ color: '#FFF4E8' }}>
              {confirmModal.action.charAt(0).toUpperCase() + confirmModal.action.slice(1)} {confirmModal.memberName}
            </h3>
            <p className="text-sm mb-4" style={{ color: 'rgba(255,244,232,0.5)' }}>This action requires a reason for the audit log.</p>
            <textarea value={reason} onChange={(e) => setReason(e.target.value)} maxLength={500} className="w-full px-3 py-2 rounded-xl text-sm outline-none mb-4 resize-none" style={{ backgroundColor: 'rgba(43,20,79,0.3)', border: '1px solid rgba(43,20,79,0.5)', color: '#FFF4E8' }} rows={3} placeholder="Enter reason..." />
            <div className="flex gap-3">
              <button onClick={() => setConfirmModal({ ...confirmModal, open: false })} className="flex-1 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all hover:bg-white/5" style={{ color: 'rgba(255,244,232,0.6)', border: '1px solid rgba(43,20,79,0.5)' }}>Cancel</button>
              <button onClick={() => { setConfirmModal({ ...confirmModal, open: false }); setReason(''); }} disabled={!reason.trim()} className="flex-1 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all" style={{ backgroundColor: confirmModal.action === 'approve' ? '#2EE59D' : '#FF2DAA', color: '#090812', opacity: reason.trim() ? 1 : 0.5 }}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}