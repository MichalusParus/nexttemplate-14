'use client'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/atoms/common/Label'
import { FieldProps } from '@/components/types'

import { FormStyleContext } from '../Form/Form'
import { RadioGroup, RadioGroupProps } from './RadioGroup/RadioGroup'

export type RadioGroupFieldProps = Omit<RadioGroupProps, 'value' | 'error' | 'onChange'> &
  FieldProps

/** Form and style context wrapper for RadioGroup inside fake Label component. Default InputHTMLAttributes and Label props supported. USE CLIENT */
export const RadioGroupField = ({
  className,
  name,
  label,
  variant,
  color,
  size,
  labelProps = {},
  ...rest
}: RadioGroupFieldProps) => {
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
          fakeLabel
        >
          <RadioGroup
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

RadioGroupField.displayName = 'RadioGroupField'
