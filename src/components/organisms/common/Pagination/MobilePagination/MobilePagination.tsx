'use client'
import { useTranslations } from 'next-intl'
import { forwardRef } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { ButtonProps } from '@/components/atoms/common/Button/Button'
import { ChevronIcon } from '@/components/atoms/icons'
import { P } from '@/components/atoms/typography/P'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { arrowClass, chevronPosition } from './MobilePagination.style'

export type MobilePaginationProps = StyleProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** total number of pages */
  count: number
  /** current page (1-based) */
  page: number
  /** boolean for loading state of component, when count is unknown */
  isLoading?: boolean
  /** boolean for hidding nav semantic, use when nav isnt proper role for pagination */
  hideNav?: boolean
  /** count of load more button clicks */
  loadMoreCount?: number
  /** optional props for button component */
  buttonProps?: Partial<ButtonProps>
  /** on page change fn */
  onChange: (page: number) => void
}

/** Minimalistic mobile screen pagination. ButtonProps supported. USE CLIENT */
export const MobilePagination = forwardRef<HTMLDivElement | null, MobilePaginationProps>(
  (
    {
      className,
      count,
      page,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      isLoading,
      hideNav,
      loadMoreCount = 0,
      buttonProps = {},
      onChange,
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const { className: buttonClassName, ...restButtonProps } = buttonProps
    const Element = hideNav ? 'div' : 'nav'

    return (
      <Element
        className={cn(
          'MobilePagination',
          'relative w-max',
          chevronPosition[size],
          count > 1 ? 'visible' : 'invisible',
          className,
        )}
        {...(Element === 'nav' && { 'aria-label': t('pagination') })}
        ref={ref}
        data-testid="MobilePagination"
      >
        {page !== 1 && (
          <Button
            className={cn('LeftChevronButton', 'rotate-90', arrowClass, buttonClassName)}
            variant={variant}
            color={color}
            size={size}
            disabled={isLoading}
            startIcon={<ChevronIcon />}
            onClick={() => onChange(page - 1)}
            aria-label={t('previousPage', { page: page - 1 })}
            hideShadow
            {...restButtonProps}
          />
        )}
        <P
          className={cn(
            'SelectedOutOff',
            'min-h-4 min-w-16 cursor-default text-center font-semibold',
          )}
          color="none"
          size={size}
          align="text-center"
          isLoading={isLoading}
          data-testid="SelectedOutOff"
        >
          {`${page}${loadMoreCount ? `-${page + loadMoreCount}` : ''} / ${count}`}
        </P>
        {page + loadMoreCount < count && (
          <Button
            className={cn('RightChevronButton', '-rotate-90', arrowClass, buttonClassName)}
            variant={variant}
            color={color}
            size={size}
            startIcon={<ChevronIcon />}
            disabled={isLoading}
            onClick={() => onChange(page + loadMoreCount + 1)}
            aria-label={t('nextPage', {
              page: page + loadMoreCount + 1,
            })}
            hideShadow
            {...restButtonProps}
          />
        )}
      </Element>
    )
  },
)

MobilePagination.displayName = 'MobilePagination'
