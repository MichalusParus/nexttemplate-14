import { MutableRefObject, useEffect, useRef } from 'react'

import { FOCUS_SELECTORS } from './constants'
import { UseFocusableElementsOptions, UseFocusableElementsReturn } from './types'

/**
 * Discovers and tracks focusable elements in container + portal.
 * Handles zone separation (OPEN vs CLOSED) and focus preservation when list updates.
 */
export const useFocusableElements = (
  isActive: boolean,
  isEffectivelyActive: boolean,
  containerRef: MutableRefObject<HTMLElement | null>,
  options: UseFocusableElementsOptions,
): UseFocusableElementsReturn => {
  const selectors = options.selectors ?? FOCUS_SELECTORS.common
  const focusIndexRef = useRef<number>(0)
  const focusableElRef = useRef<HTMLElement[]>([])
  const preserveFocusRef = useRef<HTMLElement | null>(null)
  const isInitialOpenRef = useRef<boolean>(true)

  useEffect(() => {
    if (!isActive) {
      isInitialOpenRef.current = true
      preserveFocusRef.current = null
    }
  }, [isActive])

  // Focusable array actualization with index update and initial focus
  useEffect(() => {
    if (!isEffectivelyActive) {
      preserveFocusRef.current = null
      focusIndexRef.current = 0
      return
    }

    const container = containerRef.current
    const portal = options.portalEl

    // Wait for container to be available (useImperativeHandle sets it async)
    if (!container && !portal) return

    const selector = selectors.join(',')
    const trigger = options.triggerRef.current
    const isVisible = (el: HTMLElement) => !el.closest('.invisible')

    const containerSelectableElList = container
      ? Array.from(container.querySelectorAll(selector) as NodeListOf<HTMLElement>).filter(isVisible)
      : []
    const portalSelectableElList = portal
      ? Array.from(portal.querySelectorAll(selector) as NodeListOf<HTMLElement>).filter(isVisible)
      : []

    // Add trigger to list if not already there
    const triggerAlreadyInList = trigger && containerSelectableElList.includes(trigger)
    const triggerList = trigger && !triggerAlreadyInList ? [trigger] : []

    // Zone separation: when triggerNav, build list based on activation reason
    // OPEN (isActive): trigger + portal — dropdown content only
    // CLOSED (!isActive): trigger + container — chips/clear only
    const completeSelectableList = options.triggerNav
      ? (isActive
        ? [...triggerList, ...portalSelectableElList]
        : [...triggerList, ...containerSelectableElList])
      : [...triggerList, ...portalSelectableElList, ...containerSelectableElList]

    focusableElRef.current = completeSelectableList

    // Call onOpen callback when dropdown first opens with focusable list ready
    const hasFocusableElements = portalSelectableElList.length > 0 || (!portal && completeSelectableList.length > 0)
    if (isActive && isInitialOpenRef.current && hasFocusableElements) {
      isInitialOpenRef.current = false
      options.onOpen?.({
        focusableElements: completeSelectableList,
        focusElement: (index: number) => {
          focusIndexRef.current = index
          completeSelectableList[index]?.focus()
          preserveFocusRef.current = completeSelectableList[index]
        },
      })
    }

    // Try to preserve focus on currently focused element (but not the trigger when opening)
    const currentlyFocused = preserveFocusRef.current
    const isTrigger = currentlyFocused === options.triggerRef.current
    const preservedIndex =
      currentlyFocused && !isTrigger ? completeSelectableList.indexOf(currentlyFocused) : -1

    if (preservedIndex !== -1) {
      focusIndexRef.current = preservedIndex
    } else if (currentlyFocused && completeSelectableList.length > 0) {
      const focusLost = !document.activeElement || document.activeElement === document.body
      if (focusLost) {
        const newIndex = Math.min(
          Math.max(0, focusIndexRef.current - 1),
          completeSelectableList.length - 1,
        )
        focusIndexRef.current = newIndex
        completeSelectableList[newIndex]?.focus()
        preserveFocusRef.current = completeSelectableList[newIndex]
      } else {
        preserveFocusRef.current = null
        focusIndexRef.current = 0
      }
    } else if (currentlyFocused && completeSelectableList.length === 0) {
      options.triggerRef.current?.focus()
      preserveFocusRef.current = null
      focusIndexRef.current = 0
    } else {
      focusIndexRef.current = 0
    }

    // Sync roving tabindex after list update
    if (options.rovingTabindex && completeSelectableList.length > 0) {
      completeSelectableList.forEach((el, i) =>
        el.setAttribute('tabindex', i === focusIndexRef.current ? '0' : '-1'),
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEffectivelyActive, containerRef, options.triggerRef, selectors, options.portalEl, options.value])

  const focusElement = (index: number) => {
    const el = focusableElRef.current[index]
    if (el) {
      // Roving tabindex: O(1) — only update previous and new element
      if (options.rovingTabindex) {
        const prev = focusableElRef.current[focusIndexRef.current]
        if (prev && prev !== el) prev.setAttribute('tabindex', '-1')
        el.setAttribute('tabindex', '0')
      }
      focusIndexRef.current = index
      el.focus()
      preserveFocusRef.current = el
      el.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    }
  }

  return { focusableElRef, focusIndexRef, preserveFocusRef, focusElement }
}
