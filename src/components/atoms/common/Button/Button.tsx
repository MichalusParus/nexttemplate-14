'use client'
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'

import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { InlineLoader } from '../../loaders/InlineLoader'
import {
  buttonClass,
  buttonContentSize,
  buttonDisabledVariant,
  buttonIconSize,
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
    /** disable auto upper case */
    disableUpperCase?: boolean
    /** onClick function */
    onClick?: () => void
  }

/** Inner loading wrap for loading buttons*/
const InnerLoadingWrap = ({
  size = 'md',
  startIcon,
  endIcon,
  isLoading,
  children,
}: Partial<ButtonProps>) => {
  return (
    <>
      {isLoading && <InlineLoader className="absolute inset-0 justify-center" size={size} />}
      <div className={cn('ContentInnerWrap', 'invisible inline-flex')}>
        {startIcon && startIcon}
        {children}
        {endIcon && endIcon}
      </div>
    </>
  )
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
      disableUpperCase,
      children,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const buttonFlex = size === 'inline' ? 'inline-flex' : 'flex'
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
          buttonFlex,
          buttonVariant[variant][color],
          buttonSize,
          buttonDisabledVariant[variant],
          !disableUpperCase && 'uppercase',
          isLoading && 'selected',
          variant === 'contained' && !hideShadow && 'shadow-button active:shadow-none',
          className,
        )}
        type={type}
        tabIndex={rest.disabled ? -1 : 0}
        onClick={!isLoading ? onClick : () => {}}
        ref={ref}
        {...rest}
      >
        {isLoading ? (
          <InnerLoadingWrap
            size={size}
            startIcon={startIcon}
            endIcon={endIcon}
            isLoading={isLoading}
          >
            {children}
          </InnerLoadingWrap>
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
