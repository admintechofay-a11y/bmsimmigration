import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Star, ShieldCheck, Quote, MessageSquare } from 'lucide-react';
import SEO from '../components/common/SEO';
import CTASection from '../components/sections/CTASection';
import { siteData } from '../data/site';

export default function TestimonialsPage() {
  const { onOpenAssessment } = useOutletContext();
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Study Visa', 'Visitor Visa', 'Canada', 'United Kingdom', 'United States', 'Australia'];

  const filteredTestimonials = siteData.testimonials.filter((item) => {
    if (filter === 'All') return true;
    return (
      item.visaType.toLowerCase().includes(filter.toLowerCase()) ||
      item.destination.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <>
      <SEO
        title="Student & Client Testimonials - Visa Success Stories"
        description="Read authentic success stories and reviews from students and visitors who secured their visas through BMS Immigration Services."
        canonicalUrl="/testimonials"
      />

      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 inline-block mb-4">
            Proven Track Record
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-display mb-4">
            Success Stories from <br />
            <span className="text-gold-gradient">Our Clients</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Real experiences from students, tourists, and families who achieved their global travel and international education dreams with BMS Immigration.
          </p>

          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-white ml-2">4.9 / 5.0 Rating</span>
            <span className="text-xs text-slate-400">• 2000+ Success Stories</span>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section className="py-16 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  filter === cat
                    ? 'bg-gold-500 text-navy-950 font-bold shadow-gold-glow'
                    : 'bg-navy-900/80 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-gradient-to-b from-navy-900/90 to-navy-950 border border-gold-500/20 p-6 flex flex-col justify-between shadow-card-elevated hover:border-gold-500/50 transition duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                      ))}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gold-500/10 text-gold-400 border border-gold-500/20">
                      {item.destination}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display mb-2">
                    "{item.headline}"
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic font-sans mb-6">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold-600 to-gold-400 text-navy-950 font-bold flex items-center justify-center text-sm shadow-md">
                    {item.avatarInitials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-none">{item.name}</h4>
                    <p className="text-[11px] text-gold-400 mt-1 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>{item.visaType}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection onOpenAssessment={onOpenAssessment} />
    </>
  );
}
