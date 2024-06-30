'use client'
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'

import InlineLoader from '../../loaders/InlineLoader'
import {
  buttonClass,
  buttonContentSize,
  buttonDisabledVariant,
  buttonIconSize,
  buttonVariant,
  iconOnlySize,
  innerWrapClass,
} from './Button.style'
import { cn } from '@/utils/utils'

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'color' | 'onClick'
> & {
  /** for passing custom tailwind classes, pass "selected" for active state style or "error" for error shadow */
  className?: string
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'terciary' | 'error' | 'none'
  /** size of component, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'inline' | 'none'
  /** pass svg icon before children, without children becomes iconOnly button */
  startIcon?: ReactNode
  /** pass svg icon after children, without children becomes iconOnly button */
  endIcon?: ReactNode
  /** loading state for async fn */
  isLoading?: boolean
  /** shortcut for width 100% */
  fullWidth?: boolean
  /** hide button shadow */
  hideShadow?: boolean
  /** disable auto upper case */
  disableUpperCase?: boolean
  /** onClick function */
  onClick?: () => void
}

/** Basic Button with loading state and icon handling. Default ButtonHTMLAttributes props supported. USE CLIENT */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'contained',
      color = 'primary',
      size = 'md',
      startIcon,
      endIcon,
      isLoading,
      fullWidth,
      hideShadow,
      disableUpperCase,
      children,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const iconOnly =
      (startIcon || endIcon) && (Array.isArray(children) ? !children.some(x => x) : !children)
    const endIconMargin = endIcon ? '[&_svg]:ml-2' : ''
    const iconMargin = startIcon ? '[&_svg]:mr-2' : endIconMargin
    const buttonSize = iconOnly
      ? `${iconOnlySize[size]} ${buttonIconSize[size]}`
      : `${buttonContentSize[size]} ${iconMargin} ${buttonIconSize[size]}`

    return (
      <button
        className={cn(
          'Button',
          buttonClass,
          buttonVariant[variant][color],
          buttonSize,
          buttonDisabledVariant[variant],
          isLoading && 'selected [&>div]:invisible',
          variant === 'contained' && !hideShadow && 'shadow-button active:shadow-none',
          fullWidth && 'w-full',
          className,
        )}
        tabIndex={rest.disabled ? -1 : 0}
        onClick={!isLoading ? onClick : () => {}}
        ref={ref}
        {...rest}
      >
        {isLoading ? (
          <InlineLoader className="absolute inset-0 justify-center" size={size} />
        ) : null}
        <div className={cn('ButtonInnerWrap', innerWrapClass, !disableUpperCase && 'uppercase')}>
          {startIcon ? startIcon : null}
          {children}
          {endIcon ? endIcon : null}
        </div>
      </button>
    )
  },
)

Button.displayName = 'Button'
