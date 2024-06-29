import { LinkProps as NextLinkProps } from 'next/link'
import NextLink from 'next/link'
import { forwardRef, LinkHTMLAttributes } from 'react'

import {
  buttonContentSize,
  buttonIconSize,
  buttonVariant,
  iconOnlySize,
} from '../Button/Button.style'
import { linkClass } from './Link.style'

export type LinkProps = Omit<LinkHTMLAttributes<HTMLAnchorElement>, 'className' | 'color'> &
  NextLinkProps & {
    /** for passing custom tailwind classes */
    className?: string
    /** style variant of component */
    variant?: 'text' | 'outlined' | 'contained'
    /** theme color of component, none disable styles for custom styling via className */
    color?: 'primary' | 'secondary' | 'terciary' | 'error' | 'none'
    /** size of component, inline for links in text and none disable sizes for custom styling via className */
    size?: 'sm' | 'md' | 'lg' | 'inline' | 'none'
    /** pass svg icon before children, without children becomes iconOnly button */
    startIcon?: React.ReactNode
    /** pass svg icon after children, without children becomes iconOnly button */
    endIcon?: React.ReactNode
    /** shortcut for width 100% */
    fullWidth?: boolean
    /** hide button shadow */
    hideShadow?: boolean
    /** disable auto upper case */
    disableUpperCase?: boolean
  }

/** Basic Anchor based on Next Link with Button styles and icon handling. Default LinkHTMLAttributes & LinkProps supported. */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className = '',
      variant = 'text',
      color = 'primary',
      size = 'md',
      startIcon,
      endIcon,
      fullWidth,
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
    const linkShadow =
      variant === 'contained' && !hideShadow ? 'shadow-button active:shadow-none' : ''
    const upperCase = disableUpperCase ? '' : 'uppercase'
    const fullWidthSize = fullWidth ? 'w-full' : ''

    return (
      <NextLink
        className={`Link ${className} ${linkClass} ${linkFlex} ${buttonVariant[variant][color]} ${linkSize} ${fullWidthSize} ${linkShadow} ${upperCase}`}
        ref={ref}
        {...rest}
      >
        {startIcon ? startIcon : null}
        {children}
        {endIcon ? endIcon : null}
      </NextLink>
    )
  },
)

Link.displayName = 'Link'
