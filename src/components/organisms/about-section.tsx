import { Timeline } from "@/components/ui/timeline";
import { timelineData } from "@/config/timeline.config";

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen pb-20">
      <Timeline data={timelineData} />
    </section>
  );
}
