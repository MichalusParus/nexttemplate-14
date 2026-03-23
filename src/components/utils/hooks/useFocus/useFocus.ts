import { MutableRefObject, useEffect } from 'react'

import { FOCUS_SELECTORS } from './constants'
import { UseFocusOptions, UseFocusReturn } from './types'
import { useDismissModal } from './useDismissModal'
import { useDismissNonModal } from './useDismissNonModal'
import { useFocusableElements } from './useFocusableElements'
import { useFocusScope } from './useFocusScope'
import { useKeyboardNavigation } from './useKeyboardNavigation'
import { useTriggerFocus } from './useTriggerFocus'
import { useTypeAheadSearch } from './useTypeAheadSearch'

// ============================================================================
// ROVING TABINDEX APPROACH (not aria-activedescendant)
// - Consistent across screen readers (VoiceOver, NVDA, JAWS)
// - aria-activedescendant has VoiceOver bugs and breaks with portals
// - Supports interactive children (buttons, links) which WAI-ARIA prohibits in activedescendant listboxes
// - Industry standard: Radix UI, React Aria use same approach
// ============================================================================

/**
 * Core focus management hook. Composes sub-hooks for:
 * - Focusable element discovery and zone management
 * - Trigger focus tracking for combobox patterns
 * - Type-ahead character search
 * - Keyboard navigation with customizable handlers
 * - Modal/non-modal dismiss behavior
 * - Global focus scope coordination for nested components
 */
export const useFocus = (
  isActive: boolean,
  containerRef: MutableRefObject<HTMLElement | null>,
  options?: UseFocusOptions,
): UseFocusReturn => {
  const triggerRef = options?.triggerRef ?? containerRef
  const selectors = options?.selectors ?? FOCUS_SELECTORS.common
  const triggerNav = options?.triggerNav ?? false
  const scope = options?.scope || options?.dismiss === 'modal'
  const scopeType = options?.dismiss === 'modal' ? 'modal' : (options?.scopeType ?? 'dropdown')
  const trap = options?.dismiss === 'modal'

  // 1. Global focus scope coordination (opt-in)
  const focusScope = useFocusScope(
    scope ? isActive : false,
    containerRef,
    {
      type: scopeType,
      portalElement: options?.portalEl ?? null,
      onDeactivate: () => options?.onToggle?.(false),
    },
  )

  // 2. Trigger focus tracking
  const hasTriggerFocus = useTriggerFocus(
    triggerRef,
    containerRef,
    options?.portalEl,
    triggerNav || !scope,
  )

  // 3. Compute effective active state
  const isEffectivelyActive = scope
    ? (isActive && focusScope.isTopmostInBranch) || (triggerNav && hasTriggerFocus)
    : isActive || hasTriggerFocus

  // 4. Focusable element discovery and zone management
  const dismissModalOnOpen = options?.dismiss === 'modal'
    ? ({
        focusableElements,
        focusElement,
      }: {
        focusableElements: HTMLElement[]
        focusElement: (index: number) => void
      }) => {
        requestAnimationFrame(() => {
          if (focusableElements.length > 0) {
            focusElement(0)
          }
        })
      }
    : undefined

  const { focusableElRef, focusIndexRef, preserveFocusRef, focusElement } = useFocusableElements(
    isActive,
    isEffectivelyActive,
    containerRef,
    {
      triggerRef,
      selectors,
      portalEl: options?.portalEl,
      value: options?.value,
      triggerNav,
      rovingTabindex: options?.rovingTabindex,
      onOpen: options?.onOpen ?? dismissModalOnOpen,
    },
  )

  // 5. Type-ahead search
  const { handleTypeAhead } = useTypeAheadSearch(
    isActive,
    options?.typeAhead ?? false,
  )

  // 6. Keyboard navigation
  const handleKeyDown = useKeyboardNavigation({
    isActive,
    focusableElRef,
    focusIndexRef,
    preserveFocusRef,
    triggerRef,
    focusElement,
    columns: options?.columns,
    trap,
    onToggle: options?.onToggle,
    keyHandlers: options?.keyHandlers,
    typeAhead: options?.typeAhead,
    triggerNav,
    onPrintableKey: options?.onPrintableKey,
    handleTypeAhead,
  })

  // 7. Dismiss behavior
  useDismissModal(options?.dismiss === 'modal' ? isActive : false)

  useDismissNonModal(
    options?.dismiss === 'non-modal' ? isActive : false,
    containerRef,
    options?.portalEl,
    () => options?.onToggle?.(false),
    options?.submenuRefs,
  )

  // 8. Register keydown listeners on container + portal
  useEffect(() => {
    if (!isEffectivelyActive) return

    const container = containerRef.current
    const portal = options?.portalEl

    if (container) container.addEventListener('keydown', handleKeyDown)
    if (portal) portal.addEventListener('keydown', handleKeyDown)

    return () => {
      if (container) container.removeEventListener('keydown', handleKeyDown)
      if (portal) portal.removeEventListener('keydown', handleKeyDown)
    }
  }, [isEffectivelyActive, handleKeyDown, containerRef, options?.portalEl])

  return {
    focusableElements: focusableElRef.current,
    focusElement,
    currentFocusIndex: focusIndexRef.current,
    ...(scope && {
      focusScope: {
        scopeId: focusScope.scopeId,
        isTopmostInBranch: focusScope.isTopmostInBranch,
        hasActiveDescendants: focusScope.hasActiveDescendants,
        deactivateDescendants: focusScope.deactivateDescendants,
        getDescendantElements: focusScope.getDescendantElements,
      },
    }),
  }
}
