import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import {
  Vector3,
  BufferGeometry,
  Float32BufferAttribute,
  QuadraticBezierCurve3,
  DoubleSide,
} from 'three';
import FloatingAirplane from './FloatingAirplane';
import FloatingPassport from './FloatingPassport';
import Globe2DFallback from './Globe2DFallback';
import SceneViewport from './SceneViewport';
import {
  StudioLighting,
  ProceduralEnvironment,
  GroundContactShadow,
  CompassMini,
  GoldMaterial,
  NavyMaterial,
} from './common/SceneKit';

// Helper: Convert Lat/Long into 3D Cartesian coordinates on a sphere of radius R
function latLongToVector3(lat, lon, radius = 2.4) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new Vector3(x, y, z);
}

// Flight Arc with deterministic geometry disposal
function FlightArc({ startLat, startLon, endLat, endLon, color = '#C8921F', altitude = 1.35 }) {
  const arcPoints = useMemo(() => {
    const start = latLongToVector3(startLat, startLon, 2.4);
    const end = latLongToVector3(endLat, endLon, 2.4);

    const mid = new Vector3().addVectors(start, end).multiplyScalar(0.5);
    const distance = start.distanceTo(end);
    mid.normalize().multiplyScalar(2.4 + distance * 0.35 * altitude);

    const curve = new QuadraticBezierCurve3(start, mid, end);
    return curve.getPoints(36);
  }, [startLat, startLon, endLat, endLon, altitude]);

  const lineGeometry = useMemo(() => {
    return new BufferGeometry().setFromPoints(arcPoints);
  }, [arcPoints]);

  useEffect(() => {
    return () => {
      lineGeometry.dispose();
    };
  }, [lineGeometry]);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color={color} transparent opacity={0.8} linewidth={2} />
    </line>
  );
}

// Interactive Destination Pin with Beacon
function DestinationPin({ lat, lon, label, flag, isHQ = false }) {
  const [hovered, setHovered] = useState(false);
  const pos = useMemo(() => latLongToVector3(lat, lon, 2.42), [lat, lon]);

  return (
    <group position={pos}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[isHQ ? 0.085 : 0.065, 16, 16]} />
        <meshStandardMaterial
          color={isHQ ? '#C8921F' : hovered ? '#2F80ED' : '#C8921F'}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.075, 0.12, 24]} />
        <meshBasicMaterial
          color={isHQ ? '#C8921F' : hovered ? '#2F80ED' : '#0B1B3A'}
          transparent
          opacity={hovered ? 0.9 : 0.4}
          side={DoubleSide}
        />
      </mesh>

      {hovered && (
        <Html distanceFactor={8} position={[0, 0.25, 0]} center>
          <div className="bg-white/95 border border-slate-200 text-navy-950 text-xs px-3 py-1.5 rounded-xl shadow-card backdrop-blur-md whitespace-nowrap flex items-center gap-2 pointer-events-none">
            <span className="text-base">{flag}</span>
            <span className="font-bold text-navy-900">{label}</span>
          </div>
        </Html>
      )}
    </group>
  );
}

