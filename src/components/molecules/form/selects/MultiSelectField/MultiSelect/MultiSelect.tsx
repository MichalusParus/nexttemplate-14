'use client'
import { forwardRef, useCallback } from 'react'

import { Select, SelectProps } from '../../SelectField/Select/Select'

export type MultiSelectProps = Omit<
  SelectProps,
  'value' | 'multiValue' | 'onChange' | 'onClear'
> & {
  /** current value of component */
  value: string[]
  /** onChange function */
  onChange: (value: string[]) => void
}

/** Basic custom uncontroled MultiSelect. For form purposes use MultiSelectField. Button, Dropdown and ListBox props supported. USE CLIENT */
export const MultiSelect = forwardRef<HTMLButtonElement, MultiSelectProps>(
  ({ value, onChange, ...rest }, ref) => {
    const handleOnChange = useCallback(
      (v: string) => {
        if (value.includes(v)) {
          onChange(value.filter(val => val !== v))
        } else {
          onChange([...value, v])
        }
      },
      [value, onChange],
    )

    return (
      <Select
        value={value[0]}
        multiValue={value}
        onChange={handleOnChange}
        onClear={() => onChange([])}
        ref={ref}
        {...rest}
      />
    )
  },
)

MultiSelect.displayName = 'MultiSelect'
