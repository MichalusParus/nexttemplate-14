'use client'
import { isEqual } from 'lodash'
import { ForwardedRef, forwardRef, useCallback } from 'react'

import { ToggleGroup, ToggleGroupProps } from '../../ToggleGroupField/ToggleGroup'

export type MultiToggleGroupProps<T = string> = Omit<ToggleGroupProps<T>, 'value' | 'onChange' | 'multiValue'> & {
  /** value of multiToggleGroup */
  value: T[]
  /** onChange function */
  onChange: (value: T[]) => void
}

/** Basic styled controlled MultiToggleGroup. For form purposes use MultiToggleGroupField. Native DivHTMLAttributes and Button props supported. USE CLIENT */
function MultiToggleGroupComponent<T = string>(
  { value, onChange, onClear, ...rest }: MultiToggleGroupProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const handleOnChange = useCallback(
    (v: T | undefined) => {
      if (v === undefined) return
      if (value.some(val => isEqual(val, v))) {
        const newValue = value.filter(val => !isEqual(val, v))
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
    <ToggleGroup<T>
      value={value?.[0]}
      multiValue={value}
      onChange={handleOnChange}
      ref={ref}
      {...rest}
    />
  )
}

type MultiToggleGroupComponentType = {
  <T = string>(
    props: MultiToggleGroupProps<T> & { ref?: ForwardedRef<HTMLDivElement> },
  ): React.ReactElement | null
  displayName?: string
}

export const MultiToggleGroup = forwardRef(MultiToggleGroupComponent) as MultiToggleGroupComponentType

MultiToggleGroup.displayName = 'MultiToggleGroup'
