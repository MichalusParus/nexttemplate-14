import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormStyleContext } from '../Form/Form'
import { Select, SelectProps } from './Select/Select'

export type SelectFieldProps = Omit<SelectProps, 'value' | 'error' | 'onChange'>

/** Form and style context wrapper for Input component. ComboboxProps supported. */
export const SelectField = ({
  className = '',
  name,
  label,
  variant,
  color,
  size,
  collapsed,
  ...rest
}: SelectFieldProps) => {
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
        <Select
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

SelectField.displayName = 'SelectField'
