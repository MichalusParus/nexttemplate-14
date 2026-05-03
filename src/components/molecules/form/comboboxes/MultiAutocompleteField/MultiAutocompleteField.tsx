'use client'
import { get } from 'lodash'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/atoms/common/Label'
import { FieldProps } from '@/components/utils/types'

import { FormStyleContext } from '../../forms/Form/Form'
import { MultiAutocomplete, MultiAutocompleteProps } from './MultiAutocomplete/MultiAutocomplete'

export type MultiAutocompleteFieldProps<T = string> = Omit<
  MultiAutocompleteProps<T>,
  'value' | 'error' | 'onChange'
> &
  Partial<Pick<MultiAutocompleteProps<T>, 'onChange'>> &
  FieldProps

/** Form and style context wrapper for MultiAutocomplete inside Label component. Label, Button, TextInput, Dropdown and ListBox props supported. USE CLIENT */
export function MultiAutocompleteField<T = string>({
  className,
  name,
  label,
  variant,
  color,
  size,
  labelProps = {},
  onChange,
  ...rest
}: MultiAutocompleteFieldProps<T>) {
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
          <MultiAutocomplete<T>
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

MultiAutocompleteField.displayName = 'MultiAutocompleteField'
