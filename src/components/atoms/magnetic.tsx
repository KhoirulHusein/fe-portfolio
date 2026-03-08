"use client";

import { useRef } from "react";
import { motion, useSpring } from "motion/react";

interface MagneticProps {
  children: React.ReactNode;
  /** How much the element shifts toward the cursor. 0.3 = subtle, 0.6 = strong. */
  strength?: number;
  className?: string;
}

/**
 * Wraps any element and gives it a magnetic pull toward the cursor on hover.
 * Spring physics make the snap-back feel natural.
 */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useSpring(0, { damping: 10, stiffness: 100, mass: 0.4 });
  const y = useSpring(0, { damping: 10, stiffness: 100, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}
