'use client'

import { useEffect, useState } from 'react'
import { DESIGN_WIDTH, DESIGN_HEIGHT } from '../lib/constants'

export default function ScreenAdapter({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const scaleX = w / DESIGN_WIDTH
      const scaleY = h / DESIGN_HEIGHT
      setScale(Math.min(scaleX, scaleY))
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center">
      <div
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          flexShrink: 0,
        }}
      >
        {children}
      </div>
    </div>
  )
}
