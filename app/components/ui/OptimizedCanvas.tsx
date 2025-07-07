"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

interface OptimizedCanvasProps {
  children: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
  performance?: "low" | "medium" | "high";
  enableSuspense?: boolean;
}

const OptimizedCanvas: React.FC<OptimizedCanvasProps> = ({
  children,
  className = "",
  fallback,
  performance = "medium",
  enableSuspense = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  // Check WebGL support
  useEffect(() => {
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl") ||
          (canvas.getContext("experimental-webgl") as WebGLRenderingContext);
        if (!gl) {
          setIsWebGLSupported(false);
          return;
        }

        // Check for context loss
        const loseContext = gl.getExtension("WEBGL_lose_context");
        if (loseContext) {
          loseContext.loseContext();
          setTimeout(() => {
            loseContext.restoreContext();
          }, 100);
        }
      } catch {
        setIsWebGLSupported(false);
      }
    };

    checkWebGLSupport();
  }, []);

  // Intersection observer for visibility
  useEffect(() => {
    if (!canvasRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    observer.observe(canvasRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Performance settings based on device capability
  const getPerformanceSettings = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const isLowEnd =
      typeof window !== "undefined" && (navigator.hardwareConcurrency || 4) < 4;

    if (performance === "low" || isLowEnd) {
      return {
        dpr: [0.5, 1] as [number, number],
        antialias: false,
        shadows: false,
        powerPreference: "low-power" as WebGLPowerPreference,
      };
    }

    if (performance === "high" && !isMobile) {
      return {
        dpr: [1, 2] as [number, number],
        antialias: true,
        shadows: true,
        powerPreference: "high-performance" as WebGLPowerPreference,
      };
    }

    // Medium/default settings
    return {
      dpr: [0.75, 1.5] as [number, number],
      antialias: true,
      shadows: false,
      powerPreference: "default" as WebGLPowerPreference,
    };
  };

  const settings = getPerformanceSettings();

  if (!isWebGLSupported) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gray-900 text-gray-400`}
      >
        <div className="text-center">
          <p>WebGL not supported</p>
          <p className="text-sm">Please use a modern browser</p>
        </div>
      </div>
    );
  }

  const CanvasContent = () => (
    <Canvas
      ref={canvasRef}
      className={`canvas-container ${className}`}
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{
        antialias: settings.antialias,
        powerPreference: settings.powerPreference,
        alpha: false,
        stencil: false,
        depth: true,
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false,
      }}
      dpr={settings.dpr}
      shadows={settings.shadows}
      frameloop={isVisible ? "always" : "demand"}
      performance={{ min: 0.5 }}
      onCreated={({ gl }) => {
        gl.setClearColor("#0f172a", 0);
        gl.toneMapping = 2; // ACESFilmicToneMapping
        gl.toneMappingExposure = 1;
        gl.outputColorSpace = "srgb";
      }}
    >
      {enableSuspense ? (
        <Suspense
          fallback={fallback || <div className="text-white">Loading 3D...</div>}
        >
          {children}
          <Preload all />
        </Suspense>
      ) : (
        <>
          {children}
          <Preload all />
        </>
      )}
    </Canvas>
  );

  return (
    <div className="relative w-full h-full">
      {isVisible ? (
        <CanvasContent />
      ) : (
        <div
          className={`${className} bg-gray-900 flex items-center justify-center`}
        >
          <div className="text-gray-400">Loading 3D scene...</div>
        </div>
      )}
    </div>
  );
};

export default OptimizedCanvas;
