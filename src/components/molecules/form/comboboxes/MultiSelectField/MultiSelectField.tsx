'use client'
import { get } from 'lodash'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/atoms/common/Label'
import { FieldProps } from '@/components/utils/types'

import { FormStyleContext } from '../../forms/Form/Form'
import { MultiSelect, MultiSelectProps } from './MultiSelect/MultiSelect'

export type MultiSelectFieldProps<T = string> = Omit<
  MultiSelectProps<T>,
  'value' | 'error' | 'onChange'
> &
  Partial<Pick<MultiSelectProps<T>, 'onChange'>> &
  FieldProps

/** Form and style context wrapper for MultiSelect inside Label component. Label, Button, Dropdown and ListBox props supported. USE CLIENT */
export function MultiSelectField<T = string>({
  className,
  name,
  label,
  variant,
  color,
  size,
  labelProps = {},
  onChange,
  ...rest
}: MultiSelectFieldProps<T>) {
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
          <MultiSelect<T>
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

MultiSelectField.displayName = 'MultiSelectField'
