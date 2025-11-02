import { MutableRefObject, useCallback, useLayoutEffect, useRef } from 'react'

import { useMenuContext } from './MenuContext'

/** Hook for registering all submenus and getting all submenu refs for useNonModalDropdown hook */
export const useSubmenu = (
  dropdownRef: MutableRefObject<HTMLDivElement | null>,
  handleClose: () => void,
) => {
  const parentMenuContext = useMenuContext()
  const submenuRefsMap = useRef<Set<MutableRefObject<HTMLDivElement | null>>>(new Set())

  useLayoutEffect(() => {
    if (parentMenuContext) {
      const cleanup = parentMenuContext.registerSubmenu(dropdownRef)
      return cleanup
    }
  }, [parentMenuContext, dropdownRef])

  const registerSubmenu = useCallback((ref: MutableRefObject<HTMLDivElement | null>) => {
    submenuRefsMap.current.add(ref)

    return () => {
      submenuRefsMap.current.delete(ref)
    }
  }, [])

  const getSubmenuRefs = useCallback(() => {
    return Array.from(submenuRefsMap.current).map(ref => ref.current)
  }, [])

  const closeAll = useCallback(() => {
    if (parentMenuContext) {
      handleClose()
      setTimeout(() => {
        parentMenuContext.closeAll()
      }, 10)
    } else {
      setTimeout(() => {
        handleClose()
      }, 160)
    }
  }, [parentMenuContext, handleClose])

  return {
    registerSubmenu,
    submenuRefs: getSubmenuRefs,
    closeAll,
  }
}
