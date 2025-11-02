'use client'
import { Placement } from '@popperjs/core'
import { isEqual } from 'lodash'
import {
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { ListBox } from '@/components/atoms/common/ListBox'
import { ListBoxProps } from '@/components/atoms/common/ListBox/ListBox'
import { Dropdown } from '@/components/molecules/popovers/Dropdown'
import { DropdownProps } from '@/components/molecules/popovers/Dropdown/Dropdown'
import { useGroupedOptions } from '@/components/utils/hooks/useGroupedOptions'
import { OptionGroupType, OptionType } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { SelectCombobox, SelectComboboxProps } from './SelectCombobox'

export type SelectProps<T = string> = Omit<
  SelectComboboxProps<T>,
  'isOpen' | 'handleOpen' | 'selectedOptions' | 'handleOnChange'
> & {
  /** position of dropdown */
  placement?: Placement
  /** current value of component */
  value: T
  /** optional multiValue for displaing multiselect values */
  multiValue?: T[]
  /** options for select to choose from */
  options: OptionType<T>[] | OptionGroupType<T>[]
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

/** Basic custom uncontroled Select. For form purposes use SelectField. Button, Dropdown and ListBox props supported. USE CLIENT */
function SelectComponent<T = string>(
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
    onOpen,
    onClose,
    onChange,
    children,
    ...rest
  }: SelectProps<T>,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const componentRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  useImperativeHandle<HTMLButtonElement | null, HTMLButtonElement | null>(
    ref,
    () => componentRef.current,
  )
  const [isOpen, setIsOpen] = useState(false)
  const { isGrouped, flatOptions } = useGroupedOptions<OptionType<T>>(options)
  const selectedOptions = flatOptions.filter(option =>
    multiValue ? multiValue.some(v => isEqual(v, option.value)) : isEqual(value, option.value),
  )

  const handleClose = useCallback(() => {
    setIsOpen(false)
    onClose?.()
  }, [setIsOpen, onClose])

  const handleOpen = useCallback(() => {
    // if (focusableEl[0]) {
    //   focusableEl[0].focus()
    // }
    if (isOpen) handleClose()
    else {
      onOpen?.()
      setIsOpen(true)
    }
  }, [isOpen, setIsOpen, onOpen, handleClose])

  const handleOnChange = useCallback(
    (value: T) => {
      onChange(value)
      if (!multiValue) {
        handleOpen()
      }
    },
    [multiValue, onChange, handleOpen],
  )

  return (
    <div className={cn('Select', 'relative w-full')} data-testid="Select">
      <SelectCombobox<T>
        isOpen={isOpen}
        name={name}
        multiValue={multiValue}
        selectedOptions={selectedOptions}
        variant={variant}
        color={color}
        size={size}
        handleOpen={handleOpen}
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
          hideCheckbox={!multiValue}
          aria-hidden={!isOpen}
          onClick={handleOnChange}
          {...listboxProps}
        >
          {children}
        </ListBox>
      </Dropdown>
    </div>
  )
}

type SelectComponentType = {
  <T = string>(
    props: PropsWithChildren<SelectProps<T>> & {
      ref?: ForwardedRef<HTMLButtonElement>
    },
  ): React.ReactElement | null
  displayName?: string
}

export const Select = forwardRef(SelectComponent) as SelectComponentType

Select.displayName = 'Select'
