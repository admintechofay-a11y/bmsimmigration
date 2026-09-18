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
      <section className="py-16 sm:py-24 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 inline-block mb-4">
            We're Here to Help
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-display mb-4">
            Get in Touch with <br />
            <span className="text-gold-gradient">Expert Guidance</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Start your international education journey with a free Counseling. Our expert counselors are ready to guide you through every step of the visa process.
          </p>
        </div>
      </section>

      {/* Quick Communication Channel Cards */}
      <section className="py-8 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Call / WhatsApp Us */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-navy-900/90 to-navy-950 border border-gold-500/30 shadow-card-elevated flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 flex-shrink-0">
                <Phone className="w-7 h-7" />
              </div>
              <div className="space-y-2 flex-1">
                <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider block">
                  Direct Telephone
                </span>
                <h3 className="text-xl font-bold text-white font-display">
                  Call / WhatsApp Us
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold text-slate-200">
                  <a href="tel:+917206658047" className="hover:text-gold-400 transition">
                    72066 58047
                  </a>
                  <a href="tel:+918570841652" className="hover:text-gold-400 transition">
                    85708 41652
                  </a>
                  <a href="tel:+919729929704" className="hover:text-gold-400 transition">
                    97299 29704
                  </a>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                  <Clock className="w-3.5 h-3.5 text-gold-400" />
                  <span>{siteData.company.workingHours}</span>
                </p>
              </div>
            </div>

            {/* Email Us */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-navy-900/90 to-navy-950 border border-electric-500/30 shadow-card-elevated flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-electric-500/10 border border-electric-500/30 flex items-center justify-center text-electric-400 flex-shrink-0">
                <Mail className="w-7 h-7" />
              </div>
              <div className="space-y-2 flex-1">
                <span className="text-xs font-semibold text-electric-400 uppercase tracking-wider block">
                  Electronic Mail
                </span>
                <h3 className="text-xl font-bold text-white font-display">
                  Email Us
                </h3>
                <div className="space-y-0.5 text-sm font-semibold text-slate-200">
                  <a
                    href="mailto:info.bmsimmigrations@gmail.com"
                    className="hover:text-gold-400 block transition break-all"
                  >
                    info.bmsimmigrations@gmail.com
                  </a>
                  <a
                    href="mailto:admissionbmsimmigration@gmail.com"
                    className="hover:text-gold-400 block transition break-all"
                  >
                    admissionbmsimmigration@gmail.com
                  </a>
                </div>
                <p className="text-xs text-slate-400 pt-1">
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
      <section className="py-20 bg-navy-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Form (7 cols) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Right Pillars & Socials (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              {/* Why Choose BMS Box */}
              <div className="p-8 rounded-2xl bg-navy-900/80 border border-gold-500/20 shadow-card-elevated space-y-6">
                <h3 className="text-xl font-bold text-white font-display">
                  Why Choose BMS?
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Personalized Consultation</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Immigration solutions tailored according to your goals and profile.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Documentation Assistance</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Complete support for visa filing and document preparation.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">High Success Ratio</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Trusted by clients for professional and transparent immigration support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels Box */}
              <div className="p-8 rounded-2xl bg-navy-900/80 border border-slate-800 shadow-card-elevated space-y-4">
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
                  Social Networks
                </span>
                <h3 className="text-xl font-bold text-white font-display">
                  Let's Connect Everywhere
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Follow BMS Immigration Services for the latest visa updates, immigration news, success stories, and expert guidance.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href={siteData.company.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-navy-950 border border-slate-700 hover:border-blue-500 flex items-center gap-2.5 text-xs text-slate-300 hover:text-white transition"
                  >
                    <Facebook className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold">Facebook</span>
                  </a>

                  <a
                    href={siteData.company.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-navy-950 border border-slate-700 hover:border-pink-500 flex items-center gap-2.5 text-xs text-slate-300 hover:text-white transition"
                  >
                    <Instagram className="w-4 h-4 text-pink-500" />
                    <span className="font-semibold">Instagram</span>
                  </a>

                  <a
                    href={siteData.company.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-navy-950 border border-slate-700 hover:border-blue-400 flex items-center gap-2.5 text-xs text-slate-300 hover:text-white transition"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span className="font-semibold">LinkedIn</span>
                  </a>

                  <a
                    href={siteData.company.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-navy-950 border border-slate-700 hover:border-green-500 flex items-center gap-2.5 text-xs text-emerald-400 hover:text-emerald-300 transition"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
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
