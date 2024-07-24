'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, KeyboardEvent, useCallback, useState } from 'react'

import Button from '@/components/atoms/common/Button'
import Chip from '@/components/atoms/common/Chip'
import ListBox from '@/components/atoms/common/ListBox'
import ChevronIcon from '@/components/atoms/icons/ChevronIcon'
import XIcon from '@/components/atoms/icons/XIcon'
import Dropdown from '@/components/molecules/popovers/Dropdown'
import { useFocusTrap } from '@/utils/hooks/useFocusTrap'
import { cn, filterOutKeys } from '@/utils/utils'

import { Label } from '../../../../atoms/common/Label/Label'
import { AutocompleteProps } from '../../AutocompleteField/Autocomplete/Autocomplete'
import {
  chevronClass,
  clearButtonClass,
  comboboxWrapClass,
  disabledVariant,
} from '../../AutocompleteField/Autocomplete/Autocomplete.style'
import Input from '../../InputField/Input'
import { inputSize, inputVariant } from '../../InputField/Input/Input.style'
import { iconSize } from '../../MultiSelectField/MultiSelect/MultiSelect.style'

export type MultiAutocompleteProps = Omit<AutocompleteProps, 'value' | 'onChange'> & {
  /** current value of component */
  value: string[]
  /** onChange function */
  onChange: (value: string[]) => void
}

/** Basic custom MultiAutocomplete inside Label Component. For form purposes use MultiAutocompleteField. Input, Dropdown and ListBox props supported. USE CLIENT */
export const MultiAutocomplete = forwardRef<HTMLInputElement, MultiAutocompleteProps>(
  (
    {
      className = '',
      name,
      label,
      placement = 'left',
      variant = 'outlined',
      color = 'primary',
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
      inputProps = {},
      dropdownProps = {},
      listboxProps = {},
      onInputChange,
      onChange,
      children,
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState<string>('')
    const sortedOptions = placement === 'top' ? options.reverse() : options
    const { componentRef, startRef } = useFocusTrap(isOpen, () => setIsOpen(false), {
      focusable: ['.Option', '.ChipAction', '.ClearButton'],
      focusSelected: '.selected.Option',
    })
    const [selectedOptions, setSelectedOptions] = useState<{ label: string; value: string }[]>([])
    const noOptionsLabel =
      inputValue.length <= 2 ? t('searchForOptions') : t('noOptionsMatch', { value: inputValue })
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
      },
      [value, selectedOptions, options, onChange],
    )

    const handleInputChange = useCallback(
      (value: string | number) => {
        if (!isOpen) {
          setIsOpen(true)
        }
        onInputChange(String(value).trimStart())
        setInputValue(String(value).trimStart())
      },
      [isOpen, onInputChange],
    )

    const handleClear = useCallback(() => {
      onChange([])
      onInputChange('')
      setInputValue('')
      setSelectedOptions([])
      startRef?.current?.focus()
    }, [startRef, onChange, onInputChange])

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
        <div className={cn('MultiAutocomplete', 'relative flex w-full')} ref={componentRef}>
          <div
            className={cn(
              'ComboboxWrap',
              'flex flex-wrap items-start gap-1.5 pr-16',
              comboboxWrapClass,
              selectedClass,
              inputVariant[variant][color],
              inputSize[size],
              disabledClass,
              disabledVariant[variant],
              comboboxZIndex,
              error && 'border-error-800 shadow-error',
            )}
          >
            {selectedOptions.length ? (
              <Button
                className={cn('ClearButton', clearButtonClass, comboboxZIndex, selectedClass)}
                startIcon={<XIcon className={iconSize[size]} />}
                variant={variant}
                color={color}
                size="none"
                hideShadow
                tabIndex={-1}
                aria-label={t('clear')}
                onClick={handleClear}
              />
            ) : null}
            {selectedOptions.map(option => (
              <Chip
                key={option.value}
                variant={variant}
                color={color}
                size={size}
                buttonProps={{ tabIndex: -1 }}
                onClick={() => handleOnChange(option.value)}
              >
                {option.label}
              </Chip>
            ))}
            <Input
              id={name}
              className={cn(
                'grow basis-40 [&_input]:border-none [&_input]:bg-transparent [&_input]:py-px',
                inputProps.className,
              )}
              name={name}
              label="MultiAutocompleteInput"
              value={inputValue}
              variant={variant}
              color="none"
              size="none"
              width=""
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
              aria-describedby={`${name}-description`}
              onKeyDown={(e: KeyboardEvent) =>
                e.code === 'Enter' || e.code === 'Space' ? setIsOpen(true) : null
              }
              onClick={() => setIsOpen(true)}
              onChange={handleInputChange}
              {...filterOutKeys(inputProps, ['className'])}
            />
            <ChevronIcon className={cn(chevronClass, comboboxZIndex, isOpen && 'rotate-180')} />
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
              className={cn(placement === 'left' ? 'pt-1' : 'pb-1', listboxProps.className)}
              name={name}
              value={value}
              options={sortedOptions}
              variant={variant}
              color={color}
              size={size}
              aria-multiselectable={true}
              isLoading={isLoading}
              noOptionLabel={noOptionsLabel}
              onClick={handleOnChange}
              {...filterOutKeys(listboxProps, ['className'])}
            />
            {children}
          </Dropdown>
        </div>
      </Label>
    )
  },
)

MultiAutocomplete.displayName = 'MultiAutocomplete'
