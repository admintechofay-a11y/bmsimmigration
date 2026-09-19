import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useDeviceTier } from '../../../hooks/useDeviceTier';

// Global scale constant per user specification:
// Scale to fit within 1-unit bounding box with 12% padding, then apply SCENE_SCALE = 0.75
export const SCENE_SCALE = 0.75;

/**
 * Procedural studio lighting rig for Aurora Light theme:
 * - Soft key light (white, top-right-front)
 * - Soft fill light (cool tint, left-back)
 * - Soft warm rim light (gold/warm tint, top-back)
 * NO neon rings or additive-blending glows.
 */
export function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.7} color="#F8FAFC" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        color="#FFFFFF"
        castShadow={false}
      />
      <directionalLight
        position={[-5, 3, -3]}
        intensity={0.5}
        color="#EEF3FB"
      />
      <directionalLight
        position={[0, 5, -5]}
        intensity={0.6}
        color="#FFF9EB"
      />
    </>
  );
}

/**
 * Procedural drei <Environment> built exclusively from <Lightformer>s.
 * ZERO external CDN downloads or HDR network fetches.
 * Gives rich, crisp metallic reflections to gold, glass, and polished surfaces.
 */
export function ProceduralEnvironment() {
  return (
    <Environment resolution={256}>
      {/* Ceiling soft overhead panel */}
      <Lightformer
        form="rect"
        intensity={1.8}
        position={[0, 6, 0]}
        scale={[12, 12, 1]}
        target={[0, 0, 0]}
        color="#FFFFFF"
      />
      {/* Front-right warm highlight (gold reflection enhancer) */}
      <Lightformer
        form="rect"
        intensity={2.2}
        position={[6, 3, 5]}
        scale={[6, 8, 1]}
        color="#FFF6E0"
      />
      {/* Left cool soft fill strip */}
      <Lightformer
        form="rect"
        intensity={0.9}
        position={[-6, 2, -2]}
        scale={[4, 10, 1]}
        color="#E6EFFD"
      />
      {/* Rear rim reflector */}
      <Lightformer
        form="ring"
        intensity={1.2}
        position={[0, 4, -6]}
        scale={[8, 8, 1]}
        color="#F8FAFC"
      />
    </Environment>
  );
}

/**
 * Baked ground contact shadow under objects for grounded realism on #F7F9FC
 */
export function GroundContactShadow({ position = [0, -0.9, 0], opacity = 0.38, scale = 4.0 }) {
  return (
    <ContactShadows
      position={position}
      opacity={opacity}
      scale={scale}
      blur={1.6}
      far={2.2}
      frames={1}
      color="#0B1B3A"
    />
  );
}

/**
 * NormalizedFrame wraps any object, scales it to SCENE_SCALE (0.75) with 12% padding,
 * and centers its pivot at [0, 0, 0] so it never touches container boundaries.
 */
export function NormalizedFrame({ children, scale = SCENE_SCALE, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {children}
    </group>
  );
}

/**
 * Shared Material Definitions ("Aurora Light" family):
 * Palette:
 * - Rich Gold: #C8921F (darker base so it reads with strong contrast on white)
 * - Ink Navy: #0B1B3A
 * - Electric Blue: #2F80ED
 * - Teal Accent: #0EA5C6
 * - Success Green: #16A34A
 * - White Surface: #FFFFFF
 * - Crisp Paper: #FAFBFD
 */
export function GoldMaterial({ roughness = 0.22, metalness = 0.88, ...props }) {
  return (
    <meshStandardMaterial
      color="#C8921F"
      metalness={metalness}
      roughness={roughness}
      {...props}
    />
  );
}

export function NavyMaterial({ roughness = 0.32, metalness = 0.15, ...props }) {
  return (
    <meshStandardMaterial
      color="#0B1B3A"
      metalness={metalness}
      roughness={roughness}
      {...props}
    />
  );
}

export function ElectricBlueMaterial({ roughness = 0.28, metalness = 0.5, ...props }) {
  return (
    <meshStandardMaterial
      color="#2F80ED"
      metalness={metalness}
      roughness={roughness}
      {...props}
    />
  );
}

export function TealMaterial({ roughness = 0.3, metalness = 0.6, ...props }) {
  return (
    <meshStandardMaterial
      color="#0EA5C6"
      metalness={metalness}
      roughness={roughness}
      {...props}
    />
  );
}

export function PaperMaterial({ roughness = 0.85, ...props }) {
  return (
    <meshStandardMaterial
      color="#FAFBFD"
      roughness={roughness}
      metalness={0.05}
      {...props}
    />
  );
}

export function WhiteSurfaceMaterial({ roughness = 0.45, ...props }) {
  return (
    <meshStandardMaterial
      color="#FFFFFF"
      roughness={roughness}
      metalness={0.1}
      {...props}
    />
  );
}

