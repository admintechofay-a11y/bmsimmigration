import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  PhoneCall,
  GraduationCap,
  Plane,
  FileText,
  AlertTriangle,
  Building2,
  MailCheck,
  Sparkles
} from 'lucide-react';
import { siteData } from '../../data/site';

export default function Navbar({ onOpenAssessment }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setServicesMenuOpen(false);
  }, [location.pathname]);

  const serviceIcons = {
    'study-visa-assistance': GraduationCap,
    'tourist-visitor-visa': Plane,
    'sop-documentation': FileText,
    'refusal-reapplication': AlertTriangle,
    'inside-canada-applications': Building2,
    'offer-letter-assistance': MailCheck,
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/92 backdrop-blur-xl border-b border-border-light py-2.5 shadow-soft-md'
          : 'bg-white/85 backdrop-blur-md py-3.5 border-b border-border-subtle'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Moniker */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative h-11 w-auto sm:h-12 overflow-hidden flex items-center">
              <img
                src={siteData.company.logo}
                alt="BMS Immigration Logo"
                width="140"
                height="48"
                decoding="sync"
                // @ts-ignore
                fetchpriority="high"
                className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-base tracking-tight text-ink-900 group-hover:text-gold-600 transition-colors font-display">
                BMS IMMIGRATION
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gold-600 font-semibold -mt-0.5">
                SERVICES
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {siteData.navLinks.map((link) => {
              if (link.hasMegaMenu) {
                return (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={() => setServicesMenuOpen(true)}
                    onMouseLeave={() => setServicesMenuOpen(false)}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        location.pathname.startsWith('/services')
                          ? 'text-gold-600 bg-gold-500/10 font-bold'
                          : 'text-ink-500 hover:text-ink-900 hover:bg-tint/60'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          servicesMenuOpen ? 'rotate-180 text-gold-600' : 'text-ink-400'
                        }`}
                      />
                    </Link>

                    {/* Mega-Menu Dropdown */}
                    {servicesMenuOpen && (
                      <div className="absolute top-full -left-20 w-[640px] pt-3 z-50">
                        <div className="bg-white/98 rounded-2xl p-5 border border-border-light shadow-soft-elevated grid grid-cols-2 gap-3 animate-fade-in backdrop-blur-2xl">
                          {siteData.services.map((srv) => {
                            const IconComponent = serviceIcons[srv.slug] || Sparkles;
                            return (
                              <Link
                                key={srv.slug}
                                to={`/services/${srv.slug}`}
                                className="group p-3 rounded-xl hover:bg-tint/70 border border-transparent hover:border-border-light transition-all flex items-start gap-3"
                              >
                                <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-600 group-hover:bg-gold-500/20 transition">
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="text-xs font-bold text-ink-900 group-hover:text-gold-600 transition">
                                      {srv.title}
                                    </h4>
                                    {srv.badge && (
                                      <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-gold-500/15 text-gold-700 font-bold">
                                        {srv.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-ink-500 mt-1 line-clamp-2 leading-relaxed">
                                    {srv.summary}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}

                          {/* Mega menu bottom bar */}
                          <div className="col-span-2 pt-3 mt-1 border-t border-border-light flex items-center justify-between text-xs text-ink-500">
                            <span>Ready to plan your application?</span>
                            <Link
                              to="/services"
                              className="text-gold-600 hover:text-gold-700 font-bold flex items-center gap-1"
                            >
                              <span>View All Services Overview →</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-gold-600 bg-gold-500/10 font-bold'
                      : 'text-ink-500 hover:text-ink-900 hover:bg-tint/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+917206658047"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-ink-700 bg-tint/80 border border-border-light hover:border-gold-500/40 hover:text-ink-900 transition shadow-soft-sm"
              title="Call BMS Immigration"
            >
              <PhoneCall className="w-3.5 h-3.5 text-gold-600" />
              <span>72066 58047</span>
            </a>

            <button
              onClick={onOpenAssessment}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-ink-900 to-navy-800 hover:from-navy-800 hover:to-navy-700 shadow-btn-navy transition hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Free Assessment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenAssessment}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-ink-900 to-navy-800 shadow-sm"
            >
              Assessment
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-ink-700 hover:text-ink-900 bg-tint/70 border border-border-light"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white/98 border-b border-border-light backdrop-blur-2xl px-6 py-6 shadow-soft-elevated max-h-[85vh] overflow-y-auto animate-fade-in text-ink-900">
          <nav className="flex flex-col space-y-1">
            {siteData.navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-medium transition ${
                  location.pathname === link.path
                    ? 'bg-gold-500/15 text-gold-700 font-bold'
                    : 'text-ink-700 hover:bg-tint/70 hover:text-ink-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Contact Quick Actions */}
          <div className="mt-6 pt-6 border-t border-border-light space-y-3">
            <a
              href="tel:+917206658047"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-tint border border-border-light text-ink-900 text-sm font-semibold"
            >
              <PhoneCall className="w-4 h-4 text-gold-600" />
              <span>Call Us: +91 72066 58047</span>
            </a>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenAssessment();
              }}
              className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-ink-900 to-navy-800 shadow-btn-navy"
            >
              Schedule Free Counseling
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
