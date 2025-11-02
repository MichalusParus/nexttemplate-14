'use client'
import { useTranslations } from 'next-intl'
import { forwardRef } from 'react'

import { NativeDivProps, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { progressClass, progressColor } from './ProgressBar.style'

export type ProgressBarProps = NativeDivProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** progress number 0 to 100 */
  progress?: number
  /** theme color of component, none disable styles for custom styling via className */
  color?: StyleProps['color']
  /** height of bar as tailwind class */
  height?: string
}

/** Progress bar for displaying loading state or visual representation of data. Native HTMLAttributes props supported. USE CLIENT */
export const ProgressBar = forwardRef<HTMLDivElement | null, ProgressBarProps>(
  ({ className, progress = 0, color = 'primary', height = 'h-3', ...rest }, ref) => {
    const t = useTranslations('Components')
    const min = 0
    const max = 100
    const progressValue = Math.min(max, Math.max(min, progress))

    return (
      <div
        className={cn('ProgressBar', progressClass, progressColor[color], className)}
        role="progressbar"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={progressValue}
        aria-label={t('loading')}
        ref={ref}
        {...rest}
      >
        <div
          className={cn('Progress', 'rounded-sm', height)}
          style={{ width: `${progressValue}%`, transition: '200ms width linear' }}
        />
      </div>
    )
  },
)

ProgressBar.displayName = 'ProgressBar'
