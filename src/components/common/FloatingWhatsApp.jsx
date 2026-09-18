import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { siteData } from '../../data/site';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col gap-2">
      {/* Mini Tooltip Popover */}
      {showTooltip && (
        <div className="relative flex items-center bg-navy-900/95 border border-gold-500/30 text-slate-200 text-xs px-3.5 py-2 rounded-xl shadow-card-elevated backdrop-blur-md animate-bounce max-w-[220px]">
          <span>💬 Need immediate visa guidance? Chat with us!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="ml-2 text-slate-400 hover:text-white p-0.5"
            aria-label="Close message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Pulsing Button */}
      <a
        href={siteData.company.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 text-white shadow-lg hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-400/40"
        aria-label="Chat with BMS Immigration on WhatsApp"
      >
        {/* Pulsing ripple */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25 group-hover:opacity-40" />

        <MessageCircle className="w-7 h-7 relative z-10 fill-white/20 text-white transition-transform duration-300 group-hover:rotate-12" />

        {/* Online green indicator badge */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-navy-950 rounded-full" />
      </a>
    </div>
  );
}
