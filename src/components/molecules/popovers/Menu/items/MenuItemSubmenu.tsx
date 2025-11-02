import { forwardRef, PropsWithChildren } from 'react'

import { ChevronIcon } from '@/components/atoms/icons'

import { Menu, MenuProps } from '../Menu'

export type MenuItemSubmenuProps = MenuProps

/** Menuitem with Button for Menu components. Native ButtonProps supported. */
export const MenuItemSubmenu = forwardRef<
  HTMLDivElement | null,
  PropsWithChildren<MenuItemSubmenuProps>
>(({ placement = 'right-start', ...rest }, ref) => {
  return (
    <li role="presentation">
      <Menu
        placement={placement}
        width="auto"
        buttonProps={{
          className: 'border-none w-full justify-between rounded-none',
          endIcon: <ChevronIcon className="-rotate-90" aria-hidden />,
          hideShadow: true,
          role: 'menuitem',
          'aria-haspopup': 'menu',
          tabIndex: -1,
        }}
        dropdownProps={{ offset: [0, -2] }}
        ref={ref}
        {...rest}
      />
    </li>
  )
})

MenuItemSubmenu.displayName = 'MenuItemSubmenu'
