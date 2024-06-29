'use client'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormStyleContext } from '../Form/Form'
import { MultiAutocomplete, MultiAutocompleteProps } from './MultiAutocomplete/MultiAutocomplete'

export type MultiAutocompleteFieldProps = Omit<
  MultiAutocompleteProps,
  'value' | 'error' | 'onChange'
>

/** Form and style context wrapper for MultiAutocomplete component. Input, Dropdown and ListBox props supported. USE CLIENT */
export const MultiAutocompleteField = ({
  className = '',
  name,
  label,
  variant,
  color,
  size,
  collapsed,
  ...rest
}: MultiAutocompleteFieldProps) => {
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
        <MultiAutocomplete
          className={className}
          label={label}
          variant={variant || formVariant}
          color={color || formColor}
          size={size || formSize}
          collapsed={collapsed || formCollapsed}
          error={(errors[name]?.message as string) || undefined}
          {...field}
          {...rest}
        />
      )}
    />
  )
}
