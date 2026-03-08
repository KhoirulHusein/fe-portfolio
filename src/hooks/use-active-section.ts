import { useState, useEffect } from "react";

const SECTION_IDS = ["hero", "about", "project", "contact"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        // Trigger when section occupies >30% of viewport, offset from bottom
        { threshold: 0.15, rootMargin: "0px 0px -35% 0px" }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}
