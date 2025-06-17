'use client'
import { Placement } from '@popperjs/core'
import {
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

import { NativeDivProps } from '@/components/types'
import { usePopper } from '@/utils/hooks/usePopper'
import { cn } from '@/utils/utils'

import { tooltipClass, tooltipPointer, tooltipVisibility } from './Tooltip.style'

export type TooltipProps = NativeDivProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** position of tooltip */
  placement?: Placement
  /** offset of tooltip */
  offset?: [number, number]
  /** content of tooltip */
  title: ReactNode
  /** delay of tooltip visibility as tailwind class */
  delay?: string
}

/** Small popover for displaying aditional information on children hover or focus. TouchScreen supported. Native HTMLDivElement props supported. USE CLIENT */
export const Tooltip = forwardRef<HTMLDivElement | null, PropsWithChildren<TooltipProps>>(
  (
    { className, placement = 'top', offset, title, delay = 'delay-500', children, ...rest },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false)
    const { anchorRef, adjustedPlacement, setPopoverEl } = usePopper(placement, offset)
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => anchorRef.current)

    const handleVisible = useCallback(() => {
      setIsVisible(true)
    }, [setIsVisible])

    const handleClose = useCallback(() => {
      setIsVisible(false)
    }, [setIsVisible])

    const handleClickOutside = useCallback(
      (e: MouseEvent) => {
        const target = e.target as HTMLDivElement
        if (isVisible && !anchorRef.current?.contains(target)) {
          handleClose()
        }
      },
      [isVisible, anchorRef, handleClose],
    )

    useEffect(() => {
      if (typeof window !== 'undefined' && anchorRef.current) {
        const controller = new AbortController()
        const { signal } = controller

        const element = anchorRef.current
        window.addEventListener('click', handleClickOutside, { signal })
        element?.addEventListener('mouseenter', handleVisible, { signal })
        element?.addEventListener('mouseleave', handleClose, { signal })
        element?.addEventListener('focusin', handleVisible, { signal })
        element?.addEventListener('focusout', handleClose, { signal })
        return () => {
          controller.abort()
        }
      }
    }, [anchorRef, handleVisible, handleClose, handleClickOutside])

    return (
      <div
        className={cn('TooltipWrap', 'group/tooltip relative max-w-max text-left')}
        aria-describedby={String(title)}
        data-testid="TooltipWrap"
        ref={anchorRef}
        aria-owns={String(title)}
      >
        {typeof window !== 'undefined' &&
          createPortal(
            <div
              id={String(title)}
              className={cn(
                'Tooltip',
                tooltipClass,
                tooltipPointer[adjustedPlacement],
                tooltipVisibility,
                delay,
                isVisible && 'visible opacity-100',
                className,
              )}
              role="tooltip"
              aria-hidden={!isVisible}
              data-testid="Tooltip"
              ref={setPopoverEl}
              {...rest}
            >
              {title}
            </div>,
            document.body,
          )}
        {children}
      </div>
    )
  },
)

Tooltip.displayName = 'Tooltip'
