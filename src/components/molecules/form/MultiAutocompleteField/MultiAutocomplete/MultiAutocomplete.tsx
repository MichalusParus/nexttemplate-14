'use client'
import { forwardRef, useCallback, useState } from 'react'

import Button from '@/components/atoms/common/Button'
import Chip from '@/components/atoms/common/Chip'
import { ComboboxProps } from '@/components/atoms/common/Combobox/Combobox'
import ListBox from '@/components/atoms/common/ListBox'
import ChevronIcon from '@/components/atoms/icons/ChevronIcon'
import XIcon from '@/components/atoms/icons/XIcon'
import Dropdown from '@/components/molecules/popovers/Dropdown'
import { useFocusTrap } from '@/utils/hooks/useFocusTrap'

import { Label, LabelProps } from '../../../../atoms/common/Label/Label'
import {
  chevronClass,
  clearButtonClass,
  comboboxWrapClass,
  disabledVariant,
} from '../../AutocompleteField/Autocomplete/Autocomplete.style'
import Input from '../../InputField/Input'
import { InputProps } from '../../InputField/Input/Input'
import { inputVariant } from '../../InputField/Input/Input.style'
import { iconSize, selectedSize } from '../../MultiSelectField/MultiSelect/MultiSelect.style'

export type MultiAutocompleteProps = Pick<ComboboxProps, 'name' | 'disabled'> &
  Omit<LabelProps, 'name' | 'onClick'> & {
    /** position of dropdown */
    placement?: 'left' | 'top'
    /** style variant of component */
    variant?: 'text' | 'outlined' | 'contained'
    /** theme color of component, none disable styles for custom styling via className */
    color?: 'primary' | 'secondary' | 'terciary' | 'none'
    /** current value of input */
    inputValue: string
    /** current value of MultiAutocomplete */
    value: string[]
    /** options for select to choose from */
    options: { label: string; value: string }[]
    /** loading state for options fetching, loading is delayed for 1 second to prevent flickering */
    isLoading?: boolean
    /** optional placeholder */
    placeholder?: string
    /** optional input props for MultiAutocomplete input */
    inputProps?: InputProps
    /** set input value */
    onInputChange: (value: string) => void
    /** onChange function */
    onChange: (value: string[]) => void
  }

/** Basic custom MultiAutocomplete inside Label Component. For form purposes use MultiAutocompleteField. ComboboxProps and InputProps supported. USE CLIENT */
export const MultiAutocomplete = forwardRef<HTMLInputElement, MultiAutocompleteProps>(
  (
    {
      className = '',
      name,
      label,
      placement = 'left',
      variant = 'outlined',
      color = 'primary',
      inputValue,
      value,
      isLoading,
      options,
      size = 'md',
      width,
      placeholder = label,
      description,
      hideLabel,
      hideError,
      collapsed,
      disabled,
      error,
      inputProps,
      onInputChange,
      onChange,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const sortedOptions = placement === 'top' ? options.reverse() : options
    const { componentRef, startRef } = useFocusTrap(isOpen, () => setIsOpen(false))
    const [selectedOptions, setSelectedOptions] = useState<{ label: string; value: string }[]>([])
    const chevronPosition = isOpen ? 'rotate-180' : ''
    const errorShadow = error ? 'shadow-error' : ''
    const dropdownPadding = placement === 'left' ? 'pt-1' : 'pb-1'
    const comboboxZIndex = isOpen ? 'z-40' : 'z-20'
    const selectedClass = isOpen ? 'selected' : ''
    const disabledClass = disabled ? 'disabled' : ''

    const handleClose = useCallback(() => {
      startRef?.current?.focus()
      setIsOpen(prev => !prev)
    }, [startRef, setIsOpen])

    const handleOnChange = useCallback(
      (v: string) => {
        const newValues = value.includes(v) ? value.filter(val => val !== v) : [...value, v]
        const isAlreadySelected = selectedOptions.find(option => option.value === v)
        const newSelectedOptions = isAlreadySelected
          ? selectedOptions.filter(option => option.value !== v)
          : [...selectedOptions, ...options.filter(option => option.value === v)]
        onChange(newValues)
        setSelectedOptions(newSelectedOptions)
        onInputChange('')
      },
      [value, selectedOptions, options, onChange, onInputChange],
    )

    const handleInputChange = useCallback(
      (value: string | number) => {
        if (!isOpen) {
          setIsOpen(true)
        }
        onInputChange(String(value))
      },
      [isOpen, onInputChange],
    )

    const handleClear = useCallback(() => {
      onChange([])
      onInputChange('')
      setSelectedOptions([])
    }, [onChange, onInputChange])

    return (
      <Label
        className={className}
        name={name}
        label={label}
        size={size}
        width={width}
        error={error}
        description={description}
        hideLabel={hideLabel}
        hideError={hideError}
        collapsed={collapsed}
      >
        <div className={'MultiAutocomplete relative flex w-full'} ref={componentRef}>
          <div
            className={`ComboboxWrap pr-16 ${comboboxWrapClass} ${selectedClass} ${inputVariant[variant][color]} ${disabledClass} ${disabledVariant[variant]} ${comboboxZIndex} ${errorShadow}`}
          >
            {selectedOptions.length ? (
              <div
                className={`SelectedOptionsWrap flex w-full flex-wrap gap-1 ${selectedSize[size]} ${comboboxZIndex} `}
                data-testid="SelectedOptionsWrap"
              >
                {selectedOptions.map(option => (
                  <Chip
                    key={option.value}
                    variant={variant}
                    color={color}
                    size={size}
                    onClick={() => handleOnChange(option.value)}
                  >
                    {option.label}
                  </Chip>
                ))}
                <Button
                  className={`ClearButton ${clearButtonClass} ${comboboxZIndex} ${selectedClass}`}
                  startIcon={<XIcon className={iconSize[size]} />}
                  variant={variant}
                  color={color}
                  size="none"
                  hideShadow
                  aria-label="clear"
                  onClick={handleClear}
                />
              </div>
            ) : null}
            <Input
              id={name}
              className={'[&_input]:border-none [&_input]:bg-transparent'}
              name={name}
              label="MultiAutocompleteInput"
              value={inputValue}
              variant={variant}
              color="none"
              size={size}
              placeholder={placeholder}
              disabled={disabled}
              hideLabel
              hideError
              autoComplete="off"
              ref={ref}
              role="combobox"
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              aria-controls={name}
              onClick={handleClose}
              onChange={handleInputChange}
              {...inputProps}
            />
            <ChevronIcon className={`${chevronClass} ${comboboxZIndex} ${chevronPosition}`} />
          </div>
          <Dropdown
            isOpen={isOpen}
            placement={placement}
            variant={variant}
            color={color}
            onClose={handleClose}
          >
            <ListBox
              className={dropdownPadding}
              name={name}
              value={value}
              options={sortedOptions}
              variant={variant}
              color={color}
              size={size}
              isLoading={isLoading}
              noOptionLabel={`No options match ${inputValue}`}
              onClick={handleOnChange}
            />
          </Dropdown>
        </div>
      </Label>
    )
  },
)

MultiAutocomplete.displayName = 'MultiAutocomplete'
