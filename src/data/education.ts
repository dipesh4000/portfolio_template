import { z } from 'zod'
import { EducationSchema } from '@/lib/schemas'

const raw = [
  {
    institution: 'Maharaja Surajmal Institute of Technology',
    degree: 'Bachelor of Technology',
    field: 'Computer Science',
    startDate: '2024-08',
    endDate: '2028-05',
    description: 'Focused on algorithms, data structures, and system design. Active competitive programmer.',
  },
]

export const education = z.array(EducationSchema).parse(raw)
