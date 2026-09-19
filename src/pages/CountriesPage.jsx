import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Globe, ArrowRight, Clock, Briefcase, DollarSign, Calendar, ChevronRight } from 'lucide-react';
import SEO from '../components/common/SEO';
import TiltCard from '../components/common/TiltCard';
import ResponsivePicture from '../components/common/ResponsivePicture';
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
      <section className="py-16 sm:py-24 bg-gradient-to-b from-page via-tint/40 to-page text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest text-gold-700 font-bold px-3 py-1 rounded-full bg-gold-50 border border-gold-200 inline-block mb-4">
            Global Destinations
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-900 font-display mb-4">
            Where Do You Want To <br />
            <span className="text-gold-gradient">Build Your Future?</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-600 max-w-2xl mx-auto leading-relaxed">
            We provide strategic guidance and complete visa assistance for Canada, the United Kingdom, United States, Australia, Germany, and over 15 other global destinations.
          </p>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-20 bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.countries.map((country) => (
              <TiltCard
                key={country.id}
                className="group rounded-2xl bg-white border border-border-light hover:border-gold-300 shadow-soft-sm hover:shadow-soft-md flex flex-col justify-between transition-all"
              >
                {/* Image Header */}
                <div className="relative h-52 w-full overflow-hidden rounded-t-2xl">
                  <ResponsivePicture
                    src={country.image}
                    alt={country.name}
                    width={380}
                    height={208}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 border border-border-light shadow-soft-sm backdrop-blur-md">
                    <span className="text-xl">{country.flag}</span>
                    <span className="text-sm font-bold text-ink-900">{country.name}</span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-gold-300 block drop-shadow-sm">
                      {country.badge}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-ink-900 font-display mb-1">
                      {country.tagline}
                    </h3>
                    <p className="text-xs text-ink-600 leading-relaxed line-clamp-3">
                      {country.description}
                    </p>

                    {/* Quick Facts */}
                    <div className="mt-4 pt-4 border-t border-border-light space-y-2 text-xs text-ink-600">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-ink-500">
                          <Clock className="w-3.5 h-3.5 text-gold-600" />
                          Processing:
                        </span>
                        <span className="font-semibold text-ink-900">{country.quickFacts.processingTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-ink-500">
                          <Briefcase className="w-3.5 h-3.5 text-electric-600" />
                          Post-Study Work:
                        </span>
                        <span className="font-semibold text-ink-900">{country.quickFacts.workPermit}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-ink-500">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                          Average Tuition:
                        </span>
                        <span className="font-semibold text-ink-900">{country.quickFacts.avgTuition}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-border-light flex items-center justify-between gap-3">
                    <button
                      onClick={onOpenAssessment}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-ink-900 hover:bg-ink-800 shadow-soft-sm transition"
                    >
                      Assess Profile
                    </button>

                    <Link
                      to={`/countries/${country.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-ink-700 hover:text-gold-700 transition"
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
