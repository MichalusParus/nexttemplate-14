import { addMonths, addYears } from 'date-fns'
import { MutableRefObject, useEffect, useLayoutEffect, useMemo, useRef } from 'react'

import { CustomKeyHandler, FOCUS_SELECTORS, useFocus } from '@/components/utils/hooks/useFocus'

type UseCalendarFocusOptions = {
  /** Whether the calendar is active (dropdown is open) */
  isActive: boolean
  /** Reference to the grid container element */
  gridRef: MutableRefObject<HTMLDivElement | null>
  /** Current calendar view state */
  calendarState: 'days' | 'months' | 'years'
  /** Current month being displayed */
  currentMonth: Date
  /** Callback to change the displayed month */
  setCurrentMonth: (date: Date) => void
  /** Callback to close the dropdown (for Escape key) */
  onClose?: () => void
}

type PendingFocus = {
  row: 'first' | 'last' | 'selected'
  column: number
}

/** Custom hook for Calendar keyboard navigation using ARIA grid pattern with roving tabindex */
export const useCalendarFocus = ({
  isActive,
  gridRef,
  calendarState,
  currentMonth,
  setCurrentMonth,
  onClose,
}: UseCalendarFocusOptions) => {
  const gridColumns = calendarState === 'days' ? 7 : calendarState === 'months' ? 3 : 5
  const pendingFocusRef = useRef<PendingFocus | null>(null)
  const calendarStateRef = useRef(calendarState)
  calendarStateRef.current = calendarState

  // Ref for currentMonth — handlers read this to avoid stale closures during fast key repeat
  const currentMonthRef = useRef(currentMonth)
  currentMonthRef.current = currentMonth

  // Dummy ref — prevents useFocus from attaching focus/blur listeners on gridRef
  // (which would activate hasTriggerFocus when the grid div itself gets accidentally focused)
  const dummyRef = useRef<HTMLElement>(null)

  // Memoized custom key handlers — stabilizes identity to avoid unnecessary handleKeyDown recreation.
  // All mutable state is read via refs (currentMonthRef, calendarStateRef, pendingFocusRef).
  const customKeyHandlers = useMemo<{ [key: string]: CustomKeyHandler }>(() => ({
    // Arrow Down: Move down by row, cross month boundary for DayPicker
    ArrowDown: (e, { focusableEl, currentIndex, focusElement }) => {
      if (!focusableEl.length) return false
      e.preventDefault()
      e.stopPropagation()

      const cols = calendarStateRef.current === 'days' ? 7 : calendarStateRef.current === 'months' ? 3 : 5
      const nextIndex = currentIndex + cols
      if (nextIndex < focusableEl.length) {
        focusElement(nextIndex)
      } else if (calendarStateRef.current === 'days') {
        // Cross month boundary: go to next month, same column
        const column = currentIndex % cols
        pendingFocusRef.current = { row: 'first', column }
        setCurrentMonth(addMonths(currentMonthRef.current, 1))
      }
      // MonthPicker/YearPicker: stop at edge (do nothing)
      return true
    },

    // Arrow Up: Move up by row, cross month boundary for DayPicker
    ArrowUp: (e, { focusableEl, currentIndex, focusElement }) => {
      if (!focusableEl.length) return false
      e.preventDefault()
      e.stopPropagation()

      const cols = calendarStateRef.current === 'days' ? 7 : calendarStateRef.current === 'months' ? 3 : 5
      const prevIndex = currentIndex - cols
      if (prevIndex >= 0) {
        focusElement(prevIndex)
      } else if (calendarStateRef.current === 'days') {
        // Cross month boundary: go to prev month, same column
        const column = currentIndex % cols
        pendingFocusRef.current = { row: 'last', column }
        setCurrentMonth(addMonths(currentMonthRef.current, -1))
      }
      // MonthPicker/YearPicker: stop at edge
      return true
    },

    // Arrow Right: Move one cell, cross month boundary for DayPicker
    ArrowRight: (e, { focusableEl, currentIndex, focusElement }) => {
      if (!focusableEl.length) return false
      e.preventDefault()
      e.stopPropagation()

      const nextIndex = currentIndex + 1
      if (nextIndex < focusableEl.length) {
        focusElement(nextIndex)
      } else if (calendarStateRef.current === 'days') {
        pendingFocusRef.current = { row: 'first', column: 0 }
        setCurrentMonth(addMonths(currentMonthRef.current, 1))
      }
      // MonthPicker/YearPicker: stop at edge
      return true
    },

    // Arrow Left: Move one cell, cross month boundary for DayPicker
    ArrowLeft: (e, { focusableEl, currentIndex, focusElement }) => {
      if (!focusableEl.length) return false
      e.preventDefault()
      e.stopPropagation()

      const prevIndex = currentIndex - 1
      if (prevIndex >= 0) {
        focusElement(prevIndex)
      } else if (calendarStateRef.current === 'days') {
        pendingFocusRef.current = { row: 'last', column: 6 }
        setCurrentMonth(addMonths(currentMonthRef.current, -1))
      }
      // MonthPicker/YearPicker: stop at edge
      return true
    },

    // Page Down: Next month (Shift → next year) — DayPicker only
    PageDown: (e, { currentIndex }) => {
      if (calendarStateRef.current !== 'days') return false
      e.preventDefault()
      e.stopPropagation()

      const column = currentIndex % 7
      pendingFocusRef.current = { row: 'selected', column }

      if (e.shiftKey) {
        setCurrentMonth(addYears(currentMonthRef.current, 1))
      } else {
        setCurrentMonth(addMonths(currentMonthRef.current, 1))
      }
      return true
    },

    // Page Up: Prev month (Shift → prev year) — DayPicker only
    PageUp: (e, { currentIndex }) => {
      if (calendarStateRef.current !== 'days') return false
      e.preventDefault()
      e.stopPropagation()

      const column = currentIndex % 7
      pendingFocusRef.current = { row: 'selected', column }

      if (e.shiftKey) {
        setCurrentMonth(addYears(currentMonthRef.current, -1))
      } else {
        setCurrentMonth(addMonths(currentMonthRef.current, -1))
      }
      return true
    },

    // Home: First cell in current row
    Home: (e, { currentIndex, focusElement }) => {
      e.preventDefault()
      e.stopPropagation()
      const cols = calendarStateRef.current === 'days' ? 7 : calendarStateRef.current === 'months' ? 3 : 5
      const rowStart = Math.floor(currentIndex / cols) * cols
      focusElement(rowStart)
      return true
    },

    // End: Last cell in current row
    End: (e, { focusableEl, currentIndex, focusElement }) => {
      e.preventDefault()
      e.stopPropagation()
      const cols = calendarStateRef.current === 'days' ? 7 : calendarStateRef.current === 'months' ? 3 : 5
      const rowStart = Math.floor(currentIndex / cols) * cols
      const rowEnd = Math.min(rowStart + cols - 1, focusableEl.length - 1)
      focusElement(rowEnd)
      return true
    },

    // Enter: Click the focused gridcell (skip if aria-disabled)
    Enter: (e, { focusableEl, currentIndex }) => {
      const cell = focusableEl[currentIndex]
      if (!cell) return false
      e.preventDefault()
      e.stopPropagation()
      if (cell.getAttribute('aria-disabled') !== 'true') cell.click()
      return true
    },

    // Space: Click the focused gridcell (skip if aria-disabled)
    Space: (e, { focusableEl, currentIndex }) => {
      const cell = focusableEl[currentIndex]
      if (!cell) return false
      e.preventDefault()
      e.stopPropagation()
      if (cell.getAttribute('aria-disabled') !== 'true') cell.click()
      return true
    },

    // Tab: Move focus to MonthSelect header button (grid → header navigation).
    // Shift+Tab: let event bubble to DatePicker's portal listener which closes the dropdown.
    Tab: (e) => {
      if (e.shiftKey) return true // Let Shift+Tab bubble → DatePicker closes
      e.preventDefault()
      e.stopPropagation()
      const calendar = gridRef.current?.closest('.Calendar')
      const monthSelect = calendar?.querySelector('.MonthSelect') as HTMLElement
      monthSelect?.focus()
      return true
    },

    // Escape: Close the dropdown from the grid
    Escape: (e) => {
      e.preventDefault()
      e.stopPropagation()
      onClose?.()
      return true
    },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [gridRef, setCurrentMonth, onClose])

  // No scope — Calendar's grid is part of the same dropdown, not a nested popover.
  // Keyboard isolation works naturally: keydown listener is on gridRef, so events from
  // header buttons (outside grid) never reach it. DatePicker's scope stays topmost.
  const { focusableElements, focusElement, currentFocusIndex } = useFocus(isActive, gridRef, {
    triggerRef: dummyRef,
    selectors: FOCUS_SELECTORS.grid,
    columns: gridColumns,
    keyHandlers: customKeyHandlers,
    value: `${calendarState}-${currentMonth.getTime()}`,
  })

  // Handle pending focus after month/state change (elements re-render).
  // useLayoutEffect runs synchronously after DOM mutations, before paint — no frame delay.
  useLayoutEffect(() => {
    if (!pendingFocusRef.current || !gridRef.current) return

    const grid = gridRef.current
    const cells = Array.from(
      grid.querySelectorAll(FOCUS_SELECTORS.grid.join(',')) as NodeListOf<HTMLElement>,
    )
    if (cells.length === 0) return

    const cols = calendarStateRef.current === 'days' ? 7 : calendarStateRef.current === 'months' ? 3 : 5
    const { row, column } = pendingFocusRef.current
    let targetIndex: number

    if (row === 'first') {
      targetIndex = column
    } else if (row === 'last') {
      targetIndex = cells.length - cols + column
    } else {
      // 'selected' — try to keep same column position, clamped to grid
      targetIndex = Math.min(column, cells.length - 1)
    }

    targetIndex = Math.max(0, Math.min(targetIndex, cells.length - 1))
    focusElement(targetIndex)
    pendingFocusRef.current = null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusableElements])

  // Focus selected/current/first cell on open and when calendarState changes (years→months→days).
  // useLayoutEffect runs after DOM mutations, before paint — focus lands immediately.
  useLayoutEffect(() => {
    if (!isActive || !gridRef.current) return

    const grid = gridRef.current
    const cells = Array.from(
      grid.querySelectorAll(FOCUS_SELECTORS.grid.join(',')) as NodeListOf<HTMLElement>,
    )
    if (cells.length === 0) return

    const selectedIndex = cells.findIndex(
      el => el.getAttribute('aria-selected') === 'true',
    )
    const currentIndex = cells.findIndex(
      el => el.getAttribute('aria-current') === 'date',
    )
    focusElement(selectedIndex !== -1 ? selectedIndex : currentIndex !== -1 ? currentIndex : 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarState, isActive])

  // Roving tabindex: only one gridcell has tabIndex=0 at any time
  useEffect(() => {
    if (focusableElements.length === 0) return

    focusableElements.forEach((el, index) => {
      el.setAttribute('tabindex', index === currentFocusIndex ? '0' : '-1')
    })
  }, [focusableElements, currentFocusIndex])

  return {
    focusableElements,
    focusElement,
    currentFocusIndex,
  }
}
