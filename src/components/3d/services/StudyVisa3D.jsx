import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import {
  NormalizedFrame,
  GoldMaterial,
  NavyMaterial,
  ElectricBlueMaterial,
  PaperMaterial,
  UniversityBuilding,
  ScoreCard,
} from '../common/SceneKit';

export default function StudyVisa3D() {
  const groupRef = useRef();
  const capRef = useRef();
  const scoreCardRef = useRef();
  const bookRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Gentle floating and axial swing
    if (capRef.current) {
      capRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
      capRef.current.position.y = 0.65 + Math.sin(t * 1.2) * 0.05;
    }

    if (scoreCardRef.current) {
      scoreCardRef.current.position.y = -0.2 + Math.cos(t * 1.1) * 0.04;
      scoreCardRef.current.rotation.y = -0.35 + Math.sin(t * 0.7) * 0.1;
    }

    if (bookRef.current) {
      const angle = t * 0.8;
      bookRef.current.position.set(
        Math.cos(angle) * 1.4,
        Math.sin(t * 1.3) * 0.15 + 0.1,
        Math.sin(angle) * 1.4
      );
      bookRef.current.rotation.y = -angle + Math.PI / 2;
    }
  });

  return (
    <NormalizedFrame scale={0.72} position={[0, -0.05, 0]}>
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.25}>
        <group ref={groupRef}>
          {/* 1. Classical University Portico with Columns & Dome */}
          <UniversityBuilding position={[-0.45, -0.3, -0.2]} scale={0.88} />

          {/* 2. Official IELTS / PTE Score Card Badge */}
          <group ref={scoreCardRef} position={[0.72, 0.05, 0.35]} rotation={[0.05, -0.3, 0.08]}>
            <ScoreCard scale={0.75} />
          </group>

          {/* 3. Floating Graduation Mortarboard */}
          <group ref={capRef} position={[0.05, 0.65, 0.25]} rotation={[0.12, 0.2, -0.05]}>
            {/* Diamond Board */}
            <mesh rotation={[0, Math.PI / 4, 0]}>
              <boxGeometry args={[1.3, 0.05, 1.3]} />
              <NavyMaterial />
            </mesh>
            {/* Gold Edge Border */}
            <mesh position={[0, -0.005, 0]} rotation={[0, Math.PI / 4, 0]}>
              <boxGeometry args={[1.33, 0.015, 1.33]} />
              <GoldMaterial />
            </mesh>
            {/* Skullcap Underneath */}
            <mesh position={[0, -0.2, 0]}>
              <cylinderGeometry args={[0.42, 0.5, 0.38, 24]} />
              <NavyMaterial />
            </mesh>
            {/* Center Gold Button */}
            <mesh position={[0, 0.04, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.03, 20]} />
              <GoldMaterial />
            </mesh>
            {/* Gold Tassel Ribbon & Fringe */}
            <mesh position={[0.32, -0.12, 0.32]} rotation={[0.15, 0, -0.35]}>
              <cylinderGeometry args={[0.012, 0.012, 0.6, 12]} />
              <GoldMaterial />
            </mesh>
            <mesh position={[0.5, -0.36, 0.5]}>
              <cylinderGeometry args={[0.045, 0.02, 0.2, 16]} />
              <GoldMaterial />
            </mesh>
          </group>

          {/* 4. Orbiting Textbook (Gold/Blue) */}
          <group ref={bookRef}>
            <mesh>
              <boxGeometry args={[0.55, 0.78, 0.12]} />
              <ElectricBlueMaterial />
            </mesh>
            <mesh position={[0.03, 0, 0]}>
              <boxGeometry args={[0.5, 0.72, 0.09]} />
              <PaperMaterial />
            </mesh>
            <mesh position={[-0.26, 0, 0]}>
              <boxGeometry args={[0.03, 0.79, 0.13]} />
              <GoldMaterial />
            </mesh>
          </group>
        </group>
      </Float>
    </NormalizedFrame>
  );
}
