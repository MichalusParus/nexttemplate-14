import { forwardRef, HTMLAttributes } from 'react'

import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { progressClass, progressColor } from './ProgressBar.style'

type NativeProgressBarProps = Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'color'>

export type ProgressBarProps = NativeProgressBarProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** progress number 0 to 100 */
  progress?: number
  /** theme color of component, none disable styles for custom styling via className */
  color?: StyleProps['color']
  /** height of bar as tailwind class */
  height?: string
}

/** Progress bar for displaying loading state or visual representation of data. Default HTMLAttributes props supported. */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, progress, color = 'primary', height = 'h-3', ...rest }, ref) => {
    return (
      <div
        className={cn('ProgressBar', progressClass, progressColor[color], className)}
        data-testid="ProgressBar"
        ref={ref}
        {...rest}
      >
        <div
          className={cn('Progress', 'rounded-sm', height)}
          style={{ width: `${progress}%`, transition: '200ms width linear' }}
        />
      </div>
    )
  },
)

ProgressBar.displayName = 'ProgressBar'
