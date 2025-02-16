'use client'
import { forwardRef } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { Checkbox, CheckboxProps } from '@/components/molecules/form/inputs/CheckboxField/Checkbox'
import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

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
    const { className: checkboxClassName, ...restCheckboxProps } = checkboxProps

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
          hideShadow
          aria-selected={isChecked}
          ref={ref}
          onClick={onClick}
          {...rest}
        >
          <Checkbox
            className={cn('mr-4', checkboxClassName)}
            name=""
            label=""
            variant={variant}
            color={color}
            size={size}
            isChecked={isChecked}
            fake
            onChange={() => {}}
            {...restCheckboxProps}
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
      //       buttonSize[rest.size || 'md'],
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
