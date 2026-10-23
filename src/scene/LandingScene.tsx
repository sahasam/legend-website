import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, lazy, useRef } from 'react';
import { ParallaxImage } from './ParallaxImage';
import { Particles } from './Particles';
import { CameraRig } from './CameraRig';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Postprocessing (EffectComposer + Bloom's mip chain) is the heaviest thing to
// parse and initialize, and a subtle glow/vignette appearing a frame after the
// scene is imperceptible — so split it into its own chunk and mount it off the
// first-frame critical path.
const Effects = lazy(() => import('./Effects').then((m) => ({ default: m.Effects })));

// Fires once on the first frame rendered after the parallax textures have
// resolved (it lives inside <Suspense>, so it mounts only once they load).
// Flips data-scene-ready, which cross-fades the live canvas in over the instant
// poster (see index.html). Also marks the moment for load-time measurement /
// real-user monitoring.
function FirstFrameMark() {
  const marked = useRef(false);
  useFrame(() => {
    if (marked.current) return;
    marked.current = true;
    performance.mark('scene:first-frame');
    document.documentElement.setAttribute('data-scene-ready', '1');
  });
  return null;
}

export function LandingScene() {
  useMouseParallax();
  useReducedMotion();

  return (
    <div id="scene-canvas" className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        // MSAA off: the layers are full-bleed soft imagery with no on-screen
        // polygon edges, so antialiasing adds no visible quality here — but its
        // multisampled framebuffer + per-frame resolve measurably slow context
        // init and the first render. dpr still covers retina sharpness.
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.75]}
      >
        <color attach="background" args={['#020611']} />
        <fog attach="fog" args={['#030813', 6, 18]} />

        <CameraRig shiftX={0.35} shiftY={0.18} />

        <Suspense fallback={null}>
          {/* Deep background — dimmed into the abyss, faint suggestion of stars */}
          <ParallaxImage
            url="/scene/background.webp"
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
            url="/scene/midground.webp"
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
            url="/scene/foreground.webp"
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
          <FirstFrameMark />
        </Suspense>

        <Suspense fallback={null}>
          <Effects />
        </Suspense>
      </Canvas>
    </div>
  );
}
