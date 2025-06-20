import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Plane } from "@react-three/drei";
import * as THREE from "three";

function CircuitBoard({ morphProgress }) {
  const groupRef = useRef();

  // Circuit trace positions
  const traces = useMemo(() => {
    const traceData = [];
    for (let i = 0; i < 20; i++) {
      traceData.push({
        start: [Math.random() * 4 - 2, Math.random() * 4 - 2, 0.01],
        end: [Math.random() * 4 - 2, Math.random() * 4 - 2, 0.01],
        id: i,
      });
    }
    return traceData;
  }, []);

  // Electronic components positions
  const components = useMemo(() => {
    const compData = [];
    for (let i = 0; i < 15; i++) {
      compData.push({
        position: [Math.random() * 3 - 1.5, Math.random() * 3 - 1.5, 0.05],
        size: [0.1 + Math.random() * 0.1, 0.05 + Math.random() * 0.05, 0.02],
        id: i,
      });
    }
    return compData;
  }, []);

  return (
    <group ref={groupRef}>
      {/* PCB Base */}
      <Plane args={[4, 4]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#0d4f3c"
          transparent
          opacity={1 - morphProgress * 0.8}
        />
      </Plane>

      {/* Circuit Traces */}
      {traces.map((trace) => (
        <line key={trace.id}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...trace.start, ...trace.end])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#00ff88"
            transparent
            opacity={1 - morphProgress}
          />
        </line>
      ))}

      {/* Electronic Components */}
      {components.map((comp) => (
        <Box key={comp.id} args={comp.size} position={comp.position}>
          <meshStandardMaterial
            color="#333"
            transparent
            opacity={1 - morphProgress}
          />
        </Box>
      ))}
    </group>
  );
}

export default CircuitBoard;
