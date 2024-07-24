'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, KeyboardEvent, useCallback, useState } from 'react'

import Button from '@/components/atoms/common/Button'
import { ComboboxProps } from '@/components/atoms/common/Combobox/Combobox'
import ListBox from '@/components/atoms/common/ListBox'
import { ListBoxProps } from '@/components/atoms/common/ListBox/ListBox'
import ChevronIcon from '@/components/atoms/icons/ChevronIcon'
import XIcon from '@/components/atoms/icons/XIcon'
import Dropdown from '@/components/molecules/popovers/Dropdown'
import { DropdownProps } from '@/components/molecules/popovers/Dropdown/Dropdown'
import { OptionType } from '@/components/types'
import { useFocusTrap } from '@/utils/hooks/useFocusTrap'
import { cn, filterOutKeys } from '@/utils/utils'

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
    /** current value of autocomplete */
    value: string
    /** options for select to choose from */
    options: OptionType[]
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
      focusable: ['.Option', '.ClearButton'],
      focusSelected: '.selected.Option',
    })
    const noOptionsLabel =
      inputValue.length <= 2 ? t('searchForOptions') : t('noOptionsMatch', { value: inputValue })
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
        setInputValue(selectedOption.label)
        startRef?.current?.focus()
        setIsOpen(prev => !prev)
      },
      [startRef, options, onChange, setIsOpen, setInputValue],
    )

    const handleInputChange = useCallback(
      (value: string | number) => {
        if (!isOpen) {
          setIsOpen(true)
        }
        setInputValue(String(value).trimStart())
        onInputChange(String(value).trimStart())
      },
      [isOpen, onInputChange],
    )

    const handleClear = useCallback(() => {
      onChange('')
      onInputChange('')
      setInputValue('')
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
        <div className={cn('Autocomplete', 'relative flex w-full')} ref={componentRef}>
          <div
            className={cn(
              'ComboboxWrap',
              comboboxWrapClass,
              selectedClass,
              inputVariant[variant][color],
              disabledClass,
              disabledVariant[variant],
              comboboxZIndex,
              error && 'border-error-800 shadow-error',
            )}
          >
            <Input
              id={name}
              className={cn(
                'w-full [&_input]:border-none [&_input]:bg-transparent [&_input]:pr-16',
                inputProps.className,
              )}
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
              aria-describedby={`${name}-description`}
              aria-expanded={isOpen}
              aria-controls={name}
              onKeyDown={(e: KeyboardEvent) =>
                e.code === 'Enter' || e.code === 'Space' ? setIsOpen(true) : null
              }
              onClick={() => setIsOpen(true)}
              onChange={handleInputChange}
              {...filterOutKeys(inputProps, ['className'])}
            />
            <ChevronIcon className={cn(chevronClass, comboboxZIndex, isOpen && 'rotate-180')} />
            {inputValue ? (
              <Button
                className={cn('ClearButton', clearButtonClass, comboboxZIndex, selectedClass)}
                startIcon={<XIcon className={iconSize[size]} />}
                variant={variant}
                color={color}
                size="none"
                hideShadow
                aria-label={t('clear')}
                onClick={handleClear}
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
              className={cn(placement === 'left' ? 'pt-1' : 'pb-1', listboxProps.className)}
              name={name}
              value={[value]}
              options={sortedOptions}
              variant={variant}
              color={color}
              size={size}
              isLoading={isLoading}
              hideCheckbox
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

Autocomplete.displayName = 'Autocomplete'
