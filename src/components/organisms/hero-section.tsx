"use client";

import { useRef, useEffect, useState, lazy, Suspense } from "react";
import { motion } from "motion/react";
import { Diamond } from "@/components/atoms/diamond";
import { CharReveal } from "@/components/atoms/char-reveal";
import { Magnetic } from "@/components/atoms/magnetic";

// Only imported when confirmed desktop — never shipped to mobile browsers
const HeroCanvas = lazy(() =>
  import("@/components/atoms/hero-canvas").then((m) => ({ default: m.HeroCanvas }))
);

type BezierCurve = [number, number, number, number];
const ease: BezierCurve = [0.215, 0.61, 0.355, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease, delay },
});

export default function HeroSection() {
  const heroRef    = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  // Only show Three.js canvas on true desktop (hover + fine pointer)
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (isDesktop) setShowCanvas(true);
  }, []);

  // 4-point mirror gradient — paused when hero is off-screen (IntersectionObserver)
  useEffect(() => {
    let rafId: number;
    let running = true;
    let targetX = 50, targetY = 50;
    let currentX = 50, currentY = 50;
    let mobileTime = 0;

    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    const onMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      if (e.clientY > rect.bottom || e.clientY < rect.top) return;
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;
    };

    const buildGradient = (cx: number, cy: number) => {
      const pts = [
        { x: cx,       y: cy,       color: "hsl(18,  85%, 50%, 0.28)" },
        { x: 100 - cx, y: cy,       color: "hsl(210, 75%, 55%, 0.22)" },
        { x: cx,       y: 100 - cy, color: "hsl(42,  90%, 58%, 0.22)" },
        { x: 100 - cx, y: 100 - cy, color: "hsl(270, 60%, 60%, 0.18)" },
      ];
      const size = "35vw 35vh";
      return pts
        .map((p) => `radial-gradient(ellipse ${size} at ${p.x.toFixed(2)}% ${p.y.toFixed(2)}%, ${p.color} 0%, transparent 68%)`)
        .join(", ");
    };

    const tick = () => {
      // Skip work but keep the loop alive so it resumes when scrolled back
      if (running && !document.hidden) {
        let cx: number, cy: number;
        if (isTouch) {
          mobileTime += 0.007;
          cx = 50 + Math.sin(mobileTime) * 22;
          cy = 50 + Math.cos(mobileTime * 0.65) * 18;
        } else {
          currentX += (targetX - currentX) * 0.05;
          currentY += (targetY - currentY) * 0.05;
          cx = currentX;
          cy = currentY;
        }
        if (spotlightRef.current) {
          spotlightRef.current.style.background = buildGradient(cx, cy);
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    // Pause RAF entirely when hero is scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => { running = entry.isIntersecting; },
      { threshold: 0 }
    );
    if (heroRef.current) observer.observe(heroRef.current);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      running = false;
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* 3D Particle canvas — desktop only, never loaded on mobile */}
      {showCanvas && (
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      )}

      {/* Noise texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.001]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "150px 150px",
        }}
      />

      {/* X-axis crossing spotlight — updated via DOM ref (no re-renders) */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      />

      {/* Content — same max-width + padding as other sections, maintains flex justify-between */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-28 pb-10 min-h-screen flex flex-col justify-between">

        {/* Top meta row */}
        <motion.div
          className="flex items-center justify-between text-xs tracking-widest uppercase text-muted-foreground"
          style={{ fontFamily: "var(--font-instrument-sans)" }}
          {...fadeUp(0.1)}
        >
          <span>Frontend Developer</span>
          <span className="flex items-center gap-2">
            <Diamond size={7} className="text-accent animate-pulse" />
            Open to Offers
          </span>
        </motion.div>

        {/* Name — hero focal point */}
        <div className="flex-1 flex items-center">
          <div className="w-full">
            <h1
              className="font-black leading-[0.88] tracking-[-0.04em] text-foreground uppercase"
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(4.5rem, 14vw, 13rem)",
              }}
              aria-label="Khoirul Husein"
            >
              <div className="overflow-hidden">
                <CharReveal text="Khoirul" delay={200} stagger={0.04} duration={0.7} />
              </div>
              <div className="overflow-hidden">
                <CharReveal text="Husein" delay={500} stagger={0.04} duration={0.7} />
              </div>
            </h1>

            {/* Separator */}
            <motion.div
              className="mt-6 md:mt-8 h-px w-full bg-muted origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease, delay: 0.85 }}
            />

            {/* Tagline row */}
            <motion.div
              className="mt-5 md:mt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
              {...fadeUp(1.0)}
            >
              <p
                className="text-base md:text-lg text-muted-foreground max-w-sm leading-relaxed"
                style={{ fontFamily: "var(--font-instrument-sans)" }}
              >
                Crafting interfaces that are{" "}
                <span className="text-foreground">thoughtful, fast,</span>{" "}
                and impossible to forget.
              </p>

              {/* CTAs */}
              <div className="flex items-center gap-4 shrink-0">
                <Magnetic strength={0.4}>
                  <a
                    href="#project"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#project")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group flex items-center gap-2 text-sm font-medium text-foreground transition-colors duration-300 hover:text-accent"
                    style={{ fontFamily: "var(--font-instrument-sans)" }}
                  >
                    View Work
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </Magnetic>
                <span className="text-border">|</span>
                <Magnetic strength={0.3}>
                  <a
                    href="mailto:irul.career@gmail.com"
                    className="text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
                    style={{ fontFamily: "var(--font-instrument-sans)" }}
                  >
                    irul.career@gmail.com
                  </a>
                </Magnetic>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom row */}
        <motion.div
          className="flex items-center justify-between text-xs tracking-widest uppercase text-muted-foreground"
          style={{ fontFamily: "var(--font-instrument-sans)" }}
          {...fadeUp(1.2)}
        >
          <span className="flex items-center gap-2">
            <Diamond size={7} className="text-muted-foreground" />
            Bekasi, Indonesia
          </span>
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Scroll ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
