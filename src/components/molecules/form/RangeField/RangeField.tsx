'use client'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/atoms/common/Label'
import { FieldProps } from '@/components/types'

import { FormStyleContext } from '../Form/Form'
import { RangeInput, RangeProps } from './RangeInput/RangeInput'

export type RangeFieldProps = Omit<RangeProps, 'value' | 'error' | 'onChange'> & FieldProps

/** Form and style context wrapper for RangeInput inside Label component. Default InputHTMLAttributes and Label props supported. USE CLIENT */
export const RangeField = ({
  className,
  name,
  label,
  color,
  size,
  labelProps = {},
  ...rest
}: RangeFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const { formColor, formSize } = useContext(FormStyleContext)

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
          <RangeInput
            className={className}
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

RangeField.displayName = 'RangeField'
