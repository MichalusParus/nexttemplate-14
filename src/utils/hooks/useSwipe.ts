import { useCallback, useEffect, useRef } from 'react'

/** useSwipe hook is used for enabling swipe on touch devices. Passed onSwipe fn is called with value {x,y}. Negative or positive values indicates swipe vector. */
export const useSwipe = (onSwipe: (value: { x: number; y: number }) => void) => {
  const componentRef = useRef<HTMLDivElement | null>(null)
  const swipeStartRef = useRef({ x: 0, y: 0 })
  const touchStartTimeRef = useRef(0)

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const target = e.target as HTMLElement
    if (componentRef.current?.contains(target)) {
      touchStartTimeRef.current = e.timeStamp
      swipeStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
  }, [])

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      const target = e.target as HTMLElement
      if (componentRef.current?.contains(target)) {
        const swipeVector = {
          x: e.changedTouches[0].clientX - swipeStartRef.current.x,
          y: e.changedTouches[0].clientY - swipeStartRef.current.y,
        }
        onSwipe(swipeVector)
      }
    },
    [swipeStartRef, onSwipe],
  )

  useEffect(() => {
    if (componentRef.current) {
      const controller = new AbortController()
      const { signal } = controller
      const element = componentRef.current
      element.addEventListener('contextmenu', e => e.preventDefault(), { signal })
      element.addEventListener('touchstart', handleTouchStart, { signal })
      element.addEventListener('touchend', handleTouchEnd, { signal })
      return () => {
        controller.abort()
      }
    }
  }, [handleTouchStart, handleTouchEnd])

  return {
    componentRef: componentRef,
  }
}
