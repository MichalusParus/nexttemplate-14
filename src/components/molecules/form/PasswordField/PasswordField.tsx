'use client'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/atoms/common/Label'
import { FieldProps } from '@/components/types'

import { FormStyleContext } from '../Form/Form'
import { PasswordInput, PasswordInputProps } from './PasswordInput/PasswordInput'

export type InputFieldProps = Omit<PasswordInputProps, 'value' | 'error' | 'onChange'> & FieldProps

/** Form and style context wrapper for PasswordInput component. Default InputHTMLAttributes props supported. USE CLIENT  */
export const PasswordField = ({
  className,
  name,
  label,
  variant,
  color,
  size,
  labelProps = {},
  ...rest
}: InputFieldProps) => {
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
        <Label
          name={name}
          label={label}
          size={size || formSize}
          error={(errors[name]?.message as string) || undefined}
          {...labelProps}
        >
          <PasswordInput
            className={className}
            variant={variant || formVariant}
            color={color || formColor}
            size={size || formSize}
            error={(errors[name]?.message as string) || undefined}
            {...field}
            {...rest}
          />
        </Label>
      )}
    />
  )
}

PasswordField.displayName = 'PasswordField'