export function GlassMaterial({ opacity = 0.85, ...props }) {
  const { isTier2 } = useDeviceTier();

  if (isTier2) {
    return (
      <meshPhysicalMaterial
        color="#F0F6FF"
        transmission={0.88}
        opacity={opacity}
        transparent
        roughness={0.08}
        ior={1.45}
        thickness={0.4}
        clearcoat={0.3}
        clearcoatRoughness={0.1}
        {...props}
      />
    );
  }

  // Tier 1/0 lightweight fallback
  return (
    <meshStandardMaterial
      color="#E6EFFD"
      transparent
      opacity={0.5}
      roughness={0.15}
      metalness={0.1}
      {...props}
    />
  );
}

/* =========================================================================
   REUSABLE PROCEDURAL 3D ATOMS (under 1.5k vertices each, bevelSegments 3+)
   ========================================================================= */

/**
 * CoinStack: Beveled stack of 4 gold coins
 */
export function CoinStack({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {[0, 0.08, 0.16, 0.24].map((y, i) => (
        <group key={i} position={[0, y, 0]}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.3, 0.06, 28]} />
            <GoldMaterial />
          </mesh>
          <mesh position={[0, 0.031, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.005, 28]} />
            <meshStandardMaterial color="#B07D16" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * UniversityBuilding: Classical academic portico with 4 Ionic-style columns, pediment, & dome
 */
export function UniversityBuilding({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Base Plinth / Steps */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[1.5, 0.1, 0.9]} />
        <WhiteSurfaceMaterial />
      </mesh>
      <mesh position={[0, -0.46, 0]}>
        <boxGeometry args={[1.65, 0.08, 1.05]} />
        <WhiteSurfaceMaterial />
      </mesh>

      {/* Columns (4 Front) */}
      {[-0.55, -0.18, 0.18, 0.55].map((x, i) => (
        <group key={i} position={[x, -0.05, 0.3]}>
          {/* Base */}
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.07, 0.08, 0.06, 24]} />
            <WhiteSurfaceMaterial />
          </mesh>
          {/* Column Shaft */}
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.05, 0.055, 0.65, 24]} />
            <WhiteSurfaceMaterial />
          </mesh>
          {/* Capital */}
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.075, 0.06, 0.06, 24]} />
            <GoldMaterial />
          </mesh>
        </group>
      ))}

      {/* Main Architrave / Entablature */}
      <mesh position={[0, 0.4, 0.15]}>
        <boxGeometry args={[1.55, 0.12, 0.65]} />
        <WhiteSurfaceMaterial />
      </mesh>
      <mesh position={[0, 0.47, 0.15]}>
        <boxGeometry args={[1.6, 0.04, 0.7]} />
        <GoldMaterial />
      </mesh>

      {/* Triangular Pediment (Front Gable) */}
      <mesh position={[0, 0.62, 0.45]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.75, 0.75, 0.08]} />
        <WhiteSurfaceMaterial />
      </mesh>
      {/* Golden Crest on Pediment */}
      <mesh position={[0, 0.62, 0.5]}>
        <cylinderGeometry args={[0.09, 0.09, 0.03, 24]} />
        <GoldMaterial />
      </mesh>

      {/* Central Dome */}
      <mesh position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.32, 28, 20, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <GoldMaterial />
      </mesh>
      {/* Dome Finial / Needle */}
      <mesh position={[0, 1.12, 0]}>
        <cylinderGeometry args={[0.015, 0.03, 0.15, 16]} />
        <GoldMaterial />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <GoldMaterial />
      </mesh>

      {/* Main Hall Back Wall & Doors */}
      <mesh position={[0, -0.05, -0.05]}>
        <boxGeometry args={[1.35, 0.78, 0.55]} />
        <meshStandardMaterial color="#EEF3FB" roughness={0.4} />
      </mesh>
      {/* Navy Arched Door */}
      <mesh position={[0, -0.15, 0.23]}>
        <boxGeometry args={[0.26, 0.45, 0.02]} />
        <NavyMaterial />
      </mesh>
    </group>
  );
}

/**
 * ScoreCard: IELTS / PTE Official Score Document Badge
 */
