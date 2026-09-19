import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Plane,
  FileText,
  AlertTriangle,
  Building2,
  MailCheck,
  Check,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import TiltCard from '../common/TiltCard';
import ResponsivePicture from '../common/ResponsivePicture';
import { siteData } from '../../data/site';

export default function ServicesGrid({ showAll = true, limit = 6 }) {
  const serviceIcons = {
    'study-visa-assistance': GraduationCap,
    'tourist-visitor-visa': Plane,
    'sop-documentation': FileText,
    'refusal-reapplication': AlertTriangle,
    'inside-canada-applications': Building2,
    'offer-letter-assistance': MailCheck,
  };

  const displayedServices = showAll ? siteData.services : siteData.services.slice(0, limit);

  return (
    <section className="py-20 bg-tint/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold-700 font-bold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 shadow-soft-sm">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 font-display">
            Our Premium <br className="hidden sm:inline" />
            <span className="text-gold-gradient">Immigration Services</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-500 leading-relaxed font-sans">
            Complete visa guidance, documentation support, and professional immigration solutions tailored for students, professionals, and families worldwide.
          </p>
        </div>

        {/* 6 Services Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((srv) => {
            const IconComp = serviceIcons[srv.slug] || GraduationCap;
            return (
              <TiltCard
                key={srv.id}
                className="group rounded-2xl bg-white/90 border border-border-light hover:border-gold-500/40 flex flex-col justify-between shadow-soft-md hover:shadow-soft-elevated transition-all"
              >
                {/* Image Header with Badge */}
                <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                  <ResponsivePicture
                    src={srv.image}
                    alt={srv.title}
                    width={400}
                    height={192}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Icon badge floating on image */}
                  <div className="absolute bottom-3 left-4 w-12 h-12 rounded-xl bg-white/95 border border-border-light backdrop-blur-md flex items-center justify-center text-gold-600 shadow-soft-sm group-hover:scale-110 transition">
                    <IconComp className="w-6 h-6" />
                  </div>

                  {/* Right Tags */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <div className="px-2 py-0.5 rounded-full bg-white/95 border border-teal-500/30 text-teal-600 text-[9px] uppercase tracking-wider font-bold shadow-soft-sm backdrop-blur-sm flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-teal-500" />
                      <span>3D</span>
                    </div>
                    {srv.badge && (
                      <div className="px-2.5 py-1 rounded-full bg-gold-500 text-white text-[10px] uppercase tracking-wider font-extrabold shadow-soft-sm">
                        {srv.badge}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-ink-900 group-hover:text-gold-600 transition-colors font-display">
                      {srv.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-ink-500 mt-2 leading-relaxed">
                      {srv.summary}
                    </p>

                    {/* Features Checklist */}
                    <div className="mt-4 pt-4 border-t border-border-subtle space-y-2">
                      {srv.features.map((feat) => (
                        <div key={feat.title} className="flex items-start gap-2 text-xs text-ink-700">
                          <Check className="w-3.5 h-3.5 text-gold-600 flex-shrink-0 mt-0.5" />
                          <span className="font-medium">{feat.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Link & Metric */}
                  <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-ink-400 block font-semibold">Metric</span>
                      <span className="text-xs font-bold text-gold-600">{srv.metric.value}</span>
                    </div>

                    <Link
                      to={`/services/${srv.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-ink-800 bg-tint hover:bg-ink-900 hover:text-white border border-border-light transition-all shadow-soft-sm"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* View All Button if truncated */}
        {!showAll && (
          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-navy-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-gold-glow transition"
            >
              <span>View All Services Overview</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
