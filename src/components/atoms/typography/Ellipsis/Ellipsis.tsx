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

export type ComponentTemplateProps = SpanProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** children */
  lines?: number
  /** optional props for tooltip component */
  tooltipProps?: Partial<TooltipProps>
}

/** Text wrapper for displaying text with ellipsis and tooltip. Tooltip and Span props supported. */
export const Ellipsis = forwardRef<HTMLSpanElement, PropsWithChildren<ComponentTemplateProps>>(
  ({ className, tooltipProps, children, ...rest }, ref) => {
    const [isOverflow, setIsOverflow] = useState(false)
    const componentRef = useRef<HTMLSpanElement>(null)
    useImperativeHandle(ref, () => componentRef.current!)

    const checkOverflow = () => {
      console.log(componentRef.current?.scrollHeight, componentRef.current?.clientHeight)
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
          className={cn('Ellipsis', '', className)}
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
          className={cn('Ellipsis', '', className)}
          ref={componentRef}
          data-testid="Ellipsis"
          {...rest}
        >
          {children}
        </Span>
      </Tooltip>
    )
  },
)

Ellipsis.displayName = 'Ellipsis'
