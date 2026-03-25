import { useCallback } from 'react'

import { FocusContext, UseKeyboardNavigationOptions } from './types'

/**
 * Keyboard event routing and default handlers.
 * Custom handlers execute first; return true to consume the event, false to fall through to defaults.
 *
 * Default handlers:
 * - Arrow Down/Up: Navigate next/prev (grid-aware with columns)
 * - Arrow Right/Left: Navigate next/prev (Cmd modifier jumps to end/start)
 * - Home/End: Jump to first/last
 * - Tab: Close dropdown (or cycle in trap mode)
 * - Escape: Close and focus trigger
 * - Printable chars: Type-ahead search or custom printable key callback
 */
export const useKeyboardNavigation = (
  options: UseKeyboardNavigationOptions,
): ((e: KeyboardEvent) => void) => {
  const {
    isActive,
    focusableElRef,
    focusIndexRef,
    preserveFocusRef,
    triggerRef,
    focusElement,
    columns,
    trap,
    onToggle,
    keyHandlers,
    typeAhead,
    triggerNav,
    onPrintableKey,
    handleTypeAhead,
  } = options

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const focusable = focusableElRef.current

      // Sync index with actual focus — handles Tab-in where focusIndexRef is stale
      const activeIndex = focusable.indexOf(document.activeElement as HTMLElement)
      if (activeIndex !== -1 && activeIndex !== focusIndexRef.current) {
        focusIndexRef.current = activeIndex
      }

      // Guard: skip navigation when a specific element is focused but isn't in our focusable list.
      // Allows navigation when focus is lost (body/null) — recovers focus to managed elements.
      // Prevents conflicts when multiple useFocus instances share the same DOM element.
      const active = document.activeElement
      const isOwnedFocus = activeIndex !== -1 || active === document.body || active === null

      const { code, metaKey, shiftKey } = e

      if (keyHandlers) {
        const handler = keyHandlers[code]
        if (handler) {
          const context: FocusContext = {
            focusableEl: focusable,
            currentIndex: focusIndexRef.current,
            focusElement,
          }
          const handled = handler(e, context)
          if (handled) return
        }
      }

      if (e.key.length === 1 && e.key !== ' ' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (typeAhead && focusable.length) {
          e.preventDefault()
          e.stopPropagation()
          const matchIndex = handleTypeAhead(e.key, focusable, focusIndexRef.current)
          if (matchIndex !== -1) {
            focusElement(matchIndex)
          }
          return
        }
        if (onPrintableKey) {
          const context: FocusContext = {
            focusableEl: focusable,
            currentIndex: focusIndexRef.current,
            focusElement,
          }
          const handled = onPrintableKey(e, context)
          if (handled) return
        }
      }

      if (code === 'ArrowDown') {
        if (triggerNav && !isActive) {
          e.preventDefault()
          e.stopPropagation()
          onToggle?.(true)
          return
        }
        if (!isOwnedFocus || !focusable.length) return
        e.preventDefault()
        e.stopPropagation()
        if (columns) {
          const gridNextIndex =
            focusIndexRef.current + columns > focusable.length - 1
              ? focusable.length - 1
              : focusIndexRef.current + columns
          focusElement(gridNextIndex)
        } else {
          const nextIndex = (focusIndexRef.current + 1) % focusable.length
          focusElement(nextIndex)
        }
        return
      }

      if (code === 'ArrowRight') {
        if (!isOwnedFocus || !focusable.length) return
        if (metaKey) {
          e.preventDefault()
          e.stopPropagation()
          focusElement(focusable.length - 1)
          return
        }
        e.preventDefault()
        e.stopPropagation()
        const nextIndex = (focusIndexRef.current + 1) % focusable.length
        focusElement(nextIndex)
        return
      }

      if (code === 'ArrowUp') {
        if (!isOwnedFocus || !focusable.length) return
        e.preventDefault()
        e.stopPropagation()
        if (columns) {
          const gridPrevIndex =
            focusIndexRef.current - columns < 0
              ? 0
              : focusIndexRef.current - columns
          focusElement(gridPrevIndex)
        } else {
          const prevIndex =
            focusIndexRef.current === 0 ? focusable.length - 1 : focusIndexRef.current - 1
          focusElement(prevIndex)
        }
        return
      }

      if (code === 'ArrowLeft') {
        if (!isOwnedFocus || !focusable.length) return
        if (metaKey) {
          e.preventDefault()
          e.stopPropagation()
          focusElement(0)
          return
        }
        e.preventDefault()
        e.stopPropagation()
        const prevIndex =
          focusIndexRef.current === 0 ? focusable.length - 1 : focusIndexRef.current - 1
        focusElement(prevIndex)
        return
      }

      if (code === 'Home') {
        if (!isOwnedFocus || !focusable.length) return
        e.preventDefault()
        e.stopPropagation()
        focusElement(0)
        return
      }

      if (code === 'End') {
        if (!isOwnedFocus || !focusable.length) return
        e.preventDefault()
        e.stopPropagation()
        focusElement(focusable.length - 1)
        return
      }

      if (code === 'Tab') {
        if (trap && focusable.length) {
          e.preventDefault()
          e.stopPropagation()
          if (shiftKey) {
            const prevIndex =
              focusIndexRef.current === 0 ? focusable.length - 1 : focusIndexRef.current - 1
            focusElement(prevIndex)
          } else {
            const nextIndex = (focusIndexRef.current + 1) % focusable.length
            focusElement(nextIndex)
          }
          return
        }
        if (isActive) {
          preserveFocusRef.current = null
          triggerRef.current?.focus()
          onToggle?.(false)
        }
        return
      }

      if (code === 'Escape') {
        if (!isActive) return
        e.preventDefault()
        e.stopPropagation()
        preserveFocusRef.current = null
        triggerRef.current?.focus()
        onToggle?.(false)
        return
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isActive, trap, columns, onToggle, keyHandlers, typeAhead, triggerNav, onPrintableKey, focusElement, handleTypeAhead],
  )

  return handleKeyDown
}
