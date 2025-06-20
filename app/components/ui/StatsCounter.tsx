"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useEffect } from "react";

const StatsCounter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { label: "Projects Completed", value: 50, suffix: "+" },
    { label: "Years Experience", value: 5, suffix: "+" },
    { label: "Technologies Mastered", value: 25, suffix: "+" },
    { label: "Client Satisfaction", value: 98, suffix: "%" },
  ];

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Counter
          key={stat.label}
          value={stat.value}
          label={stat.label}
          suffix={stat.suffix}
          isInView={isInView}
          delay={index * 0.2}
        />
      ))}
    </div>
  );
};

interface CounterProps {
  value: number;
  label: string;
  suffix: string;
  isInView: boolean;
  delay: number;
}

const Counter = ({ value, label, suffix, isInView, delay }: CounterProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const springCount = useSpring(count, { duration: 2000 });

  useEffect(() => {
    if (isInView) {
      count.set(value);
    }
  }, [count, value, isInView]);

  return (
    <motion.div
      className="text-center p-4 blueprint-border rounded-lg hover:bg-blueprint-dark/30 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      <motion.div className="text-2xl font-tech font-bold text-blueprint-primary">
        <motion.span>{rounded}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="text-xs text-blueprint-muted font-mono mt-1">{label}</p>
    </motion.div>
  );
};

export default StatsCounter;
