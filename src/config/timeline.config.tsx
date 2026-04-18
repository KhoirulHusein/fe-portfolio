import { LayoutGrid } from "@/components/ui/layout-grid";
import { universityCards, telkomCards, hrAcademyCards } from "./gallery.config";

export interface TimelineEntry {
  id: string;
  title: string;
  content: React.ReactNode;
}

export const timelineData: TimelineEntry[] = [
  {
    id: "up-2025",
    title: "Feb 2025 – Now",
    content: (
      <div>
        <h3
          className="text-2xl md:text-3xl font-black leading-tight tracking-[-0.04em] text-foreground mb-1"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Full-Stack Developer Contract
        </h3>
        <p
          className="text-sm font-medium text-muted-foreground mb-6 tracking-wide"
          style={{ fontFamily: "var(--font-instrument-sans)" }}
        >
          Universitas Pancasila
        </p>
        <div className="mb-8 h-96 rounded-sm overflow-hidden">
          <LayoutGrid cards={universityCards} />
        </div>
        <ul className="space-y-3" style={{ fontFamily: "var(--font-instrument-sans)" }}>
          <li className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground mt-0.5 shrink-0 font-mono text-xs">—</span>
            <span>Architected Internal Quality Audit Dashboard handling complex workflows and automated reporting, <span className="text-foreground font-medium">reducing manual workload by 40%+.</span></span>
          </li>
          <li className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground mt-0.5 shrink-0 font-mono text-xs">—</span>
            <span>Worked closely with <span className="text-foreground font-medium">15+ academic stakeholders</span> to translate requirements into iterative releases, driving a <span className="text-foreground font-medium">30% increase in system adoption.</span></span>
          </li>
          <li className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground mt-0.5 shrink-0 font-mono text-xs">—</span>
            <span>Integrated multiple academic data sources to ensure consistent, synchronized audit and reporting workflows.</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "telkom-2024",
    title: "Sep 2024 – Dec 2024",
    content: (
      <div>
        <h3
          className="text-2xl md:text-3xl font-black leading-tight tracking-[-0.04em] text-foreground mb-1"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Developer Internship
        </h3>
        <p
          className="text-sm font-medium text-muted-foreground mb-6 tracking-wide"
          style={{ fontFamily: "var(--font-instrument-sans)" }}
        >
          PT. Telkom Indonesia
        </p>
        <div className="mb-8 h-96 rounded-sm overflow-hidden">
          <LayoutGrid cards={telkomCards} />
        </div>
        <ul className="space-y-3" style={{ fontFamily: "var(--font-instrument-sans)" }}>
          <li className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground mt-0.5 shrink-0 font-mono text-xs">—</span>
            <span>Built <span className="text-foreground font-medium">3 reusable frontend components</span> adopted across multiple projects, reducing development time by up to 20%.</span>
          </li>
          <li className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground mt-0.5 shrink-0 font-mono text-xs">—</span>
            <span>Implemented UI slicing for <span className="text-foreground font-medium">5+ application pages</span> using Vite.js and Material UI.</span>
          </li>
          <li className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground mt-0.5 shrink-0 font-mono text-xs">—</span>
            <span>Delivered <span className="text-foreground font-medium">5+ new features</span> with cross-functional teams (UI/UX, backend, QA).</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "hr-academy-2024",
    title: "Mar 2024 – Jun 2024",
    content: (
      <div>
        <h3
          className="text-2xl md:text-3xl font-black leading-tight tracking-[-0.04em] text-foreground mb-1"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Web Developer Internship
        </h3>
        <p
          className="text-sm font-medium text-muted-foreground mb-6 tracking-wide"
          style={{ fontFamily: "var(--font-instrument-sans)" }}
        >
          HR Academy
        </p>
        <div className="mb-8 h-96 rounded-sm overflow-hidden">
          <LayoutGrid cards={hrAcademyCards} />
        </div>
        <ul className="space-y-3" style={{ fontFamily: "var(--font-instrument-sans)" }}>
          <li className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground mt-0.5 shrink-0 font-mono text-xs">—</span>
            <span>Developed and maintained web applications using Next.js, delivering <span className="text-foreground font-medium">10+ features</span> and resolving 5+ bugs.</span>
          </li>
          <li className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground mt-0.5 shrink-0 font-mono text-xs">—</span>
            <span>Implemented responsive layouts and cross-browser compatibility across 5+ screen sizes.</span>
          </li>
          <li className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground mt-0.5 shrink-0 font-mono text-xs">—</span>
            <span>Contributed to <span className="text-foreground font-medium">2 successfully delivered projects</span> through close team collaboration.</span>
          </li>
        </ul>
      </div>
    ),
  },
];
