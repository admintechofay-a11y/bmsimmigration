import React, { useEffect, useState } from 'react';

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[1000] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-electric-500 via-gold-400 to-gold-500 transition-all duration-75 shadow-[0_0_10px_rgba(212,164,74,0.6)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
