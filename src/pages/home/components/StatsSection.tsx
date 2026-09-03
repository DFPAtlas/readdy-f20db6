import { stats } from '@/mocks/home';

export default function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-secondary-500">
      <div className="px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl md:text-5xl font-bold text-background-50 mb-2">
                {stat.number}
              </p>
              <p className="text-background-50/70 text-sm font-medium font-label">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}