import { forwardRef, HTMLAttributes } from 'react'

import { ghostSize, ghostStyle } from './Ghost.style'

export type GhostProps = Omit<HTMLAttributes<HTMLSpanElement>, 'className'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** inline ghost size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'none'
}

/** Ghost is loading template for text, images, boxes and sections. Height and width must be set through className, for inline use theme heights. Default HTMLAttributes props supported. */
export const Ghost = forwardRef<HTMLSpanElement, GhostProps>(
  ({ className = '', size = 'none', ...rest }, ref) => {
    return (
      <span
        className={`Ghost ${className} ${ghostStyle} ${ghostSize[size]}`}
        role="status"
        aria-label="loading"
        aria-busy="true"
        ref={ref}
        {...rest}
      />
    )
  },
)

Ghost.displayName = 'Ghost'
