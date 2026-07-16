import { Globe, X, CircleDot } from 'lucide-react'
import { Shell } from '@/components/Shell'
import { Eyebrow } from '@/components/Eyebrow'
import { PillButton } from '@/components/PillButton'
import { Reveal } from '@/components/motion/Reveal'
import { WordReveal } from '@/components/motion/WordReveal'
import { scrollToId } from '@/lib/scroll'

export function About() {
  return (
    <section id="about" className="bg-background">
      <Shell className="grid grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div className="relative min-h-56 sm:min-h-64 lg:min-h-80">
          <Globe className="absolute left-[-1rem] top-1/2 size-48 -translate-y-1/2 text-foreground/10 sm:size-64 lg:left-[-1.5rem] lg:size-80" />
          <div className="relative">
            <Eyebrow>The Studio</Eyebrow>
          </div>
          <Reveal className="absolute bottom-0 left-0 flex items-center gap-3 text-sm text-foreground/70" y={12} duration={700}>
            <Globe className="size-6 flex-shrink-0 text-foreground" />
            <span className="max-w-56">
              A distributed team building across every time zone.
            </span>
          </Reveal>
        </div>

        <div className="flex flex-col gap-10">
          <WordReveal
            className="text-2xl font-medium leading-[1.35] tracking-[-0.01em] sm:text-3xl"
            segments={[
              { text: 'We partner with ambitious teams to ship ' },
              {
                text: 'digital products, brand systems, and the strategy that holds them together.',
                muted: true,
              },
            ]}
          />

          <Reveal
            y={12}
            delay={200}
            className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6"
          >
            <div>
              <div className="mb-2 text-sm text-foreground/45">Find us online</div>
              <div className="flex gap-2">
                <a
                  href="#"
                  aria-label="X / Twitter"
                  className="group grid size-9 place-items-center rounded-pill bg-accent text-white"
                >
                  <X className="size-3.5 transition-transform duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.18]" />
                </a>
                <a
                  href="#"
                  aria-label="Behance"
                  className="group grid size-9 place-items-center rounded-pill bg-surface text-foreground/70"
                >
                  <CircleDot className="size-3.5 transition-transform duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.18]" />
                </a>
                <a
                  href="#"
                  aria-label="Dribbble"
                  className="group grid size-9 place-items-center rounded-pill bg-surface text-foreground/70"
                >
                  <CircleDot className="size-3.5 transition-transform duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.18]" />
                </a>
              </div>
            </div>
            <PillButton variant="outline" arrow="right" onClick={() => scrollToId('about')}>
              About Us
            </PillButton>
          </Reveal>
        </div>
      </Shell>
    </section>
  )
}
