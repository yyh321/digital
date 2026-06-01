import { useEffect, useState } from 'react'
import { DESIGN_WIDTH, DESIGN_HEIGHT } from '../lib/constants'

export function useScreenScale() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      setScale(Math.min(window.innerWidth / DESIGN_WIDTH, window.innerHeight / DESIGN_HEIGHT))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return scale
}
