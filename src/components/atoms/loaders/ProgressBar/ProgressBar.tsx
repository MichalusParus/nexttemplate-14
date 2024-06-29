import { forwardRef, HTMLAttributes } from 'react'

import { progressClass, progressColor } from './ProgressBar.style'

export type ProgressBarProps = Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'color'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** progress number 0 to 100 */
  progress?: number
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
  /** height of bar as tailwind class */
  height?: string
}

/** Progress bar for displaying loading state or visual representation of data. Default HTMLAttributes props supported. */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className = '', progress, color = 'primary', height = 'h-3', ...rest }, ref) => {
    return (
      <div
        className={`ProgressBar ${className} ${progressClass} ${progressColor[color]}`}
        data-testid="ProgressBar"
        ref={ref}
        {...rest}
      >
        <div
          className={`Progress rounded-sm ${height}`}
          style={{ width: `${progress}%`, transition: '200ms width linear' }}
        />
      </div>
    )
  },
)

ProgressBar.displayName = 'ProgressBar'
