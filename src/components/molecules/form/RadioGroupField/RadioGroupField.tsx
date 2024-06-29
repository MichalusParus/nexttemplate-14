import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormStyleContext } from '../Form/Form'
import { RadioGroup, RadioGroupProps } from './RadioGroup/RadioGroup'

export type RadioGroupFieldProps = Omit<RadioGroupProps, 'value' | 'error' | 'onChange'>

/** Form and style context wrapper for RadioGroup component. Default InputHTMLAttributes props supported. */
export const RadioGroupField = ({
  className = '',
  name,
  label,
  variant,
  color,
  size,
  collapsed,
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
          collapsed={collapsed || formCollapsed}
          error={(errors[name]?.message as string) || undefined}
          autoComplete="off"
          {...field}
          {...rest}
        />
      )}
    />
  )
}

RadioGroupField.displayName = 'RadioGroupField'
