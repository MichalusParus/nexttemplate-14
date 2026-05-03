'use client'
import { forwardRef, HTMLAttributes, PropsWithChildren } from 'react'

import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { badgeClass, badgeDotSize, badgeValueSize } from './Badge.style'

const POSITION_DEFAULT = 'top-0 right-0 translate-x-1/2 -translate-y-1/2'

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'content' | 'value'> &
  Pick<StyleProps, 'size'> &
  PropsWithChildren<{
    /** custom tailwind classes — applied to the badge element. Use to override default red color */
    className?: string
    /** badge content — number or string. Omit (or pass `''`) to render an empty dot */
    value?: number | string
    /** explicit visibility. Default: visible, except auto-hides when `value` is numeric `0` (count-badge convenience). Pass `show={true}` to force render `0`, or `show={false}` to hide any badge */
    show?: boolean
    /** tailwind positioning classes (top/right/bottom/left + translate). Default: top-right corner */
    position?: string
    /** for numeric value, render `+${max}` when value exceeds this (default 99) */
    max?: number
  }>

/** Wraps any child and overlays a notification dot or count badge at a corner. Native span HTMLAttributes (className, aria-*, role, etc.) flow to the badge element. USE CLIENT */
export const Badge = forwardRef<HTMLSpanElement | null, BadgeProps>(
  (
    {
      className,
      value,
      show,
      size = 'md',
      position = POSITION_DEFAULT,
      max = 99,
      children,
      ...rest
    },
    ref,
  ) => {
    const isPill = value !== undefined && value !== ''
    const isHidden = show === false || (show === undefined && value === 0)
    const sizeClass = isPill ? badgeValueSize[size ?? 'md'] : badgeDotSize[size ?? 'md']

    const renderedValue = (() => {
      if (!isPill) return null
      if (typeof value === 'number' && value > max) return `+${max}`
      return value
    })()

    return (
      <div className={cn('BadgeWrap', 'relative inline-flex')} data-testid="BadgeWrap">
        {children}
        <span
          className={cn('Badge', badgeClass, sizeClass, position, isHidden && 'hidden', className)}
          ref={ref}
          data-testid="Badge"
          {...rest}
        >
          {renderedValue}
        </span>
      </div>
    )
  },
)

Badge.displayName = 'Badge'
