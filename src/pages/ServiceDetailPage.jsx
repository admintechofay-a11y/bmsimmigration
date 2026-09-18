import React from 'react';
import { useParams, Link, useOutletContext, Navigate } from 'react-router-dom';
import {
  GraduationCap,
  Plane,
  FileText,
  AlertTriangle,
  Building2,
  MailCheck,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';
import SEO from '../components/common/SEO';
import CTASection from '../components/sections/CTASection';
import DocumentsSection from '../components/sections/DocumentsSection';
import { siteData } from '../data/site';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const { onOpenAssessment } = useOutletContext();

  const service = siteData.services.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const serviceIcons = {
    'study-visa-assistance': GraduationCap,
    'tourist-visitor-visa': Plane,
    'sop-documentation': FileText,
    'refusal-reapplication': AlertTriangle,
    'inside-canada-applications': Building2,
    'offer-letter-assistance': MailCheck,
  };

  const IconComp = serviceIcons[service.slug] || GraduationCap;

  return (
    <>
      <SEO
        title={`${service.title} - BMS Immigration Solutions`}
        description={service.summary}
        canonicalUrl={`/services/${service.slug}`}
      />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gold-400 hover:text-gold-300 mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold">
                <IconComp className="w-3.5 h-3.5" />
                <span>{service.badge || 'Immigration Service'}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-display leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
                {service.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onOpenAssessment}
                  className="px-7 py-4 rounded-xl font-bold text-sm text-navy-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-gold-glow transition"
                >
                  Book Free Case Assessment
                </button>

                <a
                  href={`https://wa.me/919729929704?text=${encodeURIComponent(`Hi BMS Immigration, I am interested in ${service.title}. Please guide me.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-xl font-semibold text-sm text-emerald-400 bg-navy-900 border border-emerald-500/40 hover:bg-navy-800 transition"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-gold-500/30 shadow-card-elevated">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-navy-950/90 border border-gold-500/40 backdrop-blur-md flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block uppercase tracking-wider">Performance</span>
                    <span className="text-xl font-black text-gold-400">{service.metric.value}</span>
                    <span className="text-[11px] text-slate-300 block">{service.metric.label}</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breakdown & Deliverables */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Features (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Strategic Scope of <span className="text-gold-gradient">{service.title}</span>
              </h2>

              <div className="space-y-4">
                {service.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-navy-900/70 border border-gold-500/20 space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold-400" />
                      <h3 className="text-base font-bold text-white">{feat.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables Checklist (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl bg-gradient-to-b from-navy-900 to-navy-950 border border-gold-500/30 p-6 shadow-card-elevated">
                <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider mb-4">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Deliverables Checklist</span>
                </div>
                <h3 className="text-lg font-bold text-white font-display mb-4">
                  What You Receive With BMS
                </h3>

                <ul className="space-y-3">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-slate-800">
                  <button
                    onClick={onOpenAssessment}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-gold-glow transition"
                  >
                    Start {service.title} Application
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
