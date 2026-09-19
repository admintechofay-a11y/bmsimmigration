import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { DoubleSide } from 'three';
import {
  NormalizedFrame,
  GoldMaterial,
  NavyMaterial,
  ElectricBlueMaterial,
  GlassMaterial,
  GavelOfJustice,
  ReapplyArrows,
} from '../common/SceneKit';

export default function RefusalCases3D() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const shackleRef = useRef();
  const shieldRef = useRef();
  const gavelRef = useRef();
  const reapplyRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      setIsUnlocked(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (shieldRef.current) {
      shieldRef.current.rotation.y = Math.sin(t * 0.6) * 0.12;
    }

    if (gavelRef.current) {
      gavelRef.current.position.y = -0.1 + Math.sin(t * 1.1) * 0.03;
      gavelRef.current.rotation.z = -0.15 + Math.sin(t * 1.5) * 0.08;
    }

    if (reapplyRef.current) {
      reapplyRef.current.rotation.z = t * 0.8;
    }

    // Shackle slide & pivot open
    if (shackleRef.current) {
      const targetY = isUnlocked ? 0.38 : 0.22;
      const targetRotZ = isUnlocked ? -0.45 : 0;
      shackleRef.current.position.y += (targetY - shackleRef.current.position.y) * 0.1;
      shackleRef.current.rotation.z += (targetRotZ - shackleRef.current.rotation.z) * 0.1;
    }
  });

  return (
    <NormalizedFrame scale={0.72} position={[0, -0.05, 0]}>
      <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.22}>
        {/* 1. Frosted Protective Shield */}
        <group ref={shieldRef} position={[-0.35, 0.1, -0.2]}>
          {/* Main Shield Plate - Curved 180deg visor */}
          <mesh position={[0, 0.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <cylinderGeometry args={[0.85, 0.7, 1.3, 32, 1, true, 0, Math.PI]} />
            <GlassMaterial side={DoubleSide} />
          </mesh>
          {/* Top Gold Rim */}
          <mesh position={[0, 0.85, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <cylinderGeometry args={[0.86, 0.86, 0.03, 32, 1, true, 0, Math.PI]} />
            <GoldMaterial side={DoubleSide} />
          </mesh>
          {/* Bottom Gold Rim */}
          <mesh position={[0, -0.45, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <cylinderGeometry args={[0.71, 0.71, 0.03, 32, 1, true, 0, Math.PI]} />
            <GoldMaterial side={DoubleSide} />
          </mesh>
        </group>

        {/* 2. Procedural Gavel of Justice on Sound Block */}
        <group ref={gavelRef} position={[0.5, 0.1, 0.3]} rotation={[0.1, -0.4, 0.1]}>
          <GavelOfJustice scale={0.9} />
        </group>

        {/* 3. Circular "Re-apply" Dual Arrows */}
        <group position={[-0.35, 0.3, 0.25]}>
          <group ref={reapplyRef}>
            <ReapplyArrows scale={0.7} />
          </group>
        </group>

        {/* 4. Golden Unlocking Padlock (Overcoming Refusal / Authorization) */}
        <group
          position={[0.2, -0.65, 0.25]}
          onPointerOver={() => setIsUnlocked(true)}
          onPointerOut={() => setIsUnlocked(false)}
          className="cursor-pointer"
        >
          {/* Padlock Body */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.65, 0.5, 0.28]} />
            <GoldMaterial />
          </mesh>

          {/* Keyhole */}
          <mesh position={[0, 0.02, 0.15]}>
            <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
            <NavyMaterial />
          </mesh>
          <mesh position={[0, -0.06, 0.15]}>
            <boxGeometry args={[0.035, 0.08, 0.02]} />
            <NavyMaterial />
          </mesh>

          {/* Moving Shackle */}
          <group ref={shackleRef} position={[0, 0.22, 0]}>
            <mesh>
              <torusGeometry args={[0.18, 0.045, 16, 32, Math.PI]} />
              <meshStandardMaterial
                color={isUnlocked ? '#2F80ED' : '#C8921F'}
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
          </group>
        </group>
      </Float>
    </NormalizedFrame>
  );
}
