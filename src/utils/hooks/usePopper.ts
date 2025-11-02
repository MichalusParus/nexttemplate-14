import { createPopper, Instance, Placement } from '@popperjs/core'
import { useEffect, useRef, useState } from 'react'

/** usePopper hook is used for positioning popovers in portals. AnchorRef is for div wrap of combobox, popoverEl is for popover itself and setPopoverEl is for setting popover element. */
export const usePopper = (
  anchorRef: React.RefObject<HTMLElement | null>,
  placement?: Placement,
  offset?: [number, number],
) => {
  const popperRef = useRef<Instance | null>(null)
  const [popoverEl, setPopoverEl] = useState<HTMLDivElement | null>(null)
  const [adjustedPlacement, setAdjustedPlacement] = useState<Placement>(placement || 'auto')

  useEffect(() => {
    if (anchorRef.current && popoverEl) {
      popperRef.current = createPopper(anchorRef.current, popoverEl, {
        placement: placement || 'auto',
        onFirstUpdate: state => {
          setAdjustedPlacement(state.placement || 'auto')
        },
        modifiers: [
          { name: 'offset', options: { offset: offset || [0, 10] } },
          { name: 'flip', options: { padding: 10 } },
        ],
      })
    }
    return () => {
      popperRef.current?.destroy()
      popperRef.current = null
    }
  }, [popoverEl, anchorRef, placement, offset])

  return {
    popoverEl,
    adjustedPlacement,
    setPopoverEl,
  }
}
