"use client";

import { motion, AnimatePresence } from "motion/react";
import { useActiveSection } from "@/hooks/use-active-section";

const SECTIONS = [
  { id: "hero",    label: "Intro" },
  { id: "about",   label: "About" },
  { id: "project", label: "Work"  },
  { id: "contact", label: "Contact" },
] as const;

const ease = [0.215, 0.61, 0.355, 1] as const;

export function SectionCounter() {
  const activeId    = useActiveSection();
  const activeIndex = SECTIONS.findIndex((s) => s.id === activeId);
  const total       = SECTIONS.length;

  return (
    <div
      className="fixed bottom-8 left-6 z-50 hidden md:flex flex-col items-start gap-3 select-none"
      style={{ fontFamily: "var(--font-instrument-sans)" }}
    >
      {/* Vertical progress dots */}
      <div className="flex flex-col gap-1.5 items-start">
        {SECTIONS.map((s, i) => (
          <motion.div
            key={s.id}
            className="rounded-full bg-muted-foreground"
            animate={{
              height: i === activeIndex ? 24 : 4,
              opacity: i === activeIndex ? 1 : 0.25,
            }}
            style={{ width: 2 }}
            transition={{ duration: 0.4, ease }}
          />
        ))}
      </div>

      {/* Counter number */}
      <div className="flex items-baseline gap-0.5 tabular-nums leading-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            className="text-sm font-medium text-foreground"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease }}
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
        <span className="text-xs text-muted-foreground/40">
          /{String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Section label */}
      <AnimatePresence mode="wait">
        <motion.span
          key={activeId}
          className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/50"
          initial={{ opacity: 0, x: 6 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -6 }}
          transition={{ duration: 0.28, ease }}
        >
          {SECTIONS.find((s) => s.id === activeId)?.label}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
