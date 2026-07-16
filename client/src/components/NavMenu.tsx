import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { LogoMark } from '@/components/icons/LogoMark'
import { Shell } from '@/components/Shell'
import { useClock } from '@/hooks/useClock'
import { stopScroll, startScroll, scrollToId } from '@/lib/scroll'
import { NAV_ROUTES } from '@/data/content'
import { cn } from '@/lib/utils'

export function NavMenu({
  open,
  onClose,
  onOpenModal,
}: {
  open: boolean
  onClose: () => void
  onOpenModal: () => void
}) {
  const clock = useClock()
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (!open) {
      setEntered(false)
      return
    }
    stopScroll()
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)))
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      startScroll()
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  const go = (id: string | null) => {
    onClose()
    setTimeout(() => (id ? scrollToId(id) : onOpenModal()), 300)
  }

  return (
    <div
      className="fixed inset-0 z-[115] flex flex-col bg-ink text-white transition-opacity duration-[550ms] ease-[cubic-bezier(.16,1,.3,1)]"
      style={{ opacity: entered ? 1 : 0 }}
    >
      <Shell className="flex items-center justify-between py-5 sm:py-6">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <LogoMark className="size-5 text-accent-from" />
          Lumora
        </div>
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-control border border-white/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.05em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
        >
          <X className="size-3.5" />
          Close
        </button>
      </Shell>

      <nav className="flex flex-1 flex-col justify-center">
        <Shell>
          <ul className="flex flex-col gap-1">
            {NAV_ROUTES.map((item, i) => (
              <li key={item.label}>
                <button
                  onClick={() => go(item.id)}
                  style={{
                    transitionDelay: `${i * 45 + 80}ms`,
                    transform: entered ? 'translateY(0)' : 'translateY(1rem)',
                    opacity: entered ? 1 : 0,
                  }}
                  className={cn(
                    'group flex w-full items-baseline gap-4 py-2 text-left text-4xl font-semibold tracking-[-0.02em] transition-all duration-500 ease-out sm:text-6xl',
                  )}
                >
                  <span className="text-base font-normal text-white/30 transition-colors group-hover:text-accent-from">
                    {item.n}
                  </span>
                  <span className="text-white/70 transition-colors group-hover:text-white">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Shell>
      </nav>

      <Shell className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs uppercase tracking-[0.025em] text-white/45 sm:flex-row sm:justify-between">
        <span>Local time — {clock.time}</span>
        <button
          onClick={() => go(null)}
          className="text-left text-white/70 transition-colors hover:text-white hover:underline"
        >
          Start a project →
        </button>
      </Shell>
    </div>
  )
}
