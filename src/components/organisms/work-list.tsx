"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projectCards } from "@/config/projects.config";
import { Diamond } from "@/components/atoms/diamond";
import { useScramble } from "@/hooks/use-scramble";

type BezierCurve = [number, number, number, number];
const ease: BezierCurve = [0.215, 0.61, 0.355, 1];

interface CursorState {
  x: number;
  y: number;
  visible: boolean;
  src: string;
  title: string;
}

// Individual row with scramble — needed to call hook per item
function ProjectRow({
  project,
  index,
  onEnter,
  onLeave,
}: {
  project: (typeof projectCards)[number];
  index: number;
  onEnter: (src: string, title: string) => void;
  onLeave: () => void;
}) {
  const { text, scramble, reset } = useScramble(project.title);

  return (
    <motion.a
      href={`/projects/${project.id}`}
      onMouseEnter={() => {
        onEnter(project.src, project.title);
        scramble();
      }}
      onMouseLeave={() => {
        onLeave();
        reset();
      }}
      className="group block border-t border-border py-8 md:py-10"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease, delay: index * 0.08 }}
    >
      <div className="flex items-start justify-between gap-6">
        {/* Left */}
        <div className="flex-1 min-w-0">
          {/* Number + tech */}
          <div
            className="flex items-center gap-4 mb-3 text-xs tracking-widest uppercase text-muted-foreground"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            <span className="font-mono">0{index + 1}</span>
            <span>·</span>
            <span>{project.description}</span>
          </div>

          {/* Title — scrambles on hover */}
          <h3
            className="text-2xl md:text-4xl font-black leading-tight tracking-[-0.04em] text-foreground transition-colors duration-300 group-hover:text-muted-foreground font-mono"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            {text}
          </h3>
        </div>

        {/* Right — arrow */}
        <div className="flex items-center gap-2 pt-2 shrink-0 text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:translate-x-1">
          <Diamond
            size={8}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-accent"
          />
          <span
            className="text-xs tracking-widest uppercase"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            Visit
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export function WorkList() {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0, y: 0, visible: false, src: "", title: "",
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursor((c) => ({ ...c, x: e.clientX - rect.left, y: e.clientY - rect.top }));
  };

  const handleEnter = (src: string, title: string) => {
    setCursor((c) => ({ ...c, visible: true, src, title }));
  };

  const handleLeave = () => {
    setCursor((c) => ({ ...c, visible: false }));
  };

  const projects = projectCards.filter((p) => p.id !== "todo-list-app");

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative"
    >
      {/* Floating image cursor — Clay Boan style */}
      <AnimatePresence>
        {cursor.visible && (
          <motion.div
            key={cursor.src}
            className="absolute pointer-events-none z-50 w-64 aspect-video rounded-sm overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25, ease }}
            style={{
              left: cursor.x,
              top: cursor.y,
              transform: "translate(20px, -50%)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cursor.src}
              alt={cursor.title}
              className="w-full h-full object-cover object-top"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project rows */}
      <div>
        {projects.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={i}
            onEnter={handleEnter}
            onLeave={handleLeave}
          />
        ))}

        {/* Last border */}
        <motion.div
          className="border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: projects.length * 0.08 }}
        />
      </div>
    </div>
  );
}
