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

import { Dropdown } from '@/components/molecules/popovers/Dropdown'
import { DropdownProps } from '@/components/molecules/popovers/Dropdown/Dropdown'
import { FOCUS_SELECTORS, useFocus } from '@/components/utils/hooks/useFocus'
import { useGroupedOptions } from '@/components/utils/hooks/useGroupedOptions'
import { OptionGroupType, OptionType } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { ListBox, ListBoxProps } from './ListBox'
import { SelectCombobox, SelectComboboxProps } from './SelectCombobox'

export type SelectProps<T = string> = Omit<
  SelectComboboxProps<T>,
  'isOpen' | 'handleToggle' | 'selectedOptions' | 'handleOnChange'
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
  const [dropdownEl, setDropdownEl] = useState<HTMLDivElement | null>(null)

  useImperativeHandle<HTMLButtonElement | null, HTMLButtonElement | null>(
    ref,
    () => componentRef.current,
  )
  const [isOpen, setIsOpen] = useState(false)
  const { isGrouped, flatOptions } = useGroupedOptions<OptionType<T>>(options)
  const selectedOptions = flatOptions.filter(option =>
    multiValue ? multiValue.some(v => isEqual(v, option.value)) : isEqual(value, option.value),
  )

  const handleToggle = useCallback(
    (open?: boolean) => {
      const nextState = open ?? !isOpen
      setIsOpen(nextState)
      nextState ? onOpen?.() : onClose?.()
    },
    [isOpen, onOpen, onClose],
  )

  useFocus(isOpen, componentRef, {
    portalEl: dropdownEl,
    selectors: FOCUS_SELECTORS.select,
    onToggle: handleToggle,
    value: multiValue ?? value,
    scope: true,
    triggerNav: true,
    scopeType: 'dropdown',
    typeAhead: true,
    onOpen: ({ focusableElements, focusElement }) => {
      requestAnimationFrame(() => {
        const selectedIndex = focusableElements.findIndex(
          el => el.classList.contains('selected') && el.role !== 'combobox',
        )
        focusElement(selectedIndex !== -1 ? selectedIndex : 0)
      })
    },
  })

  const handleOnChange = useCallback(
    (value: T) => {
      onChange(value)
      if (!multiValue) {
        componentRef.current?.focus()
        handleToggle(false)
      }
    },
    [multiValue, onChange, handleToggle],
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
        handleToggle={handleToggle}
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
        onClose={() => handleToggle(false)}
        scrollShadowProps={{ disableHorizontal: true }}
        ref={setDropdownEl}
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
