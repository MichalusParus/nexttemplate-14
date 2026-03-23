'use client'
import { get } from 'lodash'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/atoms/common/Label'
import { FieldProps } from '@/components/utils/types'

import { FormStyleContext } from '../../forms/Form/Form'
import { ToggleGroup, ToggleGroupProps } from './ToggleGroup/ToggleGroup'

export type ToggleGroupFieldProps = Omit<ToggleGroupProps, 'value' | 'error' | 'onChange'> &
  Partial<Pick<ToggleGroupProps, 'onChange'>> &
  FieldProps

/** Form and style context wrapper for ToggleGroup inside fake Label component. Native InputHTMLAttributes and Label props supported. USE CLIENT */
export const ToggleGroupField = ({
  className,
  name,
  label,
  variant,
  color,
  size,
  labelProps = {},
  onChange,
  ...rest
}: ToggleGroupFieldProps) => {
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
        <Label name={name} label={label} size={size || formSize} error={errorMessage} {...labelProps} variant="legend">
          <ToggleGroup
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

ToggleGroupField.displayName = 'ToggleGroupField'
