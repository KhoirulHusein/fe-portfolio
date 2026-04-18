export interface GalleryImage {
  src: string;
  alt?: string;
  caption?: string;
  /** "video" renders an autoplay muted loop <video> — use .mp4 */
  type?: "image" | "video";
}

export interface StorySection {
  /** Prose content for this beat of the story */
  text?: () => React.ReactElement;
  /** Gallery images for this beat — rendered as ChaosGallery */
  images?: GalleryImage[];
}

export interface ProjectCard {
  id: string;
  description: string;
  title: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  tech?: string[];
  year?: string;
  /** Rich storytelling: alternating text + chaos image grids */
  story?: StorySection[];
  /** Simple prose fallback — used when story is not defined */
  content?: () => React.ReactElement;
}

export const projectCards: ProjectCard[] = [
  // ── Wealio ────────────────────────────────────────────────────
  {
    id: "wealio",
    description: "Personal Finance App",
    title: "Wealio — Personal Finance Tracker",
    src: "/actionItem/wealio/landingpage.png",
    ctaText: "Visit",
    ctaLink: "https://wealio.app/en",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PWA"],
    year: "2026",
    story: [
      {
        // Beat 1 — The problem (personal, relatable)
        text: () => (
          <>
            <p>
              I had money sitting in BCA, GoPay, OVO, Dana, Bibit, and not a single app could
              make sense of all of it. Every time I transferred from BCA to GoPay, other apps counted
              it as both an expense and an income. Monthly reports were a mess. The numbers lied.
            </p>
            <p>
              I tried every solution I could find. They all shared the same flaw: built for foreign
              markets, not for how Indonesians actually handle money. None of them understood that
              a wallet transfer is not an expense. None could track credit card charges before the
              bill arrived. And almost all of them were painfully slow on mobile, which is exactly
              where I needed to log transactions most.
            </p>
          </>
        ),
      },
      {
        images: [
          { src: "/actionItem/wealio/demo_quick_add.mp4", type: "video", alt: "Quick Add demo", caption: "Quick Add — log a transaction in 3 taps" },
          { src: "/actionItem/wealio/dashboard.png", alt: "Wealio dashboard", caption: "All accounts in one dashboard" },
          { src: "/actionItem/wealio/account.png", alt: "Wealio landing page", caption: "wealio.app" },
        ],
      },
      {
        // Beat 2 — The insight & decision to build
        text: () => (
          <>
            <p>
              I wasn&apos;t the only one. This is a problem shared by every Indonesian whose financial
              life is spread across a dozen payment platforms. So I built it myself.
            </p>
            <p>
              Wealio was designed around two opposing needs that are equally important: log fast on
              mobile, analyze deep on desktop. Quick Add lets you record a transaction in three taps, 
              no menus, no scrolling. Six purpose-built transaction types ensure transfers and
              balance corrections never corrupt your expense reports.
            </p>
          </>
        ),
      },
      {
        images: [
          { src: "/actionItem/wealio/quick_adds.png", alt: "Quick Add interface", caption: "Minimal Quick Add interface" },
          { src: "/actionItem/wealio/budget_tracking.png", alt: "Budget tracking", caption: "Budget alerts before you hit the limit" },
        ],
      },
      {
        // Beat 3 — The craft & conviction
        text: () => (
          <>
            <p>
              Technically, Wealio is a Next.js Progressive Web App, installable straight from the
              browser, no App Store required. The credit card tracking system marks every swipe as
              PENDING, then settles it when the bill is paid. The result is a real-time net worth
              that&apos;s actually accurate, not two weeks behind.
            </p>
            <p>
              Every feature in Wealio exists because it solved a real frustration, not because a
              competitor had it. No ads. No data sales. Just an honest tool for people who are serious
              about knowing where their money goes.
            </p>
          </>
        ),
      },
      {
        images: [
          { src: "/actionItem/wealio/net_worth.png", alt: "Real-time net worth", caption: "Real-time net worth including pending charges" },
          { src: "/actionItem/wealio/recurring.png", alt: "Recurring transactions", caption: "Automatic recurring transactions" },
        ],
      },
    ],
  },

  // ── Upconnect ─────────────────────────────────────────────────
  {
    id: "upconnect",
    description: "Universitas Pancasila",
    title: "Upconnect — Alumni Network",
    src: "/actionItem/upconnect/landing_page_en.png",
    ctaText: "Visit",
    ctaLink: "https://upconnect.univpancasila.ac.id",
    tech: ["React Router v7", "TypeScript", "Tailwind CSS v4", "shadcn/ui", "Prisma", "PostgreSQL", "Docker"],
    year: "2025-2026",
    story: [
      {
        // Beat 1 — The platform and the OAuth problem
        text: () => (
          <>
            <p>
              Universitas Pancasila had thousands of graduates, but no real way for them to find
              each other, access opportunities, or stay connected to the institution after graduation.
              The alumni data existed inside the university&apos;s academic system. It just had
              nowhere to go.
            </p>
            <p>
              Upconnect is the platform that changed that. Alumni can build profiles, browse job
              postings, register for events, and reconnect with the university community.
            </p>
            <p>
              But the university also had a separate Tracer Study platform with its own login.
              Alumni filling out a graduate survey had to create yet another account for a system
              they would use once. The fix was to make Upconnect the OAuth provider: one login,
              valid across both platforms. Alumni authenticate through Upconnect and move into
              Tracer Study without any friction. The survey completion rate went up. The extra
              account went away.
            </p>
          </>
        ),
      },
      {
        images: [
          { src: "/actionItem/upconnect/landing_page_id.png", alt: "Upconnect landing page", caption: "Landing page" },
          { src: "/actionItem/upconnect/oauth_upconnect.png", alt: "OAuth login", caption: "University SSO — one login across platforms" },
        ],
      },
      {
        // Beat 2 — The data problem: 50k records, most unusable
        text: () => (
          <>
            <p>
              Building the alumni directory meant working with the university&apos;s internal
              academic system, which held 50,000+ student records. The problem was the data itself.
              Most records were incomplete, missing faculties, blank graduation years, inconsistent
              field formats. You cannot build a meaningful network on top of data you cannot trust.
            </p>
            <p>
              The first real work was cleaning. Records without sufficient completeness were dropped,
              bringing the working dataset down to 27,000+ alumni. Smaller, but reliable. That
              distinction matters more than the bigger number.
            </p>
          </>
        ),
      },
      {
        images: [
          { src: "/actionItem/upconnect/alumni_network.png", alt: "Alumni network", caption: "Alumni directory" },
          { src: "/actionItem/upconnect/career_center.png", alt: "Career center", caption: "Career center and job board" },
        ],
      },
      {
        // Beat 3 — The scoring problem: 27k names is still a phonebook
        text: () => (
          <>
            <p>
              Even with clean data, showing alumni a list of 27,000 names solves nothing. The
              problem shifted from data quality to relevance: how do you surface the right
              connections without asking people to search through strangers?
            </p>
            <p>
              The answer was a Weighted Scoring system. Each connection suggestion is ranked by
              signals pulled from the cleaned dataset: faculty, major, graduation year, industry,
              and current role. Each factor carries a different weight based on how well it
              predicts a meaningful professional relationship. The result is a recommendation
              feed that feels personal, built on data that was worth building on.
            </p>
          </>
        ),
      },
    ],
  },

  // ── SIAMI ─────────────────────────────────────────────────────
  {
    id: "siami-project",
    description: "Universitas Pancasila",
    title: "SIAMI (Audit Management System)",
    src: "/actionItem/siami/dashboard.png",
    ctaText: "Visit",
    ctaLink: "https://siami.univpancasila.ac.id/dashboard/login",
    tech: ["Laravel", "Filament", "Livewire", "PHP", "MySQL"],
    year: "2025",
    story: [
      {
        // Beat 1 — The real problem: accreditation is coming
        text: () => (
          <>
            <p>
              Universitas Pancasila has an accreditation cycle coming up. When the assessors
              arrive, they need to see audit data: complete, structured, and traceable across
              years. The problem was that none of that data was in one place. It was scattered
              across spreadsheets, shared folders, and email threads, with no consistent format
              and no history that anyone could actually present with confidence.
            </p>
            <p>
              I was brought in to build the system before that day comes. SIAMI is the platform
              assessors will open when they need to evaluate the university&apos;s internal quality
              process. Everything in one place, with a full audit trail, structured by faculty,
              and accessible by role.
            </p>
          </>
        ),
      },
      {
        images: [
          { src: "/actionItem/siami/dashboard.png", alt: "SIAMI dashboard", caption: "Main dashboard" },
          { src: "/actionItem/siami/monitoring_audit.png", alt: "Audit monitoring", caption: "Real-time audit monitoring" },
        ],
      },
      {
        // Beat 2 — The data problem: 1,100+ employee records
        text: () => (
          <>
            <p>
              One of the harder integration challenges was employee data. The audit workflows
              depend on knowing who is assigned to what, which faculty they belong to, and what
              role they hold in the process. The university had 1,100+ employee records sitting
              in a separate internal system with no direct connection to anything audit-related.
            </p>
            <p>
              Integrating that data meant mapping it to the audit domain: pulling the right fields,
              resolving inconsistencies, and syncing it into SIAMI in a way that made role assignment
              and workflow routing actually work. Once the data was connected, assigning auditors
              to units and tracking accountability across the institution became something the system
              could handle automatically.
            </p>
          </>
        ),
      },
      {
        images: [
          { src: "/actionItem/siami/manage_employee.png", alt: "Employee management", caption: "1,100+ employee records integrated" },
        ],
      },
      {
        // Beat 3 — The result: from manual to traceable
        text: () => (
          <>
            <p>
              The system now handles the full audit lifecycle. Auditors submit findings through
              structured forms. Leadership monitors progress across every faculty in real time.
              Administrators manage access through role-based permissions that reflect the actual
              org structure. Nothing falls through email anymore.
            </p>
            <p>
              What made this project genuinely difficult was not the technology. Laravel and
              Filament are well-understood tools. What was hard was translating 10+ stakeholder
              sessions into a system that matched how the institution actually works, not how
              a generic audit tool assumes it works.
            </p>
          </>
        ),
      },
    ],
  },

  // ── Save Our Species ──────────────────────────────────────────
  {
    id: "save-our-species",
    description: "Dicoding Capstone Project",
    title: "Save Our Species",
    src: "/actionItem/save-our-species/landing_page.png",
    ctaText: "Visit",
    ctaLink: "https://save-our-species.vercel.app/",
    tech: ["React", "Tailwind CSS", "REST API"],
    year: "2023-2024",
    story: [
      {
        // Beat 1 — The brief and the constraint
        text: () => (
          <>
            <p>
              The brief was simple on paper: build an educational web platform about endangered animals,
              deliver it as a team, ship it within the capstone timeline. What made it real was the
              constraint. This was not a solo project. I was leading a team of five developers, most of
              whom had never shipped a product together before.
            </p>
            <p>
              The subject matter gave it weight. Endangered species are not an abstract topic. The data
              is real, the loss is ongoing, and the platform needed to communicate that without feeling
              like a school assignment. We wanted people to actually care when they left the page.
            </p>
          </>
        ),
      },
      {
        images: [
          { src: "/actionItem/save-our-species/landing_page.png", alt: "Save Our Species landing page", caption: "Landing page" },
          { src: "/actionItem/save-our-species/capstone_project.png", alt: "Capstone project overview", caption: "Dicoding capstone submission" },
        ],
      },
      {
        // Beat 2 — The team reality and iteration
        text: () => (
          <>
            <p>
              Coordinating five developers meant the first real challenge was not technical. It was
              alignment. Tasks had to be divided without creating overlapping work. Components had to
              be consistent across contributors who had different coding habits. I set up the architecture
              early so the team had clear boundaries to work within.
            </p>
            <p>
              Early testing surfaced two problems fast: contrast was too low in several sections, and
              the content hierarchy made it hard to know where to look first. We restructured the layout,
              tightened the type scale, and ran another round of testing before the final submission.
              Both issues were fixed before anyone outside the team saw the final build.
            </p>
          </>
        ),
      },
      {
        images: [
          { src: "/actionItem/save-our-species/volunteers.png", alt: "Volunteer involvement", caption: "Community and conservation volunteers" },
        ],
      },
      {
        // Beat 3 — What it taught
        text: () => (
          <>
            <p>
              Save Our Species was the first time I shipped something with a team under a hard deadline.
              It taught me that good frontend architecture is not just about the code. It is about making
              the codebase legible to people who did not write it, and making coordination feel like less
              of a friction than the actual work.
            </p>
            <p>
              The database has since gone offline. But the project still runs. The UI holds up. And the
              lesson it left behind is one I carry into every team project since.
            </p>
          </>
        ),
      },
    ],
  },

  // ── Restaurant Catalog ────────────────────────────────────────
  // {
  //   id: "restaurant-catalog",
  //   description: "Dicoding Frontend Expert",
  //   title: "Restaurant Catalog Website",
  //   src: "/actionItem/restaurant-catalog/landing.png",
  //   ctaText: "Visit",
  //   ctaLink: "https://kaiseki-restaurant-v-3.vercel.app/",
  //   tech: ["Service Workers", "IndexedDB", "Webpack", "ES6", "PWA"],
  //   year: "2023",
  //   story: [
  //     {
  //       text: () => (
  //         <>
  //           <p>
  //             This project was built to address the limitation of traditional web apps that break under
  //             unstable network conditions. The goal was to ensure users could still browse, search, and save
  //             restaurant data even when offline. I designed the application as an offline-first Progressive
  //             Web App, implementing service workers and IndexedDB to cache assets and persist data locally.
  //           </p>
  //         </>
  //       ),
  //     },
  //     {
  //       // TODO: replace with real screenshots — landing, search, saved restaurants
  //       images: [
  //         { src: "/actionItem/restaurant-catalog/landing.png", alt: "Landing page", caption: "Landing page" },
  //         { src: "/actionItem/restaurant-catalog/landing.png", alt: "Offline mode", caption: "Offline-first experience" },
  //         { src: "/actionItem/restaurant-catalog/landing.png", alt: "Saved list", caption: "Locally saved restaurants" },
  //       ],
  //     },
  //     {
  //       text: () => (
  //         <>
  //           <p>
  //             Throughout development, I tested multiple network failure scenarios to identify inconsistencies
  //             between UI state and stored data, then introduced fallback UI states to preserve a reliable
  //             user experience. The result was a resilient client-side application that maintained
  //             functionality across network conditions and demonstrated practical offline-first architecture
  //             in a real-world use case.
  //           </p>
  //         </>
  //       ),
  //     },
  //     {
  //       // TODO: replace with detail page / fallback UI screenshots
  //       images: [
  //         { src: "/actionItem/restaurant-catalog/landing.png", alt: "Restaurant detail", caption: "Restaurant detail page" },
  //         { src: "/actionItem/restaurant-catalog/landing.png", alt: "Fallback UI", caption: "Network fallback state" },
  //       ],
  //     },
  //   ],
  // },

  // ── Hostle ────────────────────────────────────────────────────
  // {
  //   id: "hostle-website",
  //   description: "Dicoding Frontend Developer",
  //   title: "Hostle Website",
  //   src: "/actionItem/hostle/landing.png",
  //   ctaText: "Visit",
  //   ctaLink: "https://hostle.vercel.app/",
  //   tech: ["AJAX", "Webpack", "ES6 Modules", "CSS"],
  //   year: "2022",
  //   story: [
  //     {
  //       text: () => (
  //         <>
  //           <p>
  //             Hostle was built to improve the responsiveness of movie search and listing interfaces that
  //             often suffer from slow rendering and delayed feedback. The application was developed using
  //             AJAX, Webpack, and ES6 modules, with a focus on asynchronous data fetching and efficient
  //             client-side rendering to ensure smooth interactions across devices.
  //           </p>
  //         </>
  //       ),
  //     },
  //     {
  //       // TODO: replace with real screenshots — landing, search results, detail
  //       images: [
  //         { src: "/actionItem/hostle/landing.png", alt: "Hostle landing page", caption: "Landing page" },
  //         { src: "/actionItem/hostle/landing.png", alt: "Search results", caption: "Movie search results" },
  //       ],
  //     },
  //     {
  //       text: () => (
  //         <>
  //           <p>
  //             During implementation, I optimized rendering performance through lazy loading and modularized
  //             the codebase to improve maintainability and scalability. The result was a fast, responsive
  //             interface that reduced perceived loading time and delivered a more fluid browsing experience.
  //           </p>
  //         </>
  //       ),
  //     },
  //     {
  //       // TODO: replace with movie detail / mobile view screenshots
  //       images: [
  //         { src: "/actionItem/hostle/landing.png", alt: "Movie detail", caption: "Movie detail page" },
  //         { src: "/actionItem/hostle/landing.png", alt: "Mobile view", caption: "Mobile layout" },
  //         { src: "/actionItem/hostle/landing.png", alt: "Lazy loaded list", caption: "Lazy-loaded listing" },
  //       ],
  //     },
  //   ],
  // },
];
