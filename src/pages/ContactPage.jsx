import React from 'react';
import {
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import SEO from '../components/common/SEO';
import ContactForm from '../components/forms/ContactForm';
import LeadershipSection from '../components/sections/LeadershipSection';
import { siteData } from '../data/site';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Us - Expert Visa & Immigration Guidance"
        description="Get in touch with BMS Immigration Services. Call, email, or chat on WhatsApp with our senior consultants for study visas and immigration support."
        canonicalUrl="/contact"
      />

      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-page via-tint/40 to-page text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest text-gold-700 font-bold px-3 py-1 rounded-full bg-gold-50 border border-gold-200 inline-block mb-4">
            We're Here to Help
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-900 font-display mb-4">
            Get in Touch with <br />
            <span className="text-gold-gradient">Expert Guidance</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-600 max-w-2xl mx-auto leading-relaxed font-sans">
            Start your international education journey with a free Counseling. Our expert counselors are ready to guide you through every step of the visa process.
          </p>
        </div>
      </section>

      {/* Quick Communication Channel Cards */}
      <section className="py-8 bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Call / WhatsApp Us */}
            <div className="p-8 rounded-2xl bg-white border border-border-light shadow-card-elevated flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-600 flex-shrink-0">
                <Phone className="w-7 h-7" />
              </div>
              <div className="space-y-2 flex-1">
                <span className="text-xs font-bold text-gold-700 uppercase tracking-wider block">
                  Direct Telephone
                </span>
                <h3 className="text-xl font-bold text-ink-900 font-display">
                  Call / WhatsApp Us
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-bold text-ink-900">
                  <a href="tel:+917206658047" className="hover:text-gold-700 transition">
                    72066 58047
                  </a>
                  <a href="tel:+918570841652" className="hover:text-gold-700 transition">
                    85708 41652
                  </a>
                  <a href="tel:+919729929704" className="hover:text-gold-700 transition">
                    97299 29704
                  </a>
                </div>
                <p className="text-xs text-ink-500 flex items-center gap-1.5 pt-1">
                  <Clock className="w-3.5 h-3.5 text-gold-600" />
                  <span>{siteData.company.workingHours}</span>
                </p>
              </div>
            </div>

            {/* Email Us */}
            <div className="p-8 rounded-2xl bg-white border border-border-light shadow-card-elevated flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-electric-50 border border-electric-200 flex items-center justify-center text-electric-600 flex-shrink-0">
                <Mail className="w-7 h-7" />
              </div>
              <div className="space-y-2 flex-1">
                <span className="text-xs font-bold text-electric-700 uppercase tracking-wider block">
                  Electronic Mail
                </span>
                <h3 className="text-xl font-bold text-ink-900 font-display">
                  Email Us
                </h3>
                <div className="space-y-0.5 text-sm font-semibold text-ink-900">
                  <a
                    href="mailto:info.bmsimmigrations@gmail.com"
                    className="hover:text-gold-700 block transition break-all"
                  >
                    info.bmsimmigrations@gmail.com
                  </a>
                  <a
                    href="mailto:admissionbmsimmigration@gmail.com"
                    className="hover:text-gold-700 block transition break-all"
                  >
                    admissionbmsimmigration@gmail.com
                  </a>
                </div>
                <p className="text-xs text-ink-500 pt-1">
                  ⚡ {siteData.company.responseTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Showcase */}
      <LeadershipSection />

      {/* Main Intake Form & Why Choose Us Sidebar */}
      <section className="py-20 bg-tint/40 border-t border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Form (7 cols) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Right Pillars & Socials (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              {/* Why Choose BMS Box */}
              <div className="p-8 rounded-2xl bg-white border border-border-light shadow-card-elevated space-y-6">
                <h3 className="text-xl font-bold text-ink-900 font-display">
                  Why Choose BMS?
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-ink-900">Personalized Consultation</h4>
                      <p className="text-xs text-ink-600 mt-1 leading-relaxed">
                        Immigration solutions tailored according to your goals and profile.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-ink-900">Documentation Assistance</h4>
                      <p className="text-xs text-ink-600 mt-1 leading-relaxed">
                        Complete support for visa filing and document preparation.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-ink-900">High Success Ratio</h4>
                      <p className="text-xs text-ink-600 mt-1 leading-relaxed">
                        Trusted by clients for professional and transparent immigration support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels Box */}
              <div className="p-8 rounded-2xl bg-white border border-border-light shadow-card-elevated space-y-4">
                <span className="text-xs uppercase tracking-widest text-gold-700 font-bold block">
                  Social Networks
                </span>
                <h3 className="text-xl font-bold text-ink-900 font-display">
                  Let's Connect Everywhere
                </h3>
                <p className="text-xs text-ink-600 leading-relaxed font-sans">
                  Follow BMS Immigration Services for the latest visa updates, immigration news, success stories, and expert guidance.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href={siteData.company.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-tint/50 border border-border-light hover:border-blue-500 flex items-center gap-2.5 text-xs text-ink-700 hover:text-ink-900 transition"
                  >
                    <Facebook className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold">Facebook</span>
                  </a>

                  <a
                    href={siteData.company.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-tint/50 border border-border-light hover:border-pink-500 flex items-center gap-2.5 text-xs text-ink-700 hover:text-ink-900 transition"
                  >
                    <Instagram className="w-4 h-4 text-pink-600" />
                    <span className="font-semibold">Instagram</span>
                  </a>

                  <a
                    href={siteData.company.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-tint/50 border border-border-light hover:border-blue-400 flex items-center gap-2.5 text-xs text-ink-700 hover:text-ink-900 transition"
                  >
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold">LinkedIn</span>
                  </a>

                  <a
                    href={siteData.company.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 hover:border-emerald-400 flex items-center gap-2.5 text-xs text-emerald-800 hover:text-emerald-900 transition"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
