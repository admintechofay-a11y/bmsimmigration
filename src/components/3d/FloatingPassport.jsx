import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { GoldMaterial, NavyMaterial, PaperMaterial } from './common/SceneKit';

export default function FloatingPassport({ position = [1.8, -0.9, 0.9] }) {
  const passportRef = useRef();

  useFrame(({ clock }) => {
    if (!passportRef.current) return;
    const t = clock.getElapsedTime();
    // Gentle floating and precession
    passportRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.1;
    passportRef.current.rotation.y = 0.35 + Math.sin(t * 0.7) * 0.15;
    passportRef.current.rotation.x = 0.18 + Math.cos(t * 1.1) * 0.08;
  });

  // Rescaled 18% smaller per specifications
  return (
    <group ref={passportRef} position={position} scale={[0.36, 0.36, 0.36]}>
      {/* Deep Navy Booklet Cover */}
      <mesh>
        <boxGeometry args={[1.4, 2.0, 0.1]} />
        <NavyMaterial />
      </mesh>

      {/* White Paper Page Trims on Edge */}
      <mesh position={[0.04, 0, 0]}>
        <boxGeometry args={[1.32, 1.94, 0.09]} />
        <PaperMaterial />
      </mesh>

      {/* Gold Foil Spine Accent */}
      <mesh position={[-0.67, 0, 0]}>
        <boxGeometry args={[0.07, 2.02, 0.11]} />
        <GoldMaterial />
      </mesh>

      {/* Gold Embossed Emblem Crest */}
      <mesh position={[0, 0.22, 0.058]}>
        <cylinderGeometry args={[0.32, 0.32, 0.02, 28]} />
        <GoldMaterial />
      </mesh>

      {/* Gold Text Bar (PASSPORT) */}
      <mesh position={[0, -0.42, 0.058]}>
        <boxGeometry args={[0.75, 0.11, 0.015]} />
        <GoldMaterial />
      </mesh>

      {/* Corner Gold Edge Protectors */}
      <mesh position={[0.65, 0.95, 0.05]}>
        <boxGeometry args={[0.09, 0.09, 0.03]} />
        <GoldMaterial />
      </mesh>
      <mesh position={[0.65, -0.95, 0.05]}>
        <boxGeometry args={[0.09, 0.09, 0.03]} />
        <GoldMaterial />
      </mesh>
    </group>
  );
}
