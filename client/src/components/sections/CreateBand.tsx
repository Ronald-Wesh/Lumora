import { ArrowRight } from 'lucide-react'
import { Shell } from '@/components/Shell'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'

const TILES = [
  { content: 'We', variant: 'light' },
  { content: 'Build', variant: 'accent' },
  { content: <ArrowRight className="size-9 sm:size-12" />, variant: 'dark' },
  { content: 'Better', variant: 'ghost' },
] as const

const tileClass: Record<(typeof TILES)[number]['variant'], string> = {
  light: 'bg-surface text-foreground',
  accent: 'bg-gradient-to-br from-accent-from to-accent-to text-white',
  dark: 'bg-ink text-white',
  ghost: 'bg-surface/60 text-foreground/35',
}

export function CreateBand() {
  return (
    <section className="bg-background">
      <Shell as="ul" className="flex flex-col gap-3 py-10 sm:flex-row sm:gap-4">
        {TILES.map((tile, i) => (
          <Reveal key={i} as="li" delay={i * 120} y={28} className="flex-1" duration={700}>
            <div
              className={cn(
                'flex h-24 items-center justify-center rounded-pill text-3xl font-medium transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:scale-[1.03] sm:h-40 sm:text-4xl',
                tileClass[tile.variant],
              )}
            >
              {tile.content}
            </div>
          </Reveal>
        ))}
      </Shell>
    </section>
  )
}
