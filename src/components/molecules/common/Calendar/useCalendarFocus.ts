import { addMonths, addWeeks, addYears, getDate } from 'date-fns'
import { MutableRefObject, useEffect, useMemo, useRef } from 'react'

import { CustomKeyHandler, FOCUS_SELECTORS, useFocus } from '@/components/utils/hooks/useFocus'

import type { CalendarState, CalendarView } from './types'

type UseCalendarFocusOptions = {
  /** Enables keyboard navigation and roving tabindex */
  isActive: boolean
  /** Focus selected cell on mount — used by DatePicker when dropdown opens */
  focusOnOpen?: boolean
  /** Reference to the grid container element */
  gridRef: MutableRefObject<HTMLDivElement | null>
  /** Current calendar view state */
  calendarState: CalendarState
  /** Day grid layout: full month (default) or single week */
  view?: CalendarView
  /** Current month being displayed */
  currentMonth: Date
  /** Callback to change the displayed month */
  setCurrentMonth: (date: Date) => void
  /** Callback to close the dropdown (for Escape key) */
  onClose?: () => void
}

type PendingFocus = {
  row: 'first' | 'last' | 'sameDay'
  column: number
  /** Day-of-month to match for 'sameDay' row (PageDown/PageUp) */
  dayOfMonth?: number
}

