import { Container } from "@/components/atoms/container";
import HeroSection from "@/components/organisms/hero-section";
import AboutSection from "@/components/organisms/about-section";
import ProjectsSection from "@/components/organisms/projects-section";
import ContactSection from "@/components/organisms/contact-section";
import { PageLoader } from "@/components/atoms/page-loader";

export default function Home() {
  return (
    <main className="relative min-h-screen! w-full bg-background overflow-hidden">
      <PageLoader />
      <HeroSection />
      <Container className="py-20">
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </Container>
    </main>
  );
}
