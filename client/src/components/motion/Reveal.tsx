import { cn } from '@/lib/utils'
import { useReady } from '@/lib/ready-context'
import { useReveal } from '@/hooks/useReveal'
import type { CSSProperties, ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  /** 'gated' = plays once the page-load intro finishes (hero). 'scroll' = plays on scroll-into-view. */
  mode?: 'gated' | 'scroll'
  delay?: number
  y?: number
  scale?: boolean
  duration?: number
  as?: 'div' | 'li'
}

export function Reveal({
  children,
  className,
  mode = 'scroll',
  delay = 0,
  y = 16,
  scale = false,
  duration = 700,
  as = 'div',
}: RevealProps) {
  const ready = useReady()
  const { ref, inView } = useReveal<HTMLDivElement>()
  const active = mode === 'gated' ? ready : inView

  const style: CSSProperties = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: 'cubic-bezier(.22,1,.36,1)',
    transform: active
      ? 'translateY(0) scale(1)'
      : `translateY(${y}px) scale(${scale ? 0.96 : 1})`,
    opacity: active ? 1 : 0,
  }

  const Comp = as
  return (
    <Comp
      ref={ref as never}
      className={cn('w-full transition-[transform,opacity]', className)}
      style={style}
    >
      {children}
    </Comp>
  )
}
