import { addMonths, addYears, getDate } from 'date-fns'
import { MutableRefObject, useEffect, useMemo, useRef } from 'react'

import { CustomKeyHandler, FOCUS_SELECTORS, useFocus } from '@/components/utils/hooks/useFocus'

import { CalendarState } from './Calendar'

type UseCalendarFocusOptions = {
  /** Enables keyboard navigation and roving tabindex */
  isActive: boolean
  /** Focus selected cell on mount — used by DatePicker when dropdown opens */
  focusOnOpen?: boolean
  /** Reference to the grid container element */
  gridRef: MutableRefObject<HTMLDivElement | null>
  /** Current calendar view state */
  calendarState: CalendarState
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
  currentMonth,
  setCurrentMonth,
  onClose,
}: UseCalendarFocusOptions) => {
  const pendingFocusRef = useRef<PendingFocus | null>(null)
  const shouldFocusGridRef = useRef(false)
  const calendarStateRef = useRef(calendarState)
  calendarStateRef.current = calendarState

  // Ref for currentMonth — handlers read this to avoid stale closures during fast key repeat
  const currentMonthRef = useRef(currentMonth)
  currentMonthRef.current = currentMonth

  // Dummy ref — prevents useFocus from attaching focus/blur listeners on gridRef
  // (which would activate hasTriggerFocus when the grid div itself gets accidentally focused)
  const dummyRef = useRef<HTMLElement>(null)

  const getGridCols = () => calendarStateRef.current === 'days' ? 7 : calendarStateRef.current === 'months' ? 3 : 5

  // Memoized custom key handlers — stabilizes identity to avoid unnecessary handleKeyDown recreation.
  // All mutable state is read via refs (currentMonthRef, calendarStateRef, pendingFocusRef).
  const customKeyHandlers = useMemo<{ [key: string]: CustomKeyHandler }>(() => {
    // Click the focused gridcell (shared by Enter and Space)
    const clickCell: CustomKeyHandler = (e, { focusableEl, currentIndex }) => {
      const cell = focusableEl[currentIndex]
      if (!cell) return false
      e.preventDefault()
      e.stopPropagation()
      if (cell.getAttribute('aria-disabled') !== 'true') cell.click()
      return true
    }

    // Page navigation: next/prev month (Shift → year) — DayPicker only.
    // Preserves day-of-month per WAI-ARIA APG (e.g. March 15 → April 15).
    const pageNav = (direction: 1 | -1): CustomKeyHandler => (e, { focusableEl, currentIndex }) => {
      if (calendarStateRef.current !== 'days') return false
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
      // Arrow Down: Move down by row, cross month boundary for DayPicker
      ArrowDown: (e, { focusableEl, currentIndex, focusElement }) => {
        if (!focusableEl.length) return false
        e.preventDefault()
        e.stopPropagation()

        const cols = getGridCols()
        const nextIndex = currentIndex + cols
        if (nextIndex < focusableEl.length) {
          focusElement(nextIndex)
        } else if (calendarStateRef.current === 'days') {
          pendingFocusRef.current = { row: 'first', column: currentIndex % cols }
          setCurrentMonth(addMonths(currentMonthRef.current, 1))
        }
        return true
      },

      // Arrow Up: Move up by row, cross month boundary for DayPicker
      ArrowUp: (e, { focusableEl, currentIndex, focusElement }) => {
        if (!focusableEl.length) return false
        e.preventDefault()
        e.stopPropagation()

        const cols = getGridCols()
        const prevIndex = currentIndex - cols
        if (prevIndex >= 0) {
          focusElement(prevIndex)
        } else if (calendarStateRef.current === 'days') {
          pendingFocusRef.current = { row: 'last', column: currentIndex % cols }
          setCurrentMonth(addMonths(currentMonthRef.current, -1))
        }
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
        return true
      },

      PageDown: pageNav(1),
      PageUp: pageNav(-1),

      // Home: First cell in current row
      Home: (e, { currentIndex, focusElement }) => {
        e.preventDefault()
        e.stopPropagation()
        const cols = getGridCols()
        const rowStart = Math.floor(currentIndex / cols) * cols
        focusElement(rowStart)
        return true
      },

      // End: Last cell in current row
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

      // Standalone (no onClose): Tab/Shift+Tab flow naturally, exit Calendar.
      // Dropdown (onClose exists): Tab → MonthSelect (step 1), Shift+Tab → close + focus trigger.
      Tab: (e) => {
        if (onClose) {
          e.preventDefault()
          e.stopPropagation()
          if (e.shiftKey) {
            onClose()
          } else {
            const calendar = gridRef.current?.closest('.Calendar')
            const monthSelect = calendar?.querySelector('.MonthSelect') as HTMLElement
            monthSelect?.focus()
          }
        }
        return true
      },

      // Escape: Close the dropdown from the grid
      Escape: (e) => {
        e.preventDefault()
        e.stopPropagation()
        onClose?.()
        return true
      },
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridRef, setCurrentMonth, onClose])

  // No scope — Calendar's grid is part of the same dropdown, not a nested popover.
  // Keyboard isolation works naturally: keydown listener is on gridRef, so events from
  // header buttons (outside grid) never reach it. DatePicker's scope stays topmost.
  const { focusElement } = useFocus(isActive, gridRef, {
    triggerRef: dummyRef,
    selectors: FOCUS_SELECTORS.grid,
    keyHandlers: customKeyHandlers,
    rovingTabindex: true,
    value: `${calendarState}-${currentMonth.getTime()}`,
  })

  // Focus grid on mount when focusOnOpen is set (DatePicker dropdown open).
  useEffect(() => {
    if (isActive && focusOnOpen) shouldFocusGridRef.current = true
  }, [isActive, focusOnOpen])

  // Focus grid on calendarState change (view switch: days → years → months).
  const prevCalendarStateRef = useRef(calendarState)
  useEffect(() => {
    if (isActive && prevCalendarStateRef.current !== calendarState) {
      shouldFocusGridRef.current = true
    }
    prevCalendarStateRef.current = calendarState
  }, [calendarState, isActive])

  // Focus resolution effect.
  // Runs AFTER useFocusableElements' effect (which populates focusableElRef + sets roving tabindex),
  // so focusElement() reads the correct, up-to-date cells.
  // Only moves focus for keyboard boundary crossing / open / state change.
  useEffect(() => {
    if (!isActive || !gridRef.current) return

    const cells = Array.from(
      gridRef.current.querySelectorAll(FOCUS_SELECTORS.grid.join(',')) as NodeListOf<HTMLElement>,
    )
    if (cells.length === 0) return

    let targetIndex: number

    if (pendingFocusRef.current) {
      // Handle pending focus from month boundary crossing or page navigation
      const cols = getGridCols()
      const { row, column, dayOfMonth } = pendingFocusRef.current
      if (row === 'first') {
        targetIndex = column
      } else if (row === 'last') {
        targetIndex = cells.length - cols + column
      } else {
        // 'sameDay': find cell matching the day-of-month in current month (PageDown/PageUp).
        // Falls back to column position if day doesn't exist (e.g. Jan 31 → Feb has no 31st).
        const isCurrentMonth = (dateStr: string) => {
          const d = new Date(dateStr)
          return d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear()
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
      // Normal: focus selected/current/first cell
      const selectedIndex = cells.findIndex(
        el => el.getAttribute('aria-selected') === 'true',
      )
      const currentIndex = cells.findIndex(
        el => el.getAttribute('aria-current') === 'date',
      )
      targetIndex = selectedIndex !== -1 ? selectedIndex : currentIndex !== -1 ? currentIndex : 0
    }

    // Only move focus to grid for keyboard boundary crossing or initial open/state change.
    // Clicking Next/Prev button only changes currentMonth — focus stays on the button.
    if (pendingFocusRef.current || shouldFocusGridRef.current) {
      focusElement(targetIndex) // Also sets roving tabindex via useFocus
      pendingFocusRef.current = null
      shouldFocusGridRef.current = false
    } else {
      // No focus move — still sync roving tabindex to selected cell (e.g. standalone mount, month click)
      cells.forEach((el, i) => el.setAttribute('tabindex', i === targetIndex ? '0' : '-1'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarState, isActive, currentMonth])

  // Arrow key navigation on header buttons (PreviousMonth, MonthSelect, NextMonth).
  // Native listener on Calendar element fires before DatePicker's portal listener,
  // so we intercept and stopPropagation to prevent DatePicker's useFocus from handling with stale index.
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
        idx < headerButtons.length - 1 ? headerButtons[idx + 1].focus() : focusGrid()
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault()
        e.stopPropagation()
        idx > 0 ? headerButtons[idx - 1].focus() : focusGrid()
      } else if (e.code === 'ArrowDown') {
        e.preventDefault()
        e.stopPropagation()
        focusGrid()
      } else if (e.code === 'Tab' && onClose) {
        // Dropdown context: Tab/Shift+Tab from header closes picker + returns focus to trigger
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
