import React, { useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function TiltCard({ children, className = '', maxTilt = 12, glare = true }) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const { shouldReduceMotion } = useReducedMotion();

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`);

    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      setGlarePosition({ x: glareX, y: glareY, opacity: 0.18 });
    }
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)');
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden tilt-card ${className}`}
    >
      {/* Specular Glare Effect */}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-20"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(212, 164, 74, ${glarePosition.opacity}), transparent 65%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