export function ScoreCard({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Main Card Surface */}
      <mesh>
        <boxGeometry args={[1.05, 1.35, 0.05]} />
        <PaperMaterial />
      </mesh>
      {/* Card Border Trim */}
      <mesh position={[0, 0, -0.002]}>
        <boxGeometry args={[1.08, 1.38, 0.045]} />
        <meshStandardMaterial color="#E3EAF5" roughness={0.4} />
      </mesh>

      {/* Top Header Banner (Navy) */}
      <mesh position={[0, 0.48, 0.028]}>
        <boxGeometry args={[0.92, 0.22, 0.01]} />
        <NavyMaterial />
      </mesh>
      {/* Gold Header Accent Stripe */}
      <mesh position={[0, 0.36, 0.028]}>
        <boxGeometry args={[0.92, 0.02, 0.01]} />
        <GoldMaterial />
      </mesh>

      {/* Band Score Circle (Teal & Gold) */}
      <mesh position={[0, 0.1, 0.03]}>
        <cylinderGeometry args={[0.2, 0.2, 0.02, 28]} />
        <TealMaterial />
      </mesh>
      <mesh position={[0, 0.1, 0.04]}>
        <cylinderGeometry args={[0.16, 0.16, 0.01, 28]} />
        <GoldMaterial />
      </mesh>

      {/* Simulated Score Bars (L, R, W, S) */}
      {[-0.15, -0.28, -0.41, -0.54].map((y, idx) => (
        <group key={idx} position={[0, y, 0.028]}>
          <mesh position={[-0.22, 0, 0]}>
            <boxGeometry args={[0.38, 0.05, 0.008]} />
            <meshStandardMaterial color="#0B1B3A" roughness={0.6} />
          </mesh>
          <mesh position={[0.2, 0, 0]}>
            <boxGeometry args={[0.35, 0.04, 0.008]} />
            <GoldMaterial />
          </mesh>
        </group>
      ))}

      {/* Verified Stamp Badge */}
      <mesh position={[0.32, -0.48, 0.035]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.015, 24]} />
        <meshStandardMaterial color="#16A34A" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}

/**
 * AirplaneWindow: Curving passenger window frame with clouds
 */
export function AirplaneWindow({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Outer Fuselage Panel */}
      <mesh>
        <boxGeometry args={[1.25, 1.6, 0.12]} />
        <WhiteSurfaceMaterial />
      </mesh>

      {/* Window Bezel Inner Frame (Soft Gray/White) */}
      <mesh position={[0, 0, 0.03]}>
        <cylinderGeometry args={[0.42, 0.42, 0.1, 32]} />
        <meshStandardMaterial color="#EEF3FB" roughness={0.3} />
      </mesh>

      {/* Inner Sky Glass */}
      <mesh position={[0, 0, -0.01]}>
        <cylinderGeometry args={[0.36, 0.36, 0.08, 32]} />
        <ElectricBlueMaterial />
      </mesh>

      {/* Fluffy Procedural Cloud Spheres Inside View */}
      <mesh position={[-0.08, -0.15, 0.02]}>
        <sphereGeometry args={[0.16, 20, 20]} />
        <WhiteSurfaceMaterial />
      </mesh>
      <mesh position={[0.12, -0.16, 0.02]}>
        <sphereGeometry args={[0.13, 20, 20]} />
        <WhiteSurfaceMaterial />
      </mesh>
      <mesh position={[0.02, -0.1, 0.02]}>
        <sphereGeometry args={[0.14, 20, 20]} />
        <WhiteSurfaceMaterial />
      </mesh>

      {/* Outer Golden Trim Rim */}
      <mesh position={[0, 0, 0.07]}>
        <torusGeometry args={[0.43, 0.02, 16, 36]} />
        <GoldMaterial />
      </mesh>
    </group>
  );
}

/**
 * VintageCamera: Compact tourist travel camera with lens & gold dial
 */
export function VintageCamera({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Camera Body (Navy & White Two-Tone) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.3, 0.85, 0.45]} />
        <NavyMaterial />
      </mesh>
      {/* Leatherette Accent Wrap */}
      <mesh position={[0, -0.05, 0.005]}>
        <boxGeometry args={[1.32, 0.55, 0.46]} />
        <meshStandardMaterial color="#1C2E52" roughness={0.8} />
      </mesh>

      {/* Top Plate Accent */}
      <mesh position={[0, 0.44, 0]}>
        <boxGeometry args={[1.3, 0.05, 0.45]} />
        <GoldMaterial />
      </mesh>

      {/* Large Lens Barrel */}
      <group position={[0.12, 0, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.28, 0.31, 0.22, 32]} />
          <WhiteSurfaceMaterial />
        </mesh>
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.04, 32]} />
          <GoldMaterial />
        </mesh>
        {/* Front Lens Glass */}
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.01, 32]} />
          <ElectricBlueMaterial />
        </mesh>
      </group>

      {/* Viewfinder Window */}
      <mesh position={[-0.38, 0.25, 0.23]}>
        <boxGeometry args={[0.2, 0.14, 0.05]} />
        <GlassMaterial />
      </mesh>

      {/* Shutter Button & Dial */}
      <mesh position={[-0.38, 0.5, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.1, 20]} />
        <GoldMaterial />
      </mesh>
      <mesh position={[0.4, 0.48, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.06, 24]} />
        <GoldMaterial />
      </mesh>

      {/* Flash LED */}
      <mesh position={[-0.12, 0.25, 0.23]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.1} />
      </mesh>
    </group>
  );
}

