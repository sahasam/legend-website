import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Group } from 'three';

function Bell() {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = Math.sin(t * 0.6) * 0.2;
    group.current.scale.y = 1 + Math.sin(t * 1.4) * 0.06;
    group.current.rotation.z = Math.sin(t * 0.3) * 0.05;
  });
  return (
    <group ref={group}>
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.7, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#d97ee6"
          emissive="#7df9ff"
          emissiveIntensity={0.6}
          transparent
          opacity={0.55}
          roughness={0.2}
        />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[Math.cos((i / 8) * Math.PI * 2) * 0.3, -0.4, Math.sin((i / 8) * Math.PI * 2) * 0.3]}
        >
          <cylinderGeometry args={[0.02, 0.005, 0.9, 6]} />
          <meshStandardMaterial
            color="#a8fff8"
            emissive="#7df9ff"
            emissiveIntensity={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function JellyfishHero() {
  return (
    <div className="h-48 w-full">
      <Canvas
        camera={{ position: [0, 0, 2.6], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 2, 2]} intensity={1} color="#7df9ff" />
        <Bell />
      </Canvas>
    </div>
  );
}
