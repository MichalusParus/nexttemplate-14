import { MutableRefObject, useCallback, useEffect, useRef, useSyncExternalStore } from 'react'

import { FocusScope, FocusScopeOptions, FocusScopeReturn } from './types'

// ============================================================================
// MODULE-LEVEL STATE
// ============================================================================

const focusScopeStack: FocusScope[] = []
let nextPriority = 0
let nextScopeId = 0
let snapshotVersion = 0
const listeners = new Set<() => void>()

const generateScopeId = (): string => `focus-scope-${++nextScopeId}`

const notifyListeners = () => {
  snapshotVersion++
  listeners.forEach((listener) => listener())
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const getSnapshot = () => snapshotVersion

// ============================================================================
// PUBLIC UTILITIES
// ============================================================================

/** Get current focus scope stack (read-only). Useful for debugging and testing. */
export const getFocusScopeStack = (): readonly FocusScope[] => {
  return [...focusScopeStack]
}

/** Clear all focus scopes. ONLY for testing — don't use in production. */
export const clearFocusScopes = (): void => {
  focusScopeStack.length = 0
  nextPriority = 0
  nextScopeId = 0
  snapshotVersion = 0
}

// ============================================================================
// INTERNAL FUNCTIONS
// ============================================================================

/**
 * Detect parent scope via DOM containment.
 * Checks if the registering element is inside any existing scope's element or portal.
 * Returns the most specific (innermost) matching scope's ID, or null for root-level.
 */
const detectParent = (registeringElement: HTMLElement | null): string | null => {
  if (!registeringElement) return null
  for (let i = focusScopeStack.length - 1; i >= 0; i--) {
    const scope = focusScopeStack[i]
    if (!scope.isActive) continue
    if (scope.element?.contains(registeringElement) || scope.portalElement?.contains(registeringElement)) {
      return scope.id
    }
  }
  return null
}

const addScopeToStack = (scope: FocusScope): void => {
  focusScopeStack.push(scope)
  focusScopeStack.sort((a, b) => a.priority - b.priority)
  notifyListeners()
}

const removeScopeFromStack = (scopeId: string): void => {
  const index = focusScopeStack.findIndex((s) => s.id === scopeId)
  if (index !== -1) {
    focusScopeStack.splice(index, 1)
    notifyListeners()
  }
}

const getParentScope = (scopeId: string): FocusScope | null => {
  const scope = focusScopeStack.find((s) => s.id === scopeId)
  if (!scope?.parentId) return null
  return focusScopeStack.find((s) => s.id === scope.parentId) ?? null
}

const hasActiveDescendants = (scopeId: string): boolean => {
  for (const scope of focusScopeStack) {
    if (scope.parentId === scopeId && scope.isActive) return true
    if (scope.parentId === scopeId && hasActiveDescendants(scope.id)) return true
  }
  return false
}

const isTopmostInBranch = (scopeId: string): boolean => {
  return !hasActiveDescendants(scopeId)
}

/** Get all DOM elements from descendant scopes (for outside-click detection). */
const getDescendantElements = (scopeId: string): HTMLElement[] => {
  const elements: HTMLElement[] = []
  for (const scope of focusScopeStack) {
    if (scope.parentId === scopeId) {
      if (scope.element) elements.push(scope.element)
      if (scope.portalElement) elements.push(scope.portalElement)
      elements.push(...getDescendantElements(scope.id))
    }
  }
  return elements
}

/** Deactivate all descendants of a scope (recursive, leaves first). */
const deactivateDescendantsOf = (scopeId: string): void => {
  const directChildren = focusScopeStack.filter((s) => s.parentId === scopeId)

  for (const child of directChildren) {
    deactivateDescendantsOf(child.id)
    if (child.isActive) {
      child.isActive = false
      child.onDeactivate?.()
    }
  }

  if (directChildren.length > 0) {
    notifyListeners()
  }
}

// ============================================================================
// MAIN HOOK
// ============================================================================

/**
 * Global focus scope coordination for nested components.
 * Registers component in a module-level tree when active.
 * Parent-child relationships detected via DOM containment at registration time.
 * Branch-aware queries ensure sibling scopes don't interfere.
 */
export const useFocusScope = (
  isActive: boolean,
  containerRef: MutableRefObject<HTMLElement | null>,
  options?: FocusScopeOptions,
): FocusScopeReturn => {
  const scopeIdRef = useRef<string>(options?.scopeId || generateScopeId())
  const scopeId = scopeIdRef.current
  const isRegisteredRef = useRef(false)

  const onDeactivateRef = useRef(options?.onDeactivate)
  onDeactivateRef.current = options?.onDeactivate

  useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  useEffect(() => {
    if (!isActive) {
      if (isRegisteredRef.current) {
        removeScopeFromStack(scopeId)
        isRegisteredRef.current = false
      }
      return
    }

    if (!isRegisteredRef.current) {
      const scope: FocusScope = {
        id: scopeId,
        parentId: detectParent(containerRef.current),
        priority: nextPriority++,
        element: containerRef.current,
        portalElement: options?.portalElement ?? null,
        isActive: true,
        type: options?.type || 'dropdown',
        onDeactivate: () => onDeactivateRef.current?.(),
      }

      addScopeToStack(scope)
      isRegisteredRef.current = true
    } else {
      const existingScope = focusScopeStack.find((s) => s.id === scopeId)
      if (existingScope) {
        const elementChanged = existingScope.element !== containerRef.current
        const portalChanged = existingScope.portalElement !== (options?.portalElement ?? null)

        if (elementChanged || portalChanged) {
          existingScope.element = containerRef.current
          existingScope.portalElement = options?.portalElement ?? null
          notifyListeners()
        }
      }
    }

    return () => {
      if (isRegisteredRef.current) {
        removeScopeFromStack(scopeId)
        isRegisteredRef.current = false
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, scopeId, options?.type, options?.portalElement])

  const getDescendantElementsCb = useCallback(() => {
    if (isRegisteredRef.current) {
      return getDescendantElements(scopeId)
    }
    return []
  }, [scopeId])

  return {
    scopeId,
    isTopmostInBranch: isRegisteredRef.current ? isTopmostInBranch(scopeId) : true,
    parentScope: isRegisteredRef.current ? getParentScope(scopeId) : null,
    deactivateDescendants: () => {
      if (isRegisteredRef.current) {
        deactivateDescendantsOf(scopeId)
      }
    },
    hasActiveDescendants: isRegisteredRef.current ? hasActiveDescendants(scopeId) : false,
    getDescendantElements: getDescendantElementsCb,
  }
}