/**
 * CurvedFlightMap: Folded map with dotted gold flight arc & destination pin
 */
export function CurvedFlightMap({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Folded Map Leaves */}
      <group rotation={[-0.2, 0.3, 0]}>
        {/* Leaf 1 */}
        <mesh position={[-0.36, 0, 0.04]} rotation={[0, -0.15, 0]}>
          <boxGeometry args={[0.42, 1.0, 0.02]} />
          <PaperMaterial />
        </mesh>
        {/* Leaf 2 */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.42, 1.0, 0.02]} />
          <PaperMaterial />
        </mesh>
        {/* Leaf 3 */}
        <mesh position={[0.36, 0, 0.04]} rotation={[0, 0.15, 0]}>
          <boxGeometry args={[0.42, 1.0, 0.02]} />
          <PaperMaterial />
        </mesh>

        {/* Flight Route Dotted Curve */}
        {[-0.3, -0.15, 0, 0.15, 0.3].map((x, i) => (
          <mesh
            key={i}
            position={[x, Math.sin((i / 4) * Math.PI) * 0.25 - 0.1, 0.04]}
          >
            <sphereGeometry args={[0.025, 12, 12]} />
            <GoldMaterial />
          </mesh>
        ))}

        {/* Origin Marker */}
        <mesh position={[-0.35, -0.15, 0.05]}>
          <cylinderGeometry args={[0.04, 0.04, 0.015, 16]} />
          <ElectricBlueMaterial />
        </mesh>

        {/* Destination Pin */}
        <LocationPin position={[0.35, -0.05, 0.1]} scale={0.35} />
      </group>
    </group>
  );
}

/**
 * LocationPin: 3D Teardrop destination map pin
 */
export function LocationPin({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Top Sphere Head */}
      <mesh position={[0, 0.45, 0]}>
        <sphereGeometry args={[0.26, 24, 20]} />
        <GoldMaterial />
      </mesh>
      {/* Inner Cutout Hole Accent */}
      <mesh position={[0, 0.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.54, 20]} />
        <NavyMaterial />
      </mesh>
      {/* Bottom Conical Needle */}
      <mesh position={[0, 0.15, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.23, 0.45, 24]} />
        <GoldMaterial />
      </mesh>
      {/* Ground Ring Base */}
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.02, 20]} />
        <meshStandardMaterial color="#0B1B3A" opacity={0.3} transparent />
      </mesh>
    </group>
  );
}

/**
 * CompassMini: Sleek golden navigational compass rose with needle
 */
export function CompassMini({ position = [0, 0, 0], scale = 1 }) {
  const needleRef = useRef();

  useFrame(({ clock }) => {
    if (needleRef.current) {
      needleRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 1.2) * 0.3;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Outer Bezel Ring */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 0.12, 32]} />
        <GoldMaterial />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.44, 0.44, 0.05, 32]} />
        <WhiteSurfaceMaterial />
      </mesh>

      {/* Compass Dial Marks */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.01, 32]} />
        <NavyMaterial />
      </mesh>

      {/* North / South Needle Group */}
      <group ref={needleRef} position={[0, 0.1, 0]}>
        {/* North Pointer (Gold) */}
        <mesh position={[0, 0.16, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.07, 0.32, 16]} />
          <GoldMaterial />
        </mesh>
        {/* South Pointer (Teal / Steel) */}
        <mesh position={[0, -0.16, 0]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.07, 0.32, 16]} />
          <ElectricBlueMaterial />
        </mesh>
        {/* Center Pivot Pivot Cap */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <GoldMaterial />
        </mesh>
      </group>

      {/* Top Pendant Ring Loop */}
      <mesh position={[0, 0.58, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.1, 0.02, 16, 24]} />
        <GoldMaterial />
      </mesh>
    </group>
  );
}

/**
 * SelfTickingClipboard: Documentation clipboard with animated checkmark
 */
