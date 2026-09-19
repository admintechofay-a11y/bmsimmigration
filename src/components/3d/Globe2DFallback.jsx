import React from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';

export default function Globe2DFallback() {
  const hubs = [
    { name: 'India (Origin)', x: 68, y: 48, pulse: true },
    { name: 'Canada', x: 25, y: 30 },
    { name: 'United Kingdom', x: 48, y: 32 },
    { name: 'United States', x: 22, y: 42 },
    { name: 'Australia', x: 84, y: 72 },
    { name: 'Germany', x: 52, y: 34 },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative w-full h-[520px] max-w-[620px] mx-auto flex items-center justify-center">
        {/* Soft Aurora Light Background Ambiance */}
        <div className="absolute w-80 h-80 rounded-full bg-blue-500/5 blur-[90px]" />
        <div className="absolute w-72 h-72 rounded-full bg-amber-500/5 blur-[80px]" />

        {/* Stylized 2D Globe Circle - Aurora Light Theme */}
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-[#E3EAF5] bg-gradient-to-br from-[#FFFFFF] via-[#EEF3FB] to-[#E2E8F0] shadow-card flex items-center justify-center overflow-hidden">
          {/* Longitudinal & Latitudinal Lines */}
          <div className="absolute inset-0 rounded-full border border-[#CBD5E1]/40 scale-75" />
          <div className="absolute inset-0 rounded-full border border-[#CBD5E1]/30 scale-50" />
          <div className="absolute w-full h-[1px] bg-[#CBD5E1]/40 top-1/2 -translate-y-1/2" />
          <div className="absolute h-full w-[1px] bg-[#CBD5E1]/40 left-1/2 -translate-x-1/2" />

          {/* Diagonal orbital rings */}
          <div className="absolute w-full h-full rounded-[50%] border border-[#2F80ED]/30 rotate-45 scale-110" />
          <div className="absolute w-full h-full rounded-[50%] border border-[#C8921F]/30 -rotate-45 scale-125" />

          {/* Stylized Connection Arcs */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-6">
            <m.path
              d="M 68 48 Q 45 20 25 30"
              fill="none"
              stroke="url(#goldBlueGradient)"
              strokeWidth="1.0"
              strokeDasharray="2 2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <m.path
              d="M 68 48 Q 58 28 48 32"
              fill="none"
              stroke="#2F80ED"
              strokeWidth="1.0"
              strokeDasharray="2 2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
            <m.path
              d="M 68 48 Q 78 58 84 72"
              fill="none"
              stroke="#C8921F"
              strokeWidth="1.0"
              strokeDasharray="2 2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />

            <defs>
              <linearGradient id="goldBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2F80ED" />
                <stop offset="100%" stopColor="#C8921F" />
              </linearGradient>
            </defs>

            {/* Hub Pins */}
            {hubs.map((hub) => (
              <g key={hub.name}>
                <circle
                  cx={hub.x}
                  cy={hub.y}
                  r={hub.pulse ? 2.5 : 1.8}
                  fill={hub.pulse ? '#C8921F' : '#2F80ED'}
                  className="transition-all"
                />
                {hub.pulse && (
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r="5"
                    fill="none"
                    stroke="#C8921F"
                    strokeWidth="0.8"
                    className="animate-ping opacity-75 origin-center"
                  />
                )}
              </g>
            ))}
          </svg>

          {/* Center Monogram Badge */}
          <div className="relative z-10 w-20 h-20 rounded-2xl bg-white/90 border border-[#E3EAF5] backdrop-blur-xl flex flex-col items-center justify-center shadow-card">
            <span className="text-xl font-black text-[#0B1B3A] tracking-wider">BMS</span>
            <span className="text-[9px] uppercase tracking-widest text-[#C8921F] font-bold">Global</span>
          </div>
        </div>

        {/* Orbiting Satellite Card */}
        <m.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 right-4 sm:right-8 bg-white/90 border border-[#E3EAF5] backdrop-blur-lg px-4 py-2.5 rounded-xl shadow-card flex items-center gap-3"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <div>
            <p className="text-[11px] font-bold text-[#0B1B3A] uppercase tracking-wider">98% Visa Approvals</p>
            <p className="text-[10px] text-[#4A5B78]">Global Study & PR Pathways</p>
          </div>
        </m.div>
      </div>
    </LazyMotion>
  );
}
