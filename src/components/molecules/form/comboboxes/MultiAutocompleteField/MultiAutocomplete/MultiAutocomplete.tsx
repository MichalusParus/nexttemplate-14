'use client'
import { isEqual } from 'lodash'
import { ForwardedRef, forwardRef, useCallback, useEffect, useRef, useState } from 'react'

import { useGroupedOptions } from '@/components/utils/hooks/useGroupedOptions'
import { OptionType } from '@/components/utils/types'

import { Autocomplete, AutocompleteProps } from '../../AutocompleteField/Autocomplete/Autocomplete'

export type MultiAutocompleteProps<T = string> = Omit<
  AutocompleteProps<T>,
  'value' | 'onChange' | 'selectedOptions' | 'multiValue'
> & {
  /** current value of component */
  value: T[]
  /** onChange function */
  onChange: (value: T[]) => void
}

/** Basic custom uncontroled MultiAutocomplete. For form purposes use MultiAutocompleteField. Button, TextInput, Dropdown and ListBox props supported. USE CLIENT */
function MultiAutocompleteComponent<T = string>(
  { value, options, onInputChange, onChange, ...rest }: MultiAutocompleteProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { flatOptions } = useGroupedOptions<OptionType<T>>(options)
  const [selectedOptions, setSelectedOptions] = useState<OptionType<T>[]>([])
  const selectedOptionsRef = useRef<number>(0)

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
      selectedOptionsRef.current = newValues.length
    },
    [value, flatOptions, setSelectedOptions, onChange],
  )

  const handleClear = useCallback(() => {
    onChange([])
    setSelectedOptions([])
    onInputChange('')
  }, [onChange, onInputChange])

  useEffect(() => {
    if (value.length !== selectedOptionsRef.current) {
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
      onInputChange={onInputChange}
      onChange={handleOnChange}
      onClear={handleClear}
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
