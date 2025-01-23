'use client'
import { get } from 'lodash'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/atoms/common/Label'
import { FieldProps } from '@/components/types'

import { FormStyleContext } from '../../Form/Form'
import { MultiAutocomplete, MultiAutocompleteProps } from './MultiAutocomplete/MultiAutocomplete'

export type MultiAutocompleteFieldProps = Omit<
  MultiAutocompleteProps,
  'value' | 'error' | 'onChange'
> &
  FieldProps

/** Form and style context wrapper for MultiAutocomplete inside Label component. Label, Button, TextInput, Dropdown and ListBox props supported. USE CLIENT */
export const MultiAutocompleteField = ({
  className,
  name,
  label,
  variant,
  color,
  size,
  labelProps = {},
  ...rest
}: MultiAutocompleteFieldProps) => {
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
          <MultiAutocomplete
            className={className}
            variant={variant || formVariant}
            color={color || formColor}
            size={size || formSize}
            error={errorMessage}
            aria-labelledby={`${name}-label`}
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

MultiAutocompleteField.displayName = 'MultiAutocompleteField'
