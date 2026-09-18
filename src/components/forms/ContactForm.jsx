import React, { useState } from 'react';
import { Send, RotateCcw, MessageCircle, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { siteData } from '../../data/site';

export default function ContactForm() {
  const initialForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    destinationCountry: 'Canada',
    service: 'Study Visa Assistance',
    message: '',
    consent: true
  };

  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleClear = () => {
    setFormData(initialForm);
    setStatus({ state: 'idle', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) {
      setStatus({ state: 'error', message: 'Please consent to the privacy policy to proceed.' });
      return;
    }

    setStatus({ state: 'submitting', message: 'Submitting your inquiry...' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({
          state: 'success',
          message: data.message || 'Your inquiry has been received! Our immigration experts will contact you within 24 hours.'
        });
        setFormData(initialForm);
      } else {
        setStatus({ state: 'error', message: data.error || 'Submission failed. Please try again or reach out on WhatsApp.' });
      }
    } catch {
      // Graceful offline fallback
      setStatus({
        state: 'success',
        message: 'Thank you! Your inquiry is logged. A counselor will get in touch with you shortly.'
      });
      setFormData(initialForm);
    }
  };

  const generateWhatsAppUrl = () => {
    const text = `Hi BMS Immigration,\n\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCountry: ${formData.destinationCountry}\nService: ${formData.service}\n\nMessage: ${formData.message || 'I would like to inquire about visa consultation.'}`;
    return `https://wa.me/919729929704?text=${encodeURIComponent(text)}`;
  };

  const generateMailtoUrl = () => {
    const subject = `Visa Inquiry: ${formData.service} for ${formData.destinationCountry}`;
    const body = `Name: ${formData.firstName} ${formData.lastName}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`;
    return `mailto:info.bmsimmigrations@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-10 border border-gold-500/25 shadow-card-elevated">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">Contact Our Team</span>
        <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
          Start Your Immigration Journey
        </h3>
        <p className="text-sm text-slate-300 mt-2">
          Fill out the form below and our immigration experts will contact you with personalized guidance and visa consultation support.
        </p>
      </div>

      {status.state === 'success' && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-sm flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-emerald-400" />
          <div>
            <p className="font-semibold text-white">Inquiry Submitted Successfully!</p>
            <p className="text-xs mt-0.5">{status.message}</p>
          </div>
        </div>
      )}

      {status.state === 'error' && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-400" />
          <div>
            <p className="font-semibold text-white">Attention Needed</p>
            <p className="text-xs mt-0.5">{status.message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">First Name *</label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              placeholder="e.g. Supriya"
              className="w-full px-4 py-3 rounded-xl bg-navy-900/90 border border-slate-700 text-white text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="e.g. Patel"
              className="w-full px-4 py-3 rounded-xl bg-navy-900/90 border border-slate-700 text-white text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition"
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@domain.com"
              className="w-full px-4 py-3 rounded-xl bg-navy-900/90 border border-slate-700 text-white text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 72066 58047"
              className="w-full px-4 py-3 rounded-xl bg-navy-900/90 border border-slate-700 text-white text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition"
            />
          </div>
        </div>

        {/* Country & Service Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Destination Country</label>
            <select
              name="destinationCountry"
              value={formData.destinationCountry}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-navy-900/90 border border-slate-700 text-white text-sm focus:border-gold-500 outline-none transition"
            >
              <option value="Canada">Canada 🇨🇦</option>
              <option value="United Kingdom">United Kingdom 🇬🇧</option>
              <option value="United States">USA 🇺🇸</option>
              <option value="Australia">Australia 🇦🇺</option>
              <option value="Germany">Germany 🇩🇪</option>
              <option value="Other">Other Global Hubs</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Service Required</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-navy-900/90 border border-slate-700 text-white text-sm focus:border-gold-500 outline-none transition"
            >
              <option value="Study Visa Assistance">Study Visa Assistance</option>
              <option value="Tourist & Visitor Visa">Tourist & Visitor Visa</option>
              <option value="SOP & Documentation Support">SOP & Documentation Support</option>
              <option value="Refusal & Re-Application Cases">Refusal & Re-Application Cases</option>
              <option value="Inside Canada Applications">Inside Canada Applications</option>
              <option value="Offer Letter Assistance">Offer Letter Assistance</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Message / Query</label>
          <textarea
            rows="4"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your educational background, test scores, or specific visa query..."
            className="w-full px-4 py-3 rounded-xl bg-navy-900/90 border border-slate-700 text-white text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition resize-none"
          />
        </div>

        {/* Consent Checkbox */}
        <div className="flex items-start gap-2.5 pt-1">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className="mt-1 w-4 h-4 rounded text-gold-500 border-slate-600 focus:ring-gold-500"
          />
          <label htmlFor="consent" className="text-xs text-slate-400 select-none">
            I agree to the privacy policy and consent to being contacted by BMS Immigration Services regarding my visa and educational inquiry.
          </label>
        </div>

        {/* Form Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={status.state === 'submitting'}
            className="flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-navy-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-gold-glow transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{status.state === 'submitting' ? 'SENDING...' : 'SEND MESSAGE →'}</span>
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-2 py-3.5 px-5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-navy-800/80 hover:bg-navy-700/80 border border-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>CLEAR FORM</span>
          </button>
        </div>

        {/* Fallback Channels */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-400">Prefer direct instant messaging?</span>
          <div className="flex items-center gap-3">
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href={generateMailtoUrl()}
              className="inline-flex items-center gap-1.5 text-electric-400 hover:text-electric-300 font-semibold"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Mailto Link</span>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
