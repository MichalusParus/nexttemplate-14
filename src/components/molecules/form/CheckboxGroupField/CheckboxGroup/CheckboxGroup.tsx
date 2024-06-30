'use client'
import { forwardRef, useCallback } from 'react'

import { Label, LabelProps } from '@/components/atoms/common/Label/Label'

import { Checkbox, CheckboxProps } from '../../CheckboxField/Checkbox/Checkbox'
import { cn } from '@/utils/utils'

export type CheckboxGroupProps = Omit<CheckboxProps, 'value' | 'isChecked' | 'onChange' | 'fake'> &
  LabelProps & {
    /** name of form field */
    name: string
    /** checkboxGroup value */
    value: string[]
    /** group options for individual radio inputs */
    options: { label: string; value: string }[]
    /** display radio inputs in column */
    column?: boolean
    /** onChange function */
    onChange: (value: string[]) => void
  }

/** Basic styled CheckboxGroup inside Label Component. For form purposes use CheckboxGroupField. Default InputHTMLAttributes props supported. USE CLIENT */
export const CheckboxGroup = forwardRef<HTMLInputElement, CheckboxGroupProps>(
  (
    {
      className = '',
      name,
      label,
      value,
      options,
      column,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      width,
      description,
      hideLabel,
      hideError,
      collapsed,
      disabled,
      error,
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
      <Label
        className={className}
        name={name}
        label={label}
        size={size}
        width={width}
        error={error}
        description={description}
        hideLabel={hideLabel}
        hideError={hideError}
        collapsed={collapsed}
        fakeLabel
      >
        <div className={cn('CheckboxGroupWrap', 'flex flex-wrap', column && 'flex-col')}>
          {options.map(({ value: checkboxValue, label }) => (
            <Checkbox
              key={checkboxValue}
              name={checkboxValue}
              label={label}
              value={checkboxValue}
              variant={variant}
              color={color}
              size={size}
              isChecked={isChecked(checkboxValue)}
              error={error}
              disabled={disabled}
              onChange={handleOnChange}
              ref={ref}
              {...rest}
            />
          ))}
        </div>
      </Label>
    )
  },
)

CheckboxGroup.displayName = 'CheckboxGroup'
