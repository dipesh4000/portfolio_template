import type { Metadata } from 'next'
import './globals.css'
import { person } from '@/data/config'
import { ThemeProvider } from '@/components/ui/ThemeProvider'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const title = `${person.name} — ${person.title}`
const description = `${person.bio[0]} Based in ${person.location}.`

export const metadata: Metadata = {
  title: { default: title, template: `%s | ${person.name}` },
  description,
  keywords: [
    person.name, person.title, 'developer portfolio', 'full stack developer',
    person.location,
    ...person.skillCategories.flatMap(c => c.skills).slice(0, 8),
  ],
  authors: [{ name: person.name }],
  creator: person.name,
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title,
    description,
    siteName: `${person.name} Portfolio`,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/favicon.ico',
  },
}

function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.title,
    description: person.bio[0],
    url: siteUrl,
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body>
        <JsonLd />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
