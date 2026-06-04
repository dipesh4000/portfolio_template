'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface GlitchTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'span' | 'p'
}

const GLITCH_CHARS = '斬月空虚白月牙'

export function GlitchText({ text, className, as: Tag = 'span' }: GlitchTextProps) {
  const [glitching, setGlitching] = useState(false)
  const [displayText, setDisplayText] = useState(text)

  function handleMouseEnter() {
    setGlitching(true)
    let iterations = 0
    const maxIterations = text.length * 3

    const interval = setInterval(() => {
      setDisplayText(
        text.split('').map((char, i) => {
          if (char === ' ') return ' '
          if (i < iterations / 3) return text[i]
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        }).join('')
      )
      iterations++
      if (iterations > maxIterations) {
        clearInterval(interval)
        setDisplayText(text)
        setGlitching(false)
      }
    }, 40)
  }

  return (
    <Tag
      className={cn('cursor-default select-none', className)}
      onMouseEnter={handleMouseEnter}
      data-glitching={glitching}
    >
      {displayText}
    </Tag>
  )
}
