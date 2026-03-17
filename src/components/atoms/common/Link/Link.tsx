import { LinkProps as NextLinkProps } from 'next/link'
import NextLink from 'next/link'
import { Children, forwardRef, LinkHTMLAttributes, ReactNode } from 'react'

import { childrenIconSize } from '@/components/utils/common.style'
import { devWarning } from '@/components/utils/devWarning'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { buttonSize, buttonVariant, iconOnlySize } from '../Button/Button.style'
import { linkClass } from './Link.style'

type NativeAnchorProps = Omit<LinkHTMLAttributes<HTMLAnchorElement>, 'className' | 'color'>

export type LinkProps = NativeAnchorProps &
  NextLinkProps &
  Pick<StyleProps, 'variant'> & {
    /** for passing custom tailwind classes */
    className?: string
    /** theme color of component, none disable styles for custom styling via className */
    color?: StyleProps['color'] | 'error'
    /** size of component, none disable sizes for custom styling via className */
    size?: StyleProps['size'] | 'inline'
    /** pass svg icon before children, without children becomes iconOnly button */
    startIcon?: ReactNode
    /** pass svg icon after children, without children becomes iconOnly button */
    endIcon?: ReactNode
    /** hide button shadow */
    hideShadow?: boolean
  }

/** Basic Anchor based on Next Link with Button styles and icon handling. Native LinkHTMLAttributes & LinkProps supported. */
export const Link = forwardRef<HTMLAnchorElement | null, LinkProps>(
  (
    {
      className,
      variant = 'text',
      color = 'primary',
      size = 'md',
      startIcon,
      endIcon,
      hideShadow,
      children,
      ...rest
    },
    ref,
  ) => {
    const iconOnly = (startIcon || endIcon) && Children.toArray(children).length === 0
    const linkFlex = size === 'inline' ? 'inline-flex' : 'flex'

    devWarning(
      !!(iconOnly && !rest['aria-label'] && !rest['aria-labelledby']),
      'Icon-only links should have an aria-label for accessibility.',
    )

    return (
      <NextLink
        className={cn(
          'Link',
          linkClass,
          linkFlex,
          buttonVariant[variant][color],
          iconOnly ? iconOnlySize[size] : buttonSize[size],
          childrenIconSize[size],
          variant === 'contained' && !hideShadow && 'shadow-button active:shadow-none',
          className,
        )}
        ref={ref}
        {...rest}
      >
        {startIcon && startIcon}
        {children}
        {endIcon && endIcon}
      </NextLink>
    )
  },
)

Link.displayName = 'Link'
