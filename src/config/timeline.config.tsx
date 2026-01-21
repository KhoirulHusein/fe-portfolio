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
    title: "February 2025 – March 2026",
    content: (
      <div>
        <h3 className="text-2xl font-bold mb-2 text-neutral-800 dark:text-neutral-200">
          Full-Stack Developer Contract
        </h3>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 font-semibold mb-4">
          Universitas Pancasila
        </p>
        <div className="mb-8 h-125">
          <LayoutGrid cards={universityCards} />
        </div>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300">
          <li>
            Architected an Internal Quality Audit Dashboard handling complex audit workflows and automated reporting, reducing manual workload by 40%+.
          </li>
          <li>
            Worked closely with 15+ academic stakeholders to translate audit and academic requirements into iterative feature releases, driving a 30% increase in system adoption.
          </li>
          <li>
            Integrated multiple academic and research data sources to ensure consistent, synchronized audit and reporting workflows.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "telkom-2024",
    title: "September 2024 - December 2024",
    content: (
      <div>
        <h3 className="text-2xl font-bold mb-2 text-neutral-800 dark:text-neutral-200">
          Developer Internship
        </h3>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 font-semibold mb-4">
          PT. Telkom Indonesia
        </p>
        <div className="mb-8 h-125">
          <LayoutGrid cards={telkomCards} />
        </div>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300">
          <li>
            Built 3 reusable frontend components adopted across multiple projects, reducing development time by up to 20%.
          </li>
          <li>
            Implemented UI slicing for 5+ application pages using Vite.js and Material UI, ensuring consistency with internal UI/UX standards.
          </li>
          <li>
            Worked with cross-functional teams (UI/UX, backend, QA) to deliver 5+ new features, contributing to improved internal user satisfaction.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "hr-academy-2024",
    title: "March 2024 - June 2024",
    content: (
      <div>
        <h3 className="text-2xl font-bold mb-2 text-neutral-800 dark:text-neutral-200">
          Web Developer Internship
        </h3>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 font-semibold mb-4">
          HR Academy
        </p>
        <div className="mb-8 h-125">
          <LayoutGrid cards={hrAcademyCards} />
        </div>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300">
          <li>
            Developed and maintained web applications using Next.js, delivering 10+ features and resolving 5+ bugs.
          </li>
          <li>
            Implemented responsive layouts and cross-browser compatibility across 5+ screen sizes.
          </li>
          <li>
            Contributed to 2 successfully delivered projects through close collaboration with design and development teams.
          </li>
        </ul>
      </div>
    ),
  },
];
