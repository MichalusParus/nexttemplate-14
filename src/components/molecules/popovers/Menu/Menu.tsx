'use client'
import { ReactNode, useState } from 'react'

import { Combobox, ComboboxProps } from '@/components/atoms/common/Combobox/Combobox'
import { useFocusTrap } from '@/utils/hooks/useFocusTrap'

import Dropdown from '../Dropdown'

type MenuProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** name string serves as id for aria purposes and as secondary aria label */
  name: string
  /** combobox title */
  title?: string
  /** combobox icon */
  icon?: ReactNode
  /** position of dropdown */
  placement?: 'left' | 'right' | 'top'
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'none'
  /** for setting dropdown width */
  width?: string
  /** unlock relative position of menu wrap for custom dropdown placement */
  unlocked?: boolean
  /** for passing aditional props to combobox */
  comboboxProps?: Omit<ComboboxProps, 'name' | 'hasPopup' | 'isOpen'>
  /** children */
  children: React.ReactNode
}

/** Menu is dropdown popover for displaying additional settings. */
export const Menu = ({
  className = '',
  name,
  title,
  icon,
  placement = 'left',
  variant = 'outlined',
  color = 'primary',
  width = 'min-w-96',
  unlocked,
  comboboxProps,
  children,
}: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { componentRef, startRef } = useFocusTrap(isOpen, () => setIsOpen(false), [
    'button:not(.Overlay):not(.FakeSubmitButton)',
    '[href]',
    'input',
    '[tabindex]:not([tabindex="-1"])',
  ])

  const handleClose = () => {
    startRef?.current?.focus()
    setIsOpen(prev => !prev)
  }

  return (
    <div className={`${className} ${unlocked ? '' : 'relative'}`} data-testid="Menu">
      <Combobox
        name={name}
        isOpen={isOpen}
        hasPopup="menu"
        variant={variant}
        color={color}
        startIcon={icon}
        ref={startRef}
        onClick={handleClose}
        {...comboboxProps}
      >
        {title}
      </Combobox>
      <Dropdown
        name={name}
        isOpen={isOpen}
        placement={placement}
        variant={variant}
        color={color}
        width={width}
        padding="pt-1"
        role="menu"
        ref={componentRef}
        onClose={handleClose}
      >
        {children}
      </Dropdown>
    </div>
  )
}

Menu.displayName = 'Menu'
