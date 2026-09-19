import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { siteData } from '../../data/site';

export default function Footer() {
  return (
    <footer className="bg-tint/80 border-t border-border-light pt-16 pb-12 relative overflow-hidden text-ink-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Col 1 & 2: Brand Profile */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={siteData.company.logo}
                alt="BMS Immigration"
                width="140"
                height="56"
                loading="lazy"
                decoding="async"
                className="h-14 w-auto object-contain"
              />
              <div>
                <span className="font-bold text-lg text-ink-900 tracking-wide block font-display">
                  BMS IMMIGRATION
                </span>
                <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold">
                  SERVICES
                </span>
              </div>
            </Link>

            <p className="text-sm text-ink-500 leading-relaxed max-w-md">
              Your trusted immigration partner for Study Visas, Visitor Visas, SOP Documentation, Refusal Cases, and International Education Guidance. We help students and professionals achieve their global dreams with confidence.
            </p>

            {/* Social links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteData.company.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-border-light hover:border-gold-500/50 flex items-center justify-center text-ink-700 hover:text-ink-900 transition hover:scale-105 shadow-soft-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteData.company.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-border-light hover:border-gold-500/50 flex items-center justify-center text-ink-700 hover:text-ink-900 transition hover:scale-105 shadow-soft-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteData.company.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-border-light hover:border-gold-500/50 flex items-center justify-center text-ink-700 hover:text-ink-900 transition hover:scale-105 shadow-soft-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteData.company.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-border-light hover:border-emerald-500 flex items-center justify-center text-emerald-600 hover:text-emerald-700 transition hover:scale-105 shadow-soft-sm"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold-600 mb-4 font-display">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {siteData.navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-ink-700 hover:text-gold-600 transition-colors flex items-center gap-1 group"
                  >
                    <span className="text-gold-600/40 group-hover:text-gold-600 transition-colors">›</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Our Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold-600 mb-4 font-display">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {siteData.services.map((srv) => (
                <li key={srv.slug}>
                  <Link
                    to={`/services/${srv.slug}`}
                    className="text-ink-700 hover:text-gold-600 transition-colors flex items-center gap-1 group"
                  >
                    <span className="text-gold-600/40 group-hover:text-gold-600 transition-colors">›</span>
                    <span>{srv.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold-600 mb-4 font-display">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-ink-700">
                <Phone className="w-4 h-4 text-gold-600 flex-shrink-0 mt-1" />
                <div className="space-y-0.5">
                  <a href="tel:+917206658047" className="hover:text-gold-600 block transition">
                    +91 72066 58047
                  </a>
                  <a href="tel:+918570841652" className="hover:text-gold-600 block transition">
                    +91 85708 41652
                  </a>
                  <a href="tel:+919729929704" className="hover:text-gold-600 block transition">
                    +91 97299 29704
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5 text-ink-700">
                <Mail className="w-4 h-4 text-gold-600 flex-shrink-0 mt-1" />
                <div className="space-y-0.5">
                  <a
                    href="mailto:info.bmsimmigrations@gmail.com"
                    className="hover:text-gold-600 block transition text-xs break-all"
                  >
                    info.bmsimmigrations@gmail.com
                  </a>
                  <a
                    href="mailto:admissionbmsimmigration@gmail.com"
                    className="hover:text-gold-600 block transition text-xs break-all"
                  >
                    admissionbmsimmigration@gmail.com
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-2.5 text-ink-700">
                <Clock className="w-4 h-4 text-gold-600 flex-shrink-0" />
                <span className="text-xs text-ink-500">
                  {siteData.company.workingHours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 border-t border-border-light flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-500">
          <p>© 2026 BMS Immigration Services. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>Trusted Since 2019 • Building Global Futures</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
