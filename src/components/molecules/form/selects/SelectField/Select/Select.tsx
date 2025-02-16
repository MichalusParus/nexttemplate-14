'use client'
import { Placement } from '@popperjs/core'
import { forwardRef, useCallback, useRef, useState } from 'react'

import { ListBox } from '@/components/atoms/common/ListBox'
import { ListBoxProps } from '@/components/atoms/common/ListBox/ListBox'
import { Dropdown } from '@/components/molecules/popovers/Dropdown'
import { DropdownProps } from '@/components/molecules/popovers/Dropdown/Dropdown'
import { OptionType } from '@/components/types'
import { useFocus } from '@/utils/hooks/useFocus'
import { cn } from '@/utils/utils'

import { SelectCombobox, SelectComboboxProps } from './SelectCombobox'

export type SelectProps = Omit<
  SelectComboboxProps,
  'isOpen' | 'handleOpen' | 'selectedOptions' | 'handleOnChange'
> & {
  /** position of dropdown */
  placement?: Placement
  /** current value of component */
  value: string
  /** optional multiValue for displaing multiselect values */
  multiValue?: string[]
  /** options for select to choose from */
  options: OptionType[]
  /** for passing aditional props to dropdown */
  dropdownProps?: Partial<DropdownProps>
  /** for passing aditional props to listbox */
  listboxProps?: Partial<ListBoxProps>
  /** optional onClose function for Select */
  onClose?: () => void
  /** optional onClear function for clearing selected values, used for multiselect */
  onClear?: () => void
  /** onChange function */
  onChange: (value: string) => void
}

/** Basic custom uncontroled Select. For form purposes use SelectField. Button, Dropdown and ListBox props supported. USE CLIENT */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      name,
      value,
      multiValue,
      options,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      placement = 'bottom',
      dropdownProps = {},
      listboxProps = {},
      onClose,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const componentRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)
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

    const handleOpen = useCallback(() => {
      if (focusableEl[0]) {
        focusableEl[0].focus()
      }
      if (isOpen) {
        onClose?.()
      }
      setIsOpen(prev => !prev)
    }, [focusableEl, isOpen, onClose])

    const handleOnChange = useCallback(
      (value: string) => {
        onChange(value)
        if (!multiValue) {
          handleOpen()
        }
      },
      [multiValue, onChange, handleOpen],
    )

    return (
      <div className={cn('Select', 'relative w-full')} ref={componentRef} data-testid="Select">
        <SelectCombobox
          isOpen={isOpen}
          name={name}
          multiValue={multiValue}
          selectedOptions={selectedOptions}
          variant={variant}
          color={color}
          size={size}
          handleOpen={handleOpen}
          handleOnChange={handleOnChange}
          ref={ref}
          {...rest}
        />
        <Dropdown
          isOpen={isOpen}
          parentRef={componentRef}
          placement={placement}
          variant={variant}
          color={color}
          modal
          onClose={handleOpen}
          scrollShadowProps={{ disableHorizontal: true }}
          ref={dropdownRef}
          {...dropdownProps}
        >
          <ListBox
            name={`${name}-listbox`}
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
