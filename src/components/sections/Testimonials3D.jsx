import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { siteData } from '../../data/site';

export default function Testimonials3D() {
  return (
    <section className="py-20 bg-page relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold-700 font-bold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 shadow-soft-sm">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 font-display">
            Success Stories from <br />
            <span className="text-gold-gradient">Our Students</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-500 leading-relaxed font-sans">
            Real experiences from students and professionals who achieved their international education and visa dreams.
          </p>
        </div>

        {/* CSS 3D Carousel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteData.testimonials.map((t) => (
            <div
              key={t.id}
              className="relative rounded-2xl bg-white/95 border border-border-light p-6 flex flex-col justify-between shadow-soft-md hover:shadow-soft-elevated hover:border-gold-500/40 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Top Row: Stars + Destination Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-tint text-gold-700 border border-border-light">
                  {t.destination}
                </span>
              </div>

              {/* Headline & Quote */}
              <div className="space-y-2 mb-6">
                <h4 className="text-base font-bold text-ink-900 font-display">
                  "{t.headline}"
                </h4>
                <p className="text-xs sm:text-sm text-ink-500 leading-relaxed italic font-sans">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-border-subtle flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold-600 to-gold-400 text-white font-bold flex items-center justify-center text-sm shadow-soft-sm">
                  {t.avatarInitials}
                </div>
                <div>
                  <h5 className="text-sm font-bold text-ink-900 leading-none">{t.name}</h5>
                  <p className="text-[11px] text-gold-600 mt-0.5 flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
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
