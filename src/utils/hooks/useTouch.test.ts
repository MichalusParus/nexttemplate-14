import { act, renderHook } from '@testing-library/react'
import { useRef } from 'react'

import { useTouch } from './useTouch'

const enableTouch = () => {
  Object.defineProperty(window, 'ontouchstart', { value: true, configurable: true })
}

const disableTouch = () => {
  delete (window as unknown as Record<string, unknown>).ontouchstart
}

const dispatchTouch = (el: HTMLElement, type: 'touchstart' | 'touchend', x: number, y: number) => {
  const event = new Event(type, { bubbles: true }) as TouchEvent
  const touch = { clientX: x, clientY: y } as Touch
  Object.defineProperty(event, 'touches', { value: type === 'touchstart' ? [touch] : [] })
  Object.defineProperty(event, 'changedTouches', { value: [touch] })
  Object.defineProperty(event, 'timeStamp', { value: type === 'touchstart' ? 0 : 100 })
  el.dispatchEvent(event)
}

describe('useTouch', () => {
  beforeEach(() => {
    enableTouch()
  })

  afterEach(() => {
    disableTouch()
  })

  describe('element option', () => {
    it('attaches listeners to a passed element and fires onSwipeDown', () => {
      const div = document.createElement('div')
      document.body.appendChild(div)
      const onSwipeDown = jest.fn()

      renderHook(() => useTouch({ element: div, onSwipeDown, swipeThreshold: 50 }))

      act(() => {
        dispatchTouch(div, 'touchstart', 100, 100)
        dispatchTouch(div, 'touchend', 100, 200)
      })

      expect(onSwipeDown).toHaveBeenCalledTimes(1)
      document.body.removeChild(div)
    })

    it('does nothing when element is null', () => {
      const onSwipeDown = jest.fn()
      const { rerender } = renderHook(
        ({ el }: { el: HTMLElement | null }) =>
          useTouch({ element: el, onSwipeDown, swipeThreshold: 50 }),
        { initialProps: { el: null as HTMLElement | null } },
      )

      rerender({ el: null })

      expect(onSwipeDown).not.toHaveBeenCalled()
    })

    it('attaches listeners when element becomes non-null on re-render (late mount)', () => {
      const onSwipeDown = jest.fn()
      const div = document.createElement('div')
      document.body.appendChild(div)

      const { rerender } = renderHook(
        ({ el }: { el: HTMLElement | null }) =>
          useTouch({ element: el, onSwipeDown, swipeThreshold: 50 }),
        { initialProps: { el: null as HTMLElement | null } },
      )

      // Element appears on a later render (the Dialog open case)
      rerender({ el: div })

      act(() => {
        dispatchTouch(div, 'touchstart', 100, 100)
        dispatchTouch(div, 'touchend', 100, 200)
      })

      expect(onSwipeDown).toHaveBeenCalledTimes(1)
      document.body.removeChild(div)
    })

    it('detaches listeners when element becomes null', () => {
      const div = document.createElement('div')
      document.body.appendChild(div)
      const onSwipeDown = jest.fn()

      const { rerender } = renderHook(
        ({ el }: { el: HTMLElement | null }) =>
          useTouch({ element: el, onSwipeDown, swipeThreshold: 50 }),
        { initialProps: { el: div as HTMLElement | null } },
      )

      rerender({ el: null })

      act(() => {
        dispatchTouch(div, 'touchstart', 100, 100)
        dispatchTouch(div, 'touchend', 100, 200)
      })

      expect(onSwipeDown).not.toHaveBeenCalled()
      document.body.removeChild(div)
    })
  })

  describe('directional callbacks', () => {
    let div: HTMLDivElement

    beforeEach(() => {
      div = document.createElement('div')
      document.body.appendChild(div)
    })

    afterEach(() => {
      document.body.removeChild(div)
    })

    it('fires onSwipeRight when horizontal swipe dominates', () => {
      const onSwipeRight = jest.fn()
      const onSwipeDown = jest.fn()
      renderHook(() => useTouch({ element: div, onSwipeRight, onSwipeDown }))

      act(() => {
        dispatchTouch(div, 'touchstart', 50, 50)
        dispatchTouch(div, 'touchend', 150, 90)
      })

      expect(onSwipeRight).toHaveBeenCalledTimes(1)
      expect(onSwipeDown).not.toHaveBeenCalled()
    })

    it('fires onSwipeLeft for negative-x dominant swipe', () => {
      const onSwipeLeft = jest.fn()
      renderHook(() => useTouch({ element: div, onSwipeLeft }))

      act(() => {
        dispatchTouch(div, 'touchstart', 200, 50)
        dispatchTouch(div, 'touchend', 100, 60)
      })

      expect(onSwipeLeft).toHaveBeenCalledTimes(1)
    })

    it('fires onSwipeUp for negative-y dominant swipe', () => {
      const onSwipeUp = jest.fn()
      renderHook(() => useTouch({ element: div, onSwipeUp }))

      act(() => {
        dispatchTouch(div, 'touchstart', 50, 200)
        dispatchTouch(div, 'touchend', 60, 100)
      })

      expect(onSwipeUp).toHaveBeenCalledTimes(1)
    })

    it('fires no directional callback when sub-threshold (filters taps)', () => {
      const onSwipeDown = jest.fn()
      const onSwipeRight = jest.fn()
      renderHook(() => useTouch({ element: div, onSwipeDown, onSwipeRight, swipeThreshold: 30 }))

      act(() => {
        dispatchTouch(div, 'touchstart', 50, 50)
        dispatchTouch(div, 'touchend', 60, 65)
      })

      expect(onSwipeDown).not.toHaveBeenCalled()
      expect(onSwipeRight).not.toHaveBeenCalled()
    })

    it('respects custom swipeThreshold', () => {
      const onSwipeDown = jest.fn()
      renderHook(() => useTouch({ element: div, onSwipeDown, swipeThreshold: 80 }))

      // 60px swipe — under custom threshold
      act(() => {
        dispatchTouch(div, 'touchstart', 50, 50)
        dispatchTouch(div, 'touchend', 50, 110)
      })
      expect(onSwipeDown).not.toHaveBeenCalled()

      // 100px swipe — over custom threshold
      act(() => {
        dispatchTouch(div, 'touchstart', 50, 50)
        dispatchTouch(div, 'touchend', 50, 150)
      })
      expect(onSwipeDown).toHaveBeenCalledTimes(1)
    })

    it('fires both onSwipe (raw) and the matching directional callback', () => {
      const onSwipe = jest.fn()
      const onSwipeRight = jest.fn()
      renderHook(() => useTouch({ element: div, onSwipe, onSwipeRight }))

      act(() => {
        dispatchTouch(div, 'touchstart', 50, 50)
        dispatchTouch(div, 'touchend', 150, 60)
      })

      expect(onSwipe).toHaveBeenCalledWith({ x: 100, y: 10 })
      expect(onSwipeRight).toHaveBeenCalledTimes(1)
    })
  })

  describe('backwards compatibility (ref path)', () => {
    it('works with an external ref like Carousel/Tooltip', () => {
      const onSwipe = jest.fn()
      const div = document.createElement('div')
      document.body.appendChild(div)

      const { result } = renderHook(() => {
        const ref = useRef<HTMLElement | null>(null)
        ref.current = div
        useTouch({ ref, onSwipe })
        return ref
      })

      // The ref is set before useEffect runs (mirroring the always-mounted case)
      act(() => {
        dispatchTouch(div, 'touchstart', 50, 50)
        dispatchTouch(div, 'touchend', 100, 50)
      })

      expect(onSwipe).toHaveBeenCalledWith({ x: 50, y: 0 })
      expect(result.current.current).toBe(div)
      document.body.removeChild(div)
    })
  })

  describe('non-touch device', () => {
    it('does not fire callbacks when ontouchstart is unavailable', () => {
      disableTouch()
      const div = document.createElement('div')
      document.body.appendChild(div)
      const onSwipeDown = jest.fn()

      renderHook(() => useTouch({ element: div, onSwipeDown, swipeThreshold: 50 }))

      act(() => {
        dispatchTouch(div, 'touchstart', 100, 100)
        dispatchTouch(div, 'touchend', 100, 200)
      })

      expect(onSwipeDown).not.toHaveBeenCalled()
      document.body.removeChild(div)
    })
  })
})
