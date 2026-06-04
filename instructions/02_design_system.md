# 02 — Design System

## 2.1 globals.css

Replace `src/app/globals.css` entirely:

```css
@import url('https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;700&family=Space+Grotesk:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Colors */
  --bg-primary: #0B0B0B;
  --bg-secondary: #121212;
  --text-primary: #FFFFFF;
  --text-secondary: #BFBFBF;
  --text-muted: #666666;
  --accent: #F5A623;
  --accent-dim: rgba(245, 166, 35, 0.15);
  --accent-glow: rgba(245, 166, 35, 0.06);
  --border: rgba(255, 255, 255, 0.08);
  --border-accent: rgba(245, 166, 35, 0.3);

  /* Typography */
  --font-display: 'Shippori Mincho', serif;
  --font-sans: 'Space Grotesk', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing scale */
  --section-padding: clamp(80px, 12vw, 140px);
  --container-max: 1100px;

  /* Transitions */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Base resets */
*, *::before, *::after { box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: var(--accent) var(--bg-secondary);
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.7;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* Selection */
::selection {
  background: var(--accent);
  color: var(--bg-primary);
}

/* Scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg-secondary); }
::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

/* Noise texture overlay — applied via ::before on body */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 128px 128px;
  opacity: 0.4;
  mix-blend-mode: overlay;
}

/* Container utility */
.container-main {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 60px);
}

/* Section padding utility */
.section-pad {
  padding-top: var(--section-padding);
  padding-bottom: var(--section-padding);
}

/* Slash line — the Zangetsu divider */
.slash-line {
  display: block;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.4;
}

/* Section label — small uppercase mono label above headings */
.section-label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 10px;
}
.section-label::before {
  content: '';
  display: inline-block;
  width: 24px;
  height: 1px;
  background: var(--accent);
}

/* Heading styles */
.heading-xl {
  font-family: var(--font-display);
  font-size: clamp(52px, 9vw, 110px);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.02em;
}

.heading-lg {
  font-family: var(--font-display);
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

.heading-md {
  font-family: var(--font-sans);
  font-size: clamp(20px, 2.5vw, 28px);
  font-weight: 500;
  letter-spacing: -0.01em;
}

/* Mono small — used for dates, labels, tags */
.mono-sm {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}

/* Card style */
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 2px;
  transition: border-color 0.3s var(--ease-in-out);
}
.card:hover {
  border-color: var(--border-accent);
}

/* Accent text */
.text-accent { color: var(--accent); }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Font choice rationale:**
- `Shippori Mincho` — Japanese serif. Used for display headings. Has East Asian energy, feels like brush calligraphy in weight-700. Perfect Zangetsu energy without being obvious.
- `Space Grotesk` — geometric sans. Body copy and UI.
- `JetBrains Mono` — section labels, dates, tags, code.

---

## 2.2 Utility Function — `src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}
```

---

## 2.3 Font Setup in `layout.tsx` (preview — full version in `06_page_assembly.md`)

The fonts are loaded via Google Fonts in `globals.css`. Declare CSS variables in `:root` so Tailwind's `font-display`, `font-sans`, `font-mono` classes resolve correctly. This is already done in the globals above.

---

## 2.4 Reusable UI Primitives

### `src/components/ui/SectionLabel.tsx`

```tsx
interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span className={`section-label ${className ?? ''}`}>
      {children}
    </span>
  )
}
```

### `src/components/ui/SwordDivider.tsx`

The Zangetsu-inspired horizontal divider. Used between timeline items and as section separators.

```tsx
'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SwordDividerProps {
  className?: string
  delay?: number
  /** 'full' spans container width. 'short' is 60px. */
  variant?: 'full' | 'short'
}

export function SwordDivider({ className, delay = 0, variant = 'full' }: SwordDividerProps) {
  return (
    <motion.div
      className={cn('relative flex items-center', className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
    >
      <motion.div
        className={cn(
          'h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-30',
          variant === 'full' ? 'w-full' : 'w-[60px]'
        )}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'left' }}
        viewport={{ once: true }}
      />
      {/* Slash accent dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full opacity-60" />
    </motion.div>
  )
}
```

### `src/components/ui/GlitchText.tsx`

Used for the hero name. Subtle glitch effect on hover.

```tsx
'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface GlitchTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'span' | 'p'
}

const GLITCH_CHARS = '斬月空虚白月牙'

export function GlitchText({ text, className, as: Tag = 'span' }: GlitchTextProps) {
  const [glitching, setGlitching] = useState(false)
  const [displayText, setDisplayText] = useState(text)

  function handleMouseEnter() {
    setGlitching(true)
    let iterations = 0
    const maxIterations = text.length * 3

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < iterations / 3) return text[i]
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          })
          .join('')
      )
      iterations++
      if (iterations > maxIterations) {
        clearInterval(interval)
        setDisplayText(text)
        setGlitching(false)
      }
    }, 40)
  }

  return (
    <Tag
      className={cn('cursor-default select-none', className)}
      onMouseEnter={handleMouseEnter}
      data-glitching={glitching}
    >
      {displayText}
    </Tag>
  )
}
```

### `src/components/ui/ReiatsuParticles.tsx`

Lightweight canvas particle system. Used in the Hero section background. Respects `prefers-reduced-motion`.

```tsx
'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  opacityDelta: number
}

export function ReiatsuParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function createParticle(): Particle {
      return {
        x: Math.random() * (canvas?.width ?? 0),
        y: Math.random() * (canvas?.height ?? 0),
        size: Math.random() * 1.5 + 0.3,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.4 - 0.1,
        opacity: Math.random() * 0.4 + 0.1,
        opacityDelta: (Math.random() - 0.5) * 0.005,
      }
    }

    function init() {
      // Max 60 particles — performance budget
      particles = Array.from({ length: 60 }, createParticle)
    }

    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.speedX
        p.y += p.speedY
        p.opacity += p.opacityDelta

        if (p.opacity <= 0.05 || p.opacity >= 0.5) p.opacityDelta *= -1
        if (p.y < -10) particles[i] = createParticle()

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245, 166, 35, ${p.opacity})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(draw)
    }

    resize()
    init()
    draw()

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
```

---

## 2.5 Design Tokens Quick Reference

Use these everywhere. Never hardcode hex values outside of `globals.css`.

| Token | Value | Usage |
|---|---|---|
| `var(--bg-primary)` | `#0B0B0B` | Page background |
| `var(--bg-secondary)` | `#121212` | Card backgrounds |
| `var(--text-primary)` | `#FFFFFF` | Headings, body |
| `var(--text-secondary)` | `#BFBFBF` | Descriptions, subtitles |
| `var(--text-muted)` | `#666666` | Dates, labels, tags |
| `var(--accent)` | `#F5A623` | Accent only. Use sparingly. |
| `var(--border)` | `rgba(255,255,255,0.08)` | Card borders |
| `var(--font-display)` | Shippori Mincho | H1, H2 headings |
| `var(--font-sans)` | Space Grotesk | Body, UI |
| `var(--font-mono)` | JetBrains Mono | Labels, dates, tags |

---

Proceed to `03_config_architecture.md`.
