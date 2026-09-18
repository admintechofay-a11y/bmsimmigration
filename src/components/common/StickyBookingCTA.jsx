import React, { useState, useEffect } from 'react';
import { Sparkles, PhoneCall, Calendar } from 'lucide-react';
import { siteData } from '../../data/site';

export default function StickyBookingCTA({ onOpenAssessment }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after user scrolls down 300px
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <aside aria-label="Quick assessment bar" className="fixed bottom-0 left-0 right-0 z-40 bg-navy-950/85 backdrop-blur-xl border-t border-gold-500/25 py-2.5 px-4 shadow-[0_-10px_30px_rgba(0,0,0,0.6)] transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-400/40 flex items-center justify-center text-gold-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gold-400 uppercase tracking-wider">Free Profile Assessment</p>
            <p className="text-sm text-slate-300 hidden sm:block">Find the right university & visa pathway in 60 seconds</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="tel:+917206658047"
            className="hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-navy-800/80 border border-slate-700 hover:border-gold-500/50 hover:text-white transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5 text-gold-400" />
            <span>+91 72066 58047</span>
          </a>

          <button
            onClick={onOpenAssessment}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-navy-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-gold-glow transition-all hover:scale-105 active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Check Eligibility</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
