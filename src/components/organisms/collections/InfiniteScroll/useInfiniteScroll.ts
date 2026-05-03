import { useCallback, useEffect, useRef } from 'react'

const DEFAULT_PREFETCH_PX = 200

export const getScrollParent = (el: HTMLElement): HTMLElement | null => {
  let parent = el.parentElement
  while (parent) {
    const { overflowY } = getComputedStyle(parent)
    if (overflowY === 'auto' || overflowY === 'scroll') return parent
    parent = parent.parentElement
  }
  return null
}

const isSentinelInPrefetchZone = (el: HTMLElement | null, prefetchPx: number): boolean => {
  if (!el) return false
  const sRect = el.getBoundingClientRect()
  const root = getScrollParent(el)
  if (root) {
    const rRect = root.getBoundingClientRect()
    return sRect.bottom >= rRect.top - prefetchPx && sRect.top <= rRect.bottom + prefetchPx
  }
  const vh = window.innerHeight || document.documentElement.clientHeight
  return sRect.bottom >= -prefetchPx && sRect.top <= vh + prefetchPx
}

export type UseInfiniteScrollOptions = {
  /** called when the sentinel is in view and the generation has advanced */
  onIntersect: () => void | Promise<void>
  /** suppresses firing while truthy (e.g. fetch in flight, error state) */
  disabled?: boolean
  /** bumps when the consumer commits a new batch; re-arms the sentinel for one more fire */
  generation: number
  /** distance in pixels from the edge to trigger loading (default 200) */
  prefetchDistance?: number
}

/** IntersectionObserver-based sentinel hook. Fires `onIntersect` at most once per distinct `generation`, gated by `disabled`. Returns a callback ref to attach to a 1px sentinel element. */
export const useInfiniteScroll = ({
  onIntersect,
  disabled = false,
  generation,
  prefetchDistance,
}: UseInfiniteScrollOptions) => {
  const prefetchPx = prefetchDistance ?? DEFAULT_PREFETCH_PX
  const rootMargin = `${prefetchPx}px`

  const stateRef = useRef({
    onIntersect,
    disabled,
    generation,
    prefetchPx,
    sentinelNode: null as HTMLDivElement | null,
    observer: null as IntersectionObserver | null,
    isIntersecting: false,
    lastFiredGeneration: null as number | null,
    pendingFire: false,
  })
  stateRef.current.onIntersect = onIntersect
  stateRef.current.disabled = disabled
  stateRef.current.generation = generation
  stateRef.current.prefetchPx = prefetchPx

  useEffect(() => {
    const s = stateRef.current
    if (s.lastFiredGeneration === null && !s.pendingFire) return
    if (s.disabled) return
    if (s.lastFiredGeneration === s.generation) return
    if (!isSentinelInPrefetchZone(s.sentinelNode, s.prefetchPx)) return
    s.lastFiredGeneration = s.generation
    s.pendingFire = false
    s.onIntersect()
  }, [generation, disabled])

  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      const s = stateRef.current
      if (s.observer) {
        s.observer.disconnect()
        s.observer = null
      }
      s.sentinelNode = node
      if (!node) return
      s.observer = new IntersectionObserver(
        ([entry]) => {
          s.isIntersecting = entry.isIntersecting
          if (!entry.isIntersecting) return
          if (s.disabled) {
            s.pendingFire = true
            return
          }
          if (s.lastFiredGeneration === s.generation) return
          s.lastFiredGeneration = s.generation
          s.pendingFire = false
          s.onIntersect()
        },
        { root: getScrollParent(node), rootMargin, threshold: 0 },
      )
      s.observer.observe(node)
    },
    [rootMargin],
  )

  return { sentinelRef }
}
