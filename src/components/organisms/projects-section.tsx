import ExpandableCardDemo from "@/components/(showcase)/expandable-card-demo-grid";
import { TextGenerateEffect, words } from "@/components/ui/text-generate-effect";

export default function ProjectsSection() {
  return (
    <section id="project" className="relative min-h-screen py-40 pb-20 overflow-hidden">
      <div className="mb-12 max-w-6xl px-2">
        <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
          My Projects
        </h2>
        <TextGenerateEffect 
          duration={2} 
          filter={true} 
          words={words} 
        />
      </div>
      <ExpandableCardDemo />
    </section>
  );
}