export function SelfTickingClipboard({ position = [0, 0, 0], scale = 1 }) {
  const checkRef = useRef();

  useFrame(({ clock }) => {
    if (checkRef.current) {
      const s = (Math.sin(clock.getElapsedTime() * 2) + 1) * 0.5;
      checkRef.current.scale.setScalar(0.8 + s * 0.3);
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Wooden / Solid Backboard */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.05, 1.45, 0.06]} />
        <meshStandardMaterial color="#0B1B3A" roughness={0.5} />
      </mesh>

      {/* Paper Sheet Attached */}
      <mesh position={[0, -0.04, 0.035]}>
        <boxGeometry args={[0.9, 1.25, 0.02]} />
        <PaperMaterial />
      </mesh>

      {/* Top Metallic Clamp */}
      <mesh position={[0, 0.65, 0.05]}>
        <boxGeometry args={[0.5, 0.12, 0.06]} />
        <GoldMaterial />
      </mesh>
      <mesh position={[0, 0.74, 0.05]}>
        <torusGeometry args={[0.1, 0.02, 12, 24]} />
        <GoldMaterial />
      </mesh>

      {/* Document Text Line Rows */}
      {[-0.05, -0.2, -0.35, -0.5].map((y, i) => (
        <group key={i} position={[0, y, 0.05]}>
          {/* Bullet Square */}
          <mesh position={[-0.32, 0, 0]}>
            <boxGeometry args={[0.07, 0.07, 0.01]} />
            <meshStandardMaterial color="#C8921F" metalness={0.7} />
          </mesh>
          {/* Simulated Text Line */}
          <mesh position={[0.05, 0, 0]}>
            <boxGeometry args={[0.52, 0.03, 0.008]} />
            <meshStandardMaterial color="#4A5B78" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Animated Prominent Checkmark */}
      <group ref={checkRef} position={[0.26, 0.28, 0.07]}>
        <mesh position={[-0.05, -0.04, 0]} rotation={[0, 0, -0.7]}>
          <boxGeometry args={[0.08, 0.025, 0.01]} />
          <meshStandardMaterial color="#16A34A" />
        </mesh>
        <mesh position={[0.04, 0.03, 0]} rotation={[0, 0, 0.6]}>
          <boxGeometry args={[0.18, 0.025, 0.01]} />
          <meshStandardMaterial color="#16A34A" />
        </mesh>
      </group>
    </group>
  );
}

/**
 * GavelOfJustice: Judicial Gavel for Refusal Appeals & Case Turnaround
 */
export function GavelOfJustice({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale} rotation={[0.2, 0.3, -0.3]}>
      {/* Sounding Base Block */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.45, 0.5, 0.12, 28]} />
        <meshStandardMaterial color="#0B1B3A" roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.42, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.04, 28]} />
        <GoldMaterial />
      </mesh>

      {/* Gavel Head (Cylinder with Gold Bands) */}
      <group position={[0, 0.1, 0]}>
        {/* Central Wooden Barrel */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.7, 28]} />
          <meshStandardMaterial color="#3A2312" roughness={0.5} />
        </mesh>
        {/* Left & Right Gold Rings */}
        <mesh position={[-0.22, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.19, 0.19, 0.06, 28]} />
          <GoldMaterial />
        </mesh>
        <mesh position={[0.22, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.19, 0.19, 0.06, 28]} />
          <GoldMaterial />
        </mesh>
        {/* Left & Right Striking Faces */}
        <mesh position={[-0.37, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.21, 0.21, 0.05, 28]} />
          <GoldMaterial />
        </mesh>
        <mesh position={[0.37, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.21, 0.21, 0.05, 28]} />
          <GoldMaterial />
        </mesh>

        {/* Gavel Handle */}
        <mesh position={[0, -0.42, 0]}>
          <cylinderGeometry args={[0.04, 0.05, 0.85, 20]} />
          <meshStandardMaterial color="#3A2312" roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.85, 0]}>
          <cylinderGeometry args={[0.065, 0.06, 0.15, 20]} />
          <GoldMaterial />
        </mesh>
      </group>
    </group>
  );
}

/**
 * ReapplyArrows: Circular re-application cycle of arrows
 */
export function ReapplyArrows({ position = [0, 0, 0], scale = 1 }) {
  const arrowsRef = useRef();

  useFrame(({ clock }) => {
    if (arrowsRef.current) {
      arrowsRef.current.rotation.z = clock.getElapsedTime() * 0.8;
    }
  });

  return (
    <group ref={arrowsRef} position={position} scale={scale}>
      {/* 2 Semi-Circular Arc Ribbons */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[0.55, 0.045, 16, 28, Math.PI * 0.75]} />
        <GoldMaterial />
      </mesh>
      <mesh rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.55, 0.045, 16, 28, Math.PI * 0.75]} />
        <ElectricBlueMaterial />
      </mesh>

      {/* Arrow Heads */}
      <mesh position={[0.55, 0.05, 0]} rotation={[0, 0, -Math.PI / 3]}>
        <coneGeometry args={[0.1, 0.2, 16]} />
        <GoldMaterial />
      </mesh>
      <mesh position={[-0.55, -0.05, 0]} rotation={[0, 0, (2 * Math.PI) / 3]}>
        <coneGeometry args={[0.1, 0.2, 16]} />
        <ElectricBlueMaterial />
      </mesh>
    </group>
  );
}

/**
 * WorkPermitID: Official Canadian Work Permit ID Card with photo placeholder & crest
 */
