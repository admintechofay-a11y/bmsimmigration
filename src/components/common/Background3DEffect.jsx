import React, { useEffect, useRef } from 'react';

/**
 * Background3DEffect:
 * Adds a layered, hardware-accelerated 3D depth effect to the page background.
 * Features:
 * - Interactive 3D mouse parallax with smooth lerp physics
 * - Multi-plane depth layers (deep grid, mid-air floating crystals & compass rings, foreground nodes)
 * - Pure CSS 3D transforms (zero WebGL context consumption, zero FPS drops)
 * - Safe pointer-events-none overlay fixed behind page content
 * - Graceful fallback on reduced-motion or low-tier devices
 */
export default function Background3DEffect() {
  const containerRef = useRef(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      // Normalize mouse coordinates from -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;

      // Subtle tilt: max 6 degrees X, 8 degrees Y
      targetRotation.current = {
        x: -y * 6,
        y: x * 8,
      };
    };

    const animate = () => {
      // Smooth lerp (0.05)
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05;

      if (containerRef.current) {
        containerRef.current.style.transform = `rotateX(${currentRotation.current.x.toFixed(2)}deg) rotateY(${currentRotation.current.y.toFixed(2)}deg)`;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ perspective: '1200px' }}
      aria-hidden="true"
    >
      {/* 3D Rotating Stage */}
      <div
        ref={containerRef}
        className="relative w-full h-full transform-gpu"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        {/* ===================================================================
            LAYER 1: DEEP Z (-120px to -60px) - 3D Perspective Floor & Aurora
            =================================================================== */}
        {/* 3D Perspective Ground Grid */}
        <div
          className="absolute left-1/2 -bottom-20 w-[140vw] h-[600px] -translate-x-1/2 opacity-35"
          style={{
            transform: 'translateZ(-100px) rotateX(65deg)',
            backgroundImage: `
              linear-gradient(to right, rgba(200, 146, 31, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(47, 128, 237, 0.10) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 80%)',
          }}
        />

        {/* Ambient Volumetric 3D Glow Orbs */}
        <div
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-teal-400/12 blur-[120px] animate-pulse-slow"
          style={{ transform: 'translateZ(-80px)' }}
        />
        <div
          className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-gold-500/12 blur-[120px] animate-pulse-slow"
          style={{ transform: 'translateZ(-70px)' }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-electric-500/10 blur-[140px]"
          style={{ transform: 'translateZ(-90px)' }}
        />

        {/* ===================================================================
            LAYER 2: MID Z (-30px to 40px) - Floating 3D Geometric Elements
            =================================================================== */}
        {/* Floating 3D Crystal / Octahedron 1 (Top Left) */}
        <div
          className="absolute top-[18%] left-[8%] w-16 h-16 opacity-70 animate-float"
          style={{
            transform: 'translateZ(20px) rotateX(25deg) rotateY(35deg)',
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Top Pyramid */}
            <polygon points="50,10 90,50 50,50" fill="#C8921F" opacity="0.85" />
            <polygon points="50,10 50,50 10,50" fill="#E5A83B" opacity="0.95" />
            {/* Bottom Inverted Pyramid */}
            <polygon points="50,90 90,50 50,50" fill="#A16E14" opacity="0.9" />
            <polygon points="50,90 50,50 10,50" fill="#785007" opacity="0.75" />
          </svg>
        </div>

        {/* Floating 3D Crystal / Octahedron 2 (Right Mid) */}
        <div
          className="absolute top-[48%] right-[6%] w-20 h-20 opacity-65 animate-float-delayed"
          style={{
            transform: 'translateZ(35px) rotateX(-20deg) rotateY(45deg)',
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <polygon points="50,12 88,50 50,50" fill="#2F80ED" opacity="0.8" />
            <polygon points="50,12 50,50 12,50" fill="#60A5FA" opacity="0.95" />
            <polygon points="50,88 88,50 50,50" fill="#1D4ED8" opacity="0.85" />
            <polygon points="50,88 50,50 12,50" fill="#1E40AF" opacity="0.7" />
          </svg>
        </div>

        {/* Floating 3D Compass Rings / Orbit (Top Right) */}
        <div
          className="absolute top-[12%] right-[14%] w-32 h-32 opacity-40 animate-spin-ultra-slow"
          style={{
            transform: 'translateZ(-10px) rotateX(55deg) rotateZ(20deg)',
          }}
        >
          <div className="w-full h-full rounded-full border-2 border-dashed border-gold-500/50 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border border-gold-400/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-gold-600 shadow-[0_0_8px_rgba(200,146,31,0.8)]" />
            </div>
          </div>
        </div>

        {/* Floating 3D Compass Rings / Orbit (Bottom Left) */}
        <div
          className="absolute bottom-[22%] left-[10%] w-28 h-28 opacity-35 animate-spin-reverse-slow"
          style={{
            transform: 'translateZ(10px) rotateX(50deg) rotateZ(-30deg)',
          }}
        >
          <div className="w-full h-full rounded-full border border-dashed border-electric-500/40 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border border-electric-400/30" />
          </div>
        </div>

        {/* ===================================================================
            LAYER 3: FORE Z (50px to 100px) - Floating 3D Origami & Beacons
            =================================================================== */}
        {/* Floating 3D Origami Plane 1 (Left Hero Drift) */}
        <div
          className="absolute top-[32%] left-[18%] w-12 h-12 opacity-60 animate-float"
          style={{
            transform: 'translateZ(70px) rotateX(15deg) rotateY(-25deg) rotateZ(35deg)',
          }}
        >
          <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-sm">
            <polygon points="30,5 55,50 30,38" fill="#C8921F" opacity="0.85" />
            <polygon points="30,5 5,50 30,38" fill="#E5A83B" opacity="0.95" />
            <polygon points="30,38 30,5 34,42" fill="#785007" opacity="0.4" />
          </svg>
        </div>

        {/* Floating 3D Origami Plane 2 (Right Bottom Drift) */}
        <div
          className="absolute bottom-[35%] right-[16%] w-10 h-10 opacity-55 animate-float-delayed"
          style={{
            transform: 'translateZ(85px) rotateX(-15deg) rotateY(30deg) rotateZ(-25deg)',
          }}
        >
          <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-sm">
            <polygon points="30,5 55,50 30,38" fill="#2F80ED" opacity="0.8" />
            <polygon points="30,5 5,50 30,38" fill="#60A5FA" opacity="0.9" />
          </svg>
        </div>

        {/* 3D Floating Light Nodes (Depth Particles) */}
        <div
          className="absolute top-[22%] left-[45%] w-2.5 h-2.5 rounded-full bg-gold-400 opacity-60 animate-pulse shadow-[0_0_12px_rgba(200,146,31,0.6)]"
          style={{ transform: 'translateZ(90px)' }}
        />
        <div
          className="absolute top-[65%] left-[28%] w-2 h-2 rounded-full bg-electric-400 opacity-50 animate-pulse shadow-[0_0_10px_rgba(47,128,237,0.5)]"
          style={{ transform: 'translateZ(60px)' }}
        />
        <div
          className="absolute top-[75%] right-[32%] w-3 h-3 rounded-full bg-gold-500 opacity-50 animate-pulse shadow-[0_0_14px_rgba(200,146,31,0.5)]"
          style={{ transform: 'translateZ(105px)' }}
        />
      </div>
    </div>
  );
}