// 3D Globe with vertex shader / Points cap
function InteractiveGlobe() {
  const globeGroupRef = useRef();

  const particles = useMemo(() => {
    const coords = [];
    const count = 1500; // Efficient GPU budget
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const r = 2.42;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);
      coords.push(x, y, z);
    }
    const geom = new BufferGeometry();
    geom.setAttribute('position', new Float32BufferAttribute(coords, 3));
    return geom;
  }, []);

  useEffect(() => {
    return () => {
      particles.dispose();
    };
  }, [particles]);

  useFrame(({ clock }) => {
    if (!globeGroupRef.current) return;
    globeGroupRef.current.rotation.y = clock.getElapsedTime() * 0.06;
  });

  const india = { lat: 28.6, lon: 77.2 };
  const destinations = [
    { id: 'ca', label: 'Canada (Toronto)', flag: '🇨🇦', lat: 43.65, lon: -79.38, color: '#C8921F' },
    { id: 'uk', label: 'UK (London)', flag: '🇬🇧', lat: 51.5, lon: -0.12, color: '#2F80ED' },
    { id: 'us', label: 'USA (New York)', flag: '🇺🇸', lat: 40.71, lon: -74.0, color: '#C8921F' },
    { id: 'au', label: 'Australia (Sydney)', flag: '🇦🇺', lat: -33.86, lon: 151.2, color: '#2F80ED' },
    { id: 'de', label: 'Germany (Frankfurt)', flag: '🇩🇪', lat: 50.11, lon: 8.68, color: '#0EA5C6' },
  ];

  return (
    <group ref={globeGroupRef}>
      {/* Deep Navy Ocean Core */}
      <mesh>
        <sphereGeometry args={[2.4, 40, 40]} />
        <NavyMaterial roughness={0.35} metalness={0.25} />
      </mesh>

      {/* Subtle Longitudinal / Latitudinal Grid */}
      <mesh>
        <sphereGeometry args={[2.408, 24, 24]} />
        <meshBasicMaterial
          wireframe
          color="#2F80ED"
          transparent
          opacity={0.14}
        />
      </mesh>

      {/* Golden Equator Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.41, 2.425, 40]} />
        <meshBasicMaterial color="#C8921F" transparent opacity={0.4} side={DoubleSide} />
      </mesh>

      {/* Continental Gold Dot Points */}
      <points geometry={particles}>
        <pointsMaterial
          size={0.038}
          color="#C8921F"
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* India HQ */}
      <DestinationPin
        lat={india.lat}
        lon={india.lon}
        label="BMS Immigration (India HQ)"
        flag="🇮🇳"
        isHQ={true}
      />

      {/* 5 Flight Arcs & Pins to Canada, UK, USA, Australia, Germany */}
      {destinations.map((dest, idx) => (
        <React.Fragment key={dest.id}>
          <DestinationPin
            lat={dest.lat}
            lon={dest.lon}
            label={dest.label}
            flag={dest.flag}
          />
          <FlightArc
            startLat={india.lat}
            startLon={india.lon}
            endLat={dest.lat}
            endLon={dest.lon}
            color={dest.color}
            altitude={1.15 + idx * 0.08}
          />
        </React.Fragment>
      ))}

      {/* Golden procedural jet orbiting the globe */}
      <FloatingAirplane orbitRadius={3.0} speed={0.32} />
    </group>
  );
}

// Scene Root Container using SceneViewport for hard-budget WebGL management
export default function GlobeCanvas() {

  return (
    <div className="relative w-full h-[480px] lg:h-[540px] max-w-[580px] mx-auto flex items-center justify-center">
      {/* Soft warm/cool light background ambiance (no dark glowing circles) */}
      <div className="absolute w-[440px] h-[440px] rounded-full bg-blue-500/5 blur-[90px] pointer-events-none" />
      <div className="absolute w-[360px] h-[360px] rounded-full bg-amber-500/5 blur-[80px] pointer-events-none" />

      <SceneViewport
        sceneId="hero-globe"
        fallback={<Globe2DFallback />}
        camera={{ position: [0, 0.3, 7.5], fov: 42 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        controls={
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 3}
            dampingFactor={0.05}
          />
        }
      >
        <StudioLighting />
        <ProceduralEnvironment />

        <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.2}>
          {/* Scaled 18-20% smaller (0.60 vs 0.72) to provide generous whitespace */}
          <group scale={[0.59, 0.59, 0.59]} position={[0, 0.05, 0]}>
            <InteractiveGlobe />
            <FloatingPassport position={[2.0, -1.0, 1.0]} />
            {/* Small Navigation Compass Floating on Side */}
            <group position={[-2.2, -0.9, 0.8]} rotation={[0.4, 0.5, -0.2]}>
              <CompassMini scale={0.7} />
            </group>
          </group>
        </Float>

        {/* Baked Ground Contact Shadow for light theme grounded feel */}
        <GroundContactShadow position={[0, -2.1, 0]} opacity={0.32} scale={5.5} />
      </SceneViewport>
    </div>
  );
}
