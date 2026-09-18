import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Search, ChevronDown, PhoneCall, MessageCircle } from 'lucide-react';
import SEO from '../components/common/SEO';
import CTASection from '../components/sections/CTASection';
import { siteData } from '../data/site';

export default function FAQPage() {
  const { onOpenAssessment } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(0);

  const categories = ['All', 'Study Visa', 'Documentation', 'Refusal Cases', 'Inside Canada', 'Financials', 'General'];

  const filteredFaqs = siteData.faqs.filter((faq) => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <SEO
        title="Frequently Asked Questions - Visa & Immigration Answers"
        description="Get answers to your top questions regarding study visas, work permits, SOP requirements, visa refusal reversals, and proof of funds."
        canonicalUrl="/faq"
      />

      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 inline-block mb-4">
            Knowledge Center
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-display mb-4">
            Frequently Asked <br />
            <span className="text-gold-gradient">Questions</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about international student visas, refusal case turnaround, and financial requirements.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-gold-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by topic, e.g. SOP, funds, refusal, Canada..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-navy-900/90 border border-gold-500/30 text-white placeholder-slate-400 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none shadow-card-elevated"
            />
          </div>
        </div>
      </section>

      {/* Category Tabs & Accordion */}
      <section className="py-16 bg-navy-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
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
                    ? 'bg-gold-500 text-navy-950 font-bold shadow-gold-glow'
                    : 'bg-navy-900/80 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'bg-navy-900/90 border-gold-500/40 shadow-card-elevated'
                        : 'bg-navy-900/50 border-slate-800/80 hover:border-gold-500/20'
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus:outline-none"
                    >
                      <span className="text-base font-bold text-white font-display">
                        {faq.question}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${
                          isOpen
                            ? 'bg-gold-500 text-navy-950 rotate-180'
                            : 'bg-navy-800 text-slate-400'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 font-sans">
                        <p>{faq.answer}</p>
                        <div className="mt-3">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gold-500/10 text-gold-400 border border-gold-500/20">
                            {faq.category}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 p-8 rounded-2xl bg-navy-900/40 border border-slate-800">
                <p className="text-sm text-slate-300">
                  No matching questions found for "{searchTerm}".
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-3 text-xs font-bold text-gold-400 hover:underline"
                >
                  Clear search query
                </button>
              </div>
            )}
          </div>

          {/* Direct Reach Box */}
          <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-navy-900/80 border border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-card-elevated">
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Didn't find your specific situation answered?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Speak directly with Supriya Patel or Sidharth for personalized profile counseling.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href="tel:+917206658047"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-navy-800 border border-slate-700 hover:border-gold-500 transition"
              >
                <PhoneCall className="w-3.5 h-3.5 text-gold-400" />
                <span>+91 72066 58047</span>
              </a>

              <a
                href={siteData.company.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection onOpenAssessment={onOpenAssessment} />
    </>
  );
}
