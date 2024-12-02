'use client'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormStyleContext } from '../Form/Form'
import { TextArea, TextAreaProps } from './TextArea/TextArea'

export type TextAreaFieldProps = Omit<TextAreaProps, 'value' | 'error' | 'onChange'>

/** Form and style context wrapper for TextArea component. Default TextareaHTMLAttributes props supported. USE CLIENT */
export const TextAreaField = ({
  className,
  name,
  label,
  variant,
  color,
  size,
  labelProps = {},
  ...rest
}: TextAreaFieldProps) => {
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
        <TextArea
          className={className}
          label={label}
          variant={variant || formVariant}
          color={color || formColor}
          size={size || formSize}
          error={errors[name]?.message as string}
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

TextAreaField.displayName = 'TextAreaField'
