'use client'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormStyleContext } from '../Form/Form'
import { DatePicker, DatePickerProps } from './DatePicker/DatePicker'

export type DatePickerFieldProps = Omit<DatePickerProps, 'value' | 'error' | 'onChange'>

/** Form and style context wrapper for DatePicker component. Combobox, Dropdown and Calendar props supported. USE CLIENT */
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
  const { formVariant, formColor, formSize, formCollapsed } = useContext(FormStyleContext)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DatePicker
          className={className}
          label={label}
          variant={variant || formVariant}
          color={color || formColor}
          size={size || formSize}
          error={(errors[name]?.message as string) || undefined}
          labelProps={{
            ...labelProps,
            collapsed: labelProps?.collapsed || formCollapsed,
          }}
          {...field}
          {...rest}
        />
      )}
    />
  )
}

DatePickerField.displayName = 'DatePickerField'
