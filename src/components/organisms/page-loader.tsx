"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef, useCallback } from "react";
import { AudioManager } from "@/lib/audio-manager";

interface PageLoaderProps {
  onAudioChoice?: (withAudio: boolean) => void;
}

export function PageLoader({ onAudioChoice }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRevealing, setIsRevealing] = useState(false);
  const [showEntryGate, setShowEntryGate] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleEnterWithAudio = () => {
    AudioManager.fadeIn();
    onAudioChoice?.(true);
    triggerReveal();
  };

  const handleEnterSilently = () => {
    onAudioChoice?.(false);
    triggerReveal();
  };

  const triggerReveal = () => {
    window.scrollTo(0, 0);
    setIsRevealing(true);
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, 1200);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    
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
      
      // Show entry gate after loading complete
      setTimeout(() => {
        setShowEntryGate(true);
      }, 500);
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
          {/* Main background curtain */}
          <motion.div
            className="absolute inset-0 bg-background"
            initial={{ y: 0 }}
            animate={isRevealing ? { y: "-100%" } : { y: 0 }}
            transition={{
              duration: 1,
              ease: [0.76, 0, 0.24, 1],
            }}
          />

          {/* Loading content */}
          <AnimatePresence mode="wait">
            {!isRevealing && !showEntryGate && (
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

            {/* Entry Gate - Audio Choice */}
            {!isRevealing && showEntryGate && (
              <motion.div
                key="entry-gate"
                className="relative z-10 flex flex-col items-center gap-8"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Animated sound waves decoration */}
                <div className="relative w-20 h-20">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`wave-${i}`}
                      className="absolute inset-0 rounded-full border-2 border-primary/30"
                      animate={{
                        scale: [1, 1.5 + i * 0.3, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <svg viewBox="0 0 24 24" className="w-10 h-10 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18V5l12-2v13" />
                      <circle cx="6" cy="18" r="3" />
                      <circle cx="18" cy="16" r="3" />
                    </svg>
                  </motion.div>
                </div>

                {/* Title */}
                <div className="text-center space-y-2">
                  <motion.h2 
                    className="text-2xl font-bold text-foreground"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Experience with Sound?
                  </motion.h2>
                  <motion.p 
                    className="text-sm text-muted-foreground max-w-xs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    This portfolio has ambient music for a better experience
                  </motion.p>
                </div>

                {/* Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.button
                    onClick={handleEnterWithAudio}
                    className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                    Enter with Audio
                  </motion.button>
                  <motion.button
                    onClick={handleEnterSilently}
                    className="px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm flex items-center gap-2 hover:bg-muted transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="22" y1="9" x2="16" y2="15" />
                      <line x1="16" y1="9" x2="22" y2="15" />
                    </svg>
                    Enter Silently
                  </motion.button>
                </motion.div>

                {/* Floating particles */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={`particle-gate-${i}`}
                    className="absolute w-1 h-1 rounded-full bg-primary/30"
                    style={{
                      left: `${10 + (i * 7)}%`,
                      top: `${20 + (i % 3) * 25}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0, 0.5, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2 + (i % 3),
                      repeat: Infinity,
                      delay: i * 0.2,
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

// Export audio controller hook for use in other components
export function useAudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const initAudio = useCallback((startPlaying: boolean) => {
    if (typeof window === "undefined") return;
    
    if (!audioRef.current) {
      audioRef.current = new Audio("/dancing-queen.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
    
    if (startPlaying) {
      setIsPlaying(true);
    }
  }, []);

  const toggle = useCallback(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  return { isPlaying, isMuted, toggle, toggleMute, initAudio };
}
