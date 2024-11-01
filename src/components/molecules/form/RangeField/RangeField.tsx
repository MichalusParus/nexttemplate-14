'use client'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormStyleContext } from '../Form/Form'
import { Range, RangeProps } from './Range/Range'

export type RangeFieldProps = Omit<RangeProps, 'value' | 'error' | 'onChange'>

/** Form and style context wrapper for Input component. Default InputHTMLAttributes props supported. USE CLIENT */
export const RangeField = ({
  className,
  name,
  label,
  color,
  size,
  labelProps,
  ...rest
}: RangeFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const { formColor, formSize, formCollapsed } = useContext(FormStyleContext)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Range
          className={className}
          label={label}
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

RangeField.displayName = 'RangeField'
