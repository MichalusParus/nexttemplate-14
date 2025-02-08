'use client'
import { ButtonHTMLAttributes, Children, forwardRef, ReactNode } from 'react'

import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { InlineLoader } from '../../loaders/InlineLoader'
import {
  buttonClass,
  buttonDisabledVariant,
  buttonIconSize,
  buttonSize,
  buttonVariant,
  iconOnlySize,
} from './Button.style'

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'color' | 'onClick' | 'size'
>

export type ButtonProps = NativeButtonProps &
  Pick<StyleProps, 'variant'> & {
    /** for passing custom tailwind classes, pass "selected" for active state style or "error" for error shadow */
    className?: string
    /** theme color of component, none disable styles for custom styling via className */
    color?: StyleProps['color'] | 'error'
    /** size of component, none disable sizes for custom styling via className */
    size?: StyleProps['size'] | 'inline'
    /** pass svg icon before children, without children becomes iconOnly button */
    startIcon?: ReactNode
    /** pass svg icon after children, without children becomes iconOnly button */
    endIcon?: ReactNode
    /** loading state for async fn */
    isLoading?: boolean
    /** hide button shadow */
    hideShadow?: boolean
    /** onClick function */
    onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  }

/** Basic Button with loading state and icon handling. Default ButtonHTMLAttributes props supported. USE CLIENT */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      type = 'button',
      variant = 'contained',
      color = 'primary',
      size = 'md',
      startIcon,
      endIcon,
      isLoading,
      hideShadow,
      disabled,
      children,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const buttonFlex = size === 'inline' ? 'inline-flex' : 'flex'
    const iconOnly = (startIcon || endIcon) && Children.count(children) === 0

    const renderLoadingState = () => (
      <>
        <InlineLoader className="absolute inset-0 justify-center" size={size} />
        <div className={cn('ContentInnerWrap', 'invisible flex')} aria-hidden={true}>
          {startIcon && startIcon}
          {children}
          {endIcon && endIcon}
        </div>
      </>
    )

    if (iconOnly && !rest['aria-label'] && !rest['aria-labelledby']) {
      console.warn('Icon-only buttons should have an aria-label for accessibility.')
    }

    return (
      <button
        className={cn(
          'Button',
          buttonClass,
          buttonFlex,
          buttonVariant[variant][color],
          iconOnly ? iconOnlySize[size] : buttonSize[size],
          buttonIconSize[size],
          buttonDisabledVariant[variant],
          isLoading && 'selected',
          variant === 'contained' && !hideShadow && 'shadow-button active:shadow-none',
          className,
        )}
        type={type}
        disabled={disabled}
        aria-busy={isLoading}
        aria-disabled={isLoading || disabled}
        onClick={!isLoading ? onClick : undefined}
        ref={ref}
        {...rest}
      >
        {isLoading ? (
          renderLoadingState()
        ) : (
          <>
            {startIcon && startIcon}
            {children}
            {endIcon && endIcon}
          </>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
