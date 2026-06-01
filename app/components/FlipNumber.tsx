'use client'

import { useEffect, useRef, useState } from 'react'

interface FlipNumberProps {
  value: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
}

export default function FlipNumber({ value, duration = 1500, className = '', prefix = '', suffix = '' }: FlipNumberProps) {
  const [display, setDisplay] = useState(0)
  const startRef = useRef(0)
  const fromRef = useRef(0)
  const toRef = useRef(value)
  const rafRef = useRef<number>()

  useEffect(() => {
    fromRef.current = display
    toRef.current = value
    startRef.current = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(fromRef.current + (toRef.current - fromRef.current) * eased)
      setDisplay(current)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [value, duration])

  const formatted = display.toLocaleString('en-US')

  return (
    <span className={`font-digital tabular-nums ${className}`}>
      {prefix}{formatted}{suffix}
    </span>
  )
}
