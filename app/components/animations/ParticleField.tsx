"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

interface NeuralParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  type: "neuron" | "synapse" | "signal";
  energy: number;
  connections: number[];
}

interface Connection {
  from: number;
  to: number;
  strength: number;
  activity: number;
}

const ParticleField = ({
  intensity = 1,
  showConnections = true,
  responsive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<NeuralParticle[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const performanceRef = useRef({ lastTime: 0, fps: 60 });

  // Memoized particle configuration
  const config = useMemo(
    () => ({
      particleCount: responsive
        ? Math.min(150, Math.max(50, window.innerWidth / 10))
        : 100,
      maxConnections: 3,
      connectionDistance: responsive
        ? Math.min(120, window.innerWidth / 10)
        : 100,
      colors: {
        neurons: ["#64b5f6", "#81c784", "#ffb74d", "#ff6b9d"],
        synapses: ["#00e676", "#ff4081", "#3f51b5"],
        signals: ["#ffeb3b", "#ff5722", "#9c27b0"],
      },
    }),
    [responsive]
  );

  const createNeuralNetwork = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const particles: NeuralParticle[] = [];
    const connections: Connection[] = [];

    // Create neurons (larger, more stable particles)
    for (let i = 0; i < config.particleCount * 0.3; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 3 + Math.random() * 2,
        opacity: 0.7 + Math.random() * 0.3,
        color:
          config.colors.neurons[
            Math.floor(Math.random() * config.colors.neurons.length)
          ],
        type: "neuron",
        energy: Math.random(),
        connections: [],
      });
    }

    // Create synapses (medium particles)
    for (let i = 0; i < config.particleCount * 0.5; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: 1.5 + Math.random() * 1.5,
        opacity: 0.5 + Math.random() * 0.4,
        color:
          config.colors.synapses[
            Math.floor(Math.random() * config.colors.synapses.length)
          ],
        type: "synapse",
        energy: Math.random(),
        connections: [],
      });
    }

    // Create signals (small, fast-moving particles)
    for (let i = 0; i < config.particleCount * 0.2; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: 0.5 + Math.random() * 1,
        opacity: 0.8 + Math.random() * 0.2,
        color:
          config.colors.signals[
            Math.floor(Math.random() * config.colors.signals.length)
          ],
        type: "signal",
        energy: 0.8 + Math.random() * 0.2,
        connections: [],
      });
    }

    // Create neural connections
    particles.forEach((particle, index) => {
      if (particle.type === "neuron") {
        let connectionCount = 0;
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex && connectionCount < config.maxConnections) {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) +
                Math.pow(particle.y - otherParticle.y, 2)
            );

            if (distance < config.connectionDistance) {
              connections.push({
                from: index,
                to: otherIndex,
                strength: 1 - distance / config.connectionDistance,
                activity: Math.random(),
              });
              particle.connections.push(otherIndex);
              connectionCount++;
            }
          }
        });
      }
    });

    particlesRef.current = particles;
    connectionsRef.current = connections;
  }, [config]);

  const updateParticles = useCallback(
    (ctx: CanvasRenderingContext2D, deltaTime: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const mouse = mouseRef.current;
      const particles = particlesRef.current;
      const connections = connectionsRef.current;

      // Update particles
      particles.forEach((particle, index) => {
        // Mouse interaction
        const mouseDistance = Math.sqrt(
          Math.pow(particle.x - mouse.x, 2) + Math.pow(particle.y - mouse.y, 2)
        );

        if (mouseDistance < 100) {
          const force = (100 - mouseDistance) / 100;
          const angle = Math.atan2(particle.y - mouse.y, particle.x - mouse.x);
          particle.vx += Math.cos(angle) * force * 0.01;
          particle.vy += Math.sin(angle) * force * 0.01;
          particle.energy = Math.min(1, particle.energy + force * 0.02);
        }

        // Update position based on type
        const speedMultiplier =
          particle.type === "signal"
            ? 1.5
            : particle.type === "synapse"
            ? 1
            : 0.7;

        particle.x += particle.vx * speedMultiplier * deltaTime;
        particle.y += particle.vy * speedMultiplier * deltaTime;

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Energy decay and regeneration
        particle.energy *= 0.999;
        if (particle.energy < 0.1) {
          particle.energy = Math.random() * 0.3;
        }

        // Update opacity based on energy
        particle.opacity = 0.3 + particle.energy * 0.7;

        // Draw particle with glow effect
        const glowRadius = particle.size * (1 + particle.energy * 2);
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          glowRadius
        );

        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(0.4, particle.color + "80");
        gradient.addColorStop(1, "transparent");

        ctx.save();
        ctx.globalAlpha = particle.opacity * intensity;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw neural connections
      if (showConnections) {
        connections.forEach((connection) => {
          const fromParticle = particles[connection.from];
          const toParticle = particles[connection.to];

          if (!fromParticle || !toParticle) return;

          const distance = Math.sqrt(
            Math.pow(fromParticle.x - toParticle.x, 2) +
              Math.pow(fromParticle.y - toParticle.y, 2)
          );

          if (distance < config.connectionDistance) {
            // Update connection activity
            connection.activity += (Math.random() - 0.5) * 0.1;
            connection.activity = Math.max(0, Math.min(1, connection.activity));

            const opacity =
              connection.strength * connection.activity * intensity;
            const lineWidth = 0.5 + connection.activity * 1.5;

            ctx.save();
            ctx.globalAlpha = opacity * 0.6;
            ctx.strokeStyle = fromParticle.color;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.moveTo(fromParticle.x, fromParticle.y);
            ctx.lineTo(toParticle.x, toParticle.y);
            ctx.stroke();

            // Draw signal pulse along connection
            if (connection.activity > 0.7) {
              const pulsePosition = (Date.now() / 1000) % 1;
              const pulseX =
                fromParticle.x +
                (toParticle.x - fromParticle.x) * pulsePosition;
              const pulseY =
                fromParticle.y +
                (toParticle.y - fromParticle.y) * pulsePosition;

              ctx.globalAlpha = connection.activity;
              ctx.fillStyle = "#ffeb3b";
              ctx.beginPath();
              ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();
          }
        });
      }
    },
    [config, intensity, showConnections]
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const currentTime = Date.now();
    const deltaTime = Math.min(
      (currentTime - performanceRef.current.lastTime) / 16.67,
      2
    );
    performanceRef.current.lastTime = currentTime;

    // Clear canvas with fade effect
    ctx.fillStyle = "rgba(15, 20, 25, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    updateParticles(ctx, deltaTime);

    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticles]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createNeuralNetwork();
  }, [createNeuralNetwork]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();
    animate();

    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [animate, handleMouseMove, resizeCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        mixBlendMode: "screen",
        filter: "blur(0.5px)",
      }}
      aria-hidden="true"
    />
  );
};

export default ParticleField;
