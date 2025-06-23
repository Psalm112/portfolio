"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Float, Html, Stars } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useSpring, a } from "@react-spring/three";

export function MorphingBrain() {
  const circuitRef = useRef<THREE.Object3D | null>(null);
  const brainRef = useRef<THREE.Object3D | null>(null);

  const { nodes: circuitNodes } = useGLTF("./models/circuit_board.glb");
  const { nodes: brainNodes } = useGLTF("./models/brain.gltf");

  console.log("circuitNodes", circuitNodes);
  console.log("brainNodes", brainNodes);
  const boardObject = circuitNodes?.board;
  const backgroundObject = brainNodes?.Background;
  const environmentObject = brainNodes?.StudioA_Environment;
  //   const circuitObject = circuitNodes?.Circuit;
  const brainObject = brainNodes?.Brain;

  useFrame((state, delta) => {
    if (circuitRef.current) circuitRef.current.rotation.y += delta * 0.3;
    if (brainRef.current) brainRef.current.rotation.y += delta * 0.2;
  });

  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    config: { mass: 2, tension: 180, friction: 30 },
    delay: 500,
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} fade />

      <Float speed={2} floatIntensity={1.5}>
        <a.group scale={scale}>
          {boardObject && (
            <primitive
              object={boardObject}
              ref={circuitRef}
              position={[0, 0, 0]}
              visible={true}
            />
          )}

          {brainObject && (
            <primitive
              object={brainObject}
              ref={brainRef}
              position={[0, 0, 0]}
              visible={true}
              material={
                new THREE.MeshStandardMaterial({
                  color: "#64b5f6",
                  transparent: true,
                  opacity: 0.9,
                  emissive: "#64b5f6",
                  emissiveIntensity: 0.5,
                })
              }
            />
          )}
        </a.group>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
}

export default function BrainCanvas() {
  const handleContextLost = (event: Event) => {
    event.preventDefault();
    alert("WebGL context lost. Please reload the page.");
  };

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.addEventListener("webglcontextlost", handleContextLost, false);
      return () => {
        canvas.removeEventListener(
          "webglcontextlost",
          handleContextLost,
          false
        );
      };
    }
  }, []);
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      className="absolute inset-0 z-10"
    >
      <MorphingBrain />
    </Canvas>
  );
}
