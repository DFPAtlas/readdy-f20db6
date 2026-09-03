import { useState } from 'react';
import { testimonials } from '@/mocks/home';

const testimonialImages = [
  'https://readdy.ai/api/search-image?query=Warm%20genuine%20portrait%20of%20a%20woman%20with%20bright%20smile%2C%20soft%20natural%20daylight%2C%20clean%20cream%20background%2C%20casual%20modern%20style%20with%20earth%20tones%2C%20lifestyle%20portrait%20photography%2C%20authentic%20happy%20expression%2C%20editorial%20quality%2C%20warm%20neutral%20tones&width=600&height=800&seq=testimonial-maya&orientation=portrait',
  'https://readdy.ai/api/search-image?query=Warm%20genuine%20portrait%20of%20a%20man%20smiling%20naturally%2C%20soft%20natural%20lighting%2C%20clean%20cream%20background%2C%20casual%20modern%20style%2C%20lifestyle%20portrait%20photography%2C%20authentic%20confident%20expression%2C%20editorial%20quality%2C%20warm%20neutral%20tones&width=600&height=800&seq=testimonial-james&orientation=portrait',
  'https://readdy.ai/api/search-image?query=Warm%20genuine%20portrait%20of%20a%20woman%20laughing%20authentically%2C%20soft%20natural%20lighting%2C%20clean%20cream%20background%2C%20casual%20modern%20bohemian%20style%2C%20lifestyle%20portrait%20photography%2C%20joyful%20expression%2C%20editorial%20quality%2C%20warm%20neutral%20tones&width=600&height=800&seq=testimonial-zara&orientation=portrait',
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section id="stories" className="py-20 md:py-28 bg-background-50">
      <div className="px-4 md:px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-medium font-label mb-6">
            Love Stories
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground-950 mb-4">
            Real people,{' '}
            <span className="italic text-foreground-400">real connections</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <div className="w-full lg:w-5/12">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-sm mx-auto lg:max-w-none bg-accent-100/30">
              <img
                src={testimonialImages[current]}
                alt={t.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <div className="w-full lg:w-7/12">
            <span className="text-foreground-400 text-xs font-medium font-label mb-6 block">
              (success story)
            </span>

            <h3 className="font-heading text-2xl md:text-4xl font-bold text-foreground-950 mb-2">
              {t.name.split(' ')[0]}&apos;s{' '}
              <span className="text-foreground-400">story</span>
            </h3>

            <div className="mt-8 md:mt-12">
              <blockquote className="relative">
                <i className="ri-double-quotes-l text-4xl text-primary-200 absolute -top-4 -left-2"></i>
                <p className="text-foreground-700 text-base md:text-lg leading-relaxed pl-8">
                  {t.quote}
                </p>
              </blockquote>
              <div className="mt-6 pl-8">
                <p className="font-heading text-lg font-semibold text-foreground-950">
                  &mdash; {t.name}
                </p>
                <p className="text-foreground-500 text-sm mt-1">{t.detail}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-10">
              <button
                onClick={goPrev}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-foreground-300 text-foreground-500 hover:border-foreground-400 hover:text-foreground-700 transition-all cursor-pointer"
                aria-label="Previous testimonial"
              >
                <i className="ri-arrow-left-line"></i>
              </button>
              <button
                onClick={goNext}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-foreground-950 text-background-50 hover:bg-foreground-800 transition-all cursor-pointer"
                aria-label="Next testimonial"
              >
                <i className="ri-arrow-right-line"></i>
              </button>
              <span className="text-foreground-400 text-xs ml-2">
                {current + 1} / {testimonials.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}