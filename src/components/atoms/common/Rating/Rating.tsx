'use client'
import { CSSProperties, forwardRef, ReactNode } from 'react'

import { StarIcon } from '@/components/atoms/icons/StarIcon'
import { NativeDivProps, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { ratingClass, ratingSize, ratingSupSize } from './Rating.style'

export type RatingProps = NativeDivProps &
  Omit<StyleProps, 'variant' | 'color'> & {
    /** for passing custom tailwind classes */
    className?: string
    /** Current value, in `0..max`. Supports fractional values for partial fills. */
    value: number
    /** Max value. Default `5`. */
    max?: number
    /** Icon to repeat. Default `<StarIcon />`. */
    icon?: ReactNode
    /** oklch hue angle — single number for fixed color, or `[fromHue, toHue]` to interpolate across stars. */
    hue?: number | [number, number]
    /** Compact mode: one icon + superscript number, opacity scaled by `value / max`. */
    compact?: boolean
  }

const resolveHue = (
  hue: number | [number, number] | undefined,
  i: number,
  total: number,
): number => {
  if (hue === undefined) return 85
  if (typeof hue === 'number') return hue
  const t = total <= 1 ? 0 : i / (total - 1)
  return hue[0] + t * (hue[1] - hue[0])
}

const resolveHueAt = (hue: number | [number, number] | undefined, t: number): number => {
  if (hue === undefined) return 85
  if (typeof hue === 'number') return hue
  return hue[0] + t * (hue[1] - hue[0])
}

/** Row of icons that fill based on `value` in `0..max`, or compact icon + number. USE CLIENT */
export const Rating = forwardRef<HTMLDivElement | null, RatingProps>(
  (
    {
      className,
      value,
      max = 5,
      icon = <StarIcon />,
      hue,
      compact = false,
      size = 'md',
      style,
      ...rest
    },
    ref,
  ) => {
    const safeValue = Number.isFinite(value) ? value : 0
    const filled = Math.max(0, Math.min(safeValue, max))

    if (compact) {
      const clampedInt = Math.max(1, Math.min(Math.round(safeValue), max))
      const t = max <= 1 ? 0 : (clampedInt - 1) / (max - 1)
      const compactHue = resolveHueAt(hue, t)
      const lightColor = `oklch(55% 0.17 ${compactHue})`
      const darkColor = `oklch(70% 0.17 ${compactHue})`
      const opacity = clampedInt / max

      return (
        <div
          ref={ref}
          className={cn(ratingClass, ratingSize[size], 'relative gap-0.5 leading-none', className)}
          style={
            {
              '--r-color': lightColor,
              '--r-dark': darkColor,
              ...style,
            } as CSSProperties
          }
          role="img"
          aria-label={`Level: ${clampedInt} of ${max}`}
          data-testid="Rating"
          {...rest}
        >
          <span
            className="inline-flex"
            style={{ opacity }}
            data-testid="RatingCompactIcon"
            aria-hidden
          >
            {icon}
          </span>
          <sup
            className={cn('font-semibold leading-none', ratingSupSize[size])}
            data-testid="RatingCompactSup"
          >
            {clampedInt}
          </sup>
        </div>
      )
    }

    const firstHue = resolveHue(hue, 0, max)
    const lightColor = `oklch(55% 0.17 ${firstHue})`
    const darkColor = `oklch(70% 0.17 ${firstHue})`

    return (
      <div
        ref={ref}
        className={cn(ratingClass, ratingSize[size], className)}
        style={
          {
            '--r-color': lightColor,
            '--r-dark': darkColor,
            ...style,
          } as CSSProperties
        }
        role="img"
        aria-label={`Rating: ${Math.round(safeValue * 10) / 10} of ${max}`}
        data-testid="Rating"
        {...rest}
      >
        {Array.from({ length: max }).map((_, i) => {
          const fillRatio = Math.max(0, Math.min(filled - i, 1))
          let perStarStyle: CSSProperties | undefined
          if (Array.isArray(hue)) {
            const perHue = resolveHue(hue, i, max)
            perStarStyle = {
              '--r-color': `oklch(55% 0.17 ${perHue})`,
              '--r-dark': `oklch(70% 0.17 ${perHue})`,
            } as CSSProperties
          }

          return (
            <span
              key={i}
              className="relative inline-flex text-(--r-color) rtl:-scale-x-100 dark:text-(--r-dark)"
              style={perStarStyle}
              data-fill={fillRatio}
              data-testid={`RatingStar-${i}`}
            >
              <span className="inline-flex opacity-25" aria-hidden>
                {icon}
              </span>
              <span
                className="pointer-events-none absolute inset-0 inline-flex"
                style={{ clipPath: `inset(0 ${(1 - fillRatio) * 100}% 0 0)` }}
                aria-hidden
              >
                {icon}
              </span>
            </span>
          )
        })}
      </div>
    )
  },
)

Rating.displayName = 'Rating'