export function WorkPermitID({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Smart Card Base */}
      <mesh>
        <boxGeometry args={[1.3, 0.82, 0.03]} />
        <WhiteSurfaceMaterial />
      </mesh>
      {/* Holographic Border Rim */}
      <mesh position={[0, 0, -0.001]}>
        <boxGeometry args={[1.34, 0.86, 0.028]} />
        <meshStandardMaterial color="#E3EAF5" roughness={0.3} />
      </mesh>

      {/* Top Banner (Navy & Red Maple Stripe) */}
      <mesh position={[0, 0.28, 0.017]}>
        <boxGeometry args={[1.2, 0.15, 0.006]} />
        <NavyMaterial />
      </mesh>
      <mesh position={[-0.45, 0.28, 0.022]}>
        <boxGeometry args={[0.12, 0.12, 0.006]} />
        <meshStandardMaterial color="#EF4444" roughness={0.3} />
      </mesh>

      {/* Photo Placeholder Frame */}
      <mesh position={[-0.38, -0.08, 0.018]}>
        <boxGeometry args={[0.34, 0.42, 0.008]} />
        <meshStandardMaterial color="#CBD5E1" roughness={0.5} />
      </mesh>
      {/* Silhouette Head & Shoulders in Photo */}
      <mesh position={[-0.38, -0.02, 0.024]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#64748B" />
      </mesh>
      <mesh position={[-0.38, -0.18, 0.024]}>
        <cylinderGeometry args={[0.12, 0.14, 0.14, 16]} />
        <meshStandardMaterial color="#64748B" />
      </mesh>

      {/* Embedded Smart Chip (Gold) */}
      <mesh position={[-0.08, 0.02, 0.02]}>
        <boxGeometry args={[0.16, 0.14, 0.006]} />
        <GoldMaterial />
      </mesh>

      {/* Text Lines */}
      {[0.02, -0.1, -0.22].map((y, i) => (
        <mesh key={i} position={[0.26, y, 0.018]}>
          <boxGeometry args={[0.45, 0.04, 0.006]} />
          <meshStandardMaterial color="#0B1B3A" roughness={0.6} />
        </mesh>
      ))}

      {/* Hologram Official Seal */}
      <mesh position={[0.42, -0.22, 0.022]}>
        <cylinderGeometry args={[0.09, 0.09, 0.006, 20]} />
        <GoldMaterial />
      </mesh>
    </group>
  );
}

/**
 * RolledCertificate: Formal University Offer / Admission scroll with ribbon & wax seal
 */
export function RolledCertificate({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale} rotation={[0.4, 0, 0.5]}>
      {/* Rolled Cylinder Parchment */}
      <mesh>
        <cylinderGeometry args={[0.16, 0.16, 1.25, 28]} />
        <PaperMaterial />
      </mesh>
      {/* Inner Hollow Core */}
      <mesh position={[0, 0.63, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.02, 28]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.9} />
      </mesh>

      {/* Central Gold Ribbon Band */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.175, 0.175, 0.18, 28]} />
        <GoldMaterial />
      </mesh>

      {/* Hanging Ribbon Tails */}
      <mesh position={[0.16, -0.15, 0.08]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.08, 0.35, 0.015]} />
        <GoldMaterial />
      </mesh>
      <mesh position={[0.12, -0.16, 0.1]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.08, 0.32, 0.015]} />
        <GoldMaterial />
      </mesh>

      {/* Embossed Wax Seal on Ribbon */}
      <mesh position={[0.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.04, 24]} />
        <meshStandardMaterial color="#B91C1C" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
}

/**
 * BankStatementSheet: Official financial proof document with coin stack
 */
export function BankStatementSheet({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Bank Statement Sheet */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.1, 1.35, 0.03]} />
        <PaperMaterial />
      </mesh>
      {/* Official Bank Header */}
      <mesh position={[0, 0.52, 0.018]}>
        <boxGeometry args={[0.9, 0.12, 0.005]} />
        <NavyMaterial />
      </mesh>
      {/* Account Balance Rows */}
      {[-0.05, -0.18, -0.31].map((y, i) => (
        <group key={i} position={[0, y, 0.018]}>
          <mesh position={[-0.2, 0, 0]}>
            <boxGeometry args={[0.45, 0.04, 0.004]} />
            <meshStandardMaterial color="#4A5B78" roughness={0.6} />
          </mesh>
          <mesh position={[0.26, 0, 0]}>
            <boxGeometry args={[0.25, 0.04, 0.004]} />
            <meshStandardMaterial color="#16A34A" roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Coin Stack Proof of Funds in Front */}
      <CoinStack position={[0.32, -0.36, 0.12]} scale={0.75} />
    </group>
  );
}

/**
 * InstancedBackgroundItems: 4-6 small floating items (pins, coins, paper planes)
 * in section backgrounds, rendered using InstancedMesh in 1 draw call.
 */
