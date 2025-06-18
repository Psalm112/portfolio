"use client";
import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Vector3 } from "three";
import { Text, Line } from "@react-three/drei";
import { CircuitMaterial } from "../materials/CircuitMaterial";

interface Node {
  id: string;
  position: Vector3;
  type: "sensor" | "gateway" | "server" | "device";
  connections: string[];
  data?: any;
}

interface IoTNetworkProps {
  position?: [number, number, number];
  scale?: number;
  animated?: boolean;
  nodeCount?: number;
}

export const IoTNetwork: React.FC<IoTNetworkProps> = ({
  position = [0, 0, 0],
  scale = 1,
  animated = true,
  nodeCount = 12,
}) => {
  const groupRef = useRef<Group>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [dataFlow, setDataFlow] = useState(false);

  // Generate network topology
  const { nodes, connections } = useMemo(() => {
    const nodeArray: Node[] = [];
    const connectionArray: { from: Vector3; to: Vector3; active: boolean }[] =
      [];

    // Central gateway
    nodeArray.push({
      id: "gateway",
      position: new Vector3(0, 0, 0),
      type: "gateway",
      connections: [],
    });

    // Sensor nodes in circular arrangement
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 3 + Math.random() * 2;
      const height = (Math.random() - 0.5) * 2;

      const nodeType =
        Math.random() > 0.7
          ? "server"
          : Math.random() > 0.5
            ? "device"
            : "sensor";

      nodeArray.push({
        id: `node-${i}`,
        position: new Vector3(
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius,
        ),
        type: nodeType,
        connections: ["gateway"],
      });

      // Create connections
      connectionArray.push({
        from: nodeArray[0].position,
        to: nodeArray[nodeArray.length - 1].position,
        active: Math.random() > 0.5,
      });
    }

    // Add inter-node connections
    for (let i = 1; i < nodeArray.length; i++) {
      if (Math.random() > 0.7) {
        const targetIndex =
          Math.floor(Math.random() * (nodeArray.length - 1)) + 1;
        if (targetIndex !== i) {
          connectionArray.push({
            from: nodeArray[i].position,
            to: nodeArray[targetIndex].position,
            active: Math.random() > 0.3,
          });
        }
      }
    }

    return { nodes: nodeArray, connections: connectionArray };
  }, [nodeCount]);

  useFrame((state) => {
    if (groupRef.current && animated) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1;

      // Simulate data flow
      if (Math.floor(state.clock.elapsedTime * 2) % 5 === 0) {
        setDataFlow(true);
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        setActiveNode(randomNode.id);
      } else {
        setDataFlow(false);
        setActiveNode(null);
      }
    }
  });

  const getNodeColor = (type: string, isActive: boolean) => {
    const colors = {
      gateway: "#00d4ff",
      sensor: "#00ff88",
      device: "#ffff00",
      server: "#ff0066",
    };
    return isActive ? "#ffffff" : colors[type as keyof typeof colors];
  };

  const getNodeSize = (type: string) => {
    const sizes = {
      gateway: 0.3,
      sensor: 0.15,
      device: 0.2,
      server: 0.25,
    };
    return sizes[type as keyof typeof sizes];
  };

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Network connections */}
      {connections.map((connection, index) => (
        <Line
          key={index}
          points={[connection.from, connection.to]}
          color={connection.active && dataFlow ? "#00ffff" : "#0070f3"}
          lineWidth={connection.active && dataFlow ? 3 : 1}
          transparent
          opacity={connection.active ? 0.8 : 0.3}
        />
      ))}

      {/* Network nodes */}
      {nodes.map((node) => {
        const isActive = activeNode === node.id;
        const nodeSize = getNodeSize(node.type);

        return (
          <group
            key={node.id}
            position={node.position}
            onClick={() => setActiveNode(node.id)}
          >
            {/* Node geometry based on type */}
            {node.type === "gateway" ? (
              <mesh>
                <octahedronGeometry args={[nodeSize]} />
                <CircuitMaterial
                  color1={getNodeColor(node.type, isActive)}
                  color2="#ffffff"
                  intensity={isActive ? 2 : 1}
                  animated={animated}
                />
              </mesh>
            ) : node.type === "server" ? (
              <mesh>
                <boxGeometry args={[nodeSize, nodeSize * 1.5, nodeSize]} />
                <CircuitMaterial
                  color1={getNodeColor(node.type, isActive)}
                  color2="#ffffff"
                  intensity={isActive ? 2 : 1}
                  animated={animated}
                />
              </mesh>
            ) : (
              <mesh>
                <sphereGeometry args={[nodeSize]} />
                <CircuitMaterial
                  color1={getNodeColor(node.type, isActive)}
                  color2="#ffffff"
                  intensity={isActive ? 2 : 1}
                  animated={animated}
                />
              </mesh>
            )}

            {/* Data transmission indicator */}
            {isActive && dataFlow && (
              <group>
                {Array.from({ length: 3 }).map((_, i) => (
                  <mesh key={i} position={[0, nodeSize + 0.1 + i * 0.05, 0]}>
                    <sphereGeometry args={[0.02]} />
                    <CircuitMaterial
                      color1="#ffffff"
                      intensity={2}
                      animated={animated}
                    />
                  </mesh>
                ))}
              </group>
            )}

            {/* Node labels */}
            <Text
              position={[0, nodeSize + 0.3, 0]}
              fontSize={0.08}
              color={getNodeColor(node.type, isActive)}
              anchorX="center"
              anchorY="middle"
              font="/fonts/JetBrainsMono-Regular.woff"
            >
              {node.type.toUpperCase()}
            </Text>
          </group>
        );
      })}

      {/* Network status display */}
      <Text
        position={[0, -4, 0]}
        fontSize={0.12}
        color="#00d4ff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Regular.woff"
      >
        IoT Network Status: {dataFlow ? "DATA TRANSMITTING" : "STANDBY"}
      </Text>

      {/* Network statistics */}
      <group position={[-3, -3, 0]}>
        <Text
          position={[0, 0.3, 0]}
          fontSize={0.08}
          color="#00ff88"
          anchorX="left"
          font="/fonts/JetBrainsMono-Regular.woff"
        >
          Nodes: {nodes.length}
        </Text>
        <Text
          position={[0, 0.1, 0]}
          fontSize={0.08}
          color="#00ff88"
          anchorX="left"
          font="/fonts/JetBrainsMono-Regular.woff"
        >
          Connections: {connections.length}
        </Text>
        <Text
          position={[0, -0.1, 0]}
          fontSize={0.08}
          color="#00ff88"
          anchorX="left"
          font="/fonts/JetBrainsMono-Regular.woff"
        >
          Active: {connections.filter((c) => c.active).length}
        </Text>
      </group>
    </group>
  );
};

export default IoTNetwork;
