"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Diamond } from "@/components/atoms/diamond";

const STATS = [
  { value: "1+",          label: "Year of experience" },
  { value: "E2E",         label: "Architecture to delivery" },
  { value: "Enterprise",  label: "Dashboard systems" },
  { value: "Open",        label: "To the right offer" },
];

function CountUp({ value, inView }: { value: string; inView: boolean }) {
  // Only animate purely numeric values
  const isNumeric = /^\d+$/.test(value.replace("+", ""));

  if (!isNumeric) {
    return (
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {value}
      </motion.span>
    );
  }

  const num = parseInt(value);
  const suffix = value.replace(/\d+/, "");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView || !ref.current) return;
    let start = 0;
    const end = num;
    const duration = 900;
    const step = duration / end;
    const timer = setInterval(() => {
      start += 1;
      if (ref.current) ref.current.textContent = start + suffix;
      if (start >= end) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [inView, num, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="w-full border-y border-border/50 py-8"
      style={{ fontFamily: "var(--font-instrument-sans)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-border/50">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col gap-1 md:px-8 first:pl-0 last:pr-0"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <div className="flex items-baseline gap-1">
                <span
                  className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-foreground tabular-nums"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  <CountUp value={stat.value} inView={inView} />
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Diamond size={5} className="text-accent shrink-0" />
                <span className="text-xs tracking-wide text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
