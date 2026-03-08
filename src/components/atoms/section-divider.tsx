"use client";

import { useRef, useState, useEffect, startTransition } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
  delay?: number;
}

const ease = [0.215, 0.61, 0.355, 1] as const;

/**
 * Animated section separator:
 * 1. Border line draws left → right
 * 2. Accent flash sweeps across and exits to the right — curtain wipe effect
 *
 * Re-triggers on every viewport entry without causing scroll jank:
 * uses a key increment to remount + replay, rather than instant DOM resets.
 */
export function SectionDivider({ className, delay = 0 }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    // Only fire on entry — deferred so it doesn't block the scroll frame
    if (inView) startTransition(() => setAnimKey((k) => k + 1));
  }, [inView]);

  return (
    <div ref={ref} className={cn("relative h-px overflow-hidden", className)}>
      {/* Base border line — draws left to right */}
      <motion.div
        key={`line-${animKey}`}
        className="absolute inset-0 bg-border origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease, delay }}
      />

      {/* Accent curtain flash — enters left → full → exits right */}
      <motion.div
        key={`curtain-${animKey}`}
        className="absolute inset-0 bg-accent"
        initial={{ clipPath: "inset(0 100% 0 0%)" }}
        animate={{
          clipPath: [
            "inset(0 100% 0 0%)",
            "inset(0 0%   0 0%)",
            "inset(0 0%   0 100%)",
          ],
        }}
        transition={{
          duration: 1.0,
          delay: delay + 0.25,
          times: [0, 0.45, 1],
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
