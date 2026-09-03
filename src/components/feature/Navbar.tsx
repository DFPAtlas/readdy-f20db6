import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(9,8,18,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="w-full px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="/" className="flex items-center gap-2">
            <span className="font-heading text-2xl md:text-3xl font-bold" style={{ color: '#FFF4E8' }}>
              Off<span style={{ color: '#FF2DAA' }}>Script</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium transition-colors whitespace-nowrap" style={{ color: 'rgba(255,244,232,0.6)' }}>How It Works</a>
            <a href="#" className="text-sm font-medium transition-colors whitespace-nowrap" style={{ color: 'rgba(255,244,232,0.6)' }}>Features</a>
            <a href="#" className="text-sm font-medium transition-colors whitespace-nowrap" style={{ color: 'rgba(255,244,232,0.6)' }}>Safety</a>
            <a href="/owner/login" className="whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold font-label transition-all cursor-pointer" style={{ backgroundColor: '#FF2DAA', color: '#090812' }}>
              Owner Dashboard
            </a>
          </div>

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <i className={`text-xl ${mobileOpen ? 'ri-close-line' : 'ri-menu-line'}`} style={{ color: '#FFF4E8' }}></i>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden py-4 px-4 flex flex-col gap-3" style={{ backgroundColor: 'rgba(9,8,18,0.95)', borderTop: '1px solid rgba(43,20,79,0.3)' }}>
          <a href="#" onClick={() => setMobileOpen(false)} className="text-sm font-medium py-2" style={{ color: 'rgba(255,244,232,0.6)' }}>How It Works</a>
          <a href="#" onClick={() => setMobileOpen(false)} className="text-sm font-medium py-2" style={{ color: 'rgba(255,244,232,0.6)' }}>Features</a>
          <a href="#" onClick={() => setMobileOpen(false)} className="text-sm font-medium py-2" style={{ color: 'rgba(255,244,232,0.6)' }}>Safety</a>
          <a href="/owner/login" onClick={() => setMobileOpen(false)} className="whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold font-label text-center cursor-pointer" style={{ backgroundColor: '#FF2DAA', color: '#090812' }}>
            Owner Dashboard
          </a>
        </div>
      )}
    </nav>
  );
}