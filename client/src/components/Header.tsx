import { Menu } from 'lucide-react'
import { LogoMark } from '@/components/icons/LogoMark'
import { Shell } from '@/components/Shell'
import { useClock } from '@/hooks/useClock'
import { useReady } from '@/lib/ready-context'
import { scrollToId } from '@/lib/scroll'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Home', id: 'home', current: true },
  { label: 'Work', id: 'works' },
  { label: 'Services', id: 'services', caret: true },
  { label: 'Studio', id: 'about' },
  { label: 'Careers', id: 'careers' },
  { label: 'Contact', id: null },
] as const

export function Header({
  onOpenMenu,
  onOpenModal,
}: {
  onOpenMenu: () => void
  onOpenModal: () => void
}) {
  const ready = useReady()
  const clock = useClock()

  const go = (id: string | null) => (id ? scrollToId(id) : onOpenModal())

  return (
    <header
      className="absolute inset-x-0 top-0 z-50 transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
      style={{
        opacity: ready ? 1 : 0,
        transform: ready ? 'translateY(0)' : 'translateY(-14px)',
        transitionDelay: '150ms',
      }}
    >
      <Shell className="flex items-center justify-between gap-6 py-5 sm:py-6">
        <button
          onClick={() => scrollToId('home')}
          className="group flex items-center gap-2 text-lg font-semibold tracking-[-0.01em]"
        >
          <span className="flex items-center gap-2 transition-transform duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.04]">
            <LogoMark className="size-5 text-accent" />
            Lumora
          </span>
        </button>

        <nav className="hidden lg:flex">
          <ul className="flex gap-8 text-sm font-medium">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <button
                  aria-current={'current' in item && item.current ? 'page' : undefined}
                  onClick={() => go(item.id)}
                  className="inline-flex items-center gap-1 opacity-80 transition-[transform,opacity] duration-[350ms] ease-[cubic-bezier(.2,.7,.3,1)] hover:-translate-y-0.5 hover:opacity-100"
                >
                  {item.label}
                  {'caret' in item && item.caret && (
                    <span className="text-xs opacity-60">▾</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3 rounded-control border border-line/80 bg-white/40 px-3 py-2 text-xs text-foreground/70 backdrop-blur-sm">
            <span className="text-foreground/45">Local time</span>
            <span className="min-w-14 font-medium tabular-nums text-foreground">
              {clock.time}
            </span>
            <span className="text-foreground/30">•</span>
            <span className="font-medium">{clock.date}</span>
          </div>
          <button
            onClick={onOpenMenu}
            className={cn(
              'rounded-control border border-line/80 bg-white/40 backdrop-blur-sm transition-colors hover:bg-white/70',
            )}
          >
            <span className="flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-[0.05em] transition-transform duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)] hover:scale-105">
              <Menu className="size-3.5" />
              <span className="hidden sm:inline">Menu</span>
            </span>
          </button>
        </div>
      </Shell>
    </header>
  )
}
