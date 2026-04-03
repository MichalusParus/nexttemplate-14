import { forwardRef, ReactNode } from 'react'

import { baseVariant, textVariant } from '@/components/utils/common.style'
import { NativeDivProps, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { Span } from '../../typography/Span'
import { chipClass, chipSize } from './Chip.style'

export type ChipProps = NativeDivProps &
  StyleProps & {
    /** for passing custom tailwind classes */
    className?: string
    /** Optional chip heading */
    title?: string
    /** pass svg icon before children */
    startIcon?: ReactNode
    /** pass svg icon behind children */
    endIcon?: ReactNode
  }

/** Small styled wrapper for displaying selected options. Native HTMLAttributes props supported. */
export const Chip = forwardRef<HTMLDivElement | null, ChipProps>(
  (
    {
      className,
      title,
      variant = 'contained',
      color = 'primary',
      size = 'md',
      startIcon,
      endIcon,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          'Chip',
          chipClass,
          baseVariant[variant][color],
          textVariant[variant][color],
          chipSize[size],
          className,
        )}
        data-testid="Chip"
        ref={ref}
        {...rest}
      >
        {startIcon && startIcon}
        <div className="ChipInnerWrap min-w-0 flex flex-col">
          {title && <Span variant="bold">{title}</Span>}
          <Span className="overflow-hidden text-ellipsis whitespace-nowrap" variant="none">
            {children}
          </Span>
        </div>
        {endIcon && endIcon}
      </div>
    )
  },
)

Chip.displayName = 'Chip'
