'use client'
import { Placement } from '@popperjs/core'
import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

import { usePopper } from '@/utils/hooks/usePopper'
import { cn } from '@/utils/utils'

import { tooltipClass, tooltipPointer, tooltipVisibility } from './Tooltip.style'

export type TooltipProps = Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'className'> & {
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

/** Small popover for displaying aditional information on children hover or focus. TouchScreen supported. Default HTMLDivElement props supported. USE CLIENT */
export const Tooltip = forwardRef<HTMLDivElement, PropsWithChildren<TooltipProps>>(
  (
    { className, placement = 'top', offset, title, delay = 'delay-500', children, ...rest },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false)
    const [mounted, setMounted] = useState(false)
    const { anchorRef, setPopoverEl } = usePopper(placement, offset)
    useImperativeHandle(ref, () => anchorRef.current!)

    const handleVisible = () => {
      setIsVisible(true)
    }

    const handleClose = () => {
      setIsVisible(false)
    }

    const handleClickOutside = useCallback(
      (e: MouseEvent) => {
        const target = e.target as HTMLDivElement
        if (isVisible && !anchorRef.current?.contains(target)) {
          handleClose()
        }
      },
      [isVisible, handleClose],
    )

    useEffect(() => {
      setMounted(true)
    }, [])

    useEffect(() => {
      if (typeof window !== 'undefined' && anchorRef.current) {
        const element = anchorRef.current
        window.addEventListener('click', handleClickOutside)
        element?.addEventListener('mouseenter', handleVisible)
        element?.addEventListener('mouseleave', handleClose)
        element?.addEventListener('focusin', handleVisible)
        element?.addEventListener('focusout', handleClose)
        return () => {
          window.removeEventListener('click', handleClickOutside)
          element?.removeEventListener('mouseenter', handleVisible)
          element?.removeEventListener('mouseleave', handleClose)
          element?.removeEventListener('focusin', handleVisible)
          element?.removeEventListener('focusout', handleClose)
        }
      }
    }, [anchorRef, handleVisible, handleClose, handleClickOutside])

    return (
      <div
        className={cn('TooltipWrap', 'group/tooltip relative max-w-max')}
        aria-describedby={String(title)}
        data-testid="TooltipWrap"
        ref={anchorRef}
      >
        {mounted &&
          createPortal(
            <div
              id={String(title)}
              className={cn(
                'Tooltip',
                tooltipClass,
                tooltipPointer[placement],
                tooltipVisibility,
                delay,
                isVisible && 'visible opacity-100',
                className,
              )}
              role="tooltip"
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
