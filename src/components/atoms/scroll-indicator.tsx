"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDownIcon } from "@/components/ui/chevron-down";

export function ScrollIndicator() {
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Only show when at the very top (within 50px)
      setShowScrollHint(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const handleScrollClick = () => {
  //   const aboutSection = document.querySelector("#about");
  //   if (aboutSection) {
  //     aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  // };

  return (
    <AnimatePresence>
      {showScrollHint && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 left-1/2 z-60 -translate-x-1/2 cursor-default"
          // onClick={handleScrollClick}
          style={{ position: "fixed" }} // Force fixed positioning
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-xs font-medium text-muted-foreground tracking-widest uppercase cursor-default">
              Scroll
            </span>
            <ChevronDownIcon 
              size={32} 
              className="text-primary"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
