import { MutableRefObject, useEffect } from 'react'

import { CustomKeyHandler, FOCUS_SELECTORS, useFocus } from '@/components/utils/hooks/useFocus'

type UseDataGridFocusOptions = {
  /** Reference to the grid container element */
  gridRef: MutableRefObject<HTMLDivElement | null>
  /** Number of columns in the grid (for 2D navigation) */
  gridColumns: number
  /** Callback when row selection is triggered (Ctrl+Space) */
  onRowSelect?: (rowIndex: number) => void
}

/** Custom hook for DataGrid keyboard navigation using ARIA grid pattern with roving tabindex */
export const useDataGridFocus = ({
  gridRef,
  gridColumns,
  onRowSelect,
}: UseDataGridFocusOptions) => {
  // Exit interaction mode: reset interactive elements and return focus to cell
  const exitInteractionMode = (): boolean => {
    const activeElement = document.activeElement as HTMLElement
    if (!activeElement) return false
    const parentCell = activeElement.closest('[role="gridcell"], [role="columnheader"]')
    if (!parentCell) return false
    if (activeElement.tagName !== 'BUTTON' && activeElement.tagName !== 'A') return false
    parentCell.querySelectorAll<HTMLElement>('button, a[href]')
      .forEach(el => el.setAttribute('tabindex', '-1'))
    ;(parentCell as HTMLElement).focus()
    return false
  }

  // Custom key handlers for grid-specific interactions
  const customKeyHandlers: { [key: string]: CustomKeyHandler } = {
    // Enter key: Activate interaction mode for cells with interactive elements
    Enter: (e, { focusableEl, currentIndex }) => {
      // If already in interaction mode (focused on a button/link inside a cell),
      // let the element's native click handler fire (e.g., to open a menu)
      const activeElement = document.activeElement as HTMLElement
      if (activeElement) {
        const parentCell = activeElement.closest('[role="gridcell"], [role="columnheader"]')
        if (parentCell && activeElement !== parentCell &&
            (activeElement.tagName === 'BUTTON' || activeElement.tagName === 'A')) {
          return false
        }
      }

      const focusedCell = focusableEl[currentIndex]
      if (!focusedCell) return false

      // Query for interactive elements in the cell
      const interactiveElements = focusedCell.querySelectorAll(
        'button:not([disabled]), a[href]'
      ) as NodeListOf<HTMLElement>

      // No interactive elements: do nothing (performance optimization for text cells)
      if (interactiveElements.length === 0) return false

      // Interactive elements found: enter interaction mode
      e.preventDefault()
      e.stopPropagation()

      // Make ALL interactive elements tabbable during interaction mode
      interactiveElements.forEach(el => el.setAttribute('tabindex', '0'))

      // Focus the first interactive element
      interactiveElements[0].focus()

      return true
    },

    // Tab/Shift+Tab: Cycle through interactive elements in interaction mode OR exit grid
    Tab: (e) => {
      const activeElement = document.activeElement as HTMLElement
      if (!activeElement) return false

      const parentCell = activeElement.closest('[role="gridcell"], [role="columnheader"]')
      if (!parentCell) return false

      const isInteractiveElement = activeElement.tagName === 'BUTTON' || activeElement.tagName === 'A'

      // In interaction mode: cycle through interactive elements
      if (isInteractiveElement) {
        const interactiveElements = Array.from(
          parentCell.querySelectorAll('button:not([disabled]), a[href]') as NodeListOf<HTMLElement>
        )

        if (interactiveElements.length <= 1) return false

        const currentIndex = interactiveElements.indexOf(activeElement)
        if (currentIndex === -1) return false

        e.preventDefault()
        e.stopPropagation()

        // Calculate next index (wrapping)
        const nextIndex = e.shiftKey
          ? (currentIndex - 1 + interactiveElements.length) % interactiveElements.length
          : (currentIndex + 1) % interactiveElements.length

        interactiveElements[nextIndex]?.focus()

        return true
      }

      // Not in interaction mode: Let browser's default Tab behavior handle grid exit
      return false
    },

    // Escape: Exit interaction mode and return focus to cell
    Escape: (e) => {
      const activeElement = document.activeElement as HTMLElement
      if (!activeElement) return false

      const parentCell = activeElement.closest('[role="gridcell"], [role="columnheader"]')
      if (!parentCell) return false

      const isInteractiveElement = activeElement.tagName === 'BUTTON' || activeElement.tagName === 'A'
      if (!isInteractiveElement) return false

      // Exit interaction mode: return focus to the cell
      e.preventDefault()
      e.stopPropagation()

      // Reset tabIndex on all interactive elements
      const interactiveElements = parentCell.querySelectorAll(
        'button, a[href]'
      ) as NodeListOf<HTMLElement>
      interactiveElements.forEach(el => el.setAttribute('tabindex', '-1'))

      ;(parentCell as HTMLElement).focus()

      return true
    },

    // Ctrl+Space: Toggle row selection
    Space: (e, { focusableEl, currentIndex }) => {
      // Only handle if Ctrl/Cmd is pressed
      if (!e.ctrlKey && !e.metaKey) return false

      const focusedCell = focusableEl[currentIndex]
      if (!focusedCell) return false

      // Check if focused cell is a gridcell (not header)
      if (focusedCell.getAttribute('role') === 'gridcell') {
        e.preventDefault()
        e.stopPropagation()

        // Find the row element
        const row = focusedCell.closest('[role="row"]')
        if (row) {
          const rowIndex = parseInt(row.getAttribute('aria-rowindex') || '0', 10)
          onRowSelect?.(rowIndex)
        }

        return true
      }

      return false
    },

    // Arrow keys: Exit interaction mode if focused on interactive element, then navigate
    ArrowUp: exitInteractionMode,
    ArrowDown: exitInteractionMode,
    ArrowLeft: exitInteractionMode,
    ArrowRight: exitInteractionMode,

    // Home: Ctrl+Home → first cell in grid, Home → first cell in current row
    Home: (e, { focusableEl, currentIndex, focusElement }) => {
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

      const firstCellInRow = focusableEl.find(
        el => el.closest('[role="row"]') === row && el !== focusedCell,
      )
      const firstCellIndex = firstCellInRow ? focusableEl.indexOf(firstCellInRow) : -1

      if (firstCellIndex !== -1) {
        focusElement(firstCellIndex)
        return true
      }

      return false
    },

    // End: Ctrl+End → last cell in grid, End → last cell in current row
    End: (e, { focusableEl, currentIndex, focusElement }) => {
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
    },
  }

  // Use the generic useFocus hook with grid-specific configuration
  // scope: true enables focus scope coordination — when a child popover (Menu, Dropdown)
  // opens inside the grid, DataGrid's keyboard handlers are automatically suppressed
  // via useSyncExternalStore + isTopmostInBranch check
  const { focusableElements, focusElement, currentFocusIndex } = useFocus(true, gridRef, {
    selectors: FOCUS_SELECTORS.grid,
    columns: gridColumns,
    keyHandlers: customKeyHandlers,
    triggerRef: { current: null },
    scope: true,
    scopeType: 'interactive',
  })

  // Update tabindex on all cells to implement roving tabindex pattern
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
