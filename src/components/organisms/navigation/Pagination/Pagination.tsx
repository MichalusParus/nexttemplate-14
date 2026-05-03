'use client'
import { forwardRef } from 'react'

import { ButtonProps } from '@/components/atoms/common/Button/Button'
import {
  PageSpread,
  useResponsivePageSpread,
} from '@/components/organisms/navigation/Pagination/useResponsivePageSpread'
import { devWarning } from '@/components/utils/devWarning'

import { MobilePagination } from './MobilePagination'
import { MobilePaginationProps } from './MobilePagination/MobilePagination'
import { ScreenPagination } from './ScreenPagination'

export type PaginationProps = MobilePaginationProps & {
  /** maximal page spread, affect component width */
  maxSpread?: PageSpread
  /** optional props for load more button */
  loadMoreButtonProps?: Partial<ButtonProps>
  /** on Load More button fn */
  onLoadMore?: () => void
}

/** Responsive pagination component. For client side pagination is recommended to use with usePagination custom hook. ButtonProps supported. USE CLIENT */
export const Pagination = forwardRef<HTMLDivElement | null, PaginationProps>(
  (
    {
      className,
      count,
      page,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      isLoading = false,
      hideNav,
      maxSpread,
      loadMoreCount = 0,
      buttonProps = {},
      loadMoreButtonProps = {},
      onChange,
      onLoadMore,
    },
    ref,
  ) => {
    devWarning(page < 1, 'Pagination: `page` must be >= 1.')
    devWarning(count < 0, 'Pagination: `count` must be >= 0.')
    devWarning(page > count && count > 0, 'Pagination: `page` exceeds `count`.')

    const pageSpread = useResponsivePageSpread(maxSpread)

    return pageSpread === 0 ? (
      <MobilePagination
        className={className}
        count={count}
        page={page}
        variant={variant}
        color={color}
        size={size}
        isLoading={isLoading}
        hideNav={hideNav}
        loadMoreCount={loadMoreCount}
        buttonProps={buttonProps}
        onChange={onChange}
        ref={ref}
      />
    ) : (
      <ScreenPagination
        className={className}
        count={count}
        page={page}
        pageSpread={pageSpread}
        variant={variant}
        color={color}
        size={size}
        isLoading={isLoading}
        hideNav={hideNav}
        loadMoreCount={loadMoreCount}
        buttonProps={buttonProps}
        loadMoreButtonProps={loadMoreButtonProps}
        onChange={onChange}
        onLoadMore={onLoadMore}
        ref={ref}
      />
    )
  },
)

Pagination.displayName = 'Pagination'
