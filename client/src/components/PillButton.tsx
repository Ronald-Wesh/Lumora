import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'dark' | 'light' | 'outline'
type Arrow = 'right' | 'up-right' | 'none'

type PillButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  arrow?: Arrow
}

const innerVariant: Record<Variant, string> = {
  dark: 'bg-ink text-white',
  light: 'bg-surface text-foreground',
  outline: 'border border-line bg-transparent text-foreground',
}

const badgeVariant: Record<Variant, string> = {
  dark: 'bg-white text-ink',
  light: 'bg-ink text-white',
  outline: 'bg-ink text-white',
}

export function PillButton({
  children,
  variant = 'dark',
  arrow = 'none',
  className,
  type = 'button',
  ...props
}: PillButtonProps) {
  const Icon = arrow === 'up-right' ? ArrowUpRight : ArrowRight

  return (
    <button
      type={type}
      className={cn(
        'group inline-block transition-transform duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)] hover:scale-[1.04]',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'inline-flex items-center gap-3 rounded-pill text-sm font-medium',
          arrow !== 'none' ? 'py-1.5 pl-6 pr-1.5' : 'py-3.5 px-7',
          innerVariant[variant],
        )}
      >
        {children}
        {arrow !== 'none' && (
          <span
            className={cn(
              'grid size-9 place-items-center rounded-pill text-base transition-transform duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)]',
              arrow === 'right'
                ? 'group-hover:translate-x-[3px]'
                : 'group-hover:translate-x-[2px] group-hover:-translate-y-[2px]',
              badgeVariant[variant],
            )}
          >
            <Icon className="size-4" />
          </span>
        )}
      </span>
    </button>
  )
}
