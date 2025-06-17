'use client'
import { get } from 'lodash'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/atoms/common/Label'
import { FieldProps } from '@/components/types'

import { FormStyleContext } from '../../Form/Form'
import { Autocomplete, AutocompleteProps } from './Autocomplete/Autocomplete'

export type AutocompleteFieldProps = Omit<AutocompleteProps, 'value' | 'error' | 'onChange'> &
  Partial<Pick<AutocompleteProps, 'onChange'>> &
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
  onChange,
  ...rest
}: AutocompleteFieldProps) => {
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
        <Label name={name} label={label} size={size} error={errorMessage} {...labelProps}>
          <Autocomplete
            className={className}
            variant={variant || formVariant}
            color={color || formColor}
            size={size || formSize}
            error={errorMessage}
            aria-describedby={
              errorMessage || labelProps.description ? `${name}-description` : undefined
            }
            aria-invalid={!!errorMessage}
            {...field}
            onChange={v => {
              field.onChange(v)
              onChange?.(v)
            }}
            {...rest}
          />
        </Label>
      )}
    />
  )
}

AutocompleteField.displayName = 'AutocompleteField'
