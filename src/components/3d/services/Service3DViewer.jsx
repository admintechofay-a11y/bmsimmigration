import React, { Suspense, lazy } from 'react';
import { OrbitControls } from '@react-three/drei';
import SceneViewport from '../SceneViewport';
import CanvasLoader from '../CanvasLoader';

// Dynamic lazy imports ensure each 3D object is in its own separate bundle chunk (< 15 KB gzipped)
const StudyVisa3D = lazy(() => import('./StudyVisa3D'));
const TouristVisa3D = lazy(() => import('./TouristVisa3D'));
const SOPDoc3D = lazy(() => import('./SOPDoc3D'));
const RefusalCases3D = lazy(() => import('./RefusalCases3D'));
const InsideCanada3D = lazy(() => import('./InsideCanada3D'));
const OfferLetter3D = lazy(() => import('./OfferLetter3D'));

const SERVICE_COMPONENTS = {
  'study-visa-assistance': StudyVisa3D,
  'tourist-visitor-visa': TouristVisa3D,
  'sop-documentation': SOPDoc3D,
  'refusal-reapplication': RefusalCases3D,
  'inside-canada-applications': InsideCanada3D,
  'offer-letter-assistance': OfferLetter3D,
};

export default function Service3DViewer({
  slug,
  className = 'w-full h-full min-h-[320px]',
  fallback = null,
}) {
  const TargetComponent = SERVICE_COMPONENTS[slug] || StudyVisa3D;

  return (
    <div className={`relative ${className}`}>
      <SceneViewport
        sceneId={`service-${slug}`}
        fallback={fallback}
        camera={{ position: [0, 0, 3.6], fov: 45 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        controls={
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1.0}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 3}
            dampingFactor={0.05}
          />
        }
      >
        <Suspense fallback={<CanvasLoader />}>
          <TargetComponent />
        </Suspense>
      </SceneViewport>
    </div>
  );
}
