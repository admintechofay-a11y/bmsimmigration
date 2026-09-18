import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function FloatingPassport({ position = [2.2, -1.2, 1.2] }) {
  const passportRef = useRef();

  useFrame(({ clock }) => {
    if (!passportRef.current) return;
    const t = clock.getElapsedTime();
    // Gentle bobbing and axial precession
    passportRef.current.position.y = position[1] + Math.sin(t * 1.8) * 0.15;
    passportRef.current.rotation.y = 0.4 + Math.sin(t * 0.8) * 0.2;
    passportRef.current.rotation.x = 0.2 + Math.cos(t * 1.2) * 0.1;
  });

  return (
    <group ref={passportRef} position={position} scale={[0.45, 0.45, 0.45]}>
      {/* Booklet Cover */}
      <mesh>
        <boxGeometry args={[1.5, 2.1, 0.12]} />
        <meshStandardMaterial
          color="#0B1536"
          metalness={0.4}
          roughness={0.5}
        />
      </mesh>

      {/* Golden Spine Accent */}
      <mesh position={[-0.72, 0, 0]}>
        <boxGeometry args={[0.08, 2.12, 0.13]} />
        <meshStandardMaterial
          color="#D4A44A"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Gold Embossed Emblem Crest on Cover */}
      <mesh position={[0, 0.2, 0.07]}>
        <cylinderGeometry args={[0.35, 0.35, 0.02, 32]} />
        <meshStandardMaterial
          color="#F4C76A"
          metalness={0.95}
          roughness={0.15}
          emissive="#D4A44A"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Gold Text Bar (PASSPORT) */}
      <mesh position={[0, -0.45, 0.07]}>
        <boxGeometry args={[0.8, 0.12, 0.02]} />
        <meshStandardMaterial color="#F4C76A" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Corner Gold Edge Protectors */}
      <mesh position={[0.7, 1.0, 0.06]}>
        <boxGeometry args={[0.1, 0.1, 0.04]} />
        <meshStandardMaterial color="#D4A44A" metalness={0.95} />
      </mesh>
      <mesh position={[0.7, -1.0, 0.06]}>
        <boxGeometry args={[0.1, 0.1, 0.04]} />
        <meshStandardMaterial color="#D4A44A" metalness={0.95} />
      </mesh>
    </group>
  );
}
