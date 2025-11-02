import { forwardRef, PropsWithChildren } from 'react'

import { Link, LinkProps } from '@/components/atoms/common/Link/Link'
import { cn } from '@/utils/utils'

export type MenuItemLinkProps = LinkProps

/** Menuitem with Link for Menu components. Native LinkProps supported. */
export const MenuItemLink = forwardRef<
  HTMLAnchorElement | null,
  PropsWithChildren<MenuItemLinkProps>
>(({ className, children, ...rest }, ref) => {
  return (
    <li role="presentation">
      <Link
        className={cn(
          'MenuItemLink',
          'w-full justify-start rounded-none border-transparent dark:border-transparent',
          className,
        )}
        role="menuitem"
        hideShadow
        tabIndex={-1}
        ref={ref}
        {...rest}
      >
        {children}
      </Link>
    </li>
  )
})

MenuItemLink.displayName = 'MenuItemLink'
