import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import {
  NormalizedFrame,
  GoldMaterial,
  NavyMaterial,
  PaperMaterial,
  RolledCertificate,
} from '../common/SceneKit';

export default function OfferLetter3D() {
  const [isOpen, setIsOpen] = useState(false);
  const flapRef = useRef();
  const letterRef = useRef();
  const sealRef = useRef();
  const scrollRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Flap opens backwards
    if (flapRef.current) {
      const targetRotX = isOpen ? -Math.PI * 0.8 : 0;
      flapRef.current.rotation.x += (targetRotX - flapRef.current.rotation.x) * 0.1;
    }

    // Letter slides upward out of envelope
    if (letterRef.current) {
      const targetY = isOpen ? 0.55 : 0.05;
      letterRef.current.position.y += (targetY - letterRef.current.position.y) * 0.08;
    }

    // Wax seal shifts with flap
    if (sealRef.current) {
      const targetY = isOpen ? 0.45 : 0;
      sealRef.current.position.y += (targetY - sealRef.current.position.y) * 0.1;
    }

    // Floating rolled certificate bobbing
    if (scrollRef.current) {
      scrollRef.current.position.y = 0.2 + Math.sin(t * 1.2) * 0.04;
      scrollRef.current.rotation.y = 0.3 + Math.sin(t * 0.6) * 0.1;
    }
  });

  return (
    <NormalizedFrame scale={0.72} position={[0, -0.05, 0]}>
      <group
        onPointerOver={() => setIsOpen(true)}
        onPointerOut={() => setIsOpen(false)}
        className="cursor-pointer"
      >
        <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.22}>
          {/* 1. Classical Admission Envelope Base */}
          <group position={[-0.2, -0.2, -0.15]}>
            {/* Back Wall */}
            <mesh position={[0, 0, -0.04]}>
              <boxGeometry args={[1.5, 1.0, 0.02]} />
              <NavyMaterial />
            </mesh>

            {/* Front Pocket */}
            <mesh position={[0, -0.08, 0.04]}>
              <boxGeometry args={[1.5, 0.84, 0.02]} />
              <NavyMaterial />
            </mesh>

            {/* Golden Trim on Envelope Rim */}
            <mesh position={[0, 0.34, 0.05]}>
              <boxGeometry args={[1.52, 0.025, 0.01]} />
              <GoldMaterial />
            </mesh>
          </group>

          {/* 2. Official Acceptance Letter Inside */}
          <group ref={letterRef} position={[-0.2, 0.05, -0.15]}>
            <mesh>
              <boxGeometry args={[1.32, 1.2, 0.015]} />
              <PaperMaterial />
            </mesh>

            {/* University Letterhead Header */}
            <mesh position={[0, 0.46, 0.01]}>
              <boxGeometry args={[1.05, 0.08, 0.005]} />
              <GoldMaterial />
            </mesh>

            {/* Acceptance Monogram / Crest */}
            <mesh position={[0, 0.3, 0.01]}>
              <cylinderGeometry args={[0.075, 0.075, 0.005, 16]} />
              <meshStandardMaterial color="#2F80ED" />
            </mesh>

            {/* Simulated Acceptance Lines */}
            {[-0.25, -0.12, 0.02, 0.14].map((y, i) => (
              <mesh key={i} position={[0, y, 0.01]}>
                <boxGeometry args={[i % 2 === 0 ? 1.05 : 0.85, 0.02, 0.004]} />
                <meshStandardMaterial color="#4A5B78" roughness={0.6} />
              </mesh>
            ))}
          </group>

          {/* 3. Envelope Top Flap Hinged at Top */}
          <group position={[-0.2, 0.3, -0.11]}>
            <group ref={flapRef}>
              <mesh position={[0, -0.3, 0]} rotation={[0, 0, Math.PI]}>
                <coneGeometry args={[0.75, 0.55, 3]} />
                <NavyMaterial />
              </mesh>
            </group>
          </group>

          {/* 4. Wax Seal with Monogram */}
          <group ref={sealRef} position={[-0.2, 0.0, -0.07]}>
            <mesh>
              <cylinderGeometry args={[0.18, 0.18, 0.035, 24]} />
              <meshStandardMaterial color="#B91C1C" roughness={0.4} metalness={0.4} />
            </mesh>
            <mesh position={[0, 0, 0.02]}>
              <cylinderGeometry args={[0.11, 0.11, 0.005, 20]} />
              <GoldMaterial />
            </mesh>
          </group>

          {/* 5. Rolled Official Certificate with Gold Ribbon & Hanging Seal */}
          <group ref={scrollRef} position={[0.55, 0.18, 0.32]} rotation={[-0.1, -0.35, 0.4]}>
            <RolledCertificate scale={0.9} />
          </group>
        </Float>
      </group>
    </NormalizedFrame>
  );
}
