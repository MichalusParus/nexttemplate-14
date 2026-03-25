'use client'
import { forwardRef } from 'react'

import { NativeDivProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { shadowClass, shadowPosition } from './ScrollShadow.style'
import { useScrollShadow } from './useScrollShadow'

export type ScrollShadowProps = NativeDivProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** for setting height or maxHeight in tailwind classes */
  height?: string
  /** for setting shadow from color in tailwind class "from-primary-700" */
  color?: string
  /** stable gutter for Y scroll */
  gutter?: boolean
  /** for setting content padding as tailwind class */
  padding?: string
  /** shadow gradient size — controls gradient height/width and scroll-padding inset */
  shadowSize?: string
  /** disable horizontal scroll */
  disableHorizontal?: boolean
}

/** Content wrapper for scroll shadow effect. Use inside Paper or other wrap with from-"bgColor" class or specify color prop. Native HTMLAttributes props supported. USE CLIENT */
export const ScrollShadow = forwardRef<HTMLDivElement | null, ScrollShadowProps>(
  (
    {
      className,
      height = 'h-full',
      padding,
      color = 'from-inherit',
      shadowSize = '1.5rem',
      gutter,
      disableHorizontal,
      children,
      ...rest
    },
    ref,
  ) => {
    const { contentRef, shadowRefs, overflow, handleScroll } = useScrollShadow(disableHorizontal)
    const scrollbarInset = 'calc(100% - var(--scrollbar-size))'

    return (
      <div
        className={cn('ScrollShadow', 'relative h-full', color, className)}
        data-testid="ScrollShadow"
        ref={ref}
        {...rest}
      >
        <div
          className={cn(
            'ContentWrap',
            'overflow-y-auto rounded-md',
            disableHorizontal ? 'overflow-x-hidden' : 'overflow-x-auto',
            height,
            padding,
          )}
          style={{
            scrollbarGutter: gutter ? 'stable' : 'initial',
            scrollPadding: shadowSize,
          }}
          tabIndex={-1}
          ref={contentRef}
          onScroll={handleScroll}
          data-testid="ContentWrap"
        >
          {children}
        </div>
        {overflow.vertical && (
          <>
            <div
              className={cn('TopShadow', shadowPosition.top, shadowClass)}
              style={{ height: shadowSize, width: scrollbarInset, opacity: 0 }}
              ref={el => { shadowRefs.current.top = el }}
              aria-hidden
              data-testid="TopShadow"
            />
            <div
              className={cn('BottomShadow', shadowPosition.bottom, shadowClass)}
              style={{
                height: shadowSize,
                width: overflow.horizontal ? scrollbarInset : '100%',
                bottom: overflow.horizontal ? 'var(--scrollbar-size)' : 0,
                opacity: 0,
              }}
              ref={el => { shadowRefs.current.bottom = el }}
              aria-hidden
              data-testid="BottomShadow"
            />
          </>
        )}
        {overflow.horizontal && (
          <>
            <div
              className={cn('LeftShadow', shadowPosition.left, shadowClass)}
              style={{ width: shadowSize, height: scrollbarInset, opacity: 0 }}
              ref={el => { shadowRefs.current.left = el }}
              aria-hidden
              data-testid="LeftShadow"
            />
            <div
              className={cn('RightShadow', shadowPosition.right, shadowClass)}
              style={{
                width: shadowSize,
                height: overflow.vertical ? scrollbarInset : '100%',
                right: overflow.vertical ? 'var(--scrollbar-size)' : 0,
                opacity: 0,
              }}
              ref={el => { shadowRefs.current.right = el }}
              aria-hidden
              data-testid="RightShadow"
            />
          </>
        )}
      </div>
    )
  },
)

ScrollShadow.displayName = 'ScrollShadow'
