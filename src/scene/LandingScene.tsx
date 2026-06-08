import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { ParallaxImage } from './ParallaxImage';
import { Particles } from './Particles';
import { Effects } from './Effects';
import { CameraRig } from './CameraRig';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function LandingScene() {
  useMouseParallax();
  useReducedMotion();

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.75]}
      >
        <color attach="background" args={['#020611']} />
        <fog attach="fog" args={['#030813', 6, 18]} />

        <CameraRig shiftX={0.35} shiftY={0.18} />

        <Suspense fallback={null}>
          {/* Deep background — dimmed into the abyss, faint suggestion of stars */}
          <ParallaxImage
            url="/scene/background.png"
            z={-5}
            fillViewport
            anchorY="top"
            opacity={0.42}
            tint="#1d3049"
            bobAmplitude={0.04}
            bobSpeed={0.15}
            chromaCutoff={0.05}
          />

          {/* Midground — jellyfish + coral, muted cool blue */}
          <ParallaxImage
            url="/scene/midground.png"
            z={-2.5}
            fillViewport
            anchorY="center"
            position={[0, -0.6]}
            opacity={0.7}
            tint="#6e94b6"
            bobAmplitude={0.07}
            bobSpeed={0.3}
            bobPhase={1.3}
            swayAmplitude={0.04}
            chromaCutoff={0.04}
          />

          {/* Foreground — waves stay closest to legible, slight cool wash */}
          <ParallaxImage
            url="/scene/foreground.png"
            z={-0.8}
            fillViewport
            anchorY="bottom"
            position={[-0.9, -0.4]}
            opacity={1}
            tint="#b3cee4"
            bobAmplitude={0.1}
            bobSpeed={0.4}
            bobPhase={2.7}
            swayAmplitude={0.06}
            chromaCutoff={0.04}
          />

          <Particles count={180} spread={14} />
          <Effects />
        </Suspense>
      </Canvas>
    </div>
  );
}
