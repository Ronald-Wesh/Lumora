import { Star, CircleDot } from 'lucide-react'
import { Shell } from '@/components/Shell'
import { Eyebrow } from '@/components/Eyebrow'
import { PillButton } from '@/components/PillButton'
import { Reveal } from '@/components/motion/Reveal'
import { LineReveal } from '@/components/motion/LineReveal'
import { LiquidReveal } from '@/components/hero/LiquidReveal'
import { HeroCard } from '@/components/hero/HeroCard'
import { useReady } from '@/lib/ready-context'
import { scrollToId } from '@/lib/scroll'

const PARTNERS = ['Kaido', 'Northpeak', 'Vellum', 'Orbit', 'Brightline', 'Cobalt', 'Mesa']

export function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  const ready = useReady()

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden rounded-b-card bg-hero-to"
    >
      <LiquidReveal />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(255,255,255,.35),transparent,rgba(255,255,255,.35))]" />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-28 z-[1] select-none text-center font-bold leading-none text-white/40 transition-[opacity,transform] duration-1000 ease-[cubic-bezier(.16,1,.3,1)]"
        style={{
          fontSize: 'var(--text-watermark)',
          opacity: ready ? 0.4 : 0,
          transform: ready ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: '300ms',
        }}
      >
        LUMORA
      </div>

      <Shell className="relative z-20 flex flex-col gap-8 pt-28 pb-20 lg:grid lg:min-h-[100lvh] lg:grid-cols-12 lg:gap-10 lg:pt-36 lg:pb-28">
        <div className="flex flex-col gap-7 lg:col-span-7">
          <Reveal mode="gated" delay={200} y={10}>
            <Eyebrow>Independent Studio</Eyebrow>
          </Reveal>

          <LineReveal
            as="h1"
            mode="gated"
            delay={250}
            lineStagger={120}
            lines={['Bold ideas,', 'shipped with', 'quiet precision']}
            className="max-w-[18ch] text-4xl font-semibold leading-[0.98] tracking-[-0.02em] sm:text-5xl md:text-6xl"
          />

          <Reveal mode="gated" delay={650} y={10}>
            <div className="flex items-center gap-3">
              <span className="flex text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </span>
              <span className="text-sm font-medium text-foreground/70">
                200+ brands shipped
              </span>
            </div>
          </Reveal>

          <Reveal mode="gated" delay={750} y={10}>
            <div className="flex flex-wrap gap-3">
              <PillButton variant="dark" arrow="right" onClick={onOpenModal}>
                Let&apos;s Talk
              </PillButton>
              <PillButton variant="outline" onClick={() => scrollToId('works')}>
                View Work
              </PillButton>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col items-start gap-8 lg:col-span-5 lg:items-end">
          <Reveal mode="gated" delay={400} y={16} scale>
            <HeroCard />
          </Reveal>

          <Reveal mode="gated" delay={550} y={14}>
            <div className="w-full max-w-96 lg:w-76">
              <div className="mb-3 text-left text-xs font-medium text-foreground/45 lg:text-right">
                Trusted by
              </div>
              <div className="grid grid-cols-4 gap-x-4 gap-y-3">
                {PARTNERS.map((name) => (
                  <span
                    key={name}
                    className="flex items-center gap-1.5 text-xs text-foreground/70 opacity-70 transition-[transform,opacity] duration-300 ease-[cubic-bezier(.2,.75,.35,1)] hover:-translate-y-0.5 hover:opacity-100"
                  >
                    <CircleDot className="size-3.5 flex-shrink-0 text-foreground/40" />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Shell>

      <Reveal mode="gated" delay={900} className="relative z-20">
        <Shell className="flex items-center justify-between gap-3 border-t border-foreground/10 py-5 text-xs font-medium uppercase tracking-[0.025em] text-foreground/60">
          <span>Working since 2014</span>
          <span className="hidden sm:block">Remote-first, worldwide</span>
          <span className="inline-flex items-center gap-2">
            Scroll to explore <span>↓</span>
          </span>
        </Shell>
      </Reveal>
    </section>
  )
}
