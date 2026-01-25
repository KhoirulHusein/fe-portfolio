"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { StarShape } from "@/components/atoms/star-shape";
import { shapeConfigs } from "@/config/shapes.config";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Calculate rotation with pauses based on progress
const getRotationAtProgress = (
  progress: number,
  pauses: number[],
  maxRotation: number,
  direction: 1 | -1
): number => {
  // Create segments between pauses
  const segments = [0, ...pauses, 1];
  let rotationProgress = 0;

  for (let i = 0; i < segments.length - 1; i++) {
    const segmentStart = segments[i];
    const segmentEnd = segments[i + 1];
    const segmentLength = segmentEnd - segmentStart;

    if (progress >= segmentEnd) {
      // Past this segment
      rotationProgress += 1 / (segments.length - 1);
    } else if (progress > segmentStart) {
      // In this segment
      const segmentProgress = (progress - segmentStart) / segmentLength;
      // Ease in-out for smooth rotation
      const eased = segmentProgress < 0.5
        ? 2 * segmentProgress * segmentProgress
        : 1 - Math.pow(-2 * segmentProgress + 2, 2) / 2;
      rotationProgress += eased / (segments.length - 1);
      break;
    }
  }

  return rotationProgress * maxRotation * direction;
};

// Calculate wave offset based on progress and config
const getWaveOffset = (
  progress: number,
  amplitude: number,
  frequency: number,
  phaseOffset: number
): number => {
  return Math.sin(progress * Math.PI * 2 * frequency + phaseOffset) * amplitude;
};

const HorizontalShapesBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isInSection, setIsInSection] = useState(false);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const shapes = shapeRefs.current.filter(Boolean) as HTMLDivElement[];
      const glows = glowRefs.current.filter(Boolean) as HTMLDivElement[];
      if (shapes.length === 0) return;

      const container = containerRef.current;
      const heroSection = container.closest("#hero");
      if (!heroSection) return;

      // Get container dimensions
      const containerHeight = container.offsetHeight;
      const containerWidth = container.offsetWidth;

      // Set initial positions for shapes
      shapes.forEach((shape, index) => {
        const config = shapeConfigs[index];
        if (!config) return;

        const initialX = (config.startX / 100) * containerWidth - config.size / 2;
        const initialY = (config.startY / 100) * containerHeight - config.size / 2;

        gsap.set(shape, {
          x: initialX,
          y: initialY,
          rotation: 0,
          scale: 1,
          opacity: 0.9,
        });
      });

      // Create ScrollTrigger for scroll-based path motion
      ScrollTrigger.create({
        trigger: heroSection,
        start: "top top",
        end: () => `+=${window.innerHeight * 4}`,
        scrub: 1.5,
        onEnter: () => setIsInSection(true),
        onLeave: () => setIsInSection(false),
        onEnterBack: () => setIsInSection(true),
        onLeaveBack: () => setIsInSection(false),
        onUpdate: (self) => {
          const progress = self.progress;

          shapes.forEach((shape, index) => {
            const config = shapeConfigs[index];
            if (!config) return;

            // Calculate base position
            const baseX = (config.startX / 100) * containerWidth - config.size / 2;
            const baseY = (config.startY / 100) * containerHeight - config.size / 2;

            // Calculate wave offset (horizontal movement)
            const waveOffset = getWaveOffset(
              progress,
              config.waveAmplitude,
              config.waveFrequency,
              config.phaseOffset
            );

            // Calculate vertical travel based on scroll
            const yTravel = progress * (config.scrollDistance / 100) * containerHeight;

            // Calculate rotation with pauses
            const rotation = getRotationAtProgress(
              progress,
              config.rotationPauses,
              config.maxRotation,
              config.rotationDirection
            );

            // Apply smooth transformations
            gsap.to(shape, {
              x: baseX + waveOffset,
              y: baseY + yTravel,
              rotation: rotation,
              duration: 0.1,
              ease: "none",
              overwrite: "auto",
            });
          });
        },
      });

      // Idle floating animations (when user is not scrolling)
      shapes.forEach((shape, index) => {
        const config = shapeConfigs[index];
        if (!config) return;

        // Floating animation (vertical bobbing)
        gsap.to(shape, {
          y: `+=${config.floatAmplitude}`,
          duration: config.floatDuration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: config.floatDelay,
        });

        // Subtle horizontal drift
        gsap.to(shape, {
          x: `+=${config.floatAmplitude * 0.6}`,
          duration: config.floatDuration * 1.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: config.floatDelay + 0.3,
        });

        // Breathing scale effect
        gsap.to(shape, {
          scale: config.breatheMax,
          duration: config.breatheDuration / 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: config.floatDelay + 0.5,
        });

        // Subtle opacity modulation
        gsap.to(shape, {
          opacity: 0.7,
          duration: config.breatheDuration * 0.8,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: config.floatDelay + 1,
        });
      });

      // Glow pulsing animation
      glows.forEach((glow, index) => {
        const config = shapeConfigs[index];
        if (!config) return;

        gsap.to(glow, {
          opacity: config.glowIntensity * 0.4,
          scale: 1.3,
          duration: config.breatheDuration * 0.9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: config.floatDelay + 0.2,
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      aria-hidden="true"
    >
      {shapeConfigs.map((config, index) => (
        <div
          key={config.id}
          ref={(el) => {
            shapeRefs.current[index] = el;
          }}
          className="absolute will-change-transform"
          style={{
            // Initial position set by GSAP
          }}
        >
          {/* Glow layer behind shape */}
          <div
            ref={(el) => {
              glowRefs.current[index] = el;
            }}
            className="absolute inset-0 will-change-transform"
            style={{
              width: config.size * 1.8,
              height: config.size * 1.8,
              left: -(config.size * 0.4),
              top: -(config.size * 0.4),
              background: config.color === "primary"
                ? "radial-gradient(circle, hsla(var(--primary), 0.4) 0%, hsla(var(--primary), 0.15) 40%, transparent 70%)"
                : config.color === "accent"
                  ? "radial-gradient(circle, hsla(var(--accent), 0.4) 0%, hsla(var(--accent), 0.15) 40%, transparent 70%)"
                  : "radial-gradient(circle, hsla(var(--secondary), 0.4) 0%, hsla(var(--secondary), 0.15) 40%, transparent 70%)",
              filter: "blur(20px)",
              opacity: config.glowIntensity,
            }}
          />

          {/* The actual star shape */}
          <StarShape
            variant={config.variant}
            color={config.color}
            size={config.size}
            className="relative z-10 opacity-65"
          />
        </div>
      ))}
    </div>
  );
};

export default HorizontalShapesBackground;
