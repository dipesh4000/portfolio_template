# 07 — SEO Architecture

## 7.1 Full Metadata in `layout.tsx`

Replace the minimal metadata from `06_page_assembly.md` with this complete version:

```tsx
import type { Metadata } from 'next'
import { person } from '@/data/config'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://localhost:3000'
const fullName = person.name
const title = `${fullName} — ${person.title}`
const description = `${person.bio[0]} Based in ${person.location}.`

export const metadata: Metadata = {
  // Basic
  title: {
    default: title,
    template: `%s | ${fullName}`,
  },
  description,
  keywords: [
    fullName,
    person.title,
    'developer portfolio',
    'full stack developer',
    person.location,
    ...person.skillCategories.flatMap(c => c.skills).slice(0, 8),
  ],
  authors: [{ name: fullName }],
  creator: fullName,

  // Canonical
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },

  // Open Graph
  openGraph: {
    type: 'website',
    url: siteUrl,
    title,
    description,
    siteName: `${fullName} Portfolio`,
    images: [
      {
        url: '/og-image.png',   // Create this file — see §7.3
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },

  // Twitter card
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
    // creator: '@your_twitter_handle', // uncomment if you have Twitter
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },

  // Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}
```

---

## 7.2 JSON-LD Structured Data

Add this inside `layout.tsx`, inside the `<head>` (use Next.js `<Script>` or inline `<script type="application/ld+json">`).

The cleanest approach in App Router:

```tsx
// In layout.tsx, inside <html><body>:

function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.title,
    description: person.bio[0],
    url: process.env.NEXT_PUBLIC_SITE_URL,
    sameAs: person.socials.map(s => s.url),
    knowsAbout: person.skillCategories.flatMap(c => c.skills),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Then inside <body>:
// <JsonLd />
```

---

## 7.3 OG Image — `/public/og-image.png`

The OG image is what appears when your portfolio link is shared on LinkedIn, Twitter, WhatsApp.

**Recommended approach:** Create a static 1200×630px image manually.
- Dark background `#0B0B0B`
- Your name in large Shippori Mincho-style text
- Title in smaller Space Grotesk
- Subtle diagonal slash line
- Bottom left: your domain URL

**Tools:** Figma, Canva, or use Next.js `ImageResponse` (see below).

**Alternative: Dynamic OG with Next.js ImageResponse**

Create `src/app/og/route.tsx`:

```tsx
import { ImageResponse } from 'next/og'
import { person } from '@/data/config'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0B0B0B',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          color: 'white',
          fontFamily: 'serif',
        }}
      >
        <div style={{ fontSize: 14, color: '#F5A623', letterSpacing: '0.2em', marginBottom: 24 }}>
          PORTFOLIO
        </div>
        <div style={{ fontSize: 80, fontWeight: 700, lineHeight: 0.95 }}>
          {person.name}
        </div>
        <div style={{ fontSize: 28, color: '#BFBFBF', marginTop: 20 }}>
          {person.title}
        </div>
        <div style={{ position: 'absolute', bottom: 80, left: 80, fontSize: 14, color: '#666' }}>
          {process.env.NEXT_PUBLIC_SITE_URL}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
```

Then update the `openGraph.images` URL in metadata to `/og`.

---

## 7.4 Sitemap — `src/app/sitemap.ts`

```ts
import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
```

---

## 7.5 Robots — `src/app/robots.ts`

```ts
import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://localhost:3000'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
```

---

## 7.6 Favicon Setup

Place these files in `/public/`:

```
public/
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png    (180×180)
└── og-image.png            (1200×630)
```

**Generate them free at:** https://realfavicongenerator.net

Use your initials ("D") styled in Shippori Mincho on a `#0B0B0B` background with `#F5A623` text as the source image.

---

## 7.7 SEO Checklist

- [ ] `NEXT_PUBLIC_SITE_URL` set to your real domain in Vercel env vars
- [ ] `og-image.png` exists in `/public/`
- [ ] Test OG tags at https://opengraph.xyz with your deployed URL
- [ ] Test Twitter card at https://cards-dev.twitter.com/validator
- [ ] Verify JSON-LD at https://search.google.com/test/rich-results
- [ ] `/sitemap.xml` accessible at your domain
- [ ] `/robots.txt` accessible at your domain
- [ ] Submit sitemap in Google Search Console after deploy

---

Proceed to `08_performance.md`.
