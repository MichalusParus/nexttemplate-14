import { forwardRef, HTMLAttributes, ReactNode } from 'react'

import XIcon from '../../icons/XIcon'
import Span from '../../typography/Span'
import { Button, ButtonProps } from '../Button/Button'
import { buttonIconSize } from '../Button/Button.style'
import { chipClass, chipSize, chipVariant } from './Chip.style'
import { cn, filterOutKeys } from '@/utils/utils'

export type ChipProps = Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'color' | 'onClick'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'terciary' | 'error' | 'none'
  /** size of component, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'none'
  /** Optional chip heading */
  title?: string
  /** pass svg icon before children */
  startIcon?: ReactNode
  /** pass svg icon to onClick button, onClick cannot be undefined */
  buttonIcon?: ReactNode
  /** optional props for button */
  buttonProps?: Partial<ButtonProps>
  /** onClick function */
  onClick?: () => void
}

/** Small styled wrapper for displaying selected options with optional button. Default HTMLAttributes props supported. */
export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className = '',
      variant = 'contained',
      color = 'primary',
      size = 'md',
      title,
      startIcon,
      buttonIcon,
      buttonProps = {},
      onClick,
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
          chipVariant[variant][color],
          chipSize[size],
          buttonIconSize[size],
          className,
        )}
        data-testid="Chip"
        ref={ref}
        {...rest}
      >
        {startIcon ? startIcon : null}
        <div className="ChipInnerWrap flex flex-col px-2">
          <Span variant="bold">{title ? title : null}</Span>
          <Span className="whitespace-nowrap" variant="none">
            {children}
          </Span>
        </div>
        {onClick ? (
          <Button
            className={cn('ChipAction', 'rounded-full border-0', buttonProps?.className)}
            startIcon={buttonIcon ? buttonIcon : <XIcon />}
            variant={variant}
            color={color}
            size="none"
            hideShadow
            aria-label={`delete ${title || children}`}
            onClick={onClick}
            {...filterOutKeys(buttonProps, ['className'])}
          />
        ) : null}
      </div>
    )
  },
)

Chip.displayName = 'Chip'
