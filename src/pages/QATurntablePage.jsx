import React, { useState, useRef, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import {
  StudioLighting,
  ProceduralEnvironment,
  GroundContactShadow,
  LandmarkCNTower,
  LandmarkBigBen,
  LandmarkCapitolDome,
  LandmarkOperaHouse,
  LandmarkBrandenburgGate,
  NormalizedFrame,
} from '../components/3d/common/SceneKit';

import StudyVisa3D from '../components/3d/services/StudyVisa3D';
import TouristVisa3D from '../components/3d/services/TouristVisa3D';
import SOPDoc3D from '../components/3d/services/SOPDoc3D';
import RefusalCases3D from '../components/3d/services/RefusalCases3D';
import InsideCanada3D from '../components/3d/services/InsideCanada3D';
import OfferLetter3D from '../components/3d/services/OfferLetter3D';
import GlobeCanvas from '../components/3d/GlobeCanvas';

const OBJECT_REGISTRY = [
  { id: 'study-visa', label: 'Study Visa (University + ScoreCard + Mortarboard + Book)', component: StudyVisa3D, vertices: '~1,850' },
  { id: 'tourist-visa', label: 'Tourist Visa (Window + Camera + Curved Flight Map + Case)', component: TouristVisa3D, vertices: '~1,720' },
  { id: 'sop-doc', label: 'Documentation (Clipboard + Bank Statement + Coins + Pen)', component: SOPDoc3D, vertices: '~1,640' },
  { id: 'refusal-cases', label: 'Refusal Cases (Shield + Gavel + Re-apply Arrows + Padlock)', component: RefusalCases3D, vertices: '~1,910' },
  { id: 'inside-canada', label: 'Inside Canada (Gold Maple Leaf + Work Permit ID + Halo)', component: InsideCanada3D, vertices: '~1,480' },
  { id: 'offer-letter', label: 'Offer Letters (Envelope + Acceptance + Rolled Certificate + Wax Seal)', component: OfferLetter3D, vertices: '~1,560' },
  { id: 'hero-globe', label: 'Hero Globe (Globe + Arcs + Pins + Jet + Passport + Compass)', component: GlobeCanvas, isCanvasItself: true, vertices: '~3,400' },
  { id: 'landmark-canada', label: 'Landmark Canada (CN Tower + Needle)', component: () => <NormalizedFrame scale={0.75}><LandmarkCNTower /></NormalizedFrame>, vertices: '~680' },
  { id: 'landmark-uk', label: 'Landmark UK (Big Ben Elizabeth Tower)', component: () => <NormalizedFrame scale={0.75}><LandmarkBigBen /></NormalizedFrame>, vertices: '~820' },
  { id: 'landmark-usa', label: 'Landmark USA (US Capitol Rotunda Dome)', component: () => <NormalizedFrame scale={0.75}><LandmarkCapitolDome /></NormalizedFrame>, vertices: '~940' },
  { id: 'landmark-australia', label: 'Landmark Australia (Sydney Opera House Shells)', component: () => <NormalizedFrame scale={0.75}><LandmarkOperaHouse /></NormalizedFrame>, vertices: '~860' },
  { id: 'landmark-germany', label: 'Landmark Germany (Brandenburg Gate Colonade)', component: () => <NormalizedFrame scale={0.75}><LandmarkBrandenburgGate /></NormalizedFrame>, vertices: '~920' },
];

const CAMERA_ANGLES = {
  front: [0, 0, 3.8],
  three_quarter: [2.6, 1.7, 2.6],
  side: [3.8, 0, 0],
  top: [0.01, 3.8, 0.01],
};

function CameraController({ angle, autoRotate }) {
  const { camera } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    const targetPos = CAMERA_ANGLES[angle] || CAMERA_ANGLES.front;
    camera.position.set(...targetPos);
    camera.lookAt(0, 0, 0);
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [angle, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      autoRotate={autoRotate}
      autoRotateSpeed={1.8}
      enableDamping
      dampingFactor={0.08}
    />
  );
}

export default function QATurntablePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentObjectId = searchParams.get('object') || 'study-visa';
  const currentAngle = searchParams.get('angle') || 'front';
  const autoRotate = searchParams.get('autorotate') === 'true';
  const [wireframe, setWireframe] = useState(false);

  const currentObj = useMemo(
    () => OBJECT_REGISTRY.find((o) => o.id === currentObjectId) || OBJECT_REGISTRY[0],
    [currentObjectId]
  );

  const updateParam = (key, val) => {
    const next = new URLSearchParams(searchParams);
    next.set(key, val);
    setSearchParams(next);
  };

  const ObjectComponent = currentObj.component;

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#0B1B3A] font-sans pt-20 pb-16 px-4 md:px-8">
      {/* Header Toolbar */}
      <div className="max-w-7xl mx-auto mb-6 bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-[#E3EAF5] shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E3EAF5] pb-4 mb-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-electric-blue/10 text-electric-blue">
                Dev Tooling
              </span>
              <h1 className="text-2xl font-display font-extrabold text-[#0B1B3A]">
                3D Object Visual QA & Turntable
              </h1>
            </div>
            <p className="text-sm text-[#4A5B78] mt-1">
              Automated visual inspection across 4 cardinal angles on Aurora Light background (#F7F9FC).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 bg-green-50 text-green-700 rounded-lg border border-green-200">
              Active Object: {currentObj.id}
            </span>
            <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
              Vertices: {currentObj.vertices}
            </span>
          </div>
        </div>

        {/* Object Selectors */}
        <div className="flex flex-wrap gap-2 mb-4">
          {OBJECT_REGISTRY.map((obj) => {
            const isActive = obj.id === currentObjectId;
            return (
              <button
                key={obj.id}
                id={`qa-select-${obj.id}`}
                onClick={() => updateParam('object', obj.id)}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
                  isActive
                    ? 'bg-[#0B1B3A] text-white shadow-md'
                    : 'bg-[#EEF3FB] text-[#0B1B3A] hover:bg-slate-200'
                }`}
              >
                {obj.id}
              </button>
            );
          })}
        </div>

        {/* Angle Selectors & Camera Options */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#E3EAF5]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#4A5B78] mr-2">CAMERA ANGLE:</span>
            {['front', 'three_quarter', 'side', 'top'].map((ang) => {
              const isActive = currentAngle === ang;
              return (
                <button
                  key={ang}
                  id={`qa-angle-${ang}`}
                  onClick={() => updateParam('angle', ang)}
                  className={`text-xs px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${
                    isActive
                      ? 'bg-electric-blue text-white shadow-sm'
                      : 'bg-white text-[#4A5B78] border border-[#E3EAF5] hover:bg-slate-50'
                  }`}
                >
                  {ang.replace('_', ' ')}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer text-[#4A5B78]">
              <input
                type="checkbox"
                checked={autoRotate}
                onChange={(e) => updateParam('autorotate', e.target.checked ? 'true' : 'false')}
                className="rounded text-electric-blue focus:ring-0"
              />
              Auto Turntable
            </label>
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer text-[#4A5B78]">
              <input
                type="checkbox"
                checked={wireframe}
                onChange={(e) => setWireframe(e.target.checked)}
                className="rounded text-electric-blue focus:ring-0"
              />
              Wireframe
            </label>
          </div>
        </div>
      </div>

      {/* Main Turntable Viewport Stage */}
      <div className="max-w-7xl mx-auto">
        <div
          id="qa-canvas-stage"
          className="relative w-full h-[620px] rounded-3xl bg-[#F7F9FC] border border-[#E3EAF5] shadow-card overflow-hidden flex items-center justify-center"
        >
          {/* Subtle Stage Grid markings for alignment QA */}
          <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Alignment Crosshairs (for pivot centering QA) */}
          <div className="absolute w-px h-full bg-slate-300/40 pointer-events-none" />
          <div className="absolute h-px w-full bg-slate-300/40 pointer-events-none" />

          {/* Angle & Object Overlay Badge */}
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#E3EAF5] shadow-sm text-xs space-y-0.5">
            <div className="font-bold text-[#0B1B3A]">{currentObj.label}</div>
            <div className="text-[#4A5B78] flex items-center gap-2">
              <span>Angle: <strong className="text-electric-blue uppercase">{currentAngle}</strong></span>
              <span>•</span>
              <span>Normalized 0.75 Box</span>
            </div>
          </div>

          {/* 3D Canvas Context */}
          {currentObj.isCanvasItself ? (
            <div className="w-full h-full flex items-center justify-center p-8">
              <ObjectComponent />
            </div>
          ) : (
            <Canvas
              id="qa-turntable-canvas"
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              camera={{ position: CAMERA_ANGLES[currentAngle] || CAMERA_ANGLES.front, fov: 42 }}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            >
              <Suspense fallback={null}>
                <StudioLighting />
                <ProceduralEnvironment />
                <CameraController angle={currentAngle} autoRotate={autoRotate} />

                {/* Object with normalized centered pivot */}
                <group position={[0, 0, 0]}>
                  <ObjectComponent />
                </group>

                {/* Baked Ground Contact Shadow */}
                <GroundContactShadow position={[0, -1.0, 0]} opacity={0.35} scale={4.2} />
              </Suspense>
            </Canvas>
          )}
        </div>

        {/* Visual QA Scoring Criteria Matrix */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-[#E3EAF5] shadow-card">
            <h3 className="font-bold text-sm text-[#0B1B3A] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              1. Geometry & Pivot Integrity
            </h3>
            <ul className="text-xs text-[#4A5B78] space-y-1.5 list-disc list-inside">
              <li>No z-fighting between planes (offset &gt; 0.01)</li>
              <li>Pivot mathematically centered at [0, 0, 0]</li>
              <li>Smooth curves: curveSegments 24+, bevelSegments 3+</li>
              <li>No faceted circles on cylindrical components</li>
            </ul>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E3EAF5] shadow-card">
            <h3 className="font-bold text-sm text-[#0B1B3A] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              2. Aurora Light Material Family
            </h3>
            <ul className="text-xs text-[#4A5B78] space-y-1.5 list-disc list-inside">
              <li>Rich Gold: #C8921F (darker for high white contrast)</li>
              <li>Deep Ink Navy: #0B1B3A</li>
              <li>Frosted transmission glass on Desktop (opaque fallback on mobile)</li>
              <li>Baked ContactShadows (frames=1) under every object</li>
            </ul>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E3EAF5] shadow-card">
            <h3 className="font-bold text-sm text-[#0B1B3A] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              3. Size &amp; Framing Norms
            </h3>
            <ul className="text-xs text-[#4A5B78] space-y-1.5 list-disc list-inside">
              <li>Scaled inside 1-unit bounding box with 12% padding</li>
              <li>SCENE_SCALE = 0.75 global reduction</li>
              <li>Zero boundary clipping or viewport overflows</li>
              <li>Distinct, recognizable silhouette from all 4 angles</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
