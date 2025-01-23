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

/** Menuitem with RadioGroup for Menu components. Default RadioGroupProps supported. */
export const MenuItemRadioGroup = forwardRef<HTMLInputElement, MenuItemRadioGroupProps>(
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
        <div
          className={cn(
            'MenuItemRadioGroupWrap',
            'flex flex-wrap',
            column && 'flex-col',
            className,
          )}
          role="radiogroup"
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
                checked={Boolean(value === radioValue)}
                aria-checked={Boolean(value === radioValue)}
                aria-describedby={`${name}-description`}
                disabled={disabled}
                ref={ref}
                role="menuitemradio"
                onChange={e => onChange(e.target.value)}
                {...rest}
              />
              <label htmlFor={radioValue} className={cn('Label', 'w-full font-semibold')}>
                {content || radioLabel}
              </label>
            </div>
          ))}
        </div>
      </li>
    )
  },
)

MenuItemRadioGroup.displayName = 'MenuItemRadioGroup'
