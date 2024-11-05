'use client'
import { useTranslations } from 'next-intl'
import {
  forwardRef,
  KeyboardEvent,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { Button } from '@/components/atoms/common/Button'
import { Chip } from '@/components/atoms/common/Chip'
import { ListBox } from '@/components/atoms/common/ListBox'
import { ChevronIcon, XIcon } from '@/components/atoms/icons'
import { Dropdown } from '@/components/molecules/popovers/Dropdown'
import { useFocus } from '@/utils/hooks/useFocus'
import { cn, filterOutKeys } from '@/utils/utils'

import { Label } from '../../../../atoms/common/Label/Label'
import { AutocompleteProps } from '../../AutocompleteField/Autocomplete/Autocomplete'
import {
  chevronClass,
  clearButtonClass,
  comboboxWrapClass,
  disabledVariant,
} from '../../AutocompleteField/Autocomplete/Autocomplete.style'
import { Input } from '../../InputField/Input'
import { inputSize, inputVariant } from '../../InputField/Input/Input.style'
import { iconSize } from '../../MultiSelectField/MultiSelect/MultiSelect.style'

export type MultiAutocompleteProps = Omit<AutocompleteProps, 'value' | 'onChange'> & {
  /** current value of component */
  value: string[]
  /** onChange function */
  onChange: (value: string[]) => void
}

/** Basic custom MultiAutocomplete inside Label Component. For form purposes use MultiAutocompleteField. Input, Dropdown and ListBox props supported. USE CLIENT */
export const MultiAutocomplete = forwardRef<
  HTMLDivElement,
  PropsWithChildren<MultiAutocompleteProps>
>(
  (
    {
      className,
      name,
      label,
      value,
      options,
      placeholder = label,
      placement = 'bottom',
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      isLoading,
      disabled,
      error,
      inputProps = {},
      dropdownProps = {},
      listboxProps = {},
      labelProps,
      onInputChange,
      onChange,
      children,
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const componentRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => componentRef.current!)
    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState<string>('')
    const sortedOptions = placement === 'top' ? options.reverse() : options
    const [selectedOptions, setSelectedOptions] = useState<{ label: string; value: string }[]>([])
    const noOptionsLabel =
      inputValue.length <= 2 ? t('searchForOptions') : t('noOptionsMatch', { value: inputValue })
    const comboboxZIndex = isOpen ? 'z-40' : 'z-20'
    const selectedClass = isOpen ? 'selected' : ''
    const disabledClass = disabled ? 'disabled' : ''
    const { focusableEl } = useFocus(
      isOpen,
      componentRef,
      ['.AutocompleteCombobox', '.ChipAction', '.ClearButton', '.Option'],
      () => setIsOpen(false),
      {
        portalRef: dropdownRef,
        value: value,
      },
    )

    const handleClose = useCallback(() => {
      if (focusableEl[0]) {
        focusableEl[0].focus()
      }
      setIsOpen(prev => !prev)
    }, [focusableEl, setIsOpen])

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
      if (focusableEl[0]) {
        focusableEl[0].focus()
      }
    }, [focusableEl, onChange, onInputChange])

    return (
      <Label name={name} label={label} size={size} error={error} {...labelProps}>
        <div
          className={cn('MultiAutocomplete', 'relative flex w-full', className)}
          ref={componentRef}
          data-testid="MultiAutocomplete"
        >
          <div
            className={cn(
              'ComboboxWrap',
              'flex flex-wrap items-start',
              comboboxWrapClass,
              selectedClass,
              inputVariant[variant][color],
              disabledClass,
              disabledVariant[variant],
              error && 'border-error-800 shadow-error',
            )}
          >
            {Boolean(selectedOptions.length) && (
              <div className={cn(inputSize[size], comboboxZIndex, 'mr-16 flex flex-wrap gap-1.5')}>
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
              </div>
            )}
            <ChevronIcon className={cn(chevronClass, comboboxZIndex, isOpen && 'rotate-180')} />
            <Input
              id={name}
              className={cn(
                'AutocompleteCombobox',
                'w-auto grow basis-40 border-none bg-transparent pr-16',
                comboboxZIndex,
                inputProps.className,
              )}
              name={name}
              label="MultiAutocompleteInput"
              value={inputValue}
              variant={variant}
              color="none"
              size={size}
              labelProps={{ hideError: true, hideLabel: true, collapsed: 'always' }}
              placeholder={placeholder}
              disabled={disabled}
              role="combobox"
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              aria-controls={name}
              aria-owns={name}
              aria-describedby={`${name}-description`}
              onKeyDown={(e: KeyboardEvent) =>
                e.code === 'Enter' || e.code === 'Space' ? setIsOpen(true) : null
              }
              onClick={() => setIsOpen(true)}
              onChange={handleInputChange}
              {...filterOutKeys(inputProps, ['className'])}
            />
            {Boolean(selectedOptions.length) && (
              <Button
                className={cn('ClearButton', clearButtonClass, selectedClass, comboboxZIndex)}
                startIcon={<XIcon className={iconSize[size]} />}
                variant={variant}
                color={color}
                size="none"
                hideShadow
                tabIndex={-1}
                aria-label={t('clear')}
                onClick={handleClear}
              />
            )}
          </div>
          <Dropdown
            key={String(selectedOptions.length)}
            isOpen={isOpen}
            parentRef={componentRef}
            placement={placement}
            variant={variant}
            color={color}
            onClose={handleClose}
            scrollShadowProps={{ disableHorizontal: true }}
            ref={dropdownRef}
            {...dropdownProps}
          >
            <ListBox
              className={cn(placement === 'bottom' ? 'pt-1' : 'pb-1', listboxProps.className)}
              name={name}
              value={value}
              options={sortedOptions}
              variant={variant}
              color={color}
              size={size}
              aria-multiselectable={true}
              isLoading={isLoading}
              noOptionLabel={noOptionsLabel}
              aria-hidden={!isOpen}
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
