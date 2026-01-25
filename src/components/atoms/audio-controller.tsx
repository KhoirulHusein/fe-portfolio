"use client";

import { motion } from "motion/react";
import { useEffect, useCallback, useState } from "react";
import { AudioManager } from "@/lib/audio-manager";

interface AudioControllerProps {
  isEnabled: boolean;
}

export function AudioController({ isEnabled }: AudioControllerProps) {
  const [isPlaying, setIsPlaying] = useState(() => 
    isEnabled ? AudioManager.isPlaying() : false
  );

  // Sync with actual audio state
  useEffect(() => {
    if (!isEnabled) return;

    // Poll for state changes (since we can't easily add event listeners to the shared instance)
    const interval = setInterval(() => {
      setIsPlaying(AudioManager.isPlaying());
    }, 200);

    return () => clearInterval(interval);
  }, [isEnabled]);

  const toggleAudio = useCallback(() => {
    if (AudioManager.isPlaying()) {
      AudioManager.pause();
      setIsPlaying(false);
    } else {
      AudioManager.play();
      setIsPlaying(true);
    }
  }, []);

  // Don't render if audio was not enabled
  if (!isEnabled) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.3 }}
      onClick={toggleAudio}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg hover:bg-background transition-colors group"
      aria-label={isPlaying ? "Pause audio" : "Play audio"}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {/* Sound wave bars */}
        <div className="flex items-center gap-0.5 h-full">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`wave-${i}`}
              className="w-1 bg-primary rounded-full"
              animate={
                isPlaying
                  ? {
                      height: [4, 12 + (i % 2) * 8, 4],
                    }
                  : {
                      height: 4,
                    }
              }
              transition={
                isPlaying
                  ? {
                      duration: 0.5 + i * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1,
                    }
                  : {
                      duration: 0.3,
                    }
              }
            />
          ))}
        </div>

        {/* Paused overlay */}
        {!isPlaying && (
          <motion.div
            key="paused-overlay"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-5 h-0.5 bg-primary rotate-45 absolute" />
          </motion.div>
        )}
      </div>

      {/* Tooltip */}
      <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded text-xs bg-foreground text-background opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {isPlaying ? "Pause" : "Play"}
      </span>
    </motion.button>
  );
}
