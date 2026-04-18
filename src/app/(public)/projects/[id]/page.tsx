"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { projectCards, type StorySection } from "@/config/projects.config";
import { ChaosGallery } from "@/components/molecules/chaos-gallery";
import { Diamond } from "@/components/atoms/diamond";
import { cn } from "@/lib/utils";

type BezierCurve = [number, number, number, number];
const ease: BezierCurve = [0.215, 0.61, 0.355, 1];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease, delay },
  } as const;
}

// ─── MetaCell ────────────────────────────────────────────────────
function MetaCell({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("py-6", className)}>
      <p
        className="text-xs tracking-widest uppercase text-muted-foreground mb-2"
        style={{ fontFamily: "var(--font-instrument-sans)" }}
      >
        {label}
      </p>
      <div
        className="text-sm font-medium text-foreground"
        style={{ fontFamily: "var(--font-instrument-sans)" }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Story flow ──────────────────────────────────────────────────
function StoryFlow({ sections }: { sections: StorySection[] }) {
  let firstTextRendered = false;

  return (
    <div>
      {sections.map((section, i) => {
        const isFirstText = !firstTextRendered && !!section.text;
        if (isFirstText) firstTextRendered = true;

        return (
          <div key={i}>
            {/* Text beat */}
            {section.text && (
              <motion.div
                className="max-w-2xl mx-auto px-6 py-14 md:py-20"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, ease }}
              >
                {/* Decorative rule on first text section */}
                {isFirstText && (
                  <div className="flex items-center gap-4 mb-12">
                    <Diamond size={7} className="text-muted-foreground shrink-0" />
                    <div className="flex-1 border-t border-border" />
                  </div>
                )}

                <div
                  className={cn(
                    "text-base md:text-[1.0625rem] leading-[1.85] text-foreground/80 space-y-6",
                    // Drop cap on first paragraph of first text section
                    isFirstText && [
                      "[&>p:first-child::first-letter]:text-[3.5rem]",
                      "[&>p:first-child::first-letter]:font-black",
                      "[&>p:first-child::first-letter]:leading-[0.85]",
                      "[&>p:first-child::first-letter]:float-left",
                      "[&>p:first-child::first-letter]:mr-2",
                      "[&>p:first-child::first-letter]:mt-1",
                      "[&>p:first-child::first-letter]:[font-family:var(--font-fraunces)]",
                      "[&>p:first-child::first-letter]:text-foreground",
                    ]
                  )}
                  style={{ fontFamily: "var(--font-instrument-sans)" }}
                >
                  {section.text()}
                </div>
              </motion.div>
            )}

            {/* Image beat */}
            {section.images && section.images.length > 0 && (
              <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-6 md:py-10">
                <ChaosGallery images={section.images} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Fallback prose (for projects without story) ──────────────────
function ProseContent({ content }: { content: () => React.ReactElement }) {
  return (
    <motion.section
      className="max-w-2xl mx-auto px-6 py-20 md:py-28"
      {...fadeUp(0)}
    >
      <div className="flex items-center gap-4 mb-12">
        <Diamond size={7} className="text-muted-foreground shrink-0" />
        <div className="flex-1 border-t border-border" />
      </div>
      <div
        className={cn(
          "text-base md:text-[1.0625rem] leading-[1.85] text-foreground/80 space-y-6",
          "[&>p:first-child::first-letter]:text-[3.5rem]",
          "[&>p:first-child::first-letter]:font-black",
          "[&>p:first-child::first-letter]:leading-[0.85]",
          "[&>p:first-child::first-letter]:float-left",
          "[&>p:first-child::first-letter]:mr-2",
          "[&>p:first-child::first-letter]:mt-1",
          "[&>p:first-child::first-letter]:[font-family:var(--font-fraunces)]",
          "[&>p:first-child::first-letter]:text-foreground",
        )}
        style={{ fontFamily: "var(--font-instrument-sans)" }}
      >
        {content()}
      </div>
    </motion.section>
  );
}

// ─── Page ────────────────────────────────────────────────────────
export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();

  const projects = projectCards.filter((p) => p.id !== "todo-list-app");
  const index = projects.findIndex((p) => p.id === id);

  if (index === -1) notFound();

  const project = projects[index];
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  // Word-by-word reveal timing
  const words = project.title.split(" ");
  const postTitleDelay = 0.22 + words.length * 0.072 + 0.12;

  return (
    <div className="min-h-screen bg-background text-foreground mt-20">

      {/* ── Breadcrumb bar ────────────────────────── */}
      <motion.div
        className="border-b border-border"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease, delay: 0 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 h-12 flex items-center justify-between">
          <Link
            href="/#project"
            className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            <span className="text-sm leading-none">←</span>
            <span>Selected Work</span>
          </Link>
          <span
            className="text-xs text-muted-foreground tabular-nums"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </motion.div>

      {/* ── Hero ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-12 md:pt-24 md:pb-16">

        {/* Category label */}
        <motion.div
          className="flex items-center gap-2 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.08 }}
        >
          <Diamond size={7} className="text-accent" />
          <span
            className="text-xs tracking-widest uppercase text-muted-foreground"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            {project.description}
          </span>
        </motion.div>

        {/* Title — word-by-word mask reveal */}
        <h1
          className="text-5xl sm:text-7xl md:text-[6.5rem] lg:text-[8.5rem] xl:text-[10rem] font-black leading-[0.9] tracking-[-0.04em] text-foreground mb-12"
          style={{ fontFamily: "var(--font-fraunces)" }}
          aria-label={project.title}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden"
              style={{ marginRight: "0.22em" }}
            >
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.78, ease, delay: 0.22 + i * 0.072 }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* CTA */}
        <motion.div {...fadeUp(postTitleDelay)}>
          <a
            href={project.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 border border-foreground px-6 py-3.5 text-xs tracking-widest uppercase font-medium text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            <span>{project.ctaText} Project</span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </motion.div>
      </section>

      {/* ── Hero Image ────────────────────────────── */}
      {project.src && (
        <motion.div
          className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16"
          initial={{ opacity: 0, y: 36, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, ease, delay: postTitleDelay + 0.05 }}
        >
          <div className="relative w-full aspect-video overflow-hidden border border-border bg-muted">
            <Image
              src={project.src}
              alt={project.title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
          </div>
        </motion.div>
      )}

      {/* ── Metadata strip ────────────────────────── */}
      <motion.div
        className="border-y border-border mt-16"
        {...fadeUp(postTitleDelay + 0.15)}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            <MetaCell label="Category" className="pr-8">
              {project.description}
            </MetaCell>

            <MetaCell label="Year" className="px-8">
              {project.year ?? "—"}
            </MetaCell>

            <MetaCell label="Stack" className="px-8">
              {project.tech ? (
                <div className="flex flex-wrap gap-1.5 mt-0.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[0.65rem] tracking-wider uppercase border border-border px-2 py-0.5 text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : (
                <span>—</span>
              )}
            </MetaCell>

            <MetaCell label="Live" className="pl-8 col-span-2 md:col-span-1">
              <a
                href={project.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline underline-offset-4 break-all"
                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.7rem" }}
              >
                {project.ctaLink.replace(/^https?:\/\//, "")}
              </a>
            </MetaCell>
          </div>
        </div>
      </motion.div>

      {/* ── Story / Content ───────────────────────── */}
      {project.story ? (
        <StoryFlow sections={project.story} />
      ) : project.content ? (
        <ProseContent content={project.content} />
      ) : null}

      {/* ── Prev / Next navigation ────────────────── */}
      <div className="border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-2 divide-x divide-border">

            {prev ? (
              <Link
                href={`/projects/${prev.id}`}
                className="group py-10 pr-8 flex flex-col gap-2"
              >
                <span
                  className="text-xs tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-2"
                  style={{ fontFamily: "var(--font-instrument-sans)" }}
                >
                  <span>←</span>
                  <span>Previous</span>
                </span>
                <span
                  className="text-lg md:text-2xl font-black tracking-[-0.03em] text-foreground group-hover:text-accent transition-colors duration-200 leading-tight"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {prev.title}
                </span>
                <span
                  className="text-xs text-muted-foreground"
                  style={{ fontFamily: "var(--font-instrument-sans)" }}
                >
                  {prev.description}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/projects/${next.id}`}
                className="group py-10 pl-8 flex flex-col gap-2 items-end text-right"
              >
                <span
                  className="text-xs tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-2"
                  style={{ fontFamily: "var(--font-instrument-sans)" }}
                >
                  <span>Next</span>
                  <span>→</span>
                </span>
                <span
                  className="text-lg md:text-2xl font-black tracking-[-0.03em] text-foreground group-hover:text-accent transition-colors duration-200 leading-tight"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {next.title}
                </span>
                <span
                  className="text-xs text-muted-foreground"
                  style={{ fontFamily: "var(--font-instrument-sans)" }}
                >
                  {next.description}
                </span>
              </Link>
            ) : (
              <div />
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
