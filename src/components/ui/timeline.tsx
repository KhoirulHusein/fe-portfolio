"use client";

import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  id?: string;
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, [ref, data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} className="w-full">
      <div ref={ref} className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pb-24">
        {data.map((item, index) => (
          <motion.div
            key={item.id || `timeline-${index}`}
            className="flex justify-start pt-12 md:pt-32 md:gap-12"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1], delay: index * 0.06 }}
          >
            {/* Sticky date label */}
            <div className="sticky top-40 self-start flex flex-col md:flex-row z-40 items-start max-w-xs lg:max-w-sm md:w-full">
              {/* Dot */}
              <div className="absolute left-[-1px] md:left-3 top-1 h-3 w-3 flex items-center justify-center">
                <div className="h-2 w-2 rotate-45 bg-foreground" />
              </div>

              {/* Period label */}
              <h3
                className="hidden md:block text-sm md:pl-12 font-medium text-muted-foreground leading-snug"
                style={{ fontFamily: "var(--font-instrument-sans)" }}
              >
                {item.title}
              </h3>
            </div>

            {/* Content */}
            <div className="relative pl-8 md:pl-4 w-full">
              <h3
                className="md:hidden block text-sm mb-4 font-medium text-muted-foreground"
                style={{ fontFamily: "var(--font-instrument-sans)" }}
              >
                {item.title}
              </h3>
              {item.content}
            </div>
          </motion.div>
        ))}

        {/* Animated vertical line */}
        <div
          style={{ height: `${height}px` }}
          className="absolute left-[23px] md:left-[39px] top-0 overflow-hidden w-px bg-border [mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-px bg-foreground rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
