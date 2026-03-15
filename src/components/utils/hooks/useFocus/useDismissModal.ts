import { useEffect, useRef } from 'react'

/**
 * Modal dismiss behavior: captures active element on open, restores focus on close.
 * Auto-focuses first focusable element on open via onOpen integration in useFocus.
 */
export const useDismissModal = (isOpen: boolean) => {
  const activeElementRef = useRef<HTMLElement | null>(null)
  const prevIsOpenRef = useRef<boolean>(false)

  useEffect(() => {
    if (isOpen && !prevIsOpenRef.current) {
      const activeEl = document.activeElement as HTMLElement
      if (activeEl && activeEl !== document.body) {
        activeElementRef.current = activeEl
      }
    }

    if (!isOpen && prevIsOpenRef.current && activeElementRef.current) {
      requestAnimationFrame(() => {
        activeElementRef.current?.focus()
        activeElementRef.current = null
      })
    }

    prevIsOpenRef.current = isOpen
  }, [isOpen])
}
