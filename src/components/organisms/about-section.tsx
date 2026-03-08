"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Timeline } from "@/components/ui/timeline";
import { timelineData } from "@/config/timeline.config";
import { Diamond } from "@/components/atoms/diamond";
import { CharReveal } from "@/components/atoms/char-reveal";
import { SectionDivider } from "@/components/atoms/section-divider";
import { SectionSlide } from "@/components/atoms/section-slide";

type BezierCurve = [number, number, number, number];
const ease: BezierCurve = [0.215, 0.61, 0.355, 1];

const clipReveal = (delay = 0) => ({
  initial: { clipPath: "inset(0 100% 0 0)" },
  whileInView: { clipPath: "inset(0 0% 0 0)" },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease, delay },
});

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen">

      {/* The whole intro block slides in as one unit */}
      <SectionSlide>
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-24 pb-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-20">

            {/* Bio text */}
            <div className="flex-1">
              {/* Label — horizontal clip-path wipe */}
              <motion.div className="flex items-center gap-2 mb-6" {...clipReveal(0)}>
                <Diamond size={8} className="text-muted-foreground" />
                <span
                  className="text-xs tracking-widest uppercase text-muted-foreground"
                  style={{ fontFamily: "var(--font-instrument-sans)" }}
                >
                  About
                </span>
              </motion.div>

              {/* Heading — CharReveal per line */}
              <h2
                className="text-4xl md:text-5xl font-black leading-tight tracking-[-0.04em] text-foreground mb-6"
                style={{ fontFamily: "var(--font-fraunces)" }}
                aria-label="Building things that matter."
              >
                <div className="overflow-hidden">
                  <CharReveal text="Building things" trigger="viewport" delay={120} stagger={0.03} duration={0.65} />
                </div>
                <div className="overflow-hidden">
                  <CharReveal text="that matter." trigger="viewport" delay={300} stagger={0.03} duration={0.65} />
                </div>
              </h2>

              <p
                className="text-base text-muted-foreground leading-relaxed max-w-md"
                style={{ fontFamily: "var(--font-instrument-sans)" }}
              >
                Frontend developer based in Bekasi, Indonesia. Currently building
                enterprise dashboard systems at Universitas Pancasila — owning
                everything from architecture to delivery.
              </p>

              <p
                className="mt-4 text-base text-muted-foreground leading-relaxed max-w-md"
                style={{ fontFamily: "var(--font-instrument-sans)" }}
              >
                Not actively looking — but open to the right opportunity.
              </p>
            </div>

            {/* Photo */}
            <div className="shrink-0 w-48 md:w-56">
              <div className="relative aspect-3/4 rounded-xl overflow-hidden bg-muted">
                <Image
                  src="/actionItem/irul.webp"
                  alt="Khoirul Husein"
                  fill
                  sizes="(max-width: 768px) 192px, 224px"
                  quality={90}
                  className="object-cover object-top"
                />
              </div>
              <p
                className="mt-2 text-xs text-muted-foreground tracking-widest uppercase text-center"
                style={{ fontFamily: "var(--font-instrument-sans)" }}
              >
                Bekasi, ID
              </p>
            </div>
          </div>
        </div>

        {/* Divider with accent sweep */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <SectionDivider />
        </div>
      </SectionSlide>

      {/* Timeline scrolls naturally below */}
      <Timeline data={timelineData} />
    </section>
  );
}
