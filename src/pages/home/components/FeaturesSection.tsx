import { features } from '@/mocks/home';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-background-100">
      <div className="px-4 md:px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary-100 text-secondary-700 text-xs font-medium font-label mb-6">
            Why Calm or Crazy
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground-950 mb-4">
            Dating designed for <span className="italic">personalities</span>,<br />
            not just photos
          </h2>
          <p className="text-foreground-600 text-base md:text-lg max-w-lg leading-relaxed">
            Every feature is built around one idea: helping you find someone who gets your energy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 md:p-8 rounded-2xl bg-background-50 border border-background-200 hover:border-background-300 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-100 text-primary-600 mb-5 group-hover:bg-primary-500 group-hover:text-background-50 transition-all duration-300">
                <i className={`${feature.icon} text-xl`}></i>
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground-950 mb-3">
                {feature.title}
              </h3>
              <p className="text-foreground-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}