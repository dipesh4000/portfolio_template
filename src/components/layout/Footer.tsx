'use client'
import { person } from '@/data/config'
import { footerLinks } from '@/data/socials'

export function Footer() {
  return (
    <footer
      id="footer"
      className="w-full relative overflow-hidden"
      style={{ background: 'var(--ink)', color: 'var(--paper)', borderTop: '4px solid var(--ink)', paddingTop: '5rem', paddingBottom: '3rem' }}
    >
      {/* Ink splatter top */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" aria-hidden>
        <svg viewBox="0 0 1200 60" className="w-full" preserveAspectRatio="none" style={{ opacity: 0.3 }}>
          <path d="M0 60 Q150 20 300 45 Q450 60 600 30 Q750 5 900 40 Q1050 60 1200 25 L1200 0 L0 0Z" fill="var(--paper)" />
        </svg>
      </div>

      {/* Red kanji watermark */}
      <div
        className="absolute right-12 top-1/2 -translate-y-1/2 font-brutalist select-none pointer-events-none"
        style={{ fontSize: 'clamp(6rem, 15vw, 12rem)', color: 'var(--red)', opacity: 0.06, lineHeight: 1 }}
        aria-hidden
      >
        死神
      </div>

      <div className="container-main relative z-10">

        <div className="flex flex-col lg:flex-row gap-12 lg:items-start lg:justify-between mb-12">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="font-brutalist text-2xl uppercase tracking-widest" style={{ color: 'var(--paper)' }}>
                KUROSAKI.DEV
              </span>
              <span className="font-brutalist text-lg" style={{ color: 'var(--red)' }}>一護</span>
            </div>
            <p className="font-mono max-w-sm leading-[1.8]" style={{ fontSize: '0.85rem', color: 'rgba(242,237,228,0.55)' }}>
              A soul portfolio built from heavy ink and white space.
              Powered by code. Structured like a Hollow.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 animate-pulse-slow" style={{ background: 'var(--red)' }} />
              <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'rgba(242,237,228,0.35)' }}>
                SEIREITEI — SOUL SOCIETY
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {footerLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="footer-link"
                style={{ color: 'rgba(242,237,228,0.45)' }}
              >
                {link.label}
              </a>
            ))}
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(242,237,228,0.12)' }}>
          <span className="font-mono text-xs" style={{ color: 'rgba(242,237,228,0.3)' }}>
            © {new Date().getFullYear()} {person.name} — ALL RIGHTS RESERVED
          </span>
          <span className="font-mono text-xs" style={{ color: 'rgba(242,237,228,0.3)' }}>
            BUILT WITH BANKAI ⚔
          </span>
        </div>

      </div>
    </footer>
  )
}
