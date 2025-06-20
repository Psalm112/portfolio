import { useMemo } from "react";
import * as THREE from "three";

function AdvancedBrain({ morphProgress }) {
  const brainGeometry = useMemo(() => {
    // Create more detailed brain geometry
    const geometry = new THREE.SphereGeometry(1.5, 64, 64);
    const positions = geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      const vertex = new THREE.Vector3(
        positions[i],
        positions[i + 1],
        positions[i + 2]
      );

      // Multiple noise layers for brain-like surface
      const noise1 = Math.sin(vertex.x * 4) * Math.cos(vertex.y * 4) * 0.1;
      const noise2 = Math.sin(vertex.x * 8) * Math.cos(vertex.z * 8) * 0.05;
      const noise3 = Math.sin(vertex.y * 12) * Math.cos(vertex.z * 12) * 0.025;

      const totalNoise = noise1 + noise2 + noise3;
      vertex.multiplyScalar(1 + totalNoise);

      positions[i] = vertex.x;
      positions[i + 1] = vertex.y;
      positions[i + 2] = vertex.z;
    }

    geometry.computeVertexNormals();
    return geometry;
  }, []);

  return (
    <mesh geometry={brainGeometry}>
      <meshStandardMaterial
        color="#ff6b9d"
        transparent
        opacity={morphProgress}
        roughness={0.7}
        metalness={0.2}
        normalScale={[0.5, 0.5]}
      />
    </mesh>
  );
}
