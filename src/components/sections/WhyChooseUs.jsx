import React from 'react';
import { ShieldCheck, FileCheck, Globe2, ArrowRight, Award, CheckCircle } from 'lucide-react';
import StatCounter from '../common/StatCounter';
import { siteData } from '../../data/site';

export default function WhyChooseUs({ onOpenAssessment }) {
  return (
    <section className="py-20 bg-navy-900/50 relative overflow-hidden border-y border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Content & 3 Pillars (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 inline-block">
                Why Choose BMS?
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display leading-tight">
                Strong Documentation. Smart Strategy. <br />
                <span className="text-gold-gradient">Professional Guidance.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                At BMS Immigration, we understand that every student's and professional’s journey is unique. Our expert consultants provide end-to-end support for study visas, visitor visas, documentation, SOP preparation, and refusal case handling with complete transparency and professionalism.
              </p>
            </div>

            {/* 3 Strategic Pillars */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-navy-950/80 border border-gold-500/20 flex items-start gap-4 hover:border-gold-500/40 transition">
                <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">Expert Visa Guidance</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                    Personalized consultation and professional immigration solutions tailored to your individual academic and financial profile.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-navy-950/80 border border-gold-500/20 flex items-start gap-4 hover:border-gold-500/40 transition">
                <div className="w-11 h-11 rounded-xl bg-electric-500/10 border border-electric-500/20 flex items-center justify-center text-electric-400 flex-shrink-0 mt-0.5">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">Strong Documentation Support</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                    SOP preparation, complete multi-stage file review, financial proofs collation, and error-free documentation assistance.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-navy-950/80 border border-gold-500/20 flex items-start gap-4 hover:border-gold-500/40 transition">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">Global Opportunities</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                    Guidance for study, tourist, and visitor visas across Canada, the UK, USA, Australia, Germany, and top European destinations.
                  </p>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                onClick={onOpenAssessment}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-navy-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-gold-glow transition"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Visual Showcase (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-3xl overflow-hidden border border-gold-500/30 shadow-card-elevated">
              <img
                src={siteData.company.consultationBannerImg}
                alt="BMS Immigration Consultation"
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/30" />

              {/* Stat Card Floating 1 */}
              <div className="absolute top-6 left-6 bg-navy-950/90 border border-gold-500/40 backdrop-blur-xl p-4 rounded-2xl shadow-card-elevated max-w-[200px]">
                <div className="flex items-center gap-2 text-gold-400 mb-1">
                  <Award className="w-5 h-5" />
                  <span className="text-xl font-black">
                    <StatCounter endValue={98} suffix="%" />
                  </span>
                </div>
                <p className="text-[11px] font-bold text-white">Visa Success Rate</p>
                <p className="text-[10px] text-slate-400">Consistent Track Record</p>
              </div>

              {/* Stat Card Floating 2 */}
              <div className="absolute bottom-6 right-6 bg-navy-950/90 border border-electric-500/40 backdrop-blur-xl p-4 rounded-2xl shadow-card-elevated max-w-[210px]">
                <div className="flex items-center gap-2 text-electric-400 mb-1">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-xl font-black">
                    <StatCounter endValue={2000} suffix="+" />
                  </span>
                </div>
                <p className="text-[11px] font-bold text-white">Successful Applications</p>
                <p className="text-[10px] text-slate-400">Students & Visitors Worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
