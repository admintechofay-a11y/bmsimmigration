import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  GraduationCap,
  Plane,
  FileText,
  AlertTriangle,
  Building2,
  MailCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import SEO from '../components/common/SEO';
import DocumentsSection from '../components/sections/DocumentsSection';
import CTASection from '../components/sections/CTASection';
import { siteData } from '../data/site';

export default function ServicesPage() {
  const { onOpenAssessment } = useOutletContext();

  const serviceIcons = {
    'study-visa-assistance': GraduationCap,
    'tourist-visitor-visa': Plane,
    'sop-documentation': FileText,
    'refusal-reapplication': AlertTriangle,
    'inside-canada-applications': Building2,
    'offer-letter-assistance': MailCheck,
  };

  return (
    <>
      <SEO
        title="Our Services - Study Visa & Immigration Solutions"
        description="Explore BMS Immigration services including study visa assistance, tourist & visitor visas, SOP & documentation support, refusal case handling, inside Canada applications, and offer letter assistance."
        canonicalUrl="/services"
      />

      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 inline-block mb-4">
            Comprehensive Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-display leading-tight mb-4">
            Expert Services for Your <br />
            <span className="text-gold-gradient">Study Abroad Journey</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Explore BMS Immigration services including study visa assistance, tourist & visitor visas, SOP & documentation support, refusal case handling, inside Canada applications, and offer letter assistance.
          </p>

          <div className="pt-6 flex justify-center">
            <button
              onClick={onOpenAssessment}
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-navy-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-gold-glow transition"
            >
              Get Free Assessment for Any Service
            </button>
          </div>
        </div>
      </section>

      {/* Services Detail Rows (Mirroring services.html) */}
      <div className="divide-y divide-slate-800/80 bg-navy-950">
        {siteData.services.map((srv, index) => {
          const IconComp = serviceIcons[srv.slug] || GraduationCap;
          const isReversed = index % 2 === 1;

          return (
            <section
              key={srv.id}
              id={srv.slug}
              className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Image Column (5 cols) */}
                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : ''}`}>
                  <div className="relative rounded-3xl overflow-hidden border border-gold-500/30 shadow-card-elevated group">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

                    {/* Metric pill */}
                    <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-navy-950/90 border border-gold-500/40 backdrop-blur-md flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-gold-400 block">{srv.metric.value}</span>
                        <span className="text-xs text-slate-300">{srv.metric.label}</span>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Column (7 cols) */}
                <div className={`lg:col-span-7 space-y-6 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gold-400 text-xs uppercase tracking-widest font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Service {index + 1} of 6</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
                      {srv.title}
                    </h2>
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                    {srv.description}
                  </p>

                  {/* Sub-features list */}
                  <div className="space-y-3 pt-2">
                    {srv.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="p-3.5 rounded-xl bg-navy-900/60 border border-gold-500/15 flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                            {feat.title}
                          </h3>
                          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed font-sans">
                            {feat.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <button
                      onClick={onOpenAssessment}
                      className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-gold-glow transition"
                    >
                      Apply for {srv.title}
                    </button>

                    <Link
                      to={`/services/${srv.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-gold-400 transition"
                    >
                      <span>View Full Service Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Documents Required Section */}
      <DocumentsSection />

      {/* CTA Section */}
      <CTASection onOpenAssessment={onOpenAssessment} />
    </>
  );
}
