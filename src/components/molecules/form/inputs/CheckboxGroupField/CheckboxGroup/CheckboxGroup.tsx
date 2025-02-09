'use client'
import { FieldsetHTMLAttributes, forwardRef, useCallback } from 'react'

import { InputProps, OptionType, StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { Checkbox, CheckboxProps } from '../../CheckboxField/Checkbox/Checkbox'

export type CheckboxGroupProps = Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> &
  InputProps &
  Omit<StyleProps, 'variant'> & {
    /** checkboxGroup value */
    value: string[]
    /** group options for individual radio inputs */
    options: OptionType[]
    /** display radio inputs in column */
    column?: boolean
    /** style variant of component */
    variant?: StyleProps['variant'] | 'switch'
    /** optional checkbox props */
    checkboxProps?: Partial<CheckboxProps>
    /** onChange function */
    onChange: (value: string[]) => void
  }

/** Basic styled CheckboxGroup. For form purposes use CheckboxGroupField. Default FieldsetHTMLAttributes and Checkbox props supported. USE CLIENT */
export const CheckboxGroup = forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(
  (
    {
      className,
      name,
      value,
      options,
      column,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      disabled,
      error,
      checkboxProps = {},
      onChange,
      ...rest
    },
    ref,
  ) => {
    const isChecked = useCallback(
      (checkboxValue: string) => {
        if (value) {
          return value.includes(checkboxValue)
        } else {
          return false
        }
      },
      [value],
    )

    const handleOnChange = useCallback(
      (checkboxValue: string) => {
        if (isChecked(checkboxValue)) {
          onChange(value.filter(v => v !== checkboxValue))
        } else {
          onChange([...value, checkboxValue])
        }
      },
      [value, isChecked, onChange],
    )

    return (
      <fieldset
        id={name}
        className={cn('CheckboxGroup', 'flex flex-wrap', column && 'flex-col', className)}
        aria-labelledby={`${name}-label`}
        ref={ref}
        {...rest}
      >
        {options.map(({ value: checkboxValue, label: checkboxLabel, content }) => (
          <Checkbox
            key={checkboxValue}
            name={checkboxValue}
            label={checkboxLabel}
            value={checkboxValue}
            content={content}
            variant={variant}
            color={color}
            size={size}
            isChecked={isChecked(checkboxValue)}
            disabled={disabled}
            error={error}
            onChange={handleOnChange}
            {...checkboxProps}
          />
        ))}
      </fieldset>
    )
  },
)

CheckboxGroup.displayName = 'CheckboxGroup'
