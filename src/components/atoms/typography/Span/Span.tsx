import { forwardRef, HTMLAttributes } from 'react'

import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { spanColor, spanStyle } from './Span.style'

type NativeSpanProps = Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'className'>

export type SpanProps = NativeSpanProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** style variant of component, none disable styles for custom styling via className */
  variant?: 'none' | 'bold' | 'italic' | 'underline'
  /** theme color of component, none disable styles for custom styling via className */
  color?: StyleProps['color']
}

/** Basic span component with inherited font size. Default HTMLAttributes props supported. */
export const Span = forwardRef<HTMLSpanElement, SpanProps>(
  ({ className, variant = 'bold', color = 'none', children, ...rest }, ref) => {
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
