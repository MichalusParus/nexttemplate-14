'use client'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/atoms/common/Label'

import { DatePickerFieldProps } from '../DatePickerField'
import { FormStyleContext } from '../Form/Form'
import { RangeDatePicker } from './RangeDatePicker/RangeDatePicker'

export type RangeDatePickerFieldProps = DatePickerFieldProps

/** Form and style context wrapper for RangeDatePicker inside Label component. Label, Button, Dropdown and Calendar props supported. USE CLIENT */
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
          <RangeDatePicker
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

RangeDatePicker.displayName = 'RangeDatePicker'
