import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

import { MenuContextType } from './MenuContext'

type UseMenuHoverOptions = {
  onHoverOpen: boolean
  dropdownEl: HTMLDivElement | null
  handleOpen: (open: boolean) => void
  parentContext: MenuContextType | null
}

type UseMenuHoverReturn = {
  hoverOpen: () => void
  handleWrapMouseLeave: () => void
  cancelHoverClose: () => void
  onChildHoverClosed: () => void
}

/** Hover open/close system for onHoverOpen menus.
 * Coordinates mouseenter/mouseleave on MenuWrap and portal with parent-child via context.
 * useLayoutEffect ensures portal listeners attach before paint so first mouseenter is caught. */
export const useMenuHover = ({
  onHoverOpen,
  dropdownEl,
  handleOpen,
  parentContext,
}: UseMenuHoverOptions): UseMenuHoverReturn => {
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hoverStateRef = useRef({ wrap: false, portal: false })

  const cancelHoverClose = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
  }, [])

  const startHoverClose = useCallback(
    (delay = 150) => {
      if (hoverTimerRef.current) return
      hoverTimerRef.current = setTimeout(() => {
        hoverTimerRef.current = null
        handleOpen(false)
        parentContext?.onChildHoverClosed?.()
      }, delay)
    },
    [handleOpen, parentContext],
  )

  const hoverOpen = useCallback(() => {
    hoverStateRef.current.wrap = true
    cancelHoverClose()
    parentContext?.cancelHoverClose?.()
    handleOpen(true)
  }, [cancelHoverClose, parentContext, handleOpen])

  const handleWrapMouseLeave = useCallback(() => {
    hoverStateRef.current.wrap = false
    startHoverClose()
  }, [startHoverClose])

  // Attach mouseenter/mouseleave on the portal DOM element (rendered via createPortal).
  // useLayoutEffect ensures listeners are attached before the browser paints,
  // so the very first mouseenter on the (now correctly positioned) portal is caught.
  useLayoutEffect(() => {
    if (!onHoverOpen || !dropdownEl) return

    const handlePortalEnter = () => {
      hoverStateRef.current.portal = true
      cancelHoverClose()
      parentContext?.cancelHoverClose?.()
    }
    const handlePortalLeave = () => {
      hoverStateRef.current.portal = false
      startHoverClose()
    }

    dropdownEl.addEventListener('mouseenter', handlePortalEnter)
    dropdownEl.addEventListener('mouseleave', handlePortalLeave)

    return () => {
      dropdownEl.removeEventListener('mouseenter', handlePortalEnter)
      dropdownEl.removeEventListener('mouseleave', handlePortalLeave)
    }
  }, [onHoverOpen, dropdownEl, cancelHoverClose, startHoverClose, parentContext])

  // When a child hover menu closes, check if mouse is still over our elements
  const onChildHoverClosed = useCallback(() => {
    const { wrap, portal } = hoverStateRef.current
    if (!wrap && !portal) {
      startHoverClose(200)
    }
  }, [startHoverClose])

  // Cleanup timer on unmount
  useEffect(() => {
    return () => cancelHoverClose()
  }, [cancelHoverClose])

  return { hoverOpen, handleWrapMouseLeave, cancelHoverClose, onChildHoverClosed }
}
