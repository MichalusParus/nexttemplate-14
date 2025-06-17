'use client'
import { ForwardedRef, forwardRef, SyntheticEvent, useImperativeHandle, useRef } from 'react'

import { ButtonProps } from '@/components/atoms/common/Button'
import {
  buttonClass,
  buttonFocusWithinVariant,
  buttonSize,
  buttonVariant,
} from '@/components/atoms/common/Button/Button.style'
import { ChipProps } from '@/components/atoms/common/Chip'
import { ChevronIcon } from '@/components/atoms/icons'
import { Ellipsis } from '@/components/atoms/typography/Ellipsis'
import { ClearButton } from '@/components/molecules/form/comboboxes/SelectField/Select/ClearButton'
import { TextInput, TextInputProps } from '@/components/molecules/form/inputs/TextField/TextInput'
import { InputProps, NativeDivProps, OptionType, StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { ValueChips } from '../../../SelectField/Select/ValueChips'
import { disabledVariant } from '../Autocomplete.style'

export type AutocompleteComboboxProps<T = string> = NativeDivProps &
  Pick<ButtonProps, 'disabled'> &
  InputProps &
  StyleProps & {
    /** open state of component */
    isOpen: boolean
    /** current value of autocomplete */
    value: T
    /** optional multiValue for displaying multiselect values */
    multiValue?: T[]
    /** selected options for displaing multiselect values */
    selectedOptions?: OptionType<T>[]
    /** current value of input */
    inputValue?: string
    /** optional for enabling displayChips type of multiselect, or for displaying option content in combobox in single Select */
    displayChips?: boolean
    /** for passing aditional props to input */
    inputProps?: Partial<TextInputProps>
    /** for passing aditional props to chips */
    chipProps?: Partial<ChipProps>
    /** optional onClear function for MultiDatePicker when multiValue is defined */
    onClear?: () => void
    /** handle onOpen function */
    handleOpen: (e: SyntheticEvent) => void
    /** handle onInputChange function */
    onInputChange: (value: string) => void
    /** handle onChange function */
    handleOnChange: (value: T) => void
  }

/** Combobox for Select and MultiSelect. USE CLIENT */
function AutocompleteComboboxComponent<T = string>(
  {
    className,
    isOpen,
    name,
    placeholder,
    value,
    multiValue,
    selectedOptions,
    inputValue,
    displayChips,
    variant = 'outlined',
    color = 'primary',
    size = 'md',
    disabled,
    error,
    inputProps = {},
    chipProps = {},
    onFocus,
    onClear,
    handleOpen,
    onInputChange,
    handleOnChange,
    ...rest
  }: AutocompleteComboboxProps<T>,
  ref: ForwardedRef<HTMLDivElement | null>,
) {
  const inputRef = useRef<HTMLInputElement>(null)
  const comboboxRef = useRef<HTMLDivElement | null>(null)
  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => comboboxRef.current)
  const {
    className: inputClassName,
    onFocus: inputOnFocus,
    onBlur: inputOnBlur,
    ...restInputProps
  } = inputProps
  const comboboxTitle = selectedOptions?.map(v => v.label).join(', ')

  return (
    <div
      id={`${name}-combobox`}
      className={cn(
        'AutocompleteCombobox',
        buttonClass,
        'flex w-full cursor-text justify-between',
        isOpen && 'selected z-combobox',
        error && !disabled && 'error',
        disabled && 'disabled',
        buttonVariant[variant][color],
        buttonFocusWithinVariant[variant][color],
        buttonSize[size],
        disabledVariant[variant],
        className,
      )}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      role="combobox"
      title="button"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls={`${name}-listbox`}
      aria-owns={`${name}-listbox`}
      onClick={e => {
        handleOpen(e)
        inputRef.current?.focus()
      }}
      onKeyDown={handleOpen}
      onFocus={e => {
        onFocus?.(e)
        if (e.relatedTarget !== inputRef.current) inputRef.current?.focus()
      }}
      ref={comboboxRef}
      {...rest}
    >
      <div
        className={cn(
          'AutocompleteInnerWrap',
          'flex w-full items-center gap-2',
          displayChips && 'flex-wrap',
        )}
      >
        {!!multiValue?.length &&
          (!displayChips ? (
            <Ellipsis>{comboboxTitle}</Ellipsis>
          ) : (
            <ValueChips<T>
              selectedOptions={selectedOptions || []}
              multiValue={multiValue}
              chipProps={chipProps}
              handleOnChange={handleOnChange}
            />
          ))}
        <TextInput
          id={name}
          className={cn(
            'AutocompleteCombobox',
            'w-auto min-w-[30%] shrink border-none',
            inputClassName,
          )}
          name={name}
          type="text"
          value={inputValue}
          variant={variant}
          color="none"
          size="none"
          placeholder={placeholder}
          disabled={disabled}
          aria-autocomplete="list"
          autoComplete="off"
          onChange={onInputChange}
          onClick={handleOpen}
          onKeyDown={handleOpen}
          ref={inputRef}
          onFocus={e => {
            inputOnFocus?.(e)
            if (comboboxRef.current) {
              comboboxRef.current.tabIndex = -1
            }
          }}
          onBlur={e => {
            inputOnBlur?.(e)
            if (comboboxRef.current) {
              comboboxRef.current.tabIndex = disabled ? -1 : 0
            }
          }}
          {...restInputProps}
        />
      </div>
      <div className="relative flex gap-2">
        {onClear && !!value && <ClearButton onClick={onClear} data-testid="ClearAllButton" />}
        <ChevronIcon className={cn('transition-transform', isOpen && 'rotate-180')} />
      </div>
    </div>
  )
}

type AutocompleteComboboxComponentType = {
  <T = string>(
    props: AutocompleteComboboxProps<T> & {
      ref?: ForwardedRef<HTMLDivElement>
    },
  ): React.ReactElement | null
  displayName?: string
}

export const AutocompleteCombobox = forwardRef(
  AutocompleteComboboxComponent,
) as AutocompleteComboboxComponentType

AutocompleteCombobox.displayName = 'AutocompleteCombobox'
