'use client'
import { forwardRef } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { Switch, SwitchProps } from '@/components/molecules/form/toggles/SwitchField/Switch'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

export type MenuItemSwitchProps = Omit<ButtonProps, 'variant' | 'color' | 'size' | 'type'> &
  StyleProps & {
    /** for passing custom tailwind classes */
    className?: string
    /** checked state of MenuItemSwitch */
    isChecked: boolean
    /** optional switch props for Switch component */
    switchProps?: Partial<SwitchProps>
  }

/** Menuitem with Switch for Menu component. Native Button and SwitchProps supported. */
export const MenuItemSwitch = forwardRef<HTMLButtonElement | null, MenuItemSwitchProps>(
  (
    {
      className,
      isChecked,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      disabled,
      switchProps = {},
      onClick,
      children,
      ...rest
    },
    ref,
  ) => {
    const { className: switchClassName, ...restSwitchProps } = switchProps

    return (
      <li role="presentation">
        <Button
          className={cn(
            'w-full justify-start rounded-none border-transparent dark:border-transparent',
            className,
          )}
          variant={variant}
          color={color}
          size={size}
          startIcon={
            <Switch
              className={switchClassName}
              name=""
              label=""
              value=""
              variant={variant}
              color={color}
              size={size}
              isChecked={isChecked}
              fake
              disabled={disabled}
              onChange={() => {}}
              aria-hidden
              {...restSwitchProps}
            />
          }
          hideShadow
          disabled={disabled}
          ref={ref}
          onClick={onClick}
          role="menuitemcheckbox"
          aria-checked={isChecked}
          tabIndex={-1}
          {...rest}
        >
          {children}
        </Button>
      </li>
    )
  },
)

MenuItemSwitch.displayName = 'MenuItemSwitch'
