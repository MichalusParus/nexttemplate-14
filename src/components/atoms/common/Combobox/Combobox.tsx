'use client'
import { forwardRef } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button/Button'

export type ComboboxProps = Omit<ButtonProps, 'name'> & {
  /** name of popover that combobox controls */
  name: string
  /** controled popover type */
  hasPopup: 'dialog' | 'menu' | 'listbox' | 'true'
  /** popover open state */
  isOpen: boolean
}

/** Modified button with role combobox for controling popovers. Default ButtonHTMLAttributes props supported. USE CLIENT */
export const Combobox = forwardRef<HTMLButtonElement, ComboboxProps>(
  ({ className = '', name, hasPopup = 'dialog', isOpen, children, ...rest }, ref) => {
    return (
      <Button
        className={`Combobox ${className} relative ${isOpen ? 'selected' : ''} ${isOpen ? 'z-40' : 'z-20'}`}
        type="button"
        role="combobox"
        aria-haspopup={hasPopup}
        aria-expanded={isOpen}
        aria-controls={name}
        aria-label={name}
        ref={ref}
        {...rest}
      >
        {children}
      </Button>
    )
  },
)

Combobox.displayName = 'Combobox'
