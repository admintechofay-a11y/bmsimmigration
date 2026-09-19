import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import StatCounter from '../common/StatCounter';
import Globe2DFallback from '../3d/Globe2DFallback';
import ErrorBoundary3D from '../common/ErrorBoundary3D';
import DreamDestinationMatcher from '../common/DreamDestinationMatcher';
import globePoster from '../../assets/images/globe-poster.webp';
import { siteData } from '../../data/site';
import { useDeviceTier } from '../../hooks/useDeviceTier';

export default function HeroSection({ onOpenAssessment }) {
  const [GlobeComponent, setGlobeComponent] = useState(null);
  const [isEligibleFor3D, setIsEligibleFor3D] = useState(false);
  const { isTier0, canRenderWebGL } = useDeviceTier();

  useEffect(() => {
    // Only load 3D on capable Tier 1 & Tier 2 displays without reduced motion
    if (isTier0 || !canRenderWebGL) {
      setIsEligibleFor3D(false);
      return;
    }

    setIsEligibleFor3D(true);

    // Schedule dynamic import AFTER first paint via requestIdleCallback (1500ms timeout)
    const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500));
    const handle = schedule(() => {
      import('../3d/GlobeCanvas')
        .then((mod) => {
          setGlobeComponent(() => mod.default);
        })
        .catch((err) => {
          console.warn('Failed to load 3D GlobeCanvas dynamically:', err);
        });
    }, { timeout: 1500 });

    return () => {
      if (window.cancelIdleCallback && typeof handle === 'number') {
        window.cancelIdleCallback(handle);
      }
    };
  }, [isTier0, canRenderWebGL]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 overflow-hidden bg-gradient-to-b from-transparent via-tint/25 to-transparent">
      {/* Background ambient luxury lighting & Aurora grain */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-teal-400/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-gold-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 rounded-full bg-electric-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 aurora-grain opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-700 text-xs sm:text-sm font-semibold shadow-soft-sm backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-gold-600" />
              <span>{siteData.company.heroBadge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
              <span className="text-ink-500 font-normal">{siteData.company.establishedBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-ink-900 font-display leading-[1.15]">
              Building Futures <br />
              <span className="text-gold-gradient">Beyond Borders</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-ink-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              {siteData.company.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenAssessment}
                className="flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-ink-900 to-navy-800 hover:from-navy-800 hover:to-navy-700 shadow-btn-navy transition-all hover:scale-105 active:scale-95"
              >
                <span>Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/services"
                className="flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm text-ink-900 bg-white hover:bg-tint border border-border-light hover:border-gold-500/40 transition-all shadow-soft-sm"
              >
                <span>Explore Services</span>
              </Link>
            </div>

            {/* Quick Guarantees */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-ink-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold-600" />
                <span>Transparent Process</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-electric-500" />
                <span>Tailored Documentation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>98% Visa Success Rate</span>
              </div>
            </div>

            {/* Interactive Dream Destination Matcher & Celebration Widget */}
            <DreamDestinationMatcher onOpenAssessment={onOpenAssessment} />

            {/* Hero Stats Pill Grid */}
            <div className="pt-4 border-t border-border-light grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto lg:mx-0">
              {siteData.stats.slice(0, 4).map((stat) => (
                <div
                  key={stat.id}
                  className="p-3.5 rounded-xl bg-white/90 border border-border-light backdrop-blur-sm text-center lg:text-left shadow-soft-sm hover:border-gold-500/40 transition"
                >
                  <div className="text-2xl font-black text-ink-900">
                    <StatCounter endValue={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[11px] font-semibold text-ink-500 uppercase tracking-wider mt-0.5">
                    {stat.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 3D/Poster Hero (5 Cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {isEligibleFor3D && GlobeComponent ? (
              <ErrorBoundary3D fallback={<Globe2DFallback />}>
                <GlobeComponent />
              </ErrorBoundary3D>
            ) : isEligibleFor3D ? (
              /* High-fidelity static poster while idle callback loads 3D */
              <div className="relative w-full h-[480px] lg:h-[540px] max-w-[580px] mx-auto flex items-center justify-center">
                <img
                  src={globePoster}
                  alt="BMS Immigration Global Network"
                  width={580}
                  height={540}
                  decoding="sync"
                  // @ts-ignore
                  fetchpriority="high"
                  className="w-full h-full object-contain animate-fade-in"
                />
              </div>
            ) : (
              /* Lightweight 2D Fallback on mobile/touch/low-power */
              <Globe2DFallback />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