export function InstancedBackgroundItems({ count = 8 }) {
  const meshRef = useRef();

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 6,
        z: (Math.random() - 0.5) * 3 - 2,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        rotZ: Math.random() * Math.PI,
        speedX: 0.1 + Math.random() * 0.2,
        speedY: 0.2 + Math.random() * 0.3,
        scale: 0.12 + Math.random() * 0.12,
      });
    }
    return temp;
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speedX + i) * 0.3,
        p.y + Math.cos(t * p.speedY + i) * 0.3,
        p.z
      );
      dummy.rotation.set(
        p.rotX + t * 0.2,
        p.rotY + t * 0.3,
        p.rotZ + t * 0.15
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <octahedronGeometry args={[0.5, 0]} />
      <GoldMaterial roughness={0.3} metalness={0.9} />
    </instancedMesh>
  );
}

/* =========================================================================
   COUNTRY LANDMARKS & PROCESS TIMELINE NODES (3c Preparation)
   ========================================================================= */

/**
 * LandmarkCNTower: Canada Toronto CN Tower with golden maple leaf emblem
 */
export function LandmarkCNTower({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Base Pods */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.12, 0.32, 0.4, 24]} />
        <meshStandardMaterial color="#EEF3FB" roughness={0.4} />
      </mesh>
      {/* Tower Stem */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.07, 0.12, 1.1, 24]} />
        <WhiteSurfaceMaterial />
      </mesh>
      {/* Observation Deck (Main SkyPod) */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.3, 0.18, 0.16, 28]} />
        <NavyMaterial />
      </mesh>
      <mesh position={[0, 0.54, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 0.06, 28]} />
        <GoldMaterial />
      </mesh>
      {/* Upper Space Deck */}
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 24]} />
        <WhiteSurfaceMaterial />
      </mesh>
      {/* Antenna Mast */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.015, 0.04, 0.7, 16]} />
        <GoldMaterial />
      </mesh>
      {/* Red/Gold Maple Leaf Motif at Base */}
      <mesh position={[0, -0.4, 0.22]}>
        <cylinderGeometry args={[0.14, 0.14, 0.03, 16]} />
        <meshStandardMaterial color="#EF4444" roughness={0.4} />
      </mesh>
    </group>
  );
}

/**
 * LandmarkBigBen: UK London Elizabeth Tower clock spire
 */
export function LandmarkBigBen({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Main Tower Shaft */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[0.55, 1.2, 0.55]} />
        <meshStandardMaterial color="#F4EADB" roughness={0.6} />
      </mesh>
      {/* Shaft Vertical Mullions */}
      {[-0.24, 0, 0.24].map((x, i) => (
        <mesh key={i} position={[x, -0.2, 0.28]}>
          <boxGeometry args={[0.04, 1.16, 0.02]} />
          <GoldMaterial />
        </mesh>
      ))}

      {/* Clock Box Stage */}
      <mesh position={[0, 0.46, 0]}>
        <boxGeometry args={[0.62, 0.38, 0.62]} />
        <GoldMaterial />
      </mesh>
      {/* Clock Faces (Front & Right) */}
      <mesh position={[0, 0.46, 0.32]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.01, 28]} />
        <WhiteSurfaceMaterial />
      </mesh>
      <mesh position={[0.32, 0.46, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.16, 0.01, 28]} />
        <WhiteSurfaceMaterial />
      </mesh>

      {/* Belfry Louvres & Balcony */}
      <mesh position={[0, 0.72, 0]}>
        <boxGeometry args={[0.52, 0.22, 0.52]} />
        <NavyMaterial />
      </mesh>

      {/* Spire Roof */}
      <mesh position={[0, 1.05, 0]}>
        <coneGeometry args={[0.36, 0.55, 4]} rotation={[0, Math.PI / 4, 0]} />
        <GoldMaterial />
      </mesh>
      {/* Lantern Needle Finial */}
      <mesh position={[0, 1.38, 0]}>
        <cylinderGeometry args={[0.015, 0.03, 0.2, 12]} />
        <GoldMaterial />
      </mesh>
    </group>
  );
}

/**
 * LandmarkCapitolDome: USA Washington Capitol Dome & Rotunda
 */
