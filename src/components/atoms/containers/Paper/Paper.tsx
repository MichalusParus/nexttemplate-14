import { forwardRef, HTMLAttributes, ReactNode } from 'react'

import { paperVariant } from './Paper.style'

export type PaperProps = Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'color'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
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
export const Paper = forwardRef<HTMLDivElement, PaperProps>(
  (
    {
      className = '',
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
    const paperShadow = !hideShadow ? 'shadow-button' : ''

    return (
      <div
        className={`Paper ${className} ${paperVariant[variant][color]} ${padding} ${rounded} ${paperShadow}`}
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
