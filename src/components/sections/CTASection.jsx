import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, PhoneCall, MessageCircle, ArrowRight } from 'lucide-react';
import { siteData } from '../../data/site';

export default function CTASection({ onOpenAssessment }) {
  return (
    <section className="py-20 relative overflow-hidden bg-page">
      {/* Subtle aurora background tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-page via-tint/40 to-page pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-80 bg-gold-200/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-white border border-border-light p-8 sm:p-14 text-center shadow-card-elevated relative overflow-hidden">
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-gold-100 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl from-electric-100 to-transparent pointer-events-none" />

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-50 border border-gold-200 text-gold-700 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Free Consultation</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl font-bold text-ink-900 font-display mb-4 max-w-2xl mx-auto leading-tight">
            Ready to Start Your <br />
            <span className="text-gold-gradient">Global Journey?</span>
          </h2>

          <p className="text-sm sm:text-base text-ink-600 max-w-2xl mx-auto mb-8 leading-relaxed font-sans">
            Connect with our expert immigration consultants and take the first step towards your international education and career goals with confidence.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenAssessment}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white bg-ink-900 hover:bg-ink-800 shadow-soft-md transition hover:scale-105 active:scale-95"
            >
              <span>Schedule Free Counseling</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </button>

            <Link
              to="/services"
              className="flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-sm text-ink-900 bg-gold-500 hover:bg-gold-400 shadow-soft-sm transition hover:scale-105"
            >
              <span>Explore Our Services →</span>
            </Link>

            <a
              href={siteData.company.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-soft-sm transition hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Instant WhatsApp</span>
            </a>
          </div>

          {/* Call Us directly */}
          <div className="mt-8 pt-8 border-t border-border-light flex items-center justify-center gap-2 text-xs text-ink-600">
            <PhoneCall className="w-3.5 h-3.5 text-gold-600" />
            <span className="font-medium">Call Us Directly:</span>
            <a href="tel:+917206658047" className="font-bold text-ink-900 hover:text-gold-600 transition">
              +91 72066 58047
            </a>
            <span>•</span>
            <a href="tel:+919729929704" className="font-bold text-ink-900 hover:text-gold-600 transition">
              +91 97299 29704
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
