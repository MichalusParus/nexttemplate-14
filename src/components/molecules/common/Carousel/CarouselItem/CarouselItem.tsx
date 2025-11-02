'use client'
import { useTranslations } from 'next-intl'
import { PropsWithChildren } from 'react'

import { cn } from '@/utils/utils'

export type CarouselItemProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** selected page for sr-only */
  selectedPage?: number
  /** pages amount for sr-only */
  pages?: number
  /** optional aria-label for the slide */
  'aria-label'?: string
  /** optional aria-current for the active slide */
  'aria-current'?: 'true' | 'false' | boolean
}

/** CarouselItem for wrapping Carousel children. USE CLIENT */
export const CarouselItem = ({
  className,
  selectedPage,
  pages,
  children,
  'aria-label': ariaLabel,
  'aria-current': ariaCurrent,
}: PropsWithChildren<CarouselItemProps>) => {
  const t = useTranslations('Components')

  return (
    <div
      className={cn('CarouselItem', 'max-h-full w-full', className)}
      role="group"
      aria-roledescription="slide"
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      data-testid="CarouselItem"
    >
      {children}
      {selectedPage && pages && (
        <div aria-live="polite" className="sr-only" data-testid="CarouselItemSrOnly">
          {t('slideLabel', { count: selectedPage, total: pages })}
        </div>
      )}
    </div>
  )
}

CarouselItem.displayName = 'CarouselItem'
