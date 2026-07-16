import { Shell } from '@/components/Shell'
import { Eyebrow } from '@/components/Eyebrow'
import { Reveal } from '@/components/motion/Reveal'
import { LineReveal } from '@/components/motion/LineReveal'
import { useCountUp } from '@/hooks/useCountUp'
import { STATS } from '@/data/content'

function StatItem({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { ref, value: current } = useCountUp(value)
  return (
    <Reveal as="li" delay={delay} y={20} duration={700}>
      <div className="text-5xl font-semibold tracking-[-0.02em] sm:text-6xl md:text-7xl">
        <span ref={ref}>{current}</span>
        {suffix}
      </div>
      <div className="mt-3 text-sm text-white/55">{label}</div>
    </Reveal>
  )
}

export function Stats() {
  return (
    <section className="bg-background">
      <Shell className="pb-20 lg:pb-28">
        <Reveal y={40} scale duration={700} className="rounded-card bg-ink px-6 py-12 text-white sm:px-8 sm:py-16 md:px-16">
          <Eyebrow tone="light">By the numbers</Eyebrow>
          <LineReveal
            as="h2"
            delay={120}
            lines={['Proof in the work, not the words.']}
            className="mt-4 max-w-[20ch] text-3xl font-medium tracking-[-0.01em] md:text-4xl"
          />
          <ul className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <StatItem key={s.label} {...s} delay={i * 90} />
            ))}
          </ul>
        </Reveal>
      </Shell>
    </section>
  )
}
