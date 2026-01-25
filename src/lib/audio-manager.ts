"use client";

// Global audio instance manager
let audioInstance: HTMLAudioElement | null = null;

export const AudioManager = {
  getInstance: () => {
    if (!audioInstance && typeof window !== "undefined") {
      audioInstance = new Audio("/dancing-queen.mp3");
      audioInstance.loop = true;
      audioInstance.volume = 0;
    }
    return audioInstance;
  },

  fadeIn: (targetVolume = 0.3, duration = 4000) => {
    const audio = AudioManager.getInstance();
    if (!audio) return;

    audio.volume = 0;
    audio.play().catch(console.error);

    const steps = 40;
    const volumeStep = targetVolume / steps;
    const intervalTime = duration / steps;

    let currentStep = 0;
    const fadeInterval = setInterval(() => {
      currentStep++;
      if (audio) {
        audio.volume = Math.min(volumeStep * currentStep, targetVolume);
      }
      if (currentStep >= steps) {
        clearInterval(fadeInterval);
      }
    }, intervalTime);
  },

  play: () => {
    const audio = AudioManager.getInstance();
    return audio?.play().catch(console.error);
  },

  pause: () => {
    const audio = AudioManager.getInstance();
    audio?.pause();
  },

  isPlaying: () => {
    const audio = AudioManager.getInstance();
    return audio ? !audio.paused : false;
  },
};
