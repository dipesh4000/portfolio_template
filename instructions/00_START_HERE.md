# Bleach Portfolio — Master Execution Guide

You are building a Bleach-inspired, cinematic, single-page developer portfolio using Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

This guide tells you exactly what to do, in what order, and which instruction file to use for each step.

---

## Your Details (Pre-filled)

| Field | Value |
|---|---|
| GitHub Username | `dipesh4000` |
| Codolio Username | `dipesh4000` |
| Codolio API Base | `https://api.codolio.com/profile?userKey=<user>` |

---

## Execution Order

Work through these steps sequentially. Do not skip ahead.

### Phase 1 — Project Scaffold

**Step 1.** Follow `01_project_setup.md`
- Initialise the Next.js 15 project
- Install all dependencies
- Configure Tailwind, TypeScript, and path aliases
- Set up the folder structure

---

### Phase 2 — Design System

**Step 2.** Follow `02_design_system.md`
- Create all CSS custom properties (colors, spacing, typography)
- Set up the global font imports (Geist Mono + custom display font)
- Create the `cn()` utility
- Build the base layout and noise texture overlay

---

### Phase 3 — Config & Data Layer

**Step 3.** Follow `03_config_architecture.md`
- Create all config files with Zod validation
- Fill in your personal data (name, bio, projects, education, experience, socials)
- Understand how every piece of content flows from config into components

---

### Phase 4 — API Layer

**Step 4.** Follow `04_api_routes.md`
- Build the `/api/codolio` route that fetches from Codolio
- This powers both the GitHub heatmap and DSA activity section
- Understand the Codolio response shape and how to extract data

---

### Phase 5 — Components (build in this order)

**Step 5.** Follow `05_components.md`

Build components in this exact order to avoid import errors:

1. `components/ui/` — primitives (SwordDivider, GlitchText, ReiatsuParticles)
2. `components/layout/` — Navbar, Footer
3. `components/sections/Hero.tsx`
4. `components/sections/About.tsx` (includes Skills)
5. `components/sections/Projects.tsx`
6. `components/sections/Education.tsx`
7. `components/sections/Experience.tsx`
8. `components/sections/GitHubActivity.tsx`
9. `components/sections/DSAActivity.tsx`

---

### Phase 6 — Page Assembly

**Step 6.** Follow `06_page_assembly.md`
- Wire all sections into `app/page.tsx`
- Set up scroll behaviour
- Add section intersection observers for entrance animations
- Connect the Navbar scroll-spy

---

### Phase 7 — SEO

**Step 7.** Follow `07_seo.md`
- Set up `app/layout.tsx` metadata
- Add Open Graph and Twitter card config
- Add JSON-LD structured data
- Generate `sitemap.ts` and `robots.ts`

---

### Phase 8 — Performance Audit

**Step 8.** Follow `08_performance.md`
- Lazy-load heavy sections
- Audit Framer Motion usage — remove what can be CSS
- Add `prefers-reduced-motion` guards
- Run Lighthouse and resolve issues

---

### Phase 9 — Deploy

**Step 9.** Follow `09_deployment.md`
- Deploy to Vercel
- Set environment variables
- Verify Codolio API route works in production
- Final checklist

---

## Files in This Instruction Set

```
00_START_HERE.md          ← You are here
01_project_setup.md       ← Scaffold, deps, folder structure
02_design_system.md       ← CSS vars, fonts, utilities
03_config_architecture.md ← Zod schemas, all config files
04_api_routes.md          ← Codolio API route
05_components.md          ← Every component, detailed specs
06_page_assembly.md       ← Wiring page.tsx together
07_seo.md                 ← Metadata, OG, JSON-LD, sitemap
08_performance.md         ← Lighthouse, lazy loading, motion
09_deployment.md          ← Vercel deploy + env vars
```

---

## Rules for Working With an AI Coding Assistant

When using Claude, Cursor, or Copilot to implement these instructions:

1. **Feed one instruction file at a time.** Do not paste all files at once.
2. **Always include the design system file** as context when building any component.
3. **Paste the Zod schema** for a section's config when building that section's component.
4. **After each phase**, do a quick visual check before moving to the next.
5. **If a component looks wrong**, check: (a) are CSS variables loaded? (b) is the config data passing correctly? (c) is Framer Motion wrapped in `"use client"`?

---

## Common Pitfalls

| Problem | Likely Cause |
|---|---|
| Page is unstyled | Tailwind not configured for `app/` and `components/` paths |
| Animations don't work | Missing `"use client"` directive on animated component |
| Codolio data is undefined | API route not created, or wrong field path in response |
| Fonts not loading | Google Fonts / next/font not imported in `layout.tsx` |
| TypeScript errors in config | Zod schema not matching config object shape |

---

## Section Map (what goes where on the page)

```
/ (root)
├── <Navbar />                    fixed, scroll-spy active section
├── <Hero />                      full viewport, large type, parallax
├── <About />                     bio + skills grid
├── <Projects />                  card grid, filterable by tag
├── <Experience />                timeline, sword-divider between items
├── <Education />                 timeline, same pattern as experience
├── <GitHubActivity />            custom heatmap from Codolio
├── <DSAActivity />               energy meters from Codolio
└── <Footer />                    minimal, links, copyright
```

---

Start with `01_project_setup.md`.
