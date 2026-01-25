"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { blobConfigs } from "@/config/gradient.config";

const GradientBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const blobs = blobRefs.current.filter(Boolean) as HTMLDivElement[];
      if (blobs.length === 0) return;

      // Create infinite looping animations for each blob
      blobs.forEach((blob, index) => {
        const config = blobConfigs[index];
        if (!config) return;

        // Main movement timeline with GPU-friendly transforms and smooth easing
        gsap.to(blob, {
          keyframes: config.animation.x.map((x, i) => ({
            x,
            y: config.animation.y[i],
            scale: config.animation.scale[i],
            rotation: config.animation.rotation[i],
            borderRadius: config.animation.borderRadius[i],
            duration: config.animation.duration / config.animation.x.length,
            ease: "power1.inOut",
          })),
          repeat: -1,
          repeatDelay: 0,
          ease: "none",
        });

        // Additional subtle opacity pulsing for depth
        gsap.to(blob, {
          opacity: config.opacity * 0.6,
          duration: config.animation.duration / 3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      {blobConfigs.map((config, index) => (
        <div
          key={config.id}
          ref={(el) => {
            blobRefs.current[index] = el;
          }}
          className="absolute will-change-transform"
          style={{
            width: config.size,
            height: config.size,
            ...config.position,
            background: config.gradient,
            filter: `blur(${config.blur})`,
            opacity: config.opacity,
            borderRadius: config.initialBorderRadius,
            transform: config.position.left === "50%" ? "translateX(-50%)" : undefined,
          }}
        />
      ))}

      {/* Subtle noise overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay dark:opacity-[0.03] mask-alpha mask-b-from-black mask-b-from-90% mask-b-to-transparent "
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default GradientBackground;
