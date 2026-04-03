'use client'
import { forwardRef, Fragment, ReactNode, useMemo } from 'react'

import { P } from '@/components/atoms/typography/P'
import { Pagination, PaginationProps } from '@/components/organisms/common/Pagination'
import { devWarning } from '@/components/utils/devWarning'
import { NativeDivProps } from '@/components/utils/types'
import { usePagination } from '@/utils/hooks/usePagination'
import { cn } from '@/utils/utils'

const EMPTY_ARRAY: never[] = []

export type CardGridProps<T> = NativeDivProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** array of items to display */
  items: T[]
  /** loading ghost state */
  isLoading?: boolean
  /** content shown when items array is empty and not loading */
  emptyState?: ReactNode
  /** items per page — controls ghost count during loading, enables client-side pagination when set without onPageChange */
  itemsPerPage?: number
  /** total number of pages — required with onPageChange for server-side pagination (matches Pagination count prop) */
  count?: number
  /** controlled current page — required with onPageChange for server-side pagination */
  page?: number
  /** additional props passed to the Pagination component */
  paginationProps?: Partial<PaginationProps>
  /** extract unique key from each item */
  getKey: (item: T) => string | number
  /** render function for each item */
  renderItem: (item: T, index: number) => ReactNode
  /** render function for each ghost skeleton item */
  renderGhost: (index: number) => ReactNode
  /** callback when page changes — enables server-side pagination */
  onPageChange?: (page: number) => void
}

/** Generic card grid with loading ghosts, empty state, and client/server pagination. Native HTMLAttributes props supported. USE CLIENT */
function CardGridComponent<T>(
  {
    className,
    items,
    isLoading = false,
    emptyState,
    itemsPerPage,
    count,
    page,
    paginationProps = {},
    getKey,
    renderItem,
    renderGhost,
    onPageChange,
    ...rest
  }: CardGridProps<T>,
  ref: React.ForwardedRef<HTMLDivElement | null>,
) {
  devWarning(
    !!onPageChange && (count == null || page == null),
    'CardGrid: `onPageChange` requires both `count` and `page` props for server-side pagination.',
  )
  devWarning(itemsPerPage != null && itemsPerPage < 1, 'CardGrid: `itemsPerPage` must be >= 1.')
  devWarning(count != null && count < 0, 'CardGrid: `count` must be >= 0.')
  devWarning(
    page != null && count != null && page > count && count > 0,
    'CardGrid: `page` exceeds `count`.',
  )

  const isServerPagination = !!onPageChange
  const isClientPagination = !isServerPagination && itemsPerPage != null

  const {
    pagedData: clientPagedData,
    pages: clientPages,
    page: clientPage,
    onChange: clientPageChange,
  } = usePagination(isClientPagination ? items : EMPTY_ARRAY, itemsPerPage ?? 1)

  const displayItems = isClientPagination ? clientPagedData : items
  const paginationCount = isServerPagination
    ? (count ?? 1)
    : isClientPagination
      ? clientPages.length
      : 0
  const paginationPage = isServerPagination ? (page ?? 1) : clientPage
  const handlePageChange = isServerPagination ? onPageChange : clientPageChange
  const showPagination = (isServerPagination || isClientPagination) && paginationCount > 1

  const ghostItems = useMemo(
    () => Array.from({ length: itemsPerPage ?? 3 }, (_, i) => i),
    [itemsPerPage],
  )

  const isEmpty = !isLoading && items.length === 0

  return (
    <>
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
          ghostItems.map(i => <Fragment key={`ghost-${i}`}>{renderGhost(i)}</Fragment>)}
        {!isLoading &&
          !isEmpty &&
          displayItems.map((item, index) => (
            <Fragment key={getKey(item)}>{renderItem(item, index)}</Fragment>
          ))}
      </div>
      {showPagination && (
        <Pagination
          count={paginationCount}
          page={paginationPage}
          onChange={handlePageChange}
          isLoading={isLoading}
          {...paginationProps}
          className={cn('mx-auto mt-10 mb-4', paginationProps.className)}
        />
      )}
    </>
  )
}

type CardGridComponentType = <T>(
  props: CardGridProps<T> & { ref?: React.ForwardedRef<HTMLDivElement | null> },
) => React.ReactElement | null

export const CardGrid = forwardRef(CardGridComponent) as CardGridComponentType & {
  displayName?: string
}

CardGrid.displayName = 'CardGrid'
