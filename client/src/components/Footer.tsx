import { Shell } from '@/components/Shell'
import { PillButton } from '@/components/PillButton'
import { LogoMark } from '@/components/icons/LogoMark'
import { LineReveal } from '@/components/motion/LineReveal'
import { scrollToId } from '@/lib/scroll'
import { cn } from '@/lib/utils'
import { FOOTER_COLUMNS } from '@/data/content'

function AnimatedLink({
  label,
  onClick,
  small,
}: {
  label: string
  onClick: () => void
  small?: boolean
}) {
  return (
    <button onClick={onClick} className="group inline-flex text-left text-sm">
      <span
        className={cn(
          'inline-block opacity-65 transition-[transform,opacity] duration-[350ms] ease-[cubic-bezier(.2,.75,.3,1)]',
          small ? 'group-hover:translate-x-[3px] group-hover:opacity-70' : 'group-hover:translate-x-[4px] group-hover:opacity-100',
        )}
      >
        {label}
      </span>
    </button>
  )
}

export function Footer({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <footer className="relative overflow-hidden rounded-t-card bg-ink text-white">
      <Shell className="relative z-10 pt-20 pb-10 sm:pt-20 lg:pt-24">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-16 lg:flex-row lg:items-end lg:justify-between">
          <LineReveal
            as="h2"
            lineStagger={100}
            lines={['Have a project in mind?', "Let's get to work."]}
            className="max-w-[16ch] text-4xl font-semibold tracking-[-0.02em] sm:text-5xl md:text-6xl"
          />
          <PillButton variant="light" arrow="up-right" onClick={onOpenModal}>
            Start a project
          </PillButton>
        </div>

        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <LogoMark className="size-5" />
              Lumora
            </div>
            <p className="mt-3 max-w-80 text-sm text-white/55">
              An independent studio crafting brands, products, and the systems that connect them.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="mb-4 text-xs uppercase tracking-[0.025em] text-white/40">{col.title}</div>
              <div className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <AnimatedLink
                    key={link.label}
                    label={link.label}
                    onClick={() => (link.id ? scrollToId(link.id) : onOpenModal())}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row">
          <span>© 2025 Lumora Studio. All rights reserved.</span>
          <div className="flex gap-6">
            <AnimatedLink small label="Privacy" onClick={() => {}} />
            <AnimatedLink small label="Terms" onClick={() => {}} />
          </div>
        </div>
      </Shell>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[-1.5rem] z-0 select-none text-center font-bold leading-none text-white/5"
        style={{ fontSize: 'var(--text-watermark)' }}
      >
        LUMORA
      </div>
    </footer>
  )
}
