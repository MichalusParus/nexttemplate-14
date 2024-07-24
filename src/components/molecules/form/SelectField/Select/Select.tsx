'use client'
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'

import Combobox from '@/components/atoms/common/Combobox'
import { ComboboxProps } from '@/components/atoms/common/Combobox/Combobox'
import ListBox from '@/components/atoms/common/ListBox'
import { ListBoxProps } from '@/components/atoms/common/ListBox/ListBox'
import ChevronIcon from '@/components/atoms/icons/ChevronIcon'
import Dropdown from '@/components/molecules/popovers/Dropdown'
import { DropdownProps } from '@/components/molecules/popovers/Dropdown/Dropdown'
import { OptionType } from '@/components/types'
import { useFocusTrap } from '@/utils/hooks/useFocusTrap'
import { cn, filterOutKeys } from '@/utils/utils'

import { Label, LabelProps } from '../../../../atoms/common/Label/Label'

export type SelectProps = Pick<ComboboxProps, 'name' | 'disabled'> &
  Omit<LabelProps, 'onClick'> & {
    /** position of dropdown */
    placement?: 'left' | 'top'
    /** style variant of component */
    variant?: 'text' | 'outlined' | 'contained'
    /** theme color of component, none disable styles for custom styling via className */
    color?: 'primary' | 'secondary' | 'terciary' | 'none'
    /** current value of component */
    value: string
    /** options for select to choose from */
    options: OptionType[]
    /** optional placeholder */
    placeholder?: string
    /** optional combobox props for select combobox */
    comboboxProps?: Partial<ComboboxProps>
    /** for passing aditional props to dropdown */
    dropdownProps?: Partial<DropdownProps>
    /** for passing aditional props to listbox */
    listboxProps?: Partial<ListBoxProps>
    /** onChange function */
    onChange: (value: string) => void
  }

/** Basic custom Select inside Label Component. For form purposes use SelectField. Combobox, Dropdown and ListBox props supported. USE CLIENT */
export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className = '',
      name,
      label,
      placeholder = label,
      options,
      value,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      placement = 'left',
      width,
      description,
      hideLabel,
      hideError,
      collapsed,
      disabled,
      error,
      comboboxProps = {},
      dropdownProps = {},
      listboxProps = {},
      onChange,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const sortedOptions = placement === 'top' ? options.reverse() : options
    const selectedOption = options.find(option => option.value === value)
    const { componentRef, startRef } = useFocusTrap(isOpen, () => setIsOpen(false), {
      focusable: ['.Option'],
      focusSelected: '.selected.Option',
    })
    useImperativeHandle(ref, () => componentRef.current!)
    const comboboxTitle = selectedOption ? (
      selectedOption?.label
    ) : (
      <div className="text-dark-400">{placeholder}</div>
    )

    const handleClose = useCallback(() => {
      startRef?.current?.focus()
      setIsOpen(prev => !prev)
    }, [startRef])

    const handleOnChange = useCallback(
      (value: string) => {
        onChange(value)
        handleClose()
      },
      [onChange, handleClose],
    )

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
        <div className={cn('Select', 'relative w-full')} ref={componentRef}>
          <Combobox
            id={name}
            className={cn('SelectCombobox', error && 'error', comboboxProps.className)}
            name={name}
            variant={variant}
            color={color}
            size={size}
            hasPopup="listbox"
            fullWidth
            isOpen={isOpen}
            disabled={disabled}
            hideShadow
            disableUpperCase
            aria-labelledby={'label-' + name}
            aria-describedby={`${name}-description`}
            onClick={handleClose}
            {...filterOutKeys(comboboxProps, ['className'])}
          >
            <div className={cn('ComboboxInnerWrap', 'flex w-full justify-between gap-2')}>
              {comboboxTitle}
              <ChevronIcon
                className={cn('text-inherit transition-transform', isOpen && 'rotate-180')}
              />
            </div>
          </Combobox>
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
              hideCheckbox
              onClick={handleOnChange}
              {...filterOutKeys(listboxProps, ['className'])}
            />
          </Dropdown>
        </div>
      </Label>
    )
  },
)

Select.displayName = 'Select'
