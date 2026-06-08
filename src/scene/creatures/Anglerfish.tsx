import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Group, Mesh, MeshStandardMaterial } from 'three';

function Body() {
  const group = useRef<Group>(null);
  const lure = useRef<Mesh>(null);
  useFrame((state) => {
    if (!group.current || !lure.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = Math.sin(t * 0.5) * 0.12;
    group.current.rotation.y = Math.sin(t * 0.2) * 0.25;
    group.current.rotation.z = Math.sin(t * 0.4) * 0.04;
    const pulse = 0.7 + Math.sin(t * 2.2) * 0.3;
    (lure.current.material as MeshStandardMaterial).emissiveIntensity = pulse;
  });

  return (
    <group ref={group}>
      {/* body — stretched icosahedron, flat shaded */}
      <mesh scale={[1.1, 0.7, 0.7]} rotation={[0, 0, 0]}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#1a3247"
          emissive="#3ecfd6"
          emissiveIntensity={0.18}
          flatShading
          roughness={0.7}
        />
      </mesh>
      {/* tail */}
      <mesh position={[-0.85, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.35, 0.6, 3]} />
        <meshStandardMaterial
          color="#1a3247"
          emissive="#3ecfd6"
          emissiveIntensity={0.15}
          flatShading
          roughness={0.7}
        />
      </mesh>
      {/* top fin */}
      <mesh position={[0, 0.45, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.15, 0.4, 3]} />
        <meshStandardMaterial
          color="#1a3247"
          emissive="#3ecfd6"
          emissiveIntensity={0.12}
          flatShading
          roughness={0.8}
        />
      </mesh>
      {/* lure stem */}
      <mesh position={[0.45, 0.55, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.008, 0.012, 0.55, 4]} />
        <meshStandardMaterial color="#0b1730" roughness={0.9} />
      </mesh>
      {/* lure orb */}
      <mesh ref={lure} position={[0.7, 0.85, 0]}>
        <icosahedronGeometry args={[0.08, 0]} />
        <meshStandardMaterial
          color="#a8fff8"
          emissive="#7df9ff"
          emissiveIntensity={1.2}
          flatShading
        />
      </mesh>
    </group>
  );
}

export function Anglerfish({ className = 'h-40 w-full' }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[2, 1.5, 2]} intensity={1.2} color="#7df9ff" />
        <pointLight position={[-2, -1, 1]} intensity={0.5} color="#d97ee6" />
        <Body />
      </Canvas>
    </div>
  );
}
