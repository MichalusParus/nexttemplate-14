import { useEffect, useRef } from 'react'

/** useFocusTrap hook is used for trapping focus inside componentRef El. Pass state for open state, closing fn. Optionally choose focusable for targeting specific elements. */
export const useFocusTrap = (
  isActive: boolean,
  onClose: () => void,
  focusable: string[] = ['[tabindex]:not([tabindex="-1"])'],
) => {
  const componentRef = useRef<HTMLDivElement | null>(null)
  const startRef = useRef<HTMLButtonElement | null>(null)
  const focusIndexRef = useRef<number>(0)
  const focusableElRef = useRef<HTMLElement[]>([])

  // onKeyDown listerer and keys handling
  useEffect(() => {
    if (componentRef.current && isActive && startRef.current) {
      const onKeyDown = (e: KeyboardEvent) => {
        if (focusableElRef.current.length) {
          if (
            e.code === 'ArrowDown' ||
            (e.code === 'ArrowRight' && !e.metaKey) ||
            (e.code === 'Tab' && !e.shiftKey)
          ) {
            e.preventDefault()
            if (focusIndexRef.current + 1 === focusableElRef.current.length) {
              focusableElRef.current[0].focus()
              focusIndexRef.current = 0
            } else {
              focusableElRef.current[focusIndexRef.current + 1].focus()
              focusIndexRef.current++
            }
          } else if (
            e.code === 'ArrowUp' ||
            (e.code === 'ArrowLeft' && !e.metaKey) ||
            (e.code === 'Tab' && e.shiftKey)
          ) {
            e.preventDefault()
            if (focusIndexRef.current == 0) {
              focusableElRef.current[focusableElRef.current.length - 1].focus()
              focusIndexRef.current = focusableElRef.current.length - 1
            } else {
              focusableElRef.current[focusIndexRef.current - 1].focus()
              focusIndexRef.current--
            }
          } else if (e.code === 'Home' || (e.code === 'ArrowLeft' && e.metaKey)) {
            e.preventDefault()
            focusableElRef.current[0].focus()
            focusIndexRef.current = 0
          } else if (e.code === 'End' || (e.code === 'ArrowRight' && e.metaKey)) {
            e.preventDefault()
            focusableElRef.current[focusableElRef.current.length - 1].focus()
            focusIndexRef.current = focusableElRef.current.length - 1
          } else if (e.code === 'Escape' && startRef.current) {
            e.preventDefault()
            startRef.current.focus()
            onClose()
          }
        }
      }
      window.addEventListener('keydown', onKeyDown)
      return () => {
        window.removeEventListener('keydown', onKeyDown)
      }
    }
  }, [isActive, componentRef, onClose])

  // Autofocus to first element with class selected on open state
  useEffect(() => {
    if (isActive) {
      startRef.current = document.activeElement as HTMLButtonElement
      const focusableSelectedEl = componentRef.current?.querySelectorAll(
        '.selected.Option',
      ) as NodeListOf<HTMLElement>
      if (focusableSelectedEl.length) {
        focusableSelectedEl[0].focus()
        focusIndexRef.current = focusableElRef.current.indexOf(focusableSelectedEl[0])
      } else {
        focusIndexRef.current = 0
      }
    }
  }, [isActive])

  // Focusable array actualization with index update
  useEffect(() => {
    const focusableArr = componentRef.current?.querySelectorAll(
      focusable.join(),
    ) as NodeListOf<HTMLElement>
    focusableElRef.current = [startRef.current!, ...focusableArr]
    const newIndex = focusableElRef.current.indexOf(document.activeElement as HTMLButtonElement)
    focusIndexRef.current = newIndex
  }, [focusable])

  return {
    componentRef: componentRef,
    startRef: startRef,
  }
}
