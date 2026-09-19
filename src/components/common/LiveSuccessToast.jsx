import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, X, Sparkles, ChevronRight } from 'lucide-react';

const successStories = [
  {
    id: 1,
    name: 'Gurpreet Singh',
    location: 'Kurukshetra, Haryana',
    visaType: 'Canada Study Visa Approved',
    details: 'Fanshawe College • London, Ontario',
    time: '2 hours ago',
    flag: '🇨🇦',
    badgeColor: '#C8921F',
  },
  {
    id: 2,
    name: 'Ananya Sharma',
    location: 'Ambala, Punjab',
    visaType: 'UK Tier 4 Visa Approved',
    details: 'Coventry University • MSc Data Science',
    time: '4 hours ago',
    flag: '🇬🇧',
    badgeColor: '#2F80ED',
  },
  {
    id: 3,
    name: 'Rohit Verma',
    location: 'Karnal, Haryana',
    visaType: 'Refusal Overturned & Visa Granted',
    details: 'Canada Study Visa after 2 previous refusals',
    time: '6 hours ago',
    flag: '🌟',
    badgeColor: '#16A34A',
  },
  {
    id: 4,
    name: 'Simran Kaur',
    location: 'Patiala, Punjab',
    visaType: 'Australia Student Visa Granted',
    details: 'Deakin University • Melbourne',
    time: 'Yesterday',
    flag: '🇦🇺',
    badgeColor: '#0EA5C6',
  },
  {
    id: 5,
    name: 'Manish & Sunita Patel',
    location: 'Delhi NCR',
    visaType: 'Canada Visitor Visa (10 Years Multiple)',
    details: 'Family visit & tourism approved in 18 days',
    time: 'Just now',
    flag: '✈️',
    badgeColor: '#C8921F',
  },
];

export default function LiveSuccessToast({ onOpenAssessment }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isDismissed || isPaused) return;

    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % successStories.length);
        setIsVisible(true);
      }, 400);
    }, 6500);

    return () => clearInterval(interval);
  }, [isDismissed, isPaused]);

  if (isDismissed) return null;

  const current = successStories[currentIndex];

  return (
    <aside
      aria-label="Live visa approval notification"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`fixed bottom-24 sm:bottom-6 left-4 sm:left-6 z-40 max-w-sm w-[calc(100vw-2rem)] sm:w-auto transition-all duration-500 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/95 border border-border-light shadow-soft-elevated backdrop-blur-md p-3.5 sm:p-4 text-ink-900 ring-1 ring-gold-500/20 hover:border-gold-500/50 transition">
        {/* Top bar with Dismiss Button */}
        <div className="flex items-center justify-between gap-3 pb-2 mb-2 border-b border-border-light">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Live Visa Approval
            </span>
            <span className="text-[10px] text-ink-400 font-medium">
              • {current.time}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss live notification"
            className="text-ink-400 hover:text-ink-700 p-1 rounded-md hover:bg-tint transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content Row */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center text-lg shrink-0 shadow-soft-sm">
            {current.flag}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h5 className="text-xs font-bold text-ink-900 truncate">
                {current.name}
              </h5>
              <span className="text-[10px] text-ink-400 truncate">
                ({current.location})
              </span>
            </div>

            <p className="text-xs font-semibold text-gold-700 mt-0.5 flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
              <span className="truncate">{current.visaType}</span>
            </p>

            <p className="text-[11px] text-ink-500 truncate mt-0.5">
              {current.details}
            </p>
          </div>
        </div>

        {/* Bottom CTA trigger */}
        <button
          type="button"
          onClick={() => onOpenAssessment && onOpenAssessment()}
          className="mt-2.5 w-full pt-2 border-t border-dashed border-border-light flex items-center justify-between text-[11px] font-bold text-electric-600 hover:text-gold-700 transition"
        >
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-gold-600" />
            Check your visa chances
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
