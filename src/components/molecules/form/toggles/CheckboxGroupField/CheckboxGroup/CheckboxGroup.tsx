'use client'
import { isEqual } from 'lodash'
import { FieldsetHTMLAttributes, ForwardedRef, forwardRef, useCallback } from 'react'

import { devWarning } from '@/components/utils/devWarning'
import { InputProps, OptionType, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { Checkbox, CheckboxProps } from '../../CheckboxField/Checkbox/Checkbox'
import { Switch } from '../../SwitchField/Switch'

export type CheckboxGroupProps<T = string> = Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'className' | 'color' | 'name' | 'onChange'> &
  Omit<InputProps, 'placeholder'> &
  StyleProps & {
    /** checkboxGroup value */
    value: T[]
    /** group options for individual checkboxes */
    options: OptionType<T>[]
    /** display checkboxes in column */
    column?: boolean
    /** optional boolean for switch version */
    switchType?: boolean
    /** optional checkbox props */
    checkboxProps?: Partial<Omit<CheckboxProps, 'isChecked' | 'onChange' | 'value' | 'name'>>
    /** onChange function */
    onChange: (value: T[]) => void
  }

/** Basic styled CheckboxGroup. For form purposes use CheckboxGroupField. Native FieldsetHTMLAttributes and Checkbox props supported. USE CLIENT */
function CheckboxGroupComponent<T = string>(
  {
    className,
    name,
    value,
    options,
    column,
    switchType = false,
    variant = 'outlined',
    color = 'primary',
    size = 'md',
    error,
    disabled,
    checkboxProps = {},
    onChange,
    ...rest
  }: CheckboxGroupProps<T>,
  ref: ForwardedRef<HTMLFieldSetElement>,
) {
  devWarning(
    !rest['aria-label'] && !rest['aria-labelledby'],
    'CheckboxGroup: no aria-label or aria-labelledby provided — group has no accessible name. Use CheckboxGroupField or pass aria-label manually.',
  )

  const isChecked = useCallback(
    (checkboxValue: T) => value.some(v => isEqual(v, checkboxValue)),
    [value],
  )

  const handleOnChange = useCallback(
    (checkboxValue: T) => {
      if (isChecked(checkboxValue)) {
        onChange(value.filter(v => !isEqual(v, checkboxValue)))
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
      aria-disabled={disabled}
      ref={ref}
      {...rest}
    >
      {options.map(({ value: checkboxValue, label: checkboxLabel, content, isDisabled }, index) =>
        switchType ? (
          <Switch
            key={`${name}-${index}-${checkboxLabel}`}
            name={`${name}-${index}`}
            label={checkboxLabel}
            value={String(index)}
            content={content}
            variant={variant}
            color={color}
            size={size}
            isChecked={isChecked(checkboxValue)}
            disabled={disabled || isDisabled}
            error={error}
            onChange={() => handleOnChange(checkboxValue)}
            {...checkboxProps}
          />
        ) : (
          <Checkbox
            key={`${name}-${index}-${checkboxLabel}`}
            name={`${name}-${index}`}
            label={checkboxLabel}
            value={String(index)}
            content={content}
            variant={variant}
            color={color}
            size={size}
            isChecked={isChecked(checkboxValue)}
            disabled={disabled || isDisabled}
            error={error}
            onChange={() => handleOnChange(checkboxValue)}
            {...checkboxProps}
          />
        ),
      )}
    </fieldset>
  )
}

type CheckboxGroupComponentType = {
  <T = string>(
    props: CheckboxGroupProps<T> & { ref?: ForwardedRef<HTMLFieldSetElement> },
  ): React.ReactElement | null
  displayName?: string
}

export const CheckboxGroup = forwardRef(CheckboxGroupComponent) as CheckboxGroupComponentType

CheckboxGroup.displayName = 'CheckboxGroup'
