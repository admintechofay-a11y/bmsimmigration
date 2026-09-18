import React, { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import FloatingAirplane from './FloatingAirplane';
import FloatingPassport from './FloatingPassport';
import CanvasLoader from './CanvasLoader';
import Globe2DFallback from './Globe2DFallback';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Helper: Convert Lat/Long into 3D Vector3 Cartesian coordinates on a sphere of radius R
function latLongToVector3(lat, lon, radius = 2.5) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Glowing Flight Arcs
function FlightArc({ startLat, startLon, endLat, endLon, color = '#F4C76A', altitude = 1.35 }) {
  const arcPoints = useMemo(() => {
    const start = latLongToVector3(startLat, startLon, 2.5);
    const end = latLongToVector3(endLat, endLon, 2.5);
    
    // Middle control point lifted outwards
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const distance = start.distanceTo(end);
    mid.normalize().multiplyScalar(2.5 + distance * 0.38 * altitude);

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve.getPoints(50);
  }, [startLat, startLon, endLat, endLon, altitude]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(arcPoints);
  }, [arcPoints]);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color={color} transparent opacity={0.85} linewidth={2} />
    </line>
  );
}

// Interactive Destination Pin with Beacon
function DestinationPin({ lat, lon, label, flag, isHQ = false }) {
  const [hovered, setHovered] = useState(false);
  const pos = useMemo(() => latLongToVector3(lat, lon, 2.52), [lat, lon]);

  return (
    <group position={pos}>
      {/* Pin head */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[isHQ ? 0.09 : 0.07, 16, 16]} />
        <meshStandardMaterial
          color={isHQ ? '#FDE047' : hovered ? '#60A5FA' : '#F4C76A'}
          emissive={isHQ ? '#D4A44A' : hovered ? '#2F80ED' : '#B8860B'}
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Pulsing Beacon Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.14, 32]} />
        <meshBasicMaterial
          color={isHQ ? '#FDE047' : '#D4A44A'}
          transparent
          opacity={hovered ? 0.9 : 0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Tooltip on Hover */}
      {hovered && (
        <Html distanceFactor={8} position={[0, 0.25, 0]} center>
          <div className="bg-navy-950/95 border border-gold-500/50 text-white text-xs px-3 py-1.5 rounded-xl shadow-gold-glow backdrop-blur-md whitespace-nowrap flex items-center gap-2 pointer-events-none">
            <span className="text-base">{flag}</span>
            <span className="font-bold text-gold-300">{label}</span>
          </div>
        </Html>
      )}
    </group>
  );
}

// 3D Globe Sphere + Continental Point Grid
function InteractiveGlobe() {
  const globeGroupRef = useRef();

  // Create dotted landmasses particle grid with realistic density
  const particles = useMemo(() => {
    const coords = [];
    const count = 2400;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      
      const r = 2.52;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);
      coords.push(x, y, z);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(coords, 3));
    return geom;
  }, []);

  // Smooth slow auto-rotation
  useFrame(({ clock }) => {
    if (!globeGroupRef.current) return;
    globeGroupRef.current.rotation.y = clock.getElapsedTime() * 0.08;
  });

  // Hub coordinates
  const india = { lat: 28.6, lon: 77.2 };
  const destinations = [
    { label: 'Canada (Toronto)', flag: '🇨🇦', lat: 43.65, lon: -79.38, color: '#F4C76A' },
    { label: 'UK (London)', flag: '🇬🇧', lat: 51.5, lon: -0.12, color: '#60A5FA' },
    { label: 'USA (New York)', flag: '🇺🇸', lat: 40.71, lon: -74.0, color: '#F4C76A' },
    { label: 'Australia (Sydney)', flag: '🇦🇺', lat: -33.86, lon: 151.2, color: '#60A5FA' },
    { label: 'Germany (Frankfurt)', flag: '🇩🇪', lat: 50.11, lon: 8.68, color: '#F4C76A' }
  ];

  return (
    <group ref={globeGroupRef}>
      {/* Oceanic Core Sphere with Rich Navy/Sapphire Glaze */}
      <mesh>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          color="#0B1838"
          emissive="#060F26"
          emissiveIntensity={0.5}
          roughness={0.4}
          metalness={0.4}
        />
      </mesh>

      {/* Latitude & Longitude Wireframe Grid */}
      <mesh>
        <sphereGeometry args={[2.508, 36, 36]} />
        <meshBasicMaterial
          wireframe
          color="#2F80ED"
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Golden Equator Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.512, 2.525, 64]} />
        <meshBasicMaterial color="#D4A44A" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* Atmospheric Outer Halo */}
      <mesh>
        <sphereGeometry args={[2.68, 48, 48]} />
        <meshStandardMaterial
          color="#2F80ED"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          roughness={1}
        />
      </mesh>

      {/* Continental Gold Dot Particles */}
      <points geometry={particles}>
        <pointsMaterial
          size={0.04}
          color="#F4C76A"
          transparent
          opacity={0.75}
          sizeAttenuation
        />
      </points>

      {/* Origin Hub: India (HQ) */}
      <DestinationPin
        lat={india.lat}
        lon={india.lon}
        label="BMS Immigration (India HQ)"
        flag="🇮🇳"
        isHQ={true}
      />

      {/* Flight Arcs and Destination Hubs */}
      {destinations.map((dest, idx) => (
        <React.Fragment key={idx}>
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
            altitude={1.2 + idx * 0.08}
          />
        </React.Fragment>
      ))}

      {/* Orbiting 3D Golden Aircraft */}
      <FloatingAirplane orbitRadius={3.2} speed={0.35} />
    </group>
  );
}

// Scene Root Container
export default function GlobeCanvas() {
  const { shouldReduceMotion } = useReducedMotion();
  const [hasWebGLError, setHasWebGLError] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGLError(true);
      }
    } catch {
      setHasWebGLError(true);
    }
  }, []);

  if (shouldReduceMotion || hasWebGLError) {
    return <Globe2DFallback />;
  }

  return (
    <div className="relative w-full h-[540px] lg:h-[620px] max-w-[680px] mx-auto flex items-center justify-center">
      {/* Background radial glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-electric-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute w-[380px] h-[380px] rounded-full bg-gold-500/15 blur-[100px] pointer-events-none" />

      <Canvas
        camera={{ position: [0, 1.0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[6, 4, 6]} intensity={2.5} color="#FFFFFF" />
        <pointLight position={[-5, -3, -5]} intensity={2.0} color="#2F80ED" />
        <pointLight position={[4, 5, 3]} intensity={2.2} color="#F4C76A" />

        <Suspense fallback={<CanvasLoader />}>
          <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.35}>
            <InteractiveGlobe />
            <FloatingPassport position={[2.5, -1.2, 1.0]} />
          </Float>
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 3}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
