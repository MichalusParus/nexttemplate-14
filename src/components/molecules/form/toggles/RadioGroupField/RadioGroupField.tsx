'use client'
import { get } from 'lodash'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/atoms/common/Label'
import { FieldProps } from '@/components/utils/types'

import { FormStyleContext } from '../../forms/Form/Form'
import { RadioGroup, RadioGroupProps } from './RadioGroup/RadioGroup'

export type RadioGroupFieldProps<T = string> = Omit<
  RadioGroupProps<T>,
  'value' | 'error' | 'onChange'
> &
  Partial<Pick<RadioGroupProps<T>, 'onChange'>> &
  FieldProps

/** Form and style context wrapper for RadioGroup inside fake Label component. Native InputHTMLAttributes and Label props supported. USE CLIENT */
export function RadioGroupField<T = string>({
  className,
  name,
  label,
  variant,
  color,
  size,
  labelProps = {},
  onChange,
  ...rest
}: RadioGroupFieldProps<T>) {
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
          variant="legend"
        >
          <RadioGroup<T>
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

RadioGroupField.displayName = 'RadioGroupField'
