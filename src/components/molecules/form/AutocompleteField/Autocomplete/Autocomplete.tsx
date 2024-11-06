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
import { ListBox } from '@/components/atoms/common/ListBox'
import { ListBoxProps } from '@/components/atoms/common/ListBox/ListBox'
import { ChevronIcon, XIcon } from '@/components/atoms/icons'
import { Dropdown } from '@/components/molecules/popovers/Dropdown'
import { DropdownProps } from '@/components/molecules/popovers/Dropdown/Dropdown'
import { FieldProps, OptionType, StyleProps } from '@/components/types'
import { useFocus } from '@/utils/hooks/useFocus'
import { cn, filterOutKeys } from '@/utils/utils'

import { Label } from '../../../../atoms/common/Label/Label'
import { iconSize } from '../../MultiSelectField/MultiSelect/MultiSelect.style'
import { InputProps,TextInput } from '../../TextField/TextInput/TextInput'
import { inputVariant } from '../../TextField/TextInput/TextInput.style'
import {
  chevronClass,
  clearButtonClass,
  comboboxWrapClass,
  disabledVariant,
} from './Autocomplete.style'

export type AutocompleteProps = Pick<InputProps, 'disabled'> &
  FieldProps &
  StyleProps & {
    /** position of dropdown */
    placement?: 'bottom' | 'top'
    /** current value of autocomplete */
    value: string
    /** options for select to choose from */
    options: OptionType[]
    /** loading state for options fetching, loading is delayed for 1 second to prevent flickering */
    isLoading?: boolean
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

/** Basic custom Autocomplete inside Label Component. For form purposes use AutocompleteField. TextInput, Dropdown and ListBox props supported. USE CLIENT */
export const Autocomplete = forwardRef<HTMLDivElement, PropsWithChildren<AutocompleteProps>>(
  (
    {
      className,
      name,
      label,
      placeholder = label,
      value,
      options,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      placement = 'bottom',
      isLoading,
      error,
      disabled,
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
    const noOptionsLabel =
      inputValue.length <= 2 ? t('searchForOptions') : t('noOptionsMatch', { value: inputValue })
    const comboboxZIndex = isOpen ? 'z-40' : 'z-20'
    const selectedClass = isOpen ? 'selected' : ''
    const disabledClass = disabled ? 'disabled' : ''
    const { focusableEl } = useFocus(
      isOpen,
      componentRef,
      ['.AutocompleteCombobox', '.Option'],
      () => setIsOpen(false),
      {
        portalRef: dropdownRef,
      },
    )

    const handleClose = useCallback(() => {
      const selectedLabel = options.find(option => option.value === value)?.label
      if (isOpen && inputValue !== selectedLabel) {
        onInputChange(selectedLabel || '')
      }
      if (focusableEl[0]) {
        focusableEl[0].focus()
      }
      setIsOpen(prev => !prev)
    }, [isOpen, options, value, inputValue, focusableEl, onInputChange, setIsOpen])

    const handleOnChange = useCallback(
      (target: string) => {
        const selectedOption = options.find(({ value }) => value === target) || options[0]
        onChange(selectedOption.value)
        setInputValue(selectedOption.label)
        if (focusableEl[0]) {
          focusableEl[0].focus()
        }
        setIsOpen(prev => !prev)
      },
      [options, focusableEl, onChange, setIsOpen, setInputValue],
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
      if (focusableEl[0]) {
        focusableEl[0].focus()
      }
    }, [focusableEl, onChange, onInputChange])

    return (
      <Label name={name} label={label} size={size} error={error} {...labelProps}>
        <div
          className={cn('Autocomplete', 'relative flex w-full', className)}
          ref={componentRef}
          data-testid="Autocomplete"
        >
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
            <ChevronIcon className={cn(chevronClass, comboboxZIndex, isOpen && 'rotate-180')} />
            <TextInput
              id={name}
              className={cn(
                'AutocompleteCombobox',
                'w-full border-none bg-transparent pr-16',
                comboboxZIndex,
                inputProps.className,
              )}
              name={name}
              label="AutocompleteInput"
              value={inputValue}
              variant={variant}
              color="none"
              size={size}
              placeholder={placeholder}
              disabled={disabled}
              labelProps={{ hideError: true, hideLabel: true, collapsed: 'always' }}
              role="combobox"
              aria-haspopup="listbox"
              aria-describedby={`${name}-description`}
              aria-expanded={isOpen}
              aria-controls={name}
              aria-owns={name}
              onKeyDown={(e: KeyboardEvent) =>
                e.code === 'Enter' || e.code === 'Space' ? setIsOpen(true) : null
              }
              onClick={() => setIsOpen(true)}
              onChange={handleInputChange}
              {...filterOutKeys(inputProps, ['className'])}
            />
            {inputValue && (
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
            )}
          </div>
          <Dropdown
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
              value={[value]}
              options={sortedOptions}
              variant={variant}
              color={color}
              size={size}
              isLoading={isLoading}
              hideCheckbox
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

Autocomplete.displayName = 'Autocomplete'
