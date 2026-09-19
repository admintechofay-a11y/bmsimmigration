import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { siteData } from '../../data/site';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Study Visa', 'Documentation', 'Refusal Cases', 'Inside Canada', 'Financials'];

  const filteredFaqs = selectedCategory === 'All'
    ? siteData.faqs
    : siteData.faqs.filter((faq) => faq.category === selectedCategory);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-tint/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold-700 font-bold px-3 py-1 rounded-full bg-gold-50 border border-gold-200">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 font-display">
            Frequently Asked <span className="text-gold-gradient">Questions</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-600 max-w-2xl mx-auto">
            Clear, straightforward answers about our study visa, visitor visa, SOP preparation, and refusal handling services.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setOpenIndex(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-ink-900 text-white shadow-soft-sm font-bold'
                  : 'bg-white text-ink-700 hover:text-ink-900 border border-border-light hover:border-gold-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id || faq.question}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-gold-300 shadow-soft-md'
                    : 'bg-white/80 border-border-light hover:border-gold-200 hover:shadow-soft-sm'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-ink-900 font-display">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${
                      isOpen
                        ? 'bg-gold-500 text-ink-900 rotate-180'
                        : 'bg-tint text-ink-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-ink-600 leading-relaxed border-t border-border-light/80 font-sans">
                    <p>{faq.answer}</p>
                    <div className="mt-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gold-50 text-gold-700 border border-gold-200">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
