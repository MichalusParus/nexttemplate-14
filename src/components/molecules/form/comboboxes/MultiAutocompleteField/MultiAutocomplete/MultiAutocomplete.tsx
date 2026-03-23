'use client'
import { isEqual } from 'lodash'
import { ForwardedRef, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useGroupedOptions } from '@/components/utils/hooks/useGroupedOptions'
import { OptionType } from '@/components/utils/types'

import { Autocomplete, AutocompleteProps } from '../../AutocompleteField/Autocomplete/Autocomplete'

export type MultiAutocompleteProps<T = string> = Omit<
  AutocompleteProps<T>,
  'value' | 'onChange' | 'selectedOptions' | 'multiValue' | 'onSelectAll' | 'selectAllState'
> & {
  /** current value of component */
  value: T[]
  /** renders select all checkbox option */
  selectAll?: boolean
  /** onChange function */
  onChange: (value: T[]) => void
}

/** Basic custom uncontroled MultiAutocomplete. For form purposes use MultiAutocompleteField. Button, TextInput, Dropdown and ListBox props supported. USE CLIENT */
function MultiAutocompleteComponent<T = string>(
  { value, options, selectAll, onInputChange, onChange, ...rest }: MultiAutocompleteProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { flatOptions } = useGroupedOptions<OptionType<T>>(options)
  const [selectedOptions, setSelectedOptions] = useState<OptionType<T>[]>([])
  const selectedOptionsRef = useRef<T[]>([])

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
      const alreadySelected = value.some(val => isEqual(val, v))
      const newValues = alreadySelected ? value.filter(val => !isEqual(val, v)) : [...value, v]
      onChange(newValues)
      setSelectedOptions(prev =>
        prev.find(option => isEqual(option.value, v))
          ? prev.filter(option => !isEqual(option.value, v))
          : [...prev, ...flatOptions.filter(option => isEqual(option.value, v))],
      )
      selectedOptionsRef.current = newValues
    },
    [value, flatOptions, setSelectedOptions, onChange],
  )

  const handleSelectAll = useCallback(() => {
    const selectableValues = flatOptions.filter(o => !o.isDisabled).map(o => o.value)
    const allVisibleSelected = selectableValues.every(v => value.some(val => isEqual(val, v)))
    if (allVisibleSelected) {
      const newValues = value.filter(v => !selectableValues.some(sv => isEqual(sv, v)))
      onChange(newValues)
      setSelectedOptions(prev =>
        prev.filter(o => !selectableValues.some(sv => isEqual(sv, o.value))),
      )
      selectedOptionsRef.current = newValues
    } else {
      const newToAdd = selectableValues.filter(v => !value.some(val => isEqual(val, v)))
      const newValues = [...value, ...newToAdd]
      onChange(newValues)
      setSelectedOptions(prev => [
        ...prev,
        ...flatOptions.filter(
          o =>
            !prev.some(p => isEqual(p.value, o.value)) &&
            selectableValues.some(sv => isEqual(sv, o.value)),
        ),
      ])
      selectedOptionsRef.current = newValues
    }
  }, [flatOptions, value, onChange])

  const handleClear = useCallback(() => {
    onChange([])
    setSelectedOptions([])
    onInputChange('')
  }, [onChange, onInputChange])

  useEffect(() => {
    if (!isEqual(value, selectedOptionsRef.current)) {
      const newSelectedOptions = flatOptions.filter(option =>
        value.some(v => isEqual(v, option.value)),
      )
      setSelectedOptions(newSelectedOptions)
    }
  }, [value, flatOptions])

  return (
    <Autocomplete
      value={value[0]}
      multiValue={value}
      selectedOptions={selectedOptions}
      options={options}
      selectAllState={selectAllState}
      onInputChange={onInputChange}
      onSelectAll={selectAll ? handleSelectAll : undefined}
      onClear={handleClear}
      onChange={handleOnChange}
      ref={ref}
      {...rest}
    />
  )
}

type MultiAutocompleteComponentType = {
  <T = string>(
    props: MultiAutocompleteProps<T> & {
      ref?: ForwardedRef<HTMLDivElement>
    },
  ): React.ReactElement | null
  displayName?: string
}

export const MultiAutocomplete = forwardRef(
  MultiAutocompleteComponent,
) as MultiAutocompleteComponentType

MultiAutocomplete.displayName = 'MultiAutocomplete'
