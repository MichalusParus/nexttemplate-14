'use client'
import { get } from 'lodash'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormStyleContext } from '../../forms/Form/Form'
import { Checkbox, CheckboxProps } from './Checkbox/Checkbox'

export type CheckboxFieldProps = Omit<CheckboxProps, 'value' | 'error' | 'isChecked' | 'onChange'> &
  Partial<Pick<CheckboxProps, 'onChange'>>

/** Form and style context wrapper for Checkbox component. Native InputHTMLAttributes props supported. USE CLIENT */
export const CheckboxField = ({
  className,
  name,
  label,
  variant,
  color,
  size,
  onChange,
  ...rest
}: CheckboxFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const { formVariant, formColor, formSize } = useContext(FormStyleContext)
  const errorMessage = get(errors, name)?.message as string | undefined

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Checkbox
          className={className}
          label={label}
          isChecked={Boolean(field.value)}
          variant={variant || formVariant}
          color={color || formColor}
          size={size || formSize}
          error={errorMessage}
          aria-invalid={!!errorMessage}
          {...field}
          value={name}
          onChange={() => {
            const newValue = !field.value
            field.onChange(newValue)
            onChange?.(newValue ? name : '')
          }}
          {...rest}
        />
      )}
    />
  )
}

CheckboxField.displayName = 'CheckboxField'
