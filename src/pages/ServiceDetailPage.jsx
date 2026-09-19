import React, { useState } from 'react';
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
import ResponsivePicture from '../components/common/ResponsivePicture';
import CTASection from '../components/sections/CTASection';
import DocumentsSection from '../components/sections/DocumentsSection';
import Service3DViewer from '../components/3d/services/Service3DViewer';
import { useDeviceTier } from '../hooks/useDeviceTier';
import { siteData } from '../data/site';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const { onOpenAssessment } = useOutletContext();
  const { isTier0 } = useDeviceTier();
  const [activeView, setActiveView] = useState(() => (isTier0 ? 'photo' : '3d'));

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
      <section className="py-16 sm:py-20 bg-gradient-to-b from-page via-tint/40 to-page relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-bold text-gold-700 hover:text-gold-600 mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-50 border border-gold-200 text-gold-700 text-xs font-bold">
                <IconComp className="w-3.5 h-3.5" />
                <span>{service.badge || 'Immigration Service'}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-900 font-display leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-ink-600 leading-relaxed font-sans">
                {service.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onOpenAssessment}
                  className="px-7 py-4 rounded-xl font-bold text-sm text-white bg-ink-900 hover:bg-ink-800 shadow-soft-md transition"
                >
                  Book Free Case Assessment
                </button>

                <a
                  href={`https://wa.me/919729929704?text=${encodeURIComponent(`Hi BMS Immigration, I am interested in ${service.title}. Please guide me.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-xl font-semibold text-sm text-white bg-emerald-600 border border-emerald-500 hover:bg-emerald-500 shadow-soft-sm transition"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              {/* View Switcher Tabs */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setActiveView('3d')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeView === '3d'
                      ? 'bg-ink-900 text-white shadow-soft-sm'
                      : 'bg-white text-ink-700 hover:text-ink-900 border border-border-light'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                    <span>3D Interactive Model</span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveView('photo')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeView === 'photo'
                      ? 'bg-ink-900 text-white shadow-soft-sm'
                      : 'bg-white text-ink-700 hover:text-ink-900 border border-border-light'
                  }`}
                >
                  <span>Official Gallery</span>
                </button>
              </div>

              <div className="relative rounded-3xl overflow-hidden border border-border-light shadow-card-elevated min-h-[420px] bg-gradient-to-b from-tint/30 to-page flex flex-col items-center justify-center">
                {activeView === '3d' ? (
                  <div className="w-full h-[420px] relative">
                    <Service3DViewer
                      slug={service.slug}
                      fallback={
                        <ResponsivePicture
                          src={service.image}
                          alt={service.title}
                          width={500}
                          height={420}
                          priority={true}
                          className="w-full h-full object-cover"
                        />
                      }
                    />
                    <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-white/90 border border-border-light text-ink-700 text-[10px] uppercase font-bold tracking-wider backdrop-blur-sm pointer-events-none shadow-soft-sm">
                      Drag to orbit 360°
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-[420px] relative">
                    <ResponsivePicture
                      src={service.image}
                      alt={service.title}
                      width={500}
                      height={420}
                      priority={true}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/30 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Metric Pill */}
                <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-2xl bg-white/95 border border-border-light shadow-soft-md backdrop-blur-md flex items-center justify-between z-10">
                  <div>
                    <span className="text-[10px] text-ink-500 block uppercase tracking-wider font-semibold">Performance</span>
                    <span className="text-xl font-black text-gold-700">{service.metric.value}</span>
                    <span className="text-[11px] text-ink-600 block">{service.metric.label}</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-600">
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breakdown & Deliverables */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Features (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 font-display">
                Strategic Scope of <span className="text-gold-gradient">{service.title}</span>
              </h2>

              <div className="space-y-4">
                {service.features.map((feat) => (
                  <div
                    key={feat.title}
                    className="p-5 rounded-2xl bg-tint/40 border border-border-light space-y-1.5 shadow-soft-sm"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold-600" />
                      <h3 className="text-base font-bold text-ink-900">{feat.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-ink-600 leading-relaxed pl-6">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables Checklist (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl bg-white border border-border-light p-6 shadow-card-elevated">
                <div className="flex items-center gap-2 text-gold-700 text-xs font-bold uppercase tracking-wider mb-4">
                  <ShieldCheck className="w-4 h-4 text-gold-600" />
                  <span>Deliverables Checklist</span>
                </div>
                <h3 className="text-lg font-bold text-ink-900 font-display mb-4">
                  What You Receive With BMS
                </h3>

                <ul className="space-y-3">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-700">
                      <span className="w-5 h-5 rounded-full bg-gold-50 text-gold-700 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-border-light">
                  <button
                    onClick={onOpenAssessment}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-ink-900 hover:bg-ink-800 shadow-soft-sm transition"
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
