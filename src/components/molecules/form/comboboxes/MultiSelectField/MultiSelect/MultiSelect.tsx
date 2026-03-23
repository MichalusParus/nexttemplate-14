'use client'
import { isEqual } from 'lodash'
import { ForwardedRef, forwardRef, useCallback, useMemo } from 'react'

import { useGroupedOptions } from '@/components/utils/hooks/useGroupedOptions'
import { OptionType } from '@/components/utils/types'

import { Select, SelectProps } from '../../SelectField/Select/Select'

export type MultiSelectProps<T = string> = Omit<
  SelectProps<T>,
  'value' | 'multiValue' | 'onChange' | 'onClear' | 'onSelectAll' | 'selectAllState'
> & {
  /** current value of component */
  value: T[]
  /** renders select all checkbox option */
  selectAll?: boolean
  /** onChange function */
  onChange: (value: T[]) => void
}

/** Basic custom uncontroled MultiSelect. For form purposes use MultiSelectField. Button, Dropdown and ListBox props supported. USE CLIENT */
function MultiSelectComponent<T = string>(
  { value, selectAll, onChange, children, ...rest }: MultiSelectProps<T>,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const { flatOptions } = useGroupedOptions<OptionType<T>>(rest.options)

  const selectAllState = useMemo(() => {
    if (!selectAll) return undefined
    const selectableOptions = flatOptions.filter(o => !o.isDisabled)
    const disabled = !selectableOptions.length
    if (disabled) return { checked: false, indeterminate: false, disabled }
    const checked = selectableOptions.every(o => value.some(v => isEqual(v, o.value)))
    const indeterminate = !checked && selectableOptions.some(o => value.some(v => isEqual(v, o.value)))
    return { checked, indeterminate, disabled }
  }, [selectAll, flatOptions, value])

  const handleOnChange = useCallback(
    (v: T) => {
      if (value.some(val => isEqual(val, v))) {
        onChange(value.filter(val => !isEqual(val, v)))
      } else {
        onChange([...value, v])
      }
    },
    [value, onChange],
  )

  const handleSelectAll = useCallback(() => {
    const selectableValues = flatOptions.filter(o => !o.isDisabled).map(o => o.value)
    const allSelected = selectableValues.every(v => value.some(val => isEqual(val, v)))
    onChange(allSelected ? [] : selectableValues)
  }, [flatOptions, value, onChange])

  return (
    <Select<T>
      value={value[0]}
      multiValue={value}
      onChange={handleOnChange}
      selectAllState={selectAllState}
      onSelectAll={selectAll ? handleSelectAll : undefined}
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
