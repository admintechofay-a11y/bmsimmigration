import React, { useState } from 'react';
import { Sparkles, Plane, ArrowRight, Award, CheckCircle } from 'lucide-react';

const destinations = [
  {
    id: 'canada',
    country: 'Canada',
    flag: '🇨🇦',
    airport: 'DEL ➔ YVR / YYZ',
    successRate: '98%',
    intake: 'Fall 2025 Open',
    popularUniversities: 'Toronto, UBC, McGill, Seneca',
    workPermit: 'Up to 3-Year PGWP',
    color: '#C8921F',
    bgLight: 'rgba(200, 146, 31, 0.08)',
    border: 'rgba(200, 146, 31, 0.3)',
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    flag: '🇬🇧',
    airport: 'DEL ➔ LHR / MAN',
    successRate: '97%',
    intake: 'Sept 2025 Open',
    popularUniversities: 'Manchester, Coventry, Warwick',
    workPermit: '2-Year Graduate Route',
    color: '#2F80ED',
    bgLight: 'rgba(47, 128, 237, 0.08)',
    border: 'rgba(47, 128, 237, 0.3)',
  },
  {
    id: 'australia',
    country: 'Australia',
    flag: '🇦🇺',
    airport: 'DEL ➔ SYD / MEL',
    successRate: '96%',
    intake: 'July / Nov 2025',
    popularUniversities: 'Melbourne, Sydney, Deakin',
    workPermit: 'Post-Study Work Visa',
    color: '#0EA5C6',
    bgLight: 'rgba(14, 165, 198, 0.08)',
    border: 'rgba(14, 165, 198, 0.3)',
  },
  {
    id: 'usa',
    country: 'United States',
    flag: '🇺🇸',
    airport: 'DEL ➔ JFK / SFO',
    successRate: '95%',
    intake: 'Fall 2025 Open',
    popularUniversities: 'NYU, ASU, Northeastern',
    workPermit: 'STEM OPT up to 3 Years',
    color: '#1D4ED8',
    bgLight: 'rgba(29, 78, 216, 0.08)',
    border: 'rgba(29, 78, 216, 0.3)',
  },
  {
    id: 'germany',
    country: 'Germany / Europe',
    flag: '🇩🇪',
    airport: 'DEL ➔ FRA / MUC',
    successRate: '96%',
    intake: 'Winter / Summer',
    popularUniversities: 'TUM, LMU, Heidelberg',
    workPermit: '18-Month Job Seeker Visa',
    color: '#16A34A',
    bgLight: 'rgba(22, 163, 74, 0.08)',
    border: 'rgba(22, 163, 74, 0.3)',
  },
];

export default function DreamDestinationMatcher({ onOpenAssessment }) {
  const [selected, setSelected] = useState(destinations[0]);
  const [isCelebrating, setIsCelebrating] = useState(false);

  const handleSelect = (dest) => {
    setSelected(dest);
    setIsCelebrating(true);

    // Trigger joyful confetti burst with dynamic import
    import('canvas-confetti')
      .then(({ default: confetti }) => {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#C8921F', '#2F80ED', '#0EA5C6', '#16A34A', '#F59E0B'],
          disableForReducedMotion: true,
        });
      })
      .catch(() => {});

    setTimeout(() => {
      setIsCelebrating(false);
    }, 1200);
  };

  return (
    <div className="w-full max-w-xl mx-auto lg:mx-0 pt-3">
      {/* Interactive Selector Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-ink-700 tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-spin-ultra-slow" />
          <span>Select Your Dream Destination</span>
        </div>
        <span className="text-[11px] text-ink-400 font-medium hidden sm:inline">
          Tap to view instant pathway
        </span>
      </div>

      {/* Destination Pills */}
      <div className="flex flex-wrap gap-2 mb-3">
        {destinations.map((dest) => {
          const isCurrent = selected.id === dest.id;
          return (
            <button
              key={dest.id}
              type="button"
              onClick={() => handleSelect(dest)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 transform ${
                isCurrent
                  ? 'bg-ink-900 text-white shadow-md scale-105 ring-2 ring-gold-500/50'
                  : 'bg-white/90 text-ink-700 hover:bg-tint border border-border-light hover:border-gold-500/40'
              }`}
            >
              <span className="text-sm">{dest.flag}</span>
              <span>{dest.country.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* 3D-styled Digital Boarding Pass Card */}
      <div
        className={`relative overflow-hidden rounded-2xl bg-white/95 border border-border-light shadow-card-elevated backdrop-blur-md p-4 transition-all duration-300 ${
          isCelebrating ? 'ring-2 ring-gold-500/60 scale-[1.01]' : ''
        }`}
        style={{
          borderLeft: `4px solid ${selected.color}`,
        }}
      >
        {/* Decorative Top Airline Ticket Notch */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selected.flag}</span>
              <div>
                <h4 className="text-base font-bold text-ink-900 font-display flex items-center gap-1.5">
                  <span>{selected.country} Student & Visit Pathway</span>
                </h4>
                <div className="flex items-center gap-2 text-xs text-ink-500 font-mono mt-0.5">
                  <Plane className="w-3.5 h-3.5 text-electric-500 rotate-45" />
                  <span>Route: {selected.airport}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Guaranteed Match Badge */}
          <div className="text-right">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <Award className="w-3 h-3 text-emerald-600" />
              <span>{selected.successRate} Success</span>
            </div>
            <div className="text-[10px] text-ink-400 font-medium mt-1">
              {selected.intake}
            </div>
          </div>
        </div>

        {/* Highlights Row */}
        <div className="mt-3 pt-3 border-t border-dashed border-border-light grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-ink-600">
            <CheckCircle className="w-3.5 h-3.5 text-gold-600 shrink-0" />
            <span className="truncate">{selected.popularUniversities}</span>
          </div>
          <div className="flex items-center gap-1.5 text-ink-600">
            <CheckCircle className="w-3.5 h-3.5 text-electric-500 shrink-0" />
            <span className="truncate">{selected.workPermit}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-3.5 flex items-center justify-between gap-3 pt-2">
          <span className="text-[11px] font-medium text-ink-500">
            Free profile assessment with 1-on-1 counseling
          </span>
          <button
            type="button"
            onClick={() => onOpenAssessment && onOpenAssessment(selected.country)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-ink-900 to-navy-800 hover:from-gold-600 hover:to-gold-500 shadow-btn-navy transition-all transform hover:scale-105 active:scale-95 shrink-0"
          >
            <span>Check My Eligibility</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
