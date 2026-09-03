import { useState } from 'react';
import { faqs } from '@/mocks/home';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-background-50">
      <div className="px-4 md:px-6 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary-100 text-secondary-700 text-xs font-medium font-label mb-6">
            FAQ
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground-950 mb-4">
            Got <span className="italic">questions?</span>
          </h2>
          <p className="text-foreground-600 text-base leading-relaxed">
            Everything you need to know before diving in.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-background-200 overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer hover:bg-background-100 transition-colors"
              >
                <span className="font-heading text-base md:text-lg font-semibold text-foreground-950 pr-4">
                  {faq.question}
                </span>
                <span className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-background-100 text-foreground-500">
                  <i
                    className={`text-sm transition-transform duration-300 ${
                      openIndex === index ? 'ri-subtract-line rotate-180' : 'ri-add-line'
                    }`}
                  ></i>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 pb-5 md:pb-6 px-5 md:px-6' : 'max-h-0'
                }`}
              >
                <p className="text-foreground-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}