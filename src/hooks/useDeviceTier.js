import { useState, useEffect } from 'react';

/**
 * Custom hook to detect device capability tier based on hardware concurrency,
 * device memory, connection data-saver, prefers-reduced-motion, and WebGL availability.
 *
 * Tiers:
 * - Tier 0: Low-end / reduced motion / save-data / no WebGL -> No 3D Canvas mounted.
 * - Tier 1: Mid-tier mobile / tablet -> Max 1 scene at a time, lower particle count, basic materials.
 * - Tier 2: Desktop / high-end -> Full procedural scenes, dual scene concurrency.
 */
export function useDeviceTier() {
  const [tierState, setTierState] = useState(() => {
    // Initial safe SSR-friendly guess
    if (typeof window === 'undefined') {
      return {
        tier: 0,
        isTier0: true,
        isTier1: false,
        isTier2: false,
        canRenderWebGL: false,
        maxActiveScenes: 0,
        prefersReducedMotion: false,
      };
    }

    return evaluateDeviceTier();
  });

  useEffect(() => {
    const handleCheck = () => {
      setTierState(evaluateDeviceTier());
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', handleCheck);
    window.addEventListener('resize', handleCheck);

    return () => {
      mediaQuery.removeEventListener('change', handleCheck);
      window.removeEventListener('resize', handleCheck);
    };
  }, []);

  return tierState;
}

function evaluateDeviceTier() {
  if (typeof window === 'undefined') {
    return {
      tier: 0,
      isTier0: true,
      isTier1: false,
      isTier2: false,
      canRenderWebGL: false,
      maxActiveScenes: 0,
      prefersReducedMotion: false,
    };
  }

  // 1. Reduced Motion & Data Saver check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSaveData = Boolean(
    navigator.connection && (navigator.connection.saveData || navigator.connection.effectiveType === '2g')
  );

  // 2. Hardware metrics
  const cores = navigator.hardwareConcurrency || 4;
  // @ts-ignore
  const memory = navigator.deviceMemory || 4;
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.innerWidth < 1024;

  // 3. WebGL probe
  let hasWebGL = false;
  try {
    const canvas = document.createElement('canvas');
    hasWebGL = Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    hasWebGL = false;
  }

  // Tier 0: Low-end / reduced motion / save-data / no WebGL
  if (prefersReducedMotion || isSaveData || !hasWebGL || cores <= 2 || memory <= 2) {
    return {
      tier: 0,
      isTier0: true,
      isTier1: false,
      isTier2: false,
      canRenderWebGL: false,
      maxActiveScenes: 0,
      prefersReducedMotion,
    };
  }

  // Tier 1: Mid-tier mobile / tablet / moderate specs
  if (isTouch || cores <= 4 || memory <= 4 || window.innerWidth < 1024) {
    return {
      tier: 1,
      isTier0: false,
      isTier1: true,
      isTier2: false,
      canRenderWebGL: true,
      maxActiveScenes: 1,
      prefersReducedMotion: false,
    };
  }

  // Tier 2: Desktop / High-performance
  return {
    tier: 2,
    isTier0: false,
    isTier1: false,
    isTier2: true,
    canRenderWebGL: true,
    maxActiveScenes: 2,
    prefersReducedMotion: false,
  };
}

export default useDeviceTier;
