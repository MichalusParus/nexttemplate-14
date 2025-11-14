'use client'
import { isEqual } from 'lodash'
import { forwardRef, useCallback } from 'react'

import { ToggleGroup, ToggleGroupProps } from '../../ToggleGroupField/ToggleGroup'

export type MultiToggleGroupProps = Omit<ToggleGroupProps, 'value' | 'onChange' | 'multiValue'> & {
  /** value of multiToggleGroup */
  value: string[]
  /** onChange function */
  onChange: (value: string[]) => void
}

/** Basic styled uncontroled MultiToggleGroup. For form purposes use MultiMultiToggleGroupField. Native DivHTMLAttributes and Button props supported. USE CLIENT */
export const MultiToggleGroup = forwardRef<HTMLDivElement | null, MultiToggleGroupProps>(
  ({ value, onChange, onClear, ...rest }, ref) => {
    const handleOnChange = useCallback(
      (v: string) => {
        if (value.some(val => isEqual(val, v))) {
          const newValue = value.filter(val => val !== v)
          if (newValue.length === 0 && onClear) {
            onClear()
          } else {
            onChange(newValue)
          }
        } else {
          onChange([...value, v])
        }
      },
      [value, onChange, onClear],
    )

    return (
      <ToggleGroup
        value={value?.[0]}
        multiValue={value}
        onChange={handleOnChange}
        ref={ref}
        {...rest}
      />
    )
  },
)

MultiToggleGroup.displayName = 'MultiToggleGroup'
