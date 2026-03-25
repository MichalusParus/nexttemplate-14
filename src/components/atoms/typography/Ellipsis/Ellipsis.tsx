'use client'
import { forwardRef, PropsWithChildren, useCallback, useImperativeHandle, useRef } from 'react'

import { Tooltip, TooltipProps } from '@/components/molecules/popovers/Tooltip'
import { cn } from '@/utils/utils'

import { Span, SpanProps } from '../Span'
import { ellipsisClass } from './Ellipsis.style'

export type EllipsisProps = SpanProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** line clamp as tailwind class */
  lineClamp?: string
  /** optional props for tooltip component */
  tooltipProps?: Partial<TooltipProps>
}

/** Text wrapper for displaying text with ellipsis and tooltip on overflow. Span props supported. USE CLIENT */
export const Ellipsis = forwardRef<
  HTMLSpanElement | null,
  PropsWithChildren<EllipsisProps>
>(({ className, lineClamp, variant = 'none', tooltipProps, children, ...rest }, ref) => {
  const componentRef = useRef<HTMLSpanElement>(null)
  useImperativeHandle<HTMLSpanElement | null, HTMLSpanElement | null>(
    ref,
    () => componentRef.current,
  )

  const checkOverflow = useCallback(() => {
    if (!componentRef.current) return false
    const el = componentRef.current
    return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth
  }, [])

  return (
    <Tooltip lazy title={children} beforeShow={checkOverflow} {...tooltipProps}>
      <Span
        className={cn('Ellipsis', ellipsisClass, lineClamp, className)}
        variant={variant}
        ref={componentRef}
        data-testid="Ellipsis"
        {...rest}
      >
        {children}
      </Span>
    </Tooltip>
  )
})

Ellipsis.displayName = 'Ellipsis'
