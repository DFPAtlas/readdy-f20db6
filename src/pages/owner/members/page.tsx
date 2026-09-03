import { useState, useMemo } from 'react';
import { members } from '@/mocks/admin';

function StatusBadge({ status, label }: { status: string; label?: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    active: { bg: 'rgba(46,229,157,0.15)', text: '#2EE59D' },
    paused: { bg: 'rgba(255,107,95,0.15)', text: '#FF6B5F' },
    suspended: { bg: 'rgba(255,43,90,0.15)', text: '#FF2DAA' },
    banned: { bg: 'rgba(255,43,90,0.2)', text: '#FF2DAA' },
    approved: { bg: 'rgba(46,229,157,0.15)', text: '#2EE59D' },
    pending: { bg: 'rgba(255,107,95,0.15)', text: '#FF6B5F' },
    rejected: { bg: 'rgba(255,43,90,0.15)', text: '#FF2DAA' },
    premium: { bg: 'rgba(255,45,170,0.15)', text: '#FF2DAA' },
    free: { bg: 'rgba(255,244,232,0.1)', text: 'rgba(255,244,232,0.6)' },
    cancelled: { bg: 'rgba(255,43,90,0.15)', text: '#FF2DAA' },
  };
  const style = colors[status] || colors.active;
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: style.bg, color: style.text }}>
      {label || status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function ConfirmationModal({ isOpen, title, reason, onConfirm, onCancel, actionLabel }: {
  isOpen: boolean; title: string; reason: string; onConfirm: () => void; onCancel: () => void; actionLabel: string;
}) {
  const [inputReason, setInputReason] = useState('');
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(9,8,18,0.8)' }}>
      <div className="w-full max-w-md rounded-2xl p-6" style={{ backgroundColor: '#0a0a12', border: '1px solid rgba(43,20,79,0.5)' }}>
        <h3 className="font-heading text-lg font-semibold mb-3" style={{ color: '#FFF4E8' }}>{title}</h3>
        <p className="text-sm mb-4" style={{ color: 'rgba(255,244,232,0.5)' }}>{reason}</p>
        <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,244,232,0.6)' }}>Reason for action (required)</label>
        <textarea
          value={inputReason}
          onChange={(e) => setInputReason(e.target.value)}
          maxLength={500}
          className="w-full px-3 py-2 rounded-xl text-sm outline-none mb-4 resize-none"
          style={{ backgroundColor: 'rgba(43,20,79,0.3)', border: '1px solid rgba(43,20,79,0.5)', color: '#FFF4E8' }}
          rows={3}
          placeholder="Explain why you are taking this action..."
        />
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all hover:bg-white/5" style={{ color: 'rgba(255,244,232,0.6)', border: '1px solid rgba(43,20,79,0.5)' }}>Cancel</button>
          <button onClick={() => { if (inputReason.trim()) { onConfirm(); setInputReason(''); } }} disabled={!inputReason.trim()} className="flex-1 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all" style={{ backgroundColor: '#FF2DAA', color: '#090812', opacity: inputReason.trim() ? 1 : 0.5 }}>{actionLabel}</button>
        </div>
      </div>
    </div>
  );
}

