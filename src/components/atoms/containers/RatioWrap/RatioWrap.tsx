import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/utils/utils'

export type RatioWrapProps = Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'color'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** number in procents for ratio between height and width  */
  ratio: number
  /** width as css value, dont use tailwind classes  */
  width?: string | number
}

/** Container for absolute children that can keep height to width ratio. Default HTMLAttributes props supported. */
export const RatioWrap = forwardRef<HTMLDivElement, RatioWrapProps>(
  ({ className = '', ratio, width, children, ...rest }, ref) => {
    return (
      <div
        className={cn('RatioWrap', 'relative', className)}
        style={{ width: width }}
        data-testid="RatioWrap"
        ref={ref}
        {...rest}
      >
        <div
          className={'RatioInnerWrap relative overflow-hidden'}
          style={{ paddingTop: `${ratio}%` }}
        >
          {children}
        </div>
      </div>
    )
  },
)

RatioWrap.displayName = 'RatioWrap'
