import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import {
  NormalizedFrame,
  GoldMaterial,
  NavyMaterial,
  SelfTickingClipboard,
  BankStatementSheet,
} from '../common/SceneKit';

export default function SOPDoc3D() {
  const clipboardRef = useRef();
  const bankSheetRef = useRef();
  const penRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (clipboardRef.current) {
      clipboardRef.current.position.y = 0.1 + Math.sin(t * 1.1) * 0.04;
      clipboardRef.current.rotation.y = -0.2 + Math.sin(t * 0.6) * 0.08;
    }

    if (bankSheetRef.current) {
      bankSheetRef.current.position.y = -0.25 + Math.cos(t * 1.2) * 0.04;
      bankSheetRef.current.rotation.y = 0.3 + Math.cos(t * 0.7) * 0.09;
    }

    if (penRef.current) {
      penRef.current.position.y = 0.45 + Math.sin(t * 1.4) * 0.06;
      penRef.current.rotation.z = -0.5 + Math.cos(t * 0.9) * 0.06;
    }
  });

  return (
    <NormalizedFrame scale={0.72} position={[0, -0.05, 0]}>
      <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.25}>
        <group>
          {/* 1. Clipboard with Self-Ticking Checklist */}
          <group ref={clipboardRef} position={[-0.45, 0.1, 0]} rotation={[0.1, -0.2, 0.04]}>
            <SelfTickingClipboard scale={0.9} />
          </group>

          {/* 2. Bank Statement Sheet with Coin Stack (Proof of Funds) */}
          <group ref={bankSheetRef} position={[0.42, -0.2, 0.25]} rotation={[-0.05, 0.3, -0.05]}>
            <BankStatementSheet scale={0.88} />
          </group>

          {/* 3. Luxury Golden Nib Fountain Pen */}
          <group ref={penRef} position={[0.2, 0.5, 0.35]} rotation={[0.3, 0.15, -0.5]}>
            <mesh>
              <cylinderGeometry args={[0.035, 0.035, 1.1, 20]} />
              <NavyMaterial />
            </mesh>
            {/* Gold Central Band */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.08, 20]} />
              <GoldMaterial />
            </mesh>
            {/* Gold Nib */}
            <mesh position={[0, -0.6, 0]} rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.035, 0.14, 12]} />
              <GoldMaterial />
            </mesh>
            {/* Pocket Clip */}
            <mesh position={[0.045, 0.32, 0]}>
              <boxGeometry args={[0.02, 0.32, 0.015]} />
              <GoldMaterial />
            </mesh>
          </group>
        </group>
      </Float>
    </NormalizedFrame>
  );
}
