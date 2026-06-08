import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { BufferGeometry, BufferAttribute, Group } from 'three';

function useTriangleWing() {
  return useMemo(() => {
    const geo = new BufferGeometry();
    const verts = new Float32Array([
      0, 0, 0,
      1.4, 0.1, -0.3,
      0.5, 0, 0.6,
      0, 0, 0,
      0.5, 0, 0.6,
      1.0, -0.15, 0.4,
    ]);
    geo.setAttribute('position', new BufferAttribute(verts, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);
}

function Body() {
  const group = useRef<Group>(null);
  const leftWing = useRef<Group>(null);
  const rightWing = useRef<Group>(null);
  const wingGeo = useTriangleWing();

  useFrame((state) => {
    if (!group.current || !leftWing.current || !rightWing.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = Math.sin(t * 0.4) * 0.18;
    group.current.rotation.y = Math.sin(t * 0.25) * 0.4;
    group.current.rotation.z = Math.sin(t * 0.35) * 0.06;
    const flap = Math.sin(t * 1.1) * 0.35;
    leftWing.current.rotation.z = flap;
    rightWing.current.rotation.z = -flap;
  });

  return (
    <group ref={group} rotation={[-0.2, 0, 0]}>
      {/* central diamond body */}
      <mesh>
        <octahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color="#1d3049"
          emissive="#3ecfd6"
          emissiveIntensity={0.22}
          flatShading
          roughness={0.65}
        />
      </mesh>
      {/* left wing */}
      <group ref={leftWing}>
        <mesh geometry={wingGeo}>
          <meshStandardMaterial
            color="#1d3049"
            emissive="#3ecfd6"
            emissiveIntensity={0.18}
            flatShading
            roughness={0.75}
            side={2}
          />
        </mesh>
      </group>
      {/* right wing */}
      <group ref={rightWing} rotation={[0, Math.PI, 0]}>
        <mesh geometry={wingGeo}>
          <meshStandardMaterial
            color="#1d3049"
            emissive="#3ecfd6"
            emissiveIntensity={0.18}
            flatShading
            roughness={0.75}
            side={2}
          />
        </mesh>
      </group>
      {/* tail */}
      <mesh position={[0, 0, -0.55]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.04, 0.9, 3]} />
        <meshStandardMaterial
          color="#1d3049"
          emissive="#3ecfd6"
          emissiveIntensity={0.2}
          flatShading
        />
      </mesh>
    </group>
  );
}

export function MantaRay({ className = 'h-44 w-full' }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 1.6, 2.8], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.35} />
        <pointLight position={[2, 3, 2]} intensity={1} color="#7df9ff" />
        <pointLight position={[-1.5, -1, 1]} intensity={0.4} color="#d97ee6" />
        <Body />
      </Canvas>
    </div>
  );
}
