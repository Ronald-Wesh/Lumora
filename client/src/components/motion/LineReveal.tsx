import { useReady } from '@/lib/ready-context'
import { useReveal } from '@/hooks/useReveal'
import { Fragment } from 'react'

type LineRevealProps = {
  lines: string[]
  className?: string
  mode?: 'gated' | 'scroll'
  delay?: number
  lineStagger?: number
  as?: 'h1' | 'h2'
}

export function LineReveal({
  lines,
  className,
  mode = 'scroll',
  delay = 0,
  lineStagger = 0,
  as = 'h2',
}: LineRevealProps) {
  const ready = useReady()
  const { ref, inView } = useReveal<HTMLHeadingElement>()
  const active = mode === 'gated' ? ready : inView
  const Comp = as

  return (
    <Comp ref={ref as never} className={className}>
      {lines.map((line, i) => (
        <Fragment key={line}>
          <span className="block overflow-hidden">
            <span
              className="block transition-[transform,opacity] ease-[cubic-bezier(.215,.61,.355,1)] duration-[900ms]"
              style={{
                transitionDelay: `${delay + i * lineStagger}ms`,
                transform: active ? 'translateY(0)' : 'translateY(100%)',
                opacity: active ? 1 : 0,
              }}
            >
              {line}
            </span>
          </span>
        </Fragment>
      ))}
    </Comp>
  )
}
