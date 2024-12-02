'use client'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormStyleContext } from '../Form/Form'
import { RadioGroup, RadioGroupProps } from './RadioGroup/RadioGroup'

export type RadioGroupFieldProps = Omit<RadioGroupProps, 'value' | 'error' | 'onChange'>

/** Form and style context wrapper for RadioGroup component. Default InputHTMLAttributes props supported. USE CLIENT */
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
  const { formVariant, formColor, formSize, formCollapsed } = useContext(FormStyleContext)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroup
          className={className}
          label={label}
          variant={variant || formVariant}
          color={color || formColor}
          size={size || formSize}
          error={(errors[name]?.message as string) || undefined}
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

RadioGroupField.displayName = 'RadioGroupField'
