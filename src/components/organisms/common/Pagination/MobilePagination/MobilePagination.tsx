'use client'
import { useTranslations } from 'next-intl'
import { forwardRef } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { ButtonProps } from '@/components/atoms/common/Button/Button'
import { ChevronIcon } from '@/components/atoms/icons'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { arrowClass, chevronPosition } from './MobilePagination.style'

export type MobilePaginationProps = StyleProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** total number of pages */
  count: number
  /** current selected page */
  selectedPage: number
  /** count of load more button clicks */
  loadMoreCount?: number
  /** optional props for button component */
  buttonProps?: Partial<ButtonProps>
  /** function for selecting page */
  setSelectedPage: (page: number) => void
}

/** Minimalistic mobile screen pagination. ButtonProps supported. USE CLIENT */
export const MobilePagination = forwardRef<HTMLDivElement | null, MobilePaginationProps>(
  (
    {
      className,
      count,
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
    const { className: buttonClassName, ...restButtonProps } = buttonProps

    return (
      <div
        className={cn(
          'MobilePagination',
          'relative',
          chevronPosition[size],
          count > 1 ? 'visible' : 'invisible',
          className,
        )}
        ref={ref}
        data-testid="MobilePagination"
      >
        {selectedPage !== 1 && (
          <Button
            className={cn('LeftChevronButton', 'rotate-90', arrowClass, buttonClassName)}
            variant={variant}
            color={color}
            size={size}
            startIcon={<ChevronIcon />}
            onClick={() => setSelectedPage(selectedPage - 1)}
            aria-label={t('previousPage', { page: selectedPage - 1 })}
            hideShadow
            {...restButtonProps}
          />
        )}
        <div
          className={cn('SelectedOutOff', 'cursor-default font-semibold')}
          data-testid="SelectedOutOff"
        >
          {`${selectedPage}${loadMoreCount ? `-${selectedPage + loadMoreCount}` : ''}`} / {count}
        </div>
        {selectedPage + loadMoreCount < count && (
          <Button
            className={cn('RightChevronButton', '-rotate-90', arrowClass, buttonClassName)}
            variant={variant}
            color={color}
            size={size}
            startIcon={<ChevronIcon />}
            onClick={() => setSelectedPage(selectedPage + loadMoreCount + 1)}
            aria-label={t('nextPage', {
              page: selectedPage + 1,
            })}
            hideShadow
            {...restButtonProps}
          />
        )}
      </div>
    )
  },
)

MobilePagination.displayName = 'MobilePagination'
