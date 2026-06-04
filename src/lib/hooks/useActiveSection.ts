'use client'
import { useEffect, useState } from 'react'

const SECTION_IDS = ['hero', 'about', 'projects', 'experience', 'education', 'github', 'dsa']

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('hero')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return activeSection
}
