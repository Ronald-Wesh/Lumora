import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export function Shell({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'ul'
}) {
  const Comp = as
  return (
    <Comp className={cn('mx-auto max-w-[88rem] px-5 sm:px-8', className)}>
      {children}
    </Comp>
  )
}
