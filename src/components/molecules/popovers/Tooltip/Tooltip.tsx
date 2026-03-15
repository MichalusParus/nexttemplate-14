'use client'
import { Placement } from '@popperjs/core'
import {
  FocusEvent,
  forwardRef,
  MouseEvent,
  PropsWithChildren,
  ReactNode,
  TouchEvent,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

import { usePortalContainer } from '@/components/utils/hooks/usePortalContainer'
import { NativeDivProps } from '@/components/utils/types'
import { usePopper } from '@/utils/hooks/usePopper'
import { useTouch } from '@/utils/hooks/useTouch'
import { cn } from '@/utils/utils'

import { tooltipClass, tooltipPointer, tooltipVisibility } from './Tooltip.style'

export const defaultDelay = 500

type TooltipEventType =
  | MouseEvent<HTMLDivElement>
  | TouchEvent<HTMLDivElement>
  | FocusEvent<HTMLDivElement>

export type TooltipProps = NativeDivProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** content of tooltip */
  title: ReactNode
  /** position of tooltip */
  placement?: Placement
  /** offset of tooltip */
  offset?: [number, number]
  /** delay of tooltip visibility as ms */
  delay?: number
  /** on touch delay of tooltip visibility as ms */
  touchDelay?: number
  /** hide tooltip pointer */
  hidePointer?: boolean
  /** optional id for portal container */
  portalContainerId?: string
}

/** Small popover for displaying aditional information on children hover, focus or touch. Native HTMLDivElement props supported. USE CLIENT */
export const Tooltip = forwardRef<HTMLDivElement | null, PropsWithChildren<TooltipProps>>(
  (
    {
      className,
      title,
      placement = 'top',
      offset,
      delay = defaultDelay,
      touchDelay = delay,
      hidePointer,
      portalContainerId,
      children,
      ...rest
    },
    ref,
  ) => {
    const id = useId().replace(/:/g, '')
    const timeoutRef = useRef<NodeJS.Timeout>()
    const [isOpen, setIsOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const container = usePortalContainer(portalContainerId)
    const { componentRef, isTouchDevice } = useTouch({
      onTouch: () => setIsOpen(true),
      onTouchOutside: () => setIsOpen(false),
      touchDelay,
    })
    const { adjustedPlacement, popoverEl, setPopoverEl } = usePopper(
      componentRef,
      placement,
      offset,
    )
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => popoverEl)

    const handleShow = useCallback(
      (e: TooltipEventType) => {
        if (isTouchDevice) return
        if (componentRef.current?.querySelector('[aria-expanded="true"]')) return
        e.stopPropagation()
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setIsOpen(true), delay)
      },
      [delay, isTouchDevice, componentRef],
    )

    const handleHide = useCallback(
      (e?: TooltipEventType | Event | UIEvent) => {
        e?.stopPropagation()
        clearTimeout(timeoutRef.current)
        setIsOpen(false)
      },
      [setIsOpen],
    )

    const handleClickOutside = useCallback(
      (e: globalThis.MouseEvent | KeyboardEvent) => {
        e.stopPropagation()
        if ('code' in e && e.code === 'Escape') {
          return handleHide()
        }
        const target = e.target as HTMLDivElement
        if (
          isOpen &&
          popoverEl &&
          ![popoverEl, componentRef.current].some(el => el?.contains(target))
        ) {
          handleHide()
        }
      },
      [isOpen, componentRef, popoverEl, handleHide],
    )

    useEffect(() => {
      if (typeof window !== 'undefined' && componentRef.current) {
        const controller = new AbortController()
        const { signal } = controller

        document.addEventListener('keydown', handleClickOutside, { signal })
        document.addEventListener('mousedown', handleClickOutside, { signal })
        window.addEventListener('scroll', handleHide, { signal, passive: true })
        window.addEventListener('resize', handleHide, { signal, passive: true })
        return () => {
          controller.abort()
          clearTimeout(timeoutRef.current)
        }
      }
    }, [componentRef, handleHide, handleClickOutside])

    useEffect(() => {
      if (isOpen) setIsVisible(true)
      else {
        const timer = setTimeout(() => setIsVisible(false), 150)
        return () => clearTimeout(timer)
      }
    }, [isOpen])

    return (
      <div
        className={cn('TooltipWrap', 'group/tooltip relative max-w-max text-left')}
        onMouseEnter={handleShow}
        onMouseLeave={handleHide}
        onFocus={handleShow}
        onBlur={handleHide}
        aria-describedby={`${id}-tooltip`}
        data-testid="TooltipWrap"
        ref={componentRef}
        aria-owns={isOpen ? `${id}-tooltip` : undefined}
      >
        {!isOpen && !isVisible || !container
          ? null
          : createPortal(
              <div
                id={`${id}-tooltip`}
                className={cn(
                  'Tooltip',
                  tooltipClass,
                  !hidePointer && tooltipPointer[adjustedPlacement],
                  tooltipVisibility,
                  isVisible && isOpen && 'opacity-100',
                  className,
                )}
                role="tooltip"
                aria-hidden={!isOpen}
                aria-live="polite"
                data-testid="Tooltip"
                ref={setPopoverEl}
                {...rest}
              >
                {title}
              </div>,
              container,
            )}
        {children}
      </div>
    )
  },
)

Tooltip.displayName = 'Tooltip'