/** Custom hook for Calendar keyboard navigation using ARIA grid pattern with roving tabindex */
export const useCalendarFocus = ({
  isActive,
  focusOnOpen,
  gridRef,
  calendarState,
  view = 'day',
  currentMonth,
  setCurrentMonth,
  onClose,
}: UseCalendarFocusOptions) => {
  const pendingFocusRef = useRef<PendingFocus | null>(null)
  const shouldFocusGridRef = useRef(false)
  const calendarStateRef = useRef(calendarState)
  calendarStateRef.current = calendarState
  const viewRef = useRef(view)
  viewRef.current = view

  // Ref for currentMonth — handlers read this to avoid stale closures during fast key repeat
  const currentMonthRef = useRef(currentMonth)
  currentMonthRef.current = currentMonth

  // Dummy ref — prevents useFocus from attaching focus/blur listeners on gridRef
  const dummyRef = useRef<HTMLElement>(null)

  const getGridCols = () => {
    const v = viewRef.current
    if (v === 'month') return 3
    if (v === 'year') return 5
    return calendarStateRef.current === 'days' ? 7 : calendarStateRef.current === 'months' ? 3 : 5
  }

  const allowsBoundaryCrossing = () => {
    const v = viewRef.current
    if (v === 'week' || v === 'month') return true
    if (v === 'year') return false
    return calendarStateRef.current === 'days'
  }

  const customKeyHandlers = useMemo<{ [key: string]: CustomKeyHandler }>(() => {
    const clickCell: CustomKeyHandler = (e, { focusableEl, currentIndex }) => {
      const cell = focusableEl[currentIndex]
      if (!cell) return false
      e.preventDefault()
      e.stopPropagation()
      if (cell.getAttribute('aria-disabled') !== 'true') cell.click()
      return true
    }

    const stepRange = (direction: 1 | -1) => {
      switch (viewRef.current) {
        case 'week':
          return addWeeks(currentMonthRef.current, direction)
        case 'month':
          return addYears(currentMonthRef.current, direction)
        default:
          return addMonths(currentMonthRef.current, direction)
      }
    }

    const pageNav =
      (direction: 1 | -1): CustomKeyHandler =>
      (e, { focusableEl, currentIndex }) => {
        if (viewRef.current !== 'day' || calendarStateRef.current !== 'days') return false
        e.preventDefault()
        e.stopPropagation()
        const cell = focusableEl[currentIndex]
        const dateStr = cell?.getAttribute('data-date')
        const dayOfMonth = dateStr ? getDate(new Date(dateStr)) : 1
        pendingFocusRef.current = { row: 'sameDay', column: currentIndex % 7, dayOfMonth }
        const navFn = e.shiftKey ? addYears : addMonths
        setCurrentMonth(navFn(currentMonthRef.current, direction))
        return true
      }

    return {
      ArrowDown: (e, { focusableEl, currentIndex, focusElement }) => {
        if (!focusableEl.length) return false
        e.preventDefault()
        e.stopPropagation()

        const cols = getGridCols()
        const nextIndex = currentIndex + cols
        if (nextIndex < focusableEl.length) {
          focusElement(nextIndex)
        } else if (allowsBoundaryCrossing()) {
          pendingFocusRef.current = { row: 'first', column: currentIndex % cols }
          setCurrentMonth(stepRange(1))
        }
        return true
      },

      ArrowUp: (e, { focusableEl, currentIndex, focusElement }) => {
        if (!focusableEl.length) return false
        e.preventDefault()
        e.stopPropagation()

        const cols = getGridCols()
        const prevIndex = currentIndex - cols
        if (prevIndex >= 0) {
          focusElement(prevIndex)
        } else if (allowsBoundaryCrossing()) {
          pendingFocusRef.current = { row: 'last', column: currentIndex % cols }
          setCurrentMonth(stepRange(-1))
        }
        return true
      },

      ArrowRight: (e, { focusableEl, currentIndex, focusElement }) => {
        if (!focusableEl.length) return false
        e.preventDefault()
        e.stopPropagation()

        const nextIndex = currentIndex + 1
        if (nextIndex < focusableEl.length) {
          focusElement(nextIndex)
        } else if (allowsBoundaryCrossing()) {
          pendingFocusRef.current = { row: 'first', column: 0 }
          setCurrentMonth(stepRange(1))
        }
        return true
      },

      ArrowLeft: (e, { focusableEl, currentIndex, focusElement }) => {
        if (!focusableEl.length) return false
        e.preventDefault()
        e.stopPropagation()

        const prevIndex = currentIndex - 1
        if (prevIndex >= 0) {
          focusElement(prevIndex)
        } else if (allowsBoundaryCrossing()) {
          pendingFocusRef.current = { row: 'last', column: getGridCols() - 1 }
          setCurrentMonth(stepRange(-1))
        }
        return true
      },

      PageDown: pageNav(1),
      PageUp: pageNav(-1),

      Home: (e, { currentIndex, focusElement }) => {
        e.preventDefault()
        e.stopPropagation()
        const cols = getGridCols()
        const rowStart = Math.floor(currentIndex / cols) * cols
        focusElement(rowStart)
        return true
      },

      End: (e, { focusableEl, currentIndex, focusElement }) => {
        e.preventDefault()
        e.stopPropagation()
        const cols = getGridCols()
        const rowStart = Math.floor(currentIndex / cols) * cols
        const rowEnd = Math.min(rowStart + cols - 1, focusableEl.length - 1)
        focusElement(rowEnd)
        return true
      },

      Enter: clickCell,
      Space: clickCell,

      Tab: e => {
        if (onClose) {
          e.preventDefault()
          e.stopPropagation()
          if (e.shiftKey) {
            onClose()
          } else {
            const calendar = gridRef.current?.closest('.Calendar')
            const monthSelect = calendar?.querySelector('button.MonthSelect') as HTMLElement
            if (monthSelect) {
              monthSelect.focus()
            } else {
              onClose()
            }
          }
        }
        return true
      },

      Escape: e => {
        e.preventDefault()
        e.stopPropagation()
        onClose?.()
        return true
      },
    }
  }, [gridRef, setCurrentMonth, onClose])

  const { focusElement } = useFocus(isActive, gridRef, {
    triggerRef: dummyRef,
    selectors: FOCUS_SELECTORS.grid,
    keyHandlers: customKeyHandlers,
    rovingTabindex: true,
    value: `${calendarState}-${currentMonth.getTime()}`,
  })

  useEffect(() => {
    if (isActive && focusOnOpen) shouldFocusGridRef.current = true
  }, [isActive, focusOnOpen])

  const prevCalendarStateRef = useRef(calendarState)
  useEffect(() => {
    if (isActive && prevCalendarStateRef.current !== calendarState) {
      shouldFocusGridRef.current = true
    }
    prevCalendarStateRef.current = calendarState
  }, [calendarState, isActive])

  useEffect(() => {
    if (!isActive || !gridRef.current) return

    const cells = Array.from(
      gridRef.current.querySelectorAll(FOCUS_SELECTORS.grid.join(',')) as NodeListOf<HTMLElement>,
    )
    if (cells.length === 0) return

    let targetIndex: number

    if (pendingFocusRef.current) {
      const cols = getGridCols()
      const { row, column, dayOfMonth } = pendingFocusRef.current
      if (row === 'first') {
        targetIndex = column
      } else if (row === 'last') {
        targetIndex = cells.length - cols + column
      } else {
        const isCurrentMonth = (dateStr: string) => {
          const d = new Date(dateStr)
          return (
            d.getMonth() === currentMonth.getMonth() &&
            d.getFullYear() === currentMonth.getFullYear()
          )
        }
        const matchIndex = dayOfMonth
          ? cells.findIndex(el => {
              const d = el.getAttribute('data-date')
              return d && getDate(new Date(d)) === dayOfMonth && isCurrentMonth(d)
            })
          : -1
        targetIndex = matchIndex !== -1 ? matchIndex : Math.min(column, cells.length - 1)
      }
      targetIndex = Math.max(0, Math.min(targetIndex, cells.length - 1))
    } else {
      const selectedIndex = cells.findIndex(el => el.getAttribute('aria-selected') === 'true')
      const currentIndex = cells.findIndex(el => el.getAttribute('aria-current') === 'date')
      targetIndex = selectedIndex !== -1 ? selectedIndex : currentIndex !== -1 ? currentIndex : 0
    }

    if (pendingFocusRef.current || shouldFocusGridRef.current) {
      focusElement(targetIndex)
      pendingFocusRef.current = null
      shouldFocusGridRef.current = false
    } else {
      cells.forEach((el, i) => el.setAttribute('tabindex', i === targetIndex ? '0' : '-1'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarState, isActive, currentMonth])

  useEffect(() => {
    const calendar = gridRef.current?.closest('.Calendar') as HTMLElement
    if (!calendar || !isActive) return

    const handleHeaderKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (gridRef.current?.contains(target)) return

      const header = calendar.querySelector('.CalendarHeader')
      if (!header?.contains(target)) return

      const headerButtons = Array.from(
        header.querySelectorAll('button:not([disabled])'),
      ) as HTMLElement[]
      const idx = headerButtons.indexOf(target)
      if (idx === -1) return

      const focusGrid = () => {
        const gridCell = gridRef.current?.querySelector('[tabindex="0"]') as HTMLElement
        gridCell?.focus()
      }

      if (e.code === 'ArrowRight') {
        e.preventDefault()
        e.stopPropagation()
        if (idx < headerButtons.length - 1) {
          headerButtons[idx + 1].focus()
        } else {
          focusGrid()
        }
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault()
        e.stopPropagation()
        if (idx > 0) {
          headerButtons[idx - 1].focus()
        } else {
          focusGrid()
        }
      } else if (e.code === 'ArrowDown') {
        e.preventDefault()
        e.stopPropagation()
        focusGrid()
      } else if (e.code === 'Tab' && onClose) {
        e.preventDefault()
        e.stopPropagation()
        onClose()
      }
    }

    calendar.addEventListener('keydown', handleHeaderKeyDown)
    return () => calendar.removeEventListener('keydown', handleHeaderKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive])
}
