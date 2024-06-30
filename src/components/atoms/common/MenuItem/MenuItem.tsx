import { forwardRef, LegacyRef, PropsWithChildren } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button/Button'

import { Link, LinkProps } from '../Link/Link'
import { cn } from '@/utils/utils'

export type MenuItemProps = {
  className?: string
  buttonProps?: Omit<ButtonProps, 'className'>
  linkProps?: Omit<LinkProps, 'className'>
}

/** Modified button with role menuitem for Drawer and Menu components. Default ButtonProps or LinkProps supported. */
export const MenuItem = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  PropsWithChildren<MenuItemProps>
>(({ className = '', buttonProps, linkProps, children }, ref) => {
  if (buttonProps) {
    return (
      <Button
        className={cn('MenuItemButton', 'w-full rounded-none border-none', className)}
        role="menuitem"
        ref={ref as LegacyRef<HTMLButtonElement>}
        {...buttonProps}
      >
        {children || buttonProps.children}
      </Button>
    )
  } else {
    return (
      <Link
        className={cn('MenuItemLink', 'w-full rounded-none border-none', className)}
        role="menuitem"
        ref={ref as LegacyRef<HTMLAnchorElement>}
        href={linkProps?.href || ''}
        {...linkProps}
      >
        {children || linkProps?.children}
      </Link>
    )
  }
})

MenuItem.displayName = 'MenuItem'
