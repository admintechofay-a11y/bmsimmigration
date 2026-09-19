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
import ResponsivePicture from '../components/common/ResponsivePicture';
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
      <section className="py-16 sm:py-20 bg-gradient-to-b from-page via-tint/40 to-page relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/countries"
            className="inline-flex items-center gap-2 text-xs font-bold text-gold-700 hover:text-gold-600 mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Destinations</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-50 border border-gold-200 text-gold-700 text-xs font-bold">
                <span className="text-base">{country.flag}</span>
                <span>{country.badge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-900 font-display leading-tight">
                Study & Immigrate to <br />
                <span className="text-gold-gradient">{country.name}</span>
              </h1>

              <p className="text-base sm:text-lg text-ink-600 leading-relaxed font-sans">
                {country.description}
              </p>

              {/* Quick Fact Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white border border-border-light shadow-soft-sm">
                  <span className="text-[11px] text-ink-500 block uppercase font-medium">Processing</span>
                  <span className="text-xs font-bold text-ink-900 mt-0.5 block">{country.quickFacts.processingTime}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-border-light shadow-soft-sm">
                  <span className="text-[11px] text-ink-500 block uppercase font-medium">Post-Grad Work</span>
                  <span className="text-xs font-bold text-gold-700 mt-0.5 block">{country.quickFacts.workPermit}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-border-light shadow-soft-sm">
                  <span className="text-[11px] text-ink-500 block uppercase font-medium">Major Intakes</span>
                  <span className="text-xs font-bold text-ink-900 mt-0.5 block">{country.quickFacts.intakes}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-border-light shadow-soft-sm">
                  <span className="text-[11px] text-ink-500 block uppercase font-medium">Avg Tuition</span>
                  <span className="text-xs font-bold text-emerald-700 mt-0.5 block">{country.quickFacts.avgTuition}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenAssessment}
                  className="px-7 py-4 rounded-xl font-bold text-sm text-white bg-ink-900 hover:bg-ink-800 shadow-soft-md transition"
                >
                  Check Eligibility for {country.name}
                </button>

                <a
                  href={`https://wa.me/919729929704?text=${encodeURIComponent(`Hi BMS Immigration, I want guidance for applying to ${country.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-xl font-semibold text-sm text-white bg-emerald-600 border border-emerald-500 hover:bg-emerald-500 shadow-soft-sm transition"
                >
                  Inquire on WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-border-light shadow-card-elevated">
                <ResponsivePicture
                  src={country.image}
                  alt={country.name}
                  width={500}
                  height={420}
                  priority={true}
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 border border-border-light shadow-soft-md backdrop-blur-md">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-gold-700 block mb-1">
                    Top Tier Destination
                  </span>
                  <p className="text-xs text-ink-600">
                    High visa approval rates & end-to-end guidance with BMS Immigration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights & Top Universities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 font-display">
                Key Advantages of <span className="text-gold-gradient">{country.name}</span>
              </h2>

              <div className="space-y-3">
                {country.highlights.map((hl) => (
                  <div key={hl} className="p-4 rounded-xl bg-tint/50 border border-border-light flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-ink-700 font-sans leading-relaxed">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Universities */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl bg-white border border-border-light p-6 shadow-card-elevated">
                <div className="flex items-center gap-2 text-gold-700 text-xs font-bold uppercase tracking-wider mb-4">
                  <GraduationCap className="w-4 h-4 text-gold-600" />
                  <span>Popular Institutions</span>
                </div>
                <h3 className="text-lg font-bold text-ink-900 font-display mb-4">
                  Top Universities in {country.name}
                </h3>

                <ul className="space-y-3">
                  {country.popularInstitutions.map((uni) => (
                    <li key={uni} className="flex items-center gap-2.5 text-xs sm:text-sm text-ink-700">
                      <span className="w-2 h-2 rounded-full bg-gold-500" />
                      <span>{uni}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-border-light">
                  <button
                    onClick={onOpenAssessment}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-ink-900 hover:bg-ink-800 shadow-soft-sm transition"
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
