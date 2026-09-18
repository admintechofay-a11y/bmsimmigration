import React from 'react';
import { useOutletContext } from 'react-router-dom';
import SEO from '../components/common/SEO';
import ProcessTimeline from '../components/sections/ProcessTimeline';
import DocumentsSection from '../components/sections/DocumentsSection';
import CTASection from '../components/sections/CTASection';
import { ShieldCheck, CheckCircle2, Clock, HelpCircle } from 'lucide-react';

export default function ProcessPage() {
  const { onOpenAssessment } = useOutletContext();

  return (
    <>
      <SEO
        title="Our Strategic Process - Step-by-Step Immigration Roadmap"
        description="Explore the transparent 6-step visa application process at BMS Immigration. From profile evaluation and SOP drafting to approval and post-landing support."
        canonicalUrl="/process"
      />

      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 inline-block mb-4">
            Structured Execution
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-display mb-4">
            Our Strategic <br />
            <span className="text-gold-gradient">Immigration Approach</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A transparent, step-by-step immigration process designed to simplify visa applications, reduce risks, and maximize approval success through professional guidance.
          </p>
        </div>
      </section>

      {/* 6 Step Roadmap */}
      <ProcessTimeline onOpenAssessment={onOpenAssessment} />

      {/* Key Factors for Approval */}
      <section className="py-16 bg-navy-900/50 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              The BMS Quality Standards
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Why our applications maintain a 98% success rate across competitive visa categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-navy-950/80 border border-gold-500/20">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display mb-2">Zero-Error Documentation</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Every financial statement, degree certificate, and reference is audited through multiple internal checklists prior to submission.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-950/80 border border-gold-500/20">
              <div className="w-10 h-10 rounded-xl bg-electric-500/10 border border-electric-500/30 flex items-center justify-center text-electric-400 mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display mb-2">Tailored Legal Letters</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                No generic AI templates. Every SOP and cover letter is custom-crafted to directly satisfy consular immigration criteria.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-950/80 border border-gold-500/20">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display mb-2">Fast Turnaround Times</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Rapid turnaround on offer letter acquisitions, fee payments, and visa lodgments to beat intake cutoffs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <DocumentsSection />

      {/* CTA */}
      <CTASection onOpenAssessment={onOpenAssessment} />
    </>
  );
}