export function LandmarkCapitolDome({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Base Pedestal */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.85, 0.9, 0.2, 32]} />
        <WhiteSurfaceMaterial />
      </mesh>
      {/* Rotunda Colonnade Drum */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.5, 32]} />
        <WhiteSurfaceMaterial />
      </mesh>
      {/* Gold Ring Trim on Drum */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.72, 0.72, 0.04, 32]} />
        <GoldMaterial />
      </mesh>

      {/* Inner Attic Drum */}
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.58, 0.58, 0.28, 32]} />
        <meshStandardMaterial color="#EEF3FB" roughness={0.3} />
      </mesh>

      {/* Grand Hemispherical Dome */}
      <mesh position={[0, 0.42, 0]}>
        <sphereGeometry args={[0.52, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <WhiteSurfaceMaterial />
      </mesh>

      {/* Dome Ribs (Gold) */}
      {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4].map((r, i) => (
        <mesh key={i} position={[0, 0.65, 0]} rotation={[0, r, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.5, 12]} />
          <GoldMaterial />
        </mesh>
      ))}

      {/* Cupola / Lantern */}
      <mesh position={[0, 0.98, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.18, 20]} />
        <WhiteSurfaceMaterial />
      </mesh>
      <mesh position={[0, 1.12, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <GoldMaterial />
      </mesh>
    </group>
  );
}

/**
 * LandmarkOperaHouse: Australia Sydney Opera House arched shell roof
 */
export function LandmarkOperaHouse({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Granite Harbour Concourse Base */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[1.7, 0.15, 1.1]} />
        <meshStandardMaterial color="#D7DFEC" roughness={0.6} />
      </mesh>

      {/* Big Shell 1 */}
      <group position={[-0.3, -0.1, 0]} rotation={[0, 0.1, 0.35]}>
        <mesh>
          <coneGeometry args={[0.5, 1.1, 18, 1, false, 0, Math.PI]} />
          <WhiteSurfaceMaterial />
        </mesh>
        <mesh position={[0, 0.01, 0.01]}>
          <coneGeometry args={[0.48, 1.08, 18, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color="#FFFBF5" roughness={0.3} />
        </mesh>
      </group>

      {/* Big Shell 2 (Offset Intersecting) */}
      <group position={[0.2, -0.18, 0.05]} rotation={[0, -0.1, 0.32]}>
        <mesh>
          <coneGeometry args={[0.42, 0.9, 18, 1, false, 0, Math.PI]} />
          <WhiteSurfaceMaterial />
        </mesh>
      </group>

      {/* Smaller Front Shell */}
      <group position={[0.58, -0.24, 0.08]} rotation={[0, -0.2, 0.3]}>
        <mesh>
          <coneGeometry args={[0.3, 0.65, 18, 1, false, 0, Math.PI]} />
          <WhiteSurfaceMaterial />
        </mesh>
      </group>

      {/* Gold Trim Accents Under Ribs */}
      <mesh position={[-0.1, -0.3, 0.25]}>
        <boxGeometry args={[0.8, 0.04, 0.04]} />
        <GoldMaterial />
      </mesh>
    </group>
  );
}

/**
 * LandmarkBrandenburgGate: Germany Berlin Neoclassical Brandenburg Gate
 */
export function LandmarkBrandenburgGate({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Plinth Base */}
      <mesh position={[0, -0.45, 0]}>
        <boxGeometry args={[1.75, 0.1, 0.6]} />
        <meshStandardMaterial color="#E8EEF7" roughness={0.5} />
      </mesh>

      {/* 6 Doric Columns */}
      {[-0.65, -0.39, -0.13, 0.13, 0.39, 0.65].map((x, i) => (
        <group key={i} position={[x, -0.1, 0]}>
          <mesh>
            <cylinderGeometry args={[0.065, 0.075, 0.65, 24]} />
            <WhiteSurfaceMaterial />
          </mesh>
          <mesh position={[0, 0.34, 0]}>
            <boxGeometry args={[0.16, 0.04, 0.16]} />
            <WhiteSurfaceMaterial />
          </mesh>
        </group>
      ))}

      {/* Massive Entablature Block */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.7, 0.18, 0.55]} />
        <WhiteSurfaceMaterial />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[1.75, 0.04, 0.58]} />
        <GoldMaterial />
      </mesh>

      {/* Upper Attic Screen */}
      <mesh position={[0, 0.62, 0]}>
        <boxGeometry args={[1.4, 0.3, 0.4]} />
        <meshStandardMaterial color="#EEF3FB" roughness={0.4} />
      </mesh>

      {/* Golden Quadriga (Chariot & Winged Victory) on Top */}
      <group position={[0, 0.85, 0]}>
        {/* Chariot Body */}
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[0.28, 0.12, 0.22]} />
          <GoldMaterial />
        </mesh>
        {/* Goddess Figure */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.03, 0.05, 0.22, 16]} />
          <GoldMaterial />
        </mesh>
        {/* Extended Wings */}
        <mesh position={[-0.1, 0.26, -0.04]} rotation={[0, 0.4, 0.5]}>
          <boxGeometry args={[0.18, 0.08, 0.02]} />
          <GoldMaterial />
        </mesh>
        <mesh position={[0.1, 0.26, -0.04]} rotation={[0, -0.4, -0.5]}>
          <boxGeometry args={[0.18, 0.08, 0.02]} />
          <GoldMaterial />
        </mesh>
      </group>
    </group>
  );
}
