import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import {
  NormalizedFrame,
  GoldMaterial,
  NavyMaterial,
  AirplaneWindow,
  VintageCamera,
  CurvedFlightMap,
} from '../common/SceneKit';

export default function TouristVisa3D() {
  const windowRef = useRef();
  const cameraRef = useRef();
  const mapRef = useRef();
  const suitcaseRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (windowRef.current) {
      windowRef.current.position.y = 0.35 + Math.sin(t * 1.1) * 0.04;
      windowRef.current.rotation.y = -0.15 + Math.sin(t * 0.6) * 0.08;
    }

    if (cameraRef.current) {
      cameraRef.current.position.y = -0.3 + Math.cos(t * 1.3) * 0.05;
      cameraRef.current.rotation.y = 0.25 + Math.cos(t * 0.8) * 0.12;
    }

    if (mapRef.current) {
      mapRef.current.position.y = -0.15 + Math.sin(t * 0.9) * 0.04;
      mapRef.current.rotation.y = -0.4 + Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <NormalizedFrame scale={0.72} position={[0, -0.05, 0]}>
      <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.25}>
        <group>
          {/* 1. Airplane Window Frame in the back */}
          <group ref={windowRef} position={[-0.45, 0.35, -0.3]} rotation={[0.05, -0.15, 0]}>
            <AirplaneWindow scale={0.88} />
          </group>

          {/* 2. Curved Flight Map with Dotted Route & Location Pin */}
          <group ref={mapRef} position={[0.45, 0.3, 0.1]} rotation={[0.1, -0.35, 0.05]}>
            <CurvedFlightMap scale={0.82} />
          </group>

          {/* 3. Vintage Travel Camera in Foreground */}
          <group ref={cameraRef} position={[0.42, -0.32, 0.45]} rotation={[0.08, 0.25, -0.05]}>
            <VintageCamera scale={0.85} />
          </group>

          {/* 4. Sleek Compact Travel Case at Base */}
          <group ref={suitcaseRef} position={[-0.32, -0.35, 0.1]} rotation={[0.05, 0.2, 0]}>
            <mesh>
              <boxGeometry args={[1.05, 0.75, 0.42]} />
              <NavyMaterial />
            </mesh>
            {/* Gold Center Seam & Straps */}
            <mesh position={[0, 0, 0.01]}>
              <boxGeometry args={[1.08, 0.03, 0.43]} />
              <GoldMaterial />
            </mesh>
            <mesh position={[-0.28, 0, 0.01]}>
              <boxGeometry args={[0.08, 0.77, 0.43]} />
              <GoldMaterial />
            </mesh>
            <mesh position={[0.28, 0, 0.01]}>
              <boxGeometry args={[0.08, 0.77, 0.43]} />
              <GoldMaterial />
            </mesh>
            {/* Top Handle */}
            <mesh position={[0, 0.45, 0]}>
              <boxGeometry args={[0.35, 0.08, 0.06]} />
              <GoldMaterial />
            </mesh>
          </group>
        </group>
      </Float>
    </NormalizedFrame>
  );
}
