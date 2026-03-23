'use client'
import { FocusEvent, ForwardedRef, forwardRef, KeyboardEvent, MouseEvent, MutableRefObject, useCallback, useImperativeHandle, useRef } from 'react'

import { ButtonProps } from '@/components/atoms/common/Button'
import {
  buttonClass,
  buttonSize,
  buttonVariant,
} from '@/components/atoms/common/Button/Button.style'
import { ChipProps } from '@/components/atoms/common/Chip'
import { ChevronIcon } from '@/components/atoms/icons'
import { Ellipsis } from '@/components/atoms/typography/Ellipsis'
import { ClearButton } from '@/components/molecules/form/comboboxes/SelectField/Select/ClearButton'
import { TextInput, TextInputProps } from '@/components/molecules/form/inputs/TextField/TextInput'
import { disabledVariant,focusWithinVariant } from '@/components/utils/common.style'
import { FOCUS_SELECTORS } from '@/components/utils/hooks/useFocus'
import { InputProps, NativeDivProps, OptionType, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { ValueChips } from '../../../SelectField/Select/ValueChips'

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
    /** ref to expose input element to parent */
    inputRef?: MutableRefObject<HTMLInputElement | null>
    /** handle toggle function */
    handleToggle: (open?: boolean) => void
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
    displayChips = false,
    variant = 'outlined',
    color = 'primary',
    size = 'md',
    disabled,
    error,
    inputProps = {},
    chipProps = {},
    inputRef,
    onFocus,
    onClear,
    handleToggle,
    onInputChange,
    handleOnChange,
    ...rest
  }: AutocompleteComboboxProps<T>,
  ref: ForwardedRef<HTMLDivElement | null>,
) {
  const inputElRef = useRef<HTMLInputElement | null>(null)
  const comboboxRef = useRef<HTMLDivElement | null>(null)
  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => comboboxRef.current)
  const {
    className: inputClassName,
    onFocus: inputOnFocus,
    onBlur: inputOnBlur,
    ...restInputProps
  } = inputProps
  const comboboxTitle = selectedOptions?.map(v => v.label).join(', ')

  const handleComboboxFocus = useCallback(
    (e: FocusEvent<HTMLDivElement>) => {
      onFocus?.(e)
      const relatedEl = e.relatedTarget
      const isFromFocusableElement =
        relatedEl instanceof HTMLElement &&
        FOCUS_SELECTORS.autocomplete.some(sel => relatedEl.classList.contains(sel.slice(1)))
      if (isFromFocusableElement || relatedEl === inputElRef.current) return
      const input = inputElRef.current
      if (input) {
        input.focus()
        requestAnimationFrame(() => {
          const length = input.value.length
          input.setSelectionRange(length, length)
        })
      }
    },
    [onFocus],
  )

  const handleOpen = useCallback(
    (e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
      if (disabled || ('key' in e && !['Enter'].includes(e.key as string))) return
      e.stopPropagation()
      handleToggle()
    },
    [disabled, handleToggle],
  )

  return (
    <div
      id={`${name}-combobox`}
      className={cn(
        'AutocompleteCombobox',
        buttonClass,
        'flex w-full cursor-text justify-between focus-within:ring-1',
        isOpen && 'selected z-combobox',
        error && 'error',
        buttonVariant[variant][color],
        focusWithinVariant[variant][color],
        buttonSize[size],
        disabled && 'disabled ' + disabledVariant[variant],
        className,
      )}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls={`${name}-listbox`}
      aria-owns={`${name}-listbox`}
      onClick={handleOpen}
      onKeyDown={handleOpen}
      onFocus={handleComboboxFocus}
      ref={comboboxRef}
      {...rest}
    >
      <div
        className={cn(
          'AutocompleteInnerWrap',
          'flex min-w-0 flex-1 items-center gap-2',
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
            'AutocompleteInput',
            'w-auto min-w-[30%] shrink border-none outline-none [&:has(input:focus-visible)]:ring-0',
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
          ref={el => {
            inputElRef.current = el
            if (inputRef) inputRef.current = el
          }}
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
        {onClear && (!!value || !!multiValue?.length) && <ClearButton onClick={onClear} data-testid="ClearAllButton" />}
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
