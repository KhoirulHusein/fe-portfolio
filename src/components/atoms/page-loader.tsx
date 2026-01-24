"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRevealing, setIsRevealing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scroll during loading
    document.body.style.overflow = "hidden";
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 120);

    const handleLoad = () => {
      clearInterval(progressInterval);
      setProgress(100);
      
      setTimeout(() => {
        // Reset scroll to top before reveal
        window.scrollTo(0, 0);
        setIsRevealing(true);
        setTimeout(() => {
          setIsLoading(false);
          // Unlock scroll after loading complete
          document.body.style.overflow = "";
        }, 1200);
      }, 400);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearInterval(progressInterval);
        document.body.style.overflow = "";
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Main background curtain - simple slide up */}
          <motion.div
            className="absolute inset-0 bg-background"
            initial={{ y: 0 }}
            animate={isRevealing ? { y: "-100%" } : { y: 0 }}
            transition={{
              duration: 1,
              ease: [0.76, 0, 0.24, 1],
            }}
          />

          {/* Loading content - fades out before reveal */}
          <AnimatePresence>
            {!isRevealing && (
              <motion.div
                className="relative z-10 flex flex-col items-center gap-8"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Main animated logo/icon */}
                <div className="relative w-28 h-28">
                  {/* Outer rotating ring with dashes */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-primary/20"
                        strokeDasharray="6 3"
                      />
                    </svg>
                  </motion.div>

                  {/* Second rotating ring - opposite direction */}
                  <motion.div
                    className="absolute inset-1"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-primary/30"
                        strokeDasharray="15 8"
                        animate={{
                          strokeDashoffset: [0, 70],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </svg>
                  </motion.div>

                  {/* Pulsing circles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`pulse-${i}`}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <motion.div
                        className="rounded-full border border-primary/20"
                        animate={{
                          width: [20, 80, 20],
                          height: [20, 80, 20],
                          opacity: [0.8, 0, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.6,
                          ease: "easeOut",
                        }}
                      />
                    </motion.div>
                  ))}

                  {/* Inner geometric hexagon */}
                  <motion.div
                    className="absolute inset-6"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <motion.polygon
                        points="50,5 93,25 93,75 50,95 7,75 7,25"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-primary/50"
                        animate={{
                          opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </svg>
                  </motion.div>

                  {/* Inner rotating triangle */}
                  <motion.div
                    className="absolute inset-8"
                    animate={{ rotate: -360, scale: [1, 1.15, 1] }}
                    transition={{
                      rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                      scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                    }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <motion.polygon
                        points="50,15 85,75 15,75"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-primary"
                        animate={{
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </svg>
                  </motion.div>

                  {/* Center pulsing dot */}
                  <motion.div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-4 h-4 rounded-full bg-primary"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [1, 0.6, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(var(--primary), 0)",
                          "0 0 20px 5px rgba(var(--primary), 0.3)",
                          "0 0 0 0 rgba(var(--primary), 0)",
                        ],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>

                  {/* Orbiting particles */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={`orbit-${i}`}
                      className="absolute inset-0"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2.5 + i * 0.5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.3,
                      }}
                    >
                      <motion.div
                        className="absolute w-2 h-2 rounded-full bg-primary"
                        style={{
                          top: "50%",
                          left: i % 2 === 0 ? "-2%" : "98%",
                          transform: "translate(-50%, -50%)",
                        }}
                        animate={{
                          scale: [0.6, 1.2, 0.6],
                          opacity: [0.4, 1, 0.4],
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: i * 0.25,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Sound wave / equalizer bars */}
                <div className="flex items-center gap-1 h-8">
                  {[...Array(7)].map((_, i) => (
                    <motion.div
                      key={`bar-${i}`}
                      className="w-1 bg-primary rounded-full"
                      animate={{
                        height: [8, 24 + (i % 3) * 8, 8],
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 0.6 + (i % 2) * 0.2,
                        repeat: Infinity,
                        delay: i * 0.08,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                {/* Progress bar with glow */}
                <div className="relative w-52">
                  <div className="w-full h-1 bg-primary/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-linear-to-r from-primary/50 via-primary to-primary/50 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    />
                  </div>
                  {/* Glow effect on progress */}
                  <motion.div
                    className="absolute top-0 h-1 w-8 rounded-full bg-primary blur-sm"
                    style={{ left: `calc(${Math.min(progress, 100)}% - 16px)` }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </div>

                {/* Percentage text */}
                <motion.div
                  className="text-3xl font-bold text-primary tabular-nums"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
                  {Math.min(Math.round(progress), 100)}%
                </motion.div>

                {/* Loading text with wave */}
                <div className="flex items-center gap-1 text-sm text-muted-foreground font-medium tracking-[0.3em]">
                  {"LOADING".split("").map((letter, i) => (
                    <motion.span
                      key={`letter-${i}`}
                      animate={{
                        y: [0, -6, 0],
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeInOut",
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>

                {/* Floating particles background */}
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 rounded-full bg-primary/30"
                    style={{
                      left: `${5 + (i * 6)}%`,
                      top: `${15 + (i % 4) * 20}%`,
                    }}
                    animate={{
                      y: [0, -40, 0],
                      x: [0, (i % 2 === 0 ? 15 : -15), 0],
                      opacity: [0, 0.6, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 2.5 + (i % 3) * 0.5,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
