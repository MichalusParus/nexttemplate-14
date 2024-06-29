'use client'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormStyleContext } from '../Form/Form'
import { CheckboxGroup, CheckboxGroupProps } from './CheckboxGroup/CheckboxGroup'

export type CheckboxGroupFieldProps = Omit<CheckboxGroupProps, 'value' | 'error' | 'onChange'>

/** Form and style context wrapper for CheckboxGroup component. Default InputHTMLAttributes props supported. USE CLIENT */
export const CheckboxGroupField = ({
  className = '',
  name,
  label,
  variant,
  color,
  size,
  collapsed,
  ...rest
}: CheckboxGroupFieldProps) => {
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
        <CheckboxGroup
          className={className}
          label={label}
          variant={variant || formVariant}
          color={color || formColor}
          size={size || formSize}
          collapsed={collapsed || formCollapsed}
          error={(errors[name]?.message as string) || undefined}
          {...field}
          {...rest}
        />
      )}
    />
  )
}

CheckboxGroupField.displayName = 'CheckboxGroupField'
