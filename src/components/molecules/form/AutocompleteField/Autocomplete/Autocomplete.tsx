'use client'
import { forwardRef, KeyboardEvent, useCallback, useEffect, useState } from 'react'

import Button from '@/components/atoms/common/Button'
import { ComboboxProps } from '@/components/atoms/common/Combobox/Combobox'
import ListBox from '@/components/atoms/common/ListBox'
import { ListBoxProps } from '@/components/atoms/common/ListBox/ListBox'
import ChevronIcon from '@/components/atoms/icons/ChevronIcon'
import XIcon from '@/components/atoms/icons/XIcon'
import Dropdown from '@/components/molecules/popovers/Dropdown'
import { DropdownProps } from '@/components/molecules/popovers/Dropdown/Dropdown'
import { useFocusTrap } from '@/utils/hooks/useFocusTrap'

import { Label, LabelProps } from '../../../../atoms/common/Label/Label'
import Input from '../../InputField/Input'
import { InputProps } from '../../InputField/Input/Input'
import { inputVariant } from '../../InputField/Input/Input.style'
import { iconSize } from '../../MultiSelectField/MultiSelect/MultiSelect.style'
import {
  chevronClass,
  clearButtonClass,
  comboboxWrapClass,
  disabledVariant,
} from './Autocomplete.style'

export type AutocompleteProps = Pick<ComboboxProps, 'name' | 'disabled'> &
  Omit<LabelProps, 'name' | 'onClick'> & {
    /** position of dropdown */
    placement?: 'left' | 'top'
    /** style variant of component */
    variant?: 'text' | 'outlined' | 'contained'
    /** theme color of component, none disable styles for custom styling via className */
    color?: 'primary' | 'secondary' | 'terciary' | 'none'
    /** current value of input */
    inputValue: string
    /** current value of autocomplete */
    value: string
    /** options for select to choose from */
    options: { label: string; value: string }[]
    /** loading state for options fetching, loading is delayed for 1 second to prevent flickering */
    isLoading?: boolean
    /** optional placeholder */
    placeholder?: string
    /** optional input props for autocomplete input */
    inputProps?: Partial<InputProps>
    /** for passing aditional props to dropdown */
    dropdownProps?: Partial<DropdownProps>
    /** for passing aditional props to listbox */
    listboxProps?: Partial<ListBoxProps>
    /** function to call when autocomplete is opened for fetching options */
    onOpen?: () => void
    /** set input value */
    onInputChange: (value: string) => void
    /** onChange function */
    onChange: (value: string) => void
  }

/** Basic custom Autocomplete inside Label Component. For form purposes use AutocompleteField. Input, Dropdown and ListBox props supported. USE CLIENT */
export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
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
      dropdownProps,
      listboxProps,
      onOpen,
      onInputChange,
      onChange,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const sortedOptions = placement === 'top' ? options.reverse() : options
    const { componentRef, startRef } = useFocusTrap(isOpen, () => setIsOpen(false))
    const ghostArray = new Array(10).fill(null).map((_, i) => ({ label: `${i}`, value: `${i}` }))
    const chevronPosition = isOpen ? 'rotate-180' : ''
    const errorShadow = error ? 'shadow-error' : ''
    const dropdownPadding = placement === 'left' ? 'pt-1' : 'pb-1'
    const comboboxZIndex = isOpen ? 'z-40' : 'z-20'
    const selectedClass = isOpen ? 'selected' : ''
    const disabledClass = disabled ? 'disabled' : ''

    const handleClose = useCallback(() => {
      const selectedLabel = options.find(option => option.value === value)?.label
      if (isOpen && inputValue !== selectedLabel) {
        onInputChange(selectedLabel || '')
      }
      startRef?.current?.focus()
      setIsOpen(prev => !prev)
    }, [startRef, isOpen, options, value, inputValue, onInputChange, setIsOpen])

    const handleOnChange = useCallback(
      (target: string) => {
        const selectedOption = options.find(({ value }) => value === target) || options[0]
        onChange(selectedOption.value)
        onInputChange(selectedOption.label)
        startRef?.current?.focus()
        setIsOpen(prev => !prev)
      },
      [startRef, options, onChange, setIsOpen, onInputChange],
    )

    const handleInputChange = useCallback(
      (value: string | number) => {
        if (!isOpen) {
          setIsOpen(true)
        }
        onInputChange(String(value).trimStart())
      },
      [isOpen, onInputChange],
    )

    useEffect(() => {
      if (isOpen && onOpen) {
        onOpen()
      }
    }, [isOpen, onOpen])

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
        <div className={'Autocomplete relative flex w-full'} ref={componentRef}>
          <div
            className={`ComboboxWrap ${comboboxWrapClass} ${selectedClass} ${inputVariant[variant][color]} ${disabledClass} ${disabledVariant[variant]} ${comboboxZIndex} ${errorShadow}`}
          >
            <Input
              id={name}
              className={'w-full [&_input]:border-none [&_input]:bg-transparent [&_input]:pr-16'}
              name={name}
              label="AutoCompleteInput"
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
              onKeyDown={(e: KeyboardEvent) =>
                e.code === 'Enter' || e.code === 'Space' ? setIsOpen(true) : null
              }
              onClick={() => setIsOpen(true)}
              onChange={handleInputChange}
              {...inputProps}
            />
            <ChevronIcon className={`${chevronClass} ${comboboxZIndex} ${chevronPosition}`} />
            {inputValue ? (
              <Button
                className={`ClearButton ${clearButtonClass} ${comboboxZIndex} ${selectedClass}`}
                startIcon={<XIcon className={iconSize[size]} />}
                variant={variant}
                color={color}
                size="none"
                hideShadow
                aria-label="clear"
                onClick={() => {
                  onChange('')
                  onInputChange('')
                }}
              />
            ) : null}
          </div>
          <Dropdown
            isOpen={isOpen}
            placement={placement}
            variant={variant}
            color={color}
            onClose={handleClose}
            {...dropdownProps}
          >
            <ListBox
              className={dropdownPadding}
              name={name}
              value={[value]}
              options={isLoading && onOpen ? ghostArray : sortedOptions}
              variant={variant}
              color={color}
              size={size}
              isLoading={isLoading}
              hideCheckbox
              noOptionLabel={`No options match ${inputValue}`}
              onClick={handleOnChange}
              {...listboxProps}
            />
          </Dropdown>
        </div>
      </Label>
    )
  },
)

Autocomplete.displayName = 'Autocomplete'
