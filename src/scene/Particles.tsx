import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { BufferAttribute, Points } from 'three';
import { useSceneStore } from '../state/store';

type Props = { count?: number; spread?: number };

export function Particles({ count = 220, spread = 12 }: Props) {
  const ref = useRef<Points>(null);
  const reducedMotion = useSceneStore((s) => s.reducedMotion);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
      arr[i * 3 + 2] = -Math.random() * 6 - 0.5;
    }
    return arr;
  }, [count, spread]);

  const seeds = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) arr[i] = Math.random() * 1000;
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current || reducedMotion) return;
    const t = state.clock.elapsedTime;
    const attr = ref.current.geometry.attributes.position as BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const seed = seeds[i];
      arr[i * 3 + 1] += Math.sin(t * 0.2 + seed) * 0.0006;
      arr[i * 3] += Math.cos(t * 0.15 + seed * 0.7) * 0.0004;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a8fff8"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
}
