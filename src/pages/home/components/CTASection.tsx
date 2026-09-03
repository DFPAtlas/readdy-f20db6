import { useState } from 'react';

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section id="cta" className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Warm%20romantic%20sunset%20scene%20with%20soft%20golden%20light%2C%20dreamy%20atmospheric%20background%2C%20abstract%20bokeh%20effect%2C%20peach%20and%20amber%20gradient%20tones%2C%20ethereal%20soft%20focus%2C%20romantic%20mood%2C%20elegant%20minimal%20composition%2C%20no%20people%2C%20cinematic%20lighting%20with%20warm%20color%20palette&width=1800&height=1200&seq=cta-bg-2026&orientation=landscape"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/50"></div>
      </div>

      <div className="relative w-full px-4 md:px-6 max-w-3xl mx-auto text-center">
        <h2 className="font-heading text-3xl md:text-6xl font-bold text-background-50 mb-6 tracking-tight">
          READY TO FIND YOUR{' '}
          <span className="italic text-primary-300">VIBE?</span>
        </h2>
        <p className="text-background-50/75 text-base md:text-lg mb-10 leading-relaxed max-w-lg mx-auto">
          Whether you're calm, crazy, or somewhere in between — there's someone out there waiting to match your energy.
        </p>

        {submitted ? (
          <div className="animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-primary-500/20 text-primary-300">
              <i className="ri-check-line text-2xl"></i>
            </div>
            <p className="text-background-50 text-lg font-semibold font-heading">
              You're on the list!
            </p>
            <p className="text-background-50/60 text-sm mt-2">
              We'll let you know as soon as we launch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full sm:flex-1 px-5 py-3.5 rounded-full bg-background-50/15 backdrop-blur-sm border border-background-50/30 text-background-50 placeholder:text-background-50/50 text-sm outline-none focus:border-background-50/50 transition-colors"
            />
            <button
              type="submit"
              className="whitespace-nowrap w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary-500 text-background-50 text-sm font-semibold font-label hover:bg-primary-600 transition-all cursor-pointer"
            >
              Get Early Access
            </button>
          </form>
        )}

        <p className="text-background-50/40 text-xs mt-6">
          No spam, ever. Just launch updates and vibe checks.
        </p>
      </div>
    </section>
  );
}