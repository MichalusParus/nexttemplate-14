'use client'
import { get } from 'lodash'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/atoms/common/Label'
import { FieldProps } from '@/components/types'

import { FormStyleContext } from '../../Form/Form'
import { DatePicker, DatePickerProps } from './DatePicker/DatePicker'

export type DatePickerFieldProps = Omit<DatePickerProps, 'value' | 'error' | 'onChange'> &
  FieldProps

/** Form and style context wrapper for DatePicker inside Label component. Label, Button, Dropdown and Calendar props supported. USE CLIENT */
export const DatePickerField = ({
  className,
  name,
  label,
  variant,
  color,
  size,
  labelProps = {},
  ...rest
}: DatePickerFieldProps) => {
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
          <DatePicker
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

DatePickerField.displayName = 'DatePickerField'
