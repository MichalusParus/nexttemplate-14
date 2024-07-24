import { useCallback, useEffect, useRef } from 'react'

/** useFocusTrap hook is used for trapping focus inside componentRef El. Pass state for open state, closing fn. Optionally choose focusable for targeting specific elements. */
export const useFocusTrap = (
  isActive: boolean,
  onClose: () => void,
  options?: {
    focusable?: string[]
    focusSelected?: string
  },
) => {
  const componentRef = useRef<HTMLDivElement | null>(null)
  const startRef = useRef<HTMLElement | null>(null)
  const focusIndexRef = useRef<number>(0)
  const focusableElRef = useRef<HTMLElement[]>([])

  // Autofocus to first element with class selected on open state and startRef update
  useEffect(() => {
    startRef.current = document.activeElement as HTMLElement
    if (isActive && options?.focusSelected) {
      const focusableSelectedEl = componentRef.current?.querySelectorAll(
        options.focusSelected,
      ) as NodeListOf<HTMLElement>
      if (focusableSelectedEl.length) {
        focusableSelectedEl[0].focus()
        focusIndexRef.current = focusableElRef.current.indexOf(focusableSelectedEl[0])
      } else {
        focusIndexRef.current = 1
        focusableElRef.current[1]
          ? focusableElRef.current[1].focus()
          : focusableElRef.current[0].focus()
      }
    } else if (isActive && focusableElRef.current[0]) {
      focusableElRef.current[1]
        ? focusableElRef.current[1].focus()
        : focusableElRef.current[0].focus()
      focusIndexRef.current = 1
    }
  }, [isActive, options?.focusSelected])

  // onKeyDown listerer and keys handling
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (focusableElRef.current.length) {
        if (
          e.code === 'ArrowDown' ||
          (e.code === 'ArrowRight' && !e.metaKey) ||
          (e.code === 'Tab' && !e.shiftKey)
        ) {
          e.preventDefault()
          e.stopPropagation()
          if (focusIndexRef.current + 1 === focusableElRef.current.length) {
            focusIndexRef.current = 0
            focusableElRef.current[0].focus()
          } else {
            focusIndexRef.current = focusIndexRef.current + 1
            focusableElRef.current[focusIndexRef.current].focus()
          }
        } else if (
          e.code === 'ArrowUp' ||
          (e.code === 'ArrowLeft' && !e.metaKey) ||
          (e.code === 'Tab' && e.shiftKey)
        ) {
          e.preventDefault()
          e.stopPropagation()
          if (focusIndexRef.current == 0) {
            focusIndexRef.current = focusableElRef.current.length - 1
            focusableElRef.current[focusIndexRef.current].focus()
          } else {
            focusIndexRef.current = focusIndexRef.current - 1
            focusableElRef.current[focusIndexRef.current].focus()
          }
        } else if (e.code === 'Home' || (e.code === 'ArrowLeft' && e.metaKey)) {
          e.preventDefault()
          e.stopPropagation()
          focusableElRef.current[0].focus()
          focusIndexRef.current = 0
        } else if (e.code === 'End' || (e.code === 'ArrowRight' && e.metaKey)) {
          e.preventDefault()
          e.stopPropagation()
          focusableElRef.current[focusableElRef.current.length - 1].focus()
          focusIndexRef.current = focusableElRef.current.length - 1
        } else if (e.code === 'Escape' && startRef.current) {
          e.preventDefault()
          e.stopPropagation()
          startRef.current.focus()
          onClose()
        }
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (componentRef.current && isActive && startRef.current) {
      window.addEventListener('keydown', onKeyDown)
      return () => {
        window.removeEventListener('keydown', onKeyDown)
      }
    }
  }, [isActive, componentRef, onKeyDown, onClose])

  // Focusable array actualization with index update
  useEffect(() => {
    const focusable = options?.focusable || ['[tabindex]:not([tabindex="-1"])']
    const focusableArr = componentRef.current?.querySelectorAll(
      focusable.join(),
    ) as NodeListOf<HTMLElement>
    focusableElRef.current = [startRef.current!, ...focusableArr]
    const newIndex = focusableElRef.current.indexOf(document.activeElement as HTMLButtonElement)
    focusIndexRef.current = newIndex
  }, [options?.focusable])

  return {
    componentRef: componentRef,
    startRef: startRef,
  }
}
