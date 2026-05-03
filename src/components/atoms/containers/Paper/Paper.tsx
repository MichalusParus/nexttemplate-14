import { forwardRef, PropsWithChildren, ReactNode } from 'react'

import { baseVariant } from '@/components/utils/common.style'
import { NativeDivProps, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

export type PaperProps = NativeDivProps &
  Omit<StyleProps, 'size'> & {
    /** for passing custom tailwind classes */
    className?: string
    /** optional padding tailwind class */
    padding?: string
    /** optional border-radius tailwind class */
    rounded?: string
    /** hide paper shadow */
    hideShadow?: boolean
    /** children */
    children?: ReactNode
  }

/** Styled wrap. Native HTMLAttributes props supported. */
export const Paper = forwardRef<HTMLDivElement | null, PropsWithChildren<PaperProps>>(
  (
    {
      className,
      padding = 'py-4 px-4 md:py-6 md:px-8',
      rounded = 'rounded-md',
      variant = 'text',
      color = 'primary',
      hideShadow,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          'Paper',
          'border',
          baseVariant[variant][color],
          variant === 'contained' ? 'text-contrast' : 'text-text dark:text-contrast',
          padding,
          rounded,
          !hideShadow && 'shadow-paper',
          className,
        )}
        data-testid="Paper"
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

Paper.displayName = 'Paper'
