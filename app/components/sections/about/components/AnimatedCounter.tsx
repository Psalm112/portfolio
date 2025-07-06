import React, { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { gsap } from "gsap";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  suffix = "",
  duration = 2,
}) => {
  const counterRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(counterRef, { once: true });

  useEffect(() => {
    if (isInView && counterRef.current) {
      gsap.to(counterRef.current, {
        textContent: end,
        duration,
        ease: "power2.out",
        snap: { textContent: 1 },
        onUpdate: function () {
          if (counterRef.current) {
            counterRef.current.textContent =
              Math.ceil(this.targets()[0].textContent) + suffix;
          }
        },
      });
    }
  }, [isInView, end, suffix, duration]);

  return <span ref={counterRef}>0{suffix}</span>;
};

export default AnimatedCounter;
