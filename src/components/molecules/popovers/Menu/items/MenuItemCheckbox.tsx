'use client'
import { forwardRef } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { Checkbox, CheckboxProps } from '@/components/molecules/form/CheckboxField/Checkbox'
import { StyleProps } from '@/components/types'
import { cn, filterOutKeys } from '@/utils/utils'

export type MenuItemCheckboxProps = Omit<ButtonProps, 'variant' | 'color' | 'size'> &
  StyleProps & {
    /** for passing custom tailwind classes */
    className?: string
    /** checked state of MenuItemCheckbox */
    isChecked: boolean
    /** optional checkbox props for Checkbox component */
    checkboxProps?: Partial<CheckboxProps>
  }

/** Menuitem with RadioGroup for Menu component. Default Button and CheckboxProps supported. */
export const MenuItemCheckbox = forwardRef<HTMLButtonElement, MenuItemCheckboxProps>(
  (
    {
      className,
      isChecked,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      checkboxProps = {},
      onClick,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <li role="presentation">
        <Button
          className={cn(
            'w-full rounded-none border-transparent dark:border-transparent',
            isChecked && 'selected',
            className,
          )}
          variant={variant}
          color={color}
          size={size}
          disableUpperCase
          hideShadow
          aria-selected={isChecked}
          ref={ref}
          onClick={onClick}
          {...rest}
        >
          <Checkbox
            className={cn('mr-4', checkboxProps?.className)}
            name=""
            label=""
            variant={variant}
            color={color}
            size={size}
            isChecked={isChecked}
            fake
            onChange={() => {}}
            {...filterOutKeys(checkboxProps, ['className'])}
          />
          {children}
        </Button>
      </li>
      // <li
      //   className={buttonVariant[variant === 'switch' ? 'text' : variant][color]}
      //   role="presentation"
      // >
      //   <Checkbox
      //     className={cn(
      //       'MenuItemCheckboxWrap',
      //       'm-0 font-semibold',
      //       buttonContentSize[rest.size || 'md'],
      //       className,
      //     )}
      //     variant={variant}
      //     role="menuitemcheckbox"
      //     ref={ref}
      //     {...rest}
      //   />
      // </li>
    )
  },
)

MenuItemCheckbox.displayName = 'MenuItemCheckbox'
