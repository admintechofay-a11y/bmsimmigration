import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { GoldMaterial, ElectricBlueMaterial, NavyMaterial } from './common/SceneKit';

export default function FloatingAirplane({ orbitRadius = 2.9, speed = 0.35 }) {
  const planeRef = useRef();

  useFrame(({ clock }) => {
    if (!planeRef.current) return;
    const t = clock.getElapsedTime() * speed;

    // Orbital path around the globe
    const x = Math.sin(t) * orbitRadius;
    const z = Math.cos(t) * orbitRadius;
    const y = Math.sin(t * 1.5) * 0.65;

    planeRef.current.position.set(x, y, z);

    // Orient plane to face trajectory with subtle banking angle
    const nextX = Math.sin(t + 0.05) * orbitRadius;
    const nextZ = Math.cos(t + 0.05) * orbitRadius;
    const nextY = Math.sin((t + 0.05) * 1.5) * 0.65;

    planeRef.current.lookAt(nextX, nextY, nextZ);
    planeRef.current.rotateZ(0.22);
  });

  // Rescaled 18% smaller per specifications
  return (
    <group ref={planeRef} scale={[0.145, 0.145, 0.145]}>
      {/* Fuselage */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.24, 0.14, 3.0, 20]} />
        <GoldMaterial />
      </mesh>

      {/* Cockpit Windshield */}
      <mesh position={[0, 0.15, 0.85]}>
        <boxGeometry args={[0.26, 0.16, 0.45]} />
        <NavyMaterial />
      </mesh>

      {/* Main Wings */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.8, 0.05, 0.75]} />
        <GoldMaterial />
      </mesh>

      {/* Wingtip Navigation Lights */}
      <mesh position={[-1.9, 0, 0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <ElectricBlueMaterial />
      </mesh>
      <mesh position={[1.9, 0, 0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <GoldMaterial />
      </mesh>

      {/* Tail Fin */}
      <mesh position={[0, 0.5, -1.1]} rotation={[-0.35, 0, 0]}>
        <boxGeometry args={[0.07, 0.9, 0.55]} />
        <meshStandardMaterial color="#A67312" metalness={0.88} roughness={0.2} />
      </mesh>

      {/* Horizontal Stabilizers */}
      <mesh position={[0, 0.08, -1.2]}>
        <boxGeometry args={[1.35, 0.04, 0.4]} />
        <GoldMaterial />
      </mesh>

      {/* Jet Turbine Pods under wings */}
      {[-0.9, 0.9].map((x, i) => (
        <mesh key={i} position={[x, -0.12, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.1, 0.6, 16]} />
          <NavyMaterial />
        </mesh>
      ))}
    </group>
  );
}
