import React from 'react';
import { FileText, DollarSign, AlertCircle, CheckCircle2 } from 'lucide-react';
import { siteData } from '../../data/site';

export default function DocumentsSection() {
  const { documentsRequired } = siteData;

  return (
    <section className="py-20 bg-tint/40 relative overflow-hidden border-t border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold-700 font-bold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 shadow-soft-sm">
            Required Documents
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 font-display">
            Documents Required For <br />
            <span className="text-gold-gradient">Visa & Immigration Process</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-500 leading-relaxed font-sans">
            {documentsRequired.subtitle}
          </p>
        </div>

        {/* Two Main Columns: Academic vs Financial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Academic Documents */}
          <div className="rounded-2xl bg-white border border-border-light p-7 shadow-soft-md hover:shadow-soft-elevated transition">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-600">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-ink-900 font-display">Academic Documents</h3>
                <p className="text-xs text-ink-400">Essential proofs of education & testing</p>
              </div>
            </div>

            <ul className="space-y-3.5">
              {documentsRequired.academic.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink-700">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Financial Documents */}
          <div className="rounded-2xl bg-white border border-border-light p-7 shadow-soft-md hover:shadow-soft-elevated transition">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-electric-500/10 border border-electric-500/20 flex items-center justify-center text-electric-500">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-ink-900 font-display">Financial Documents</h3>
                <p className="text-xs text-ink-400">Funds verification & sponsorship evidence</p>
              </div>
            </div>

            <ul className="space-y-3.5">
              {documentsRequired.financial.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink-700">
                  <CheckCircle2 className="w-4 h-4 text-electric-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Important Notice Callout */}
        <div className="rounded-2xl bg-white border border-gold-500/30 p-5 sm:p-6 flex items-start gap-4 shadow-soft-sm">
          <AlertCircle className="w-6 h-6 text-gold-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-gold-700 uppercase tracking-wider">Important Note</h4>
            <p className="text-xs sm:text-sm text-ink-500 leading-relaxed">
              {documentsRequired.importantNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
