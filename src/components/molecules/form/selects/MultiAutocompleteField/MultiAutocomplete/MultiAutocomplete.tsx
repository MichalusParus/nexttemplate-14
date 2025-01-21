'use client'
import { forwardRef, PropsWithChildren, useCallback, useState } from 'react'

import { Autocomplete, AutocompleteProps } from '../../AutocompleteField/Autocomplete/Autocomplete'

export type MultiAutocompleteProps = Omit<AutocompleteProps, 'value' | 'onChange'> & {
  /** current value of component */
  value: string[]
  /** onChange function */
  onChange: (value: string[]) => void
}

/** Basic custom uncontroled MultiAutocomplete. For form purposes use MultiAutocompleteField. Button, TextInput, Dropdown and ListBox props supported. USE CLIENT */
export const MultiAutocomplete = forwardRef<
  HTMLDivElement,
  PropsWithChildren<MultiAutocompleteProps>
>(({ value, options, onInputChange, onChange, ...rest }, ref) => {
  const [selectedOptions, setSelectedOptions] = useState<{ label: string; value: string }[]>([])

  const handleOnChange = useCallback(
    (v: string) => {
      const newValues = value.includes(v) ? value.filter(val => val !== v) : [...value, v]
      onChange(newValues)
      const isAlreadySelected = selectedOptions.find(option => option.value === v)
      const newSelectedOptions = isAlreadySelected
        ? selectedOptions.filter(option => option.value !== v)
        : [...selectedOptions, ...options.filter(option => option.value === v)]
      setSelectedOptions(newSelectedOptions)
    },
    [value, options, selectedOptions, onChange],
  )

  const handleClear = useCallback(() => {
    onChange([])
    setSelectedOptions([])
    onInputChange('')
  }, [onChange, onInputChange])

  return (
    <Autocomplete
      value={value[0]}
      multiValue={selectedOptions}
      options={options}
      ref={ref}
      onInputChange={onInputChange}
      onChange={handleOnChange}
      onClear={handleClear}
      {...rest}
    />
  )
})

MultiAutocomplete.displayName = 'MultiAutocomplete'
