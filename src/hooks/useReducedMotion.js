import { useState, useEffect } from 'react';

/**
 * Custom hook to detect user preference for reduced motion or low-capability devices
 */
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);

    const listener = (event) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener('change', listener);

    // Check device width / mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      mediaQuery.removeEventListener('change', listener);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return {
    prefersReduced,
    isMobile,
    shouldReduceMotion: prefersReduced
  };
}
