import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import {
  Mesh,
  ShaderMaterial,
  Color,
  AdditiveBlending,
  NormalBlending,
  Vector3,
} from 'three';
import { useSceneStore } from '../state/store';

type AnchorY = 'top' | 'center' | 'bottom';

type Props = {
  url: string;
  z: number;
  position?: [number, number];
  opacity?: number;
  tint?: string;
  bobAmplitude?: number;
  bobSpeed?: number;
  bobPhase?: number;
  swayAmplitude?: number;
  additive?: boolean;
  chromaCutoff?: number;
  fillViewport?: boolean;
  height?: number;
  overscan?: number;
  /**
   * Which edge of the plane should align with the corresponding viewport edge
   * when the viewport aspect doesn't match the texture aspect. Use 'top' for
   * sky/haze layers, 'bottom' for ground/wave layers, 'center' otherwise.
   */
  anchorY?: AnchorY;
};

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform sampler2D uMap;
  uniform vec3 uTint;
  uniform float uOpacity;
  uniform float uChromaCutoff;
  varying vec2 vUv;
  void main() {
    vec4 tex = texture2D(uMap, vUv);
    float w = min(tex.r, min(tex.g, tex.b));
    float chroma = 1.0 - w;
    float a = smoothstep(uChromaCutoff, uChromaCutoff + 0.2, chroma) * tex.a * uOpacity;
    if (a < 0.02) discard;
    vec3 purified = clamp((tex.rgb - vec3(w)) / max(chroma, 0.001), 0.0, 1.0);
    gl_FragColor = vec4(purified * uTint, a);
  }
`;

export function ParallaxImage({
  url,
  z,
  position = [0, 0],
  opacity = 1,
  tint = '#ffffff',
  bobAmplitude = 0.08,
  bobSpeed = 0.3,
  bobPhase = 0,
  swayAmplitude = 0.05,
  additive = false,
  chromaCutoff = 0.06,
  fillViewport = false,
  height = 6,
  overscan = 1.15,
  anchorY = 'center',
}: Props) {
  const ref = useRef<Mesh>(null);
  const reducedMotion = useSceneStore((s) => s.reducedMotion);
  const texture = useTexture(url);
  const viewport = useThree((s) => s.viewport);

  const material = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
      blending: additive ? AdditiveBlending : NormalBlending,
      uniforms: {
        uMap: { value: texture },
        uTint: { value: new Color(tint) },
        uOpacity: { value: opacity },
        uChromaCutoff: { value: chromaCutoff },
      },
    });
  }, [texture, tint, opacity, chromaCutoff, additive]);

  const { planeW, planeH, anchorOffsetY } = useMemo(() => {
    const img = texture.image as { width?: number; height?: number } | undefined;
    const texAspect = img && img.width && img.height ? img.width / img.height : 1;
    if (fillViewport) {
      const v = viewport.getCurrentViewport(undefined, new Vector3(0, 0, z));
      const fitByH = { w: v.height * texAspect, h: v.height };
      const fitByW = { w: v.width, h: v.width / texAspect };
      const base = fitByH.w >= v.width ? fitByH : fitByW;
      const w = base.w * overscan;
      const h = base.h * overscan;
      const verticalOverflow = (h - v.height) / 2;
      let yOffset = 0;
      if (anchorY === 'top') yOffset = -verticalOverflow;
      else if (anchorY === 'bottom') yOffset = verticalOverflow;
      return { planeW: w, planeH: h, anchorOffsetY: yOffset };
    }
    return { planeW: height * texAspect, planeH: height, anchorOffsetY: 0 };
  }, [texture, height, fillViewport, viewport, z, overscan, anchorY]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;

    if (reducedMotion) {
      ref.current.position.x = position[0];
      ref.current.position.y = position[1] + anchorOffsetY;
      return;
    }

    // No mouse-driven offset here — the camera handles parallax via perspective.
    // This layer only adds organic drift via bob/sway.
    const targetX = position[0] + Math.sin(t * bobSpeed * 0.7 + bobPhase) * swayAmplitude;
    const targetY =
      position[1] + anchorOffsetY + Math.sin(t * bobSpeed + bobPhase) * bobAmplitude;
    ref.current.position.x += (targetX - ref.current.position.x) * 0.06;
    ref.current.position.y += (targetY - ref.current.position.y) * 0.06;
  });

  return (
    <mesh ref={ref} position={[position[0], position[1] + anchorOffsetY, z]} material={material}>
      <planeGeometry args={[planeW, planeH]} />
    </mesh>
  );
}
