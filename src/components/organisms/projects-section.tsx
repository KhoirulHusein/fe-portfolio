"use client";

import { motion } from "motion/react";
import { WorkList } from "@/components/organisms/work-list";
import { Diamond } from "@/components/atoms/diamond";
import { CharReveal } from "@/components/atoms/char-reveal";
import { SectionSlide } from "@/components/atoms/section-slide";

type BezierCurve = [number, number, number, number];
const ease: BezierCurve = [0.215, 0.61, 0.355, 1];

const clipReveal = (delay = 0) => ({
  initial: { clipPath: "inset(0 100% 0 0)" },
  whileInView: { clipPath: "inset(0 0% 0 0)" },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease, delay },
});

export default function ProjectsSection() {
  return (
    <section id="project" className="relative py-24 overflow-hidden">
      <SectionSlide>
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

          {/* Header */}
          <div className="mb-16">
            <motion.div className="flex items-center gap-2 mb-6" {...clipReveal(0)}>
              <Diamond size={8} className="text-muted-foreground" />
              <span
                className="text-xs tracking-widest uppercase text-muted-foreground"
                style={{ fontFamily: "var(--font-instrument-sans)" }}
              >
                Selected Work
              </span>
            </motion.div>

            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-[-0.04em] text-foreground"
              style={{ fontFamily: "var(--font-fraunces)" }}
              aria-label="Projects"
            >
              <div className="overflow-hidden">
                <CharReveal text="Projects" trigger="viewport" delay={80} stagger={0.05} duration={0.8} />
              </div>
            </h2>
          </div>

          <WorkList />
        </div>
      </SectionSlide>
    </section>
  );
}
