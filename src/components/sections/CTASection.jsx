import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, PhoneCall, MessageCircle, ArrowRight } from 'lucide-react';
import { siteData } from '../../data/site';

export default function CTASection({ onOpenAssessment }) {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background glow & gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-96 bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-b from-navy-900/95 to-navy-950 border border-gold-500/30 p-8 sm:p-14 text-center shadow-card-elevated relative overflow-hidden">
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-gold-500/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-electric-500/20 to-transparent pointer-events-none" />

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Free Consultation</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-display mb-4 max-w-2xl mx-auto leading-tight">
            Ready to Start Your <br />
            <span className="text-gold-gradient">Global Journey?</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-sans">
            Connect with our expert immigration consultants and take the first step towards your international education and career goals with confidence.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenAssessment}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-navy-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-gold-glow transition hover:scale-105 active:scale-95"
            >
              <span>Schedule Free Counseling</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/services"
              className="flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm text-slate-200 bg-navy-800/80 hover:bg-navy-700/80 border border-slate-700 hover:border-gold-500/40 transition hover:text-white"
            >
              <span>Explore Our Services →</span>
            </Link>

            <a
              href={siteData.company.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm text-emerald-400 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/40 transition hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Instant WhatsApp</span>
            </a>
          </div>

          {/* Call Us directly */}
          <div className="mt-8 pt-8 border-t border-slate-800/80 flex items-center justify-center gap-2 text-xs text-slate-400">
            <PhoneCall className="w-3.5 h-3.5 text-gold-400" />
            <span>Call Us Directly:</span>
            <a href="tel:+917206658047" className="font-bold text-white hover:text-gold-400 transition">
              +91 72066 58047
            </a>
            <span>•</span>
            <a href="tel:+919729929704" className="font-bold text-white hover:text-gold-400 transition">
              +91 97299 29704
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
