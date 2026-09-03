export default function Footer() {
  return (
    <footer className="pt-16 md:pt-20 pb-8" style={{ backgroundColor: '#0a0a12', borderTop: '1px solid rgba(43,20,79,0.3)' }}>
      <div className="px-4 md:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-heading text-xl font-bold" style={{ color: '#FFF4E8' }}>
            Off<span style={{ color: '#FF2DAA' }}>Script</span>
          </span>
          <div className="flex items-center gap-6">
            {['ri-instagram-line', 'ri-twitter-x-line', 'ri-tiktok-line', 'ri-youtube-line'].map((icon) => (
              <a
                key={icon}
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer"
                style={{ border: '1px solid rgba(255,244,232,0.15)', color: 'rgba(255,244,232,0.5)' }}
                aria-label={`Social media - ${icon}`}
                rel="nofollow"
              >
                <i className={`${icon} text-sm`}></i>
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(43,20,79,0.3)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,244,232,0.3)' }}>
            &copy; {new Date().getFullYear()} OffScript Dating. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs transition-colors" style={{ color: 'rgba(255,244,232,0.3)' }}>Privacy</a>
            <a href="#" className="text-xs transition-colors" style={{ color: 'rgba(255,244,232,0.3)' }}>Terms</a>
            <a href="#" className="text-xs transition-colors" style={{ color: 'rgba(255,244,232,0.3)' }}>Cookies</a>
            <a href="/owner/login" className="text-xs transition-colors" style={{ color: '#FF2DAA' }}>Owner Dashboard</a>
          </div>
        </div>
      </div>
    </footer>
  );
}