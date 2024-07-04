import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/utils/utils'

import { spanColor, spanStyle } from './Span.style'

export type SpanProps = Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'className'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** style variant of component, none disable styles for custom styling via className */
  variant?: 'none' | 'bold' | 'italic' | 'underline'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
}

/** Basic span component with inherited font size. Default HTMLAttributes props supported. */
export const Span = forwardRef<HTMLSpanElement, SpanProps>(
  ({ className = '', variant = 'bold', color = 'none', children, ...rest }, ref) => {
    return (
      <span
        className={cn('text-inherit', spanStyle[variant], spanColor[color], className)}
        ref={ref}
        data-testid="Span"
        {...rest}
      >
        {children}
      </span>
    )
  },
)

Span.displayName = 'Span'
