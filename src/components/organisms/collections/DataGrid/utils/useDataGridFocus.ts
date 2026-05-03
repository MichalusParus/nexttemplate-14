import { MutableRefObject, useEffect } from 'react'

import { CustomKeyHandler, FOCUS_SELECTORS, useFocus } from '@/components/utils/hooks/useFocus'

/** Selector for interactive elements inside grid cells (interaction mode targets) */
const CELL_INTERACTIVE_SELECTOR =
  'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [contenteditable="true"]'

/** Tag names considered interactive for interaction mode detection */
const CELL_INTERACTIVE_TAGS = new Set(['BUTTON', 'A', 'INPUT', 'TEXTAREA', 'SELECT'])

type UseDataGridFocusOptions = {
  /** Reference to the grid container element */
  componentRef: MutableRefObject<HTMLDivElement | null>
  /** Number of columns in the grid (for 2D navigation) */
  gridColumns: number
  /** Callback when row selection is triggered (Ctrl+Space) */
  onRowSelect?: (rowIndex: number) => void
  /** Callback when select all is triggered (Ctrl+A) */
  onSelectAll?: () => void
}

/** Custom hook for DataGrid keyboard navigation using ARIA grid pattern with roving tabindex */
export const useDataGridFocus = ({
  componentRef,
  gridColumns,
  onRowSelect,
  onSelectAll,
}: UseDataGridFocusOptions) => {
  // Exit interaction mode: reset interactive elements and return focus to cell
  const exitInteractionMode = (): boolean => {
    const activeElement = document.activeElement as HTMLElement
    if (!activeElement) return false
    const parentCell = activeElement.closest('[role="gridcell"], [role="columnheader"]')
    if (!parentCell) return false
    if (!CELL_INTERACTIVE_TAGS.has(activeElement.tagName) && !activeElement.hasAttribute('contenteditable')) return false
    parentCell.querySelectorAll<HTMLElement>(CELL_INTERACTIVE_SELECTOR)
      .forEach(el => el.setAttribute('tabindex', '-1'))
    ;(parentCell as HTMLElement).focus()
    return false
  }

  // Guard: only fire handler when focus is on a grid cell or interactive element inside one
  const guardHandler = (handler: CustomKeyHandler): CustomKeyHandler =>
    (e, context) => {
      const el = document.activeElement as HTMLElement
      if (!el?.closest('[role="gridcell"], [role="columnheader"]')) return false
      return handler(e, context)
    }

  // Custom key handlers for grid-specific interactions
  const customKeyHandlers: { [key: string]: CustomKeyHandler } = {
    Enter: guardHandler((e, { focusableEl, currentIndex }) => {
      const activeElement = document.activeElement as HTMLElement
      if (activeElement) {
        const parentCell = activeElement.closest('[role="gridcell"], [role="columnheader"]')
        if (parentCell && activeElement !== parentCell &&
            (CELL_INTERACTIVE_TAGS.has(activeElement.tagName) || activeElement.hasAttribute('contenteditable'))) {
          return false
        }
      }

      const focusedCell = focusableEl[currentIndex]
      if (!focusedCell) return false

      const interactiveElements = focusedCell.querySelectorAll(
        CELL_INTERACTIVE_SELECTOR
      ) as NodeListOf<HTMLElement>

      if (interactiveElements.length === 0) return false

      e.preventDefault()
      e.stopPropagation()
      interactiveElements.forEach(el => el.setAttribute('tabindex', '0'))
      interactiveElements[0].focus()
      return true
    }),

    Tab: guardHandler((e) => {
      const activeElement = document.activeElement as HTMLElement
      if (!activeElement) return false

      const parentCell = activeElement.closest('[role="gridcell"], [role="columnheader"]')
      if (!parentCell) return false

      const isInteractiveElement = CELL_INTERACTIVE_TAGS.has(activeElement.tagName) || activeElement.hasAttribute('contenteditable')

      if (isInteractiveElement) {
        const interactiveElements = Array.from(
          parentCell.querySelectorAll(CELL_INTERACTIVE_SELECTOR) as NodeListOf<HTMLElement>
        )

        if (interactiveElements.length <= 1) return false

        const currentIndex = interactiveElements.indexOf(activeElement)
        if (currentIndex === -1) return false

        e.preventDefault()
        e.stopPropagation()

        const nextIndex = e.shiftKey
          ? (currentIndex - 1 + interactiveElements.length) % interactiveElements.length
          : (currentIndex + 1) % interactiveElements.length

        interactiveElements[nextIndex]?.focus()
        return true
      }

      return false
    }),

    Escape: guardHandler((e) => {
      const activeElement = document.activeElement as HTMLElement
      if (!activeElement) return false

      const parentCell = activeElement.closest('[role="gridcell"], [role="columnheader"]')
      if (!parentCell) return false

      const isInteractiveElement = CELL_INTERACTIVE_TAGS.has(activeElement.tagName) || activeElement.hasAttribute('contenteditable')
      if (!isInteractiveElement) return false

      e.preventDefault()
      e.stopPropagation()

      const interactiveElements = parentCell.querySelectorAll(
        CELL_INTERACTIVE_SELECTOR
      ) as NodeListOf<HTMLElement>
      interactiveElements.forEach(el => el.setAttribute('tabindex', '-1'))

      ;(parentCell as HTMLElement).focus()
      return true
    }),

    Space: guardHandler((e, { focusableEl, currentIndex }) => {
      if (!e.ctrlKey && !e.metaKey) return false

      const focusedCell = focusableEl[currentIndex]
      if (!focusedCell) return false

      if (focusedCell.getAttribute('role') === 'gridcell') {
        e.preventDefault()
        e.stopPropagation()

        const row = focusedCell.closest('[role="row"]')
        if (row) {
          const rowIndex = parseInt(row.getAttribute('aria-rowindex') || '0', 10)
          onRowSelect?.(rowIndex)
        }
        return true
      }

      return false
    }),

    F2: guardHandler((e, { focusableEl, currentIndex }) => {
      const focusedCell = focusableEl[currentIndex]
      if (!focusedCell) return false

      const interactiveElements = focusedCell.querySelectorAll(
        CELL_INTERACTIVE_SELECTOR
      ) as NodeListOf<HTMLElement>

      if (interactiveElements.length === 0) return false

      e.preventDefault()
      e.stopPropagation()
      interactiveElements.forEach(el => el.setAttribute('tabindex', '0'))
      interactiveElements[0].focus()
      return true
    }),

    KeyA: guardHandler((e) => {
      if (!e.ctrlKey && !e.metaKey) return false
      if (!onSelectAll) return false

      e.preventDefault()
      e.stopPropagation()
      onSelectAll()
      return true
    }),

    ArrowUp: exitInteractionMode,
    ArrowDown: exitInteractionMode,
    ArrowLeft: exitInteractionMode,
    ArrowRight: exitInteractionMode,

    Home: guardHandler((e, { focusableEl, currentIndex, focusElement }) => {
      e.preventDefault()
      e.stopPropagation()

      if (e.ctrlKey || e.metaKey) {
        focusElement(0)
        return true
      }

      const focusedCell = focusableEl[currentIndex]
      if (!focusedCell) return false

      const row = focusedCell.closest('[role="row"]')
      if (!row) return false

      const cellsInRow = focusableEl.filter(el => el.closest('[role="row"]') === row)
      const firstCellInRow = cellsInRow[0]
      const firstCellIndex = firstCellInRow ? focusableEl.indexOf(firstCellInRow) : -1

      if (firstCellIndex !== -1 && firstCellIndex !== currentIndex) {
        focusElement(firstCellIndex)
        return true
      }

      return false
    }),

    End: guardHandler((e, { focusableEl, currentIndex, focusElement }) => {
      e.preventDefault()
      e.stopPropagation()

      if (e.ctrlKey || e.metaKey) {
        focusElement(focusableEl.length - 1)
        return true
      }

      const focusedCell = focusableEl[currentIndex]
      if (!focusedCell) return false

      const row = focusedCell.closest('[role="row"]')
      if (!row) return false

      const cellsInRow = focusableEl.filter(el => el.closest('[role="row"]') === row)
      const lastCellInRow = cellsInRow[cellsInRow.length - 1]
      const lastCellIndex = lastCellInRow ? focusableEl.indexOf(lastCellInRow) : -1

      if (lastCellIndex !== -1 && lastCellIndex !== currentIndex) {
        focusElement(lastCellIndex)
        return true
      }

      return false
    }),
  }

  // Use the generic useFocus hook with grid-specific configuration
  // scope: true enables focus scope coordination — when a child popover (Menu, Dropdown)
  // opens inside the grid, DataGrid's keyboard handlers are automatically suppressed
  // via useSyncExternalStore + isTopmostInBranch check
  const { focusableElements, focusElement, currentFocusIndex } = useFocus(true, componentRef, {
    selectors: FOCUS_SELECTORS.grid,
    columns: gridColumns,
    keyHandlers: customKeyHandlers,
    triggerRef: { current: null },
    scope: true,
    scopeType: 'interactive',
    rovingTabindex: true,
  })

  // Initialize interactive elements inside cells to tabIndex="-1" so they're only
  // reachable via interaction mode (Enter/F2), not browser Tab order
  useEffect(() => {
    const grid = componentRef.current
    if (!grid) return

    const cells = grid.querySelectorAll('[role="gridcell"], [role="columnheader"]')
    cells.forEach(cell => {
      cell.querySelectorAll<HTMLElement>(CELL_INTERACTIVE_SELECTOR).forEach(el => {
        el.setAttribute('tabindex', '-1')
      })
    })
  }, [focusableElements, componentRef])

  return {
    focusableElements,
    focusElement,
    currentFocusIndex,
  }
}
