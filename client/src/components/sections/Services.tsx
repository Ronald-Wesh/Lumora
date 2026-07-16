import { ArrowUpRight } from 'lucide-react'
import { Shell } from '@/components/Shell'
import { Eyebrow } from '@/components/Eyebrow'
import { Reveal } from '@/components/motion/Reveal'
import { LineReveal } from '@/components/motion/LineReveal'
import { SERVICES } from '@/data/content'

export function Services() {
  return (
    <section id="services" className="bg-background">
      <Shell className="py-20 lg:py-28">
        <Reveal>
          <Eyebrow>Services</Eyebrow>
        </Reveal>
        <LineReveal
          as="h2"
          delay={120}
          lines={['What we do best']}
          className="mt-5 mb-12 max-w-[16ch] text-4xl font-semibold tracking-[-0.02em] sm:mb-14 sm:text-5xl"
        />

        <ul>
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} as="li" delay={i * 80} y={24} duration={700} className={i > 0 ? 'border-t border-line' : ''}>
              <a
                href="#"
                className="group flex items-center gap-4 rounded-card-sm bg-surface/0 py-6 pl-0 pr-0 transition-all duration-[400ms] ease-[cubic-bezier(.2,.7,.3,1)] hover:bg-surface hover:pl-6 hover:pr-5 sm:gap-6 sm:py-8 sm:hover:pl-8 sm:hover:pr-5"
              >
                <span className="w-7 text-sm font-medium text-foreground/40 sm:w-10">{s.n}</span>
                <h3 className="flex-1 text-2xl font-medium tracking-[-0.01em] sm:text-3xl md:text-4xl">
                  {s.title}
                </h3>
                <p className="hidden max-w-80 text-sm text-foreground/55 lg:block">{s.desc}</p>
                <span className="grid size-10 flex-shrink-0 place-items-center rounded-pill bg-ink text-white transition-transform duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:translate-x-[5px] sm:size-12">
                  <ArrowUpRight className="size-4" />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </Shell>
    </section>
  )
}
