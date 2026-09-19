import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { siteData } from '../../data/site';

export default function LeadershipSection() {
  return (
    <section className="py-20 bg-page relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold-700 font-bold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 shadow-soft-sm">
            Leadership Team
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 font-display">
            Meet Our <span className="text-gold-gradient">Leadership</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-500 leading-relaxed font-sans">
            Experienced professionals dedicated to helping students and families achieve their global education and immigration goals.
          </p>
        </div>

        {/* Leadership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {siteData.leadership.map((leader) => (
            <div
              key={leader.name}
              className="rounded-2xl bg-white border border-border-light p-7 shadow-soft-md hover:shadow-soft-elevated hover:border-gold-500/40 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  {/* Monogram Avatar */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-gold-600 to-gold-400 text-white text-2xl font-black flex items-center justify-center shadow-soft-sm flex-shrink-0">
                    {leader.name.charAt(0)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gold-600 uppercase tracking-wider block">
                      {leader.role}
                    </span>
                    <h3 className="text-2xl font-bold text-ink-900 font-display">
                      {leader.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-ink-500 leading-relaxed font-sans mb-6">
                  {leader.bio}
                </p>
              </div>

              {/* Direct Reach channels */}
              <div className="pt-5 border-t border-border-subtle space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-ink-700">
                  <Phone className="w-4 h-4 text-gold-600 flex-shrink-0" />
                  <div className="flex flex-wrap gap-2">
                    {leader.phones ? (
                      leader.phones.map((p, pIdx) => (
                        <a
                          key={pIdx}
                          href={`tel:${p.replace(/\s+/g, '')}`}
                          className="hover:text-gold-600 font-semibold transition"
                        >
                          {p}
                        </a>
                      ))
                    ) : (
                      <a
                        href={`tel:${leader.tel || leader.phone.replace(/\s+/g, '')}`}
                        className="hover:text-gold-600 font-semibold transition"
                      >
                        {leader.phone}
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2 text-ink-700">
                  <Mail className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    {leader.emails.map((em, eIdx) => (
                      <a
                        key={eIdx}
                        href={`mailto:${em}`}
                        className="hover:text-gold-600 block transition break-all"
                      >
                        {em}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
