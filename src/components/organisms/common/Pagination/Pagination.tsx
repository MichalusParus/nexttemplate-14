'use client'
import { useTranslations } from 'next-intl'
import { forwardRef } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { ButtonProps } from '@/components/atoms/common/Button/Button'
import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { MobilePagination } from './MobilePagination'
import { MobilePaginationProps } from './MobilePagination/MobilePagination'
import { ScreenPagination } from './ScreenPagination'

export type PaginationProps = MobilePaginationProps & {
  /** name of the pagination component */
  name: string
  /** maximal page spread, affect component width */
  maxSpread?: 7 | 9 | 11 | 13 | 15 | 17
  /** style variant of component */
  variant?: StyleProps['variant']
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
      name,
      count,
      selectedPage,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      maxSpread,
      buttonProps,
      loadMoreCount = 0,
      loadMoreButtonProps = {},
      setSelectedPage,
      onLoadMore,
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const { className: buttonClassName, ...restButtonProps } = loadMoreButtonProps

    const getPageSpread = (value: number) => {
      if (maxSpread) {
        if (maxSpread < value) {
          return maxSpread
        } else {
          return value
        }
      } else {
        return value
      }
    }

    return (
      <div
        className={cn('PaginationWrap', 'relative flex flex-col items-center', className)}
        data-testid="Pagination"
      >
        {onLoadMore && selectedPage + loadMoreCount < count && (
          <Button
            className={cn('LoadMoreButton', 'mb-6', buttonClassName)}
            variant={variant}
            color={color}
            size={size}
            onClick={onLoadMore}
            {...restButtonProps}
          >
            {loadMoreButtonProps.children || t('loadMore')}
          </Button>
        )}
        <div className={cn('PaginationInnerWrap', 'flex xs:hidden')}>
          <MobilePagination
            count={count}
            selectedPage={selectedPage}
            color={color}
            size={size}
            loadMoreCount={loadMoreCount}
            buttonProps={buttonProps}
            setSelectedPage={setSelectedPage}
            ref={ref}
          />
        </div>
        <div className={cn('PaginationInnerWrap', 'hidden xs:flex sm:hidden')}>
          <ScreenPagination
            name={name}
            count={count}
            selectedPage={selectedPage}
            pageSpread={getPageSpread(7)}
            variant={variant}
            color={color}
            size={size}
            loadMoreCount={loadMoreCount}
            buttonProps={buttonProps}
            setSelectedPage={setSelectedPage}
            ref={ref}
          />
        </div>
        <div className={cn('PaginationInnerWrap', 'hidden sm:flex md:hidden')}>
          <ScreenPagination
            name={name}
            count={count}
            selectedPage={selectedPage}
            pageSpread={getPageSpread(9)}
            variant={variant}
            color={color}
            size={size}
            loadMoreCount={loadMoreCount}
            buttonProps={buttonProps}
            setSelectedPage={setSelectedPage}
            ref={ref}
          />
        </div>
        <div className={cn('PaginationInnerWrap', 'hidden md:flex lg:hidden')}>
          <ScreenPagination
            name={name}
            count={count}
            selectedPage={selectedPage}
            pageSpread={getPageSpread(11)}
            variant={variant}
            color={color}
            size={size}
            loadMoreCount={loadMoreCount}
            buttonProps={buttonProps}
            setSelectedPage={setSelectedPage}
            ref={ref}
          />
        </div>
        <div className={cn('PaginationInnerWrap', 'hidden lg:flex xl:hidden')}>
          <ScreenPagination
            name={name}
            count={count}
            selectedPage={selectedPage}
            pageSpread={getPageSpread(13)}
            variant={variant}
            color={color}
            size={size}
            loadMoreCount={loadMoreCount}
            buttonProps={buttonProps}
            setSelectedPage={setSelectedPage}
            ref={ref}
          />
        </div>
        <div className={cn('PaginationInnerWrap', 'hidden xl:flex 2xl:hidden')}>
          <ScreenPagination
            name={name}
            count={count}
            selectedPage={selectedPage}
            pageSpread={getPageSpread(15)}
            variant={variant}
            color={color}
            size={size}
            loadMoreCount={loadMoreCount}
            buttonProps={buttonProps}
            setSelectedPage={setSelectedPage}
            ref={ref}
          />
        </div>
        <div className={cn('PaginationInnerWrap', 'hidden 2xl:flex')}>
          <ScreenPagination
            name={name}
            count={count}
            selectedPage={selectedPage}
            pageSpread={getPageSpread(17)}
            variant={variant}
            color={color}
            size={size}
            loadMoreCount={loadMoreCount}
            buttonProps={buttonProps}
            setSelectedPage={setSelectedPage}
            ref={ref}
          />
        </div>
      </div>
    )
  },
)

Pagination.displayName = 'Pagination'
