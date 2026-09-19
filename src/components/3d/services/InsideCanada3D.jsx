import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { Shape, ExtrudeGeometry } from 'three';
import {
  NormalizedFrame,
  GoldMaterial,
  WorkPermitID,
  ElectricBlueMaterial,
} from '../common/SceneKit';

export default function InsideCanada3D() {
  const leafRef = useRef();
  const cardRef = useRef();
  const haloRef = useRef();

  // Procedural 11-point Canadian Maple Leaf Vector Shape
  const leafShape = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(0, -0.9);
    shape.lineTo(0.05, -0.45); // stem right

    // Bottom right lobe
    shape.lineTo(0.28, -0.42);
    shape.lineTo(0.22, -0.28);
    shape.lineTo(0.52, -0.24);
    shape.lineTo(0.38, -0.1);

    // Main right lobe
    shape.lineTo(0.68, 0.05);
    shape.lineTo(0.48, 0.18);
    shape.lineTo(0.62, 0.35);
    shape.lineTo(0.36, 0.36);
    shape.lineTo(0.38, 0.52);
    shape.lineTo(0.2, 0.46);

    // Central top lobe
    shape.lineTo(0.22, 0.75);
    shape.lineTo(0, 1.0); // Top tip
    shape.lineTo(-0.22, 0.75);

    // Main left lobe (mirror)
    shape.lineTo(-0.2, 0.46);
    shape.lineTo(-0.38, 0.52);
    shape.lineTo(-0.36, 0.36);
    shape.lineTo(-0.62, 0.35);
    shape.lineTo(-0.48, 0.18);
    shape.lineTo(-0.68, 0.05);

    // Bottom left lobe (mirror)
    shape.lineTo(-0.38, -0.1);
    shape.lineTo(-0.52, -0.24);
    shape.lineTo(-0.22, -0.28);
    shape.lineTo(-0.28, -0.42);
    shape.lineTo(-0.05, -0.45); // stem left
    shape.lineTo(0, -0.9); // base return

    return shape;
  }, []);

  const extrudeSettings = useMemo(
    () => ({
      steps: 1,
      depth: 0.14,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.025,
      bevelSegments: 3,
    }),
    []
  );

  const leafGeometry = useMemo(() => {
    return new ExtrudeGeometry(leafShape, extrudeSettings);
  }, [leafShape, extrudeSettings]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (leafRef.current) {
      leafRef.current.rotation.y = Math.sin(t * 0.7) * 0.3;
      leafRef.current.rotation.z = Math.cos(t * 0.5) * 0.08;
    }

    if (cardRef.current) {
      cardRef.current.position.y = -0.25 + Math.sin(t * 1.1) * 0.03;
      cardRef.current.rotation.y = -0.25 + Math.cos(t * 0.8) * 0.1;
    }

    if (haloRef.current) {
      haloRef.current.rotation.z = t * 0.15;
    }
  });

  return (
    <NormalizedFrame scale={0.72} position={[0, -0.05, 0]}>
      <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.22}>
        {/* 1. Extruded Gold Canadian Maple Leaf */}
        <group ref={leafRef} position={[0, 0.1, -0.15]}>
          <mesh geometry={leafGeometry} position={[0, 0, -0.07]}>
            <GoldMaterial />
          </mesh>
          {/* Leaf Central Rib */}
          <mesh position={[0, 0.05, 0.08]}>
            <cylinderGeometry args={[0.018, 0.03, 1.1, 8]} />
            <meshStandardMaterial color="#8A620F" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>

        {/* 2. Official Canadian Work Permit Smart ID Card */}
        <group ref={cardRef} position={[0.42, -0.25, 0.35]} rotation={[0.08, -0.25, 0.05]}>
          <WorkPermitID scale={0.85} />
        </group>

        {/* 3. Subtle Orbiting Ring (Grounded Metallic, no neon glow) */}
        <group ref={haloRef}>
          <mesh rotation={[Math.PI / 2.3, 0, 0]}>
            <torusGeometry args={[1.4, 0.015, 12, 48]} />
            <GoldMaterial opacity={0.5} transparent />
          </mesh>
          <mesh rotation={[-Math.PI / 2.3, 0, 0]}>
            <torusGeometry args={[1.5, 0.012, 12, 48]} />
            <ElectricBlueMaterial opacity={0.4} transparent />
          </mesh>
        </group>
      </Float>
    </NormalizedFrame>
  );
}
