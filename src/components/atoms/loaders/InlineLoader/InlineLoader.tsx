import { forwardRef, HTMLAttributes } from 'react'

import { iconPaddingSize } from '@/components/utils/common.style'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { dottClass } from './InlineLoader.style'

type NativeInlineLoaderProps = Omit<HTMLAttributes<HTMLSpanElement>, 'className'>

export type InlineLoaderProps = NativeInlineLoaderProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** size of component, none disable sizes for custom styling via className */
  size?: StyleProps['size'] | 'inline'
  /** hides role="status", aria-label, aria-busy — use when parent owns the status role */
  hideStatus?: boolean
}

/** Serves as inline loader, takes current text color. Native HTMLAttributes props supported. */
export const InlineLoader = forwardRef<HTMLSpanElement | null, InlineLoaderProps>(
  ({ className, size = 'md', hideStatus, ...rest }, ref) => {
    const dotPadding = iconPaddingSize[size === 'inline' ? 'sm' : size]

    return (
      <span
        className={cn('InlineLoaderWrap', 'inline-flex items-center', className)}
        {...(!hideStatus && {
          role: 'status',
          'aria-label': 'Loading',
          'aria-busy': 'true',
        })}
        ref={ref}
        {...rest}
      >
        <span className={cn('Dott', dottClass, dotPadding)} />
        <span
          className={cn('Dott', dottClass, dotPadding)}
          style={{ animationDelay: '150ms' }}
        />
        <span
          className={cn('Dott', dottClass, dotPadding)}
          style={{ animationDelay: '300ms' }}
        />
      </span>
    )
  },
)

InlineLoader.displayName = 'InlineLoader'
