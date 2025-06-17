'use client'
import { isEqual } from 'lodash'
import { ForwardedRef, forwardRef, useCallback } from 'react'

import { Select, SelectProps } from '../../SelectField/Select/Select'

export type MultiSelectProps<T = string> = Omit<
  SelectProps<T>,
  'value' | 'multiValue' | 'onChange' | 'onClear'
> & {
  /** current value of component */
  value: T[]
  /** onChange function */
  onChange: (value: T[]) => void
}

/** Basic custom uncontroled MultiSelect. For form purposes use MultiSelectField. Button, Dropdown and ListBox props supported. USE CLIENT */
function MultiSelectComponent<T = string>(
  { value, onChange, children, ...rest }: MultiSelectProps<T>,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const handleOnChange = useCallback(
    (v: T) => {
      if (value.some(val => isEqual(val, v))) {
        onChange(value.filter(val => val !== v))
      } else {
        onChange([...value, v])
      }
    },
    [value, onChange],
  )

  return (
    <Select<T>
      value={value[0]}
      multiValue={value}
      onChange={handleOnChange}
      onClear={() => onChange([])}
      ref={ref}
      {...rest}
    >
      {children}
    </Select>
  )
}

type MultiSelectComponentType = {
  <T = string>(
    props: MultiSelectProps<T> & {
      ref?: ForwardedRef<HTMLButtonElement>
    },
  ): React.ReactElement | null
  displayName?: string
}

export const MultiSelect = forwardRef(MultiSelectComponent) as MultiSelectComponentType

MultiSelect.displayName = 'MultiSelect'
