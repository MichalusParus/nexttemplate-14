import { useCallback, useEffect, useRef } from 'react'

type SwipeVector = {
  x: number
  y: number
}

type TouchOptions = {
  onTouch?: (e: TouchEvent) => void
  onTouchOutside?: () => void
  onSwipe?: (value: SwipeVector) => void
  touchDelay?: number
}

type useTouchReturn = {
  isTouchDevice: boolean
  componentRef: React.RefObject<HTMLDivElement>
  handleTouch: (e: TouchEvent) => void
}

/** useTouch hook is used for checking if touch device is used and handling touch and swipe behaviour. Passed onTouch function is called after touch delay. Passed onSwipe function is called with value {x,y}. Negative or positive values indicates swipe vector. */
export const useTouch = ({
  onTouch,
  onTouchOutside,
  onSwipe,
  touchDelay = 500,
}: TouchOptions): useTouchReturn => {
  const componentRef = useRef<HTMLDivElement | null>(null)
  const isTouchDevice = useRef(false)
  const touchStartTimeRef = useRef(0)
  const touchEndTimeRef = useRef(0)
  const swipeStartRef = useRef({ x: 0, y: 0 })
  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleTouch = useCallback(
    (e: TouchEvent) => {
      if (!isTouchDevice.current) return

      e.stopPropagation()
      const target = e.target as HTMLElement

      if (!componentRef.current?.contains(target)) return

      if (e.type === 'touchstart') {
        touchStartTimeRef.current = e.timeStamp
        if (onSwipe) {
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

        if (onSwipe) {
          const swipeVector = {
            x: e.changedTouches[0].clientX - swipeStartRef.current.x,
            y: e.changedTouches[0].clientY - swipeStartRef.current.y,
          }
          onSwipe(swipeVector)
        }
      }
    },
    [onTouch, onSwipe, touchDelay],
  )

  const handleTouchOutside = useCallback(
    (e: TouchEvent) => {
      e?.stopPropagation()
      const target = e.target as HTMLDivElement
      if (!componentRef.current?.contains(target)) {
        onTouchOutside?.()
      }
    },
    [componentRef, onTouchOutside],
  )

  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }, [])

  useEffect(() => {
    if (!componentRef.current) return
    const controller = new AbortController()
    const { signal } = controller
    const element = componentRef.current

    if (isTouchDevice.current) {
      element.addEventListener('contextmenu', e => e.preventDefault(), { signal })
      element.addEventListener('touchstart', handleTouch, { signal, passive: true })
      element.addEventListener('touchend', handleTouch, { signal, passive: true })
    }
    return () => {
      controller.abort()
      clearTimeout(timeoutRef.current)
    }
  }, [handleTouch])

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
