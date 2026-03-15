import { MutableRefObject, useMemo } from 'react'

import { CustomKeyHandler, FOCUS_SELECTORS, useFocus } from '@/components/utils/hooks/useFocus'

type UseAutocompleteFocusOptions = {
  isOpen: boolean
  componentRef: MutableRefObject<HTMLDivElement | null>
  inputRef: MutableRefObject<HTMLInputElement | null>
  portalEl: HTMLDivElement | null
  value?: unknown
  onToggle: (open: boolean) => void
  onInputChange: (value: string) => void
}

export const useAutocompleteFocus = ({
  isOpen,
  componentRef,
  inputRef,
  portalEl,
  onToggle,
  value,
  onInputChange,
}: UseAutocompleteFocusOptions) => {
  const customKeyHandlers = useMemo<Record<string, CustomKeyHandler>>(
    () => ({
      ArrowDown: (e: KeyboardEvent) => {
        if (!isOpen) {
          e.preventDefault()
          e.stopPropagation()
          onToggle(true)
          return true
        }
        return false
      },
      // ArrowLeft: Enter chip nav only when cursor at position 0 and dropdown closed
      ArrowLeft: (e, { focusableEl, focusElement }) => {
        if (document.activeElement === inputRef.current) {
          if (inputRef.current?.selectionStart === 0 && inputRef.current?.selectionEnd === 0 && !isOpen) {
            e.preventDefault()
            focusElement(focusableEl.length - 1)
          }
          return true
        }
        return false
      },
      // ArrowRight: On input, let browser move cursor. On chip, let useFocus wrap to trigger.
      ArrowRight: () => {
        if (document.activeElement === inputRef.current) {
          return true
        }
        return false
      },
    }),
    [isOpen, onToggle, inputRef],
  )

  useFocus(isOpen, componentRef, {
    triggerRef: inputRef,
    selectors: FOCUS_SELECTORS.autocomplete,
    portalEl,
    onToggle,
    value,
    keyHandlers: customKeyHandlers,
    scope: true,
    triggerNav: true,
    scopeType: 'dropdown',
    onPrintableKey: (e) => {
      if (inputRef.current && document.activeElement !== inputRef.current) {
        e.preventDefault()
        inputRef.current.focus()
        const newValue = inputRef.current.value + e.key
        inputRef.current.value = newValue
        onInputChange(newValue.trimStart())
        return true
      }
      return false
    },
  })
}
