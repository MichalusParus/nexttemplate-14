'use client'
import { useTranslations } from 'next-intl'
import {
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { ButtonProps } from '@/components/atoms/common/Button'
import {
  buttonContentSize,
  buttonIconSize,
  buttonVariant,
} from '@/components/atoms/common/Button/Button.style'
import { ListBox } from '@/components/atoms/common/ListBox'
import { ListBoxProps } from '@/components/atoms/common/ListBox/ListBox'
import { ChevronIcon, XIcon } from '@/components/atoms/icons'
import { Dropdown } from '@/components/molecules/popovers/Dropdown'
import { DropdownProps } from '@/components/molecules/popovers/Dropdown/Dropdown'
import { Tooltip } from '@/components/molecules/popovers/Tooltip'
import { InputProps, OptionType, StyleProps } from '@/components/types'
import { useFocus } from '@/utils/hooks/useFocus'
import { cn, filterOutKeys } from '@/utils/utils'

import { selectClass, selectDisabledVariant } from './Select.style'
import { SelectValue } from './SelectValue'

export type SelectProps = Pick<ButtonProps, 'disabled'> &
  InputProps &
  StyleProps & {
    /** position of dropdown */
    placement?: 'bottom' | 'top'
    /** current value of component */
    value: string
    /** optional multiValue for displaing multiselect values */
    multiValue?: string[]
    /** options for select to choose from */
    options: OptionType[]
    /** optional for enabling expandable type of multiselect */
    expandable?: boolean
    /** for passing aditional props to combobox */
    buttonProps?: Partial<ButtonProps>
    /** for passing aditional props to dropdown */
    dropdownProps?: Partial<DropdownProps>
    /** for passing aditional props to listbox */
    listboxProps?: Partial<ListBoxProps>
    /** onChange function */
    onChange: (value: string) => void
    /** optional onClear function for clearing selected values, used for multiselect */
    onClear?: (e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void
  }

/** Basic custom uncontroled Select. For form purposes use SelectField. Button, Dropdown and ListBox props supported. USE CLIENT */
export const Select = forwardRef<HTMLDivElement, SelectProps>(
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
      disabled,
      error,
      buttonProps = {},
      dropdownProps = {},
      listboxProps = {},
      onChange,
      onClear,
      ...rest
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const componentRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const selectValueRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => componentRef.current!)
    const [isOpen, setIsOpen] = useState(false)
    const [isTruncate, setIsTruncate] = useState(false)
    const sortedOptions = placement === 'top' ? options.reverse() : options
    const selectedOptions = options.filter(option =>
      multiValue ? multiValue?.includes(option.value) : value === option.value,
    )
    const { focusableEl } = useFocus(
      isOpen,
      componentRef,
      ['.SelectCombobox', '.Option'],
      () => setIsOpen(false),
      {
        portalRef: dropdownRef,
      },
    )

    const handleClose = useCallback(() => {
      if (focusableEl[0]) {
        focusableEl[0].focus()
      }
      setIsOpen(prev => !prev)
    }, [focusableEl])

    const handleOnChange = useCallback(
      (value: string, e?: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
        e?.stopPropagation()
        onChange(value)
        if (!multiValue) {
          handleClose()
        }
      },
      [multiValue, onChange, handleClose],
    )

    useEffect(() => {
      if (multiValue && selectValueRef?.current) {
        const isOverflow =
          selectValueRef?.current?.scrollWidth > selectValueRef?.current?.clientWidth
        setIsTruncate(isOverflow)
      } else if (!multiValue?.length) {
        setIsTruncate(false)
      }
    }, [multiValue])

    return (
      <div
        className={cn('Select', 'relative w-full', className)}
        ref={componentRef}
        data-testid="Select"
      >
        <div
          className={cn(
            'SelectCombobox',
            disabled && 'disabled',
            error && 'border-error-800 shadow-error',
            isOpen && 'selected z-combobox',
            selectClass,
            buttonVariant[variant][color],
            buttonContentSize[size],
            buttonIconSize[size],
            selectDisabledVariant[variant],
            buttonProps.className,
          )}
          role="combobox"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={name}
          aria-owns={name}
          onClick={() => !disabled && setIsOpen(prev => !prev)}
          onKeyDown={e =>
            !disabled && (e.code === 'Enter' || e.code === 'Space')
              ? setIsOpen(prev => !prev)
              : null
          }
          {...filterOutKeys(buttonProps, ['className'])}
          {...rest}
        >
          <SelectValue
            selectedOptions={selectedOptions}
            multiValue={multiValue}
            placeholder={placeholder}
            variant={variant}
            color={color}
            size={size}
            expandable={expandable}
            handleOnChange={handleOnChange}
            ref={selectValueRef}
          />
          <div className="relative flex items-center gap-1 bg-inherit">
            <div
              className={cn(
                'TruncateWrap',
                'invisible absolute -left-8 top-0 h-full w-8 bg-inherit text-xl',
                isTruncate && 'visible',
              )}
            >
              ...
            </div>
            {Boolean(multiValue?.length) && onClear && (
              <Tooltip title={t('clear')} placement="top">
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
              </Tooltip>
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
            value={multiValue ? multiValue : [value]}
            options={sortedOptions}
            variant={variant}
            color={color}
            size={size}
            hideCheckbox={!multiValue}
            aria-hidden={!isOpen}
            onClick={handleOnChange}
            {...listboxProps}
          />
        </Dropdown>
      </div>
    )
  },
)

Select.displayName = 'Select'
