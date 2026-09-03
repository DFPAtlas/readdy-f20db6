import { heroContent } from '@/mocks/home';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Warm%20romantic%20abstract%20gradient%20background%20with%20soft%20peach%20coral%20and%20cream%20tones%2C%20organic%20flowing%20shapes%2C%20dreamy%20atmospheric%20texture%2C%20minimalist%20elegant%20composition%2C%20subtle%20light%20blooms%2C%20ethereal%20and%20airy%20mood%2C%20no%20text%2C%20no%20people%2C%20abstract%20art%20style%20with%20gentle%20color%20transitions&width=1800&height=1200&seq=hero-bg-2026&orientation=landscape"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/25"></div>
      </div>

      <div className="relative w-full px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0 max-w-7xl mx-auto pt-20 md:pt-24">
          <div className="w-full lg:w-5/12 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-background-50/20 backdrop-blur-sm text-background-50 text-xs font-medium font-label tracking-wider mb-6">
              {heroContent.tagline}
            </span>

            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-background-50 leading-tight mb-6">
              {heroContent.title}{' '}
              <span className="italic text-primary-300">{heroContent.titleAccent}</span>
            </h1>

            <p className="text-background-50/80 text-base md:text-lg leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
              {heroContent.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                href="#cta"
                className="whitespace-nowrap w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary-500 text-background-50 text-sm font-semibold font-label hover:bg-primary-600 transition-all cursor-pointer text-center"
              >
                {heroContent.calmButton}
              </a>
              <a
                href="#cta"
                className="whitespace-nowrap w-full sm:w-auto px-8 py-3.5 rounded-full border-2 border-background-50/60 text-background-50 text-sm font-semibold font-label hover:bg-background-50/10 transition-all cursor-pointer text-center"
              >
                {heroContent.crazyButton}
              </a>
            </div>
          </div>

          <div className="w-full lg:w-7/12 flex justify-center lg:justify-end">
            <div className="relative w-[280px] h-[380px] md:w-[400px] md:h-[520px] lg:w-[480px] lg:h-[600px] rounded-2xl overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=Elegant%20couple%20silhouette%20in%20warm%20golden%20lighting%2C%20romantic%20atmosphere%2C%20soft%20blurry%20background%20with%20bokeh%20lights%2C%20artistic%20portrait%20style%2C%20warm%20peach%20and%20amber%20tones%2C%20dreamy%20mood%2C%20editorial%20photography%20quality%2C%20intimate%20moment%20captured%2C%20contemporary%20fashion%20style%2C%20minimalist%20composition&width=960&height=1200&seq=hero-couple-2026&orientation=portrait"
                alt="Couple in warm romantic setting"
                className="w-full h-full object-cover object-top rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}