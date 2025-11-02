import { MutableRefObject, useCallback, useEffect } from 'react'

export const useNonModalDropdown = (
  isOpen: boolean,
  anchorRef: MutableRefObject<HTMLElement | null>,
  popoverEl: HTMLDivElement | null,
  modal: boolean,
  onClose: () => void,
  submenuRefs?: () => (HTMLElement | null)[],
) => {
  const handleClickOutside = useCallback(
    (e: MouseEvent | TouchEvent | FocusEvent) => {
      const target = e.target as HTMLElement | null
      const refs = submenuRefs?.()
      const isInsideAnchorRef = anchorRef.current?.contains(target)
      const isInsidePopoverEl = popoverEl?.contains(target)
      const isInsideSubmenuRefs = refs?.some(ref => ref && ref.contains(target))

      if (!isInsideAnchorRef && !isInsidePopoverEl && !isInsideSubmenuRefs) {
        onClose()
      }
    },
    [popoverEl, anchorRef, onClose, submenuRefs],
  )

  const handleFocusOut = useCallback(
    (e: Event) => {
      const focusEvent = e as FocusEvent
      const target = focusEvent.relatedTarget as HTMLElement | null
      const refs = submenuRefs?.()
      const isInsideAnchorRef = anchorRef.current?.contains(target)
      const isInsidePopoverEl = popoverEl?.contains(target)
      const isInsideSubmenuRefs = refs?.some(ref => ref && ref.contains(target))

      if (!isInsideAnchorRef && !isInsidePopoverEl && !isInsideSubmenuRefs) {
        onClose()
      }
    },
    [popoverEl, anchorRef, onClose, submenuRefs],
  )

  useEffect(() => {
    if (isOpen && !modal) {
      const controller = new AbortController()
      const signal = controller.signal

      document.addEventListener('mousedown', handleClickOutside, { signal })
      document.addEventListener('touchstart', handleClickOutside, { signal })

      const parentElement = anchorRef.current
      const popoverElement = popoverEl
      if (parentElement) {
        parentElement.addEventListener('focusout', handleFocusOut, { signal })
      }
      if (popoverElement) {
        popoverElement.addEventListener('focusout', handleFocusOut, { signal })
      }
      return () => controller.abort()
    }
  }, [popoverEl, modal, isOpen, anchorRef, onClose, handleClickOutside, handleFocusOut])

  return {}
}
