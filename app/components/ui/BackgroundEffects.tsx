"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BackgroundEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    let gridNodes: Array<{ x: number; y: number; active: boolean }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeGrid();
    };

    const initializeGrid = () => {
      gridNodes = [];
      const spacing = 40;
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          gridNodes.push({
            x,
            y,
            active: Math.random() > 0.95,
          });
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      // Draw grid
      ctx.strokeStyle = "rgba(100, 181, 246, 0.1)";
      ctx.lineWidth = 0.5;

      // Vertical lines
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Animate grid nodes
      gridNodes.forEach((node, index) => {
        if (Math.random() > 0.999) {
          node.active = !node.active;
        }

        if (node.active) {
          const pulse = (Math.sin(time * 3 + index * 0.1) + 1) * 0.5;
          ctx.fillStyle = `rgba(100, 181, 246, ${0.3 + pulse * 0.4})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 2 + pulse * 2, 0, Math.PI * 2);
          ctx.fill();

          // Draw connection lines to nearby active nodes
          gridNodes.forEach((otherNode) => {
            if (otherNode.active && otherNode !== node) {
              const dx = node.x - otherNode.x;
              const dy = node.y - otherNode.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 80) {
                ctx.strokeStyle = `rgba(100, 181, 246, ${
                  (0.1 * (80 - distance)) / 80
                })`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(otherNode.x, otherNode.y);
                ctx.stroke();
              }
            }
          });
        }
      });

      // Scan line effect
      const scanY = ((time * 100) % (canvas.height + 200)) - 100;
      const gradient = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50);
      gradient.addColorStop(0, "rgba(100, 181, 246, 0)");
      gradient.addColorStop(0.5, "rgba(100, 181, 246, 0.2)");
      gradient.addColorStop(1, "rgba(100, 181, 246, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 50, canvas.width, 100);

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Additional floating elements */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blueprint-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Circuit trace animations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <svg className="w-full h-full opacity-20">
          <defs>
            <linearGradient
              id="traceGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#64b5f6" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {Array.from({ length: 5 }, (_, i) => (
            <motion.line
              key={i}
              x1="0"
              y1={`${20 + i * 20}%`}
              x2="100%"
              y2={`${20 + i * 20}%`}
              stroke="url(#traceGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      </div>
    </>
  );
};

export default BackgroundEffects;
