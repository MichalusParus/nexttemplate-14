import { MutableRefObject, useEffect, useState } from 'react'

/**
 * Tracks focus/blur state on the trigger element (e.g., combobox input/button).
 * Enables keyboard navigation when the trigger is focused but the dropdown is closed.
 * Only loses focus state when focus leaves both container and portal.
 */
export const useTriggerFocus = (
  triggerRef: MutableRefObject<HTMLElement | null>,
  containerRef: MutableRefObject<HTMLElement | null>,
  portalEl: HTMLElement | null | undefined,
  enabled: boolean,
): boolean => {
  const [hasTriggerFocus, setHasTriggerFocus] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const trigger = triggerRef.current
    if (!trigger) return

    const handleFocus = () => setHasTriggerFocus(true)
    const handleBlur = (e: FocusEvent) => {
      const container = containerRef.current
      const relatedTarget = e.relatedTarget as Node | null

      const stillInContainer = container?.contains(relatedTarget)
      const stillInPortal = portalEl?.contains(relatedTarget)

      if (!stillInContainer && !stillInPortal) {
        setHasTriggerFocus(false)
      }
    }

    trigger.addEventListener('focus', handleFocus)
    trigger.addEventListener('blur', handleBlur)

    return () => {
      trigger.removeEventListener('focus', handleFocus)
      trigger.removeEventListener('blur', handleBlur)
    }
  }, [containerRef, triggerRef, portalEl, enabled])

  return hasTriggerFocus
}
