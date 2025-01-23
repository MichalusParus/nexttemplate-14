'use client'
import { get } from 'lodash'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/atoms/common/Label'
import { FieldProps } from '@/components/types'

import { FormStyleContext } from '../../Form/Form'
import { CheckboxGroup, CheckboxGroupProps } from './CheckboxGroup/CheckboxGroup'

export type CheckboxGroupFieldProps = Omit<CheckboxGroupProps, 'value' | 'error' | 'onChange'> &
  FieldProps

/** Form and style context wrapper for CheckboxGroup inside fake Label component. Default InputHTMLAttributes and Label props supported. USE CLIENT */
export const CheckboxGroupField = ({
  className,
  name,
  label,
  variant,
  color,
  size,
  labelProps = {},
  ...rest
}: CheckboxGroupFieldProps) => {
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
        <Label name={name} label={label} size={size} error={errorMessage} {...labelProps} fakeLabel>
          <CheckboxGroup
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
            {...rest}
          />
        </Label>
      )}
    />
  )
}

CheckboxGroupField.displayName = 'CheckboxGroupField'
