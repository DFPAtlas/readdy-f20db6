import { useState } from 'react';
import { adminUsers } from '@/mocks/admin';

function RoleBadge({ role }: { role: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    owner: { bg: 'rgba(255,43,90,0.2)', text: '#FF2DAA' },
    admin: { bg: 'rgba(255,45,170,0.15)', text: '#FF2DAA' },
    moderator: { bg: 'rgba(255,107,95,0.15)', text: '#FF6B5F' },
    support: { bg: 'rgba(255,244,232,0.1)', text: 'rgba(255,244,232,0.6)' },
  };
  const s = colors[role] || colors.support;
  return <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: s.bg, color: s.text }}>{role.charAt(0).toUpperCase() + role.slice(1)}</span>;
}

export default function OwnerSettings() {
  const [activeSection, setActiveSection] = useState('profile');

  const sections = [
    { key: 'profile', label: 'Owner Profile', icon: 'ri-user-line' },
    { key: 'otp', label: 'OTP Security', icon: 'ri-shield-keyhole-line' },
    { key: 'recovery', label: 'Recovery Codes', icon: 'ri-key-2-line' },
    { key: 'admins', label: 'Admin Users', icon: 'ri-team-line' },
    { key: 'matching', label: 'Matching Settings', icon: 'ri-hearts-line' },
    { key: 'safety', label: 'Safety Thresholds', icon: 'ri-shield-star-line' },
    { key: 'n8n', label: 'n8n Agent Settings', icon: 'ri-robot-2-line' },
    { key: 'ai', label: 'AI Model Settings', icon: 'ri-brain-line' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold" style={{ color: '#FFF4E8' }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,244,232,0.5)' }}>Configure the OffScript Dating platform and admin access.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Section Nav */}
        <div className="w-full lg:w-56 shrink-0 space-y-1">
          {sections.map((s) => (
            <button key={s.key} onClick={() => setActiveSection(s.key)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer" style={{ backgroundColor: activeSection === s.key ? 'rgba(255,45,170,0.2)' : 'transparent', color: activeSection === s.key ? '#FF2DAA' : 'rgba(255,244,232,0.5)' }}>
              <i className={`${s.icon}`}></i>
              {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Profile */}
          {activeSection === 'profile' && (
            <div className="rounded-xl p-6 space-y-5" style={{ backgroundColor: 'rgba(43,20,79,0.15)', border: '1px solid rgba(43,20,79,0.3)' }}>
              <h2 className="font-heading text-lg font-semibold" style={{ color: '#FFF4E8' }}>Owner Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,244,232,0.5)' }}>Display Name</label>
                  <input type="text" defaultValue="Owner" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ backgroundColor: 'rgba(43,20,79,0.3)', border: '1px solid rgba(43,20,79,0.5)', color: '#FFF4E8' }} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,244,232,0.5)' }}>Email</label>
                  <input type="email" defaultValue="owner@offscript.dating" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ backgroundColor: 'rgba(43,20,79,0.3)', border: '1px solid rgba(43,20,79,0.5)', color: '#FFF4E8' }} />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button className="px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90" style={{ backgroundColor: '#FF2DAA', color: '#090812' }}>Save Profile</button>
                <button className="px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all hover:bg-white/5" style={{ color: 'rgba(255,244,232,0.6)', border: '1px solid rgba(43,20,79,0.5)' }}>Change Password</button>
              </div>
            </div>
          )}

          {/* OTP */}
          {activeSection === 'otp' && (
            <div className="rounded-xl p-6 space-y-5" style={{ backgroundColor: 'rgba(43,20,79,0.15)', border: '1px solid rgba(43,20,79,0.3)' }}>
              <h2 className="font-heading text-lg font-semibold" style={{ color: '#FFF4E8' }}>OTP Security</h2>
              <div className="rounded-lg p-4 flex items-center gap-4" style={{ backgroundColor: 'rgba(46,229,157,0.1)', border: '1px solid rgba(46,229,157,0.2)' }}>
                <i className="ri-shield-check-line text-xl" style={{ color: '#2EE59D' }}></i>
                <div>
                  <p className="text-sm font-medium" style={{ color: '#2EE59D' }}>Two-Factor Authentication is enabled</p>
                  <p className="text-xs" style={{ color: 'rgba(255,244,232,0.5)' }}>Your account is protected with TOTP-based 2FA.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90" style={{ backgroundColor: 'rgba(255,43,90,0.2)', color: '#FF2DAA', border: '1px solid rgba(255,43,90,0.3)' }}>Disable 2FA</button>
                <button className="px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90" style={{ backgroundColor: '#FF2DAA', color: '#090812' }}>Regenerate Secret</button>
              </div>
            </div>
          )}

          {/* Recovery Codes */}
          {activeSection === 'recovery' && (
            <div className="rounded-xl p-6 space-y-5" style={{ backgroundColor: 'rgba(43,20,79,0.15)', border: '1px solid rgba(43,20,79,0.3)' }}>
              <h2 className="font-heading text-lg font-semibold" style={{ color: '#FFF4E8' }}>Recovery Codes</h2>
              <p className="text-sm" style={{ color: 'rgba(255,244,232,0.5)' }}>Use these codes to regain access if you lose your authenticator app.</p>
              <div className="grid grid-cols-2 gap-2">
                {['ABCD-1234', 'EFGH-5678', 'IJKL-9012', 'MNOP-3456', 'QRST-7890', 'UVWX-2468', 'YZAB-1357', 'CDEF-8024'].map((code) => (
                  <span key={code} className="px-3 py-2 rounded-lg text-sm font-mono text-center" style={{ backgroundColor: 'rgba(9,8,18,0.4)', color: '#FFF4E8' }}>{code}</span>
                ))}
              </div>
              <button className="px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90" style={{ backgroundColor: '#FF2DAA', color: '#090812' }}>Regenerate Codes</button>
            </div>
          )}

          {/* Admin Users */}
          {activeSection === 'admins' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-lg font-semibold" style={{ color: '#FFF4E8' }}>Admin Users</h2>
                <button className="px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90" style={{ backgroundColor: '#FF2DAA', color: '#090812' }}>Invite Admin</button>
              </div>
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'rgba(43,20,79,0.15)', border: '1px solid rgba(43,20,79,0.3)' }}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ backgroundColor: 'rgba(43,20,79,0.3)' }}>
                        {['Name', 'Email', 'Role', 'OTP', 'Active', 'Last Login', 'Actions'].map((h) => (
                          <th key={h} className="text-left text-xs font-label font-medium py-3 px-4" style={{ color: 'rgba(255,244,232,0.5)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {adminUsers.map((u) => (
                        <tr key={u.id} className="border-b" style={{ borderColor: 'rgba(255,244,232,0.05)' }}>
                          <td className="py-3 px-4 text-sm font-medium" style={{ color: '#FFF4E8' }}>{u.display_name}</td>
                          <td className="py-3 px-4 text-sm" style={{ color: 'rgba(255,244,232,0.6)' }}>{u.email}</td>
                          <td className="py-3 px-4"><RoleBadge role={u.role} /></td>
                          <td className="py-3 px-4">
                            <span className="text-sm" style={{ color: u.otp_enabled ? '#2EE59D' : '#FF6B5F' }}>{u.otp_enabled ? 'Enabled' : 'Disabled'}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm" style={{ color: u.active ? '#2EE59D' : '#FF2DAA' }}>{u.active ? 'Yes' : 'No'}</span>
                          </td>
                          <td className="py-3 px-4 text-xs" style={{ color: 'rgba(255,244,232,0.4)' }}>{u.last_login ? new Date(u.last_login).toLocaleDateString('en-GB') : 'Never'}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-1">
                              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 cursor-pointer" style={{ color: 'rgba(255,244,232,0.5)' }}><i className="ri-eye-line"></i></button>
                              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 cursor-pointer" style={{ color: 'rgba(255,244,232,0.5)' }}><i className="ri-edit-line"></i></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Matching Settings */}
          {activeSection === 'matching' && (
            <div className="rounded-xl p-6 space-y-5" style={{ backgroundColor: 'rgba(43,20,79,0.15)', border: '1px solid rgba(43,20,79,0.3)' }}>
              <h2 className="font-heading text-lg font-semibold" style={{ color: '#FFF4E8' }}>Matching Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,244,232,0.5)' }}>Max Daily Matches</label>
                  <input type="number" defaultValue={5} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ backgroundColor: 'rgba(43,20,79,0.3)', border: '1px solid rgba(43,20,79,0.5)', color: '#FFF4E8' }} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,244,232,0.5)' }}>Compatibility Threshold (%)</label>
                  <input type="number" defaultValue={65} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ backgroundColor: 'rgba(43,20,79,0.3)', border: '1px solid rgba(43,20,79,0.5)', color: '#FFF4E8' }} />
                </div>
              </div>
              <button className="px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90" style={{ backgroundColor: '#FF2DAA', color: '#090812' }}>Save Matching Settings</button>
            </div>
          )}

          {/* Safety Thresholds */}
          {activeSection === 'safety' && (
            <div className="rounded-xl p-6 space-y-5" style={{ backgroundColor: 'rgba(43,20,79,0.15)', border: '1px solid rgba(43,20,79,0.3)' }}>
              <h2 className="font-heading text-lg font-semibold" style={{ color: '#FFF4E8' }}>Safety Thresholds</h2>
              <div className="space-y-4">
                {[
                  { label: 'Auto-suspend on harassment score', value: 85 },
                  { label: 'Chat flag sensitivity', value: 70 },
                  { label: 'Underage risk threshold', value: 60 },
                  { label: 'Move-off-platform alert', value: 50 },
                ].map((t) => (
                  <div key={t.label} className="flex items-center gap-4">
                    <span className="text-sm flex-1" style={{ color: 'rgba(255,244,232,0.7)' }}>{t.label}</span>
                    <input type="number" defaultValue={t.value} className="w-20 px-3 py-2 rounded-xl text-sm text-center outline-none" style={{ backgroundColor: 'rgba(43,20,79,0.3)', border: '1px solid rgba(43,20,79,0.5)', color: '#FFF4E8' }} />
                  </div>
                ))}
              </div>
              <button className="px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90" style={{ backgroundColor: '#FF2DAA', color: '#090812' }}>Save Safety Settings</button>
            </div>
          )}

          {/* n8n Settings */}
          {activeSection === 'n8n' && (
            <div className="rounded-xl p-6 space-y-5" style={{ backgroundColor: 'rgba(43,20,79,0.15)', border: '1px solid rgba(43,20,79,0.3)' }}>
              <h2 className="font-heading text-lg font-semibold" style={{ color: '#FFF4E8' }}>n8n Agent Settings</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,244,232,0.5)' }}>n8n Base URL</label>
                  <input type="text" defaultValue="https://n8n.offscript.dating" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ backgroundColor: 'rgba(43,20,79,0.3)', border: '1px solid rgba(43,20,79,0.5)', color: '#FFF4E8' }} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,244,232,0.5)' }}>Webhook Prefix</label>
                  <input type="text" defaultValue="/webhook/offscript/admin/agent/" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ backgroundColor: 'rgba(43,20,79,0.3)', border: '1px solid rgba(43,20,79,0.5)', color: '#FFF4E8' }} />
                </div>
                <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(255,43,90,0.1)', border: '1px solid rgba(255,43,90,0.2)' }}>
                  <p className="text-xs font-medium" style={{ color: '#FF2DAA' }}><i className="ri-error-warning-line mr-1"></i>Webhook secrets are managed in Supabase Secrets. Do not expose them in the UI.</p>
                </div>
              </div>
              <button className="px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90" style={{ backgroundColor: '#FF2DAA', color: '#090812' }}>Save n8n Settings</button>
            </div>
          )}

          {/* AI Model Settings */}
          {activeSection === 'ai' && (
            <div className="rounded-xl p-6 space-y-5" style={{ backgroundColor: 'rgba(43,20,79,0.15)', border: '1px solid rgba(43,20,79,0.3)' }}>
              <h2 className="font-heading text-lg font-semibold" style={{ color: '#FFF4E8' }}>AI Model Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,244,232,0.5)' }}>Primary Model</label>
                  <select className="w-full px-3 py-2.5 rounded-xl text-sm outline-none cursor-pointer" style={{ backgroundColor: 'rgba(43,20,79,0.3)', border: '1px solid rgba(43,20,79,0.5)', color: '#FFF4E8' }}>
                    <option>GPT-4o</option>
                    <option>GPT-4o-mini</option>
                    <option>Claude 3.5 Sonnet</option>
                    <option>Gemini Pro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,244,232,0.5)' }}>Temperature</label>
                  <input type="number" step="0.1" defaultValue={0.7} min="0" max="2" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ backgroundColor: 'rgba(43,20,79,0.3)', border: '1px solid rgba(43,20,79,0.5)', color: '#FFF4E8' }} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,244,232,0.5)' }}>System Prompt Template</label>
                <textarea defaultValue="You are the OffScript Dating AI assistant. Help members find genuine connections while prioritizing safety and authenticity." rows={4} maxLength={500} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none" style={{ backgroundColor: 'rgba(43,20,79,0.3)', border: '1px solid rgba(43,20,79,0.5)', color: '#FFF4E8' }} />
              </div>
              <button className="px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90" style={{ backgroundColor: '#FF2DAA', color: '#090812' }}>Save AI Settings</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}