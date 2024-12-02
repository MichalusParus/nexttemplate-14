'use client'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormStyleContext } from '../Form/Form'
import { RangeDatePicker, RangeDatePickerProps } from './RangeDatePicker/RangeDatePicker'

export type RangeDatePickerFieldProps = Omit<RangeDatePickerProps, 'value' | 'error' | 'onChange'>

/** Form and style context wrapper for RangeDatePicker component. Combobox, Dropdown and Calendar props supported. USE CLIENT */
export const RangeDatePickerField = ({
  className,
  name,
  label,
  variant,
  color,
  size,
  labelProps = {},
  ...rest
}: RangeDatePickerFieldProps) => {
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
        <RangeDatePicker
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

RangeDatePicker.displayName = 'RangeDatePicker'
