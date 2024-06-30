import { forwardRef, HTMLAttributes, PropsWithChildren, ReactNode } from 'react'

import { tooltipClass, tooltipPosition, tooltipVisibility } from './Tooltip.style'
import { cn } from '@/utils/utils'

export type TooltipProps = Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'className'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** position of tooltip */
  placement?: 'top' | 'right' | 'bottom' | 'left'
  /** content of tooltip */
  title: ReactNode
  /** delay of tooltip visibility as tailwind class */
  delay?: string
}

/** Small popover for displaying aditional information on children hover or focus. Default HTMLDivElement props supported. */
export const Tooltip = forwardRef<HTMLDivElement, PropsWithChildren<TooltipProps>>(
  ({ className = '', placement = 'top', title, delay = 'delay-500', children, ...rest }, ref) => {
    const tooltipMargin = placement === 'top' || placement === 'bottom' ? 'my-2' : 'mx-4'

    return (
      <div
        className={cn('TooltipWrap', 'group/tooltip relative', className)}
        aria-describedby={String(title)}
        data-testid="TooltipWrap"
      >
        <div
          id={String(title)}
          className={cn(
            'Tooltip',
            tooltipClass,
            tooltipPosition[placement],
            tooltipVisibility,
            tooltipMargin,
            delay,
          )}
          role="tooltip"
          ref={ref}
          {...rest}
        >
          {title}
        </div>
        {children}
      </div>
    )
  },
)

Tooltip.displayName = 'Tooltip'
