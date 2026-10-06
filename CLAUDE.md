# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # Start dev server (Next.js + Turbopack)
pnpm build    # Production build
pnpm start    # Start production server (after build)
pnpm lint     # ESLint
```

Package manager is **pnpm** (see `pnpm-lock.yaml`, `pnpm-workspace.yaml`). There is no test suite configured (no jest/vitest, no test script in `package.json`).

## Architecture

This repo serves two distinct things from one Next.js app:

1. **Public portfolio** — a single-page, animation-heavy site at `src/app/(public)/`.
2. **Admin dashboard** — a login-gated area (`/login`, `/signup`, `/dashboard`) built on the shadcn admin dashboard pattern (sidebar, data-table, charts).

`src/app/(auth)` and `src/app/(dashboard)` are empty route groups left over from an earlier structure — the real auth/dashboard pages live at the top level (`src/app/login`, `src/app/signup`, `src/app/dashboard`), not inside those groups.

### Auth flow

Session auth is cookie-based against an **external backend API** (`API_BASE_URL` env var) — this app has no database of its own.

- `src/app/api/auth/*/route.ts` — Next.js API routes that proxy login/logout/me requests to the backend and forward its `Set-Cookie` headers to the browser.
- `src/actions/auth.ts` — server actions (`login`, `logout`, `signup`, `getCurrentUser`) that call the backend directly and manually re-set cookies on the Next.js response (see the manual `Set-Cookie` parsing in `login()`). `getCurrentUser` is wrapped in React's `cache()` to dedupe within a render.
- `src/proxy.ts` — this is Next.js 16's renamed `middleware.ts` (same `matcher`/`config` convention). It only checks whether the `portfolio_session` cookie is *present* to gate `/dashboard` and bounce logged-in users away from `/login`/`/signup` — it does not validate the session; real validation happens via `getCurrentUser()` hitting `/auth/me`.
- `src/contexts/user-context.tsx` — client-side `UserProvider`/`useUser()` for passing the server-fetched user down to client components.

### Component structure (atomic design)

`src/components/` follows atomic design, documented in detail in `src/docs/prd/08-atomic-design-restructure.md`:

- `atoms/` — smallest single-purpose elements, no composition (e.g. `diamond.tsx`, `logo.tsx`, `cursor.tsx`).
- `molecules/` — composition of 2+ atoms or a layout wrapper with light logic, not a full page section (e.g. `stats-strip.tsx`, `skills-marquee.tsx`, `section-divider.tsx`).
- `organisms/` — complete, self-contained page sections (e.g. `hero-section.tsx`, `about-section.tsx`, `page-loader.tsx`).
- `ui/` — shadcn/ui primitives, generally left untouched by feature work.
- Dashboard-specific components (`app-sidebar.tsx`, `data-table.tsx`, `nav-*.tsx`, etc.) live flat at the root of `components/`, not in an atomic subfolder.

When adding a component, place it by these rules rather than by where similar-looking files happen to sit — the PRD doc explains the atom/molecule boundary in more depth if it's ambiguous.

### Content is config-driven

Site content (not just component logic) lives in `src/config/*.config.tsx`:

- `projects.config.tsx` — project cards, including rich `story` sections (alternating text + `ChaosGallery` image grids) or a simpler `content()` fallback.
- `timeline.config.tsx` — work experience/education entries.
- `gallery.config.tsx` — photo/video gallery data used within timeline entries.

Updating portfolio copy/projects/timeline almost always means editing these config files, not the section components that render them.

### Animation stack

Multiple animation libraries are in play for different purposes — check what's already used nearby before reaching for a new approach:
- **GSAP** (`@gsap/react`) — used for more complex/imperative sequences.
- **Motion** (`motion`, formerly Framer Motion) — declarative React animations (`useInView`, `animate`).
- **Lenis** (`src/lib/lenis.tsx`) — smooth scroll, explicitly disabled on touch devices.
- **Three.js** (`@react-three/fiber`, `@react-three/drei`) — used in `hero-canvas.tsx`, lazy-loaded.

### Path alias

`@/*` maps to `src/*` (see `tsconfig.json`, mirrored in `components.json` aliases for shadcn).

### shadcn/ui

`components.json`: style `new-york`, base color `zinc`, icon library `lucide`, plus a custom `@aceternity` registry (`https://ui.aceternity.com/registry/{name}.json`) for the Aceternity-sourced UI components under `components/ui/`.

### Lint notes

`eslint.config.mjs` extends `eslint-config-next` (core-web-vitals + typescript) with one override: `react-hooks/exhaustive-deps` is downgraded to `warn`.

## Deployment

Not deployed on Vercel despite `next.config.ts` having `output: "standalone"` — this is a self-hosted Docker deployment:

- `.github/workflows/deploy.yml` builds the image from `docker/Dockerfile`, pushes to GHCR on push to `main`, then connects to the VPS over Tailscale and deploys via SSH (`docker compose pull && up -d`).
- `docker-compose.yml` runs only the app container (`portfolio_app`), joined to the external `edge` network. TLS and routing are handled by a shared Caddy edge proxy that lives outside this repo (`/var/www/edge` on the VPS, `reverse_proxy portfolio_app:3000`). The `edge` network must exist before `docker compose up`.
- `API_BASE_URL` is a runtime env var read from the VPS `.env` (compose fails fast if it's missing). `NEXT_PUBLIC_APP_URL` is inlined at build time, so it's passed as a build arg from the workflow, not via `.env`.
