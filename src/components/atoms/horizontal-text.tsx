"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalTextProps {
  text: string;
  className?: string;
  letterClassName?: string;
  speed?: number;
  visibleLetters?: number; // Number of letters visible at start
}

export const HorizontalText = ({
  text,
  className,
  letterClassName,
  speed = 1,
  visibleLetters = 7, // Default show first 7 letters (like "WELCOME")
}: HorizontalTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current || !textRef.current) return;

      const letters = lettersRef.current.filter(Boolean);
      if (letters.length === 0) return;

      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const isMobile = vw < 768;

      // Calculate how many letters need to animate in
      const animatingCount = letters.length - visibleLetters;
      // Adjust scroll end based on how many letters need to animate
      const scrollEndMultiplier = Math.max(4, 3 + animatingCount * 0.15);

      // Set initial state for all letters
      // First N letters are visible, rest start from corners
      letters.forEach((letter, i) => {
        if (i < visibleLetters) {
          // These letters are visible from the start
          gsap.set(letter, {
            opacity: 1,
            y: 0,
            x: 0,
          });
        } else {
          // These letters animate in from corners
          // +y (from top-right) for even index, -y (from bottom-right) for odd index
          const isFromTop = i % 2 === 0;
          gsap.set(letter, {
            opacity: 0,
            y: isFromTop ? -(vh * 0.9) : vh * 0.9, // Much further from corners
            x: vw * 0.5, // Start from far right
            scale: 0.5, // Start smaller for dramatic effect
          });
        }
      });

      // Create the main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * scrollEndMultiplier * speed}`,
          scrub: isMobile ? 1 : 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Horizontal scroll animation for the text container
      tl.to(
        textRef.current,
        {
          x: () => {
            const scrollWidth = textRef.current!.scrollWidth;
            const viewportWidth = window.innerWidth;
            return -(scrollWidth - viewportWidth / 2);
          },
          ease: "none",
          duration: 1,
        },
        0
      );

      // Animate each letter that needs to animate in (after visibleLetters)
      const animatingLetters = letters.slice(visibleLetters);
      const totalDuration = 0.85; // Use 85% of timeline for letter animations
      const letterAnimDuration = totalDuration / animatingCount;

      animatingLetters.forEach((letter, i) => {
        const startTime = 0.05 + i * letterAnimDuration * 0.9;
        const duration = letterAnimDuration * 1.2;

        tl.to(
          letter,
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            ease: "back.out(1.7)",
            duration: duration,
          },
          startTime
        );
      });
    },
    { scope: containerRef, dependencies: [text, speed, visibleLetters] }
  );

  // Split text into letters
  const letters = text.split("");

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-screen w-full overflow-hidden",
        className
      )}
    >
      <div
        ref={textRef}
        className="absolute left-1/4 top-1/2 flex -translate-y-1/2 whitespace-nowrap md:left-1/5 md:translate-x-0"
      >
        {letters.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            ref={(el) => {
              lettersRef.current[index] = el;
            }}
            className={cn(
              "inline-block font-bold leading-none tracking-tighter",
              "text-[24vw] sm:text-[20vw] md:text-[16vw] lg:text-[14vw]",
              "text-foreground",
              letter === " " && "w-[0.3em]",
              letterClassName
            )}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
    </div>
  );
};
