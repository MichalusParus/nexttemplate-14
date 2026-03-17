'use client'
import { get } from 'lodash'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/atoms/common/Label'
import { FieldProps } from '@/components/utils/types'

import { FormStyleContext } from '../../forms/Form/Form'
import { MultiToggleGroup, MultiToggleGroupProps } from './MultiToggleGroup/MultiToggleGroup'

export type MultiToggleGroupFieldProps = Omit<
  MultiToggleGroupProps,
  'value' | 'error' | 'onChange'
> &
  Partial<Pick<MultiToggleGroupProps, 'onChange'>> &
  FieldProps

/** Form and style context wrapper for MultiToggleGroup inside fake Label component. Native InputHTMLAttributes and Label props supported. USE CLIENT */
export const MultiToggleGroupField = ({
  className,
  name,
  label,
  variant,
  color,
  size,
  labelProps = {},
  onChange,
  ...rest
}: MultiToggleGroupFieldProps) => {
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
        <Label name={name} label={label} size={size} error={errorMessage} {...labelProps} variant="legend">
          <MultiToggleGroup
            className={className}
            variant={variant || formVariant}
            color={color || formColor}
            size={size || formSize}
            error={errorMessage}
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

MultiToggleGroupField.displayName = 'MultiToggleGroupField'
