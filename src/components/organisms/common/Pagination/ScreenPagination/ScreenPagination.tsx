'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { ChevronIcon } from '@/components/atoms/icons'
import { cn } from '@/utils/utils'

import { MobilePaginationProps } from '../MobilePagination/MobilePagination'
import { chevronPosition } from '../MobilePagination/MobilePagination.style'
import { dottColor, pageButtonSize } from './ScreenPagination.style'

export type ScreenPaginationProps = MobilePaginationProps & {
  /** number of visible pages */
  pageSpread: number
}

/** Static pagination component with fixed page spread. ButtonProps supported. USE CLIENT */
export const ScreenPagination = forwardRef<HTMLDivElement | null, ScreenPaginationProps>(
  (
    {
      className,
      count,
      selectedPage,
      pageSpread,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      loadMoreCount = 0,
      buttonProps = {},
      setSelectedPage,
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const componentRef = useRef<HTMLDivElement | null>(null)
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
      ref,
      () => componentRef.current,
    )
    const { className: buttonClassName, ...restButtonProps } = buttonProps
    const pages = Array.from({ length: count }, (_, i) => i + 1)
    const sidePagesCount = (pageSpread - 5) / 2

    const aroundPages = useCallback(() => {
      if (selectedPage < sidePagesCount + 4) {
        return pages.slice(0, sidePagesCount * 2 + 3)
      } else if (selectedPage > count - (sidePagesCount + 3)) {
        return pages.slice(count - (sidePagesCount * 2 + 3), count)
      }
      return pages.filter(
        page => page >= selectedPage - sidePagesCount && page <= selectedPage + sidePagesCount,
      )
    }, [pages, count, selectedPage, sidePagesCount])

    const displayablePages = count > sidePagesCount * 2 + 6 ? aroundPages() : pages

    const getSelectedClass = useCallback(
      (page: number) => page >= selectedPage && page <= selectedPage + loadMoreCount && 'selected',
      [selectedPage, loadMoreCount],
    )

    return (
      <div
        className={cn(
          'ScreenPagination',
          'group relative flex focus:outline-none',
          chevronPosition[size],
          count <= 1 && 'invisible',
          className,
        )}
        ref={componentRef}
        data-testid="ScreenPagination"
      >
        {selectedPage !== 1 && (
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
            onClick={() => setSelectedPage(selectedPage - 1)}
            aria-label={t('previousPage', { page: selectedPage - 1 })}
            {...restButtonProps}
          />
        )}
        {count > sidePagesCount * 2 + 6 && selectedPage > sidePagesCount + 3 && (
          <Button
            className={cn(
              'PageButton',
              pageButtonSize[size],
              getSelectedClass(pages[0]),
              buttonClassName,
            )}
            variant={variant}
            color={color}
            size={size}
            startIcon={String(pages[0])}
            onClick={() => setSelectedPage(pages[0])}
            tabIndex={-1}
            aria-label={t('page', { page: pages[0] })}
            {...restButtonProps}
          />
        )}
        {count > sidePagesCount * 2 + 6 && selectedPage > sidePagesCount + 3 && (
          <div className={cn('DottWrap', 'flex items-center justify-around', pageButtonSize[size])}>
            <div className={dottColor[color]} />
            <div className={dottColor[color]} />
            <div className={dottColor[color]} />
          </div>
        )}
        {displayablePages.map(page => (
          <Button
            key={page}
            className={cn(
              'PageButton',
              pageButtonSize[size],
              getSelectedClass(page),
              buttonClassName,
            )}
            variant={variant}
            color={color}
            size={size}
            startIcon={String(page)}
            onClick={() => setSelectedPage(page)}
            tabIndex={-1}
            aria-label={t('page', { page: page })}
            {...restButtonProps}
          />
        ))}
        {count > sidePagesCount * 2 + 6 && selectedPage < count - (sidePagesCount + 2) && (
          <div className={cn('DottWrap', 'flex items-center justify-around', pageButtonSize[size])}>
            <div className={dottColor[color]} />
            <div className={dottColor[color]} />
            <div className={dottColor[color]} />
          </div>
        )}
        {count > sidePagesCount * 2 + 6 && selectedPage < count - (sidePagesCount + 2) && (
          <Button
            className={cn(
              'PageButton',
              pageButtonSize[size],
              getSelectedClass(pages[count - 1]),
              buttonClassName,
            )}
            variant={variant}
            color={color}
            size={size}
            startIcon={String(pages[count - 1])}
            onClick={() => setSelectedPage(pages[count - 1])}
            tabIndex={-1}
            aria-label={t('page', { page: pages[count - 1] })}
            {...restButtonProps}
          />
        )}
        {selectedPage + loadMoreCount < count && (
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
            onClick={() => setSelectedPage(selectedPage + loadMoreCount + 1)}
            aria-label={t('nextPage', {
              page: selectedPage + 1,
            })}
            {...restButtonProps}
          />
        )}
      </div>
    )
  },
)

ScreenPagination.displayName = 'ScreenPagination'
