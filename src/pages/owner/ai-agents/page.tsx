import { useState } from 'react';
import { aiAgents } from '@/mocks/admin';

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    online: { bg: 'rgba(46,229,157,0.15)', text: '#2EE59D' },
    warning: { bg: 'rgba(255,107,95,0.15)', text: '#FF6B5F' },
    error: { bg: 'rgba(255,43,90,0.2)', text: '#FF2DAA' },
    offline: { bg: 'rgba(255,244,232,0.05)', text: 'rgba(255,244,232,0.4)' },
  };
  const s = colors[status] || colors.offline;
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: s.bg, color: s.text }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.text }}></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function OwnerAIAgents() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAgent, setModalAgent] = useState<(typeof aiAgents)[0] | null>(null);
  const [reason, setReason] = useState('');

  const openRunModal = (agent: (typeof aiAgents)[0]) => {
    setModalAgent(agent);
    setModalOpen(true);
    setReason('');
  };

  const totalSuccess = aiAgents.reduce((acc, a) => acc + a.success_count, 0);
  const totalFailure = aiAgents.reduce((acc, a) => acc + a.failure_count, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold" style={{ color: '#FFF4E8' }}>AI Agents</h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,244,232,0.5)' }}>Monitor, run, and manage all n8n-connected AI agents.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Agents', value: aiAgents.length },
          { label: 'Online', value: aiAgents.filter((a) => a.status === 'online').length, color: '#2EE59D' },
          { label: 'Warnings', value: aiAgents.filter((a) => a.status === 'warning').length, color: '#FF6B5F' },
          { label: 'Errors', value: aiAgents.filter((a) => a.status === 'error').length, color: '#FF2DAA' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-4 text-center" style={{ backgroundColor: 'rgba(43,20,79,0.2)', border: '1px solid rgba(43,20,79,0.3)' }}>
            <p className="text-xs font-label" style={{ color: 'rgba(255,244,232,0.5)' }}>{s.label}</p>
            <p className="text-2xl font-heading font-bold mt-1" style={{ color: s.color || '#FFF4E8' }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl p-4" style={{ backgroundColor: 'rgba(43,20,79,0.15)', border: '1px solid rgba(43,20,79,0.3)' }}>
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <span style={{ color: 'rgba(255,244,232,0.5)' }}>Total Runs: <span className="font-semibold" style={{ color: '#FFF4E8' }}>{(totalSuccess + totalFailure).toLocaleString()}</span></span>
          <span style={{ color: 'rgba(255,244,232,0.5)' }}>Success: <span className="font-semibold" style={{ color: '#2EE59D' }}>{totalSuccess.toLocaleString()}</span></span>
          <span style={{ color: 'rgba(255,244,232,0.5)' }}>Failures: <span className="font-semibold" style={{ color: '#FF2DAA' }}>{totalFailure.toLocaleString()}</span></span>
          <span style={{ color: 'rgba(255,244,232,0.5)' }}>Success Rate: <span className="font-semibold" style={{ color: '#2EE59D' }}>{((totalSuccess / (totalSuccess + totalFailure)) * 100).toFixed(1)}%</span></span>
        </div>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {aiAgents.map((agent) => (
          <div key={agent.id} className="rounded-xl p-5" style={{ backgroundColor: 'rgba(43,20,79,0.15)', border: '1px solid rgba(43,20,79,0.3)' }}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,45,170,0.15)' }}>
                  <i className="ri-robot-2-line text-lg" style={{ color: '#FF2DAA' }}></i>
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold" style={{ color: '#FFF4E8' }}>{agent.name}</h3>
                  <StatusBadge status={agent.status} />
                </div>
              </div>
            </div>

            <p className="text-xs mb-4 leading-relaxed" style={{ color: 'rgba(255,244,232,0.5)' }}>{agent.description}</p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="rounded-lg p-2" style={{ backgroundColor: 'rgba(9,8,18,0.4)' }}>
                <p className="text-xs" style={{ color: 'rgba(255,244,232,0.4)' }}>Success</p>
                <p className="text-sm font-semibold" style={{ color: '#2EE59D' }}>{agent.success_count.toLocaleString()}</p>
              </div>
              <div className="rounded-lg p-2" style={{ backgroundColor: 'rgba(9,8,18,0.4)' }}>
                <p className="text-xs" style={{ color: 'rgba(255,244,232,0.4)' }}>Failures</p>
                <p className="text-sm font-semibold" style={{ color: '#FF2DAA' }}>{agent.failure_count}</p>
              </div>
              <div className="rounded-lg p-2" style={{ backgroundColor: 'rgba(9,8,18,0.4)' }}>
                <p className="text-xs" style={{ color: 'rgba(255,244,232,0.4)' }}>Last Run</p>
                <p className="text-xs font-medium mt-1" style={{ color: '#FFF4E8' }}>{new Date(agent.last_run).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <div className="rounded-lg p-2" style={{ backgroundColor: 'rgba(9,8,18,0.4)' }}>
                <p className="text-xs" style={{ color: 'rgba(255,244,232,0.4)' }}>Result</p>
                <p className="text-xs font-medium mt-1" style={{ color: agent.last_result === 'success' ? '#2EE59D' : agent.last_result === 'partial' ? '#FF6B5F' : '#FF2DAA' }}>{agent.last_result}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs mb-1" style={{ color: 'rgba(255,244,232,0.3)' }}>Webhook</p>
              <p className="text-xs font-mono truncate" style={{ color: 'rgba(255,244,232,0.4)' }}>{agent.webhook}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => openRunModal(agent)} className="flex-1 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all hover:opacity-90" style={{ backgroundColor: '#FF2DAA', color: '#090812' }}>Run Now</button>
              <button className="flex-1 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all hover:bg-white/5" style={{ color: 'rgba(255,244,232,0.6)', border: '1px solid rgba(43,20,79,0.5)' }}>View Logs</button>
            </div>
          </div>
        ))}
      </div>

      {/* Run Modal */}
      {modalOpen && modalAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(9,8,18,0.8)' }}>
          <div className="w-full max-w-md rounded-2xl p-6" style={{ backgroundColor: '#0a0a12', border: '1px solid rgba(43,20,79,0.5)' }}>
            <h3 className="font-heading text-lg font-semibold mb-3" style={{ color: '#FFF4E8' }}>Run {modalAgent.name}</h3>
            <p className="text-sm mb-4" style={{ color: 'rgba(255,244,232,0.5)' }}>This will trigger the agent via webhook. A reason is required for the audit log.</p>
            <p className="text-xs font-mono mb-3 p-2 rounded-lg" style={{ backgroundColor: 'rgba(43,20,79,0.3)', color: 'rgba(255,244,232,0.4)' }}>{modalAgent.webhook}</p>
            <textarea value={reason} onChange={(e) => setReason(e.target.value)} maxLength={500} className="w-full px-3 py-2 rounded-xl text-sm outline-none mb-4 resize-none" style={{ backgroundColor: 'rgba(43,20,79,0.3)', border: '1px solid rgba(43,20,79,0.5)', color: '#FFF4E8' }} rows={3} placeholder="Reason for running agent..." />
            <div className="flex gap-3">
              <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all hover:bg-white/5" style={{ color: 'rgba(255,244,232,0.6)', border: '1px solid rgba(43,20,79,0.5)' }}>Cancel</button>
              <button onClick={() => { setModalOpen(false); setReason(''); }} disabled={!reason.trim()} className="flex-1 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all" style={{ backgroundColor: '#FF2DAA', color: '#090812', opacity: reason.trim() ? 1 : 0.5 }}>Trigger Agent</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}