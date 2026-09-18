import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';
import { siteData } from '../../data/site';

export default function Testimonials3D() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? siteData.testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === siteData.testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display">
            Success Stories from <br />
            <span className="text-gold-gradient">Our Students</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            Real experiences from students and professionals who achieved their international education and visa dreams.
          </p>
        </div>

        {/* Carousel / Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteData.testimonials.map((t, idx) => (
            <div
              key={t.id}
              className="relative rounded-2xl bg-gradient-to-b from-navy-900/95 to-navy-950 border border-gold-500/20 p-6 flex flex-col justify-between shadow-card-elevated hover:border-gold-500/50 transition duration-300"
            >
              {/* Top Row: Stars + Destination Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gold-500/15 text-gold-300 border border-gold-500/25">
                  {t.destination}
                </span>
              </div>

              {/* Headline & Quote */}
              <div className="space-y-2 mb-6">
                <h4 className="text-base font-bold text-white font-display">
                  "{t.headline}"
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic font-sans">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold-600 to-gold-400 text-navy-950 font-bold flex items-center justify-center text-sm shadow-md">
                  {t.avatarInitials}
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white leading-none">{t.name}</h5>
                  <p className="text-[11px] text-gold-400 mt-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>{t.visaType}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
