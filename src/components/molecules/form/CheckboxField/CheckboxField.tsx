'use client'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormStyleContext } from '../Form/Form'
import { Checkbox, CheckboxProps } from './Checkbox/Checkbox'

export type CheckboxFieldProps = Omit<CheckboxProps, 'value' | 'error' | 'isChecked' | 'onChange'>

/** Form and style context wrapper for Checkbox component. Default InputHTMLAttributes props supported. USE CLIENT */
export const CheckboxField = ({
  className = '',
  name,
  label,
  variant,
  color,
  size,
  ...rest
}: CheckboxFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const { formVariant, formColor, formSize } = useContext(FormStyleContext)

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
          error={(errors[name]?.message as string) || undefined}
          {...field}
          {...rest}
          onChange={() => field.onChange(field.value === name ? '' : name)}
        />
      )}
    />
  )
}

CheckboxField.displayName = 'CheckboxField'
