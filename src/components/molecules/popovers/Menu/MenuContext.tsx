import { createContext, useContext } from 'react'

export type MenuContextType = {
  restoreFocusToItem: (itemEl: HTMLElement) => void
  registerSubmenuActivateFocus: (
    triggerEl: HTMLElement,
    activateFocus: () => void,
  ) => () => void
  activateSubmenuFocus: (triggerEl: HTMLElement) => void
  /** Close entire menu tree from root */
  closeAll?: () => void
  /** Cancel this menu's hover close timer (called by children to prevent parent closing) */
  cancelHoverClose?: () => void
  /** Notify parent that a child hover menu closed (parent may need to start its own close) */
  onChildHoverClosed?: () => void
}

export const MenuContext = createContext<MenuContextType | null>(null)

export const useMenuContext = () => useContext(MenuContext)
