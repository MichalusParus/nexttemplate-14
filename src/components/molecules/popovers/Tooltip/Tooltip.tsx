import { ReactNode } from 'react'

import { positionClass, tooltipClass, visibilityClass } from './Tooltip.style'

export type TooltipProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** position of tooltip */
  placement?: 'top' | 'right' | 'bottom' | 'left'
  /** text content of tooltip */
  title: string
  /** delay of tooltip visibility as tailwind class */
  delay?: string
  /** children */
  children?: ReactNode
}

/** Small popover for displaying aditional information on children hover or focus. */
export const Tooltip = ({
  className = '',
  placement = 'top',
  title,
  delay = 'delay-500',
  children,
}: TooltipProps) => {
  const isVerticalPlacement = placement === 'top' || placement === 'bottom'
  return (
    <div
      className={`TooltipWrap ${className} group/tooltip relative`}
      aria-describedby={title}
      data-testid="TooltipWrap"
    >
      <div
        id={title}
        className={`Tooltip ${tooltipClass} ${isVerticalPlacement ? 'my-2' : 'mx-4'} ${positionClass[placement]} ${visibilityClass} ${delay}`}
        role="tooltip"
      >
        {title}
      </div>
      {children}
    </div>
  )
}
