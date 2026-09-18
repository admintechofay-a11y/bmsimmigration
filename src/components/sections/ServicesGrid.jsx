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
  ArrowRight
} from 'lucide-react';
import TiltCard from '../common/TiltCard';
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
    <section className="py-20 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display">
            Our Premium <br className="hidden sm:inline" />
            <span className="text-gold-gradient">Immigration Services</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
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
                className="group rounded-2xl bg-gradient-to-b from-navy-900/90 to-navy-950 border border-gold-500/20 hover:border-gold-500/50 flex flex-col justify-between shadow-card-elevated"
              >
                {/* Image Header with Badge */}
                <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

                  {/* Icon badge floating on image */}
                  <div className="absolute bottom-3 left-4 w-12 h-12 rounded-xl bg-navy-900/90 border border-gold-500/40 backdrop-blur-md flex items-center justify-center text-gold-400 shadow-md group-hover:scale-110 transition">
                    <IconComp className="w-6 h-6" />
                  </div>

                  {/* Right Tag */}
                  {srv.badge && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gold-500/90 text-navy-950 text-[10px] uppercase tracking-wider font-extrabold shadow-sm">
                      {srv.badge}
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors font-display">
                      {srv.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      {srv.summary}
                    </p>

                    {/* Features Checklist */}
                    <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
                      {srv.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                          <span className="font-medium text-slate-200">{feat.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Link & Metric */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Metric</span>
                      <span className="text-xs font-bold text-gold-400">{srv.metric.value}</span>
                    </div>

                    <Link
                      to={`/services/${srv.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-200 bg-navy-800 hover:bg-gold-500 hover:text-navy-950 transition-all shadow-sm group-hover:shadow-gold-glow"
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
