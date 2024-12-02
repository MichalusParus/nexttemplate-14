'use client'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/atoms/common/Label'
import { FieldProps } from '@/components/types'

import { FormStyleContext } from '../Form/Form'
import { Select, SelectProps } from './Select/Select'

export type SelectFieldProps = Omit<SelectProps, 'value' | 'error' | 'onChange'> & FieldProps

/** Form and style context wrapper for Select inside Label component. Label, Button, Dropdown and ListBox props supported. USE CLIENT */
export const SelectField = ({
  className,
  name,
  label,
  variant,
  color,
  size,
  labelProps = {},
  ...rest
}: SelectFieldProps) => {
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
          size={size}
          error={(errors[name]?.message as string) || undefined}
          {...labelProps}
        >
          <Select
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

SelectField.displayName = 'SelectField'
