'use client'
import { Placement } from '@popperjs/core'
import { isEqual } from 'lodash'
import { useTranslations } from 'next-intl'
import {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  PropsWithChildren,
  SyntheticEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { ListBox } from '@/components/atoms/common/ListBox'
import { ListBoxProps } from '@/components/atoms/common/ListBox/ListBox'
import { Dropdown } from '@/components/molecules/popovers/Dropdown'
import { DropdownProps } from '@/components/molecules/popovers/Dropdown/Dropdown'
import { useGroupedOptions } from '@/components/utils/hooks/useGroupedOptions'
import { InputProps, OptionGroupType, OptionType, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { AutocompleteCombobox, AutocompleteComboboxProps } from './AutocompleteCombobox'

export type AutocompleteProps<T = string> = Omit<
  AutocompleteComboboxProps<T>,
  'isOpen' | 'handleOpen' | 'handleOnChange' | 'inputValue'
> &
  InputProps &
  StyleProps & {
    /** position of dropdown */
    placement?: Placement
    /** options for select to choose from */
    options: OptionType<T>[] | OptionGroupType<T>[]
    /** loading state for options fetching, loading is delayed for 1 second to prevent flickering */
    isLoading?: boolean
    /** for passing aditional props to dropdown */
    dropdownProps?: Partial<DropdownProps>
    /** for passing aditional props to listbox */
    listboxProps?: Partial<ListBoxProps<T>>
    /** optional onOpen function for Select */
    onOpen?: () => void
    /** optional onClose function for Select */
    onClose?: () => void
    /** onChange function */
    onChange: (value: T) => void
  }

/** Basic custom uncontroled Autocomplete. For form purposes use AutocompleteField. Button, TextInput, Dropdown and ListBox props supported. USE CLIENT */
function AutocompleteComponent<T = string>(
  {
    name,
    value,
    multiValue,
    selectedOptions = [],
    options,
    displayChips,
    variant = 'outlined',
    color = 'primary',
    size = 'md',
    placement = 'bottom',
    isLoading,
    disabled,
    inputProps = {},
    dropdownProps = {},
    listboxProps = {},
    chipProps = {},
    onInputChange,
    onChange,
    onOpen,
    onClose,
    onClear,
    children,
    ...rest
  }: PropsWithChildren<AutocompleteProps<T>>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const t = useTranslations('Components')
  const componentRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => componentRef.current)
  const { isGrouped, flatOptions } = useGroupedOptions<OptionType<T>>(options)
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState<string>('')
  const selectedLabel = flatOptions.find(option => isEqual(option.value, value))?.label || ''

  const handleClose = useCallback(() => {
    const selectedLabel = flatOptions.find(option => isEqual(option.value, value))?.label
    if (isOpen && inputValue !== '' && inputValue !== selectedLabel && !multiValue) {
      setInputValue(selectedLabel || '')
      onInputChange(selectedLabel || '')
    }
    setIsOpen(prev => !prev)
  }, [isOpen, flatOptions, value, inputValue, multiValue, onInputChange, setIsOpen])

  const handleOnChange = useCallback(
    (target: T, e?: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
      e?.stopPropagation()
      onChange(target)
      if (!multiValue) {
        const selectedOption =
          flatOptions.find(({ value }) => isEqual(value, target)) || flatOptions[0]
        setInputValue(selectedOption.label)
        onInputChange(selectedOption.label)
        setIsOpen(false)
      }
    },
    [flatOptions, multiValue, onChange, setIsOpen, setInputValue, onInputChange],
  )

  const handleInputChange = useCallback(
    (v: string) => {
      if (!isOpen) {
        setIsOpen(true)
      }
      setInputValue(String(v).trimStart())
      onInputChange(String(v).trimStart())
    },
    [isOpen, onInputChange],
  )

  const handleOpen = useCallback(
    (e: SyntheticEvent) => {
      if (disabled || ('key' in e && !['Space', 'Enter'].includes(e.key as string))) return
      e.stopPropagation()
      if (isOpen) {
        onClose?.()
      } else {
        onOpen?.()
      }
      setIsOpen(prev => !prev)
    },
    [isOpen, onOpen, disabled, onClose],
  )

  useEffect(() => {
    if (multiValue) return
    if (!value) return setInputValue('')
    setInputValue(prev => {
      if (selectedLabel !== prev) return selectedLabel
      return prev
    })
  }, [value, multiValue, selectedLabel])

  return (
    <div
      className={cn('Autocomplete', 'relative flex w-full', isOpen && 'z-combobox')}
      data-testid="Autocomplete"
    >
      <AutocompleteCombobox<T>
        name={name}
        isOpen={isOpen}
        value={value}
        multiValue={multiValue}
        selectedOptions={selectedOptions}
        inputValue={inputValue}
        variant={variant}
        color={color}
        size={size}
        disabled={disabled}
        displayChips={displayChips}
        inputProps={inputProps}
        chipProps={chipProps}
        onClear={onClear}
        handleOpen={handleOpen}
        onInputChange={handleInputChange}
        handleOnChange={handleOnChange}
        ref={componentRef}
        {...rest}
      />
      <Dropdown
        isOpen={isOpen}
        anchorRef={componentRef}
        placement={placement}
        variant={variant}
        color={color}
        onClose={handleClose}
        scrollShadowProps={{ disableHorizontal: true }}
        ref={dropdownRef}
        {...dropdownProps}
      >
        <ListBox<T>
          name={`${name}-listbox`}
          value={multiValue ? multiValue : [value]}
          options={options}
          isGrouped={isGrouped}
          variant={variant}
          color={color}
          size={size}
          isLoading={isLoading}
          noOptionLabel={
            inputValue.length <= 2
              ? t('searchForOptions')
              : t('noOptionsMatch', { value: inputValue })
          }
          hideCheckbox={!multiValue}
          aria-hidden={!isOpen}
          onClick={handleOnChange}
          {...listboxProps}
        />
        {children}
      </Dropdown>
    </div>
  )
}

type AutocompleteComponentType = {
  <T = string>(
    props: PropsWithChildren<AutocompleteProps<T>> & {
      ref?: ForwardedRef<HTMLDivElement>
    },
  ): React.ReactElement | null
  displayName?: string
}

export const Autocomplete = forwardRef(AutocompleteComponent) as AutocompleteComponentType

Autocomplete.displayName = 'Autocomplete'
