import { MutableRefObject } from 'react'

// ============================================================================
// FOCUS SCOPE TYPES
// ============================================================================

export type FocusScopeType = 'modal' | 'dropdown' | 'interactive'

export type FocusScope = {
  id: string
  parentId: string | null
  priority: number
  element: HTMLElement | null
  portalElement: HTMLElement | null
  isActive: boolean
  type: FocusScopeType
  onDeactivate?: () => void
}

export type FocusScopeOptions = {
  type?: FocusScopeType
  scopeId?: string
  portalElement?: HTMLElement | null
  onDeactivate?: () => void
}

export type FocusScopeReturn = {
  scopeId: string
  isTopmostInBranch: boolean
  parentScope: FocusScope | null
  deactivateDescendants: () => void
  hasActiveDescendants: boolean
  getDescendantElements: () => HTMLElement[]
}

// ============================================================================
// FOCUS HOOK TYPES
// ============================================================================

export type FocusContext = {
  focusableEl: HTMLElement[]
  currentIndex: number
  focusElement: (index: number) => void
}

export type CustomKeyHandler = (e: KeyboardEvent, context: FocusContext) => boolean

export type UseFocusOptions = {
  // ── Core ──────────────────────────────────────────
  /** CSS selectors for focusable elements. Defaults to FOCUS_SELECTORS.common. */
  selectors?: readonly string[]
  /** Value to trigger focusable list refresh on selection change. */
  value?: unknown
  /** Number of columns for 2D grid navigation. */
  columns?: number

  // ── Trigger & Portal ──────────────────────────────
  /** Ref to trigger element (e.g., combobox button/input). Defaults to containerRef. */
  triggerRef?: MutableRefObject<HTMLElement | null>
  /** Portal element for dropdown/modal content rendered outside container. */
  portalEl?: HTMLElement | null
  /** Enable chip/clear keyboard navigation when trigger is focused (dropdown closed). */
  triggerNav?: boolean

  // ── Dismiss & Scope ───────────────────────────────
  /** Dismiss behavior: 'modal' traps focus + captures/restores, 'non-modal' closes on outside click/focus. */
  dismiss?: 'modal' | 'non-modal' | false
  /** Function returning submenu element refs for non-modal dismiss. */
  submenuRefs?: () => (HTMLElement | null)[]
  /** Enable global focus scope coordination for nested components. */
  scope?: boolean
  /** Type of focus scope — affects priority and behavior (default: 'dropdown'). */
  scopeType?: FocusScopeType

  // ── Keyboard ──────────────────────────────────────
  /** Custom key handlers that execute before defaults. Return true if handled. */
  keyHandlers?: { [key: string]: CustomKeyHandler }
  /** Enable type-ahead character search (500ms reset). */
  typeAhead?: boolean
  /** Callback for printable character keypress (alternative to typeAhead). */
  onPrintableKey?: (e: KeyboardEvent, context: FocusContext) => boolean

  // ── Callbacks ─────────────────────────────────────
  /** Callback when component should open/close. */
  onToggle?: (open: boolean) => void
  /** Callback when dropdown first opens with focusable list ready. */
  onOpen?: (context: {
    focusableElements: HTMLElement[]
    focusElement: (index: number) => void
  }) => void
}

// ============================================================================
// SUB-HOOK TYPES
// ============================================================================

export type UseFocusableElementsOptions = {
  triggerRef: MutableRefObject<HTMLElement | null>
  selectors: readonly string[]
  portalEl?: HTMLElement | null
  value?: unknown
  triggerNav?: boolean
  onOpen?: (context: {
    focusableElements: HTMLElement[]
    focusElement: (index: number) => void
  }) => void
}

export type UseFocusableElementsReturn = {
  focusableElRef: MutableRefObject<HTMLElement[]>
  focusIndexRef: MutableRefObject<number>
  preserveFocusRef: MutableRefObject<HTMLElement | null>
  focusElement: (index: number) => void
}

export type UseKeyboardNavigationOptions = {
  isActive: boolean
  focusableElRef: MutableRefObject<HTMLElement[]>
  focusIndexRef: MutableRefObject<number>
  preserveFocusRef: MutableRefObject<HTMLElement | null>
  triggerRef: MutableRefObject<HTMLElement | null>
  focusElement: (index: number) => void
  columns?: number
  trap?: boolean
  onToggle?: (open: boolean) => void
  keyHandlers?: { [key: string]: CustomKeyHandler }
  typeAhead?: boolean
  triggerNav?: boolean
  onPrintableKey?: (e: KeyboardEvent, context: FocusContext) => boolean
  handleTypeAhead: (key: string, focusable: HTMLElement[], currentIndex: number) => number
}

export type UseTypeAheadSearchReturn = {
  handleTypeAhead: (key: string, focusable: HTMLElement[], currentIndex: number) => number
  resetTypeAhead: () => void
}

// ============================================================================
// RETURN TYPES
// ============================================================================

export type UseFocusReturn = {
  /** Current list of focusable elements. */
  focusableElements: HTMLElement[]
  /** Programmatically focus an element by index. */
  focusElement: (index: number) => void
  /** Current focus index in focusable array. */
  currentFocusIndex: number
  /** Focus scope information (only available if scope is true). */
  focusScope?: {
    scopeId: string
    isTopmostInBranch: boolean
    hasActiveDescendants: boolean
    deactivateDescendants: () => void
    getDescendantElements: () => HTMLElement[]
  }
}
