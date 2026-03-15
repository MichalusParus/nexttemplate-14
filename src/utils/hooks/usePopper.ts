import { createPopper, Instance, Placement } from '@popperjs/core'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/** usePopper hook is used for positioning popovers in portals. AnchorRef is for div wrap of combobox, popoverEl is for popover itself and setPopoverEl is for setting popover element. */
export const usePopper = (
  anchorRef: React.RefObject<HTMLElement | null>,
  placement?: Placement,
  offset?: [number, number],
) => {
  const popperRef = useRef<Instance | null>(null)
  const [popoverEl, setPopoverEl] = useState<HTMLDivElement | null>(null)
  const [adjustedPlacement, setAdjustedPlacement] = useState<Placement>(placement || 'auto')

  // Store placement/offset in refs to avoid destroying Popper on identity changes
  // (e.g. inline arrays like [0, -2] get new identity every render)
  const placementRef = useRef(placement)
  const offsetRef = useRef(offset)
  placementRef.current = placement
  offsetRef.current = offset

  // Create/destroy Popper only when popoverEl or anchorRef change
  // useLayoutEffect ensures positioning happens before useImperativeHandle exposes the ref,
  // so consumers (like Menu hover system) never see the element at position (0,0).
  useLayoutEffect(() => {
    if (anchorRef.current && popoverEl) {
      popperRef.current = createPopper(anchorRef.current, popoverEl, {
        placement: placementRef.current || 'auto',
        onFirstUpdate: state => {
          setAdjustedPlacement(state.placement || 'auto')
        },
        modifiers: [
          { name: 'offset', options: { offset: offsetRef.current || [0, 10] } },
          { name: 'flip', options: { padding: 10 } },
        ],
      })
      // Force recalculate after parent poppers have positioned their containers.
      // Without this, nested poppers (e.g. submenu inside a dropdown) calculate
      // position using the anchor's initial position before the parent popper
      // moves the container via transform.
      requestAnimationFrame(() => {
        popperRef.current?.update()
      })
    }
    return () => {
      popperRef.current?.destroy()
      popperRef.current = null
    }
  }, [popoverEl, anchorRef])

  // Update options without destroying when placement/offset change at runtime
  useEffect(() => {
    if (popperRef.current) {
      popperRef.current.setOptions({
        placement: placement || 'auto',
        modifiers: [
          { name: 'offset', options: { offset: offset || [0, 10] } },
          { name: 'flip', options: { padding: 10 } },
        ],
      })
    }
    // Use individual values to avoid re-running on array identity change
    // (inline arrays like [0, -2] get new identity every render)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placement, offset?.[0], offset?.[1]])

  return {
    popoverEl,
    adjustedPlacement,
    setPopoverEl,
  }
}
