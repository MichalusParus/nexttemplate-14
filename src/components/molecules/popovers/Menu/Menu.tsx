'use client'
import { Placement } from '@popperjs/core'
import {
  forwardRef,
  MutableRefObject,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { Combobox, ComboboxProps } from '@/components/atoms/common/Combobox/Combobox'
import { StyleProps } from '@/components/types'
import { useFocus } from '@/utils/hooks/useFocus'
import { cn } from '@/utils/utils'

import { Dropdown } from '../Dropdown'
import { DropdownProps } from '../Dropdown/Dropdown'

export type MenuProps = Omit<StyleProps, 'size'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** name string serves as id for aria purposes and as secondary aria label */
  name: string
  /** optional isOpen state for external state control, must be use with setIsOpen prop, or for setting default open state */
  isOpen?: boolean
  /** position of dropdown */
  placement?: Placement
  /** for setting dropdown width as inline css style */
  width?: number | string
  /** Parent ref of controled combobox */
  parentRef?: MutableRefObject<HTMLDivElement | null>
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
      className,
      name,
      isOpen,
      placement = 'bottom-start',
      variant = 'outlined',
      color = 'primary',
      width,
      parentRef,
      comboboxProps = { children: 'MenuCombobox' },
      dropdownProps,
      setIsOpen,
      children,
    },
    ref,
  ) => {
    const componentRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => componentRef.current!)
    const [isLocallyOpen, setIsLocallyOpen] = useState(Boolean(isOpen))
    const openState = setIsOpen ? Boolean(isOpen) : isLocallyOpen
    const menuPosition = !setIsOpen ? 'relative' : ''
    const { focusableEl } = useFocus(
      openState,
      componentRef,
      ['button:not(.Overlay)', '[href]', 'input', '[tabindex]:not([tabindex="-1"])'],
      setIsOpen ? () => setIsOpen(!isOpen) : () => setIsLocallyOpen(prev => !prev),
      {
        portalRef: dropdownRef,
      },
    )

    const handleClose = useCallback(() => {
      if (setIsOpen) {
        setIsOpen(!isOpen)
      } else {
        setIsLocallyOpen(prev => !prev)
      }
      focusableEl[0].focus()
    }, [focusableEl, isOpen, setIsOpen])

    return (
      <div
        className={cn('MenuWrap', menuPosition, className)}
        ref={componentRef}
        data-testid="MenuWrap"
      >
        {!setIsOpen && (
          <Combobox
            name={name}
            isOpen={openState}
            hasPopup="menu"
            variant={variant}
            color={color}
            onClick={handleClose}
            {...comboboxProps}
          />
        )}
        <Dropdown
          isOpen={openState}
          parentRef={parentRef || componentRef}
          placement={placement}
          variant={variant}
          color={color}
          width={width}
          onClose={handleClose}
          ref={dropdownRef}
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
