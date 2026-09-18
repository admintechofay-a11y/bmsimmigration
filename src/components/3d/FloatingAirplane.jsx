import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingAirplane({ orbitRadius = 3.6, speed = 0.4 }) {
  const planeRef = useRef();

  useFrame(({ clock }) => {
    if (!planeRef.current) return;
    const t = clock.getElapsedTime() * speed;
    
    // Orbital path around the globe
    const x = Math.sin(t) * orbitRadius;
    const z = Math.cos(t) * orbitRadius;
    const y = Math.sin(t * 1.5) * 0.8;

    planeRef.current.position.set(x, y, z);

    // Orient plane to face trajectory with banking angle
    const nextX = Math.sin(t + 0.05) * orbitRadius;
    const nextZ = Math.cos(t + 0.05) * orbitRadius;
    const nextY = Math.sin((t + 0.05) * 1.5) * 0.8;

    planeRef.current.lookAt(nextX, nextY, nextZ);
    planeRef.current.rotateZ(0.25); // Subtle banking turn
  });

  return (
    <group ref={planeRef} scale={[0.18, 0.18, 0.18]}>
      {/* Fuselage */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.15, 3.2, 16]} />
        <meshStandardMaterial
          color="#F4C76A"
          metalness={0.9}
          roughness={0.2}
          emissive="#D4A44A"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Cockpit Glass */}
      <mesh position={[0, 0.16, 0.9]}>
        <boxGeometry args={[0.28, 0.18, 0.5]} />
        <meshStandardMaterial color="#2F80ED" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Main Wings */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.2, 0.06, 0.8]} />
        <meshStandardMaterial
          color="#D4A44A"
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* Wingtip Gold Lights */}
      <mesh position={[-2.1, 0, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#2F80ED" />
      </mesh>
      <mesh position={[2.1, 0, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#F4C76A" />
      </mesh>

      {/* Tail Fin */}
      <mesh position={[0, 0.55, -1.2]} rotation={[-0.35, 0, 0]}>
        <boxGeometry args={[0.08, 1.0, 0.6]} />
        <meshStandardMaterial color="#B8860B" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Horizontal Stabilizers */}
      <mesh position={[0, 0.1, -1.3]}>
        <boxGeometry args={[1.5, 0.05, 0.45]} />
        <meshStandardMaterial color="#D4A44A" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Engine Exhaust Jet Glow */}
      <mesh position={[0, 0, -1.7]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshBasicMaterial color="#60A5FA" />
      </mesh>
    </group>
  );
}
