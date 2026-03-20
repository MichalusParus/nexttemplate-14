import { forwardRef, HTMLAttributes } from 'react'

import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { ghostSize, ghostStyle } from './Ghost.style'

type NativeGhostProps = Omit<HTMLAttributes<HTMLSpanElement>, 'className'>

export type GhostProps = NativeGhostProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** inline ghost size */
  size?: StyleProps['size'] | 'xl' | '2xl' | '3xl' | 'none'
  /** hides role="status", aria-label, aria-busy — use when parent owns the status role (e.g. multiple Ghosts inside P) */
  hideStatus?: boolean
}

/** Ghost is loading template for text, images, boxes and sections. Height and width must be set through className, for inline use size prop. Native HTMLAttributes props supported. */
export const Ghost = forwardRef<HTMLSpanElement | null, GhostProps>(
  ({ className, size = 'none', hideStatus, ...rest }, ref) => {
    return (
      <span
        className={cn('Ghost', ghostStyle, ghostSize[size], className)}
        {...(!hideStatus && {
          role: 'status',
          'aria-label': 'Loading',
          'aria-busy': 'true',
        })}
        ref={ref}
        {...rest}
      />
    )
  },
)

Ghost.displayName = 'Ghost'
