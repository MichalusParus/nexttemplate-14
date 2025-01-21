'use client'
import { get } from 'lodash'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/atoms/common/Label'

import { FormStyleContext } from '../../Form/Form'
import { DatePickerFieldProps } from '../DatePickerField'
import { MultiDatePicker } from './MultiDatePicker/MultiDatePicker'

export type MultiDatePickerFieldProps = DatePickerFieldProps

/** Form and style context wrapper for MultiDatePicker inside Label component. Label, Button, Dropdown and Calendar props supported. USE CLIENT */
export const MultiDatePickerField = ({
  className,
  name,
  label,
  variant,
  color,
  size,
  labelProps = {},
  ...rest
}: MultiDatePickerFieldProps) => {
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
          <MultiDatePicker
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

MultiDatePicker.displayName = 'MultiDatePicker'
