'use client'
import { Placement } from '@popperjs/core'
import {
  forwardRef,
  MutableRefObject,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { useInternalOpenState } from '@/components/utils/hooks/useInternalOpenState'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { Dropdown } from '../Dropdown'
import { DropdownProps } from '../Dropdown/Dropdown'
import { MenuContext, useMenuContext } from './MenuContext'
import { MenuList } from './MenuList'
import { MenuOptionGroupType, MenuOptionType } from './types'
import { useMenuFocus } from './useMenuFocus'
import { useMenuHover } from './useMenuHover'

export type MenuProps = StyleProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** Unique name for id when external control is used, otherwise id is generated */
  name?: string
  /** title for uncontrolled menu button */
  title?: ReactNode
  /** optional menu options for rendering menuitems without children */
  options?: MenuOptionType[] | MenuOptionGroupType[]
  /** optional isOpen state for external state control, must be use with setIsOpen prop, or for setting default open state */
  isOpen?: boolean
  /** position of dropdown */
  placement?: Placement
  /** for setting dropdown width as inline css style */
  width?: number | string
  /** Optional boolean for diabling modal behavior, default true, use only on simple menus with no submenus */
  isModal?: boolean
  /** Enable opening menu on hover/focus instead of click, mainly for submenus, for main menu with isModal=false */
  onHoverOpen?: boolean
  /** Anchor ref of controlled anchor button */
  anchorRef?: MutableRefObject<HTMLDivElement | null>
  /** for passing additional props to combobox */
  buttonProps?: Partial<ButtonProps>
  /** for passing additional props to dropdown */
  dropdownProps?: Partial<DropdownProps>
  /** optional setIsOpen function, if set, menu becomes controlled component */
  setIsOpen?: (value: boolean) => void
}

/** Menu is dropdown popover for displaying menuitems. Uncontrolled by default or controlled with isOpen and onClose props. Button and Dropdown props supported. USE CLIENT */
export const Menu = forwardRef<HTMLDivElement | null, PropsWithChildren<MenuProps>>(
  (
    {
      className,
      name,
      title,
      options,
      isOpen,
      placement = 'bottom-start',
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      width,
      isModal = true,
      onHoverOpen = false,
      anchorRef,
      buttonProps = {},
      dropdownProps,
      setIsOpen,
      children,
    },
    ref,
  ) => {
    const id = useId().replace(/:/g, '')
    const nameId = name || id
    const nameIdMenu = `${nameId}-menu`
    const menuButtonRef = useRef<HTMLButtonElement>(null)
    const [dropdownEl, setDropdownEl] = useState<HTMLDivElement | null>(null)
    const { openState, handleOpen } = useInternalOpenState(isOpen, setIsOpen)
    const parentContext = useMenuContext()
    const isSubmenu = !!parentContext

    const { children: buttonChildren, className: buttonClassName, ...restButtonProps } = buttonProps

    const { hoverOpen, handleWrapMouseLeave, cancelHoverClose, onChildHoverClosed } = useMenuHover({
      onHoverOpen,
      dropdownEl,
      handleOpen,
      parentContext,
    })

    const { restoreFocusToItem, registerSubmenuActivateFocus, activateSubmenuFocus, focusScope } = useMenuFocus({
      isOpen: openState,
      isSubmenu,
      onHoverOpen,
      menuButtonRef,
      portalEl: dropdownEl,
      handleOpen,
    })

    const onDropdownClose = useCallback(() => handleOpen(false), [handleOpen])

    const closeAll = useCallback(() => {
      if (parentContext?.closeAll) {
        parentContext.closeAll()
      } else {
        focusScope?.deactivateDescendants()
        handleOpen(false)
      }
    }, [parentContext, focusScope, handleOpen])

    const contextValue = useMemo(
      () => ({
        restoreFocusToItem,
        registerSubmenuActivateFocus,
        activateSubmenuFocus,
        closeAll,
        ...(onHoverOpen && {
          cancelHoverClose,
          onChildHoverClosed,
        }),
      }),
      [restoreFocusToItem, registerSubmenuActivateFocus, activateSubmenuFocus, closeAll, onHoverOpen, cancelHoverClose, onChildHoverClosed],
    )

    return (
      <MenuContext.Provider value={contextValue}>
        <div
          className={cn('MenuWrap', className)}
          onMouseEnter={onHoverOpen ? hoverOpen : undefined}
          onMouseLeave={onHoverOpen ? handleWrapMouseLeave : undefined}
          data-testid="MenuWrap"
          ref={el => {
            if (typeof ref === 'function') ref(el)
            else if (ref) ref.current = el
          }}
        >
          {!setIsOpen && (
            <Button
              id={`${nameId}-button`}
              className={cn('MenuButton', openState && 'selected z-combobox', buttonClassName)}
              variant={variant}
              color={color}
              size={size}
              aria-expanded={openState}
              aria-haspopup="menu"
              aria-controls={nameIdMenu}
              aria-owns={nameIdMenu}
              onClick={
                onHoverOpen
                  ? undefined
                  : e => {
                      e?.stopPropagation()
                      handleOpen(!openState)
                    }
              }
              onFocus={onHoverOpen ? () => handleOpen(true) : undefined}
              data-testid="MenuButton"
              ref={menuButtonRef}
              {...restButtonProps}
            >
              {title || buttonChildren || ''}
            </Button>
          )}
          <Dropdown
            isOpen={openState}
            anchorRef={anchorRef || menuButtonRef}
            placement={placement}
            variant={variant}
            color={color}
            width={width}
            modal={isModal && !isSubmenu}
            submenuRefs={focusScope?.getDescendantElements}
            onClose={onDropdownClose}
            ref={setDropdownEl}
            {...dropdownProps}
          >
            <MenuList
              name={nameIdMenu}
              options={options || []}
              variant={variant}
              color={color}
              size={size}
              onCloseAll={closeAll}
            >
              {children}
            </MenuList>
          </Dropdown>
        </div>
      </MenuContext.Provider>
    )
  },
)

Menu.displayName = 'Menu'
