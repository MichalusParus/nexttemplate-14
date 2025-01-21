'use client'
import { get } from 'lodash'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/atoms/common/Label'
import { FieldProps } from '@/components/types'

import { FormStyleContext } from '../../Form/Form'
import { PasswordInput, PasswordInputProps } from './PasswordInput/PasswordInput'

export type InputFieldProps = Omit<PasswordInputProps, 'value' | 'error' | 'onChange'> & FieldProps

/** Form and style context wrapper for PasswordInput inside Label component. Default InputHTMLAttributes and Label props supported. USE CLIENT  */
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
  const errorMessage = get(errors, name)?.message as string | undefined

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Label
          name={name}
          label={label}
          size={size || formSize}
          error={errorMessage}
          {...labelProps}
        >
          <PasswordInput
            className={className}
            variant={variant || formVariant}
            color={color || formColor}
            size={size || formSize}
            error={errorMessage}
            aria-labelledby={`label-${name}`}
            aria-describedby={
              errorMessage || labelProps.description ? `${name}-description` : undefined
            }
            aria-invalid={!!errorMessage}
            {...field}
            {...rest}
          />
        </Label>
      )}
    />
  )
}

PasswordField.displayName = 'PasswordField'
