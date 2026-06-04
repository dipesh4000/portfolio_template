import { z } from 'zod'
import { ProjectSchema } from '@/lib/schemas'

const raw = [
  {
    id: 'project-soulforge',
    title: 'SoulForge Portfolio',
    description: 'A Bleach-inspired portfolio built with Next.js, Typescript, and Tailwind CSS, featuring live Codolio metrics and immersive dark UI systems.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    repoUrl: 'https://github.com/dipesh4000/bleach-portfolio',
    liveUrl: 'https://bleach-portfolio.vercel.app',
    featured: true,
    year: '2026',
  },
  {
    id: 'project-codolio-pulse',
    title: 'Codolio Pulse',
    description: 'A realtime dashboard that pulls DSA and GitHub performance directly from Codolio, with a high-contrast UI and progress-driven analytics.',
    tags: ['React', 'Node.js', 'API', 'Analytics'],
    repoUrl: 'https://github.com/dipesh4000/codolio-pulse',
    liveUrl: 'https://codolio-pulse.vercel.app',
    featured: true,
    year: '2025',
  },
  {
    id: 'project-voidgrid',
    title: 'VoidGrid Studio',
    description: 'A system for visualizing user journeys and product telemetry in a refined monochrome interface, built with custom React components and motion-driven transitions.',
    tags: ['React', 'GSAP', 'UX'],
    repoUrl: 'https://github.com/dipesh4000/voidgrid-studio',
    liveUrl: 'https://voidgrid-studio.vercel.app',
    featured: true,
    year: '2025',
  },
  {
    id: 'project-wardair',
    title: 'WardAir Platform',
    description: 'A telemetry-driven weather pipeline and dashboard built with FastAPI, MongoDB, and interactive mapping components.',
    tags: ['Python', 'FastAPI', 'MongoDB'],
    repoUrl: 'https://github.com/dipesh4000/wardair-platform',
    featured: false,
    year: '2024',
  },
  {
    id: 'project-dsahub',
    title: 'DSA Hub',
    description: 'A study portal for competitive programming with problem tracking, analytics, and personalised DSA progress summaries.',
    tags: ['JavaScript', 'Express', 'PostgreSQL'],
    repoUrl: 'https://github.com/dipesh4000/dsa-hub',
    featured: false,
    year: '2024',
  },
]

export const projects = z.array(ProjectSchema).parse(raw)
export const featuredProjects = projects.filter(p => p.featured)
