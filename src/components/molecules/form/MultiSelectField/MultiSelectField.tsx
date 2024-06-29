import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormStyleContext } from '../Form/Form'
import { MultiSelect, MultiSelectProps } from './MultiSelect/MultiSelect'

type MultiSelectFieldProps = Omit<MultiSelectProps, 'value' | 'error' | 'onChange'>

/** Form and style context wrapper for Input component. ComboboxProps supported. */
export const MultiSelectField = ({
  className = '',
  name,
  label,
  variant,
  color,
  size,
  collapsed,
  ...rest
}: MultiSelectFieldProps) => {
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
        <MultiSelect
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

MultiSelectField.displayName = 'MultiSelectField'
