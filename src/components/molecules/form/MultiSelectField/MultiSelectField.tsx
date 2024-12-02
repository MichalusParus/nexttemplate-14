'use client'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormStyleContext } from '../Form/Form'
import { MultiSelect, MultiSelectProps } from './MultiSelect/MultiSelect'

type MultiSelectFieldProps = Omit<MultiSelectProps, 'value' | 'error' | 'onChange'>

/** Form and style context wrapper for MultiSelect component. Combobox, Dropdown and ListBox props supported. USE CLIENT */
export const MultiSelectField = ({
  className,
  name,
  label,
  variant,
  color,
  size,
  labelProps = {},
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
          error={(errors[name]?.message as string) || undefined}
          labelProps={{ collapsed: labelProps?.collapsed || formCollapsed }}
          {...field}
          {...rest}
        />
      )}
    />
  )
}

MultiSelectField.displayName = 'MultiSelectField'
