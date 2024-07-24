'use client'
import { useTranslations } from 'next-intl'
import { forwardRef } from 'react'

import Button from '@/components/atoms/common/Button'
import { ButtonProps } from '@/components/atoms/common/Button/Button'
import ChevronIcon from '@/components/atoms/icons/ChevronIcon'
import { cn, filterOutKeys } from '@/utils/utils'

import { arrowClass, chevronPosition } from './MobilePagination.style'

export type MobilePaginationProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** array of available pages */
  pages: number[]
  /** current selected page */
  selectedPage: number
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
  /** size of component, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'none'
  /** count of load more button clicks */
  loadMoreCount?: number
  /** optional props for button component */
  buttonProps?: Partial<ButtonProps>
  /** function for selecting page */
  setSelectedPage: (page: number) => void
}

/** Minimalistic mobile screen pagination. ButtonProps supported. USE CLIENT */
export const MobilePagination = forwardRef<HTMLDivElement, MobilePaginationProps>(
  (
    {
      className = '',
      pages,
      selectedPage,
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
    return (
      <div
        className={cn(
          'MobilePagination',
          'relative',
          chevronPosition[size],
          pages.length > 1 ? 'visible' : 'invisible',
          className,
        )}
        ref={ref}
        data-testid="MobilePagination"
      >
        {selectedPage !== 1 ? (
          <Button
            className={cn('LeftChevronButton', 'rotate-90', arrowClass, buttonProps.className)}
            variant={variant}
            color={color}
            size={size}
            startIcon={<ChevronIcon />}
            onClick={() => setSelectedPage(selectedPage - 1)}
            aria-label={t('previousPage', { page: selectedPage - 1 })}
            hideShadow
            {...filterOutKeys(buttonProps, ['className'])}
          />
        ) : null}
        <div
          className={cn('SelectedOutOff', 'cursor-default font-semibold')}
          data-testid="SelectedOutOff"
        >
          {`${selectedPage}${loadMoreCount ? `-${selectedPage + loadMoreCount}` : ''}`} /{' '}
          {pages.length}
        </div>
        {selectedPage + loadMoreCount < pages.length ? (
          <Button
            className={cn('RightChevronButton', '-rotate-90', arrowClass, buttonProps.className)}
            variant={variant}
            color={color}
            size={size}
            startIcon={<ChevronIcon />}
            onClick={() => setSelectedPage(selectedPage + loadMoreCount + 1)}
            aria-label={t('nextPage', {
              page: selectedPage + 1,
            })}
            hideShadow
            {...filterOutKeys(buttonProps, ['className'])}
          />
        ) : null}
      </div>
    )
  },
)

MobilePagination.displayName = 'MobilePagination'
