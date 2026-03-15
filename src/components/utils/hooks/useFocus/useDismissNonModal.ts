import { MutableRefObject, useCallback, useEffect } from 'react'

import { isInside } from './utils'

/**
 * Non-modal dismiss behavior: closes on outside click/touch/focusout.
 * Checks against container, portal, and optional submenu refs.
 */
export const useDismissNonModal = (
  isOpen: boolean,
  containerRef: MutableRefObject<HTMLElement | null>,
  portalEl: HTMLElement | null | undefined,
  onClose: () => void,
  submenuRefs?: () => (HTMLElement | null)[],
) => {
  const handleClickOutside = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null
      const refs = submenuRefs?.()
      const containers = [containerRef.current, portalEl, ...(refs ?? [])]

      if (!isInside(target, containers)) {
        onClose()
      }
    },
    [portalEl, containerRef, onClose, submenuRefs],
  )

  const handleFocusOut = useCallback(
    (e: Event) => {
      const focusEvent = e as FocusEvent
      const target = focusEvent.relatedTarget as HTMLElement | null

      if (!target) return

      const refs = submenuRefs?.()
      const containers = [containerRef.current, portalEl, ...(refs ?? [])]

      if (!isInside(target, containers)) {
        onClose()
      }
    },
    [portalEl, containerRef, onClose, submenuRefs],
  )

  useEffect(() => {
    if (!isOpen) return

    const controller = new AbortController()
    const signal = controller.signal

    document.addEventListener('mousedown', handleClickOutside, { signal })
    document.addEventListener('touchstart', handleClickOutside, { signal })

    const parentElement = containerRef.current
    const popoverElement = portalEl
    if (parentElement) {
      parentElement.addEventListener('focusout', handleFocusOut, { signal })
    }
    if (popoverElement) {
      popoverElement.addEventListener('focusout', handleFocusOut, { signal })
    }
    return () => controller.abort()
  }, [portalEl, isOpen, containerRef, onClose, handleClickOutside, handleFocusOut])
}
