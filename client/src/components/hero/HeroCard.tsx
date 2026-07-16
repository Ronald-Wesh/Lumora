import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { LogoMark } from '@/components/icons/LogoMark'
import { cn } from '@/lib/utils'

const ITEMS = [
  { cap: 'Conversion design', title: 'Crafted to convert.' },
  { cap: 'Engineering', title: 'Built to scale.' },
  { cap: 'Brand systems', title: 'Designed to last.' },
]

export function HeroCard() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)

  const step = (d: number) => {
    setDir(d)
    setIndex((i) => (i + d + ITEMS.length) % ITEMS.length)
  }

  const item = ITEMS[index]

  return (
    <div className="w-full max-w-96 lg:w-76">
      <div className="rounded-card-sm bg-white/70 p-2 shadow-[0_1px_2px_rgba(0,0,0,.06),0_0_0_1px_rgba(230,229,226,.7)] backdrop-blur-md">
        <div
          onClick={() => step(1)}
          className="flex cursor-pointer gap-2 rounded-control"
        >
          <div className="flex aspect-square w-24 flex-shrink-0 items-center justify-center rounded-control bg-ink text-3xl text-white">
            <LogoMark className="size-8 text-accent-from" />
          </div>
          <div className="flex flex-1 flex-col justify-between rounded-control bg-surface/70 p-3 min-w-0">
            <div className="relative min-h-13">
              <div
                key={index}
                className="absolute inset-0 animate-[hero-card-in_0.5s_cubic-bezier(.2,.7,.3,1)]"
                style={{ '--from-y': `${dir > 0 ? 14 : -14}px` } as never}
              >
                <div className="text-[0.65rem] font-medium uppercase tracking-[0.05em] text-foreground/45">
                  {item.cap}
                </div>
                <div className="max-w-32 text-sm font-medium leading-[1.35]">
                  {item.title}
                </div>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex gap-1">
                {ITEMS.map((it, i) => (
                  <span
                    key={it.cap}
                    className={cn(
                      'h-1 rounded-pill transition-all duration-300',
                      i === index ? 'w-4 bg-foreground/70' : 'w-1.5 bg-foreground/20',
                    )}
                  />
                ))}
              </div>
              <div className="flex gap-1">
                <button
                  aria-label="Previous"
                  onClick={(e) => {
                    e.stopPropagation()
                    step(-1)
                  }}
                  className="grid size-7 place-items-center rounded-pill bg-white text-foreground/70 shadow-[0_0_0_1px_var(--color-line)] transition-colors hover:text-foreground"
                >
                  <ArrowRight className="size-4 rotate-180" />
                </button>
                <button
                  aria-label="Next"
                  onClick={(e) => {
                    e.stopPropagation()
                    step(1)
                  }}
                  className="grid size-7 place-items-center rounded-pill bg-white text-foreground/70 shadow-[0_0_0_1px_var(--color-line)] transition-colors hover:text-foreground"
                >
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
