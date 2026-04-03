'use client'
import { ButtonHTMLAttributes, Children, forwardRef, ReactNode } from 'react'

import { childrenIconSize, disabledVariant } from '@/components/utils/common.style'
import { devWarning } from '@/components/utils/devWarning'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { CircularLoader } from '../../loaders/CircularLoader'
import { InlineLoader } from '../../loaders/InlineLoader'
import { buttonClass, buttonSize, buttonVariant, iconOnlySize } from './Button.style'

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'color' | 'onClick' | 'size'
>

export type ButtonColor = StyleProps['color'] | 'error' | 'success' | 'dark'

export type ButtonProps = NativeButtonProps &
  Pick<StyleProps, 'variant'> & {
    /** for passing custom tailwind classes */
    className?: string
    /** theme color of component, none disable styles for custom styling via className */
    color?: ButtonColor
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

/** Basic Button with loading state and icon handling. Selected class enables active state styles, or error class for error state. Native ButtonHTMLAttributes props supported. USE CLIENT */
export const Button = forwardRef<HTMLButtonElement | null, ButtonProps>(
  (
    {
      className,
      type = 'button',
      variant = 'contained',
      color = 'primary',
      size = 'md',
      startIcon,
      endIcon,
      isLoading = false,
      hideShadow = false,
      disabled = false,
      children,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const buttonFlex = size === 'inline' ? 'inline-flex' : 'flex'
    const iconOnly = (startIcon || endIcon) && Children.toArray(children).length === 0

    devWarning(
      !!(iconOnly && !rest['aria-label'] && !rest['aria-labelledby']),
      'Icon-only buttons should have an aria-label for accessibility.',
    )

    return (
      <button
        className={cn(
          'Button',
          buttonClass,
          buttonFlex,
          buttonVariant[variant][color],
          iconOnly ? iconOnlySize[size] : buttonSize[size],
          childrenIconSize[size],
          disabled && 'disabled',
          disabledVariant[variant],
          isLoading && 'selected cursor-progress opacity-80',
          variant === 'contained' && !hideShadow && 'shadow-button active:shadow-none',
          className,
        )}
        type={disabled ? 'button' : type}
        aria-busy={isLoading}
        aria-disabled={disabled}
        onClick={!isLoading && !disabled ? onClick : undefined}
        onKeyDown={e => {
          if (disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
          }
          rest.onKeyDown?.(e)
        }}
        ref={ref}
        {...rest}
      >
        {isLoading &&
          (iconOnly ? (
            <CircularLoader
              color="none"
              size={size === 'inline' ? 'sm' : size}
              hideLabel
              className="absolute inset-0 justify-center"
            />
          ) : (
            <InlineLoader hideStatus className="absolute inset-0 justify-center" size={size} />
          ))}
        <span
          className={cn('ContentInnerWrap', 'contents', isLoading && 'invisible')}
          aria-hidden={isLoading || undefined}
        >
          {startIcon && startIcon}
          {children}
          {endIcon && endIcon}
        </span>
      </button>
    )
  },
)

Button.displayName = 'Button'
