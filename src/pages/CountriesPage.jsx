import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Globe, ArrowRight, Clock, Briefcase, DollarSign, Calendar, ChevronRight } from 'lucide-react';
import SEO from '../components/common/SEO';
import TiltCard from '../components/common/TiltCard';
import CTASection from '../components/sections/CTASection';
import { siteData } from '../data/site';

export default function CountriesPage() {
  const { onOpenAssessment } = useOutletContext();

  return (
    <>
      <SEO
        title="Global Destinations - Study & Immigration Countries"
        description="Explore top international education and immigration destinations: Canada, United Kingdom, USA, Australia, and Germany with BMS Immigration."
        canonicalUrl="/countries"
      />

      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 inline-block mb-4">
            Global Destinations
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-display mb-4">
            Where Do You Want To <br />
            <span className="text-gold-gradient">Build Your Future?</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We provide strategic guidance and complete visa assistance for Canada, the United Kingdom, United States, Australia, Germany, and over 15 other global destinations.
          </p>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.countries.map((country) => (
              <TiltCard
                key={country.id}
                className="group rounded-2xl bg-gradient-to-b from-navy-900/90 to-navy-950 border border-gold-500/20 hover:border-gold-500/50 shadow-card-elevated flex flex-col justify-between"
              >
                {/* Image Header */}
                <div className="relative h-52 w-full overflow-hidden rounded-t-2xl">
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-950/90 border border-gold-500/30 backdrop-blur-md">
                    <span className="text-xl">{country.flag}</span>
                    <span className="text-sm font-bold text-white">{country.name}</span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-gold-400 block">
                      {country.badge}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white font-display mb-1">
                      {country.tagline}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {country.description}
                    </p>

                    {/* Quick Facts */}
                    <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <Clock className="w-3.5 h-3.5 text-gold-400" />
                          Processing:
                        </span>
                        <span className="font-semibold text-white">{country.quickFacts.processingTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <Briefcase className="w-3.5 h-3.5 text-electric-400" />
                          Post-Study Work:
                        </span>
                        <span className="font-semibold text-white">{country.quickFacts.workPermit}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                          Average Tuition:
                        </span>
                        <span className="font-semibold text-white">{country.quickFacts.avgTuition}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <button
                      onClick={onOpenAssessment}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-navy-950 bg-gold-400 hover:bg-gold-300 transition"
                    >
                      Assess Profile
                    </button>

                    <Link
                      to={`/countries/${country.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-gold-400 transition"
                    >
                      <span>Explore Country</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection onOpenAssessment={onOpenAssessment} />
    </>
  );
}
