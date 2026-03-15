'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, useCallback, useMemo, useRef } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { ButtonProps } from '@/components/atoms/common/Button/Button'
import { ChevronIcon } from '@/components/atoms/icons'
import { useFocus } from '@/components/utils/hooks/useFocus'
import { cn } from '@/utils/utils'

import { MobilePaginationProps } from '../MobilePagination/MobilePagination'
import { chevronPosition } from '../MobilePagination/MobilePagination.style'
import { PageSpread } from '../useResponsivePageSpread'
import { dottColor, pageButtonSize } from './ScreenPagination.style'

export type ScreenPaginationProps = MobilePaginationProps & {
  /** number of visible pages */
  pageSpread: PageSpread
  /** optional props for load more button */
  loadMoreButtonProps?: Partial<ButtonProps>
  /** on Load More button fn */
  onLoadMore?: () => void
}

/** Static pagination component with fixed page spread. ButtonProps supported. USE CLIENT */
export const ScreenPagination = forwardRef<HTMLDivElement | null, ScreenPaginationProps>(
  (
    {
      className,
      count,
      page,
      pageSpread,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      isLoading,
      hideNav,
      loadMoreCount = 0,
      buttonProps = {},
      loadMoreButtonProps = {},
      onChange,
      onLoadMore,
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const componentRef = useRef<HTMLDivElement>(null)
    const { className: buttonClassName, ...restButtonProps } = buttonProps
    const { className: loadMoreButtonClassName, ...restLoadMoreButtonProps } = loadMoreButtonProps
    const Element = hideNav ? 'div' : 'nav'
    const pages = useMemo(() => Array.from({ length: count }, (_, i) => i + 1), [count])
    const showEllipsis = count > ((pageSpread - 5) / 2) * 2 + 6
    const sidePagesCount = (pageSpread - 5) / 2

    useFocus(true, componentRef, {
      triggerRef: { current: null },
      selectors: ['.PageButton'],
      value: pageSpread,
    })

    const loadingPages = useMemo(() => {
      const skeletonCount = Math.min(5, pageSpread)
      return Array.from({ length: skeletonCount }, (_, i) => i + 1)
    }, [pageSpread])

    const displayablePages = useMemo(() => {
      if (isLoading) return loadingPages

      const minPagesForEllipsis = sidePagesCount * 2 + 6
      // too short fot ellipsis
      if (count <= minPagesForEllipsis) return pages
      // ellipsis start
      if (page < sidePagesCount + 4) {
        return pages.slice(0, sidePagesCount * 2 + 3)
      }
      // ellipsis end
      if (page > count - (sidePagesCount + 3)) {
        return pages.slice(count - (sidePagesCount * 2 + 3), count)
      }
      // both ellipsis
      return pages.filter(p => p >= page - sidePagesCount && p <= page + sidePagesCount)
    }, [isLoading, loadingPages, pages, count, page, sidePagesCount])

    const isSelected = useCallback(
      (pageNum: number) => pageNum >= page && pageNum <= page + loadMoreCount,
      [page, loadMoreCount],
    )

    return (
      <div
        className={cn('ScreenPaginationWrap', 'relative flex flex-col items-center', className)}
        data-testid="ScreenPaginationWrap"
        ref={ref}
      >
        {onLoadMore && page + loadMoreCount < count && (
          <Button
            className={cn('LoadMoreButton', 'mb-6', loadMoreButtonClassName)}
            variant={variant}
            color={color}
            size={size}
            onClick={onLoadMore}
            data-testid="LoadMoreButton"
            {...restLoadMoreButtonProps}
          >
            {loadMoreButtonProps.children || t('loadMore')}
          </Button>
        )}
        <Element
          className={cn(
            'ScreenPagination',
            'relative flex w-max',
            chevronPosition[size],
            count <= 1 && 'invisible',
          )}
          {...(Element === 'nav' && { 'aria-label': t('pagination') })}
          data-testid="ScreenPagination"
          ref={componentRef}
        >
          {(page !== 1 || isLoading) && (
            <Button
              className={cn(
                'LeftChevronButton',
                'absolute top-1/2 translate-y-[-50%] [&_svg]:rotate-90',
                buttonClassName,
              )}
              variant={variant}
              color={color}
              size={size}
              startIcon={<ChevronIcon />}
              disabled={isLoading}
              onClick={() => onChange(page - 1)}
              tabIndex={-1}
              aria-label={t('previousPage', { page: page - 1 })}
              {...restButtonProps}
            />
          )}
          {!isLoading && showEllipsis && page > sidePagesCount + 3 && (
            <Button
              className={cn(
                'PageButton',
                pageButtonSize[size],
                isSelected(pages[0]) && 'selected',
                buttonClassName,
              )}
              variant={variant}
              color={color}
              size={size}
              startIcon={String(pages[0])}
              disabled={isLoading}
              onClick={() => onChange(pages[0])}
              tabIndex={isSelected(pages[0]) ? 0 : -1}
              aria-label={t('page', { page: pages[0] })}
              aria-current={pages[0] === page ? 'page' : undefined}
              {...restButtonProps}
            />
          )}
          {!isLoading && showEllipsis && page > sidePagesCount + 3 && (
            <div
              className={cn('DottWrap', 'flex items-center justify-around', pageButtonSize[size])}
              role="presentation"
              aria-hidden="true"
              data-testid="DottWrap"
            >
              <div className={dottColor[color]} />
              <div className={dottColor[color]} />
              <div className={dottColor[color]} />
            </div>
          )}
          {displayablePages.map(pageNum => (
            <Button
              key={pageNum}
              className={cn(
                'PageButton',
                pageButtonSize[size],
                isSelected(pageNum) && 'selected',
                buttonClassName,
              )}
              variant={variant}
              color={color}
              size={size}
              startIcon={String(pageNum)}
              disabled={isLoading}
              onClick={() => onChange(pageNum)}
              tabIndex={isSelected(pageNum) ? 0 : -1}
              aria-label={t('page', { page: pageNum })}
              aria-current={pageNum === page ? 'page' : undefined}
              {...restButtonProps}
            />
          ))}
          {!isLoading && showEllipsis && page < count - (sidePagesCount + 2) && (
            <div
              className={cn('DottWrap', 'flex items-center justify-around', pageButtonSize[size])}
              role="presentation"
              aria-hidden="true"
              data-testid="DottWrap"
            >
              <div className={dottColor[color]} />
              <div className={dottColor[color]} />
              <div className={dottColor[color]} />
            </div>
          )}
          {!isLoading && showEllipsis && page < count - (sidePagesCount + 2) && (
            <Button
              className={cn(
                'PageButton',
                pageButtonSize[size],
                isSelected(pages[count - 1]) && 'selected',
                buttonClassName,
              )}
              variant={variant}
              color={color}
              size={size}
              startIcon={String(pages[count - 1])}
              disabled={isLoading}
              onClick={() => onChange(pages[count - 1])}
              tabIndex={isSelected(pages[count - 1]) ? 0 : -1}
              aria-label={t('page', { page: pages[count - 1] })}
              aria-current={pages[count - 1] === page ? 'page' : undefined}
              {...restButtonProps}
            />
          )}
          {(page + loadMoreCount < count || isLoading) && (
            <Button
              className={cn(
                'RightChevronButton',
                'absolute top-1/2 translate-y-[-50%] [&_svg]:-rotate-90',
                buttonClassName,
              )}
              variant={variant}
              color={color}
              size={size}
              startIcon={<ChevronIcon />}
              disabled={isLoading}
              onClick={() => onChange(page + loadMoreCount + 1)}
              tabIndex={-1}
              aria-label={t('nextPage', {
                page: page + loadMoreCount + 1,
              })}
              {...restButtonProps}
            />
          )}
        </Element>
      </div>
    )
  },
)

ScreenPagination.displayName = 'ScreenPagination'
