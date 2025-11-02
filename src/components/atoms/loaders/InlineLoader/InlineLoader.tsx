'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, HTMLAttributes } from 'react'

import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { dottClass, loaderSize } from './InlineLoader.style'

type NativeInlineLoaderProps = Omit<HTMLAttributes<HTMLSpanElement>, 'className'>

export type InlineLoaderProps = NativeInlineLoaderProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** size of component, none disable sizes for custom styling via className */
  size?: StyleProps['size'] | 'inline'
}

/** Serves as inline loader, takes current text color. Native HTMLAttributes props supported. USE CLIENT */
export const InlineLoader = forwardRef<HTMLSpanElement | null, InlineLoaderProps>(
  ({ className, size = 'md', ...rest }, ref) => {
    const t = useTranslations('Components')

    return (
      <span
        className={cn('InlineLoaderWrap', 'inline-flex items-center', className)}
        role="status"
        aria-label={t('loading')}
        aria-busy="true"
        ref={ref}
        {...rest}
      >
        <span className={cn('Dott', dottClass, loaderSize[size])} />
        <span
          className={cn('Dott', dottClass, loaderSize[size])}
          style={{ animationDelay: '150ms' }}
        />
        <span
          className={cn('Dott', dottClass, loaderSize[size])}
          style={{ animationDelay: '300ms' }}
        />
      </span>
    )
  },
)

InlineLoader.displayName = 'InlineLoader'
