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
  ({ value, onChange, ...rest }, ref) => {
    const handleOnChange = useCallback(
      (v: string) => {
        if (value.some(val => isEqual(val, v))) {
          onChange(value.filter(val => val !== v))
        } else {
          onChange([...value, v])
        }
      },
      [value, onChange],
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
