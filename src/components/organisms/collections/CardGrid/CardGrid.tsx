'use client'
import { forwardRef, ReactNode, useMemo } from 'react'

import { P } from '@/components/atoms/typography/P'
import { NativeDivProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

export type CardGridProps<T> = NativeDivProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** array of items to display */
  items: T[]
  /** loading ghost state */
  isLoading?: boolean
  /** content shown when items array is empty and not loading */
  emptyState?: ReactNode
  /** number of ghost skeletons to show during loading */
  ghostCount?: number
  /** extract unique key from each item */
  getKey: (item: T) => string | number
  /** render function for each item */
  renderItem: (item: T, index: number) => ReactNode
  /** render function for each ghost skeleton item */
  renderGhost: (index: number) => ReactNode
}

/** Generic card grid with loading ghosts and empty state. Pagination and infinite scroll are composed externally. Native HTMLAttributes props supported. USE CLIENT */
function CardGridComponent<T>(
  {
    className,
    items,
    isLoading = false,
    emptyState,
    ghostCount,
    getKey,
    renderItem,
    renderGhost,
    ...rest
  }: CardGridProps<T>,
  ref: React.ForwardedRef<HTMLDivElement | null>,
) {
  const ghostItems = useMemo(
    () => Array.from({ length: ghostCount ?? 3 }, (_, i) => i),
    [ghostCount],
  )

  const isEmpty = !isLoading && items.length === 0

  return (
    <div
      className={cn(
        'CardGrid',
        !isEmpty && 'grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-3',
        className,
      )}
      ref={ref}
      data-testid="CardGrid"
      aria-busy={isLoading || undefined}
      {...rest}
    >
      {isEmpty && emptyState && (
        <div className="flex items-center justify-center py-20">
          {typeof emptyState === 'string' ? <P color="secondary">{emptyState}</P> : emptyState}
        </div>
      )}
      {isLoading &&
        ghostItems.map(i => (
          <div
            key={`ghost-${i}`}
            className="animate-card-grid-ghost"
            style={{
              animationDelay: `${Math.round(Math.sqrt(i / ghostItems.length) * 200)}ms`,
            }}
          >
            {renderGhost(i)}
          </div>
        ))}
      {!isLoading &&
        !isEmpty &&
        items.map((item, index) => (
          <div
            key={getKey(item)}
            className="animate-card-grid-ghost"
            style={{
              animationDelay: `${Math.round(Math.sqrt(index / items.length) * 200)}ms`,
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
    </div>
  )
}

type CardGridComponentType = <T>(
  props: CardGridProps<T> & { ref?: React.ForwardedRef<HTMLDivElement | null> },
) => React.ReactElement | null

export const CardGrid = forwardRef(CardGridComponent) as CardGridComponentType & {
  displayName?: string
}

CardGrid.displayName = 'CardGrid'
