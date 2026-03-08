"use client";

import { useState } from "react";
import HeroSection from "@/components/organisms/hero-section";
import AboutSection from "@/components/organisms/about-section";
import ProjectsSection from "@/components/organisms/projects-section";
import ContactSection from "@/components/organisms/contact-section";
import { PageLoader } from "@/components/atoms/page-loader";
import { AudioController } from "@/components/atoms/audio-controller";
import { CustomCursor } from "@/components/atoms/cursor";
import { SkillsMarquee } from "@/components/atoms/skills-marquee";
import { StatsStrip } from "@/components/atoms/stats-strip";
import { SectionCounter } from "@/components/atoms/section-counter";
import { LenisProvider } from "@/lib/lenis";
import { useActiveSection } from "@/hooks/use-active-section";
import { useTheme } from "next-themes";

const SECTION_BG_DARK: Record<string, string> = {
  hero:    "hsl(40, 10%,  5%)",
  about:   "hsl(40,  8%,  7%)",
  project: "hsl(40, 10%,  5%)",
  contact: "hsl(40,  8%,  7%)",
};

const SECTION_BG_LIGHT: Record<string, string> = {
  hero:    "hsl(45, 15%, 95%)",
  about:   "hsl(45, 12%, 92%)",
  project: "hsl(45, 15%, 95%)",
  contact: "hsl(45, 12%, 92%)",
};

function PageContent({ audioEnabled }: { audioEnabled: boolean }) {
  const activeSection  = useActiveSection();
  const { resolvedTheme } = useTheme();

  // resolvedTheme is undefined before hydration — treat as dark to prevent white flash
  const bgMap = resolvedTheme === "light" ? SECTION_BG_LIGHT : SECTION_BG_DARK;

  return (
    <>
      {/* Smooth background crossfade — fixed behind everything, theme-aware */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundColor: bgMap[activeSection] ?? bgMap.hero,
          transition: "background-color 0.9s cubic-bezier(0.215, 0.61, 0.355, 1)",
        }}
      />

      <AudioController isEnabled={audioEnabled} />

      {/* Counter on LEFT — audio button stays on right, no overlap */}
      <SectionCounter />

      <main className="relative w-full">
        <HeroSection />
        <StatsStrip />
        <AboutSection />
        <SkillsMarquee />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}

export default function Home() {
  const [audioEnabled, setAudioEnabled] = useState(false);

  return (
    <LenisProvider>
      <CustomCursor />
      <PageLoader onAudioChoice={(withAudio) => setAudioEnabled(withAudio)} />
      <PageContent audioEnabled={audioEnabled} />
    </LenisProvider>
  );
}
