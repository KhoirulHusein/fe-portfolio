"use client";

import { motion } from "motion/react";
import { Diamond } from "@/components/atoms/diamond";
import { CharReveal } from "@/components/atoms/char-reveal";
import { SectionDivider } from "@/components/molecules/section-divider";
import { SectionSlide } from "@/components/molecules/section-slide";

type BezierCurve = [number, number, number, number];
const ease: BezierCurve = [0.215, 0.61, 0.355, 1];

const clipReveal = (delay = 0) => ({
  initial: { clipPath: "inset(0 100% 0 0)" },
  whileInView: { clipPath: "inset(0 0% 0 0)" },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease, delay },
});

const links = [
  { label: "irul.career@gmail.com",         href: "mailto:irul.career@gmail.com" },
  { label: "github.com/KhoirulHusein",       href: "https://github.com/KhoirulHusein",            external: true },
  { label: "linkedin.com/in/khoirul-husein", href: "https://www.linkedin.com/in/khoirul-husein/", external: true },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24">
      <SectionSlide>
        {/* Entry divider — accent sweep marks the section boundary */}
        <SectionDivider className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 mb-12" />

        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

          {/* Label */}
          <motion.div className="flex items-center gap-2 mb-12" {...clipReveal(0.1)}>
            <Diamond size={8} className="text-muted-foreground" />
            <span
              className="text-xs tracking-widest uppercase text-muted-foreground"
              style={{ fontFamily: "var(--font-instrument-sans)" }}
            >
              Contact
            </span>
          </motion.div>

          {/* Heading */}
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.92] tracking-[-0.04em] text-foreground mb-16"
            style={{ fontFamily: "var(--font-fraunces)" }}
            aria-label="Let's build something together."
          >
            <div className="overflow-hidden">
              <CharReveal text="Let's build" trigger="viewport" delay={80}  stagger={0.04} duration={0.75} />
            </div>
            <div className="overflow-hidden">
              <CharReveal text="something"  trigger="viewport" delay={260} stagger={0.04} duration={0.75} />
            </div>
            <div className="overflow-hidden">
              <CharReveal text="together."  trigger="viewport" delay={430} stagger={0.04} duration={0.75} />
            </div>
          </h2>

          {/* Mid separator */}
          <SectionDivider className="mb-12" delay={0.3} />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">

            {/* Location */}
            <div>
              <p
                className="text-4xl md:text-5xl font-black leading-tight tracking-[-0.04em] text-muted-foreground/40"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Bekasi
              </p>
              <div className="flex items-center gap-3 mt-1">
                <Diamond size={8} className="text-muted-foreground/40" />
                <p
                  className="text-4xl md:text-5xl font-black leading-tight tracking-[-0.04em] text-muted-foreground/40"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  Indonesia
                </p>
              </div>
            </div>

            {/* Links — stagger from right */}
            <div className="flex flex-col gap-3" style={{ fontFamily: "var(--font-instrument-sans)" }}>
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.1 }}
                >
                  <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 text-accent">→</span>
                  {link.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
            <p
              className="text-xs text-muted-foreground tracking-wide"
              style={{ fontFamily: "var(--font-instrument-sans)" }}
            >
              © {new Date().getFullYear()} Khoirul Husein
            </p>
            <p
              className="text-xs text-muted-foreground tracking-widest uppercase"
              style={{ fontFamily: "var(--font-instrument-sans)" }}
            >
              Open to offers
            </p>
          </div>
        </div>
      </SectionSlide>
    </section>
  );
}
