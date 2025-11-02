'use client'
import { forwardRef } from 'react'

import { buttonSize, buttonVariant } from '@/components/atoms/common/Button/Button.style'
import { RadioGroupProps } from '@/components/molecules/form/inputs/RadioGroupField/RadioGroup'
import {
  afterClass,
  disableVariant,
  radioClass,
  radioSize,
  radioVariant,
} from '@/components/molecules/form/inputs/RadioGroupField/RadioGroup/RadioGroup.style'
import { cn } from '@/utils/utils'

export type MenuItemRadioGroupProps = Omit<RadioGroupProps, 'label' | 'labelProps' | 'error'>

/** Menuitem with RadioGroup for Menu components. Native RadioGroupProps supported. */
export const MenuItemRadioGroup = forwardRef<HTMLInputElement | null, MenuItemRadioGroupProps>(
  (
    {
      className,
      name,
      value,
      options,
      column = true,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      disabled,
      onChange,
      ...rest
    },
    ref,
  ) => {
    return (
      <li role="presentation">
        <fieldset
          className={cn(
            'MenuItemRadioGroupWrap',
            'flex flex-wrap',
            column && 'flex-col',
            className,
          )}
          aria-label={name}
          {...rest}
        >
          {options.map(({ value: radioValue, label: radioLabel, content }) => (
            <div
              key={radioValue}
              className={cn(
                'MenuItemRadio',
                radioSize[size],
                'relative mb-0 mr-0 flex items-center',
                buttonVariant[variant][color],
                buttonSize[size],
              )}
              role="presentation"
            >
              <input
                id={radioValue}
                className={cn(
                  radioClass,
                  radioVariant[variant][color],
                  disableVariant[variant],
                  afterClass,
                )}
                name={name}
                type="radio"
                value={radioValue}
                checked={value === radioValue}
                disabled={disabled}
                role="menuitemradio"
                tabIndex={-1}
                aria-checked={value === radioValue}
                ref={ref}
                onChange={e => onChange(e.target.value)}
              />
              <label htmlFor={radioValue} className={cn('Label', 'w-full font-semibold')}>
                {content || radioLabel}
              </label>
            </div>
          ))}
        </fieldset>
      </li>
    )
  },
)

MenuItemRadioGroup.displayName = 'MenuItemRadioGroup'
