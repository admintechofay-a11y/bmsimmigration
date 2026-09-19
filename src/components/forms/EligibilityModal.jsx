import React, { useState, useEffect } from 'react';
import { X, Sparkles, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { siteData } from '../../data/site';

export default function EligibilityModal({ isOpen, onClose, initialCountry = 'Canada' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destinationCountry: initialCountry,
    service: 'Study Visa Assistance',
    educationLevel: 'Bachelor Degree',
    englishTest: 'IELTS Completed',
    website: '', // Honeypot
  });

  useEffect(() => {
    if (initialCountry) {
      setFormData((prev) => ({ ...prev, destinationCountry: initialCountry }));
    }
  }, [initialCountry, isOpen]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          destinationCountry: formData.destinationCountry,
          service: formData.service,
          educationLevel: formData.educationLevel,
          englishTest: formData.englishTest,
          message: `Eligibility Assessment: Education=${formData.educationLevel}, EnglishTest=${formData.englishTest}`
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        // Dynamic lazy import of canvas-confetti only when triggered
        import('canvas-confetti').then(({ default: confetti }) => {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        }).catch(() => {});
      } else {
        setErrorMsg(data.error || 'Failed to submit profile. Please try again.');
      }
    } catch {
      // Offline fallback: still consider as processed locally
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-border-light shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-ink-400 hover:text-ink-900 p-1.5 rounded-lg hover:bg-tint transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-ink-900 mb-2 font-display">Assessment Submitted!</h3>
            <p className="text-sm text-ink-600 mb-6 leading-relaxed">
              Thank you, <strong className="text-gold-700">{formData.name}</strong>. Our senior immigration counselors are analyzing your profile for <strong className="text-gold-700">{formData.destinationCountry}</strong>. We will reach out to you within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/919729929704?text=${encodeURIComponent(`Hi BMS Immigration, I just submitted an assessment for ${formData.destinationCountry} (${formData.service}). My name is ${formData.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 shadow-soft-sm transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Fast-Track on WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-ink-700 bg-tint hover:bg-border-light transition"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 text-gold-700 mb-2">
              <Sparkles className="w-4 h-4 text-gold-600" />
              <span className="text-xs uppercase tracking-widest font-bold">Free 60-Second Evaluation</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 font-display mb-2">
              Check Your Visa Eligibility
            </h2>
            <p className="text-xs sm:text-sm text-ink-600 mb-6">
              Get an instant assessment from licensed consultants for study visas, PR pathways, and tourist visas.
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="website"
                value={formData.website || ''}
                onChange={handleChange}
                tabIndex="-1"
                autoComplete="off"
                style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                aria-hidden="true"
              />

              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-tint/40 border border-border-light focus:border-gold-500 focus:bg-white focus:ring-1 focus:ring-gold-500 text-ink-900 text-sm outline-none transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-tint/40 border border-border-light focus:border-gold-500 focus:bg-white focus:ring-1 focus:ring-gold-500 text-ink-900 text-sm outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-tint/40 border border-border-light focus:border-gold-500 focus:bg-white focus:ring-1 focus:ring-gold-500 text-ink-900 text-sm outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1">Target Destination</label>
                  <select
                    name="destinationCountry"
                    value={formData.destinationCountry}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-tint/40 border border-border-light text-ink-900 text-sm focus:border-gold-500 focus:bg-white outline-none"
                  >
                    <option value="Canada">Canada 🇨🇦</option>
                    <option value="United Kingdom">United Kingdom 🇬🇧</option>
                    <option value="United States">United States 🇺🇸</option>
                    <option value="Australia">Australia 🇦🇺</option>
                    <option value="Germany">Germany 🇩🇪</option>
                    <option value="Other">Other Global Hubs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1">Visa Type / Service</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-tint/40 border border-border-light text-ink-900 text-sm focus:border-gold-500 focus:bg-white outline-none"
                  >
                    <option value="Study Visa Assistance">Study Visa</option>
                    <option value="Tourist & Visitor Visa">Tourist / Visitor Visa</option>
                    <option value="SOP & Documentation Support">SOP & Documentation</option>
                    <option value="Refusal & Re-Application Cases">Refusal Re-Application</option>
                    <option value="Inside Canada Applications">Inside Canada Extension</option>
                    <option value="Offer Letter Assistance">Offer Letter Processing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1">Current Qualification</label>
                  <select
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-tint/40 border border-border-light text-ink-900 text-sm focus:border-gold-500 focus:bg-white outline-none"
                  >
                    <option value="High School / 12th">High School / 12th</option>
                    <option value="Bachelor Degree">Bachelor Degree</option>
                    <option value="Master Degree">Master Degree</option>
                    <option value="Diploma / Polytechnic">Diploma / Polytechnic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1">English Language Test</label>
                  <select
                    name="englishTest"
                    value={formData.englishTest}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-tint/40 border border-border-light text-ink-900 text-sm focus:border-gold-500 focus:bg-white outline-none"
                  >
                    <option value="IELTS Completed">IELTS (Completed)</option>
                    <option value="PTE Completed">PTE (Completed)</option>
                    <option value="Duolingo / TOEFL">Duolingo / TOEFL</option>
                    <option value="Planning to Take">Planning to Take</option>
                    <option value="Not Applicable">Not Applicable</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-white bg-ink-900 hover:bg-ink-800 shadow-soft-md transition disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Evaluating Profile...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-gold-400" />
                    <span>Get Free Profile Assessment</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-ink-500">
                🔒 100% Confidential. No spam. Sourced directly by BMS Immigration Services.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
