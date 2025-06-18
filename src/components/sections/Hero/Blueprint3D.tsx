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
  const microcontrollerRef = useRef<SVGSVGElement>(null);
  const frontendFlowRef = useRef<SVGSVGElement>(null);

  // Advanced Microcontroller System with Real-time Processing
  const createMicrocontrollerSystem = useCallback(() => {
    if (!microcontrollerRef.current) return;

    const svg = microcontrollerRef.current;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    // CPU Core animations
    const cpuCore = svg.querySelector(".cpu-core");
    const aluUnit = svg.querySelector(".alu-unit");
    const controlUnit = svg.querySelector(".control-unit");
    const registerBank = svg.querySelectorAll(".register");
    const instructionCache = svg.querySelectorAll(".i-cache");
    const dataCache = svg.querySelectorAll(".d-cache");
    const pipeline = svg.querySelectorAll(".pipeline-stage");

    // Memory hierarchy
    const sramCells = svg.querySelectorAll(".sram-cell");
    const flashSectors = svg.querySelectorAll(".flash-sector");
    const busLines = svg.querySelectorAll(".bus-line");

    // Peripheral interfaces
    const spiInterface = svg.querySelector(".spi-interface");
    const i2cInterface = svg.querySelector(".i2c-interface");
    const uartInterface = svg.querySelector(".uart-interface");
    const adcChannels = svg.querySelectorAll(".adc-channel");
    const pwmOutputs = svg.querySelectorAll(".pwm-output");

    // Boot sequence with proper timing
    tl.to(cpuCore, {
      fill: "#ff0066",
      scale: 1.1,
      duration: 0.5,
      ease: "power2.out",
    })
      .to(
        controlUnit,
        {
          fill: "#00d4ff",
          rotation: 360,
          transformOrigin: "center",
          duration: 1,
        },
        "-=0.3",
      )
      .to(registerBank, {
        fill: "#00ff88",
        scale: 1.2,
        duration: 0.3,
        stagger: 0.1,
        yoyo: true,
        repeat: 1,
      })
      .to(instructionCache, {
        fill: "#ffff00",
        opacity: 1,
        duration: 0.4,
        stagger: 0.05,
      });

    // Instruction pipeline execution
    pipeline.forEach((stage, index) => {
      tl.to(
        stage,
        {
          fill: `hsl(${180 + index * 30}, 70%, 60%)`,
          scale: 1.3,
          duration: 0.2,
          delay: index * 0.1,
        },
        2,
      );
    });

    // Memory access patterns
    tl.to(
      sramCells,
      {
        fill: "#00d4ff",
        duration: 0.2,
        stagger: {
          grid: [8, 4],
          from: "random",
          amount: 1,
        },
      },
      3,
    ).to(
      flashSectors,
      {
        fill: "#ff8800",
        duration: 0.3,
        stagger: 0.1,
      },
      3.5,
    );

    // Bus communication
    busLines.forEach((line, index) => {
      const pathElement = line as SVGPathElement;
      const length = pathElement.getTotalLength();

      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      tl.to(
        line,
        {
          strokeDashoffset: 0,
          stroke: "#00ffff",
          strokeWidth: 3,
          duration: 0.8,
          delay: index * 0.1,
        },
        4,
      );
    });

    // Peripheral communication protocols
    tl.to(
      spiInterface,
      {
        rotation: 720,
        transformOrigin: "center",
        duration: 1,
        ease: "power2.inOut",
      },
      5,
    )
      .to(
        i2cInterface,
        {
          scale: 1.5,
          duration: 0.8,
          repeat: 2,
          yoyo: true,
        },
        5.2,
      )
      .to(
        uartInterface,
        {
          x: 20,
          duration: 0.5,
          yoyo: true,
          repeat: 3,
        },
        5.4,
      );

    // ADC sampling
    adcChannels.forEach((channel, index) => {
      tl.to(
        channel,
        {
          fill: "#00ff88",
          height: `${Math.random() * 50 + 20}%`,
          duration: 0.3,
          delay: index * 0.1,
        },
        6,
      );
    });

    // PWM signal generation
    pwmOutputs.forEach((output, index) => {
      tl.to(
        output,
        {
          scaleY: 0,
          duration: 0.25,
          delay: index * 0.1,
          yoyo: true,
          repeat: 3,
        },
        6.5,
      );
    });

    return tl;
  }, []);

  // Advanced Communication System (RF, Antenna, Signal Processing)
  const createCommunicationSystem = useCallback(() => {
    if (!networkTopologyRef.current) return;

    const svg = networkTopologyRef.current;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

    // RF Frontend components
    const antenna = svg.querySelector(".antenna");
    const lna = svg.querySelector(".lna");
    const mixer = svg.querySelector(".mixer");
    const oscillator = svg.querySelector(".oscillator");
    const filter = svg.querySelector(".filter");
    const adc = svg.querySelector(".adc-comm");

    // Digital signal processing
    const dspCore = svg.querySelector(".dsp-core");
    const fftEngine = svg.querySelector(".fft-engine");
    const demodulator = svg.querySelector(".demodulator");
    const decoder = svg.querySelector(".decoder");

    // Network stack layers
    const physicalLayer = svg.querySelector(".physical-layer");
    const dataLinkLayer = svg.querySelector(".datalink-layer");
    const networkLayer = svg.querySelector(".network-layer");
    const transportLayer = svg.querySelector(".transport-layer");
    const applicationLayer = svg.querySelector(".application-layer");

    // Signal propagation
    const signalWaves = svg.querySelectorAll(".signal-wave");
    const dataPackets = svg.querySelectorAll(".data-packet");
    const protocolHeaders = svg.querySelectorAll(".protocol-header");

    // RF signal reception and processing
    tl.to(antenna, {
      rotation: 15,
      transformOrigin: "bottom center",
      duration: 0.5,
      yoyo: true,
      repeat: 3,
    })
      .to(
        signalWaves,
        {
          scale: 2,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          yoyo: true,
          repeat: 1,
        },
        0.5,
      )
      .to(
        lna,
        {
          fill: "#00d4ff",
          scale: 1.2,
          duration: 0.3,
        },
        1,
      )
      .to(
        mixer,
        {
          rotation: 360,
          transformOrigin: "center",
          duration: 0.8,
        },
        1.2,
      )
      .to(
        oscillator,
        {
          fill: "#ffff00",
          scale: 1.3,
          duration: 0.6,
          yoyo: true,
          repeat: 2,
        },
        1.4,
      );

    // Analog to digital conversion
    tl.to(
      filter,
      {
        fill: "#00ff88",
        skewX: 10,
        duration: 0.8,
        yoyo: true,
      },
      2,
    ).to(
      adc,
      {
        fill: "#ff0066",
        scale: 1.4,
        duration: 0.5,
        yoyo: true,
        repeat: 3,
      },
      2.5,
    );

    // Digital signal processing pipeline
    tl.to(
      dspCore,
      {
        fill: "#00d4ff",
        rotation: 180,
        transformOrigin: "center",
        duration: 1,
      },
      3,
    )
      .to(
        fftEngine,
        {
          scale: 1.5,
          fill: "#00ffff",
          duration: 0.8,
          yoyo: true,
        },
        3.5,
      )
      .to(
        demodulator,
        {
          x: 20,
          fill: "#00ff88",
          duration: 1,
          yoyo: true,
        },
        4,
      )
      .to(
        decoder,
        {
          fill: "#ffff00",
          scale: 1.3,
          duration: 0.5,
        },
        4.5,
      );

    // Protocol stack processing
    const layers = [
      physicalLayer,
      dataLinkLayer,
      networkLayer,
      transportLayer,
      applicationLayer,
    ];
    layers.forEach((layer, index) => {
      if (layer) {
        tl.to(
          layer,
          {
            fill: `hsl(${index * 60}, 70%, 60%)`,
            scale: 1.2,
            duration: 0.3,
            delay: index * 0.1,
          },
          5,
        );
      }
    });

    // Packet routing animation
    dataPackets.forEach((packet, index) => {
      tl.to(
        packet,
        {
          x: 300,
          y: Math.sin(index) * 50,
          rotation: 360,
          duration: 2,
          ease: "power2.inOut",
          delay: index * 0.2,
        },
        6,
      );
    });

    return tl;
  }, []);

  // Advanced Frontend Development Workflow
  const createFrontendFlow = useCallback(() => {
    if (!frontendFlowRef.current) return;

    const svg = frontendFlowRef.current;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    // Development tools
    const ide = svg.querySelector(".ide");
    const compiler = svg.querySelector(".compiler");
    const bundler = svg.querySelector(".bundler");
    const transpiler = svg.querySelector(".transpiler");

    // Code processing
    const jsEngine = svg.querySelector(".js-engine");
    const domTree = svg.querySelector(".dom-tree");
    const cssEngine = svg.querySelector(".css-engine");
    const renderEngine = svg.querySelector(".render-engine");

    // Performance monitoring
    const profiler = svg.querySelector(".profiler");
    const lighthouse = svg.querySelector(".lighthouse");
    const devtools = svg.querySelector(".devtools");

    // Code flow
    const codeLines = svg.querySelectorAll(".code-line");
    const apiCalls = svg.querySelectorAll(".api-call");
    const stateUpdates = svg.querySelectorAll(".state-update");
    const components = svg.querySelectorAll(".component");

    // Development workflow
    tl.to(ide, {
      fill: "#0070f3",
      scale: 1.1,
      duration: 0.5,
    })
      .to(
        codeLines,
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.05,
        },
        0.5,
      )
      .to(
        compiler,
        {
          rotation: 360,
          transformOrigin: "center",
          duration: 1,
          fill: "#00d4ff",
        },
        1,
      )
      .to(
        transpiler,
        {
          scale: 1.3,
          fill: "#00ff88",
          duration: 0.8,
          yoyo: true,
        },
        1.5,
      )
      .to(
        bundler,
        {
          fill: "#ffff00",
          rotation: -180,
          transformOrigin: "center",
          duration: 0.8,
        },
        2,
      );

    // Runtime execution
    tl.to(
      jsEngine,
      {
        fill: "#ff0066",
        scale: 1.2,
        duration: 0.5,
      },
      3,
    )
      .to(
        components,
        {
          fill: "#00d4ff",
          scale: 1.2,
          duration: 0.4,
          stagger: 0.1,
          yoyo: true,
        },
        3.5,
      )
      .to(
        domTree,
        {
          fill: "#00ff88",
          rotation: 90,
          transformOrigin: "center",
          duration: 0.8,
        },
        4,
      )
      .to(
        cssEngine,
        {
          fill: "#00ffff",
          skewY: 10,
          duration: 1,
          yoyo: true,
        },
        4.5,
      );

    // State management
    stateUpdates.forEach((update, index) => {
      tl.to(
        update,
        {
          scale: 1.5,
          fill: `hsl(${index * 30}, 70%, 60%)`,
          duration: 0.3,
          delay: index * 0.1,
          yoyo: true,
        },
        5,
      );
    });

    // API communication
    apiCalls.forEach((call, index) => {
      const path = svg.querySelector(`.api-path-${index}`) as SVGPathElement;
      if (path) {
        tl.to(
          call,
          {
            motionPath: {
              path: path,
              autoRotate: true,
            },
            duration: 1.5,
            ease: "power2.inOut",
            delay: index * 0.2,
          },
          6,
        );
      }
    });

    // Performance monitoring
    tl.to(
      profiler,
      {
        fill: "#ff8800",
        scale: 1.3,
        duration: 0.5,
      },
      7,
    )
      .to(
        lighthouse,
        {
          fill: "#00ff88",
          rotation: 360,
          transformOrigin: "center",
          duration: 1,
        },
        7.5,
      )
      .to(
        devtools,
        {
          fill: "#00d4ff",
          y: -10,
          duration: 0.8,
          yoyo: true,
        },
        8,
      );

    return tl;
  }, []);

  // Enhanced Robotic System with Advanced Kinematics
  const createAdvancedRoboticArm = useCallback(() => {
    if (!roboticArmRef.current) return;

    const svg = roboticArmRef.current;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

    // Robotic components
    const baseMotor = svg.querySelector(".base-motor");
    const shoulderServo = svg.querySelector(".shoulder-servo");
    const elbowActuator = svg.querySelector(".elbow-actuator");
    const wristGimbal = svg.querySelector(".wrist-gimbal");
    const endEffector = svg.querySelector(".end-effector");

    // Sensors and feedback systems
    const encoders = svg.querySelectorAll(".encoder");
    const forceSensors = svg.querySelectorAll(".force-sensor");
    const visionSensor = svg.querySelector(".vision-sensor");
    const proximityArray = svg.querySelectorAll(".proximity-sensor");

    // Control system
    const controller = svg.querySelector(".robot-controller");
    const kinematics = svg.querySelector(".kinematics-engine");
    const pathPlanner = svg.querySelector(".path-planner");
    const motionProfile = svg.querySelectorAll(".motion-profile");

    // Joint coordinates and links
    const joints = svg.querySelectorAll(".joint");
    const links = svg.querySelectorAll(".link");
    const trajectory = svg.querySelector(".trajectory-path");

    // System initialization
    tl.to(controller, {
      fill: "#0070f3",
      scale: 1.2,
      duration: 0.5,
    })
      .to(
        encoders,
        {
          rotation: 360,
          transformOrigin: "center",
          duration: 0.8,
          stagger: 0.1,
          fill: "#00d4ff",
        },
        0.5,
      )
      .to(
        forceSensors,
        {
          fill: "#00ff88",
          scale: 1.3,
          duration: 0.6,
          stagger: 0.1,
          yoyo: true,
        },
        1,
      );

    // Vision system activation
    tl.to(
      visionSensor,
      {
        fill: "#ffff00",
        rotation: 45,
        transformOrigin: "center",
        duration: 1.5,
        yoyo: true,
      },
      1.5,
    ).to(
      proximityArray,
      {
        fill: "#ff0066",
        scale: 1.4,
        duration: 0.4,
        stagger: 0.05,
        yoyo: true,
      },
      2,
    );

    // Kinematics calculation
    tl.to(
      kinematics,
      {
        rotation: 720,
        transformOrigin: "center",
        fill: "#00d4ff",
        duration: 1.5,
      },
      2.5,
    )
      .to(
        pathPlanner,
        {
          fill: "#00ffff",
          scale: 1.3,
          duration: 0.8,
        },
        3,
      )
      .to(
        motionProfile,
        {
          scaleY: 1,
          fill: "#00ff88",
          duration: 1,
          stagger: 0.1,
          yoyo: true,
        },
        3.5,
      );

    // Complex joint movements with inverse kinematics
    const jointTargets = [
      { rotation: 60, duration: 1.2 },
      { rotation: -45, duration: 1.0 },
      { rotation: 90, duration: 1.1 },
      { rotation: -30, duration: 0.9 },
    ];

    joints.forEach((joint, index) => {
      const target = jointTargets[index] || { rotation: 0, duration: 1 };
      tl.to(
        joint,
        {
          rotation: target.rotation,
          transformOrigin: "center",
          duration: target.duration,
          ease: "power2.inOut",
        },
        4 + index * 0.2,
      );
    });

    // Link deformation and stress analysis
    links.forEach((link, index) => {
      tl.to(
        link,
        {
          scaleX: 1.05,
          fill: `hsl(${index * 45}, 70%, 60%)`,
          duration: 0.8,
          delay: index * 0.1,
          yoyo: true,
        },
        5,
      );
    });

    // End effector operation
    tl.to(
      endEffector,
      {
        scale: 1.2,
        rotation: 180,
        transformOrigin: "center",
        duration: 1.5,
        fill: "#ff8800",
        yoyo: true,
      },
      6,
    );

    // Trajectory visualization
    if (trajectory) {
      const pathElement = trajectory as SVGPathElement;
      const length = pathElement.getTotalLength();

      gsap.set(trajectory, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      tl.to(
        trajectory,
        {
          strokeDashoffset: 0,
          stroke: "#00d4ff",
          strokeWidth: 4,
          duration: 2,
        },
        7,
      );
    }

    // Return to home position
    tl.to(
      joints,
      {
        rotation: 0,
        duration: 1.5,
        ease: "power2.inOut",
        stagger: 0.1,
      },
      9,
    );

    return tl;
  }, []);

  // Enhanced Signal Processing System
  const createSignalProcessor = useCallback(() => {
    if (!signalProcessorRef.current) return;

    const svg = signalProcessorRef.current;
    const tl = gsap.timeline({ repeat: -1 });

    // Signal processing components
    const analogInput = svg.querySelectorAll(".analog-input");
    const antiAliasingFilter = svg.querySelector(".anti-aliasing-filter");
    const sampleHold = svg.querySelector(".sample-hold");
    const quantizer = svg.querySelector(".quantizer");
    const digitalFilter = svg.querySelector(".digital-filter");
    const fftProcessor = svg.querySelector(".fft-processor");
    const correlator = svg.querySelector(".correlator");
    const outputStage = svg.querySelector(".output-stage");

    // Frequency domain elements
    const spectrum = svg.querySelectorAll(".spectrum-bin");
    const filterResponse = svg.querySelectorAll(".filter-response");
    const phasePlot = svg.querySelectorAll(".phase-point");

    // Time domain signals
    const timeSignal = svg.querySelectorAll(".time-sample");
    const convolutionKernel = svg.querySelectorAll(".kernel-tap");

    // Signal acquisition
    tl.to(analogInput, {
      scaleY: 2,
      fill: "#00d4ff",
      duration: 2,
      stagger: 0.05,
      yoyo: true,
    })
      .to(
        antiAliasingFilter,
        {
          rotation: 360,
          transformOrigin: "center",
          fill: "#00ff88",
          duration: 1,
        },
        0.5,
      )
      .to(
        sampleHold,
        {
          scale: 1.3,
          fill: "#ffff00",
          duration: 0.8,
          yoyo: true,
          repeat: 3,
        },
        1,
      );

    // ADC process
    tl.to(
      quantizer,
      {
        fill: "#ff0066",
        scaleX: 1.5,
        duration: 1,
        yoyo: true,
      },
      2,
    ).to(
      timeSignal,
      {
        opacity: 1,
        scaleY: 1,
        duration: 0.3,
        stagger: 0.02,
      },
      2.5,
    );

    // Digital filtering
    tl.to(
      digitalFilter,
      {
        rotation: 180,
        transformOrigin: "center",
        fill: "#00ffff",
        duration: 1.2,
      },
      3,
    ).to(
      convolutionKernel,
      {
        scale: 1.4,
        fill: "#00ff88",
        duration: 0.5,
        stagger: 0.1,
        yoyo: true,
      },
      3.5,
    );

    // FFT processing
    tl.to(
      fftProcessor,
      {
        rotation: 720,
        transformOrigin: "center",
        fill: "#ff8800",
        duration: 1.5,
      },
      4,
    ).to(
      spectrum,
      {
        scaleY: () => Math.random() * 2 + 0.5,
        fill: () => `hsl(${Math.random() * 360}, 70%, 60%)`,
        duration: 0.8,
        stagger: 0.02,
      },
      4.5,
    );

    // Phase analysis
    tl.to(
      phasePlot,
      {
        rotation: () => Math.random() * 360,
        transformOrigin: "center",
        fill: "#00d4ff",
        duration: 1,
        stagger: 0.05,
      },
      5,
    );

    // Correlation processing
    tl.to(
      correlator,
      {
        scale: 1.5,
        fill: "#ff0066",
        duration: 1,
        yoyo: true,
      },
      6,
    ).to(
      filterResponse,
      {
        scaleY: 1.2,
        fill: "#00ff88",
        duration: 0.8,
        stagger: 0.03,
        yoyo: true,
      },
      6.5,
    );

    // Output stage
    tl.to(
      outputStage,
      {
        fill: "#ffff00",
        scale: 1.3,
        rotation: 360,
        transformOrigin: "center",
        duration: 1,
      },
      7,
    );

    return tl;
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Initialize all animation systems
      const animations = [
        createMicrocontrollerSystem(),
        createCommunicationSystem(),
        createFrontendFlow(),
        createAdvancedRoboticArm(),
        createSignalProcessor(),
      ].filter(Boolean);

      // Master timeline for coordinated animations
      const masterTl = gsap.timeline({ repeat: -1, repeatDelay: 5 });

      // Scroll-triggered reveal animations
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          animations.forEach((anim, index) => {
            gsap.delayedCall(index * 0.5, () => anim?.restart());
          });
        },
        onLeave: () => {
          animations.forEach((anim) => anim?.pause());
        },
        onEnterBack: () => {
          animations.forEach((anim) => anim?.resume());
        },
      });

      // Performance optimization
      gsap.set(
        [
          ".cpu-core",
          ".alu-unit",
          ".control-unit",
          ".register",
          ".antenna",
          ".lna",
          ".mixer",
          ".oscillator",
          ".ide",
          ".compiler",
          ".bundler",
          ".js-engine",
          ".base-motor",
          ".shoulder-servo",
          ".elbow-actuator",
          ".analog-input",
          ".anti-aliasing-filter",
          ".fft-processor",
        ],
        {
          transformOrigin: "center",
          force3D: true,
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Microcontroller System */}
      <svg
        ref={microcontrollerRef}
        viewBox="0 0 800 600"
        className="absolute top-0 left-0 w-full h-full opacity-30"
        style={{ filter: "drop-shadow(0 0 10px rgba(0, 212, 255, 0.3))" }}
      >
        {/* CPU Core Complex */}
        <g transform="translate(100, 100)">
          <rect
            className="cpu-core"
            x="0"
            y="0"
            width="120"
            height="120"
            rx="8"
            fill="#1e293b"
            stroke="#0070f3"
            strokeWidth="2"
          />
          <circle className="alu-unit" cx="30" cy="30" r="15" fill="#334155" />
          <rect
            className="control-unit"
            x="60"
            y="10"
            width="40"
            height="40"
            fill="#334155"
          />

          {/* Register Bank */}
          {Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={i}
              className="register"
              x={10 + (i % 4) * 25}
              y={70 + Math.floor(i / 4) * 15}
              width="20"
              height="10"
              fill="#475569"
              rx="2"
            />
          ))}

          {/* Cache Systems */}
          {Array.from({ length: 16 }).map((_, i) => (
            <circle
              key={i}
              className={i < 8 ? "i-cache" : "d-cache"}
              cx={140 + (i % 8) * 15}
              cy={20 + Math.floor(i / 8) * 30}
              r="5"
              fill="#64748b"
              opacity="0.7"
            />
          ))}

          {/* Pipeline Stages */}
          {Array.from({ length: 5 }).map((_, i) => (
            <rect
              key={i}
              className="pipeline-stage"
              x={i * 30}
              y="140"
              width="25"
              height="8"
              fill="#3b82f6"
              rx="2"
            />
          ))}
        </g>

        {/* Memory Hierarchy */}
        <g transform="translate(300, 100)">
          {/* SRAM Grid */}
          {Array.from({ length: 32 }).map((_, i) => (
            <rect
              key={i}
              className="sram-cell"
              x={(i % 8) * 12}
              y={Math.floor(i / 8) * 12}
              width="10"
              height="10"
              fill="#475569"
              rx="1"
            />
          ))}

          {/* Flash Sectors */}
          {Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={i}
              className="flash-sector"
              x="0"
              y={60 + i * 15}
              width="80"
              height="12"
              fill="#1e293b"
              stroke="#f59e0b"
              strokeWidth="1"
              rx="2"
            />
          ))}
        </g>

        {/* Peripheral Interfaces */}
        <g transform="translate(500, 150)">
          <circle
            className="spi-interface"
            cx="0"
            cy="0"
            r="20"
            fill="#ef4444"
          />
          <rect
            className="i2c-interface"
            x="50"
            y="-10"
            width="30"
            height="20"
            fill="#10b981"
            rx="5"
          />
          <polygon
            className="uart-interface"
            points="0,50 20,40 20,60"
            fill="#f59e0b"
          />

          {/* ADC Channels */}
          {Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={i}
              className="adc-channel"
              x={i * 15}
              y="80"
              width="10"
              height="30"
              fill="#8b5cf6"
              rx="2"
            />
          ))}

          {/* PWM Outputs */}
          {Array.from({ length: 6 }).map((_, i) => (
            <rect
              key={i}
              className="pwm-output"
              x={i * 20}
              y="120"
              width="15"
              height="5"
              fill="#06b6d4"
              rx="1"
            />
          ))}
        </g>

        {/* Bus Lines */}
        {Array.from({ length: 4 }).map((_, i) => (
          <path
            key={i}
            className="bus-line"
            d={`M ${100 + i * 50} 300 Q ${200 + i * 50} 250 ${300 + i * 50} 300`}
            stroke="#64748b"
            strokeWidth="2"
            fill="none"
          />
        ))}
      </svg>

      {/* Communication System */}
      <svg
        ref={networkTopologyRef}
        viewBox="0 0 800 600"
        className="absolute top-0 right-0 w-full h-full opacity-30"
        style={{ filter: "drop-shadow(0 0 10px rgba(0, 255, 136, 0.3))" }}
      >
        {/* RF Frontend */}
        <g transform="translate(100, 100)">
          <rect
            className="antenna"
            x="0"
            y="0"
            width="20"
            height="60"
            fill="#1e293b"
            stroke="#00d4ff"
            strokeWidth="2"
          />
          <circle className="lna" cx="50" cy="30" r="15" fill="#334155" />
          <rect
            className="mixer"
            x="80"
            y="20"
            width="30"
            height="20"
            fill="#475569"
          />
          <circle
            className="oscillator"
            cx="130"
            cy="30"
            r="12"
            fill="#64748b"
          />
          <rect
            className="filter"
            x="160"
            y="15"
            width="25"
            height="30"
            fill="#334155"
          />
          <rect
            className="adc-comm"
            x="200"
            y="20"
            width="20"
            height="20"
            fill="#1e293b"
          />
        </g>

        {/* DSP Pipeline */}
        <g transform="translate(300, 100)">
          <rect
            className="dsp-core"
            x="0"
            y="0"
            width="40"
            height="40"
            fill="#334155"
            rx="5"
          />
          <rect
            className="fft-engine"
            x="60"
            y="5"
            width="35"
            height="30"
            fill="#475569"
            rx="3"
          />
          <rect
            className="demodulator"
            x="110"
            y="10"
            width="30"
            height="20"
            fill="#64748b"
          />
          <rect
            className="decoder"
            x="160"
            y="15"
            width="25"
            height="10"
            fill="#334155"
          />
        </g>

        {/* Protocol Stack */}
        <g transform="translate(100, 200)">
          {[
            "application-layer",
            "transport-layer",
            "network-layer",
            "datalink-layer",
            "physical-layer",
          ].map((className, i) => (
            <rect
              key={className}
              className={className}
              x="0"
              y={i * 25}
              width="120"
              height="20"
              fill="#1e293b"
              stroke="#00ff88"
              strokeWidth="1"
              rx="3"
            />
          ))}
        </g>

        {/* Signal Waves */}
        {Array.from({ length: 5 }).map((_, i) => (
          <circle
            key={i}
            className="signal-wave"
            cx={150 + i * 30}
            cy={350}
            r={10 + i * 2}
            fill="none"
            stroke="#00d4ff"
            strokeWidth="2"
            opacity="0"
          />
        ))}

        {/* Data Packets */}
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={i}
            className="data-packet"
            x={200 + i * 15}
            y={400 + Math.sin(i) * 20}
            width="12"
            height="8"
            fill="#00ff88"
            rx="2"
          />
        ))}
      </svg>

      {/* Frontend Development Flow */}
      <svg
        ref={frontendFlowRef}
        viewBox="0 0 800 600"
        className="absolute bottom-0 left-0 w-full h-full opacity-30"
        style={{ filter: "drop-shadow(0 0 10px rgba(255, 0, 102, 0.3))" }}
      >
        {/* Development Tools */}
        <g transform="translate(50, 50)">
          <rect
            className="ide"
            x="0"
            y="0"
            width="60"
            height="40"
            fill="#1e293b"
            stroke="#0070f3"
            strokeWidth="2"
            rx="5"
          />
          <rect
            className="compiler"
            x="80"
            y="10"
            width="40"
            height="20"
            fill="#334155"
            rx="3"
          />
          <rect
            className="bundler"
            x="140"
            y="5"
            width="35"
            height="30"
            fill="#475569"
            rx="4"
          />
          <rect
            className="transpiler"
            x="190"
            y="15"
            width="30"
            height="10"
            fill="#64748b"
            rx="2"
          />
        </g>

        {/* Runtime Engine */}
        <g transform="translate(50, 120)">
          <rect
            className="js-engine"
            x="0"
            y="0"
            width="50"
            height="35"
            fill="#1e293b"
            stroke="#ff0066"
            strokeWidth="2"
            rx="5"
          />
          <rect
            className="dom-tree"
            x="70"
            y="5"
            width="40"
            height="25"
            fill="#334155"
            rx="3"
          />
          <rect
            className="css-engine"
            x="130"
            y="10"
            width="35"
            height="15"
            fill="#475569"
            rx="2"
          />
          <rect
            className="render-engine"
            x="180"
            y="8"
            width="30"
            height="19"
            fill="#64748b"
            rx="3"
          />
        </g>

        {/* Performance Tools */}
        <g transform="translate(50, 180)">
          <rect
            className="profiler"
            x="0"
            y="0"
            width="45"
            height="25"
            fill="#1e293b"
            stroke="#ff8800"
            strokeWidth="1"
            rx="4"
          />
          <rect
            className="lighthouse"
            x="60"
            y="5"
            width="35"
            height="15"
            fill="#334155"
            rx="3"
          />
          <rect
            className="devtools"
            x="110"
            y="8"
            width="30"
            height="9"
            fill="#475569"
            rx="2"
          />
        </g>

        {/* Code Lines */}
        {Array.from({ length: 10 }).map((_, i) => (
          <rect
            key={i}
            className="code-line"
            x={300}
            y={50 + i * 8}
            width={80 + Math.random() * 40}
            height="3"
            fill="#00d4ff"
            rx="1"
            opacity="0"
          />
        ))}

        {/* Components */}
        {Array.from({ length: 6 }).map((_, i) => (
          <rect
            key={i}
            className="component"
            x={300 + (i % 3) * 50}
            y={150 + Math.floor(i / 3) * 30}
            width="35"
            height="20"
            fill="#00ff88"
            rx="3"
          />
        ))}

        {/* State Updates */}
        {Array.from({ length: 4 }).map((_, i) => (
          <circle
            key={i}
            className="state-update"
            cx={350 + i * 20}
            cy={250}
            r="8"
            fill="#ffff00"
          />
        ))}

        {/* API Calls */}
        {Array.from({ length: 3 }).map((_, i) => (
          <rect
            key={i}
            className="api-call"
            x={320 + i * 30}
            y={300}
            width="20"
            height="12"
            fill="#ff0066"
            rx="2"
          />
        ))}

        {/* API Paths */}
        {Array.from({ length: 3 }).map((_, i) => (
          <path
            key={i}
            className={`api-path-${i}`}
            d={`M ${330 + i * 30} 306 Q ${350 + i * 30} 280 ${370 + i * 30} 306`}
            stroke="#ff0066"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          />
        ))}
      </svg>

      {/* Robotic Arm System */}
      <svg
        ref={roboticArmRef}
        viewBox="0 0 800 600"
        className="absolute bottom-0 right-0 w-full h-full opacity-30"
        style={{ filter: "drop-shadow(0 0 10px rgba(255, 136, 0, 0.3))" }}
      >
        {/* Control System */}
        <g transform="translate(50, 50)">
          <rect
            className="robot-controller"
            x="0"
            y="0"
            width="80"
            height="50"
            fill="#1e293b"
            stroke="#0070f3"
            strokeWidth="2"
            rx="8"
          />
          <rect
            className="kinematics-engine"
            x="100"
            y="10"
            width="60"
            height="30"
            fill="#334155"
            rx="5"
          />
          <rect
            className="path-planner"
            x="180"
            y="15"
            width="50"
            height="20"
            fill="#475569"
            rx="4"
          />
        </g>

        {/* Robotic Arm */}
        <g transform="translate(200, 150)">
          {/* Base */}
          <circle
            className="base-motor"
            cx="0"
            cy="0"
            r="25"
            fill="#1e293b"
            stroke="#00d4ff"
            strokeWidth="3"
          />

          {/* Shoulder Joint */}
          <circle
            className="shoulder-servo"
            cx="0"
            cy="-80"
            r="20"
            fill="#334155"
            stroke="#00ff88"
            strokeWidth="2"
          />

          {/* Upper Arm */}
          <rect
            className="link"
            x="-5"
            y="-100"
            width="10"
            height="80"
            fill="#475569"
            rx="5"
          />

          {/* Elbow Joint */}
          <circle
            className="elbow-actuator"
            cx="0"
            cy="-160"
            r="15"
            fill="#64748b"
            stroke="#ffff00"
            strokeWidth="2"
          />

          {/* Forearm */}
          <rect
            className="link"
            x="-4"
            y="-175"
            width="8"
            height="60"
            fill="#475569"
            rx="4"
          />

          {/* Wrist */}
          <circle
            className="wrist-gimbal"
            cx="0"
            cy="-220"
            r="12"
            fill="#334155"
            stroke="#ff0066"
            strokeWidth="2"
          />

          {/* End Effector */}
          <rect
            className="end-effector"
            x="-8"
            y="-240"
            width="16"
            height="20"
            fill="#1e293b"
            stroke="#ff8800"
            strokeWidth="2"
            rx="3"
          />
        </g>

        {/* Sensors */}
        <g transform="translate(400, 100)">
          {/* Encoders */}
          {Array.from({ length: 4 }).map((_, i) => (
            <circle
              key={i}
              className="encoder"
              cx={i * 30}
              cy="0"
              r="8"
              fill="#00d4ff"
            />
          ))}

          {/* Force Sensors */}
          {Array.from({ length: 3 }).map((_, i) => (
            <rect
              key={i}
              className="force-sensor"
              x={i * 25}
              y="30"
              width="15"
              height="10"
              fill="#00ff88"
              rx="2"
            />
          ))}

          {/* Vision Sensor */}
          <rect
            className="vision-sensor"
            x="0"
            y="60"
            width="40"
            height="25"
            fill="#ffff00"
            rx="5"
          />

          {/* Proximity Sensors */}
          {Array.from({ length: 6 }).map((_, i) => (
            <circle
              key={i}
              className="proximity-sensor"
              cx={10 + (i % 3) * 20}
              cy={100 + Math.floor(i / 3) * 15}
              r="5"
              fill="#ff0066"
            />
          ))}
        </g>

        {/* Motion Profiles */}
        <g transform="translate(500, 200)">
          {Array.from({ length: 5 }).map((_, i) => (
            <rect
              key={i}
              className="motion-profile"
              x={i * 20}
              y="0"
              width="15"
              height={20 + Math.random() * 30}
              fill="#00ff88"
              rx="2"
            />
          ))}
        </g>

        {/* Trajectory Path */}
        <path
          className="trajectory-path"
          d="M 300 300 Q 400 250 500 300 T 700 300"
          stroke="#00d4ff"
          strokeWidth="3"
          fill="none"
          opacity="0.6"
        />
      </svg>

      {/* Signal Processing System */}
      <svg
        ref={signalProcessorRef}
        viewBox="0 0 800 600"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30"
        style={{ filter: "drop-shadow(0 0 10px rgba(139, 92, 246, 0.3))" }}
      >
        {/* Signal Chain */}
        <g transform="translate(50, 100)">
          {/* Analog Input */}
          {Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={i}
              className="analog-input"
              x={i * 15}
              y="0"
              width="10"
              height={20 + Math.random() * 30}
              fill="#8b5cf6"
              rx="2"
            />
          ))}

          {/* Anti-aliasing Filter */}
          <rect
            className="anti-aliasing-filter"
            x="150"
            y="10"
            width="30"
            height="30"
            fill="#334155"
            rx="5"
          />

          {/* Sample & Hold */}
          <rect
            className="sample-hold"
            x="200"
            y="15"
            width="25"
            height="20"
            fill="#64748b"
            rx="3"
          />

          {/* Quantizer */}
          <rect
            className="quantizer"
            x="240"
            y="10"
            width="20"
            height="30"
            fill="#1e293b"
            rx="3"
          />
        </g>

        {/* Digital Processing */}
        <g transform="translate(50, 200)">
          {/* Digital Filter */}
          <rect
            className="digital-filter"
            x="0"
            y="0"
            width="40"
            height="25"
            fill="#334155"
            rx="5"
          />

          {/* FFT Processor */}
          <rect
            className="fft-processor"
            x="60"
            y="5"
            width="35"
            height="15"
            fill="#475569"
            rx="3"
          />

          {/* Correlator */}
          <rect
            className="correlator"
            x="110"
            y="8"
            width="30"
            height="9"
            fill="#64748b"
            rx="2"
          />

          {/* Output Stage */}
          <rect
            className="output-stage"
            x="160"
            y="10"
            width="25"
            height="5"
            fill="#1e293b"
            rx="2"
          />
        </g>

        {/* Time Domain Signal */}
        <g transform="translate(300, 100)">
          {Array.from({ length: 50 }).map((_, i) => (
            <rect
              key={i}
              className="time-sample"
              x={i * 3}
              y={100 - Math.sin(i * 0.2) * 30}
              width="2"
              height="4"
              fill="#00d4ff"
              opacity="0"
            />
          ))}
        </g>

        {/* Frequency Spectrum */}
        <g transform="translate(300, 250)">
          {Array.from({ length: 64 }).map((_, i) => (
            <rect
              key={i}
              className="spectrum-bin"
              x={i * 2}
              y="0"
              width="1.5"
              height={10 + Math.random() * 40}
              fill="#00ff88"
            />
          ))}
        </g>

        {/* Filter Response */}
        <g transform="translate(500, 100)">
          {Array.from({ length: 40 }).map((_, i) => (
            <rect
              key={i}
              className="filter-response"
              x={i * 2}
              y="0"
              width="1.5"
              height={15 + Math.sin(i * 0.3) * 20}
              fill="#00ff88"
            />
          ))}
        </g>

        {/* Phase Plot */}
        <g transform="translate(500, 300)">
          {Array.from({ length: 20 }).map((_, i) => (
            <circle
              key={i}
              className="phase-point"
              cx={Math.cos(i * 0.3) * 30}
              cy={Math.sin(i * 0.3) * 30}
              r="3"
              fill="#00d4ff"
            />
          ))}
        </g>

        {/* Convolution Kernel */}
        <g transform="translate(100, 350)">
          {Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={i}
              className="kernel-tap"
              x={i * 8}
              y="0"
              width="6"
              height={10 + Math.random() * 15}
              fill="#00ff88"
              rx="1"
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
