"use client";

import Image from "next/image"; // used inside GalleryMedia
import { motion } from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";

export interface GalleryImage {
  src: string;
  alt?: string;
  caption?: string;
  /** "video" renders an autoplay muted loop <video> instead of <Image> */
  type?: "image" | "video";
}

function GalleryMedia({ item, className }: { item: GalleryImage; className?: string }) {
  if (item.type === "video") {
    return (
      <video
        src={item.src}
        autoPlay
        muted
        loop
        playsInline
        className={className}
      />
    );
  }
  return (
    <Image
      src={item.src}
      alt={item.alt ?? ""}
      width={0}
      height={0}
      sizes="(max-width: 1280px) 50vw, 33vw"
      className={className}
    />
  );
}

type BezierCurve = [number, number, number, number];
const ease: BezierCurve = [0.215, 0.61, 0.355, 1];

// Deterministic tilts — small, editorial, not chaotic
const TILTS = [0, -2.1, 1.6, 0, -1.3, 2.0, 0, -0.9, 1.4, -2.4];

interface GridItem {
  col: string;
  row: string;
  aspect: string;
}

interface GridConfig {
  cols: string;
  rows: string;
  items: GridItem[];
}

// Bento patterns per image count — each is intentionally asymmetric
const GRID_CONFIGS: Record<number, GridConfig> = {
  1: {
    cols: "1fr",
    rows: "auto",
    items: [
      { col: "1", row: "1", aspect: "16/9" },
    ],
  },
  2: {
    cols: "3fr 2fr",
    rows: "auto",
    items: [
      { col: "1", row: "1", aspect: "4/3" },
      { col: "2", row: "1", aspect: "3/4" },
    ],
  },
  3: {
    cols: "2fr 1fr",
    rows: "auto auto",
    items: [
      { col: "1", row: "1 / span 2", aspect: "2/3" },
      { col: "2", row: "1", aspect: "4/3" },
      { col: "2", row: "2", aspect: "4/3" },
    ],
  },
  4: {
    cols: "1fr 1fr 1fr",
    rows: "auto auto",
    items: [
      { col: "1",          row: "1",       aspect: "3/4"  },
      { col: "2 / span 2", row: "1",       aspect: "16/9" },
      { col: "1 / span 2", row: "2",       aspect: "16/9" },
      { col: "3",          row: "2",       aspect: "3/4"  },
    ],
  },
  5: {
    cols: "1fr 1fr 1fr",
    rows: "auto auto",
    items: [
      { col: "1",          row: "1", aspect: "1/1"  },
      { col: "2",          row: "1", aspect: "1/1"  },
      { col: "3",          row: "1", aspect: "1/1"  },
      { col: "1 / span 2", row: "2", aspect: "16/9" },
      { col: "3",          row: "2", aspect: "1/1"  },
    ],
  },
  6: {
    cols: "1fr 1fr 1fr",
    rows: "auto auto auto",
    items: [
      { col: "1 / span 2", row: "1", aspect: "16/9" },
      { col: "3",          row: "1", aspect: "4/5"  },
      { col: "1",          row: "2", aspect: "1/1"  },
      { col: "2",          row: "2", aspect: "1/1"  },
      { col: "3",          row: "2", aspect: "1/1"  },
      { col: "1 / span 3", row: "3", aspect: "21/9" },
    ],
  },
};

function getConfig(count: number): GridConfig {
  const clamped = Math.min(Math.max(count, 1), 6) as keyof typeof GRID_CONFIGS;
  return GRID_CONFIGS[clamped];
}

export function ChaosGallery({ images }: { images: GalleryImage[] }) {
  const isMobile = useIsMobile();

  if (!images.length) return null;

  const config = getConfig(images.length);
  const visible = images.slice(0, config.items.length);

  // ── Mobile: single column stacked
  if (isMobile) {
    return (
      <div className="flex flex-col gap-3">
        {visible.map((img, i) => (
          <motion.div
            key={i}
            className="group relative w-full overflow-hidden border border-border bg-muted"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease, delay: i * 0.07 }}
          >
            <GalleryMedia item={img} className="w-full h-auto" />
            {img.caption && (
              <p
                className="absolute bottom-2 left-3 right-3 text-xs text-white/80"
                style={{ fontFamily: "var(--font-instrument-sans)" }}
              >
                {img.caption}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    );
  }

  // ── Desktop: bento chaos grid — images display at natural height, no crop
  return (
    <div
      className="grid gap-3 md:gap-4 items-start"
      style={{
        gridTemplateColumns: config.cols,
        gridTemplateRows: config.rows,
      }}
    >
      {visible.map((img, i) => {
        const placement = config.items[i];
        const tilt = TILTS[i % TILTS.length];

        return (
          <motion.div
            key={i}
            className="group relative"
            style={{ gridColumn: placement.col, gridRow: placement.row }}
            initial={{ opacity: 0, scale: 0.94, rotate: tilt * 0.4 }}
            whileInView={{ opacity: 1, scale: 1, rotate: tilt }}
            whileHover={{ scale: 1.016, rotate: 0, zIndex: 20 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease, delay: i * 0.08 }}
          >
            {/* Image frame — height follows natural image dimensions */}
            <div className="relative w-full overflow-hidden border border-border bg-muted shadow-sm group-hover:shadow-lg transition-shadow duration-300">
              <GalleryMedia
                item={img}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* Caption — fades in on hover */}
              {img.caption && (
                <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p
                    className="absolute bottom-3 left-3 right-3 text-xs text-white/90 leading-relaxed"
                    style={{ fontFamily: "var(--font-instrument-sans)" }}
                  >
                    {img.caption}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
