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

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { StyleProps } from '@/components/types'
import { useFocus } from '@/utils/hooks/useFocus'
import { cn } from '@/utils/utils'

import { Dropdown } from '../Dropdown'
import { DropdownProps } from '../Dropdown/Dropdown'

// fix menucheckbox gap
// open sebmenu on hover

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
  /** Parent ref of controled anchor button */
  parentRef?: MutableRefObject<HTMLDivElement | null>
  /** for passing aditional props to combobox */
  buttonProps?: Partial<ButtonProps>
  /** for passing aditional props to dropdown */
  dropdownProps?: Partial<DropdownProps>
  /** optional setIsOpen function, if set, menu becomes controlled component */
  setIsOpen?: (value: boolean) => void
}

/** Menu is dropdown popover for displaying additional settings. Uncontroled by default or controled with isOpen and onClose props. Should contain somponents with role menuitem. Button and Dropdown props supported. USE CLIENT */
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
      buttonProps = { children: 'MenuButton' },
      dropdownProps,
      setIsOpen,
      children,
    },
    ref,
  ) => {
    const componentRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => componentRef.current!)
    const [isInternallyOpen, setIsInternallyOpen] = useState(Boolean(isOpen))
    const openState = setIsOpen ? Boolean(isOpen) : isInternallyOpen
    const menuPosition = !setIsOpen ? 'relative' : ''
    const { focusableEl } = useFocus(
      openState,
      componentRef,
      ['button:not(.Overlay)', '[href]', 'input', '[tabindex]:not([tabindex="-1"])'],
      setIsOpen ? () => setIsOpen(!isOpen) : () => setIsInternallyOpen(prev => !prev),
      {
        portalRef: dropdownRef,
      },
    )

    const handleOpenState = useCallback(() => {
      if (setIsOpen) {
        setIsOpen(!isOpen)
      } else {
        setIsInternallyOpen(prev => !prev)
      }
      if (focusableEl[0] && openState) {
        focusableEl[0].focus()
      }
    }, [openState, isOpen, focusableEl, setIsOpen])

    return (
      <div
        className={cn('MenuWrap', menuPosition, className)}
        ref={componentRef}
        data-testid="MenuWrap"
      >
        {!setIsOpen && (
          <Button
            variant={variant}
            color={color}
            aria-expanded={openState}
            aria-haspopup="menu"
            aria-controls={name}
            aria-owns={name}
            onClick={handleOpenState}
            {...buttonProps}
          />
        )}
        <Dropdown
          isOpen={openState}
          parentRef={parentRef || componentRef}
          placement={placement}
          variant={variant}
          color={color}
          width={width}
          onClose={handleOpenState}
          ref={dropdownRef}
          {...dropdownProps}
        >
          <ul id={name} role="menu" aria-hidden={!openState}>
            {children}
          </ul>
        </Dropdown>
      </div>
    )
  },
)

Menu.displayName = 'Menu'
