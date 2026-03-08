"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface CharRevealProps {
  text: string;
  className?: string;
  /** Delay before animation starts (ms) */
  delay?: number;
  /** Stagger between each character (ms) */
  stagger?: number;
  /** Duration of each character reveal (s) */
  duration?: number;
  /** Trigger immediately or wait for viewport */
  trigger?: "mount" | "viewport";
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

type BezierCurve = [number, number, number, number];
const ease: BezierCurve = [0.215, 0.61, 0.355, 1];

/**
 * Reveals text character by character with a clip-path + translateY animation.
 * Inspired by Clay Boan's character-level text reveals.
 */
export function CharReveal({
  text,
  className,
  delay = 0,
  stagger = 0.02,
  duration = 0.6,
  trigger = "mount",
  as: Tag = "span",
}: CharRevealProps) {
  const words = text.split(" ");
  const delayS = delay / 1000;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delayS } },
  };

  const charVariants = {
    hidden: {
      clipPath: "inset(0 0 100% 0)",
      y: "0.3em",
      opacity: 0,
    },
    visible: {
      clipPath: "inset(0 0 0% 0)",
      y: "0em",
      opacity: 1,
      transition: { duration, ease },
    },
  };

  const viewportOptions =
    trigger === "viewport"
      ? { once: true, margin: "-10% 0px" }
      : undefined;

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate={trigger === "mount" ? "visible" : undefined}
      whileInView={trigger === "viewport" ? "visible" : undefined}
      viewport={viewportOptions}
      className={cn("inline-flex flex-wrap gap-x-[0.25em]", className)}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-flex overflow-hidden">
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              variants={charVariants}
              className="inline-block"
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}
