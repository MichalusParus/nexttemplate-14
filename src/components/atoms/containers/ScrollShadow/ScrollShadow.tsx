'use client'
import { forwardRef, HTMLAttributes, useEffect, useRef, useState } from 'react'

import { cn } from '@/utils/utils'

import { shadowClass, shadowPosition } from './ScrollShadow.style'

export type ScrollShadowProps = Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'color'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** for setting height or maxHeight in tailwind classes */
  height?: string
  /** for setting shadow color in tailwind class "from-primary-700" */
  color?: string
  /** stable gutter for Y scroll */
  gutter?: boolean
  /** disable horizontal scroll */
  disableHorizontal?: boolean
}

/** Content wrapper for scroll shadow effect. Parent must have from-"bgColor" tailwind class set. Default HTMLAttributes props supported. USE CLIENT  */
export const ScrollShadow = forwardRef<HTMLDivElement, ScrollShadowProps>(
  (
    {
      className,
      height = 'h-full',
      color = 'from-inherit',
      gutter,
      disableHorizontal,
      children,
      ...rest
    },
    ref,
  ) => {
    const scrollShadowRef = useRef<HTMLDivElement>(null)
    const [scroll, setScroll] = useState<('vertical' | 'horizontal')[]>([])
    const isVertical = scroll.includes('vertical')
    const isHorizontal = scroll.includes('horizontal')
    const disabledVertical = !disableHorizontal ? 'overflow-x-auto' : 'overflow-x-hidden'

    useEffect(() => {
      if (scrollShadowRef.current) {
        if (scrollShadowRef.current.scrollHeight > scrollShadowRef.current.clientHeight) {
          setScroll(prev => [...prev, 'vertical'])
        }
        if (
          scrollShadowRef.current.scrollWidth > scrollShadowRef.current.clientWidth &&
          !disableHorizontal
        ) {
          setScroll(prev => [...prev, 'horizontal'])
        }
      }
    }, [
      scrollShadowRef,
      scrollShadowRef?.current?.clientHeight,
      scrollShadowRef?.current?.clientWidth,
      disableHorizontal,
    ])

    return (
      <div
        className={cn('ScrollShadow', 'relative h-full', color, className)}
        data-testid="ScrollShadow"
        ref={ref}
        {...rest}
      >
        <div className="ScrollShadowWrap h-full overflow-hidden rounded-md">
          <div
            className={cn(
              'ContentWrap',
              'overflow-y-auto',
              disabledVertical,
              height,
              isVertical && 'py-4',
              isHorizontal && 'px-4',
            )}
            style={{ scrollbarGutter: gutter ? 'stable' : 'initial' }}
            ref={scrollShadowRef}
            tabIndex={-1}
          >
            {children}
          </div>
        </div>
        {isVertical && (
          <>
            <div className={cn('TopShadow', 'rounded-t-md', shadowPosition.top, shadowClass)} />
            <div
              className={cn(
                'BottomShadow',
                'rounded-b-md',
                shadowPosition.bottom,
                shadowClass,
                isHorizontal ? 'bottom-2' : 'bottom-0',
              )}
            />
          </>
        )}
        {isHorizontal && (
          <>
            <div className={cn('LeftShadow', 'rounded-l-md', shadowPosition.left, shadowClass)} />
            <div
              className={cn(
                'RightShadow',
                'rounded-r-md',
                shadowPosition.right,
                shadowClass,
                isVertical ? 'right-[0.437rem]' : '-right-[0.063rem]',
              )}
            />
          </>
        )}
      </div>
    )
  },
)

ScrollShadow.displayName = 'ScrollShadow'
