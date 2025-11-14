'use client'
import {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import { Tooltip, TooltipProps } from '@/components/molecules/popovers/Tooltip'
import { cn } from '@/utils/utils'

import { Span, SpanProps } from '../Span'
import { ellipsisClass } from './Ellipsis.style'

export type ComponentTemplateProps = SpanProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** line clamp as tailwind class */
  lineClamp?: string
  /** optional props for tooltip component */
  tooltipProps?: Partial<TooltipProps>
}

/** Text wrapper for displaying text with ellipsis and tooltip. Tooltip and Span props supported. USE CLIENT */
export const Ellipsis = forwardRef<
  HTMLSpanElement | null,
  PropsWithChildren<ComponentTemplateProps>
>(({ className, lineClamp, tooltipProps, children, ...rest }, ref) => {
  const [isOverflow, setIsOverflow] = useState(false)
  const componentRef = useRef<HTMLSpanElement>(null)
  useImperativeHandle<HTMLSpanElement | null, HTMLSpanElement | null>(
    ref,
    () => componentRef.current,
  )

  const checkOverflow = () => {
    if (componentRef.current) {
      setIsOverflow(componentRef.current?.scrollHeight > componentRef.current.clientHeight)
    }
  }

  useLayoutEffect(() => {
    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => {
      window.removeEventListener('resize', checkOverflow)
    }
  }, [children])

  useEffect(() => {
    checkOverflow()
  }, [children])

  if (!isOverflow)
    return (
      <Span
        className={cn('Ellipsis', ellipsisClass, lineClamp, className)}
        ref={componentRef}
        data-testid="Ellipsis"
        {...rest}
      >
        {children}
      </Span>
    )

  return (
    <Tooltip title={children} {...tooltipProps}>
      <Span
        className={cn('Ellipsis', ellipsisClass, lineClamp, className)}
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
