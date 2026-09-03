import { dashboardMetrics, auditLogs } from '@/mocks/admin';

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    healthy: '#2EE59D',
    warning: '#FF6B5F',
    error: '#FF2DAA',
  };
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium" style={{ color: colors[status] || '#FFF4E8', backgroundColor: `${colors[status]}15` }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors[status] }}></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function MetricCard({ label, value, change, color }: { label: string; value: string | number; change?: string; color?: string }) {
  return (
    <div className="rounded-xl p-5" style={{ backgroundColor: 'rgba(43,20,79,0.2)', border: '1px solid rgba(43,20,79,0.3)' }}>
      <p className="text-xs font-label mb-1" style={{ color: 'rgba(255,244,232,0.5)' }}>{label}</p>
      <p className="text-2xl font-heading font-bold" style={{ color: color || '#FFF4E8' }}>{value}</p>
      {change && <p className="text-xs mt-1" style={{ color: '#2EE59D' }}>{change}</p>}
    </div>
  );
}

export default function OwnerDashboard() {
  const m = dashboardMetrics;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold" style={{ color: '#FFF4E8' }}>
          OffScript Owner Command Centre
        </h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,244,232,0.5)' }}>
          Run the members, matches, safety and AI agents from one place.
        </p>
      </div>

      {/* Status Bar */}
      <div className="flex flex-wrap items-center gap-4">
        <StatusBadge status="healthy" />
        <span className="text-xs" style={{ color: 'rgba(255,244,232,0.4)' }}>Supabase: <span style={{ color: '#2EE59D' }}>Connected</span></span>
        <span className="text-xs" style={{ color: 'rgba(255,244,232,0.4)' }}>Stripe: <span style={{ color: '#2EE59D' }}>Connected</span></span>
        <span className="text-xs" style={{ color: 'rgba(255,244,232,0.4)' }}>n8n: <span style={{ color: '#FF6B5F' }}>1 Agent Error</span></span>
        <span className="text-xs" style={{ color: 'rgba(255,244,232,0.4)' }}>AI Safety: <span style={{ color: '#2EE59D' }}>Nominal</span></span>
      </div>

      {/* Hero Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard label="Total Members" value={m.total_members.toLocaleString()} change="+47 today" />
        <MetricCard label="Active Paid" value={m.active_paid_members.toLocaleString()} change="+12 today" color="#2EE59D" />
        <MetricCard label="Pending Verifications" value={m.pending_verifications} change="2 urgent" color="#FF6B5F" />
        <MetricCard label="Open Reports" value={m.open_reports} change="3 critical" color="#FF6B5F" />
        <MetricCard label="Safety Flags" value={m.critical_safety_flags} change="Needs attention" color="#FF2DAA" />
        <MetricCard label="Wall Posts Today" value={m.crazy_wall_posts_today} />
        <MetricCard label="Daily Matches" value={m.daily_matches_generated.toLocaleString()} />
        <MetricCard label="MRR" value={`£${m.monthly_recurring_revenue.toLocaleString()}`} change="+£1,240 vs last month" color="#2EE59D" />
        <MetricCard label="Failed Payments" value={m.failed_payments} color="#FF6B5F" />
        <MetricCard label="AI Agents Online" value={`${m.ai_agents_online}/${m.ai_agents_online + m.ai_agents_warning + m.ai_agents_error}`} color="#2EE59D" />
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Safety Pulse */}
        <div className="rounded-xl p-6" style={{ backgroundColor: 'rgba(43,20,79,0.15)', border: '1px solid rgba(255,43,90,0.2)' }}>
          <h2 className="font-heading text-lg font-semibold mb-4" style={{ color: '#FF2DAA' }}>
            <i className="ri-heart-pulse-line mr-2"></i>Safety Pulse
          </h2>
          <div className="space-y-3">
            {[
              { label: 'Critical reports', value: 3, color: '#FF2DAA' },
              { label: 'High-risk chat flags', value: 7, color: '#FF6B5F' },
              { label: 'Underage risk', value: 1, color: '#FF2DAA' },
              { label: 'Move-off-platform', value: 4, color: '#FF6B5F' },
              { label: 'Verification failures', value: 2, color: '#FF6B5F' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'rgba(255,244,232,0.05)' }}>
                <span className="text-sm" style={{ color: 'rgba(255,244,232,0.6)' }}>{item.label}</span>
                <span className="text-sm font-semibold" style={{ color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Health */}
        <div className="rounded-xl p-6" style={{ backgroundColor: 'rgba(43,20,79,0.15)', border: '1px solid rgba(46,229,157,0.2)' }}>
          <h2 className="font-heading text-lg font-semibold mb-4" style={{ color: '#2EE59D' }}>
            <i className="ri-server-line mr-2"></i>Platform Health
          </h2>
          <div className="space-y-3">
            {[
              { label: 'Supabase', status: 'healthy' },
              { label: 'Stripe Webhook', status: 'warning' },
              { label: 'n8n Agents', status: 'warning' },
              { label: 'AI Endpoint', status: 'healthy' },
              { label: 'Storage', status: 'healthy' },
              { label: 'Email / Notifications', status: 'healthy' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'rgba(255,244,232,0.05)' }}>
                <span className="text-sm" style={{ color: 'rgba(255,244,232,0.6)' }}>{item.label}</span>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl p-6" style={{ backgroundColor: 'rgba(43,20,79,0.15)', border: '1px solid rgba(255,107,95,0.2)' }}>
          <h2 className="font-heading text-lg font-semibold mb-4" style={{ color: '#FF6B5F' }}>
            <i className="ri-flashlight-line mr-2"></i>Quick Actions
          </h2>
          <div className="flex flex-col gap-2">
            {[
              'Review Verifications',
              'View Reports',
              'Run Daily Matchmaker',
              'Run Wall Moderation',
              'Run Chat Guardian',
              'Open Support Queue',
              'Export Audit Logs',
            ].map((action) => (
              <button
                key={action}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer hover:bg-white/5"
                style={{ color: '#FFF4E8', border: '1px solid rgba(43,20,79,0.3)' }}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl p-6" style={{ backgroundColor: 'rgba(43,20,79,0.15)', border: '1px solid rgba(43,20,79,0.3)' }}>
        <h2 className="font-heading text-lg font-semibold mb-4" style={{ color: '#FFF4E8' }}>
          Recent Activity
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,244,232,0.1)' }}>
                <th className="text-left text-xs font-label font-medium py-3 pr-4" style={{ color: 'rgba(255,244,232,0.4)' }}>Admin</th>
                <th className="text-left text-xs font-label font-medium py-3 pr-4" style={{ color: 'rgba(255,244,232,0.4)' }}>Action</th>
                <th className="text-left text-xs font-label font-medium py-3 pr-4" style={{ color: 'rgba(255,244,232,0.4)' }}>Target</th>
                <th className="text-left text-xs font-label font-medium py-3 pr-4" style={{ color: 'rgba(255,244,232,0.4)' }}>Reason</th>
                <th className="text-left text-xs font-label font-medium py-3" style={{ color: 'rgba(255,244,232,0.4)' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.slice(0, 5).map((log) => (
                <tr key={log.id} className="border-b" style={{ borderColor: 'rgba(255,244,232,0.05)' }}>
                  <td className="py-3 pr-4 text-sm" style={{ color: '#FFF4E8' }}>{log.admin_name}</td>
                  <td className="py-3 pr-4">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(255,45,170,0.15)', color: '#FF2DAA' }}>
                      {log.action.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-sm" style={{ color: 'rgba(255,244,232,0.6)' }}>{log.target_type}</td>
                  <td className="py-3 pr-4 text-sm max-w-xs truncate" style={{ color: 'rgba(255,244,232,0.5)' }}>{log.reason}</td>
                  <td className="py-3 text-xs" style={{ color: 'rgba(255,244,232,0.4)' }}>
                    {new Date(log.created_at).toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}