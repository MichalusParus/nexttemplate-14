'use client'
import { get } from 'lodash'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormStyleContext } from '../../forms/Form/Form'
import { Switch, SwitchProps } from './Switch/Switch'

export type SwitchFieldProps = Omit<SwitchProps, 'value' | 'error' | 'isChecked' | 'onChange'> &
  Partial<Pick<SwitchProps, 'onChange'>>

/** Form and style context wrapper for Switch component. Native InputHTMLAttributes props supported. USE CLIENT */
export const SwitchField = ({
  className,
  name,
  label,
  variant,
  color,
  size,
  onChange,
  ...rest
}: SwitchFieldProps) => {
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
        <Switch
          className={className}
          label={label}
          isChecked={Boolean(field.value)}
          variant={variant || formVariant}
          color={color || formColor}
          size={size || formSize}
          error={errorMessage}
          aria-invalid={!!errorMessage}
          {...field}
          onChange={() => {
            field.onChange(field.value === name ? '' : name)
            onChange?.(field.value === name ? '' : name)
          }}
          {...rest}
        />
      )}
    />
  )
}

SwitchField.displayName = 'SwitchField'
