"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HorizontalText } from "@/components/atoms/horizontal-text";
import GradientBackground from "@/components/organisms/gradient-background";
import HorizontalShapesBackground from "@/components/organisms/horizontal-shapes-background";
import { FlipWords } from "@/components/ui/flip-words";
import { ChevronDownIcon } from "@/components/ui/chevron-down";

export default function HeroSection() {
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Only show when at the very top (within 50px)
      setShowScrollHint(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollClick = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="hero" className="relative">
      {/* Spotlight Effect */}
      {/* <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="hsl(var(--primary))"
      /> */}
      
      {/* Abstract Gradient Background */}
      <GradientBackground />
      
      {/* Animated Shapes Following Wavy Paths */}
      <HorizontalShapesBackground />
      
      {/* Parallax */}
      <HorizontalText
        segments={[
          { 
            type: 'component', 
            content: (
              <FlipWords 
                words={['HELLO!', 'HOLA!', 'CIAO!', 'HALLO!', 'OLÁ!', 'ALOHA!', 'HOWDY!']} 
                duration={2500} 
              />
            ) 
          },
          { type: 'text', content: "       I'M IRUL • FRONTEND DEVELOPER • OPEN TO WORK" }
        ]}
        speed={0.8}
        visibleLetters={7}
        className="bg-background"
      />

      {/* Scroll Down Indicator */}
      <AnimatePresence>
        {showScrollHint && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 cursor-pointer"
            onClick={handleScrollClick}
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
              <span className="text-xs font-medium text-muted-foreground tracking-widest uppercase">
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
    </section>
  );
}
