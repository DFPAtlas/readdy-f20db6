import { personalityTypes } from '@/mocks/home';

const personalityImages = {
  calm: 'https://readdy.ai/api/search-image?query=Serene%20person%20reading%20book%20by%20window%20with%20morning%20sunlight%2C%20cozy%20minimalist%20interior%2C%20warm%20cream%20tones%2C%20peaceful%20atmosphere%2C%20soft%20natural%20lighting%2C%20lifestyle%20photography%2C%20calm%20and%20grounded%20mood%2C%20elegant%20casual%20style%2C%20neutral%20beige%20and%20white%20palette&width=800&height=640&seq=personality-calm-01&orientation=landscape',
  crazy: 'https://readdy.ai/api/search-image?query=Energetic%20person%20dancing%20at%20sunset%20outdoor%20festival%2C%20vibrant%20warm%20golden%20light%2C%20dynamic%20movement%20with%20arms%20raised%2C%20joyful%20expression%2C%20bokeh%20background%20with%20string%20lights%2C%20lifestyle%20photography%2C%20free%20and%20wild%20spirit%2C%20bohemian%20style%2C%20rich%20amber%20and%20coral%20tones&width=800&height=640&seq=personality-crazy-01&orientation=landscape',
};

export default function PersonalityTypesSection() {
  return (
    <section id="personalities" className="py-20 md:py-28 bg-background-50">
      <div className="px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-medium font-label mb-6">
            Pick Your Side
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground-950 mb-4">
            Which one <span className="italic">are you?</span>
          </h2>
          <p className="text-foreground-600 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            No wrong answers. Just the energy you bring to the table. And yes — opposites definitely attract.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {personalityTypes.map((personality) => (
            <div
              key={personality.type}
              className="group rounded-2xl border border-background-200 overflow-hidden bg-background-50 hover:border-background-300 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-72 md:h-80 overflow-hidden">
                <img
                  src={personalityImages[personality.type as keyof typeof personalityImages]}
                  alt={personality.label}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold font-label ${
                      personality.type === 'calm'
                        ? 'bg-background-50/90 text-secondary-700'
                        : 'bg-accent-500/90 text-background-50'
                    }`}
                  >
                    {personality.label}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h3 className="font-heading text-2xl font-semibold text-foreground-950 mb-3">
                  {personality.title}
                </h3>
                <p className="text-foreground-600 text-sm leading-relaxed mb-5">
                  {personality.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {personality.traits.map((trait) => (
                    <span
                      key={trait}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        personality.type === 'calm'
                          ? 'bg-secondary-100 text-secondary-700'
                          : 'bg-accent-100 text-accent-700'
                      }`}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}