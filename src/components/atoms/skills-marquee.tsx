"use client";

import { cn } from "@/lib/utils";
import { Diamond } from "@/components/atoms/diamond";
import { SectionSlide } from "@/components/atoms/section-slide";

const SKILLS = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Framer Motion",
  "Figma",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "REST API",
  "UI / UX",
  "Web Performance",
  "PHP",
  "Laravel",
  "Filament",
  "Livewire",
  "Docker",
  "Vitest",
  "React Router",
];

interface SkillsMarqueeProps {
  className?: string;
}

export function SkillsMarquee({ className }: SkillsMarqueeProps) {
  // Duplicate for seamless infinite loop
  const items = [...SKILLS, ...SKILLS];

  return (
    <SectionSlide>
    <div
      className={cn(
        "relative overflow-hidden border-y border-border py-4 select-none",
        className
      )}
    >
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-linear-to-l from-background to-transparent" />

      {/* Scrolling track */}
      <div className="flex w-max" style={{ animation: "marquee 32s linear infinite" }}>
        {items.map((skill, i) => (
          <span
            key={i}
            className="flex items-center gap-6 pr-6"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground whitespace-nowrap">
              {skill}
            </span>
            <Diamond size={5} className="text-accent shrink-0" />
          </span>
        ))}
      </div>
    </div>
    </SectionSlide>
  );
}
