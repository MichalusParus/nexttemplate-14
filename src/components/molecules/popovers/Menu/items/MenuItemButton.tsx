import { forwardRef, PropsWithChildren } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button/Button'
import { cn } from '@/utils/utils'

export type MenuItemButtonProps = ButtonProps

/** Menuitem with Button for Menu components. Default ButtonProps supported. */
export const MenuItemButton = forwardRef<HTMLButtonElement, PropsWithChildren<MenuItemButtonProps>>(
  ({ className, children, ...rest }, ref) => {
    return (
      <li role="presentation">
        <Button
          className={cn(
            'MenuItemButton',
            'w-full rounded-none border-transparent dark:border-transparent',
            className,
          )}
          disableUpperCase
          role="menuitem"
          ref={ref}
          {...rest}
        >
          {children}
        </Button>
      </li>
    )
  },
)

MenuItemButton.displayName = 'MenuItemButton'
