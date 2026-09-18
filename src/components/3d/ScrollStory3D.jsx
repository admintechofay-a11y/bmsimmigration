import React, { useState, useEffect } from 'react';
import { GraduationCap, Briefcase, Award, Plane, HeartHandshake, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ScrollStory3D({ onOpenAssessment }) {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: 'study',
      title: 'Study Visa',
      tagline: 'Top Global Universities & Scholarships',
      icon: GraduationCap,
      color: '#D4A44A',
      desc: 'Personalized course shortlisting, offer letter processing, and high-approval student visa filing across Canada, the UK, USA, Australia, and Germany.',
      metric: '5000+ Students Guided',
      slug: 'study-visa-assistance'
    },
    {
      id: 'work',
      title: 'Work & Post-Grad Visas',
      tagline: 'PGWP, 485 & Graduate Route Work Rights',
      icon: Briefcase,
      color: '#2F80ED',
      desc: 'Seamless transition from student status to international legal employment through post-study work permits with full maintaining compliance.',
      metric: 'Up to 3 Years Rights',
      slug: 'inside-canada-applications'
    },
    {
      id: 'pr',
      title: 'Permanent Residency (PR)',
      tagline: 'Express Entry, PNP & Skilled Migration',
      icon: Award,
      color: '#F4C76A',
      desc: 'Strategic points calculation, CRS score enhancement, and provincial nomination management for long-term global settlement.',
      metric: '98% Success Ratio',
      slug: 'inside-canada-applications'
    },
    {
      id: 'tourist',
      title: 'Tourist & Visitor Visas',
      tagline: 'Fast Travel, Tourism & Family Reunions',
      icon: Plane,
      color: '#60A5FA',
      desc: 'Fast, hassle-free visitor visas with bulletproof purpose-of-travel letters, financial tie documentation, and consulate checklists.',
      metric: 'Fast Processing',
      slug: 'tourist-visitor-visa'
    },
    {
      id: 'spouse',
      title: 'Spousal & Family Sponsorship',
      tagline: 'Reunite with Your Loved Ones Abroad',
      icon: HeartHandshake,
      color: '#D4A44A',
      desc: 'Spousal open work permits (SOWP) and family visitor visas ensuring quick, legal reunification in your destination country.',
      metric: 'Comprehensive Support',
      slug: 'tourist-visitor-visa'
    }
  ];

  return (
    <section className="py-20 bg-navy-900/60 relative border-y border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
            Lifecycle Pathways
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display">
            From First Flight to <br />
            <span className="text-gold-gradient">Permanent Settlement</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Follow the complete global journey supported at every step by BMS Immigration Services.
          </p>
        </div>

        {/* Stage Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {stages.map((stg, idx) => {
            const Icon = stg.icon;
            const isCurrent = activeStage === idx;
            return (
              <button
                key={stg.id}
                onClick={() => setActiveStage(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-r from-gold-400 to-gold-500 text-navy-950 shadow-gold-glow scale-105'
                    : 'bg-navy-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{stg.title}</span>
              </button>
            );
          })}
        </div>

        {/* Stage Active Showcase Card */}
        {(() => {
          const stg = stages[activeStage];
          const Icon = stg.icon;
          return (
            <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-gold-500/30 shadow-card-elevated max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-navy-950/80 border border-gold-500/20">
                <div className="w-20 h-20 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4 shadow-gold-glow">
                  <Icon className="w-10 h-10" />
                </div>
                <span className="text-xs font-semibold text-gold-400 uppercase tracking-widest">
                  Stage {activeStage + 1} of 5
                </span>
                <span className="text-xl font-bold text-white font-display mt-1">
                  {stg.title}
                </span>
                <span className="mt-3 px-3 py-1 rounded-full bg-navy-800 text-[11px] text-slate-300 font-medium">
                  {stg.metric}
                </span>
              </div>

              <div className="md:col-span-8 space-y-4">
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block">
                  {stg.tagline}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  Strategic Guidance for {stg.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {stg.desc}
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={onOpenAssessment}
                    className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-gold-glow transition"
                  >
                    Check Eligibility for {stg.title}
                  </button>
                  <Link
                    to={`/services/${stg.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-gold-400 transition"
                  >
                    <span>Read Full Service Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
