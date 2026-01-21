import { Container } from "@/components/atoms/container";
import { Spotlight } from "@/components/ui/spotlight";
import { HorizontalText } from "@/components/atoms/horizontal-text";
import GradientBackground from "@/components/organisms/gradient-background";
import HorizontalShapesBackground from "@/components/organisms/horizontal-shapes-background";
import { Timeline } from "@/components/ui/timeline";
import { timelineData } from "@/config/timeline.config";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-background overflow-hidden">

      {/* Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="hsl(var(--primary))"
      />

      {/* Hero Section with Horizontal Text Animation */}
      <section id="hero" className="relative">
        {/* Abstract Gradient Background */}
        <GradientBackground />
        {/* Animated Shapes Following Wavy Paths */}
        <HorizontalShapesBackground />
        {/* Parallax */}
        <HorizontalText
          text="HELLO  I'M IRUL • FRONTEND DEVELOPER • OPEN TO WORK"
          speed={0.8}
          visibleLetters={7}
          className="bg-background"
        />
      </section>

      <Container className="py-20">

        <section id="about" className="min-h-screen py-20">
          <Timeline data={timelineData} />
        </section>

        <section id="project" className="relative min-h-screen py-20 overflow-hidden">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-foreground relative z-10">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {/* Add your project cards here */}
            <div className="p-6 rounded-lg border border-border bg-card/80 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">Project 1</h3>
              <p className="text-muted-foreground">
                Project description goes here
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card/80 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">Project 2</h3>
              <p className="text-muted-foreground">
                Project description goes here
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card/80 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">Project 3</h3>
              <p className="text-muted-foreground">
                Project description goes here
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="min-h-screen py-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-foreground">
            Contact
          </h2>
          <div className="max-w-xl mx-auto">
            <p className="text-lg text-muted-foreground text-center">
              Add your contact form or information here.
            </p>
          </div>
        </section>
      </Container>
    </main>
  );
}
