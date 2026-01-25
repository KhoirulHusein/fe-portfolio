export interface ProjectCard {
  id: string;
  description: string;
  title: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: () => React.ReactElement;
}

export const projectCards: ProjectCard[] = [
  {
    id: "siami-project",
    description: "Universitas Pancasila",
    title: "SIAMI (Audit Management System)",
    src: "https://www.geaves.com/media/catalog/product/cache/43ceea50484a8b0adcb18d996a748113/3/1/31552_5.webp",
    ctaText: "Visit",
    ctaLink: "https://siami.univpancasila.ac.id/dashboard/login",
    content: () => {
      return (
        <>
          <p>
            This project solved inefficiencies in Universitas Pancasila&apos;s internal audit process, which previously depended on fragmented
            and manual documentation. I designed and built a centralized audit management system using Laravel and Filament,
            integrating multiple academic data sources and implementing role-based workflows for auditors, leadership, and administrators.
          </p>
          <p>
            Through close collaboration with stakeholders across 10+ coordination sessions, I translated institutional requirements into
            structured system flows and validated key user journeys. The result was a scalable, logic-driven platform that improved audit
            traceability, reduced manual workload, and strengthened my ability to frame complex problems into maintainable system
            architecture.
          </p>
        </>
      );
    },
  },
  {
    id: "save-our-species",
    description: "Dicoding Capstone Project",
    title: "Save Our Species",
    src: "https://www.geaves.com/media/catalog/product/cache/43ceea50484a8b0adcb18d996a748113/3/1/31552_5.webp",
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <>
          <p>
            Save Our Species was developed as a capstone project for Dicoding, aimed at delivering an educational web platform about
            endangered animals under real-world project constraints. I led a team of five developers to design and build a responsive
            application using React and Tailwind, integrating API-driven content to support dynamic and scalable data presentation.
          </p>
          <p>
            As part of the capstone process, the project involved structured planning, task coordination, and iterative evaluation.
            Feedback from early testing highlighted accessibility and content hierarchy issues, which were addressed through layout
            restructuring and contrast optimization. The project was successfully completed within scope, demonstrating effective team
            coordination, frontend architecture planning, and delivery under defined academic and technical requirements.
          </p>
        </>
      );
    },
  },
  {
    id: "restaurant-catalog",
    description: "Dicoding Frontend Expert",
    title: "Restaurant Catalog Website",
    src: "https://www.geaves.com/media/catalog/product/cache/43ceea50484a8b0adcb18d996a748113/3/1/31552_5.webp",
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <>
          <p>
            This project was built to address the limitation of traditional web apps that break under unstable network conditions. The
            goal was to ensure users could still browse, search, and save restaurant data even when offline. I designed the application as
            an offline-first Progressive Web App, implementing service workers and IndexedDB to cache assets and persist data locally.
          </p>
          <p>
            Throughout development, I tested multiple network failure scenarios to identify inconsistencies between UI state and stored
            data, then introduced fallback UI states to preserve a reliable user experience. The result was a resilient client-side
            application that maintained functionality across network conditions and demonstrated practical offline-first architecture in a
            real-world use case.
          </p>
        </>
      );
    },
  },
  {
    id: "hostle-website",
    description: "Dicoding Frontend Developer",
    title: "Hostle Website",
    src: "https://www.geaves.com/media/catalog/product/cache/43ceea50484a8b0adcb18d996a748113/3/1/31552_5.webp",
    ctaText: "Visit",
    ctaLink: "https://hostle.vercel.app/",
    content: () => {
      return (
        <>
          <p>
            Hostle was built to improve the responsiveness of movie search and listing interfaces that often suffer from slow rendering
            and delayed feedback. The application was developed using AJAX, Webpack, and ES6 modules, with a focus on
            asynchronous data fetching and efficient client-side rendering to ensure smooth interactions across devices.
          </p>
          <p>
            During implementation, I optimized rendering performance through lazy loading and modularized the codebase to improve
            maintainability and scalability. The result was a fast, responsive interface that reduced perceived loading time and delivered
            a more fluid browsing experience.
          </p>
        </>
      );
    },
  },
  {
    id: "bookshelf-apps",
    description: "Dicoding Intermediate Frontend",
    title: "Book Tracking Platform",
    src: "https://www.geaves.com/media/catalog/product/cache/43ceea50484a8b0adcb18d996a748113/3/1/31552_5.webp",
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          BookshelfApps is a personal project designed to help you track your reading journey. Built with Web Storage technology by utilizing localStorage, it offers usage where you don&apos;t have to worry that when you refresh your notes will disappear. Visit BookshelfApps at BookshelfApps.

        </p>
      );
    },
  },
  {
    id: "todo-list-app",
    description: "Coming Soon...",
    title: "Coming Soon...",
    src: "https://www.geaves.com/media/catalog/product/cache/43ceea50484a8b0adcb18d996a748113/3/1/31552_5.webp",
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Coming Soon...
        </p>
      );
    },
  },
];
