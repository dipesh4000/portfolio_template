import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span className={cn('font-mono text-xs tracking-[0.3em] uppercase', className)}
      style={{ color: 'var(--hollow)' }}>
      [ {children} ]
    </span>
  )
}
