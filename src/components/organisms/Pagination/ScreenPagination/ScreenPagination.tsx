'use client'
import { useTranslations } from 'next-intl'
import {
  forwardRef,
  KeyboardEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import Button from '@/components/atoms/common/Button'
import ChevronIcon from '@/components/atoms/icons/ChevronIcon'
import { useFocus } from '@/utils/hooks/useFocus'
import { cn, filterOutKeys } from '@/utils/utils'

import { MobilePaginationProps } from '../MobilePagination/MobilePagination'
import { chevronPosition } from '../MobilePagination/MobilePagination.style'
import { dottColor, pageButtonSize } from './ScreenPagination.style'

export type ScreenPaginationProps = MobilePaginationProps & {
  /** name of the pagination component */
  name: string
  /** number of visible pages */
  pageSpread: number
}

/** Static pagination component with fixed page spread. ButtonProps supported. USE CLIENT */
export const ScreenPagination = forwardRef<HTMLDivElement, ScreenPaginationProps>(
  (
    {
      className,
      name,
      pages,
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
    useImperativeHandle(ref, () => componentRef.current!)
    const [isActive, setIsActive] = useState(false)
    const sidePagesCount = (pageSpread - 5) / 2

    const handleClose = () => {
      componentRef.current?.focus()
      setIsActive(false)
    }

    const { focusableEl } = useFocus(
      isActive,
      componentRef,
      ['.LeftChevronButton', '.RightChevronButton', '.PageButton'],
      handleClose,
      {
        value: selectedPage,
      },
    )

    const aroundPages = useCallback(() => {
      if (selectedPage < sidePagesCount + 4) {
        return pages.slice(0, sidePagesCount * 2 + 3)
      } else if (selectedPage > pages.length - (sidePagesCount + 3)) {
        return pages.slice(pages.length - (sidePagesCount * 2 + 3), pages.length)
      }
      return pages.filter(
        page => page >= selectedPage - sidePagesCount && page <= selectedPage + sidePagesCount,
      )
    }, [pages, selectedPage, sidePagesCount])

    const displayablePages = pages.length > sidePagesCount * 2 + 6 ? aroundPages() : pages

    const getSelectedClass = useCallback(
      (page: number) => page >= selectedPage && page <= selectedPage + loadMoreCount && 'selected',
      [selectedPage, loadMoreCount],
    )

    const handleClick = useCallback(
      (e: MouseEvent) => {
        const target = e.target as HTMLDivElement
        if (isActive && !componentRef.current?.contains(target)) {
          setIsActive(false)
          focusableEl[0].focus()
        }
      },
      [isActive, componentRef, focusableEl],
    )

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLDivElement
      if (target.id === name && (e.code === 'Enter' || e.code === 'Space')) {
        e.preventDefault()
        setIsActive(prev => !prev)
      }
    }

    useEffect(() => {
      if (typeof window !== 'undefined') {
        window.addEventListener('click', handleClick)
        return () => {
          window.removeEventListener('click', handleClick)
        }
      }
    }, [handleClick])

    return (
      <div
        className={cn(
          'ScreenPagination',
          'group relative flex focus:outline-none',
          chevronPosition[size],
          pages.length <= 1 && 'invisible',
          className,
        )}
        role="button"
        id={name}
        ref={componentRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        data-testid="ScreenPagination"
      >
        {selectedPage !== 1 && (
          <Button
            className={cn(
              'LeftChevronButton',
              'absolute top-1/2 translate-y-[-50%] [&_svg]:rotate-90',
              buttonProps.className,
            )}
            variant={variant}
            color={color}
            size={size}
            startIcon={<ChevronIcon />}
            onClick={() => setSelectedPage(selectedPage - 1)}
            aria-label={t('previousPage', { page: selectedPage - 1 })}
            {...filterOutKeys(buttonProps, ['className'])}
          />
        )}
        {pages.length > sidePagesCount * 2 + 6 && selectedPage > sidePagesCount + 3 && (
          <Button
            className={cn(
              'PageButton',
              pageButtonSize[size],
              getSelectedClass(pages[0]),
              buttonProps.className,
            )}
            variant={variant}
            color={color}
            size={size}
            startIcon={String(pages[0])}
            onClick={() => setSelectedPage(pages[0])}
            tabIndex={-1}
            aria-label={t('page', { page: pages[0] })}
            {...filterOutKeys(buttonProps, ['className'])}
          />
        )}
        {pages.length > sidePagesCount * 2 + 6 && selectedPage > sidePagesCount + 3 && (
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
              buttonProps.className,
            )}
            variant={variant}
            color={color}
            size={size}
            startIcon={String(page)}
            onClick={() => setSelectedPage(page)}
            tabIndex={-1}
            aria-label={t('page', { page: page })}
            {...filterOutKeys(buttonProps, ['className'])}
          />
        ))}
        {pages.length > sidePagesCount * 2 + 6 &&
          selectedPage < pages.length - (sidePagesCount + 2) && (
            <div
              className={cn('DottWrap', 'flex items-center justify-around', pageButtonSize[size])}
            >
              <div className={dottColor[color]} />
              <div className={dottColor[color]} />
              <div className={dottColor[color]} />
            </div>
          )}
        {pages.length > sidePagesCount * 2 + 6 &&
          selectedPage < pages.length - (sidePagesCount + 2) && (
            <Button
              className={cn(
                'PageButton',
                pageButtonSize[size],
                getSelectedClass(pages[pages.length - 1]),
                buttonProps.className,
              )}
              variant={variant}
              color={color}
              size={size}
              startIcon={String(pages[pages.length - 1])}
              onClick={() => setSelectedPage(pages[pages.length - 1])}
              tabIndex={-1}
              aria-label={t('page', { page: pages[pages.length - 1] })}
              {...filterOutKeys(buttonProps, ['className'])}
            />
          )}
        {selectedPage + loadMoreCount < pages.length && (
          <Button
            className={cn(
              'RightChevronButton',
              'absolute top-1/2 translate-y-[-50%] [&_svg]:-rotate-90',
              buttonProps.className,
            )}
            variant={variant}
            color={color}
            size={size}
            startIcon={<ChevronIcon />}
            onClick={() => setSelectedPage(selectedPage + loadMoreCount + 1)}
            aria-label={t('nextPage', {
              page: selectedPage + 1,
            })}
            {...filterOutKeys(buttonProps, ['className'])}
          />
        )}
      </div>
    )
  },
)

ScreenPagination.displayName = 'ScreenPagination'
