# 08 — Performance

## 8.1 Performance Budget

Before optimising, set targets:

| Metric | Target |
|---|---|
| LCP (Largest Contentful Paint) | < 2.0s |
| FID / INP | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.05 |
| Lighthouse Performance | ≥ 90 |
| Total JS (gzipped) | < 200kb |
| First paint | < 1.0s |

The biggest threats to these targets in this project are: Framer Motion bundle size, unoptimised fonts, and the Codolio API latency on the GitHubActivity/DSAActivity sections.

---

## 8.2 Framer Motion Audit

Run this after building all components. For each Framer Motion usage, ask: **can this be replaced with a CSS animation?**

| Animation type | Use Framer Motion? | Alternatively |
|---|---|---|
| Section entrance (fadeUp on scroll) | YES — needs IntersectionObserver tie-in | CSS `@keyframes` + class toggle |
| SwordDivider line draw | YES — `scaleX` on viewport | CSS animation + Intersection Observer |
| SVG circle arc (DSA meter) | YES — `strokeDashoffset` | CSS `stroke-dashoffset` animation |
| ProjectCard layout shift on filter | YES — `layout` prop | Expensive to replicate in CSS |
| Hero text stagger entrance | YES — tight stagger control | CSS `animation-delay` works fine here actually |
| Navbar fade in/out | NO — use CSS transition | `transition: all 0.3s` |
| Hover states (card border, pill color) | NO — use CSS transition | All hover states should be pure CSS |

**Rule:** Hover states and simple transitions are always CSS. Framer Motion is reserved for scroll-linked and complex orchestrated sequences.

---

## 8.3 Reducing Framer Motion Bundle Size

Instead of importing everything:

```ts
// ❌ Full bundle
import { motion, AnimatePresence } from 'framer-motion'

// ✅ Tree-shakeable — only import what you use
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
```

Both are the same in terms of tree-shaking with modern bundlers, but this makes explicit what you're using and makes auditing easier.

Consider lazy-importing Framer Motion on the client only:

```ts
// For sections that aren't above the fold:
const { motion } = await import('framer-motion')
```

---

## 8.4 Font Performance

The `globals.css` imports Google Fonts via URL. This works but adds a render-blocking request.

**Better approach — use `next/font/google`:**

Update `src/app/layout.tsx`:

```tsx
import { Shippori_Mincho, Space_Grotesk, JetBrains_Mono } from 'next/font/google'

const shipporiMincho = Shippori_Mincho({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

const spaceGrotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"
      className={`${shipporiMincho.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

Then remove the `@import url(...)` line from `globals.css` — the CSS variables are now injected by Next.js automatically.

**Why this matters:** `next/font` self-hosts fonts, eliminates the Google Fonts network request, and generates optimal `font-display: swap` with preload links. This alone can improve LCP by 300–500ms.

---

## 8.5 Image Optimisation

If you add a profile photo or project screenshots, always use `next/image`:

```tsx
import Image from 'next/image'

<Image
  src="/profile.jpg"
  alt={person.name}
  width={400}
  height={400}
  priority={false}         // Only true for above-the-fold images
  className="..."
/>
```

For the Hero section specifically, if you add any image above the fold, set `priority={true}` — this adds `fetchpriority="high"` and improves LCP.

**Currently, the Hero section has no images (intentionally) — keep it that way for performance.**

---

## 8.6 `prefers-reduced-motion` Guards

The `globals.css` already has a global reduced-motion override. But you also need guards in JavaScript for Framer Motion:

Create `src/lib/hooks/useReducedMotion.ts`:

```ts
'use client'
import { useEffect, useState } from 'react'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}
```

Use in animated components:
```tsx
const reducedMotion = useReducedMotion()

<motion.div
  initial={reducedMotion ? false : { opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
>
```

The `ReiatsuParticles` component already has this guard — apply the same pattern to all `whileInView` animations.

---

## 8.7 API Route Caching

The Codolio API is fetched on every request if not cached. Ensure caching is set:

In `src/app/api/codolio/route.ts`:
```ts
export const revalidate = 3600 // 1 hour ISR cache
```

In `src/lib/codolio.ts`:
```ts
const res = await fetch(`${BASE_URL}/${USERNAME}`, {
  next: { revalidate: 3600 },
})
```

This ensures Vercel caches the API response for 1 hour. On a portfolio, Codolio data doesn't need to be realtime.

---

## 8.8 Bundle Analysis

After building, run:

```bash
npm install --save-dev @next/bundle-analyzer

# In next.config.ts:
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
export default withBundleAnalyzer(nextConfig)

# Then:
ANALYZE=true npm run build
```

Look for:
- Framer Motion: should be < 50kb gzipped in your client chunk
- Any unexpectedly large dependencies
- Anything being imported in multiple chunks that could be shared

---

## 8.9 Performance Checklist

Run after the project is fully assembled:

- [ ] `next/font` used instead of Google Fonts CSS import
- [ ] `GitHubActivity` and `DSAActivity` are dynamically imported (`06_page_assembly.md §6.7`)
- [ ] All `<Image>` tags use `next/image` (if any images added)
- [ ] `useReducedMotion` guard on all Framer Motion components
- [ ] `ReiatsuParticles` pauses when tab is not visible (`document.addEventListener('visibilitychange')`)
- [ ] API route caching set to 1 hour
- [ ] No hover effects implemented with Framer Motion (CSS only)
- [ ] Run `npm run build` — zero warnings about large bundle sizes
- [ ] Lighthouse score ≥ 90 on Performance (run in incognito, on deployed URL)

---

## 8.10 Pause Particles When Tab Hidden

Add this to `ReiatsuParticles.tsx`:

```ts
// Inside the useEffect, after setting up the animation loop:
const handleVisibility = () => {
  if (document.hidden) {
    cancelAnimationFrame(animationId)
  } else {
    draw() // restart
  }
}
document.addEventListener('visibilitychange', handleVisibility)

// In cleanup:
document.removeEventListener('visibilitychange', handleVisibility)
```

---

Proceed to `09_deployment.md`.
