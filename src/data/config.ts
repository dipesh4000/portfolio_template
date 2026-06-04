import { z } from 'zod'
import { PersonSchema } from '@/lib/schemas'

const raw = {
  name: 'Dipesh Kumar',
  title: 'Full Stack Developer',
  tagline: 'I build things that work.',
  bio: [
    'Computer Science undergrad at Maharaja Surajmal Institute of Technology, crafting production-ready systems with TypeScript, Next.js, and raw computational discipline.',
    'Obsessed with clean architecture, fast data pipelines, and interfaces that feel inevitable. Currently sharpening DSA edges and building in public.',
  ],
  location: 'India',
  available: true,
  avatarUrl: 'https://lh3.googleusercontent.com/a/ACg8ocJ7esjuV65Yi-9nniWl6KZxvVyEmr7CC4-bGQtKXhXIRoN-oX4S=s96-c',
  skillCategories: [
    {
      category: 'Languages',
      skills: ['TypeScript', 'JavaScript', 'Python', 'C++', 'Java'],
    },
    {
      category: 'Frontend',
      skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'MongoDB'],
    },
    {
      category: 'Tools',
      skills: ['Git', 'Docker', 'Vercel', 'Linux'],
    },
  ],
  socials: [
    { platform: 'github' as const, url: 'https://github.com/dipesh4000', label: 'GitHub' },
    { platform: 'linkedin' as const, url: 'https://linkedin.com/in/dipesh4000', label: 'LinkedIn' },
    { platform: 'email' as const, url: 'mailto:dipeshkumar0853822@gmail.com', label: 'Email' },
  ],
}

export const person = PersonSchema.parse(raw)
