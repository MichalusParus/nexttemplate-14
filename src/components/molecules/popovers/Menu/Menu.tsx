'use client'
import { PropsWithChildren, forwardRef, useImperativeHandle, useState } from 'react'

import { Combobox, ComboboxProps } from '@/components/atoms/common/Combobox/Combobox'
import { useFocusTrap } from '@/utils/hooks/useFocusTrap'

import Dropdown from '../Dropdown'
import { DropdownProps } from '../Dropdown/Dropdown'

export type MenuProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** name string serves as id for aria purposes and as secondary aria label */
  name: string
  /** optional isOpen state for external state control, must be use with setIsOpen prop, or for setting default open state */
  isOpen?: boolean
  /** position of dropdown */
  placement?: 'left' | 'right' | 'top'
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'none'
  /** for setting dropdown width */
  width?: string
  /** for passing aditional props to combobox */
  comboboxProps?: Partial<ComboboxProps>
  /** for passing aditional props to dropdown */
  dropdownProps?: Partial<DropdownProps>
  /** optional setIsOpen function, if set, menu becomes controlled component */
  setIsOpen?: (value: boolean) => void
}

/** Menu is dropdown popover for displaying additional settings. Uncontroled by default or controled with isOpen and onClose props. Should contain somponents with role menuitem. Combobox and Dropdown props supported. USE CLIENT */
export const Menu = forwardRef<HTMLDivElement, PropsWithChildren<MenuProps>>(
  (
    {
      className = '',
      name,
      isOpen,
      placement = 'left',
      variant = 'outlined',
      color = 'primary',
      width = 'min-w-96',
      comboboxProps = { children: 'MenuCombobox' },
      dropdownProps,
      setIsOpen,
      children,
    },
    ref,
  ) => {
    const [isLocallyOpen, setIsLocallyOpen] = useState(Boolean(isOpen))
    const openState = setIsOpen ? Boolean(isOpen) : isLocallyOpen
    useImperativeHandle(ref, () => componentRef.current!)
    const { componentRef, startRef } = useFocusTrap(isLocallyOpen, () => setIsLocallyOpen(false), [
      'button:not(.Overlay):not(.FakeSubmitButton)',
      '[href]',
      'input',
      '[tabindex]:not([tabindex="-1"])',
    ])

    const handleClose = () => {
      if (setIsOpen) {
        setIsOpen(!isOpen)
      } else {
        setIsLocallyOpen(prev => !prev)
      }
      startRef?.current?.focus()
    }

    return (
      <div
        className={`MenuWrap ${className} ${!setIsOpen ? 'relative' : ''}`}
        data-testid="MenuWrap"
      >
        {!setIsOpen ? (
          <Combobox
            name={name}
            isOpen={openState}
            hasPopup="menu"
            variant={variant}
            color={color}
            ref={startRef}
            onClick={handleClose}
            {...comboboxProps}
          />
        ) : null}
        <Dropdown
          isOpen={openState}
          placement={placement}
          variant={variant}
          color={color}
          width={width}
          padding="pt-1"
          ref={componentRef}
          onClose={handleClose}
          {...dropdownProps}
        >
          <div id={name} role="menu" aria-hidden={!openState}>
            {children}
          </div>
        </Dropdown>
      </div>
    )
  },
)

Menu.displayName = 'Menu'
