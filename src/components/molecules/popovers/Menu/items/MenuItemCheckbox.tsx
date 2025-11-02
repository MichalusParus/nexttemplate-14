'use client'
import { forwardRef } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { Checkbox, CheckboxProps } from '@/components/molecules/form/inputs/CheckboxField/Checkbox'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

export type MenuItemCheckboxProps = Omit<ButtonProps, 'variant' | 'color' | 'size' | 'type'> &
  StyleProps & {
    /** for passing custom tailwind classes */
    className?: string
    /** checked state of MenuItemCheckbox */
    isChecked: boolean
    /** optional checkbox props for Checkbox component */
    checkboxProps?: Partial<CheckboxProps>
  }

/** Menuitem with RadioGroup for Menu component. Native Button and CheckboxProps supported. */
export const MenuItemCheckbox = forwardRef<HTMLButtonElement | null, MenuItemCheckboxProps>(
  (
    {
      className,
      isChecked,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      disabled,
      checkboxProps = {},
      onClick,
      children,
      ...rest
    },
    ref,
  ) => {
    const { className: checkboxClassName, ...restCheckboxProps } = checkboxProps

    return (
      <li role="presentation">
        <Button
          className={cn(
            'w-full justify-start gap-0 rounded-none border-transparent dark:border-transparent',
            className,
          )}
          variant={variant}
          color={color}
          size={size}
          startIcon={
            <Checkbox
              className={checkboxClassName}
              name=""
              label=""
              variant={variant}
              color={color}
              size={size}
              isChecked={isChecked}
              fake
              disabled={disabled}
              onChange={() => {}}
              aria-hidden
              {...restCheckboxProps}
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

MenuItemCheckbox.displayName = 'MenuItemCheckbox'
