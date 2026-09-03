import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#090812' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl" style={{ backgroundColor: '#2B144F' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl" style={{ backgroundColor: '#FF2DAA' }}></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6" style={{ color: '#FFF4E8' }}>
            Off<span style={{ color: '#FF2DAA' }}>Script</span>
          </h1>
          <p className="text-xl md:text-2xl mb-4" style={{ color: 'rgba(255,244,232,0.7)' }}>
            Dating for people with a story.
          </p>
          <p className="text-sm md:text-base mb-8 max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(255,244,232,0.5)' }}>
            Set your vibe. Share your wild thing. Let AI find the spark. Premium members-only. 18+ verified.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#" className="whitespace-nowrap px-8 py-3.5 rounded-full text-sm font-semibold font-label transition-all cursor-pointer" style={{ backgroundColor: '#FF2DAA', color: '#090812' }}>
              Join Now
            </a>
            <a href="/owner/login" className="whitespace-nowrap px-8 py-3.5 rounded-full text-sm font-semibold font-label transition-all cursor-pointer" style={{ color: '#FFF4E8', border: '1px solid rgba(255,244,232,0.2)' }}>
              Owner Dashboard
            </a>
          </div>
          <div className="mt-12 flex items-center justify-center gap-6 text-xs" style={{ color: 'rgba(255,244,232,0.3)' }}>
            <span className="flex items-center gap-1.5"><i className="ri-check-line" style={{ color: '#2EE59D' }}></i> AI-Powered Wildcard Matches</span>
            <span className="flex items-center gap-1.5"><i className="ri-check-line" style={{ color: '#2EE59D' }}></i> Verified Members Only</span>
            <span className="flex items-center gap-1.5"><i className="ri-check-line" style={{ color: '#2EE59D' }}></i> 18+ Verified</span>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}