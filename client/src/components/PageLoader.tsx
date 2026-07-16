import { useEffect, useRef, useState } from 'react'
import { LogoMark } from '@/components/icons/LogoMark'
import { stopScroll, startScroll } from '@/lib/scroll'

const FILL_MS = 1300

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function PageLoader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [mounted, setMounted] = useState(true)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    stopScroll()
    let raf: number
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now
      const t = Math.min((now - startRef.current) / FILL_MS, 1)
      setProgress(Math.round(easeInOutCubic(t) * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setExiting(true)
        setTimeout(() => {
          startScroll()
          setMounted(false)
          onDone()
        }, 700)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      startScroll()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!mounted) return null

  return (
    <div
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-8 bg-ink text-white rounded-b-card transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
      style={{ transform: exiting ? 'translateY(-100%)' : 'translateY(0)' }}
    >
      <div
        className="flex flex-col items-center gap-5 text-center transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(.16,1,.3,1)]"
        style={{
          opacity: exiting ? 0 : 1,
          transform: exiting ? 'translateY(-12px)' : 'translateY(0)',
        }}
      >
        <div className="flex items-center gap-2 text-2xl sm:text-3xl font-semibold">
          <LogoMark className="size-[1.875rem] text-accent-from" />
          Lumora
        </div>
        <p className="max-w-[24ch] text-sm text-white/55">
          Bold ideas, shipped with quiet precision.
        </p>
      </div>
      <div className="flex w-[min(22rem,72vw)] flex-col gap-3">
        <div className="h-px bg-white/15">
          <div
            className="h-full bg-accent-from transition-[width] duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs font-medium uppercase tracking-[0.05em] text-white/45">
          <span>Loading</span>
          <span className="tabular-nums text-white/80">
            {String(progress).padStart(3, '0')}
          </span>
        </div>
      </div>
    </div>
  )
}
