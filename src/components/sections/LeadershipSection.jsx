import React from 'react';
import { Phone, Mail, MessageCircle, ShieldCheck } from 'lucide-react';
import { siteData } from '../../data/site';

export default function LeadershipSection() {
  return (
    <section className="py-20 bg-navy-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
            Leadership Team
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display">
            Meet Our <span className="text-gold-gradient">Leadership</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            Experienced professionals dedicated to helping students and families achieve their global education and immigration goals.
          </p>
        </div>

        {/* Leadership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {siteData.leadership.map((leader, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-gradient-to-b from-navy-900/90 to-navy-950 border border-gold-500/25 p-7 shadow-card-elevated hover:border-gold-500/50 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  {/* Monogram Avatar */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-gold-600 to-gold-400 text-navy-950 text-2xl font-black flex items-center justify-center shadow-gold-glow flex-shrink-0">
                    {leader.name.charAt(0)}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider block">
                      {leader.role}
                    </span>
                    <h3 className="text-2xl font-bold text-white font-display">
                      {leader.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-6">
                  {leader.bio}
                </p>
              </div>

              {/* Direct Reach channels */}
              <div className="pt-5 border-t border-slate-800/80 space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <div className="flex flex-wrap gap-2">
                    {leader.phones ? (
                      leader.phones.map((p, pIdx) => (
                        <a
                          key={pIdx}
                          href={`tel:${p.replace(/\s+/g, '')}`}
                          className="hover:text-gold-400 font-semibold transition"
                        >
                          {p}
                        </a>
                      ))
                    ) : (
                      <a
                        href={`tel:${leader.tel || leader.phone.replace(/\s+/g, '')}`}
                        className="hover:text-gold-400 font-semibold transition"
                      >
                        {leader.phone}
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2 text-slate-300">
                  <Mail className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    {leader.emails.map((em, eIdx) => (
                      <a
                        key={eIdx}
                        href={`mailto:${em}`}
                        className="hover:text-gold-400 block transition break-all"
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
