'use client'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/atoms/common/Label'
import { FieldProps } from '@/components/types'

import { FormStyleContext } from '../Form/Form'
import { Autocomplete, AutocompleteProps } from './Autocomplete/Autocomplete'

export type AutocompleteFieldProps = Omit<AutocompleteProps, 'value' | 'error' | 'onChange'> &
  FieldProps

/** Form and style context wrapper for Autocomplete inside Label component. Label, Button, TextInput, Dropdown and ListBox props supported. USE CLIENT */
export const AutocompleteField = ({
  className,
  name,
  label,
  variant,
  color,
  size,
  labelProps = {},
  ...rest
}: AutocompleteFieldProps) => {
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
          <Autocomplete
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

AutocompleteField.displayName = 'AutocompleteField'
