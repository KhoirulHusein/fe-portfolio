"use client";

import { useState } from "react";
import { Container } from "@/components/atoms/container";
import HeroSection from "@/components/organisms/hero-section";
import AboutSection from "@/components/organisms/about-section";
import ProjectsSection from "@/components/organisms/projects-section";
import ContactSection from "@/components/organisms/contact-section";
import { PageLoader } from "@/components/atoms/page-loader";
import { AudioController } from "@/components/atoms/audio-controller";
import { ScrollIndicator } from "@/components/atoms/scroll-indicator";
import { SmoothScroll } from "@/components/atoms/smooth-scroll";

export default function Home() {
  const [audioEnabled, setAudioEnabled] = useState(false);

  const handleAudioChoice = (withAudio: boolean) => {
    setAudioEnabled(withAudio);
  };

  return (
    <main className="relative min-h-screen! w-full bg-background overflow-hidden">
      <PageLoader onAudioChoice={handleAudioChoice} />
      <AudioController isEnabled={audioEnabled} />
      <ScrollIndicator />
      <SmoothScroll smooth={1.5} effects={true}>
        <HeroSection />
        <Container className="py-20">
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </Container>
      </SmoothScroll>
    </main>
  );
}
