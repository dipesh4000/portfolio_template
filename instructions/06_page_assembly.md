# 06 — Page Assembly

## 6.1 Root Layout — `src/app/layout.tsx`

This file sets the HTML shell, loads fonts, sets metadata defaults, and wraps the app.

```tsx
import type { Metadata } from 'next'
import './globals.css'
import { person } from '@/data/config'

export const metadata: Metadata = {
  title: {
    default: `${person.name} — ${person.title}`,
    template: `%s | ${person.name}`,
  },
  description: person.bio[0],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://localhost:3000'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        {children}
      </body>
    </html>
  )
}
```

Note: Full SEO metadata is added in `07_seo.md` — this is intentionally minimal for now.

---

## 6.2 Main Page — `src/app/page.tsx`

```tsx
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { Education } from '@/components/sections/Education'
import { GitHubActivity } from '@/components/sections/GitHubActivity'
import { DSAActivity } from '@/components/sections/DSAActivity'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Education />
        <GitHubActivity />
        <DSAActivity />
      </main>
      <Footer />
    </>
  )
}
```

**Important:** `page.tsx` is a Server Component. It does NOT have `"use client"`. Each section component is its own client/server boundary. Only components that use hooks or animations need `"use client"`.

---

## 6.3 Section IDs

Every section must have a matching `id` attribute for anchor navigation and scroll-spy to work.

| Component | `id` attribute |
|---|---|
| Hero | `id="hero"` |
| About | `id="about"` |
| Projects | `id="projects"` |
| Experience | `id="experience"` |
| Education | `id="education"` |
| GitHubActivity | `id="github"` |
| DSAActivity | `id="dsa"` |

Apply to the outer `<section>` element in each component.

---

## 6.4 Scroll-Spy Implementation

The Navbar needs to know which section is currently in view. Implement this as a custom hook.

Create `src/lib/hooks/useActiveSection.ts`:

```ts
'use client'
import { useEffect, useState } from 'react'

const SECTION_IDS = ['hero', 'about', 'projects', 'experience', 'education', 'github', 'dsa']

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('hero')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach(id => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        {
          rootMargin: '-40% 0px -40% 0px', // section is "active" when in middle 20% of viewport
          threshold: 0,
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return activeSection
}
```

Use in `Navbar.tsx`:
```tsx
const activeSection = useActiveSection()
// Apply active style when navLink.href === `#${activeSection}`
```

---

## 6.5 Navbar Scroll Behaviour

The Navbar transitions from transparent to opaque as the user scrolls past the hero.

```ts
// In Navbar.tsx
const [scrolled, setScrolled] = useState(false)

useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 80)
  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

Apply conditionally:
```tsx
<nav className={cn(
  'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
  scrolled
    ? 'bg-bg-primary/90 backdrop-blur-md border-b border-border'
    : 'bg-transparent'
)}>
```

---

## 6.6 Section Spacing

All sections use consistent vertical spacing. Apply this pattern:

```tsx
<section id="about" className="section-pad">
  <div className="container-main">
    {/* content */}
  </div>
</section>
```

Exception: Hero section uses `min-h-[100dvh]` instead of `section-pad`.

---

## 6.7 Lazy Loading Heavy Sections

To keep initial load fast, lazily load the data-heavy sections:

```tsx
// In page.tsx
import dynamic from 'next/dynamic'

const GitHubActivity = dynamic(
  () => import('@/components/sections/GitHubActivity').then(m => m.GitHubActivity),
  {
    loading: () => <div className="section-pad container-main h-64 animate-pulse bg-bg-secondary" />,
    ssr: false, // These sections use client-side data fetching
  }
)

const DSAActivity = dynamic(
  () => import('@/components/sections/DSAActivity').then(m => m.DSAActivity),
  {
    loading: () => <div className="section-pad container-main h-64 animate-pulse bg-bg-secondary" />,
    ssr: false,
  }
)
```

Keep Hero, About, Projects, Experience, and Education as static imports — they render immediately and shouldn't be lazy.

---

## 6.8 Assembly Checklist

- [ ] All sections visible and in correct order when scrolling
- [ ] Navbar links scroll to correct sections
- [ ] Scroll-spy highlights correct link as you scroll
- [ ] Navbar becomes opaque after scrolling past hero
- [ ] No console errors about missing `"use client"` directives
- [ ] `GitHubActivity` and `DSAActivity` show loading skeletons, then real data
- [ ] Footer appears after DSA section

---

Proceed to `07_seo.md`.
