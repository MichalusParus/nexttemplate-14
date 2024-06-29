import { forwardRef, HTMLAttributes } from 'react'

import XIcon from '../../icons/XIcon'
import Span from '../../typography/Span'
import { Button, ButtonProps } from '../Button/Button'
import { buttonIconSize } from '../Button/Button.style'
import { chipClass, chipSize, chipVariant } from './Chip.style'

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
  startIcon?: React.ReactNode
  /** pass svg icon to onClick button, onClick cannot be undefined */
  buttonIcon?: React.ReactNode
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
      buttonProps,
      onClick,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        className={`Chip ${className} ${chipClass} ${chipVariant[variant][color]} ${chipSize[size]} ${buttonIconSize[size]}`}
        data-testid="Chip"
        ref={ref}
        {...rest}
      >
        {startIcon ? startIcon : null}
        <div className="ChipInnerWrap flex flex-col px-2">
          <Span variant="bold">{title ? title : null}</Span>
          <Span variant="none" className="whitespace-nowrap">
            {children}
          </Span>
        </div>
        {onClick ? (
          <Button
            className="ChipAction border-0 [&.Button]:rounded-full"
            startIcon={buttonIcon ? buttonIcon : <XIcon />}
            variant={variant}
            color={color}
            size="none"
            hideShadow
            aria-label={`action ${title || children}`}
            onClick={onClick}
            {...buttonProps}
          />
        ) : null}
      </div>
    )
  },
)

Chip.displayName = 'Chip'
