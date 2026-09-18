import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, PhoneCall, ArrowRight } from 'lucide-react';
import SEO from '../components/common/SEO';

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="404 - Page Not Found"
        description="The immigration page you were searching for does not exist or has been moved."
      />

      <section className="min-h-[75vh] flex items-center justify-center py-20 bg-navy-950 text-center px-4 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-lg mx-auto relative z-10 space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mx-auto shadow-gold-glow">
            <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '10s' }} />
          </div>

          <div>
            <span className="text-6xl sm:text-7xl font-black text-gold-gradient font-display block">
              404
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-display mt-2">
              Destination Coordinates Not Found
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              The pathway or visa program you requested seems to have moved or does not exist. Let us guide you back to your destination.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-gold-glow transition"
            >
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </Link>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs text-slate-200 bg-navy-900 border border-slate-700 hover:text-white transition"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
