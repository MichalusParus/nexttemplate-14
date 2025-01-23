'use client'
import { get } from 'lodash'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/atoms/common/Label'
import { FieldProps } from '@/components/types'

import { FormStyleContext } from '../../Form/Form'
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
  const errorMessage = get(errors, name)?.message as string | undefined

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Label name={name} label={label} size={size} error={errorMessage} {...labelProps}>
          <RangeInput
            className={className}
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

RangeField.displayName = 'RangeField'
