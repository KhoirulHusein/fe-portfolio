"use client";

import { cn } from "@/lib/utils";

interface DiamondProps {
  className?: string;
  size?: number;
  /** When true, animates in on mount */
  animate?: boolean;
}

/**
 * Geometric accent element — Clay Boan's signature visual language.
 * Default: hidden (scale 0 rotate -180deg)
 * Hover parent to reveal: add group-hover:animate-[diamond-in_0.5s_var(--ease-out-cubic)_forwards]
 */
export function Diamond({ className, size = 10 }: DiamondProps) {
  return (
    <svg
      viewBox="0 0 10 10"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <rect
        x="5"
        y="0"
        width="7.07"
        height="7.07"
        transform="rotate(45 5 5)"
        fill="currentColor"
      />
    </svg>
  );
}
