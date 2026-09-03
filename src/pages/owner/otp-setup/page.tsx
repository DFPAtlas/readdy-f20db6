import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function OwnerOTPSetup() {
  const navigate = useNavigate();
  const { setupOTP } = useAdminAuth();
  const [otpCode, setOtpCode] = useState('');
  const [confirmedRecovery, setConfirmedRecovery] = useState(false);
  const [error, setError] = useState('');

  const mockSecret = 'JBSWY3DPEHPK3PXP';
  const mockQrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/OffScript:owner@offscript.dating?secret=JBSWY3DPEHPK3PXP&issuer=OffScript';

  const handleVerify = () => {
    if (!confirmedRecovery) {
      setError('Please confirm you have saved your recovery codes.');
      return;
    }
    if (otpCode.length !== 6) {
      setError('Please enter a valid 6-digit code.');
      return;
    }
    // TODO: Verify OTP code against secret via backend
    const success = setupOTP(mockSecret);
    if (success) {
      navigate('/owner/dashboard');
    } else {
      setError('Verification failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#090812' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: '#2B144F' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold mb-3" style={{ color: '#FFF4E8' }}>
            Protect the room
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255,244,232,0.5)' }}>
            Before you run it.
          </p>
        </div>

        <div className="rounded-2xl p-8 space-y-6" style={{ backgroundColor: 'rgba(43,20,79,0.2)', border: '1px solid rgba(43,20,79,0.4)' }}>
          <div className="text-center">
            <p className="text-sm mb-4" style={{ color: 'rgba(255,244,232,0.6)' }}>
              Scan this QR code with your authenticator app
            </p>
            <div className="w-48 h-48 mx-auto rounded-xl overflow-hidden" style={{ backgroundColor: '#FFF4E8' }}>
              <img src={mockQrUrl} alt="OTP QR Code" className="w-full h-full object-contain" />
            </div>
            <p className="text-xs mt-3 font-mono" style={{ color: 'rgba(255,244,232,0.4)' }}>
              {mockSecret}
            </p>
          </div>

          <div className="rounded-xl p-4" style={{ backgroundColor: 'rgba(9,8,18,0.6)', border: '1px solid rgba(255,107,95,0.2)' }}>
            <p className="text-xs font-semibold mb-2" style={{ color: '#FF6B5F' }}>
              <i className="ri-error-warning-line mr-1"></i> Recovery Codes
            </p>
            <p className="text-xs mb-3" style={{ color: 'rgba(255,244,232,0.5)' }}>
              Save these somewhere safe. You will need them if you lose your authenticator app.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {['ABCD-1234', 'EFGH-5678', 'IJKL-9012', 'MNOP-3456', 'QRST-7890', 'UVWX-2468', 'YZAB-1357', 'CDEF-8024'].map((code) => (
                <span key={code} className="px-2 py-1 rounded text-xs font-mono text-center" style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#FFF4E8' }}>
                  {code}
                </span>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={confirmedRecovery}
              onChange={(e) => setConfirmedRecovery(e.target.checked)}
              className="w-4 h-4 rounded accent-pink-500 cursor-pointer"
            />
            <span className="text-sm" style={{ color: 'rgba(255,244,232,0.6)' }}>
              I have saved my recovery codes in a secure location
            </span>
          </label>

          <div>
            <label className="block text-xs font-medium font-label mb-2" style={{ color: 'rgba(255,244,232,0.6)' }}>
              Enter 6-digit code from your app
            </label>
            <input
              type="text"
              maxLength={6}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none text-center tracking-widest font-mono"
              style={{
                backgroundColor: 'rgba(43,20,79,0.3)',
                border: '1px solid rgba(43,20,79,0.5)',
                color: '#FFF4E8',
              }}
              placeholder="000000"
            />
          </div>

          {error && (
            <div className="px-4 py-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(255,43,90,0.15)', color: '#FF2DAA', border: '1px solid rgba(255,43,90,0.3)' }}>
              {error}
            </div>
          )}

          <button
            onClick={handleVerify}
            className="w-full py-3.5 rounded-xl text-sm font-semibold font-label transition-all cursor-pointer"
            style={{ backgroundColor: '#FF2DAA', color: '#090812' }}
          >
            Verify and enter dashboard
          </button>
        </div>
      </div>
    </div>
  );
}