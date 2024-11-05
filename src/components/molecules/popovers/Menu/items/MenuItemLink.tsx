import { forwardRef, PropsWithChildren } from 'react'

import { Link, LinkProps } from '@/components/atoms/common/Link/Link'
import { cn } from '@/utils/utils'

export type MenuItemLinkProps = LinkProps

/** Menuitem with Link for Menu components. Default LinkProps supported. */
export const MenuItemLink = forwardRef<HTMLAnchorElement, PropsWithChildren<MenuItemLinkProps>>(
  ({ className, children, ...rest }, ref) => {
    return (
      <li role="presentation">
        <Link
          className={cn(
            'MenuItemLink',
            'w-full rounded-none border-transparent dark:border-transparent',
            className,
          )}
          role="menuitem"
          ref={ref}
          {...rest}
        >
          {children}
        </Link>
      </li>
    )
  },
)

MenuItemLink.displayName = 'MenuItemLink'
