import { LinkProps as NextLinkProps } from 'next/link'
import NextLink from 'next/link'
import { forwardRef, LinkHTMLAttributes, ReactNode } from 'react'

import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import {
  buttonContentSize,
  buttonIconSize,
  buttonVariant,
  iconOnlySize,
} from '../Button/Button.style'
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
    /** disable auto upper case */
    disableUpperCase?: boolean
  }

/** Basic Anchor based on Next Link with Button styles and icon handling. Default LinkHTMLAttributes & LinkProps supported. */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      variant = 'text',
      color = 'primary',
      size = 'md',
      startIcon,
      endIcon,
      hideShadow,
      disableUpperCase,
      children,
      ...rest
    },
    ref,
  ) => {
    const iconOnly = Boolean(
      (startIcon || endIcon) && (Array.isArray(children) ? !children.some(x => x) : !children),
    )
    const iconMargin = startIcon ? '[&_svg]:mr-2' : '[&_svg]:ml-2'
    const linkFlex = size === 'inline' ? 'inline-flex' : 'flex'
    const linkSize = iconOnly
      ? `${iconOnlySize[size]} ${buttonIconSize[size]}`
      : `${buttonContentSize[size]} ${iconMargin} ${buttonIconSize[size]}`

    return (
      <NextLink
        className={cn(
          'Link',
          linkClass,
          linkFlex,
          buttonVariant[variant][color],
          linkSize,
          variant === 'contained' && !hideShadow && 'shadow-button active:shadow-none',
          !disableUpperCase && 'uppercase',
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
