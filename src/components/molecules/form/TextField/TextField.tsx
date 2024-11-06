'use client'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormStyleContext } from '../Form/Form'
import { InputProps, TextInput } from './TextInput/TextInput'

export type InputFieldProps = Omit<InputProps, 'value' | 'error' | 'onChange'>

/** Form and style context wrapper for TextInput component. Default InputHTMLAttributes props supported. USE CLIENT  */
export const TextField = ({
  className,
  name,
  label,
  variant,
  color,
  size,
  labelProps,
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
        <TextInput
          className={className}
          label={label}
          variant={variant || formVariant}
          color={color || formColor}
          size={size || formSize}
          error={(errors[name]?.message as string) || undefined}
          labelProps={{
            ...labelProps,
            collapsed: labelProps?.collapsed || formCollapsed,
          }}
          {...field}
          {...rest}
        />
      )}
    />
  )
}

TextField.displayName = 'TextField'
