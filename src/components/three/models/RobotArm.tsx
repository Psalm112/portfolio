"use client";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh } from "three";
import { Text } from "@react-three/drei";
import { CircuitMaterial } from "../materials/CircuitMaterial";

interface RobotArmProps {
  position?: [number, number, number];
  scale?: number;
  animated?: boolean;
  automate?: boolean;
}

interface JointState {
  base: number;
  shoulder: number;
  elbow: number;
  wrist: number;
  gripper: number;
}

export const RobotArm: React.FC<RobotArmProps> = ({
  position = [0, 0, 0],
  scale = 1,
  animated = true,
  automate = true,
}) => {
  const groupRef = useRef<Group>(null);
  const baseRef = useRef<Mesh>(null);
  const shoulderRef = useRef<Group>(null);
  const elbowRef = useRef<Group>(null);
  const wristRef = useRef<Group>(null);
  const gripperLeftRef = useRef<Mesh>(null);
  const gripperRightRef = useRef<Mesh>(null);

  const [jointStates, setJointStates] = useState<JointState>({
    base: 0,
    shoulder: 0,
    elbow: 0,
    wrist: 0,
    gripper: 0,
  });

  const [isOperating, setIsOperating] = useState(false);
  const [currentTask, setCurrentTask] = useState("STANDBY");

  // Predefined movement sequences
  const sequences = [
    {
      name: "PICK_AND_PLACE",
      steps: [
        { base: 0, shoulder: -0.5, elbow: 1.2, wrist: -0.7, gripper: 0.5 },
        { base: 0, shoulder: -0.3, elbow: 0.8, wrist: -0.5, gripper: 0.1 },
        { base: 1.2, shoulder: -0.3, elbow: 0.8, wrist: -0.5, gripper: 0.1 },
        { base: 1.2, shoulder: -0.5, elbow: 1.2, wrist: -0.7, gripper: 0.5 },
        { base: 0, shoulder: 0, elbow: 0, wrist: 0, gripper: 0 },
      ],
    },
    {
      name: "ASSEMBLY",
      steps: [
        { base: -0.8, shoulder: -0.4, elbow: 0.9, wrist: -0.5, gripper: 0.3 },
        { base: -0.8, shoulder: -0.6, elbow: 1.4, wrist: -0.8, gripper: 0.1 },
        { base: 0.8, shoulder: -0.6, elbow: 1.4, wrist: -0.8, gripper: 0.1 },
        { base: 0.8, shoulder: -0.4, elbow: 0.9, wrist: -0.5, gripper: 0.4 },
        { base: 0, shoulder: 0, elbow: 0, wrist: 0, gripper: 0 },
      ],
    },
  ];

  let sequenceIndex = 0;
  let stepIndex = 0;

  useFrame((state) => {
    if (!animated) return;

    if (automate && Math.floor(state.clock.elapsedTime * 0.5) % 10 === 0) {
      if (!isOperating) {
        setIsOperating(true);
        const sequence = sequences[sequenceIndex % sequences.length];
        setCurrentTask(sequence.name);
      }
    }

    if (isOperating) {
      const sequence = sequences[sequenceIndex % sequences.length];
      const targetStep = sequence.steps[stepIndex];

      // Smooth interpolation to target position
      setJointStates((prev) => ({
        base: prev.base + (targetStep.base - prev.base) * 0.02,
        shoulder: prev.shoulder + (targetStep.shoulder - prev.shoulder) * 0.02,
        elbow: prev.elbow + (targetStep.elbow - prev.elbow) * 0.02,
        wrist: prev.wrist + (targetStep.wrist - prev.wrist) * 0.02,
        gripper: prev.gripper + (targetStep.gripper - prev.gripper) * 0.02,
      }));

      // Check if reached target
      const threshold = 0.05;
      const reached = Object.keys(targetStep).every(
        (key) =>
          Math.abs(
            jointStates[key as keyof JointState] -
              targetStep[key as keyof JointState],
          ) < threshold,
      );

      if (reached) {
        stepIndex++;
        if (stepIndex >= sequence.steps.length) {
          stepIndex = 0;
          sequenceIndex++;
          setIsOperating(false);
          setCurrentTask("STANDBY");
        }
      }
    }

    // Apply rotations
    if (baseRef.current) baseRef.current.rotation.y = jointStates.base;
    if (shoulderRef.current)
      shoulderRef.current.rotation.z = jointStates.shoulder;
    if (elbowRef.current) elbowRef.current.rotation.z = jointStates.elbow;
    if (wristRef.current) wristRef.current.rotation.z = jointStates.wrist;
    if (gripperLeftRef.current)
      gripperLeftRef.current.position.x = -0.1 - jointStates.gripper * 0.1;
    if (gripperRightRef.current)
      gripperRightRef.current.position.x = 0.1 + jointStates.gripper * 0.1;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Base */}
      <mesh ref={baseRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 1, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Base joint indicator */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1]} />
        <CircuitMaterial
          color1="#00d4ff"
          intensity={isOperating ? 1.5 : 0.8}
          animated={animated}
        />
      </mesh>

      {/* Shoulder link */}
      <group ref={shoulderRef} position={[0, 0.3, 0]}>
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[0.2, 1.6, 0.2]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>

        {/* Shoulder joint */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.15]} />
          <CircuitMaterial
            color1="#00ff88"
            intensity={isOperating ? 1.5 : 0.8}
            animated={animated}
          />
        </mesh>

        {/* Elbow link */}
        <group ref={elbowRef} position={[0, 1.6, 0]}>
          <mesh position={[0, 0.6, 0]}>
            <boxGeometry args={[0.15, 1.2, 0.15]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>

          {/* Elbow joint */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.12]} />
            <CircuitMaterial
              color1="#ffff00"
              intensity={isOperating ? 1.5 : 0.8}
              animated={animated}
            />
          </mesh>

          {/* Wrist link */}
          <group ref={wristRef} position={[0, 1.2, 0]}>
            <mesh position={[0, 0.3, 0]}>
              <boxGeometry args={[0.1, 0.6, 0.1]} />
              <meshStandardMaterial color="#2a2a2a" />
            </mesh>

            {/* Wrist joint */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.08]} />
              <CircuitMaterial
                color1="#ff0066"
                intensity={isOperating ? 1.5 : 0.8}
                animated={animated}
              />
            </mesh>

            {/* End effector (gripper) */}
            <group position={[0, 0.6, 0]}>
              {/* Gripper base */}
              <mesh>
                <boxGeometry args={[0.3, 0.1, 0.1]} />
                <meshStandardMaterial color="#3a3a3a" />
              </mesh>

              {/* Gripper fingers */}
              <mesh ref={gripperLeftRef} position={[-0.1, 0, 0]}>
                <boxGeometry args={[0.05, 0.2, 0.03]} />
                <meshStandardMaterial color="#4a4a4a" />
              </mesh>
              <mesh ref={gripperRightRef} position={[0.1, 0, 0]}>
                <boxGeometry args={[0.05, 0.2, 0.03]} />
                <meshStandardMaterial color="#4a4a4a" />
              </mesh>

              {/* End effector sensor */}
              <mesh position={[0, -0.15, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.05]} />
                <CircuitMaterial
                  color1="#ffffff"
                  intensity={isOperating ? 2 : 1}
                  animated={animated}
                />
              </mesh>
            </group>
          </group>
        </group>
      </group>

      {/* Status indicators */}
      <group position={[-2, 3, 0]}>
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.12}
          color={isOperating ? "#00ff88" : "#0070f3"}
          anchorX="left"
          font="/fonts/JetBrainsMono-Regular.woff"
        >
          STATUS: {isOperating ? "OPERATING" : "READY"}
        </Text>
        <Text
          position={[0, 0.3, 0]}
          fontSize={0.1}
          color="#00d4ff"
          anchorX="left"
          font="/fonts/JetBrainsMono-Regular.woff"
        >
          TASK: {currentTask}
        </Text>
        <Text
          position={[0, 0.1, 0]}
          fontSize={0.08}
          color="#ffffff"
          anchorX="left"
          font="/fonts/JetBrainsMono-Regular.woff"
        >
          DOF: 6-AXIS
        </Text>
      </group>

      {/* Joint position display */}
      <group position={[2, 3, 0]}>
        <Text
          position={[0, 0.4, 0]}
          fontSize={0.08}
          color="#00ff88"
          anchorX="left"
          font="/fonts/JetBrainsMono-Regular.woff"
        >
          BASE: {jointStates.base.toFixed(2)}°
        </Text>
        <Text
          position={[0, 0.2, 0]}
          fontSize={0.08}
          color="#00ff88"
          anchorX="left"
          font="/fonts/JetBrainsMono-Regular.woff"
        >
          SHOULDER: {jointStates.shoulder.toFixed(2)}°
        </Text>
        <Text
          position={[0, 0, 0]}
          fontSize={0.08}
          color="#00ff88"
          anchorX="left"
          font="/fonts/JetBrainsMono-Regular.woff"
        >
          ELBOW: {jointStates.elbow.toFixed(2)}°
        </Text>
        <Text
          position={[0, -0.2, 0]}
          fontSize={0.08}
          color="#00ff88"
          anchorX="left"
          font="/fonts/JetBrainsMono-Regular.woff"
        >
          WRIST: {jointStates.wrist.toFixed(2)}°
        </Text>
      </group>

      {/* Work envelope visualization */}
      <mesh position={[0, 2, 0]}>
        <torusGeometry args={[2.5, 0.02]} />
        <CircuitMaterial color1="#0070f3" intensity={0.5} animated={animated} />
      </mesh>
    </group>
  );
};

export default RobotArm;
