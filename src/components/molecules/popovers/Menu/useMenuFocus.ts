import { MutableRefObject, useCallback, useMemo, useRef } from 'react'

import { FOCUS_SELECTORS, useFocus, UseFocusReturn } from '@/components/utils/hooks/useFocus'

import { useMenuContext } from './MenuContext'

type UseMenuFocusOptions = {
  isOpen: boolean
  isSubmenu: boolean
  onHoverOpen: boolean
  menuButtonRef: MutableRefObject<HTMLButtonElement | null>
  portalEl: HTMLDivElement | null
  handleOpen: (open: boolean) => void
}

export type UseMenuFocusReturn = {
  restoreFocusToItem: (itemEl: HTMLElement) => void
  registerSubmenuActivateFocus: (triggerEl: HTMLElement, activateFocus: () => void) => () => void
  activateSubmenuFocus: (triggerEl: HTMLElement) => void
  focusScope: UseFocusReturn['focusScope']
}

export const useMenuFocus = ({
  isOpen,
  isSubmenu,
  onHoverOpen,
  menuButtonRef,
  portalEl,
  handleOpen,
}: UseMenuFocusOptions): UseMenuFocusReturn => {
  const parentContext = useMenuContext()
  const submenuActivateFocusMap = useRef<Map<HTMLElement, () => void>>(new Map())
  const nullRef = useRef<HTMLElement | null>(null)

  const restoreFocusToItem = useCallback((itemEl: HTMLElement) => {
    requestAnimationFrame(() => {
      itemEl.focus()
    })
  }, [])

  const registerSubmenuActivateFocus = useCallback(
    (triggerEl: HTMLElement, childActivateFocus: () => void) => {
      submenuActivateFocusMap.current.set(triggerEl, childActivateFocus)
      return () => {
        submenuActivateFocusMap.current.delete(triggerEl)
      }
    },
    [],
  )

  const activateChildSubmenuFocus = useCallback((triggerEl: HTMLElement) => {
    const childActivateFocus = submenuActivateFocusMap.current.get(triggerEl)
    childActivateFocus?.()
  }, [])

  const customKeyHandlers = useMemo(() => {
    const closeSubmenuAndRestoreFocus = (e: KeyboardEvent): boolean => {
      if (isSubmenu && parentContext && menuButtonRef.current) {
        e.preventDefault()
        e.stopPropagation()
        parentContext.restoreFocusToItem(menuButtonRef.current)
        handleOpen(false)
        return true
      }
      return false
    }

    const activateSubmenuTrigger = (e: KeyboardEvent): boolean => {
      const focusedEl = document.activeElement as HTMLElement | null
      if (focusedEl && submenuActivateFocusMap.current.has(focusedEl)) {
        e.preventDefault()
        e.stopPropagation()
        focusedEl.click()
        activateChildSubmenuFocus?.(focusedEl)
        return true
      }
      return false
    }

    return {
      ArrowLeft: closeSubmenuAndRestoreFocus,
      Escape: closeSubmenuAndRestoreFocus,
      ArrowRight: activateSubmenuTrigger,
      Enter: activateSubmenuTrigger,
      Space: activateSubmenuTrigger,
    }
  }, [isSubmenu, parentContext, menuButtonRef, handleOpen, activateChildSubmenuFocus])

  const { focusScope } = useFocus(isOpen, menuButtonRef, {
    portalEl,
    selectors: FOCUS_SELECTORS.menu,
    onToggle: handleOpen,
    keyHandlers: customKeyHandlers,
    triggerRef: isSubmenu ? nullRef : menuButtonRef,
    scope: true,
    scopeType: 'dropdown',
    typeAhead: true,
    onOpen: onHoverOpen
      ? undefined
      : ({ focusableElements, focusElement }) => {
          const firstMenuItemIndex = focusableElements.findIndex(
            (el) => el.getAttribute('role')?.startsWith('menuitem'),
          )
          if (firstMenuItemIndex !== -1) {
            requestAnimationFrame(() => focusElement(firstMenuItemIndex))
          }
        },
  })

  return {
    restoreFocusToItem,
    registerSubmenuActivateFocus,
    activateSubmenuFocus: activateChildSubmenuFocus,
    focusScope,
  }
}
