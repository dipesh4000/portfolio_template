'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SwordDividerProps {
  className?: string
  delay?: number
  variant?: 'full' | 'short'
}

export function SwordDivider({ className, delay = 0, variant = 'full' }: SwordDividerProps) {
  return (
    <motion.div
      className={cn('relative flex items-center', className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
    >
      <motion.div
        className={cn(
          'h-px bg-gradient-to-r from-transparent via-[#FF8A00] to-transparent opacity-30',
          variant === 'full' ? 'w-full' : 'w-[60px]'
        )}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'left' }}
        viewport={{ once: true }}
      />
      <div className="absolute left-1/2 -translate-x-1/2 w-1 h-1 bg-[#FF8A00] rounded-full opacity-60" />
    </motion.div>
  )
}
