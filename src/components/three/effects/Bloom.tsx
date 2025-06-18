"use client";
// import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom as BloomPass,
  FXAA,
} from "@react-three/postprocessing";
import * as THREE from "three";

interface BloomProps {
  strength?: number;
  radius?: number;
  threshold?: number;
}

export const Bloom: React.FC<BloomProps> = ({
  strength = 1,
  radius = 0.4,
  threshold = 0.85,
}) => {
  const { size } = useThree();

  return (
    <EffectComposer>
      <BloomPass
        intensity={strength}
        luminanceThreshold={threshold}
        luminanceSmoothing={radius}
      />
      <FXAA />
    </EffectComposer>
  );
};

export default Bloom;
