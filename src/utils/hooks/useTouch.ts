import { useCallback, useEffect, useRef } from 'react'

import { devWarning } from '@/components/utils/devWarning'

type SwipeVector = {
  x: number
  y: number
}

type TouchOptions = {
  /** External ref to attach touch listeners to. Use for always-mounted elements. Mutually exclusive with `element`. */
  ref?: React.RefObject<HTMLElement | null>
  /** Element to attach touch listeners to. Use when the element is tracked in state (e.g. lazily-mounted portals like Dialog). Mutually exclusive with `ref`. */
  element?: HTMLElement | null
  onTouch?: (e: TouchEvent) => void
  onTouchOutside?: () => void
  /** Raw swipe vector callback. Fires on every touchend that meets `swipeThreshold`. */
  onSwipe?: (value: SwipeVector) => void
  /** Fires when an upward swipe past `swipeThreshold` dominates the cross axis. */
  onSwipeUp?: () => void
  /** Fires when a downward swipe past `swipeThreshold` dominates the cross axis. */
  onSwipeDown?: () => void
  /** Fires when a leftward swipe past `swipeThreshold` dominates the cross axis. */
  onSwipeLeft?: () => void
  /** Fires when a rightward swipe past `swipeThreshold` dominates the cross axis. */
  onSwipeRight?: () => void
  /** Minimum displacement on the dominant axis for any swipe callback to fire. Default: 30. */
  swipeThreshold?: number
  touchDelay?: number
}

type useTouchReturn = {
  isTouchDevice: boolean
  componentRef: React.RefObject<HTMLDivElement>
  handleTouch: (e: TouchEvent) => void
}

/** useTouch hook for detecting touch device and handling touch + swipe. Pass `element` (state-tracked DOM node) instead of `ref` for lazily-mounted consumers like portals. */
export const useTouch = ({
  ref: externalRef,
  element,
  onTouch,
  onTouchOutside,
  onSwipe,
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  swipeThreshold = 30,
  touchDelay = 500,
}: TouchOptions): useTouchReturn => {
  const internalRef = useRef<HTMLDivElement | null>(null)
  const componentRef = (externalRef ?? internalRef) as React.RefObject<HTMLDivElement>
  const isTouchDevice = useRef(false)
  const touchStartTimeRef = useRef(0)
  const touchEndTimeRef = useRef(0)
  const swipeStartRef = useRef({ x: 0, y: 0 })
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  devWarning(
    externalRef != null && element !== undefined,
    'useTouch: pass either `ref` or `element`, not both. `element` takes precedence when both are provided.',
  )

  const hasSwipeListener = Boolean(
    onSwipe || onSwipeUp || onSwipeDown || onSwipeLeft || onSwipeRight,
  )

  const handleTouch = useCallback(
    (e: TouchEvent) => {
      if (!isTouchDevice.current) return

      e.stopPropagation()
      const targetEl = element ?? componentRef.current
      const eventTarget = e.target as HTMLElement
      if (!targetEl?.contains(eventTarget)) return

      if (e.type === 'touchstart') {
        touchStartTimeRef.current = e.timeStamp
        if (hasSwipeListener) {
          swipeStartRef.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
          }
        }

        if (onTouch) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = setTimeout(() => onTouch(e), touchDelay)
        }
      } else if (e.type === 'touchend') {
        touchEndTimeRef.current = e.timeStamp

        if (touchEndTimeRef.current - touchStartTimeRef.current < touchDelay) {
          clearTimeout(timeoutRef.current)
        }

        if (!hasSwipeListener) return

        const swipeVector = {
          x: e.changedTouches[0].clientX - swipeStartRef.current.x,
          y: e.changedTouches[0].clientY - swipeStartRef.current.y,
        }
        const absX = Math.abs(swipeVector.x)
        const absY = Math.abs(swipeVector.y)

        if (Math.max(absX, absY) < swipeThreshold) return

        onSwipe?.(swipeVector)

        if (absX > absY) {
          if (swipeVector.x > 0) onSwipeRight?.()
          else onSwipeLeft?.()
        } else {
          if (swipeVector.y > 0) onSwipeDown?.()
          else onSwipeUp?.()
        }
      }
    },
    [
      element,
      componentRef,
      hasSwipeListener,
      onTouch,
      onSwipe,
      onSwipeUp,
      onSwipeDown,
      onSwipeLeft,
      onSwipeRight,
      swipeThreshold,
      touchDelay,
    ],
  )

  const handleTouchOutside = useCallback(
    (e: TouchEvent) => {
      e?.stopPropagation()
      const targetEl = element ?? componentRef.current
      const eventTarget = e.target as HTMLDivElement
      if (!targetEl?.contains(eventTarget)) {
        onTouchOutside?.()
      }
    },
    [element, componentRef, onTouchOutside],
  )

  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }, [])

  useEffect(() => {
    const target = element ?? componentRef.current
    if (!target) return
    const controller = new AbortController()
    const { signal } = controller

    if (isTouchDevice.current) {
      target.addEventListener('contextmenu', e => e.preventDefault(), { signal })
      target.addEventListener('touchstart', handleTouch, { signal, passive: true })
      target.addEventListener('touchend', handleTouch, { signal, passive: true })
    }
    return () => {
      controller.abort()
      clearTimeout(timeoutRef.current)
    }
  }, [element, componentRef, handleTouch])

  useEffect(() => {
    if (isTouchDevice.current && onTouchOutside) {
      document.addEventListener('touchstart', handleTouchOutside)
    }
    return () => {
      document.removeEventListener('touchstart', handleTouchOutside)
    }
  }, [onTouchOutside, handleTouchOutside])

  return {
    isTouchDevice: isTouchDevice.current,
    componentRef: componentRef,
    handleTouch,
  }
}
