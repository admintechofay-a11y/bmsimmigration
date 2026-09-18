import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, ArrowRight, Clock, Briefcase, ChevronRight } from 'lucide-react';
import TiltCard from '../common/TiltCard';
import { siteData } from '../../data/site';

export default function CountriesSection() {
  return (
    <section className="py-20 bg-navy-950 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 inline-block">
              Countries We Serve
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display">
              Global Immigration & <br />
              <span className="text-gold-gradient">Education Destinations</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Trusted immigration solutions and international education guidance for students, professionals, and families worldwide.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 rounded-xl bg-navy-900 border border-gold-500/30 text-gold-300 text-xs font-bold shadow-sm">
              +15 More Countries Available
            </span>
            <Link
              to="/countries"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-gold-400 transition"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteData.countries.slice(0, 4).map((country) => (
            <TiltCard
              key={country.id}
              className="group rounded-2xl bg-gradient-to-b from-navy-900/95 to-navy-950 border border-slate-800 hover:border-gold-500/40 overflow-hidden shadow-card-elevated flex flex-col justify-between"
            >
              {/* Image banner */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={country.image}
                  alt={country.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

                {/* Country Flag & Moniker */}
                <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-950/80 border border-gold-500/30 backdrop-blur-md">
                  <span className="text-base">{country.flag}</span>
                  <span className="text-xs font-bold text-white">{country.name}</span>
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-gold-400 block">
                    {country.badge}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {country.tagline}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-[11px] text-slate-400">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gold-400" />
                        Processing:
                      </span>
                      <span className="text-slate-200 font-semibold">{country.quickFacts.processingTime}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3 text-electric-400" />
                        Post-Study Work:
                      </span>
                      <span className="text-slate-200 font-semibold">{country.quickFacts.workPermit}</span>
                    </div>
                  </div>
                </div>

                {/* Deep link button */}
                <Link
                  to={`/countries/${country.slug}`}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-navy-800/80 group-hover:bg-gold-500 text-slate-200 group-hover:text-navy-950 transition-all text-xs font-bold"
                >
                  <span>Explore {country.name}</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
