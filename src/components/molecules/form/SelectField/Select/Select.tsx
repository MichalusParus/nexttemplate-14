'use client'
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { ListBox } from '@/components/atoms/common/ListBox'
import { ListBoxProps } from '@/components/atoms/common/ListBox/ListBox'
import { ChevronIcon } from '@/components/atoms/icons'
import { Dropdown } from '@/components/molecules/popovers/Dropdown'
import { DropdownProps } from '@/components/molecules/popovers/Dropdown/Dropdown'
import { FieldProps, OptionType, StyleProps } from '@/components/types'
import { useFocus } from '@/utils/hooks/useFocus'
import { cn, filterOutKeys } from '@/utils/utils'

import { Label } from '../../../../atoms/common/Label/Label'

export type SelectProps = Pick<ButtonProps, 'disabled'> &
  FieldProps &
  StyleProps & {
    /** position of dropdown */
    placement?: 'bottom' | 'top'
    /** current value of component */
    value: string
    /** options for select to choose from */
    options: OptionType[]
    /** optional button props for select combobox */
    buttonProps?: Partial<ButtonProps>
    /** for passing aditional props to dropdown */
    dropdownProps?: Partial<DropdownProps>
    /** for passing aditional props to listbox */
    listboxProps?: Partial<ListBoxProps>
    /** onChange function */
    onChange: (value: string) => void
  }

/** Basic custom Select inside Label Component. For form purposes use SelectField. Button, Dropdown and ListBox props supported. USE CLIENT */
export const Select = forwardRef<HTMLDivElement, SelectProps>(
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
      disabled,
      error,
      buttonProps = {},
      dropdownProps = {},
      listboxProps = {},
      labelProps,
      onChange,
    },
    ref,
  ) => {
    const componentRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => componentRef.current!)
    const [isOpen, setIsOpen] = useState(false)
    const sortedOptions = placement === 'top' ? options.reverse() : options
    const selectedOption = options.find(option => option.value === value)
    const { focusableEl } = useFocus(
      isOpen,
      componentRef,
      ['.SelectCombobox', '.Option'],
      () => setIsOpen(false),
      {
        portalRef: dropdownRef,
      },
    )
    const comboboxTitle = selectedOption ? (
      selectedOption?.label
    ) : (
      <div className="text-dark-400">{placeholder}</div>
    )

    const handleClose = useCallback(() => {
      if (focusableEl[0]) {
        focusableEl[0].focus()
      }
      setIsOpen(prev => !prev)
    }, [focusableEl])

    const handleOnChange = useCallback(
      (value: string) => {
        onChange(value)
        handleClose()
      },
      [onChange, handleClose],
    )

    return (
      <Label name={name} label={label} size={size} error={error} {...labelProps}>
        <div
          className={cn('Select', 'relative w-full', className)}
          ref={componentRef}
          data-testid="Select"
        >
          <Button
            className={cn('SelectCombobox', 'z-40 w-full', error && 'error', buttonProps.className)}
            variant={variant}
            color={color}
            size={size}
            disabled={disabled}
            hideShadow
            disableUpperCase
            role="combobox"
            aria-labelledby={'label-' + name}
            aria-describedby={`${name}-description`}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls={name}
            aria-owns={name}
            onClick={handleClose}
            {...filterOutKeys(buttonProps, ['className'])}
          >
            <div className={cn('ComboboxInnerWrap', 'flex w-full justify-between gap-2')}>
              {comboboxTitle}
              <ChevronIcon
                className={cn('text-inherit transition-transform', isOpen && 'rotate-180')}
              />
            </div>
          </Button>
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
              className={cn(listboxProps.className)}
              name={name}
              value={[value]}
              options={sortedOptions}
              variant={variant}
              color={color}
              size={size}
              hideCheckbox
              aria-hidden={!isOpen}
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
