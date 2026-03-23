'use client'
import { PropsWithChildren } from 'react'

import { cn } from '@/utils/utils'

export type CarouselItemProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** optional aria-label for the slide */
  'aria-label'?: string
  /** optional aria-current for the active slide */
  'aria-current'?: 'true' | 'false' | boolean
  /** whether this slide is the currently active one */
  isActive?: boolean
}

/** CarouselItem for wrapping Carousel children. USE CLIENT */
export const CarouselItem = ({
  className,
  children,
  'aria-label': ariaLabel,
  'aria-current': ariaCurrent,
  isActive = true,
}: PropsWithChildren<CarouselItemProps>) => {
  return (
    <div
      className={cn('CarouselItem', 'max-h-full w-full', className)}
      role="group"
      aria-roledescription="slide"
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      aria-hidden={!isActive || undefined}
      inert={!isActive || undefined}
      data-testid="CarouselItem"
    >
      {children}
    </div>
  )
}

CarouselItem.displayName = 'CarouselItem'
