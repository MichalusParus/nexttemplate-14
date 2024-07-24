'use client'
import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { useTouch } from '@/utils/hooks/useTouch'
import { cn } from '@/utils/utils'

import { tooltipClass, tooltipPosition, tooltipVisibility } from './Tooltip.style'

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

/** Small popover for displaying aditional information on children hover or focus. Default HTMLDivElement props supported. USE CLIENT */
export const Tooltip = forwardRef<HTMLDivElement, PropsWithChildren<TooltipProps>>(
  ({ className = '', placement = 'top', title, delay = 'delay-500', children, ...rest }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const { componentRef } = useTouch(undefined, () => setIsOpen(true))
    const tooltipMargin = placement === 'top' || placement === 'bottom' ? 'my-2' : 'mx-4'

    const handleClick = useCallback(
      (e: MouseEvent) => {
        const target = e.target as HTMLDivElement
        if (isOpen && !componentRef.current?.contains(target)) {
          setIsOpen(false)
        }
      },
      [isOpen, componentRef],
    )

    useEffect(() => {
      if (typeof window !== 'undefined') {
        window.addEventListener('click', handleClick)
        return () => {
          window.removeEventListener('click', handleClick)
        }
      }
    }, [handleClick])

    return (
      <div
        className={cn('TooltipWrap', 'group/tooltip relative', className)}
        aria-describedby={String(title)}
        data-testid="TooltipWrap"
        ref={componentRef}
      >
        <div
          id={String(title)}
          className={cn(
            'Tooltip',
            tooltipClass,
            tooltipPosition[placement],
            tooltipVisibility,
            delay,
            isOpen && 'visible scale-100 opacity-100 delay-0',
            tooltipMargin,
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
