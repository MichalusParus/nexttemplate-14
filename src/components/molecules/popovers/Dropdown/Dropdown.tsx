'use client'
import { Placement } from '@popperjs/core'
import {
  forwardRef,
  MutableRefObject,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

import { Overlay } from '@/components/atoms/common/Overlay'
import { Paper } from '@/components/atoms/containers/Paper'
import { PaperProps } from '@/components/atoms/containers/Paper/Paper'
import { ScrollShadow } from '@/components/atoms/containers/ScrollShadow'
import { ScrollShadowProps } from '@/components/atoms/containers/ScrollShadow/ScrollShadow'
import { NativeDivProps, StyleProps } from '@/components/types'
import { usePopper } from '@/utils/hooks/usePopper'
import { cn } from '@/utils/utils'

import { dropdownClass } from './Dropdown.style'

// close dropdown on blur, but dont if focus is in dropdown, maybe solve in dropdown

export type DropdownProps = NativeDivProps &
  Omit<StyleProps, 'size'> & {
    /** for passing custom tailwind classes */
    className?: string
    /** boolean for open state */
    isOpen: boolean
    /** Parent ref for portal position */
    parentRef: MutableRefObject<HTMLDivElement | HTMLButtonElement | null>
    /** position of dropdown */
    placement?: Placement
    /** offset of dropdown */
    offset?: [number, number]
    /** for setting component width as inline css style */
    width?: number | string
    /** for setting component height or maxHeight as tailwind class */
    height?: string
    /** for setting internal padding of Paper component */
    padding?: string
    /** optional for modal overlay */
    modal?: boolean
    /** optional id for portal container */
    portalContainerId?: string
    /** for passing aditional props to Paper */
    paperProps?: Partial<PaperProps>
    /** for passing aditional props to Scrollshadow */
    scrollShadowProps?: Partial<ScrollShadowProps>
    /** dropdown closing function */
    onClose: () => void
  }

/** Multirole dropdown popover in portal and popper. Paper and ScrollShadow props supported. USE CLIENT */
export const Dropdown = forwardRef<HTMLDivElement | null, PropsWithChildren<DropdownProps>>(
  (
    {
      className,
      isOpen,
      parentRef,
      placement = 'bottom',
      offset = [0, 5],
      variant = 'text',
      color = 'primary',
      width,
      height = 'max-h-[40vh]',
      padding = 'p-0',
      modal,
      portalContainerId,
      paperProps = {},
      scrollShadowProps = {},
      onClose,
      children,
      ...rest
    },
    ref,
  ) => {
    const { anchorRef, popoverEl, setPopoverEl } = usePopper(placement, offset)
    const [isMounted, setIsMounted] = useState(false)
    useImperativeHandle<HTMLElement | null, HTMLElement | null>(anchorRef, () => parentRef.current)
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => popoverEl)
    const { className: paperClassName, ...restPaperProps } = paperProps

    useEffect(() => setIsMounted(true), [])

    useEffect(() => {
      if (isOpen && !modal) {
        const controller = new AbortController()
        const signal = controller.signal
        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
          const target = e.target as HTMLElement
          if (popoverEl && !popoverEl.contains(target) && !anchorRef.current?.contains(target)) {
            onClose()
          }
        }

        document.addEventListener('mousedown', handleClickOutside, { signal })
        document.addEventListener('touchstart', handleClickOutside, { signal })
        parentRef.current?.addEventListener('focusout', onClose, { signal })
        popoverEl?.addEventListener('focusout', onClose, { signal })
        return () => {
          controller.abort()
        }
      }
    }, [popoverEl, modal, isOpen, anchorRef, parentRef, onClose])

    if (!isMounted || !isOpen) return null

    const container = portalContainerId
      ? document.getElementById(portalContainerId) || document.body
      : document.body

    return createPortal(
      <>
        {modal && <Overlay isOpen={isOpen} onClose={onClose} />}
        <div
          className={cn('Dropdown', dropdownClass, isOpen ? 'opacity-100' : 'opacity-0', className)}
          style={{
            width: width ? width : parentRef.current?.clientWidth,
          }}
          ref={setPopoverEl}
          role={modal ? 'dialog' : undefined}
          aria-modal={modal}
          aria-hidden={!isOpen}
          data-testid="Dropdown"
          {...rest}
        >
          <Paper
            className={cn('overflow-hidden', paperClassName)}
            variant={variant}
            color={color}
            padding={padding}
            {...restPaperProps}
          >
            <ScrollShadow height={height} {...scrollShadowProps}>
              {children}
            </ScrollShadow>
          </Paper>
        </div>
      </>,
      container,
    )
  },
)

Dropdown.displayName = 'Dropdown'
