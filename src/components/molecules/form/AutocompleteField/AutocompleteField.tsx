'use client'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormStyleContext } from '../Form/Form'
import { Autocomplete, AutocompleteProps } from './Autocomplete/Autocomplete'

export type AutocompleteFieldProps = Omit<AutocompleteProps, 'value' | 'error' | 'onChange'>

/** Form and style context wrapper for Autocomplete component. Input, Dropdown and ListBox props supported. USE CLIENT */
export const AutocompleteField = ({
  className = '',
  name,
  label,
  variant,
  color,
  size,
  collapsed,
  ...rest
}: AutocompleteFieldProps) => {
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
        <Autocomplete
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
