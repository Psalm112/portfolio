"use client";

import { Suspense, useRef, useEffect, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Preload,
} from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import CircuitBrain from "./CircuitBrain";
import FloatingCode from "./FloatingCode";
import NeuralParticles from "./NeuralParticles";
import ScrollAssembly from "./ScrollAssembly";

// Loading fallback component
const LoadingFallback = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="relative">
      <div className="w-32 h-32 border-2 border-blueprint-primary/30 rounded-full animate-spin border-t-blueprint-primary" />
      <div className="absolute inset-4 border border-blueprint-secondary/20 rounded-full animate-pulse" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-4 h-4 bg-blueprint-primary rounded-full animate-pulse" />
      </div>
    </div>
  </div>
);

// Error fallback component
const ErrorFallback = ({ onRetry }: { onRetry: () => void }) => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-32 h-32 border-2 border-blueprint-primary/30 rounded-full opacity-50" />
      <div className="space-y-2">
        <p className="text-blueprint-muted text-sm">3D Scene Unavailable</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 text-xs bg-blueprint-primary/20 border border-blueprint-primary/30 
                     rounded text-blueprint-primary hover:bg-blueprint-primary/30 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  </div>
);

// WebGL capability checker
const checkWebGLSupport = (): boolean => {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch (e) {
    return false;
  }
};

const CircuitBrainAnimation = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Check WebGL support on mount
  useEffect(() => {
    const supported = checkWebGLSupport();
    setWebglSupported(supported);
    if (!supported) {
      console.warn("WebGL not supported, falling back to static display");
    }
  }, []);

  // Context loss/restore handlers
  const handleContextLost = useCallback((event: Event) => {
    console.warn("WebGL context lost, attempting recovery...");
    event.preventDefault();
    setContextLost(true);
    setIsLoaded(false);
  }, []);

  const handleContextRestore = useCallback(() => {
    console.log("WebGL context restored");
    setContextLost(false);
    setHasError(false);
    setIsLoaded(false);

    // Delay to ensure proper restoration
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  // Setup context event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("webglcontextlost", handleContextLost, false);
    canvas.addEventListener(
      "webglcontextrestored",
      handleContextRestore,
      false
    );

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestore);
    };
  }, [handleContextLost, handleContextRestore]);

  // Loading timer
  useEffect(() => {
    if (contextLost || hasError) return;

    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, [contextLost, hasError, retryCount]);

  // Global error handler
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      if (
        error.message?.includes("WebGL") ||
        error.message?.includes("context")
      ) {
        console.error("WebGL error:", error);
        setHasError(true);
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (
        event.reason?.message?.includes("WebGL") ||
        event.reason?.message?.includes("context")
      ) {
        console.error("WebGL promise rejection:", event.reason);
        setHasError(true);
      }
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, []);

  // Retry function
  const handleRetry = useCallback(() => {
    setHasError(false);
    setContextLost(false);
    setIsLoaded(false);
    setRetryCount((prev) => prev + 1);
  }, []);

  // Canvas creation handler
  const handleCanvasCreated = useCallback(({ gl, scene, camera }: any) => {
    rendererRef.current = gl;

    const rawGL = gl.getContext();
    // Configure renderer for stability
    gl.setClearColor(0x000000, 0);
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Enable context loss extension for better recovery
    const loseContext = rawGL.getExtension("WEBGL_lose_context");
    if (loseContext) {
      // Store reference for potential manual recovery
      (rawGL as any).loseContextExtension = loseContext;
    }

    console.log("Canvas created successfully");
  }, []);

  // Handle canvas errors
  const handleCanvasError = useCallback((error: any) => {
    console.error("Canvas error:", error);
    setHasError(true);
  }, []);

  // Don't render if WebGL isn't supported
  if (!webglSupported) {
    return <ErrorFallback onRetry={handleRetry} />;
  }

  // Show error state
  if (hasError && retryCount > 2) {
    return <ErrorFallback onRetry={handleRetry} />;
  }

  // Show context lost state
  if (contextLost) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-32 h-32 border-2 border-blueprint-primary/30 rounded-full animate-pulse" />
          <p className="text-blueprint-muted text-sm">Recovering 3D Scene...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <Canvas
          ref={canvasRef}
          key={retryCount} // Force remount on retry
          dpr={[1, Math.min(window.devicePixelRatio, 2)]} // Limit DPR for stability
          performance={{
            min: 0.3,
            max: 1,
            debounce: 200,
          }}
          gl={{
            antialias: false, // Disable for better performance
            alpha: true,
            powerPreference: "default", // Changed from high-performance
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: false,
            stencil: false,
            depth: true,
          }}
          style={{
            background: "transparent",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          camera={{
            position: [0, 0, 8],
            fov: 45,
            near: 0.1,
            far: 100, // Reduced far plane
          }}
          onCreated={handleCanvasCreated}
          onError={handleCanvasError}
          frameloop="demand" // Only render when needed
        >
          {/* Simplified lighting for better performance */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.8}
            color="#64b5f6"
          />
          <pointLight position={[-5, -5, -5]} intensity={0.4} color="#81c784" />

          <Suspense fallback={null}>
            <ScrollAssembly>
              <CircuitBrain />
              <NeuralParticles />
              <FloatingCode />
            </ScrollAssembly>
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate={true}
            autoRotateSpeed={0.1} // Reduced for performance
          />
        </Canvas>
      </motion.div>

      {/* Loading overlay */}
      {!isLoaded && !contextLost && !hasError && <LoadingFallback />}
    </div>
  );
};

export default CircuitBrainAnimation;
