"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Initialises Lenis smooth scroll on mount.
 * Drop this into any client layout or page component.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Native scroll on touch devices — Lenis adds JS weight with no benefit on mobile
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
