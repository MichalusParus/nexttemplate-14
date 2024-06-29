import { forwardRef } from 'react'

import Overlay from '@/components/atoms/common/Overlay'
import Paper from '@/components/atoms/containers/Paper'
import ScrollShadow from '@/components/atoms/containers/ScrollShadow'

import { closeClass, dropdownClass, openClass } from './Dropdown.style'

export type DropdownProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** boolean for open state */
  isOpen: boolean
  /** position of dropdown */
  placement?: 'relative' | 'left' | 'right' | 'top'
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
  /** for setting component width as tailwind class */
  width?: string
  /** for setting internal padding of Paper component */
  padding?: string
  /** optional for disabling overlay */
  hideOverlay?: boolean
  /** hide dropdown shadow */
  hideShadow?: boolean
  /** children */
  children: React.ReactNode
  /** drawer closing function */
  onClose: () => void
}

/** Multirole dropdown popover, dropping down from relative parent */
export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      className = '',
      isOpen,
      placement = 'relative',
      variant = 'text',
      color = 'primary',
      width = 'w-full',
      padding = 'p-0',
      hideOverlay,
      hideShadow,
      children,
      onClose,
    },
    ref,
  ) => {
    return (
      <>
        <div
          className={`Dropdown ${className} ${dropdownClass} ${width} ${isOpen ? openClass[placement] : closeClass[placement]}`}
          ref={ref}
          data-testid="Dropdown"
        >
          <Paper
            className="overflow-hidden"
            variant={variant}
            color={color}
            padding={padding}
            hideShadow={hideShadow}
          >
            <ScrollShadow height="max-h-[40vh]">{children}</ScrollShadow>
          </Paper>
        </div>
        {hideOverlay || placement === 'relative' ? null : (
          <Overlay isOpen={isOpen} onClose={onClose} />
        )}
      </>
    )
  },
)

Dropdown.displayName = 'Dropdown'
