import { createContext, MutableRefObject, useContext } from 'react'

export type MenuContextType = {
  registerSubmenu: (ref: MutableRefObject<HTMLDivElement | null>) => () => void
  closeAll: () => void
}

export const MenuContext = createContext<MenuContextType | null>(null)

export const useMenuContext = () => useContext(MenuContext)
