import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'

/** useFocus hook is used for trapping focus inside componentRef El. Pass state for open state, closing fn. Optionally choose focusable for targeting specific elements. */
export const useFocus = (
  isActive: boolean,
  componentRef: MutableRefObject<HTMLElement | null>,
  selectableClasses: string[],
  onClose: () => void,
  options?: {
    portalRef?: MutableRefObject<HTMLDivElement | null>
    value?: unknown
    gridColumns?: number
    trap?: boolean
  },
) => {
  const focusIndexRef = useRef<number>(0)
  const [focusableEl, setFocusableEl] = useState<HTMLElement[]>([])
  const selectableClassesRef = useRef<string[]>(selectableClasses)

  // Focusable array actualization with index update and initial focus
  useEffect(() => {
    if (isActive) {
      const componentSelectableElList = componentRef.current
        ? Array.from(
            componentRef.current?.querySelectorAll(
              selectableClasses.join(),
            ) as NodeListOf<HTMLElement>,
          )
        : []
      const portalSelectableElList = options?.portalRef?.current
        ? Array.from(
            options?.portalRef?.current?.querySelectorAll(
              selectableClasses.join(),
            ) as NodeListOf<HTMLElement>,
          )
        : []
      const completeSelectableList = [...componentSelectableElList, ...portalSelectableElList]
      setFocusableEl(completeSelectableList)
      const selectedElList = completeSelectableList.filter(
        el => el.className.includes(' selected ') && el.role !== 'combobox',
      )
      const newIndex = completeSelectableList.indexOf(focusableEl[focusIndexRef.current])
      if (newIndex === -1) {
        focusIndexRef.current = 0
      } else if (newIndex !== 0) {
        focusIndexRef.current = newIndex
      } else if (selectedElList.length) {
        focusIndexRef.current = completeSelectableList.indexOf(selectedElList[0])
        completeSelectableList[focusIndexRef.current].focus()
      } else if (completeSelectableList[1]) {
        focusIndexRef.current = 1
        completeSelectableList[1].focus()
      } else if (completeSelectableList[0]) {
        focusIndexRef.current = 0
        completeSelectableList[0].focus()
      }
    }
  }, [isActive, componentRef, options?.portalRef, options?.value])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (
        e.code === 'ArrowDown' ||
        e.code === 'ArrowRight' ||
        (options?.trap && e.code === 'Tab')
      ) {
        e.preventDefault()
        e.stopPropagation()
        if (options?.gridColumns && e.code === 'ArrowDown') {
          const gridNextIndex =
            focusIndexRef.current + options?.gridColumns > focusableEl.length - 1
              ? 0
              : focusIndexRef.current + options?.gridColumns
          focusIndexRef.current = gridNextIndex
        } else {
          const nextIndex = (focusIndexRef.current + 1) % focusableEl.length
          focusIndexRef.current = nextIndex
        }
        focusableEl[focusIndexRef.current].focus()
      } else if (
        e.code === 'ArrowUp' ||
        e.code === 'ArrowLeft' ||
        (options?.trap && e.code === 'Tab' && e.shiftKey)
      ) {
        e.preventDefault()
        e.stopPropagation()
        if (options?.gridColumns && e.code === 'ArrowUp') {
          const gridPrevIndex =
            focusIndexRef.current - options?.gridColumns < 0
              ? focusableEl.length - 1
              : focusIndexRef.current - options?.gridColumns
          focusIndexRef.current = gridPrevIndex
        } else {
          const prevIndex =
            focusIndexRef.current === 0 ? focusableEl.length - 1 : focusIndexRef.current - 1
          focusIndexRef.current = prevIndex
        }
        focusableEl[focusIndexRef.current].focus()
      } else if (e.code === 'Home' || (e.code === 'ArrowLeft' && e.metaKey)) {
        e.preventDefault()
        e.stopPropagation()
        focusIndexRef.current = 0
        focusableEl[focusIndexRef.current].focus()
      } else if (e.code === 'End' || (e.code === 'ArrowRight' && e.metaKey)) {
        e.preventDefault()
        e.stopPropagation()
        focusIndexRef.current = focusableEl.length - 1
        focusableEl[focusIndexRef.current].focus()
      } else if (e.code === 'Space') {
        e.stopPropagation()
      } else if (e.code === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        focusableEl[0].focus()
        onClose()
      }
    },
    [onClose, focusableEl, options],
  )

  useEffect(() => {
    if (componentRef.current && isActive) {
      const wrap = componentRef.current
      wrap?.addEventListener('keydown', handleKeyDown)
      return () => {
        wrap?.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isActive, handleKeyDown, onClose, componentRef])

  return {
    focusableEl: focusableEl,
    focusIndexRef: focusIndexRef,
  }
}
