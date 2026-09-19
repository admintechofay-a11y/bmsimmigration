import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Award, Eye, UserCheck, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import SEO from '../components/common/SEO';
import StatCounter from '../components/common/StatCounter';
import ResponsivePicture from '../components/common/ResponsivePicture';
import LeadershipSection from '../components/sections/LeadershipSection';
import CTASection from '../components/sections/CTASection';
import { siteData } from '../data/site';

export default function AboutPage() {
  const { onOpenAssessment } = useOutletContext();

  const valueIcons = {
    Transparency: Eye,
    'Professional Excellence': Award,
    'Client-Focused Approach': UserCheck,
    'Fast & Reliable Support': Zap,
  };

  return (
    <>
      <SEO
        title="About Us - Trusted Immigration & Visa Consultancy"
        description="Learn about BMS Immigration Services, founded in 2019. Trusted guidance for Study Visas, PR Pathways, Tourist Visas, and Inside Canada applications."
        canonicalUrl="/about"
      />

      {/* Page Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-page via-tint/40 to-page relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-bold px-3 py-1 rounded-full bg-gold-50 border border-gold-200 inline-block">
              {siteData.company.establishedBadge}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-900 font-display leading-tight">
              Building Global Futures Through <br />
              <span className="text-gold-gradient">Strategic Guidance</span>
            </h1>
            <p className="text-base sm:text-lg text-ink-600 leading-relaxed font-sans">
              {siteData.company.aboutExcerpt}
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-border-light">
            {siteData.stats.slice(0, 4).map((stat) => (
              <div key={stat.id} className="p-4 rounded-xl bg-white border border-border-light shadow-soft-sm">
                <span className="text-3xl font-black text-ink-900 block">
                  <StatCounter endValue={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-xs font-semibold text-ink-600 uppercase tracking-wider block mt-1">
                  {stat.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story & Visual Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-border-light shadow-card-elevated">
                <ResponsivePicture
                  src={siteData.company.aboutHeroImg}
                  alt="About BMS Immigration"
                  width={580}
                  height={480}
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 border border-border-light shadow-soft-md backdrop-blur-md">
                  <div className="flex items-center gap-2 text-ink-900 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Ethics, Accuracy & Reliability</span>
                  </div>
                  <p className="text-xs text-ink-600 mt-1">
                    Serving international aspirants across India, Canada, the UK, USA, Australia & Europe.
                  </p>
                </div>
              </div>
            </div>

            {/* Story Text */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest text-gold-700 font-bold">
                About BMS Immigration Services
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-ink-900 font-display">
                Trusted Immigration Guidance <br />
                <span className="text-gold-gradient">For Your Global Journey</span>
              </h2>

              <p className="text-sm text-ink-600 leading-relaxed font-sans">
                BMS Immigration Services is committed to helping students, professionals, families, and individuals achieve their international dreams through expert immigration and visa solutions. We specialize in study visas, PR pathways, tourist visas, refusal cases, and inside Canada services with complete transparency and professional guidance.
              </p>

              <p className="text-sm text-ink-600 leading-relaxed font-sans">
                Our experienced team provides strategic support, strong documentation, personalized consultation, and step-by-step assistance to ensure a smooth and successful immigration process for every client.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ink-900 text-sm block">Personalized Immigration Strategy</strong>
                    <span className="text-xs text-ink-600">Every profile is carefully evaluated to provide the best possible immigration and visa pathway.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ink-900 text-sm block">Strong Documentation Support</strong>
                    <span className="text-xs text-ink-600">We prepare accurate and professional documentation to maximize approval chances and reduce application errors.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ink-900 text-sm block">Transparent & Ethical Process</strong>
                    <span className="text-xs text-ink-600">Honest guidance, transparent communication, and client-focused support throughout your journey.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-tint/60 border-y border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-bold px-3 py-1 rounded-full bg-gold-50 border border-gold-200">
              Our Core Values
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 font-display">
              The Values That Drive <br />
              <span className="text-gold-gradient">BMS Immigration</span>
            </h2>
            <p className="text-sm sm:text-base text-ink-600 font-sans">
              We believe in transparency, commitment, and professional guidance to help every client achieve their global immigration goals with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteData.coreValues.map((val) => {
              const Icon = valueIcons[val.title] || Award;
              return (
                <div
                  key={val.title}
                  className="rounded-2xl p-6 bg-white border border-border-light shadow-soft-sm hover:shadow-soft-md transition duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-600 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-ink-900 font-display mb-2">{val.title}</h3>
                  <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-sans">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <LeadershipSection />

      {/* CTA Section */}
      <CTASection onOpenAssessment={onOpenAssessment} />
    </>
  );
}
