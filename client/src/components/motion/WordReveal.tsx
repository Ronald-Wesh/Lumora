import { useReveal } from '@/hooks/useReveal'

type Segment = { text: string; muted?: boolean }

export function WordReveal({
  segments,
  className,
}: {
  segments: Segment[]
  className?: string
}) {
  const { ref, inView } = useReveal<HTMLHeadingElement>(0.3)

  let idx = 0
  return (
    <h2 ref={ref} className={className}>
      {segments.map((seg, si) =>
        seg.text.split(' ').map((word, wi) => {
          const delay = idx * 35
          idx++
          return (
            <span
              key={`${si}-${wi}`}
              className="inline-block transition-[transform,opacity] ease-[cubic-bezier(.165,.84,.44,1)] duration-[700ms]"
              style={{
                transitionDelay: `${delay}ms`,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                opacity: inView ? 1 : 0,
                color: seg.muted ? 'var(--color-muted)' : undefined,
              }}
            >
              {word}{wi < seg.text.split(' ').length - 1 ? ' ' : ''}
            </span>
          )
        }),
      )}
    </h2>
  )
}
