import { forwardRef, HTMLAttributes, PropsWithChildren, ReactNode } from 'react'

import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { paperVariant } from './Paper.style'

type NativePaperProps = Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'color'>

export type PaperProps = NativePaperProps &
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

/** Styled wrap. Default HTMLAttributes props supported. */
export const Paper = forwardRef<HTMLDivElement, PropsWithChildren<PaperProps>>(
  (
    {
      className,
      variant = 'text',
      color = 'primary',
      padding = 'py-2 px-2 md:pt-2 md:pb-3 md:px-5',
      rounded = 'rounded-md',
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
          paperVariant[variant][color],
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
