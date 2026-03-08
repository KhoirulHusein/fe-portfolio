"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionSlideProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Slides a section in as one unit when it enters the viewport.
 * Uses useInView (not useScroll) — fires once, stays, no per-frame scroll
 * calculations. Significantly lighter than scroll-driven transforms.
 */
export function SectionSlide({ children, className }: SectionSlideProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={cn(className)}>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.75, ease: [0.215, 0.61, 0.355, 1] }}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
