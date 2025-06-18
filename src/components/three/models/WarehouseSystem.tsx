"use client";
import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Vector3 } from "three";
import { Text, Box } from "@react-three/drei";
import { CircuitMaterial } from "../materials/CircuitMaterial";

interface Package {
  id: string;
  position: Vector3;
  destination: Vector3;
  status: "storage" | "moving" | "delivered";
  priority: "low" | "medium" | "high";
}

interface WarehouseSystemProps {
  position?: [number, number, number];
  scale?: number;
  animated?: boolean;
}

export const WarehouseSystem: React.FC<WarehouseSystemProps> = ({
  position = [0, 0, 0],
  scale = 1,
  animated = true,
}) => {
  const groupRef = useRef<Group>(null);
  const conveyorRef = useRef<Group>(null);

  const [systemStatus, setSystemStatus] = useState("OPERATIONAL");
  const [throughput, setThroughput] = useState(0);
  const [activeRobots, setActiveRobots] = useState(3);

  // Generate warehouse layout
  const { shelves, conveyorBelt, packages, robots } = useMemo(() => {
    const shelfArray = [];
    const packageArray: Package[] = [];
    const robotArray = [];

    // Create shelf grid
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 6; col++) {
        shelfArray.push({
          position: new Vector3((col - 2.5) * 2, 0, (row - 1.5) * 3),
          occupied: Math.random() > 0.3,
          id: `shelf-${row}-${col}`,
          height: 2 + Math.random() * 1,
        });
      }
    }

    // Create packages
    for (let i = 0; i < 15; i++) {
      const shelf = shelfArray[Math.floor(Math.random() * shelfArray.length)];
      packageArray.push({
        id: `package-${i}`,
        position: new Vector3(
          shelf.position.x + (Math.random() - 0.5) * 0.5,
          0.5,
          shelf.position.z + (Math.random() - 0.5) * 0.5,
        ),
        destination: new Vector3(
          (Math.random() - 0.5) * 10,
          0.5,
          (Math.random() - 0.5) * 8,
        ),
        status: Math.random() > 0.7 ? "moving" : "storage",
        priority:
          Math.random() > 0.7 ? "high" : Math.random() > 0.5 ? "medium" : "low",
      });
    }

    // Conveyor belt path
    const beltPath = [];
    for (let i = 0; i < 20; i++) {
      beltPath.push(new Vector3(i - 10, 0.1, -6));
    }

    // Create autonomous robots
    for (let i = 0; i < 3; i++) {
      robotArray.push({
        id: `robot-${i}`,
        position: new Vector3(
          (Math.random() - 0.5) * 8,
          0.3,
          (Math.random() - 0.5) * 6,
        ),
        target: new Vector3(0, 0, 0),
        status: "active",
      });
    }

    return {
      shelves: shelfArray,
      conveyorBelt: beltPath,
      packages: packageArray,
      robots: robotArray,
    };
  }, []);

  useFrame((state) => {
    if (!animated) return;

    // Animate conveyor belt
    if (conveyorRef.current) {
      conveyorRef.current.position.x = (state.clock.elapsedTime * 0.5) % 2;
    }

    // Update system metrics
    const activePackages = packages.filter((p) => p.status === "moving").length;
    setThroughput(Math.floor(state.clock.elapsedTime * 2) + activePackages);

    // Simulate robot movement
    robots.forEach((robot, index) => {
      const time = state.clock.elapsedTime + index * 2;
      robot.position.x = Math.sin(time * 0.3) * 4;
      robot.position.z = Math.cos(time * 0.2) * 3;
    });

    // Simulate system status changes
    if (Math.floor(state.clock.elapsedTime) % 30 === 0) {
      const statuses = ["OPERATIONAL", "MAINTENANCE", "HIGH_LOAD", "OPTIMAL"];
      setSystemStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }
  });

  const getStatusColor = (status: string) => {
    const colors = {
      OPERATIONAL: "#00ff88",
      MAINTENANCE: "#ffff00",
      HIGH_LOAD: "#ff8800",
      OPTIMAL: "#00d4ff",
    };
    return colors[status as keyof typeof colors] || "#ffffff";
  };

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Warehouse floor */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[20, 0.2, 16]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Shelving units */}
      {shelves.map((shelf, index) => (
        <group key={shelf.id} position={shelf.position.toArray()}>
          {/* Shelf structure */}
          <mesh position={[0, shelf.height / 2, 0]}>
            <boxGeometry args={[1.5, shelf.height, 0.8]} />
            <meshStandardMaterial color="#3a3a3a" />
          </mesh>

          {/* Storage indicators */}
          {shelf.occupied && (
            <mesh position={[0, shelf.height + 0.2, 0]}>
              <boxGeometry args={[0.3, 0.1, 0.3]} />
              <CircuitMaterial
                color1="#00ff88"
                intensity={0.8}
                animated={animated}
              />
            </mesh>
          )}

          {/* Shelf labels */}
          <Text
            position={[0, shelf.height + 0.5, 0.5]}
            fontSize={0.1}
            color="#00d4ff"
            anchorX="center"
            font="/fonts/JetBrainsMono-Regular.woff"
          >
            {shelf.id.toUpperCase()}
          </Text>
        </group>
      ))}

      {/* Conveyor belt system */}
      <group ref={conveyorRef}>
        {conveyorBelt.map((point, index) => (
          <mesh key={index} position={point.toArray()}>
            <boxGeometry args={[0.8, 0.1, 1]} />
            <meshStandardMaterial color="#4a4a4a" />
          </mesh>
        ))}
      </group>

      {/* Conveyor belt rails */}
      <mesh position={[0, 0.15, -6]}>
        <boxGeometry args={[20, 0.05, 1.2]} />
        <CircuitMaterial color1="#0070f3" intensity={0.6} animated={animated} />
      </mesh>

      {/* Packages */}
      {packages.map((pkg) => {
        const color =
          pkg.priority === "high"
            ? "#ff0066"
            : pkg.priority === "medium"
              ? "#ffff00"
              : "#00ff88";

        return (
          <group key={pkg.id} position={pkg.position.toArray()}>
            <mesh>
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshStandardMaterial color="#654321" />
            </mesh>

            {/* Priority indicator */}
            <mesh position={[0, 0.2, 0]}>
              <sphereGeometry args={[0.05]} />
              <CircuitMaterial
                color1={color}
                intensity={pkg.status === "moving" ? 1.5 : 0.8}
                animated={animated}
              />
            </mesh>
          </group>
        );
      })}

      {/* Autonomous robots */}
      {robots.map((robot) => (
        <group key={robot.id} position={robot.position.toArray()}>
          {/* Robot body */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.6, 0.3, 0.8]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>

          {/* Robot sensors */}
          <mesh position={[0, 0.2, 0.5]}>
            <cylinderGeometry args={[0.05, 0.05, 0.1]} />
            <CircuitMaterial
              color1="#00d4ff"
              intensity={1.2}
              animated={animated}
            />
          </mesh>

          {/* LIDAR sensor */}
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.05]} />
            <CircuitMaterial
              color1="#00ffff"
              intensity={1.0}
              animated={animated}
            />
          </mesh>

          {/* Wheels */}
          {[-0.2, 0.2].map((x, i) => (
            <mesh
              key={i}
              position={[x, -0.1, 0.3]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry args={[0.08, 0.08, 0.05]} />
              <meshStandardMaterial color="#333" />
            </mesh>
          ))}
        </group>
      ))}

      {/* Control center */}
      <group position={[8, 1, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 2, 0.5]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Control panel screens */}
        <mesh position={[0, 0, 0.3]}>
          <boxGeometry args={[1.8, 1.8, 0.1]} />
          <CircuitMaterial
            color1="#0070f3"
            intensity={0.8}
            animated={animated}
          />
        </mesh>
      </group>

      {/* System status display */}
      <group position={[-8, 4, 0]}>
        <Text
          position={[0, 1, 0]}
          fontSize={0.15}
          color={getStatusColor(systemStatus)}
          anchorX="left"
          font="/fonts/JetBrainsMono-Regular.woff"
        >
          SYSTEM STATUS: {systemStatus}
        </Text>

        <Text
          position={[0, 0.7, 0]}
          fontSize={0.12}
          color="#00d4ff"
          anchorX="left"
          font="/fonts/JetBrainsMono-Regular.woff"
        >
          THROUGHPUT: {throughput} units/hour
        </Text>

        <Text
          position={[0, 0.4, 0]}
          fontSize={0.12}
          color="#00ff88"
          anchorX="left"
          font="/fonts/JetBrainsMono-Regular.woff"
        >
          ACTIVE ROBOTS: {activeRobots}
        </Text>

        <Text
          position={[0, 0.1, 0]}
          fontSize={0.1}
          color="#ffffff"
          anchorX="left"
          font="/fonts/JetBrainsMono-Regular.woff"
        >
          EFFICIENCY: 98.7%
        </Text>
      </group>

      {/* Safety barriers */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[-7 + i * 2, 0.5, 7]}>
          <boxGeometry args={[0.1, 1, 0.1]} />
          <CircuitMaterial
            color1="#ff8800"
            intensity={0.6}
            animated={animated}
          />
        </mesh>
      ))}

      {/* Data flow visualization */}
      <group position={[0, 5, 0]}>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh
            key={i}
            position={[i * 2 - 4, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <torusGeometry args={[0.3, 0.02]} />
            <CircuitMaterial
              color1="#00d4ff"
              intensity={0.8 - i * 0.1}
              animated={animated}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export default WarehouseSystem;
