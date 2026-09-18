import React from 'react';
import { motion } from 'framer-motion';

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
    <div className="relative w-full h-[520px] max-w-[620px] mx-auto flex items-center justify-center">
      {/* Ambient background glow */}
      <div className="absolute w-80 h-80 rounded-full bg-electric-500/10 blur-[90px]" />
      <div className="absolute w-72 h-72 rounded-full bg-gold-500/10 blur-[80px]" />

      {/* Stylized 2D Globe Circle */}
      <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-gold-500/20 bg-gradient-to-br from-navy-900/90 via-navy-950 to-slate-950 shadow-[0_0_50px_rgba(212,164,74,0.15)] flex items-center justify-center overflow-hidden">
        {/* Longitudinal & Latitudinal Lines */}
        <div className="absolute inset-0 rounded-full border border-gold-500/15 scale-75" />
        <div className="absolute inset-0 rounded-full border border-gold-500/10 scale-50" />
        <div className="absolute w-full h-[1px] bg-gold-500/20 top-1/2 -translate-y-1/2" />
        <div className="absolute h-full w-[1px] bg-gold-500/20 left-1/2 -translate-x-1/2" />

        {/* Diagonal elliptical orbital rings */}
        <div className="absolute w-full h-full rounded-[50%] border border-electric-500/30 rotate-45 scale-110 animate-pulse-slow" />
        <div className="absolute w-full h-full rounded-[50%] border border-gold-400/20 -rotate-45 scale-125" />

        {/* Stylized Continents & Connection Arcs */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-6 text-gold-400">
          {/* Flight Arcs originating from India (68, 48) */}
          <motion.path
            d="M 68 48 Q 45 20 25 30"
            fill="none"
            stroke="url(#goldBlueGradient)"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M 68 48 Q 58 28 48 32"
            fill="none"
            stroke="#2F80ED"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          <motion.path
            d="M 68 48 Q 78 58 84 72"
            fill="none"
            stroke="#D4A44A"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          <defs>
            <linearGradient id="goldBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2F80ED" />
              <stop offset="100%" stopColor="#D4A44A" />
            </linearGradient>
          </defs>

          {/* Hub Pins */}
          {hubs.map((hub, idx) => (
            <g key={idx}>
              <circle
                cx={hub.x}
                cy={hub.y}
                r={hub.pulse ? 2.5 : 1.8}
                fill={hub.pulse ? '#D4A44A' : '#60A5FA'}
                className="transition-all"
              />
              {hub.pulse && (
                <circle
                  cx={hub.x}
                  cy={hub.y}
                  r="5"
                  fill="none"
                  stroke="#D4A44A"
                  strokeWidth="0.6"
                  className="animate-ping opacity-75 origin-center"
                />
              )}
            </g>
          ))}
        </svg>

        {/* Center Monogram Badge */}
        <div className="relative z-10 w-20 h-20 rounded-2xl bg-navy-950/90 border border-gold-500/40 backdrop-blur-xl flex flex-col items-center justify-center shadow-gold-glow">
          <span className="text-xl font-black text-gold-gradient tracking-wider">BMS</span>
          <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold">Global</span>
        </div>
      </div>

      {/* Orbiting Satellite Card */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 right-4 sm:right-8 bg-navy-900/90 border border-gold-500/30 backdrop-blur-lg px-4 py-2.5 rounded-xl shadow-card-elevated flex items-center gap-3"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <div>
          <p className="text-[11px] font-bold text-white uppercase tracking-wider">98% Visa Approvals</p>
          <p className="text-[10px] text-slate-400">Global Study & PR Pathways</p>
        </div>
      </motion.div>
    </div>
  );
}
