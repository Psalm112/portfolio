"use client";
import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import * as THREE from "three";

interface PostprocessingProps {
  bloomIntensity?: number;
  bloomRadius?: number;
  chromaticAberrationOffset?: number;
  noiseOpacity?: number;
  vignetteOffset?: number;
  vignetteDarkness?: number;
}

export const Postprocessing: React.FC<PostprocessingProps> = ({
  bloomIntensity = 0.8,
  bloomRadius = 0.4,
  chromaticAberrationOffset = 0.002,
  noiseOpacity = 0.1,
  vignetteOffset = 0.5,
  vignetteDarkness = 0.8,
}) => {
  const { viewport } = useThree();

  const chromaticAberrationProps = useMemo(
    () => ({
      offset: new THREE.Vector2(
        chromaticAberrationOffset,
        chromaticAberrationOffset,
      ),
      blendFunction: BlendFunction.NORMAL,
      radialModulation: false,
      modulationOffset: 0,
    }),
    [chromaticAberrationOffset],
  );

  return (
    <EffectComposer multisampling={4}>
      {/* Blueprint-themed bloom effect */}
      <Bloom
        intensity={bloomIntensity}
        kernelSize={KernelSize.MEDIUM}
        luminanceThreshold={0.1}
        luminanceSmoothing={0.9}
        radius={bloomRadius}
        blendFunction={BlendFunction.ADD}
      />

      {/* Chromatic aberration for that tech feel */}
      <ChromaticAberration {...chromaticAberrationProps} />

      {/* Subtle noise for texture */}
      <Noise opacity={noiseOpacity} blendFunction={BlendFunction.OVERLAY} />

      {/* Vignette for focus */}
      <Vignette
        offset={vignetteOffset}
        darkness={vignetteDarkness}
        blendFunction={BlendFunction.MULTIPLY}
      />
    </EffectComposer>
  );
};

export default Postprocessing;
