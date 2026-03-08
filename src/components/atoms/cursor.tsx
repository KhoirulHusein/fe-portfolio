"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Custom cursor — small dot (exact tracking) + outer ring (spring lag).
 * Ring expands on hover of interactive elements.
 * Desktop only (hidden on touch devices).
 */
export function CustomCursor() {
  const [hovering, setHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const ringX = useSpring(cursorX, { damping: 22, stiffness: 180, mass: 0.4 });
  const ringY = useSpring(cursorY, { damping: 22, stiffness: 180, mass: 0.4 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [role='button']")) {
        setHovering(true);
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [role='button']")) {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Outer ring — spring lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-999998 hidden md:block"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full border border-foreground"
          animate={{
            width: hovering ? 48 : 28,
            height: hovering ? 48 : 28,
            opacity: hovering ? 1 : 0.35,
            borderColor: hovering
              ? "hsl(var(--accent))"
              : "hsl(var(--foreground))",
          }}
          transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
        />
      </motion.div>

      {/* Inner dot — exact tracking */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-999999 hidden md:block"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full bg-foreground"
          animate={{
            width: hovering ? 5 : 4,
            height: hovering ? 5 : 4,
            opacity: hovering ? 0.4 : 0.9,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  );
}
