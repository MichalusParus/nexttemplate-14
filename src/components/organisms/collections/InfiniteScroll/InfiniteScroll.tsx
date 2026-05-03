'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef } from 'react'

import { Alert } from '@/components/atoms/common/Alert'
import { Button } from '@/components/atoms/common/Button'
import { CircularLoader } from '@/components/atoms/loaders/CircularLoader'
import { P } from '@/components/atoms/typography/P'
import { devWarning } from '@/components/utils/devWarning'
import { NativeDivProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { getScrollParent, useInfiniteScroll } from './useInfiniteScroll'

const MIN_BIDIRECTIONAL_HEIGHT = 600

const noop = () => {}

export type ScrollSide = {
  /** whether more items exist in this direction */
  has: boolean
  /** fetch function — must be stable (useCallback) */
  onLoad: () => void | Promise<void>
  /** true while fetch is in flight — suppresses sentinel firing */
  isLoading?: boolean
  /** true when fetch errored — suppresses sentinel, shows retry UI */
  isError?: boolean
  /** bumps when the consumer commits a new batch (e.g. items.length); re-arms the sentinel */
  generation: number
}

export type InfiniteScrollProps = NativeDivProps & {
  /** custom tailwind classes */
  className?: string
  /** loads more items above the children */
  top?: ScrollSide
  /** loads more items below the children */
  bottom?: ScrollSide
  /** distance in pixels from the edge to trigger loading — higher values prefetch earlier (default 200) */
  prefetchDistance?: number
}

/** Bidirectional infinite scroll container with sentinel-based loading, generation-gated firing, and top-side scroll preservation. USE CLIENT */
export const InfiniteScroll = forwardRef<HTMLDivElement | null, InfiniteScrollProps>(
  ({ className, top, bottom, prefetchDistance, children, ...rest }, ref) => {
    const t = useTranslations('Components')

    const scrollRootRef = useRef<HTMLElement | null>(null)
    const distFromBottomRef = useRef<number | null>(null)
    const lastTopGenerationRef = useRef<number | null>(null)
    const scrollListenerRef = useRef<(() => void) | null>(null)

    const { sentinelRef: topSentinelRef } = useInfiniteScroll({
      onIntersect: top?.onLoad ?? noop,
      disabled: !top?.has || !!top?.isLoading || !!top?.isError,
      generation: top?.generation ?? 0,
      prefetchDistance,
    })

    const { sentinelRef: bottomSentinelRef } = useInfiniteScroll({
      onIntersect: bottom?.onLoad ?? noop,
      disabled: !bottom?.has || !!bottom?.isLoading || !!bottom?.isError,
      generation: bottom?.generation ?? 0,
      prefetchDistance,
    })

    useEffect(() => {
      if (!top || !bottom) return
      const root = scrollRootRef.current
      if (!root) return
      devWarning(
        root.clientHeight < MIN_BIDIRECTIONAL_HEIGHT,
        `InfiniteScroll: bidirectional containers should be at least ${MIN_BIDIRECTIONAL_HEIGHT}px tall (got ${root.clientHeight}px). Shorter containers cause load loops because the two 200px prefetch zones overlap.`,
      )
    }, [top, bottom])

    const setOuterRef = useCallback(
      (node: HTMLDivElement | null) => {
        const previousRoot = scrollRootRef.current
        const previousListener = scrollListenerRef.current
        if (previousRoot && previousListener) {
          previousRoot.removeEventListener('scroll', previousListener)
        }
        scrollRootRef.current = null
        scrollListenerRef.current = null

        if (node) {
          const root = getScrollParent(node)
          scrollRootRef.current = root
          if (root) {
            const onScroll = () => {
              distFromBottomRef.current = root.scrollHeight - root.scrollTop
            }
            scrollListenerRef.current = onScroll
            root.addEventListener('scroll', onScroll, { passive: true })
          }
        }

        if (typeof ref === 'function') ref(node)
        else if (ref) (ref as { current: HTMLDivElement | null }).current = node
      },
      [ref],
    )

    useLayoutEffect(() => {
      const root = scrollRootRef.current
      if (!root) return
      const topGen = top?.generation
      const lastGen = lastTopGenerationRef.current
      if (topGen != null && (lastGen == null || topGen > lastGen)) {
        if (lastGen != null) {
          const dist = distFromBottomRef.current
          if (dist != null) root.scrollTop = root.scrollHeight - dist
        }
        lastTopGenerationRef.current = topGen
      }
      distFromBottomRef.current = root.scrollHeight - root.scrollTop
    })

    const hasChildren = !!children && (!Array.isArray(children) || children.length > 0)
    const topExhausted = !top || (!top.has && !top.isLoading && !top.isError)
    const bottomExhausted = !bottom || (!bottom.has && !bottom.isLoading && !bottom.isError)
    const showEndReached = hasChildren && topExhausted && bottomExhausted && (!!top || !!bottom)

    return (
      <div
        className={cn('InfiniteScroll', className)}
        ref={setOuterRef}
        data-testid="InfiniteScroll"
        {...rest}
      >
        {top && (
          <div
            ref={topSentinelRef}
            className="h-px"
            aria-hidden
            data-testid="InfiniteScroll-TopSentinel"
          />
        )}
        {top?.isLoading && <CircularLoader className="mx-auto my-4" hideLabel />}
        {top?.isError && (
          <Alert
            className="my-4"
            status="error"
            endIcon={
              <Button variant="outlined" size="sm" onClick={() => top.onLoad()}>
                {t('infiniteScroll.retry')}
              </Button>
            }
          >
            {t('infiniteScroll.error')}
          </Alert>
        )}

        {children}

        {bottom?.isLoading && <CircularLoader className="mx-auto my-4" hideLabel />}
        {bottom?.isError && (
          <Alert
            className="my-4"
            status="error"
            endIcon={
              <Button variant="outlined" size="sm" onClick={() => bottom.onLoad()}>
                {t('infiniteScroll.retry')}
              </Button>
            }
          >
            {t('infiniteScroll.error')}
          </Alert>
        )}
        {showEndReached && (
          <P size="sm" align="text-center" className="py-4">
            {t('infiniteScroll.endReached')}
          </P>
        )}
        {bottom && (
          <div
            ref={bottomSentinelRef}
            className="h-px"
            aria-hidden
            data-testid="InfiniteScroll-BottomSentinel"
          />
        )}
      </div>
    )
  },
)

InfiniteScroll.displayName = 'InfiniteScroll'
