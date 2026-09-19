import React from 'react';
import { ShieldCheck, FileCheck, Globe2, ArrowRight, Award, CheckCircle } from 'lucide-react';
import StatCounter from '../common/StatCounter';
import ResponsivePicture from '../common/ResponsivePicture';
import { siteData } from '../../data/site';

export default function WhyChooseUs({ onOpenAssessment }) {
  return (
    <section className="py-20 bg-white relative overflow-hidden border-y border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Content & 3 Pillars (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-gold-700 font-bold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 inline-block shadow-soft-sm">
                Why Choose BMS?
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 font-display leading-tight">
                Strong Documentation. Smart Strategy. <br />
                <span className="text-gold-gradient">Professional Guidance.</span>
              </h2>
              <p className="text-sm sm:text-base text-ink-500 leading-relaxed font-sans">
                At BMS Immigration, we understand that every student's and professional’s journey is unique. Our expert consultants provide end-to-end support for study visas, visitor visas, documentation, SOP preparation, and refusal case handling with complete transparency and professionalism.
              </p>
            </div>

            {/* 3 Strategic Pillars */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-tint/60 border border-border-light flex items-start gap-4 hover:border-gold-500/40 hover:bg-white transition shadow-soft-sm">
                <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-600 flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink-900 font-display">Expert Visa Guidance</h3>
                  <p className="text-xs sm:text-sm text-ink-500 mt-1 leading-relaxed">
                    Personalized consultation and professional immigration solutions tailored to your individual academic and financial profile.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-tint/60 border border-border-light flex items-start gap-4 hover:border-gold-500/40 hover:bg-white transition shadow-soft-sm">
                <div className="w-11 h-11 rounded-xl bg-electric-500/10 border border-electric-500/20 flex items-center justify-center text-electric-500 flex-shrink-0 mt-0.5">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink-900 font-display">Strong Documentation Support</h3>
                  <p className="text-xs sm:text-sm text-ink-500 mt-1 leading-relaxed">
                    SOP preparation, complete multi-stage file review, financial proofs collation, and error-free documentation assistance.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-tint/60 border border-border-light flex items-start gap-4 hover:border-gold-500/40 hover:bg-white transition shadow-soft-sm">
                <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 flex-shrink-0 mt-0.5">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink-900 font-display">Global Opportunities</h3>
                  <p className="text-xs sm:text-sm text-ink-500 mt-1 leading-relaxed">
                    Guidance for study, tourist, and visitor visas across Canada, the UK, USA, Australia, Germany, and top European destinations.
                  </p>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                onClick={onOpenAssessment}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-ink-900 to-navy-800 hover:from-navy-800 hover:to-navy-700 shadow-btn-navy transition"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Visual Showcase (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-3xl overflow-hidden border border-border-light shadow-soft-elevated">
              <ResponsivePicture
                src={siteData.company.consultationBannerImg}
                alt="BMS Immigration Consultation"
                width={520}
                height={520}
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

              {/* Stat Card Floating 1 */}
              <div className="absolute top-6 left-6 bg-white/95 border border-border-light backdrop-blur-xl p-4 rounded-2xl shadow-soft-md max-w-[200px]">
                <div className="flex items-center gap-2 text-gold-600 mb-1">
                  <Award className="w-5 h-5" />
                  <span className="text-xl font-black text-ink-900">
                    <StatCounter endValue={98} suffix="%" />
                  </span>
                </div>
                <p className="text-[11px] font-bold text-ink-900">Visa Success Rate</p>
                <p className="text-[10px] text-ink-500">Consistent Track Record</p>
              </div>

              {/* Stat Card Floating 2 */}
              <div className="absolute bottom-6 right-6 bg-white/95 border border-border-light backdrop-blur-xl p-4 rounded-2xl shadow-soft-md max-w-[210px]">
                <div className="flex items-center gap-2 text-electric-500 mb-1">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-xl font-black text-ink-900">
                    <StatCounter endValue={2000} suffix="+" />
                  </span>
                </div>
                <p className="text-[11px] font-bold text-ink-900">Successful Applications</p>
                <p className="text-[10px] text-ink-500">Students & Visitors Worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
