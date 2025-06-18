"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@/hooks/useGSAP";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export const Blueprint3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCircuitRef = useRef<SVGSVGElement>(null);
  const roboticArmRef = useRef<SVGSVGElement>(null);
  const networkTopologyRef = useRef<SVGSVGElement>(null);
  const signalProcessorRef = useRef<SVGSVGElement>(null);

  // Advanced circuit board with real embedded system components
  const createAdvancedCircuitBoard = useCallback(() => {
    if (!mainCircuitRef.current) return;

    const svg = mainCircuitRef.current;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

    // Microcontroller boot sequence
    const mcuPins = svg.querySelectorAll(".mcu-pin");
    const powerRails = svg.querySelectorAll(".power-rail");
    const crystalOscillator = svg.querySelectorAll(".crystal");
    const capacitors = svg.querySelectorAll(".capacitor");
    const resistors = svg.querySelectorAll(".resistor");

    // Power-on sequence
    tl.to(powerRails, {
      stroke: "#ff0066",
      strokeWidth: 4,
      duration: 0.5,
      stagger: 0.1,
    })
      .to(crystalOscillator, {
        fill: "#ffff00",
        scale: 1.2,
        duration: 0.3,
        yoyo: true,
        repeat: 3,
      })
      .to(mcuPins, {
        fill: "#00d4ff",
        r: 4,
        duration: 0.2,
        stagger: 0.05,
      })
      .to(capacitors, {
        fill: "#00ff88",
        duration: 0.3,
        stagger: 0.1,
      })
      .to(resistors, {
        stroke: "#ffff00",
        strokeWidth: 3,
        duration: 0.3,
        stagger: 0.1,
      });

    // Data transmission animation
    const dataPaths = svg.querySelectorAll(".data-path");
    dataPaths.forEach((path, index) => {
      const pathElement = path as SVGPathElement;
      const length = pathElement.getTotalLength();

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          delay: index * 0.3,
        },
        2
      );
    });

    // Peripheral device communication
    const peripherals = svg.querySelectorAll(".peripheral");
    tl.to(
      peripherals,
      {
        filter: "brightness(1.5) drop-shadow(0 0 10px currentColor)",
        duration: 0.5,
        stagger: 0.2,
        yoyo: true,
        repeat: 1,
      },
      4
    );

    return tl;
  }, []);

  // Robotic arm with servo motors and sensors
  const createRoboticArm = useCallback(() => {
    if (!roboticArmRef.current) return;

    const svg = roboticArmRef.current;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    const baseJoint = svg.querySelector(".base-joint");
    const shoulderJoint = svg.querySelector(".shoulder-joint");
    const elbowJoint = svg.querySelector(".elbow-joint");
    const wristJoint = svg.querySelector(".wrist-joint");
    const endEffector = svg.querySelector(".end-effector");
    const sensors = svg.querySelectorAll(".sensor");

    // Servo calibration sequence
    tl.to(sensors, {
      fill: "#00ff88",
      r: 6,
      duration: 0.3,
      stagger: 0.1,
    })
      .to(baseJoint, {
        rotation: 45,
        transformOrigin: "center",
        duration: 1,
        ease: "power2.inOut",
      })
      .to(shoulderJoint, {
        rotation: -30,
        transformOrigin: "center",
        duration: 0.8,
        ease: "power2.inOut",
      }, "-=0.5")
      .to(elbowJoint, {
        rotation: 60,
        transformOrigin: "center",
        duration: 0.8,
        ease: "power2.inOut",
      }, "-=0.4")
      .to(wristJoint, {
        rotation: -45,
        transformOrigin: "center",
        duration: 0.6,
        ease: "power2.inOut",
      }, "-=0.3")
      .to(endEffector, {
        scale: 0.8,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
      });

    // Return to home position
    tl.to([baseJoint, shoulderJoint, elbowJoint, wristJoint], {
      rotation: 0,
      duration: 1.5,
      ease: "power2.inOut",
      stagger: 0.1,
    });

    return tl;
  }, []);

  // Network topology with protocol layers
  const createNetworkTopology = useCallback(() => {
    if (!networkTopologyRef.current) return;

    const svg = networkTopologyRef.current;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    const nodes = svg.querySelectorAll(".network-node");
    const connections = svg.querySelectorAll(".network-connection");
    const dataPackets = svg.querySelectorAll(".data-packet-net");
    const protocolLayers = svg.querySelectorAll(".protocol-layer");

    // Network initialization
    tl.to(nodes, {
      fill: "#00d4ff",
      r: 8,
      duration: 0.3,
      stagger: 0.1,
    })
      .to(connections, {
        stroke: "#00ff88",
        strokeWidth: 3,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
      })
      .to(protocolLayers, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
      });

    // Packet routing animation
    dataPackets.forEach((packet, index) => {
      const path = connections[index % connections.length] as SVGPathElement;
      if (path) {
        tl.to(
          packet,
          {
            motionPath: {
              path: path,
              autoRotate: false,
            },
            duration: 2,
            ease: "power2.inOut",
            delay: index * 0.3,
          },
          2
        );
      }
    });

    return tl;
  }, []);

  // Digital Signal Processing visualization
  const createSignalProcessor = useCallback(() => {
    if (!signalProcessorRef.current) return;

    const svg = signalProcessorRef.current;
    const tl = gsap.timeline({ repeat: -1 });

    const inputSignal = svg.querySelectorAll(".input-signal");
    const filterStages = svg.querySelectorAll(".filter-stage");
    const fftBlocks = svg.querySelectorAll(".fft-block");
    const outputSignal = svg.querySelectorAll(".output-signal");

    // Signal processing pipeline
    tl.to(inputSignal, {
      strokeDashoffset: 0,
      duration: 1,
      stagger: 0.1,
    })
      .to(filterStages, {
        fill: "#00d4ff",
        scale: 1.1,
        duration: 0.3,
        stagger: 0.1,
        yoyo: true,
        repeat: 1,
      })
      .to(fftBlocks, {
        rotation: 360,
        transformOrigin: "center",
        duration: 1,
        stagger: 0.2,
      }, "-=0.5")
      .to(outputSignal, {
        strokeDashoffset: 0,
        stroke: "#00ff88",
        duration: 1,
        stagger: 0.1,
      });

    return tl;
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Scroll-triggered animations for each technical illustration
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: