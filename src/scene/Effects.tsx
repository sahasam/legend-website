import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.8}
        luminanceThreshold={0.25}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette
        offset={0.35}
        darkness={0.85}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
