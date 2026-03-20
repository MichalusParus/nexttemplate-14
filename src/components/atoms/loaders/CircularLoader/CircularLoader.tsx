import { forwardRef, HTMLAttributes } from 'react'

import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { spinnerClass, spinnerColor, spinnerSize } from './CircularLoader.style'

type NativeCircularLoaderProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'className' | 'title' | 'color' | 'onClick' | 'label' | 'onChange'
>

export type CircularLoaderProps = NativeCircularLoaderProps &
  Omit<StyleProps, 'variant' | 'size'> & {
    /** for passing custom tailwind classes */
    className?: string
    /** size of component, none disable sizes for custom styling via className */
    size?: StyleProps['size']
    /** optional label for replacing default Loading... */
    label?: string
    /** hide label for displaying only Spinner */
    hideLabel?: boolean
  }

/** Spinning circular loader. Native HTMLAttributes props supported. */
export const CircularLoader = forwardRef<HTMLSpanElement | null, CircularLoaderProps>(
  (
    { className, color = 'primary', size = 'md', label = 'Loading...', hideLabel, ...rest },
    ref,
  ) => {
    return (
      <span
        className={cn('CircularLoader', 'flex flex-col items-center gap-2', className)}
        role="status"
        aria-label={label || 'Loading'}
        aria-busy="true"
        ref={ref}
        {...rest}
      >
        <span
          className={cn(
            'SpinnerWrap',
            'relative rounded-full border-2',
            spinnerColor[color],
            spinnerSize[size],
          )}
        >
          <span className={cn('Spinner', 'animate-circular-loader', spinnerClass)} />
        </span>
        {!hideLabel && label}
      </span>
    )
  },
)

CircularLoader.displayName = 'CircularLoader'
