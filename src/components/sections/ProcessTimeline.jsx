import React, { useState } from 'react';
import {
  UserCheck,
  FileCheck2,
  Send,
  Fingerprint,
  RefreshCw,
  PlaneTakeoff,
  ArrowRight
} from 'lucide-react';
import { siteData } from '../../data/site';

export default function ProcessTimeline({ onOpenAssessment }) {
  const [activeStep, setActiveStep] = useState(1);

  const stepIcons = [
    UserCheck,
    FileCheck2,
    Send,
    Fingerprint,
    RefreshCw,
    PlaneTakeoff,
  ];

  return (
    <section className="py-20 bg-navy-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display">
            Your Journey to <br />
            <span className="text-gold-gradient">Visa Success</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            A simple, transparent, and professionally managed process designed to maximize your visa approval chances.
          </p>
        </div>

        {/* 6 Step Interactive Roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteData.processSteps.map((step, idx) => {
            const IconComp = stepIcons[idx] || UserCheck;
            const isSelected = activeStep === step.step;

            return (
              <div
                key={step.step}
                onClick={() => setActiveStep(step.step)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-navy-900 via-navy-900 to-navy-950 border-gold-500/60 shadow-gold-glow scale-[1.02]'
                    : 'bg-navy-900/40 border-slate-800/80 hover:border-gold-500/30 hover:bg-navy-900/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition ${
                        isSelected
                          ? 'bg-gold-500 text-navy-950 shadow-md'
                          : 'bg-navy-800 text-gold-400 border border-gold-500/20'
                      }`}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    <span className="text-3xl font-black text-slate-700 select-none font-display">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-gold-400 font-semibold">{step.timeline}</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">
                    Stage {step.step} of 6
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Prompt */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenAssessment}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-navy-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-gold-glow transition"
          >
            <span>Begin Step 1: Free Evaluation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
