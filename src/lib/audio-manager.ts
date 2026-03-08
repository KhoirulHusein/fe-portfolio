"use client";

// Global audio instance manager
let audioInstance: HTMLAudioElement | null = null;
let wasPlayingBeforeHide = false;

const TARGET_VOLUME = 0.3;
let fadeTimer: ReturnType<typeof setInterval> | null = null;

function clearFade() {
  if (fadeTimer) {
    clearInterval(fadeTimer);
    fadeTimer = null;
  }
}

function fadeTo(targetVol: number, duration: number, onComplete?: () => void) {
  const audio = audioInstance;
  if (!audio) return;

  clearFade();
  const steps = 30;
  const intervalTime = duration / steps;
  const startVol = audio.volume;
  const diff = targetVol - startVol;
  let step = 0;

  fadeTimer = setInterval(() => {
    step++;
    if (!audioInstance) { clearFade(); return; }
    audioInstance.volume = Math.min(1, Math.max(0, startVol + (diff * step) / steps));
    if (step >= steps) {
      clearFade();
      onComplete?.();
    }
  }, intervalTime);
}

if (typeof window !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    const audio = audioInstance;
    if (!audio) return;
    if (document.hidden) {
      wasPlayingBeforeHide = !audio.paused;
      fadeTo(0, 600, () => audio.pause());
    } else if (wasPlayingBeforeHide) {
      audio.play().catch(console.error);
      fadeTo(TARGET_VOLUME, 800);
    }
  });
}

export const AudioManager = {
  getInstance: () => {
    if (!audioInstance && typeof window !== "undefined") {
      audioInstance = new Audio("/dancing-queen.mp3");
      audioInstance.loop = true;
      audioInstance.volume = 0;
    }
    return audioInstance;
  },

  fadeIn: (duration = 4000) => {
    const audio = AudioManager.getInstance();
    if (!audio) return;
    audio.volume = 0;
    audio.play().catch(console.error);
    fadeTo(TARGET_VOLUME, duration);
  },

  play: () => {
    const audio = AudioManager.getInstance();
    if (!audio) return;
    audio.play().catch(console.error);
    fadeTo(TARGET_VOLUME, 800);
  },

  pause: () => {
    fadeTo(0, 600, () => audioInstance?.pause());
  },

  isPlaying: () => {
    const audio = audioInstance;
    return audio ? !audio.paused : false;
  },
};
