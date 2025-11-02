import { forwardRef, PropsWithChildren } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button/Button'
import { cn } from '@/utils/utils'

export type MenuItemButtonProps = ButtonProps

/** Menuitem with Button for Menu components. Native ButtonProps supported. */
export const MenuItemButton = forwardRef<
  HTMLButtonElement | null,
  PropsWithChildren<MenuItemButtonProps>
>(({ className, children, ...rest }, ref) => {
  return (
    <li role="presentation">
      <Button
        className={cn(
          'MenuItemButton',
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
      </Button>
    </li>
  )
})

MenuItemButton.displayName = 'MenuItemButton'
