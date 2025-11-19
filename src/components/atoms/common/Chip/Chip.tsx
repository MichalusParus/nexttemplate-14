import { forwardRef, ReactNode } from 'react'

import { childrenIconSize, paperVariant, textVariant } from '@/components/utils/common.style'
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
      variant = 'contained',
      color = 'primary',
      size = 'md',
      title,
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
          paperVariant[variant][color],
          textVariant[variant][color],
          chipSize[size],
          childrenIconSize[size],
          className,
        )}
        data-testid="Chip"
        ref={ref}
        {...rest}
      >
        {startIcon && startIcon}
        <div className="ChipInnerWrap flex flex-col">
          {title && <Span variant="bold">{title}</Span>}
          <Span className="whitespace-nowrap" variant="none">
            {children}
          </Span>
        </div>
        {endIcon && endIcon}
      </div>
    )
  },
)

Chip.displayName = 'Chip'
