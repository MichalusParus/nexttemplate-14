'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, HTMLAttributes } from 'react'

import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { spinnerClass, spinnerColor, spinnerSize } from './CircularLoader.style'

type NativeCircularLoaderProps = Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'color'>

export type CircularLoaderProps = NativeCircularLoaderProps &
  Omit<StyleProps, 'variant'> & {
    /** for passing custom tailwind classes */
    className?: string
    /** optional label for replacing default Loading... */
    label?: string
    /** hide label for displaying only Spinner */
    hideLabel?: boolean
  }

/** Serves as block loader. Default HTMLAttributes props supported. USE CLIENT */
export const CircularLoader = forwardRef<HTMLDivElement, CircularLoaderProps>(
  (
    { className, color = 'primary', size = 'md', label = 'Loading...', hideLabel, ...rest },
    ref,
  ) => {
    const t = useTranslations('Components')

    return (
      <div
        className={cn('CircularLoader', 'flex flex-col items-center', className)}
        role="status"
        aria-label={t('loading')}
        aria-busy="true"
        ref={ref}
        {...rest}
      >
        <div
          className={cn(
            'SpinnerWrap',
            'relative rounded-full border-4',
            spinnerColor[color],
            spinnerSize[size],
          )}
        >
          <div className={cn('Spinner', 'animate-circularLoaderAnim', spinnerClass)} />
        </div>
        {!hideLabel && label}
      </div>
    )
  },
)

CircularLoader.displayName = 'CircularLoader'
