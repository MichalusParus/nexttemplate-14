'use client'
import { useTranslations } from 'next-intl'
import {
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { ButtonProps } from '@/components/atoms/common/Button'
import { buttonContentSize } from '@/components/atoms/common/Button/Button.style'
import { ListBox } from '@/components/atoms/common/ListBox'
import { ListBoxProps } from '@/components/atoms/common/ListBox/ListBox'
import { ChevronIcon, XIcon } from '@/components/atoms/icons'
import { Dropdown } from '@/components/molecules/popovers/Dropdown'
import { DropdownProps } from '@/components/molecules/popovers/Dropdown/Dropdown'
import { InputProps, OptionType, StyleProps } from '@/components/types'
import { useFocus } from '@/utils/hooks/useFocus'
import { cn, filterOutKeys } from '@/utils/utils'

import { TextInput, TextInputProps } from '../../../inputs/TextField/TextInput/TextInput'
import { inputVariant } from '../../../inputs/TextField/TextInput/TextInput.style'
import { AutocompleteValue } from './AtocompleteValue'
import { comboboxClass, disabledVariant } from './Autocomplete.style'

export type AutocompleteProps = Pick<TextInputProps, 'disabled'> &
  InputProps &
  StyleProps & {
    /** position of dropdown */
    placement?: 'bottom' | 'top'
    /** current value of autocomplete */
    value: string
    /** optional multiValue for displaying multiselect values */
    multiValue?: OptionType[]
    /** options for select to choose from */
    options: OptionType[]
    /** loading state for options fetching, loading is delayed for 1 second to prevent flickering */
    isLoading?: boolean
    /** optional for enabling expandable type of multiselect */
    expandable?: boolean
    /** for passing aditional props to combobox */
    buttonProps?: Partial<ButtonProps>
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
    /** optional onClear function for clearing selected values, used for multiselect */
    onClear?: (e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void
  }

/** Basic custom uncontroled Autocomplete. For form purposes use AutocompleteField. Button, TextInput, Dropdown and ListBox props supported. USE CLIENT */
export const Autocomplete = forwardRef<HTMLDivElement, PropsWithChildren<AutocompleteProps>>(
  (
    {
      className,
      name,
      placeholder = '',
      value,
      multiValue,
      options,
      expandable,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      placement = 'bottom',
      isLoading,
      error,
      disabled,
      buttonProps = {},
      inputProps = {},
      dropdownProps = {},
      listboxProps = {},
      onInputChange,
      onChange,
      onClear,
      children,
      ...rest
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const componentRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const autocompleteValueRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => componentRef.current!)
    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState<string>('')
    const [isTruncate, setIsTruncate] = useState(false)
    const sortedOptions = placement === 'top' ? options.reverse() : options
    const selectedOptions = multiValue
      ? multiValue
      : options.filter(option => value === option.value)
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
      if (isOpen && inputValue !== '' && inputValue !== selectedLabel && !multiValue) {
        setInputValue(selectedLabel || '')
        onInputChange(selectedLabel || '')
      }
      if (focusableEl[0]) {
        focusableEl[0].focus()
      }
      setIsOpen(prev => !prev)
    }, [isOpen, options, value, inputValue, multiValue, focusableEl, onInputChange, setIsOpen])

    const handleOnChange = useCallback(
      (target: string, e?: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
        e?.stopPropagation()
        const selectedOption = options.find(({ value }) => value === target) || options[0]
        onChange(selectedOption.value)
        if (!multiValue) {
          setInputValue(selectedOption.label)
          onInputChange(selectedOption.label)
          setIsOpen(false)
        }
        if (focusableEl[0]) {
          focusableEl[0].focus()
        }
      },
      [options, focusableEl, multiValue, onChange, setIsOpen, setInputValue, onInputChange],
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

    useEffect(() => {
      if (!multiValue?.length) {
        setInputValue('')
      }
      if (multiValue && autocompleteValueRef?.current) {
        const isOverflow =
          autocompleteValueRef?.current?.scrollWidth > autocompleteValueRef?.current?.clientWidth
        setIsTruncate(isOverflow)
      }
    }, [multiValue])

    return (
      <div
        className={cn('Autocomplete', 'relative flex w-full', className)}
        ref={componentRef}
        data-testid="Autocomplete"
      >
        <div
          className={cn(
            'AutocompleteCombobox',
            'flex max-w-full items-center justify-between',
            isOpen && 'selected z-combobox',
            disabled && 'disabled',
            error && 'border-error-800 shadow-error',
            comboboxClass,
            inputVariant[variant][color],
            buttonContentSize[size],
            disabledVariant[variant],
            buttonProps.className,
          )}
          {...filterOutKeys(buttonProps, ['className'])}
        >
          <AutocompleteValue
            selectedOptions={selectedOptions}
            multiValue={multiValue}
            variant={variant}
            color={color}
            size={size}
            expandable={expandable}
            handleOnChange={handleOnChange}
            ref={autocompleteValueRef}
          >
            <div className="relative min-w-[30%] grow bg-inherit ">
              <TextInput
                id={name}
                className={cn('AutocompleteCombobox', 'w-auto border-none', inputProps.className)}
                name={name}
                type="text"
                value={inputValue}
                variant={variant}
                color="none"
                size="none"
                placeholder={placeholder}
                disabled={disabled}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-controls={name}
                aria-owns={name}
                autoComplete="off"
                onChange={handleInputChange}
                onClick={() => !disabled && setIsOpen(true)}
                onKeyDown={e =>
                  !disabled && (e.code === 'Enter' || e.code === 'Space')
                    ? setIsOpen(prev => !prev)
                    : null
                }
                {...filterOutKeys(inputProps, ['className'])}
                {...rest}
              />
              <div
                className={cn(
                  'TruncateWrap',
                  'invisible absolute -left-8 top-0 h-full w-8 bg-inherit text-xl',
                  isTruncate && 'visible',
                )}
              >
                ...
              </div>
            </div>
          </AutocompleteValue>
          <div className="relative flex items-center gap-1">
            {Boolean(selectedOptions.length) && onClear && (
              <div
                className={cn('ClearButton', 'shrink-0')}
                role="button"
                aria-label={t('clear')}
                tabIndex={0}
                onClick={e => onClear(e)}
                onKeyDown={e => (e.code === 'Enter' || e.code === 'Space' ? onClear(e) : null)}
              >
                <XIcon />
              </div>
            )}
            <ChevronIcon
              className={cn('text-inherit transition-transform', isOpen && 'rotate-180')}
            />
          </div>
        </div>
        <Dropdown
          isOpen={isOpen}
          parentRef={componentRef}
          placement={placement}
          variant={variant}
          color={color}
          modal
          onClose={handleClose}
          scrollShadowProps={{ disableHorizontal: true }}
          ref={dropdownRef}
          {...dropdownProps}
        >
          <ListBox
            name={name}
            value={multiValue ? multiValue.map(v => v.value) : [value]}
            options={sortedOptions}
            variant={variant}
            color={color}
            size={size}
            isLoading={isLoading}
            noOptionLabel={
              inputValue.length <= 2 || !isLoading
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
  },
)

Autocomplete.displayName = 'Autocomplete'
