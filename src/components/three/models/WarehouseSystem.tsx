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

  // Generate warehouse layout
  const { shelves, conveyorBelt, packages } = useMemo(() => {
    const shelfArray = [];
    const packageArray: Package[] = [];
    
    // Create shelf grid
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 6; col++) {
        shelfArray.push({
          position: new Vector3(
            (col - 2.5) * 2,
            0,
            (row - 1.5) * 3
          ),
          occupied: Math.random() > 0.3,
          id: `shelf-${row}-${col}`,
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
          shelf.position.z + (Math.random() - 0.5) * 0.5
        ),
        destination: new Vector3(
          (Math.random() - 0.5) * 10,
          0.5,
          (Math.random() - 0.5) * 8
        ),
        status: Math.random() > 0.7 ? "moving" : "storage",
        priority: Math.random() > 0.7 ? "high" : Math.random() > 0.5 ? "medium" : "low",
      });
    }

    // Conveyor belt path
    const beltPath = [];
    for (let i = 0; i < 20; i++) {
      beltPath.push(new Vector3(i - 10, 0.1, -6));
    }

    return {
      shelves: shelfArray,
      conveyorBelt: beltPath,
      packages: packageArray,
    };
  }, []);

  useFrame((state) => {
    if (!animated) return;

    // Animate conveyor belt
    if (conveyorRef.current) {
      conveyorRef.current.position.x = (state.clock.elapsedTime * 0.5) % 2;
    }

    // Update system metrics
    const activePackages = packages.filter(p => p.status === "moving").length;
    setThroughput(Math.floor(state.clock.elapsedTime * 2) + activePackages);

    // Simulate system status changes
    if (Math.floor(state.clock.elapsedTime) % 30 === 0) {
      const statuses = ["OPERATIONAL", "MAINTENANCE", "HIGH_LOAD", "OPTIMAL"];
      setSystemStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }
  });

  const getStatusColor = (status: string) => {
    const colors = {
      OPERATIONAL: "#00ff88",
      MAINTENANCE: "#ffff