"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

interface SmoothScrollProps {
  children: ReactNode;
  smooth?: number;
  effects?: boolean;
  smoothTouch?: number;
}

export const SmoothScroll = ({
  children,
  smooth = 1.5,
  effects = true,
  smoothTouch = 0.1,
}: SmoothScrollProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerRef.current || !contentRef.current) return;

    const smoother = ScrollSmoother.create({
      wrapper: scrollerRef.current,
      content: contentRef.current,
      smooth: smooth,
      effects: effects,
      smoothTouch: smoothTouch,
      normalizeScroll: true,
    });

    return () => {
      smoother.kill();
    };
  }, [smooth, effects, smoothTouch]);

  return (
    <div id="smooth-wrapper" ref={scrollerRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
};