export default function OwnerMembers() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [subscriptionFilter, setSubscriptionFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalReason, setModalReason] = useState('');
  const [modalAction, setModalAction] = useState('');

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const matchesSearch = m.display_name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
      const matchesVerification = verificationFilter === 'all' || m.verification_status === verificationFilter;
      const matchesSubscription = subscriptionFilter === 'all' || m.subscription_status === subscriptionFilter;
      return matchesSearch && matchesStatus && matchesVerification && matchesSubscription;
    });
  }, [search, statusFilter, verificationFilter, subscriptionFilter]);

  const openActionModal = (title: string, reason: string, action: string) => {
    setModalTitle(title);
    setModalReason(reason);
    setModalAction(action);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold" style={{ color: '#FFF4E8' }}>Members</h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,244,232,0.5)' }}>Manage all member accounts, verifications, and safety status.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email..." className="px-4 py-2 rounded-xl text-sm outline-none" style={{ backgroundColor: 'rgba(43,20,79,0.3)', border: '1px solid rgba(43,20,79,0.5)', color: '#FFF4E8', minWidth: 240 }} />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl text-sm outline-none cursor-pointer" style={{ backgroundColor: 'rgba(43,20,79,0.3)', border: '1px solid rgba(43,20,79,0.5)', color: '#FFF4E8' }}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="suspended">Suspended</option>
          <option value="banned">Banned</option>
        </select>
        <select value={verificationFilter} onChange={(e) => setVerificationFilter(e.target.value)} className="px-3 py-2 rounded-xl text-sm outline-none cursor-pointer" style={{ backgroundColor: 'rgba(43,20,79,0.3)', border: '1px solid rgba(43,20,79,0.5)', color: '#FFF4E8' }}>
          <option value="all">All Verification</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
          <option value="resubmit">Resubmit</option>
        </select>
        <select value={subscriptionFilter} onChange={(e) => setSubscriptionFilter(e.target.value)} className="px-3 py-2 rounded-xl text-sm outline-none cursor-pointer" style={{ backgroundColor: 'rgba(43,20,79,0.3)', border: '1px solid rgba(43,20,79,0.5)', color: '#FFF4E8' }}>
          <option value="all">All Plans</option>
          <option value="premium">Premium</option>
          <option value="free">Free</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'rgba(43,20,79,0.15)', border: '1px solid rgba(43,20,79,0.3)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: 'rgba(43,20,79,0.3)' }}>
                {['Name', 'Age', 'Location', 'Status', 'Verification', 'Plan', 'Safety', 'Joined', 'Last Active', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-xs font-label font-medium py-3 px-4" style={{ color: 'rgba(255,244,232,0.5)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b transition-colors hover:bg-white/5" style={{ borderColor: 'rgba(255,244,232,0.05)' }}>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#FFF4E8' }}>{m.display_name}</p>
                      <p className="text-xs" style={{ color: 'rgba(255,244,232,0.4)' }}>{m.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm" style={{ color: 'rgba(255,244,232,0.6)' }}>{m.age}</td>
                  <td className="py-3 px-4 text-sm" style={{ color: 'rgba(255,244,232,0.6)' }}>{m.location}</td>
                  <td className="py-3 px-4"><StatusBadge status={m.status} /></td>
                  <td className="py-3 px-4"><StatusBadge status={m.verification_status} /></td>
                  <td className="py-3 px-4"><StatusBadge status={m.subscription_status} /></td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-semibold" style={{ color: m.safety_score >= 80 ? '#2EE59D' : m.safety_score >= 50 ? '#FF6B5F' : '#FF2DAA' }}>{m.safety_score}</span>
                  </td>
                  <td className="py-3 px-4 text-xs" style={{ color: 'rgba(255,244,232,0.4)' }}>{new Date(m.created_at).toLocaleDateString('en-GB')}</td>
                  <td className="py-3 px-4 text-xs" style={{ color: 'rgba(255,244,232,0.4)' }}>{new Date(m.last_active).toLocaleDateString('en-GB')}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-all cursor-pointer" style={{ color: 'rgba(255,244,232,0.5)' }} title="View">
                        <i className="ri-eye-line"></i>
                      </button>
                      {m.status !== 'paused' && (
                        <button onClick={() => openActionModal(`Pause ${m.display_name}`, 'Member will be temporarily paused from the platform.', 'Pause')} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-all cursor-pointer" style={{ color: '#FF6B5F' }} title="Pause">
                          <i className="ri-pause-circle-line"></i>
                        </button>
                      )}
                      {m.status !== 'suspended' && (
                        <button onClick={() => openActionModal(`Suspend ${m.display_name}`, 'Member will be suspended pending review.', 'Suspend')} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-all cursor-pointer" style={{ color: '#FF2DAA' }} title="Suspend">
                          <i className="ri-alert-line"></i>
                        </button>
                      )}
                      {m.status !== 'banned' && (
                        <button onClick={() => openActionModal(`Ban ${m.display_name}`, 'Member will be permanently banned. This action is irreversible.', 'Ban')} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-all cursor-pointer" style={{ color: '#FF2DAA' }} title="Ban">
                          <i className="ri-prohibited-line"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationModal
        isOpen={modalOpen}
        title={modalTitle}
        reason={modalReason}
        actionLabel={modalAction}
        onConfirm={() => { setModalOpen(false); }}
        onCancel={() => { setModalOpen(false); }}
      />
    </div>
  );
}