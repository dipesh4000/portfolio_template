'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useActiveSection } from '@/lib/hooks/useActiveSection'

const NAV_LINKS = [
  { label: 'Home',       href: '#hero' },
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#databank' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'DSA',        href: '#dsa' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
      style={{
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        borderBottom: scrolled ? '2px solid var(--ink)' : 'none',
      }}
    >
      <div className="container-main flex items-center justify-between h-16">

        {/* Logo */}
        <a href="#hero" className="font-brutalist font-black text-xl uppercase tracking-widest flex items-baseline gap-2"
          style={{ color: 'var(--ink)' }}>
          KUROSAKI
          <span className="font-brutalist text-sm" style={{ color: 'var(--red)' }}>一護</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => {
            const isActive = active === link.href.slice(1)
            return (
              <a key={link.href} href={link.href}
                className="font-mono text-xs tracking-widest uppercase relative transition-colors"
                style={{ color: isActive ? 'var(--red)' : 'var(--text-muted)' }}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-px" style={{ background: 'var(--red)' }} />
                )}
              </a>
            )
          })}
          {/* Availability badge */}
          <span className="font-mono text-xs px-2.5 py-1 uppercase tracking-widest"
            style={{ border: '1px solid var(--red)', color: 'var(--red)', background: 'rgba(184,0,0,0.06)' }}>
            ● Available
          </span>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(v => !v)} aria-label="Menu"
          className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5">
          <span className={cn('block w-5 h-0.5 transition-all', menuOpen && 'rotate-45 translate-y-2')}
            style={{ background: 'var(--ink)' }} />
          <span className={cn('block w-5 h-0.5 transition-all', menuOpen && 'opacity-0')}
            style={{ background: 'var(--ink)' }} />
          <span className={cn('block w-5 h-0.5 transition-all', menuOpen && '-rotate-45 -translate-y-2')}
            style={{ background: 'var(--ink)' }} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="md:hidden px-6 py-6 flex flex-col gap-5"
            style={{ background: 'var(--nav-bg)', borderBottom: '2px solid var(--ink)' }}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}
          >
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="font-mono text-sm tracking-widest uppercase"
                style={{ color: active === link.href.slice(1) ? 'var(--red)' : 'var(--text-muted)' }}>
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
