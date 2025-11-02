'use client'
import { get } from 'lodash'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/atoms/common/Label'
import { FieldProps } from '@/components/utils/types'

import { FormStyleContext } from '../../forms/Form/Form'
import { TextArea, TextAreaProps } from './TextArea/TextArea'

export type TextAreaFieldProps = Omit<TextAreaProps, 'value' | 'error' | 'onChange'> &
  Partial<Pick<TextAreaProps, 'onChange'>> &
  FieldProps

/** Form and style context wrapper for TextArea inside Label component. Native TextareaHTMLAttributes and Label props supported. USE CLIENT  */
export const TextAreaField = ({
  className,
  name,
  label,
  variant,
  color,
  size,
  labelProps = {},
  onChange,
  ...rest
}: TextAreaFieldProps) => {
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
        >
          <TextArea
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

TextAreaField.displayName = 'TextAreaField'
