import { ArrowUpRight } from 'lucide-react'
import { Shell } from '@/components/Shell'
import { Eyebrow } from '@/components/Eyebrow'
import { LogoMark } from '@/components/icons/LogoMark'
import { Reveal } from '@/components/motion/Reveal'
import { LineReveal } from '@/components/motion/LineReveal'
import { WORKS } from '@/data/content'

export function Portfolio() {
  return (
    <section id="works" className="bg-background">
      <Shell className="pt-10 pb-20 lg:pb-28">
        <div className="mb-12 flex flex-col items-center gap-5 text-center">
          <Reveal>
            <Eyebrow className="mx-auto w-fit rounded-pill border border-line px-4 py-1.5">
              Portfolio
            </Eyebrow>
          </Reveal>
          <LineReveal
            as="h2"
            delay={120}
            lines={['Selected Work']}
            className="w-fit text-4xl font-semibold tracking-[-0.02em] sm:text-5xl"
          />
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {WORKS.map((w, i) => (
            <Reveal key={w.name} as="li" delay={i * 90} y={48} duration={600}>
              <a
                href="#"
                className="group relative block min-h-88 overflow-hidden rounded-card bg-ink p-6 text-white shadow-[0_0_0_1px_rgba(255,255,255,.05)] transition-transform duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-2 hover:scale-[1.012] sm:min-h-104 sm:p-8"
              >
                <div className="relative z-10 flex justify-between text-xs uppercase tracking-[0.025em] text-white/45">
                  <span>{w.category} — {w.year}</span>
                  <span className="grid size-11 place-items-center rounded-pill bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,.15)] transition-transform duration-[400ms] ease-[cubic-bezier(.2,.75,.3,1)] group-hover:rotate-45 group-hover:scale-[1.08]">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>

                <div className="pointer-events-none absolute inset-0 grid place-items-center">
                  <div className="relative">
                    <LogoMark className="size-18 text-white/90" />
                    <span className="absolute -right-2 top-0 text-xs text-white/60">®</span>
                  </div>
                </div>

                <div className="absolute inset-x-6 bottom-6 z-10 sm:inset-x-8 sm:bottom-8">
                  <h3 className="text-2xl font-medium tracking-[-0.01em] sm:text-3xl">{w.name}</h3>
                  <p className="mt-2 max-w-md text-sm text-white/55">{w.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {w.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex rounded-pill border border-white/25 px-4 py-2 text-sm text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </Shell>
    </section>
  )
}
