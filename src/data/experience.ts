import { z } from 'zod'
import { ExperienceSchema } from '@/lib/schemas'

const raw = [
  {
    company: 'LearnQ.ai',
    role: 'Software Engineer Intern',
    type: 'internship' as const,
    startDate: '2024-05',
    endDate: '2024-08',
    description: [
      'Optimized production data engines, reducing query latency significantly.',
      'Built custom state management architectures with FastAPI backends.',
      'Collaborated on cross-functional features shipped to thousands of users.',
    ],
    techStack: ['React', 'FastAPI', 'PostgreSQL', 'TypeScript'],
  },
  {
    company: 'WardAir',
    role: 'Software Developer',
    type: 'freelance' as const,
    startDate: '2024-01',
    endDate: '2024-04',
    description: [
      'Handled local atmospheric telemetry data pipeline and visualization.',
      'Built REST APIs for real-time weather data ingestion.',
    ],
    techStack: ['Python', 'Node.js', 'MongoDB'],
  },
]

export const experience = z.array(ExperienceSchema).parse(raw)
