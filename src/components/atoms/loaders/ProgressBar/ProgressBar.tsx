'use client'
import { useTranslations } from 'next-intl'
import { forwardRef } from 'react'

import { NativeDivProps, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { progressClass, progressColor } from './ProgressBar.style'

export type ProgressBarProps = NativeDivProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** progress number 0 to 100, undefined renders indeterminate animation */
  progress?: number
  /** theme color of component, none disable styles for custom styling via className */
  color?: StyleProps['color']
  /** height of bar as tailwind class */
  height?: string
}

/** Progress bar for displaying loading state or visual representation of data. Native HTMLAttributes props supported. USE CLIENT */
export const ProgressBar = forwardRef<HTMLDivElement | null, ProgressBarProps>(
  ({ className, progress, height = 'h-3', color = 'primary', ...rest }, ref) => {
    const t = useTranslations('Components')
    const isDeterminate = progress !== undefined
    const min = 0
    const max = 100
    const progressValue = isDeterminate ? Math.min(max, Math.max(min, progress)) : undefined

    return (
      <div
        className={cn('ProgressBar', progressClass, progressColor[color], className)}
        role="progressbar"
        aria-valuemin={isDeterminate ? min : undefined}
        aria-valuemax={isDeterminate ? max : undefined}
        aria-valuenow={progressValue}
        aria-label={t('loading')}
        ref={ref}
        {...rest}
      >
        <div
          className={cn('Progress', 'rounded-xs', height, !isDeterminate && 'w-1/3 animate-progress-bar')}
          style={isDeterminate ? { width: `${progressValue}%`, transition: '200ms width linear' } : undefined}
        />
      </div>
    )
  },
)

ProgressBar.displayName = 'ProgressBar'
