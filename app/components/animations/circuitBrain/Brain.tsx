import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

function Brain({ morphProgress }) {
  const meshRef = useRef();

  // Create brain-like geometry
  const brainGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const positions = geometry.attributes.position.array;

    // Add noise to create brain-like surface
    for (let i = 0; i < positions.length; i += 3) {
      const vertex = new THREE.Vector3(
        positions[i],
        positions[i + 1],
        positions[i + 2]
      );
      const noise =
        Math.sin(vertex.x * 3) *
        Math.cos(vertex.y * 3) *
        Math.sin(vertex.z * 3);
      vertex.multiplyScalar(1 + noise * 0.1);
      positions[i] = vertex.x;
      positions[i + 1] = vertex.y;
      positions[i + 2] = vertex.z;
    }

    geometry.computeVertexNormals();
    return geometry;
  }, []);

  // Brain material with pulsing effect
  const brainMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#ff6b9d",
      transparent: true,
      opacity: morphProgress,
      roughness: 0.8,
      metalness: 0.1,
    });
  }, [morphProgress]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Subtle pulsing animation
      const scale = 1 + Math.sin(clock.elapsedTime * 2) * 0.05;
      meshRef.current.scale.setScalar(scale * morphProgress);
    }
  });

  return (
    <mesh ref={meshRef} geometry={brainGeometry} material={brainMaterial}>
      {/* Neural network lines */}
      <group>
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={
                  new Float32Array([
                    Math.sin(i) * 1.2,
                    Math.cos(i) * 1.2,
                    Math.sin(i * 0.5) * 1.2,
                    Math.sin(i + 1) * 1.2,
                    Math.cos(i + 1) * 1.2,
                    Math.sin((i + 1) * 0.5) * 1.2,
                  ])
                }
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#ff9a9e"
              transparent
              opacity={morphProgress * 0.6}
            />
          </line>
        ))}
      </group>
    </mesh>
  );
}

export default Brain;
