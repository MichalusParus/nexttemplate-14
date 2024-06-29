'use client'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormStyleContext } from '../Form/Form'
import { Input, InputProps } from './Input/Input'

export type InputFieldProps = Omit<InputProps, 'value' | 'error' | 'onChange'>

/** Form and style context wrapper for Input component. Default InputHTMLAttributes props supported. USE CLIENT  */
export const InputField = ({
  className = '',
  name,
  label,
  variant,
  color,
  size,
  collapsed,
  ...rest
}: InputFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const { formVariant, formColor, formSize, formCollapsed } = useContext(FormStyleContext)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          className={className}
          label={label}
          variant={variant || formVariant}
          color={color || formColor}
          size={size || formSize}
          collapsed={collapsed || formCollapsed}
          error={(errors[name]?.message as string) || undefined}
          autoComplete="off"
          {...field}
          {...rest}
        />
      )}
    />
  )
}

InputField.displayName = 'InputField'
