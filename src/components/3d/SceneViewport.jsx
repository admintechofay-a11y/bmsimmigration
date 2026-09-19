import React, { useRef, useState, useEffect, Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import { useDeviceTier } from '../../hooks/useDeviceTier';
import { sceneManager } from './SceneManager';
import CanvasLoader from './CanvasLoader';
import ErrorBoundary3D from '../common/ErrorBoundary3D';
import { StudioLighting, ProceduralEnvironment, GroundContactShadow } from './common/SceneKit';

/**
 * SceneViewport encapsulates the hard-budget WebGL runtime:
 * - Device Tier gate: Tier 0 bypasses WebGL entirely (renders 2D fallback).
 * - IntersectionObserver: mounts only within 1 viewport (rootMargin: '100% 0px').
 * - SceneManager: guarantees at most 2 live scenes on Tier 2, 1 on Tier 1.
 * - Auto-disposes WebGL canvas when scrolled out of range.
 * - Drei PerformanceMonitor + AdaptiveDpr: steps down DPR under 50 FPS.
 * - Aurora Light Studio Lighting & Procedural Lightformer Environment (0 CDN HDR downloads).
 * - Grounded baked ContactShadows.
 */
export default function SceneViewport({
  sceneId,
  children,
  fallback = null,
  camera = { position: [0, 0, 5], fov: 45 },
  className = 'w-full h-full',
  frameloop = 'always',
  controls = null,
  withEnvironment = true,
  withLighting = true,
  withShadow = true,
  shadowPosition = [0, -0.95, 0],
}) {
  const containerRef = useRef(null);
  const { tier, isTier0, maxActiveScenes } = useDeviceTier();
  const [isInViewportRange, setIsInViewportRange] = useState(false);
  const [isScenePermitted, setIsScenePermitted] = useState(false);
  const [dpr, setDpr] = useState([1, 1.5]);

  // 1. Viewport observer (within 1 viewport = 100% margin)
  useEffect(() => {
    if (isTier0 || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewportRange(entry.isIntersecting);
      },
      { rootMargin: '100% 0px', threshold: 0.01 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isTier0]);

  // 2. Scene registration with global sceneManager
  useEffect(() => {
    if (isTier0) return;

    if (isInViewportRange) {
      sceneManager.register(sceneId, maxActiveScenes);
    } else {
      sceneManager.unregister(sceneId);
    }

    const unsubscribe = sceneManager.subscribe((activeSet) => {
      setIsScenePermitted(activeSet.has(sceneId));
    });

    setIsScenePermitted(sceneManager.isActive(sceneId));

    return () => {
      sceneManager.unregister(sceneId);
      unsubscribe();
    };
  }, [isInViewportRange, sceneId, maxActiveScenes, isTier0]);

  // Handle performance drop below 50 FPS
  const handlePerformanceDecline = useCallback(() => {
    setDpr([1, 1]);
  }, []);

  const handlePerformanceIncline = useCallback(() => {
    setDpr([1, 1.5]);
  }, []);

  // If Tier 0, immediately output fallback without touching Three.js
  if (isTier0) {
    return (
      <div ref={containerRef} className={className}>
        {fallback}
      </div>
    );
  }

  const shouldRenderCanvas = isInViewportRange && isScenePermitted;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {shouldRenderCanvas ? (
        <ErrorBoundary3D fallback={fallback}>
          <Canvas
            camera={camera}
            dpr={dpr}
            frameloop={frameloop}
            gl={{
              antialias: false,
              alpha: true,
              powerPreference: 'high-performance',
              preserveDrawingBuffer: false,
            }}
            onCreated={({ gl }) => {
              // Ensure clean canvas background
              gl.setClearColor(0x000000, 0);
            }}
            className="w-full h-full"
          >
            <PerformanceMonitor
              onDecline={handlePerformanceDecline}
              onIncline={handlePerformanceIncline}
              flipflops={3}
              bounds={(fps) => (fps < 50 ? [0, 0.5] : [0.5, 1])}
            />
            <AdaptiveDpr pixelated />
            <Suspense fallback={<CanvasLoader />}>
              {withLighting && <StudioLighting />}
              {withEnvironment && <ProceduralEnvironment />}
              {children}
              {withShadow && <GroundContactShadow position={shadowPosition} />}
              {controls}
            </Suspense>
          </Canvas>
        </ErrorBoundary3D>
      ) : (
        fallback
      )}
    </div>
  );
}
