# Bleach Portfolio — Full Project Audit Report

**Date:** 2025  
**Auditor:** Amazon Q  
**Status after fixes:** ✅ Zero TypeScript errors — project compiles clean

---

## 1. Root Cause of Slow Compile / Not Starting

The project was **NOT broken by code logic** — it was broken by a **single TypeScript type error** that caused the compiler to fail hard before emitting anything:

```
src/components/sections/Metrics.tsx(130,97):
  error TS2322 — Property 'style' does not exist on type 'LiquidGlassCardProps'
```

`Metrics.tsx` passed a `style={{ minHeight: '280px' }}` prop to `LiquidGlassCard`, but `LiquidGlassCardProps` didn't declare `style`. This caused TypeScript to reject the entire module graph.

**Fix applied:** Added `style?: React.CSSProperties` to `LiquidGlassCardProps` and spread it into the div's style object in `LiquidGlassCard.tsx`.

---

## 2. File-by-File Audit

### `src/app/globals.css` ✅
- Google Fonts import via `@import url(...)` — works but blocks render until fonts load. Low priority.
- Film grain SVG `feTurbulence` noise — correct implementation, 0.025 opacity is subtle.
- `@theme` tokens for Tailwind v4 — correctly defined.
- Custom utility classes (`font-calligraphy`, `font-heading`, `font-body`, `container-main`) — clean.

### `src/app/layout.tsx` ✅
- Metadata fully populated with OpenGraph, Twitter card, JSON-LD schema, robots.
- `PersonSchema.parse(raw)` runs at module level in `config.ts` — throws at build time if data is invalid (good fail-fast behavior).

### `src/app/page.tsx` ✅
- Imports all sections. `GitHubActivity` and `DSAActivity` are lazy-loaded via `DynamicSections.tsx` — correct.
- `Metrics` is now imported and placed after `Hero`.

### `src/components/sections/Hero.tsx` ✅
- Full GSAP cinematic sword-slash timeline.
- All refs correctly typed. `gsap.context()` used with `ctx.revert()` on unmount — no memory leaks.
- Text mask inversion via two stacked `<h1>` with `clipPath: 'inset(0 50% 0 0)'` on the white layer — correct approach.
- Screen shake done with sequential `tl.to(containerRef)` x translations — functional.

### `src/components/sections/Metrics.tsx` ✅ (after fix)
- `ScrollTrigger` registered at module level with `gsap.registerPlugin(ScrollTrigger)` — correct.
- `gsap.context()` scopes all animations and cleans up on unmount.
- Numerical ticker, SVG stroke ring, and stagger reveal all correctly wired to `scrollTrigger`.
- `once: true` on all scroll triggers — prevents re-firing.

### `src/components/ui/LiquidGlassCard.tsx` ✅ (after fix)
- `style` prop now accepted and spread correctly.
- `velTimer` ref used to reset glow scale on mouse idle — correct pattern.
- `useCallback` on all handlers — no unnecessary re-renders.
- `clearTimeout` called in `onMouseLeave` — no timer leaks.

### `src/components/sections/About.tsx` ✅
- Uses Framer Motion `whileInView` with `viewport={{ once: true }}` — correct.
- Reads from `person` data object — type-safe via Zod schema.

### `src/components/sections/Projects.tsx` ✅
- Filter state with `AnimatePresence` layout animation — correct.
- `allTags` computed at module level (not in render) — good.

### `src/components/sections/Experience.tsx` ✅
- `date-fns` `format()` used for date formatting — correct.
- Dynamic tech stack deduplication via `.filter((v,i,a) => a.indexOf(v) === i)` — works.

### `src/components/sections/Education.tsx` ✅
- Clean, no issues.

### `src/components/sections/GitHubActivity.tsx` ✅
- `useCodolio` hook fetches from `/api/codolio` — lazy, client-side only.
- Heatmap groups contributions into weeks correctly.

### `src/components/sections/DSAActivity.tsx` ✅
- Framer Motion `whileInView` SVG stroke animation — correct.
- `useCodolio` shared hook — no double-fetch (hook is stateless, but both sections mount at different times).

### `src/components/sections/DynamicSections.tsx` ✅
- Both `GitHubActivity` and `DSAActivity` lazy-loaded with `ssr: false` — correct for client-only canvas/fetch components.

### `src/components/layout/Navbar.tsx` ✅
- Dark theme colors updated. `useActiveSection` hook drives active link state.
- Scroll listener uses `{ passive: true }` — good for performance.

### `src/lib/codolio.ts` ✅
- `fetch` with `next: { revalidate: 3600 }` — ISR cache at server level.
- Graceful null return on API error — no crashes.

### `src/lib/schemas.ts` ✅
- All Zod schemas are correct. `ExperienceSchema` has `endDate` as plain string — handles `'present'` correctly since formatDate in Experience.tsx checks for it manually.

### `src/app/api/codolio/route.ts` ✅
- `export const revalidate = 3600` — cached at the route level.

---

## 3. Issues Found & Status

| # | Severity | File | Issue | Status |
|---|----------|------|-------|--------|
| 1 | 🔴 CRITICAL | `LiquidGlassCard.tsx` | Missing `style` prop in interface — caused full compile failure | ✅ Fixed |
| 2 | 🟡 MEDIUM | `globals.css` | Google Fonts loaded via `@import url()` — blocks render, not optimized | ⚠️ Low priority |
| 3 | 🟡 MEDIUM | `SectionLabel.tsx` | References `text-reiatsu-gold` — this Tailwind token doesn't exist in the new theme | ⚠️ Component unused currently |
| 4 | 🟡 MEDIUM | `SwordDivider.tsx` | References `bg-accent` and `bg-gradient-to-r via-accent` — `accent` not defined in new Tailwind v4 theme | ⚠️ Component unused currently |
| 5 | 🟢 LOW | `next.config.ts` | `gsap` missing from `optimizePackageImports` | ⚠️ Minor |
| 6 | 🟢 LOW | `useCodolio.ts` | Both `GitHubActivity` and `DSAActivity` call the same hook independently — two separate fetches to `/api/codolio` | ⚠️ Minor, cached by route |

---

## 4. Recommendations (non-blocking)

**Fix unused component token references** (issue #3 and #4):
- `SectionLabel.tsx`: change `text-reiatsu-gold` → `text-[#FF8A00]`
- `SwordDivider.tsx`: change `bg-accent`/`via-accent` → `bg-[#FF8A00]`/`via-[#FF8A00]`

**Add `gsap` to `optimizePackageImports`** in `next.config.ts`:
```ts
optimizePackageImports: ['framer-motion', 'lucide-react', 'gsap']
```

**Consider a shared SWR/React Query cache** for `useCodolio` if both sections render simultaneously — avoids the double network call.

---

## 5. Compile Verification

```
npx tsc --noEmit
→ Exit code: 0
→ Stdout: (empty)
→ Errors: 0
```

Project is ready to run with `npm run dev`.
