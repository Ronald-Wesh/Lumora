import { useEffect, useRef, useState } from 'react'
import { getLenis } from '@/lib/scroll'

/** Counts 0 -> target as the element scrolls from viewport-bottom to viewport-center. */
export function useCountUp(target: number) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    let lastRun = 0
    function update() {
      const now = performance.now()
      if (now - lastRun < 30) return
      lastRun = now
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh
      const end = vh / 2
      const point = rect.top + rect.height / 2
      let progress = (start - point) / (start - end)
      progress = Math.max(0, Math.min(1, progress))
      setValue(Math.round(progress * target))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    const lenis = getLenis()
    lenis?.on('scroll', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      lenis?.off('scroll', update)
    }
  }, [target])

  return { ref, value }
}
