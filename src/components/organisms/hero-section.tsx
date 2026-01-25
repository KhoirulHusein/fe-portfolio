"use client";

import { HorizontalText } from "@/components/atoms/horizontal-text";
import GradientBackground from "@/components/organisms/gradient-background";
import HorizontalShapesBackground from "@/components/organisms/horizontal-shapes-background";
import { FlipWords } from "@/components/ui/flip-words";
import { Spotlight } from "../ui/spotlight";

export default function HeroSection() {
  return (
    <section id="hero" className="relative">
      {/* Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="hsl(var(--primary))"
      />
      
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
    </section>
  );
}
