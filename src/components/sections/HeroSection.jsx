import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import GlobeCanvas from '../3d/GlobeCanvas';
import StatCounter from '../common/StatCounter';
import { siteData } from '../../data/site';

export default function HeroSection({ onOpenAssessment }) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-16 overflow-hidden">
      {/* Background ambient luxury lighting */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-gold-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-electric-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-900/40 via-navy-950 to-navy-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs sm:text-sm font-semibold shadow-sm backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>{siteData.company.heroBadge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              <span className="text-slate-300 font-normal">{siteData.company.establishedBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white font-display leading-[1.15]">
              Building Futures <br />
              <span className="text-gold-gradient">Beyond Borders</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              {siteData.company.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenAssessment}
                className="flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-sm text-navy-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-gold-glow transition-all hover:scale-105 active:scale-95"
              >
                <span>Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/services"
                className="flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm text-slate-200 bg-navy-900/80 hover:bg-navy-800 border border-slate-700 hover:border-gold-500/40 transition-all hover:text-white"
              >
                <span>Explore Services</span>
              </Link>
            </div>

            {/* Quick Guarantees */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <span>Transparent Process</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-electric-400" />
                <span>Tailored Documentation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>98% Visa Success Rate</span>
              </div>
            </div>

            {/* Hero Stats Pill Grid */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto lg:mx-0">
              {siteData.stats.slice(0, 4).map((stat) => (
                <div
                  key={stat.id}
                  className="p-3 rounded-xl bg-navy-900/60 border border-gold-500/15 backdrop-blur-sm text-center lg:text-left"
                >
                  <div className="text-2xl font-black text-white">
                    <StatCounter endValue={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                    {stat.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 3D Interactive Hero (5 Cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <GlobeCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}
