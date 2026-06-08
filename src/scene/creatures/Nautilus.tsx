import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Group } from 'three';

const SEGMENTS = 9;

function Shell() {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.z = t * 0.12;
    group.current.position.y = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <group ref={group}>
      {Array.from({ length: SEGMENTS }).map((_, i) => {
        const ratio = i / SEGMENTS;
        const angle = ratio * Math.PI * 2.2;
        const radius = 0.18 + ratio * 0.55;
        const size = 0.08 + ratio * 0.22;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}
            rotation={[0, 0, angle]}
          >
            <tetrahedronGeometry args={[size, 0]} />
            <meshStandardMaterial
              color="#152340"
              emissive="#7df9ff"
              emissiveIntensity={0.15 + ratio * 0.3}
              flatShading
              roughness={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export function Nautilus({ className = 'h-44 w-full' }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 2.4], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.35} />
        <pointLight position={[2, 1, 2]} intensity={1.1} color="#7df9ff" />
        <pointLight position={[-1.5, -1, 1]} intensity={0.4} color="#d97ee6" />
        <Shell />
      </Canvas>
    </div>
  );
}
