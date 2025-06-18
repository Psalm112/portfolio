"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
interface Component {
  x: number;
  y: number;
  width: number;
  height: number;
  type:
    | "ic"
    | "resistor"
    | "capacitor"
    | "led"
    | "connector"
    | "processor"
    | "memory"
    | "sensor";
  label: string;
  value?: string;
  connections?: number[];
}
interface Connection {
  from: { x: number; y: number };
  to: { x: number; y: number };
  signal: "power" | "data" | "ground" | "analog";
  animated?: boolean;
}
const components: Component[] = [
  // Main Processor
  {
    x: 400,
    y: 200,
    width: 80,
    height: 80,
    type: "processor",
    label: "MCU",
    value: "STM32F4",
  },
  // Memory Components
  {
    x: 550,
    y: 150,
    width: 60,
    height: 40,
    type: "memory",
    label: "FLASH",
    value: "32MB",
  },
  {
    x: 550,
    y: 220,
    width: 60,
    height: 40,
    type: "memory",
    label: "RAM",
    value: "8MB",
  },
  // Sensors
  {
    x: 200,
    y: 120,
    width: 50,
    height: 30,
    type: "sensor",
    label: "IMU",
    value: "MPU6050",
  },
  {
    x: 200,
    y: 180,
    width: 50,
    height: 30,
    type: "sensor",
    label: "TEMP",
    value: "DS18B20",
  },
  {
    x: 200,
    y: 240,
    width: 50,
    height: 30,
    type: "sensor",
    label: "GPS",
    value: "NEO-8M",
  },
  // Communication
  {
    x: 650,
    y: 120,
    width: 70,
    height: 35,
    type: "ic",
    label: "WIFI",
    value: "ESP32",
  },
  {
    x: 650,
    y: 180,
    width: 70,
    height: 35,
    type: "ic",
    label: "BLE",
    value: "nRF52",
  },
  {
    x: 650,
    y: 240,
    width: 70,
    height: 35,
    type: "ic",
    label: "LORA",
    value: "SX1276",
  },
  // Power Management
  {
    x: 300,
    y: 350,
    width: 60,
    height: 40,
    type: "ic",
    label: "PMIC",
    value: "LTC3105",
  },
  {
    x: 400,
    y: 350,
    width: 40,
    height: 40,
    type: "ic",
    label: "REG",
    value: "3.3V",
  },
  // Passive Components
  {
    x: 300,
    y: 120,
    width: 20,
    height: 8,
    type: "resistor",
    label: "R1",
    value: "10kΩ",
  },
  {
    x: 330,
    y: 120,
    width: 20,
    height: 8,
    type: "resistor",
    label: "R2",
    value: "4.7kΩ",
  },
  {
    x: 360,
    y: 120,
    width: 15,
    height: 15,
    type: "capacitor",
    label: "C1",
    value: "100nF",
  },
  {
    x: 390,
    y: 120,
    width: 15,
    height: 15,
    type: "capacitor",
    label: "C2",
    value: "22pF",
  },
  // LEDs and Indicators
  {
    x: 500,
    y: 350,
    width: 12,
    height: 12,
    type: "led",
    label: "PWR",
    value: "GREEN",
  },
  {
    x: 520,
    y: 350,
    width: 12,
    height: 12,
    type: "led",
    label: "STA",
    value: "BLUE",
  },
  {
    x: 540,
    y: 350,
    width: 12,
    height: 12,
    type: "led",
    label: "ERR",
    value: "RED",
  },
  // Connectors
  {
    x: 100,
    y: 300,
    width: 80,
    height: 20,
    type: "connector",
    label: "USB-C",
    value: "POWER",
  },
  {
    x: 800,
    y: 180,
    width: 60,
    height: 30,
    type: "connector",
    label: "ANT",
    value: "SMA",
  },
];
const connections: Connection[] = [
  // Power connections
  { from: { x: 140, y: 310 }, to: { x: 300, y: 370 }, signal: "power" },
  { from: { x: 360, y: 350 }, to: { x: 400, y: 370 }, signal: "power" },
  { from: { x: 440, y: 350 }, to: { x: 440, y: 280 }, signal: "power" },
  // Data connections
  {
    from: { x: 480, y: 240 },
    to: { x: 550, y: 170 },
    signal: "data",
    animated: true,
  },
  {
    from: { x: 480, y: 240 },
    to: { x: 550, y: 240 },
    signal: "data",
    animated: true,
  },
  {
    from: { x: 400, y: 200 },
    to: { x: 225, y: 135 },
    signal: "data",
    animated: true,
  },
  {
    from: { x: 400, y: 220 },
    to: { x: 225, y: 195 },
    signal: "data",
    animated: true,
  },
  {
    from: { x: 400, y: 240 },
    to: { x: 225, y: 255 },
    signal: "data",
    animated: true,
  },
  // Communication lines
  {
    from: { x: 480, y: 200 },
    to: { x: 650, y: 138 },
    signal: "data",
    animated: true,
  },
  {
    from: { x: 480, y: 220 },
    to: { x: 650, y: 198 },
    signal: "data",
    animated: true,
  },
  {
    from: { x: 480, y: 240 },
    to: { x: 650, y: 258 },
    signal: "data",
    animated: true,
  },
  // Antenna connection
  { from: { x: 720, y: 180 }, to: { x: 800, y: 195 }, signal: "analog" },
  // Ground connections
  { from: { x: 440, y: 280 }, to: { x: 100, y: 400 }, signal: "ground" },
];
export const CircuitBoard3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const componentsRef = useRef<(SVGGElement | null)[]>([]);
  const connectionsRef = useRef<(SVGPathElement | null)[]>([]);
  useGSAP(
    () => {
      if (!svgRef.current) return;
      // Initial setup - hide all components
      gsap.set(componentsRef.current, {
        opacity: 0,
        scale: 0.8,
        transformOrigin: "center center",
      });

      gsap.set(connectionsRef.current, {
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
      });

      // Main animation timeline
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate board background
      tl.fromTo(
        svgRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
      );

      // Animate components in sequence
      componentsRef.current.forEach((component, index) => {
        if (component) {
          tl.to(
            component,
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "back.out(1.7)",
            },
            index * 0.1,
          );
        }
      });

      // Animate connections
      connectionsRef.current.forEach((connection, index) => {
        if (connection) {
          tl.to(
            connection,
            {
              strokeDashoffset: 0,
              duration: 1.5,
              ease: "power2.inOut",
            },
            1 + index * 0.2,
          );
        }
      });

      // Continuous animations
      const pulseAnimation = () => {
        const processors = componentsRef.current.filter(
          (_, index) => components[index]?.type === "processor",
        );

        gsap.to(processors, {
          filter: "drop-shadow(0 0 20px #00d4ff) drop-shadow(0 0 40px #00d4ff)",
          duration: 1,
          yoyo: true,
          repeat: -1,
          ease: "power2.inOut",
        });
      };

      const dataFlowAnimation = () => {
        const dataConnections = connectionsRef.current.filter(
          (_, index) =>
            connections[index]?.signal === "data" &&
            connections[index]?.animated,
        );

        dataConnections.forEach((connection) => {
          if (connection) {
            gsap.to(connection, {
              strokeDashoffset: -1000,
              duration: 2,
              repeat: -1,
              ease: "none",
            });
          }
        });
      };

      // Start continuous animations after initial sequence
      tl.call(pulseAnimation, [], 3);
      tl.call(dataFlowAnimation, [], 3);

      // Hover interactions
      componentsRef.current.forEach((component, index) => {
        if (component) {
          const handleMouseEnter = () => {
            gsap.to(component, {
              scale: 1.1,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(component, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          component.addEventListener("mouseenter", handleMouseEnter);
          component.addEventListener("mouseleave", handleMouseLeave);
        }
      });
    },
    { scope: containerRef },
  );
  const getComponentColor = (type: Component["type"]) => {
    const colors = {
      processor: "#ff6b6b",
      memory: "#4ecdc4",
      sensor: "#45b7d1",
      ic: "#96ceb4",
      resistor: "#ffeaa7",
      capacitor: "#dda0dd",
      led: "#fd79a8",
      connector: "#74b9ff",
    };
    return colors[type] || "#00d4ff";
  };
  const getSignalColor = (signal: Connection["signal"]) => {
    const colors = {
      power: "#ff6b6b",
      data: "#00d4ff",
      ground: "#6c5ce7",
      analog: "#fd79a8",
    };
    return colors[signal];
  };
  const renderComponent = (component: Component, index: number) => {
    const color = getComponentColor(component.type);
    return (
      <g
        key={index}
        ref={(el) => {
          componentsRef.current[index] = el;
        }}
        transform={`translate(${component.x}, ${component.y})`}
        className="cursor-pointer"
      >
        {/* Component Body */}
        <rect
          width={component.width}
          height={component.height}
          fill={color}
          stroke="#00d4ff"
          strokeWidth="1"
          rx="2"
          opacity="0.8"
        />

        {/* Component Pins */}
        {component.type === "processor" && (
          <>
            {/* Top pins */}
            {Array.from({ length: 8 }, (_, i) => (
              <rect
                key={`top-${i}`}
                x={8 + i * 8}
                y="-2"
                width="4"
                height="4"
                fill="#silver"
                stroke="#00d4ff"
                strokeWidth="0.5"
              />
            ))}
            {/* Bottom pins */}
            {Array.from({ length: 8 }, (_, i) => (
              <rect
                key={`bottom-${i}`}
                x={8 + i * 8}
                y={component.height - 2}
                width="4"
                height="4"
                fill="#silver"
                stroke="#00d4ff"
                strokeWidth="0.5"
              />
            ))}
            {/* Left pins */}
            {Array.from({ length: 6 }, (_, i) => (
              <rect
                key={`left-${i}`}
                x="-2"
                y={10 + i * 10}
                width="4"
                height="4"
                fill="#silver"
                stroke="#00d4ff"
                strokeWidth="0.5"
              />
            ))}
            {/* Right pins */}
            {Array.from({ length: 6 }, (_, i) => (
              <rect
                key={`right-${i}`}
                x={component.width - 2}
                y={10 + i * 10}
                width="4"
                height="4"
                fill="#silver"
                stroke="#00d4ff"
                strokeWidth="0.5"
              />
            ))}
          </>
        )}

        {/* LED specific rendering */}
        {component.type === "led" && (
          <circle
            cx={component.width / 2}
            cy={component.height / 2}
            r="4"
            fill={color}
            stroke="#00d4ff"
            strokeWidth="1"
            opacity="0.9"
          />
        )}

        {/* Component Label */}
        <text
          x={component.width / 2}
          y={component.height / 2 - 5}
          textAnchor="middle"
          fontSize="8"
          fill="#00d4ff"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="bold"
        >
          {component.label}
        </text>

        {/* Component Value */}
        {component.value && (
          <text
            x={component.width / 2}
            y={component.height / 2 + 8}
            textAnchor="middle"
            fontSize="6"
            fill="#7dc8ff"
            fontFamily="JetBrains Mono, monospace"
          >
            {component.value}
          </text>
        )}
      </g>
    );
  };
  const renderConnection = (connection: Connection, index: number) => {
    const color = getSignalColor(connection.signal);
    const strokeWidth = connection.signal === "power" ? 3 : 2;
    return (
      <path
        key={index}
        ref={(el) => {
          connectionsRef.current[index] = el;
        }}
        d={`M ${connection.from.x} ${connection.from.y} L ${connection.to.x} ${connection.to.y}`}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
        style={{
          filter: `drop-shadow(0 0 4px ${color})`,
        }}
      />
    );
  };
  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-4xl aspect-video bg-slate-900 rounded-lg overflow-hidden border border-blueprint-400/30">
        <svg
          ref={svgRef}
          viewBox="0 0 900 450"
          className="w-full h-full"
          style={{
            background: "linear-gradient(45deg, #0f172a 0%, #1e293b 100%)",
          }}
        >
          <defs>
            <pattern
              id="circuitGrid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Circuit Board Background */}
          <rect width="100%" height="100%" fill="url(#circuitGrid)" />

          {/* Board Outline */}
          <rect
            x="50"
            y="50"
            width="800"
            height="350"
            fill="none"
            stroke="#00d4ff"
            strokeWidth="2"
            rx="10"
            opacity="0.6"
          />

          {/* Connections Layer */}
          <g id="connections">
            {connections.map((connection, index) =>
              renderConnection(connection, index),
            )}
          </g>

          {/* Components Layer */}
          <g id="components" filter="url(#glow)">
            {components.map((component, index) =>
              renderComponent(component, index),
            )}
          </g>

          {/* Board Labels */}
          <text
            x="450"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fill="#00d4ff"
            fontFamily="Orbitron, sans-serif"
            fontWeight="bold"
          >
            IoT Communication Module v2.1
          </text>

          <text
            x="450"
            y="430"
            textAnchor="middle"
            fontSize="10"
            fill="#7dc8ff"
            fontFamily="JetBrains Mono, monospace"
          >
            Designed by [Your Name] • REV 2.1 • 2024
          </text>
        </svg>
      </div>
    </div>
  );
};
