'use client'
import { forwardRef, KeyboardEvent, MouseEvent, useCallback } from 'react'

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
export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
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

    const handleClear = useCallback(
      (e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
        e.stopPropagation()
        onChange([])
      },
      [onChange],
    )

    return (
      <Select
        value={value[0]}
        multiValue={value}
        onChange={handleOnChange}
        onClear={handleClear}
        ref={ref}
        {...rest}
      />
    )
  },
)

MultiSelect.displayName = 'MultiSelect'
