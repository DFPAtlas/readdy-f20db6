import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function OwnerLogin() {
  const navigate = useNavigate();
  const { login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await login(email, password);
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error || 'Login failed');
      return;
    }

    if (result.needsSetup) {
      navigate('/owner/otp-setup');
      return;
    }

    if (result.needsOTP) {
      navigate('/owner/dashboard');
      return;
    }

    navigate('/owner/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#090812' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: '#2B144F' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: '#FF2DAA' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3" style={{ color: '#FFF4E8' }}>
            Owner Command Centre
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255,244,232,0.5)' }}>
            Secure access for running OffScript Dating.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="px-4 py-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(255,43,90,0.15)', color: '#FF2DAA', border: '1px solid rgba(255,43,90,0.3)' }}>
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium font-label mb-2" style={{ color: 'rgba(255,244,232,0.6)' }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: 'rgba(43,20,79,0.3)',
                border: '1px solid rgba(43,20,79,0.5)',
                color: '#FFF4E8',
              }}
              placeholder="owner@offscript.dating"
            />
          </div>

          <div>
            <label className="block text-xs font-medium font-label mb-2" style={{ color: 'rgba(255,244,232,0.6)' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: 'rgba(43,20,79,0.3)',
                border: '1px solid rgba(43,20,79,0.5)',
                color: '#FFF4E8',
              }}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl text-sm font-semibold font-label transition-all cursor-pointer"
            style={{
              backgroundColor: '#FF2DAA',
              color: '#090812',
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>

          <a
            href="/"
            className="block text-center text-xs transition-colors cursor-pointer"
            style={{ color: 'rgba(255,244,232,0.4)' }}
          >
            Back to website
          </a>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs" style={{ color: 'rgba(255,244,232,0.25)' }}>
            Demo: owner@offscript.dating / admin123
          </p>
        </div>
      </div>
    </div>
  );
}