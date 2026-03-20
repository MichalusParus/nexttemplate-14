'use client'
import { Placement } from '@popperjs/core'
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  PropsWithChildren,
  ReactNode,
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
  /** no wrapper div — attaches events directly to child via cloneElement. Use when wrapper breaks layout (flex, grid) */
  lazy?: boolean
  /** called before showing tooltip — return false to cancel. Useful for conditional tooltips (e.g. show only when text overflows) */
  beforeShow?: () => boolean
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
      lazy,
      beforeShow,
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
    const lazyRef = useRef<HTMLElement | null>(null)
    const { componentRef, isTouchDevice } = useTouch({
      ref: lazy ? lazyRef : undefined,
      onTouch: () => setIsOpen(true),
      onTouchOutside: () => setIsOpen(false),
      touchDelay,
    })
    const anchorRef = lazy ? lazyRef : componentRef
    const { adjustedPlacement, popoverEl, setPopoverEl } = usePopper(
      anchorRef as React.RefObject<HTMLElement | null>,
      placement,
      offset,
    )
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => popoverEl)

    const handleShow = useCallback(
      () => {
        if (isTouchDevice) return
        if (beforeShow && !beforeShow()) return
        if (anchorRef.current?.querySelector('[aria-expanded="true"]')) return
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setIsOpen(true), delay)
      },
      [delay, isTouchDevice, anchorRef, beforeShow],
    )

    const handleHide = useCallback(
      () => {
        clearTimeout(timeoutRef.current)
        setIsOpen(false)
      },
      [setIsOpen],
    )

    const handleClickOutside = useCallback(
      (e: globalThis.MouseEvent | KeyboardEvent) => {
        if ('code' in e && e.code === 'Escape') {
          return handleHide()
        }
        const target = e.target as HTMLDivElement
        if (
          popoverEl &&
          ![popoverEl, anchorRef.current].some(el => el?.contains(target))
        ) {
          handleHide()
        }
      },
      [anchorRef, popoverEl, handleHide],
    )

    useEffect(() => {
      if (!isOpen) return
      if (typeof window !== 'undefined' && anchorRef.current) {
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
    }, [isOpen, anchorRef, handleHide, handleClickOutside])

    useEffect(() => {
      if (isOpen) setIsVisible(true)
      else {
        const timer = setTimeout(() => setIsVisible(false), 150)
        return () => clearTimeout(timer)
      }
    }, [isOpen])

    const portal =
      !isOpen && !isVisible || !container
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
          )

    if (lazy) {
      const child = Children.only(children)
      if (!isValidElement(child)) return <>{children}</>

      return (
        <>
          {cloneElement(child as React.ReactElement<Record<string, unknown>>, {
            onMouseEnter: (e: React.MouseEvent) => { (child.props as Record<string, (e: React.MouseEvent) => void>).onMouseEnter?.(e); handleShow() },
            onMouseLeave: (e: React.MouseEvent) => { (child.props as Record<string, (e: React.MouseEvent) => void>).onMouseLeave?.(e); handleHide() },
            onFocus: (e: React.FocusEvent) => { (child.props as Record<string, (e: React.FocusEvent) => void>).onFocus?.(e); handleShow() },
            onBlur: (e: React.FocusEvent) => { (child.props as Record<string, (e: React.FocusEvent) => void>).onBlur?.(e); handleHide() },
            'aria-describedby': isOpen ? `${id}-tooltip` : undefined,
            ref: (node: HTMLElement | null) => {
              lazyRef.current = node
              const childRef =
                (child as React.ReactElement & { ref?: React.Ref<HTMLElement> }).ref ??
                (child.props as { ref?: React.Ref<HTMLElement> }).ref
              if (typeof childRef === 'function') childRef(node)
              else if (childRef && typeof childRef === 'object') {
                ;(childRef as React.MutableRefObject<HTMLElement | null>).current = node
              }
            },
          })}
          {portal}
        </>
      )
    }

    return (
      <div
        className={cn('TooltipWrap', 'group/tooltip relative max-w-max text-left')}
        onMouseEnter={handleShow}
        onMouseLeave={handleHide}
        onFocus={handleShow}
        onBlur={handleHide}
        aria-describedby={isOpen ? `${id}-tooltip` : undefined}
        data-testid="TooltipWrap"
        ref={componentRef}
        aria-owns={isOpen ? `${id}-tooltip` : undefined}
      >
        {portal}
        {children}
      </div>
    )
  },
)

Tooltip.displayName = 'Tooltip'
