import React from 'react';
import { useParams, Link, useOutletContext, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Briefcase,
  Calendar,
  DollarSign,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import SEO from '../components/common/SEO';
import CTASection from '../components/sections/CTASection';
import DocumentsSection from '../components/sections/DocumentsSection';
import { siteData } from '../data/site';

export default function CountryDetailPage() {
  const { slug } = useParams();
  const { onOpenAssessment } = useOutletContext();

  const country = siteData.countries.find((c) => c.slug === slug);

  if (!country) {
    return <Navigate to="/countries" replace />;
  }

  return (
    <>
      <SEO
        title={`Study & Immigrate to ${country.name} - Visa Guidance`}
        description={country.description}
        canonicalUrl={`/countries/${country.slug}`}
      />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/countries"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gold-400 hover:text-gold-300 mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Destinations</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold">
                <span className="text-base">{country.flag}</span>
                <span>{country.badge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-display leading-tight">
                Study & Immigrate to <br />
                <span className="text-gold-gradient">{country.name}</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
                {country.description}
              </p>

              {/* Quick Fact Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-navy-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block uppercase">Processing</span>
                  <span className="text-xs font-bold text-white mt-0.5 block">{country.quickFacts.processingTime}</span>
                </div>
                <div className="p-3 rounded-xl bg-navy-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block uppercase">Post-Grad Work</span>
                  <span className="text-xs font-bold text-gold-400 mt-0.5 block">{country.quickFacts.workPermit}</span>
                </div>
                <div className="p-3 rounded-xl bg-navy-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block uppercase">Major Intakes</span>
                  <span className="text-xs font-bold text-white mt-0.5 block">{country.quickFacts.intakes}</span>
                </div>
                <div className="p-3 rounded-xl bg-navy-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block uppercase">Avg Tuition</span>
                  <span className="text-xs font-bold text-emerald-400 mt-0.5 block">{country.quickFacts.avgTuition}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenAssessment}
                  className="px-7 py-4 rounded-xl font-bold text-sm text-navy-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-gold-glow transition"
                >
                  Check Eligibility for {country.name}
                </button>

                <a
                  href={`https://wa.me/919729929704?text=${encodeURIComponent(`Hi BMS Immigration, I want guidance for applying to ${country.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-xl font-semibold text-sm text-emerald-400 bg-navy-900 border border-emerald-500/40 hover:bg-navy-800 transition"
                >
                  Inquire on WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-gold-500/30 shadow-card-elevated">
                <img
                  src={country.image}
                  alt={country.name}
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-navy-950/90 border border-gold-500/40 backdrop-blur-md">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-gold-400 block mb-1">
                    Top Tier Destination
                  </span>
                  <p className="text-xs text-slate-300">
                    High visa approval rates & end-to-end guidance with BMS Immigration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights & Top Universities */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Key Advantages of <span className="text-gold-gradient">{country.name}</span>
              </h2>

              <div className="space-y-3">
                {country.highlights.map((hl, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-navy-900/70 border border-gold-500/15 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300 font-sans leading-relaxed">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Universities */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl bg-gradient-to-b from-navy-900 to-navy-950 border border-gold-500/30 p-6 shadow-card-elevated">
                <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider mb-4">
                  <GraduationCap className="w-4 h-4" />
                  <span>Popular Institutions</span>
                </div>
                <h3 className="text-lg font-bold text-white font-display mb-4">
                  Top Universities in {country.name}
                </h3>

                <ul className="space-y-3">
                  {country.popularInstitutions.map((uni, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-gold-400" />
                      <span>{uni}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-slate-800">
                  <button
                    onClick={onOpenAssessment}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-gold-glow transition"
                  >
                    Shortlist Universities in {country.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      <DocumentsSection />

      {/* CTA */}
      <CTASection onOpenAssessment={onOpenAssessment} />
    </>
  );
}
