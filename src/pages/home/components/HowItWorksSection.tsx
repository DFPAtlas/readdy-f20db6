import { useState } from 'react';
import { howItWorksSteps } from '@/mocks/home';

const stepImages = [
  'https://readdy.ai/api/search-image?query=Person%20looking%20at%20phone%20with%20two%20options%20calm%20or%20crazy%20on%20screen%2C%20warm%20ambient%20lighting%2C%20modern%20minimalist%20setting%2C%20soft%20cream%20and%20beige%20tones%2C%20lifestyle%20photography%2C%20clean%20aesthetic%2C%20relaxed%20mood%2C%20cozy%20evening%20atmosphere%2C%20authentic%20candid%20style&width=800&height=800&seq=how-step-1&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Person%20creating%20online%20dating%20profile%20on%20laptop%20with%20coffee%20on%20wooden%20table%2C%20cozy%20home%20setting%2C%20natural%20daylight%20from%20window%2C%20warm%20neutral%20tones%2C%20authentic%20lifestyle%20scene%2C%20candid%20photography%20style%2C%20soft%20natural%20shadows%2C%20clean%20minimal%20interior&width=800&height=800&seq=how-step-2&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Two%20people%20profiles%20connecting%20on%20phone%20screen%20with%20heart%20icon%2C%20modern%20interface%20design%2C%20warm%20romantic%20lighting%2C%20clean%20minimalist%20background%2C%20soft%20focus%20effect%2C%20digital%20connection%20concept%2C%20elegant%20composition%2C%20peach%20and%20cream%20aesthetic&width=800&height=800&seq=how-step-3&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Two%20people%20having%20coffee%20together%20at%20cozy%20cafe%20with%20warm%20natural%20lighting%2C%20intimate%20conversation%2C%20candid%20genuine%20moment%2C%20soft%20romantic%20atmosphere%2C%20lifestyle%20documentary%20photography%2C%20genuine%20connection%2C%20warm%20amber%20and%20beige%20aesthetic&width=800&height=800&seq=how-step-4&orientation=squarish',
];

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="relative py-20 md:py-28 overflow-hidden bg-secondary-900">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary-800 to-secondary-950"></div>

      <div className="relative px-4 md:px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100/20 text-accent-200 text-xs font-medium font-label mb-6">
            <i className="ri-flashlight-line text-xs w-3 h-3 flex items-center justify-center"></i>
            How It Works
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-background-50 mb-4 max-w-xl">
            Four simple steps to find your vibe
          </h2>
          <p className="text-background-50/60 text-base md:text-lg max-w-xl leading-relaxed">
            No complicated algorithms. No endless swiping. Just real connections based on who you actually are.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          <div className="w-full lg:w-5/12">
            <div className="relative rounded-2xl overflow-hidden aspect-square bg-background-50/5">
              <img
                src={stepImages[activeStep]}
                alt={howItWorksSteps[activeStep].title}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <div className="w-full lg:w-7/12">
            <div className="space-y-3">
              {howItWorksSteps.map((step, index) => (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left p-5 md:p-6 rounded-xl transition-all duration-300 cursor-pointer ${
                    activeStep === index
                      ? 'bg-background-50/10 border border-background-50/20'
                      : 'border border-transparent hover:bg-background-50/5'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`font-heading text-3xl md:text-4xl font-bold shrink-0 w-16 ${
                        activeStep === index ? 'text-accent-400' : 'text-background-50/30'
                      }`}
                    >
                      {step.number}
                    </span>
                    <div>
                      <h3
                        className={`font-heading text-lg md:text-xl font-semibold mb-1 ${
                          activeStep === index ? 'text-background-50' : 'text-background-50/70'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed ${
                          activeStep === index ? 'text-background-50/70' : 'text-background-50/40'
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}