import React from 'react';
import { Html, useProgress } from '@react-three/drei';

export default function CanvasLoader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-navy-950/80 border border-gold-500/30 backdrop-blur-md shadow-card-elevated">
        <div className="relative w-14 h-14 mb-3">
          <div className="absolute inset-0 rounded-full border-2 border-gold-500/20" />
          <div
            className="absolute inset-0 rounded-full border-2 border-gold-400 border-t-transparent animate-spin"
            style={{ animationDuration: '0.8s' }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gold-400">
            {Math.round(progress)}%
          </div>
        </div>
        <p className="text-xs uppercase tracking-widest text-slate-300 font-semibold">
          Rendering 3D Experience...
        </p>
      </div>
    </Html>
  );
}
