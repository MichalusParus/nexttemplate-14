'use client'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormStyleContext } from '../Form/Form'
import { MultiDatePicker, MultiDatePickerProps } from './MultiDatePicker/MultiDatePicker'

export type MultiDatePickerFieldProps = Omit<MultiDatePickerProps, 'value' | 'error' | 'onChange'>

/** Form and style context wrapper for MultiDatePicker component. Combobox, Dropdown and Calendar props supported. USE CLIENT */
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
  const { formVariant, formColor, formSize, formCollapsed } = useContext(FormStyleContext)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MultiDatePicker
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

MultiDatePicker.displayName = 'MultiDatePicker'
