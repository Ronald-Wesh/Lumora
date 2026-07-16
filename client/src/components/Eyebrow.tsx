import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export function Eyebrow({
  children,
  tone = 'dark',
  className,
}: {
  children: ReactNode
  tone?: 'dark' | 'light'
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-sm font-medium',
        tone === 'dark' ? 'text-foreground/70' : 'text-white/70',
        className,
      )}
    >
      <span
        className={cn(
          'size-1.5 rounded-pill',
          tone === 'dark' ? 'bg-foreground/50' : 'bg-white/60',
        )}
      />
      {children}
    </span>
  )
}
