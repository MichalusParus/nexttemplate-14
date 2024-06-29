'use client'
import { ButtonHTMLAttributes, forwardRef } from 'react'

import { overlayClass } from './Overlay.style'

export type OverlayProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** bolean value for open state */
  isOpen: boolean
  /** boolean for darkr overlay, default is transparentn */
  dark?: boolean
  /** onClick for closing function */
  onClose: () => void
}

/** Overlay is used in popover components for closing popover on click outside. USE CLIENT */
export const Overlay = forwardRef<HTMLButtonElement, OverlayProps>(
  ({ className = '', isOpen, dark, onClose, ...rest }, ref) => {
    const darkOverlay = dark ? 'bg-dark-950 bg-opacity-20' : ''
    const openState = isOpen ? 'opacity-100' : 'invisible opacity-0'

    return (
      <button
        className={`Overlay ${className} ${overlayClass} ${openState} ${darkOverlay}`}
        type="button"
        onClick={onClose}
        tabIndex={-1}
        ref={ref}
        {...rest}
      />
    )
  },
)

Overlay.displayName = 'Overlay'
