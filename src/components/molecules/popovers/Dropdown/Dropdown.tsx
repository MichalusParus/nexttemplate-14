'use client'
import { Placement } from '@popperjs/core'
import {
  forwardRef,
  HTMLAttributes,
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
import { StyleProps } from '@/components/types'
import { usePopper } from '@/utils/hooks/usePopper'
import { cn, filterOutKeys } from '@/utils/utils'

import { dropdownClass } from './Dropdown.style'

export type DropdownProps = HTMLAttributes<HTMLDivElement> &
  Omit<StyleProps, 'size'> & {
    /** for passing custom tailwind classes */
    className?: string
    /** boolean for open state */
    isOpen: boolean
    /** Parent ref for portal position */
    parentRef: MutableRefObject<HTMLDivElement | null>
    /** position of dropdown */
    placement: Placement
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
    /** hide dropdown shadow */
    hideShadow?: boolean
    /** for passing aditional props to Paper */
    paperProps?: Partial<PaperProps>
    /** for passing aditional props to Scrollshadow */
    scrollShadowProps?: Partial<ScrollShadowProps>
    /** dropdown closing function */
    onClose: () => void
  }

/** Multirole dropdown popover, dropping down from relative parent. Paper and ScrollShadow props supported. USE CLIENT */
export const Dropdown = forwardRef<HTMLDivElement, PropsWithChildren<DropdownProps>>(
  (
    {
      className,
      isOpen,
      parentRef,
      placement = 'bottom-start',
      offset = [0, 5],
      variant = 'text',
      color = 'primary',
      width,
      height = 'max-h-[40vh]',
      padding = 'p-0',
      modal,
      hideShadow,
      paperProps = {},
      scrollShadowProps = {},
      onClose,
      children,
      ...rest
    },
    ref,
  ) => {
    const [mounted, setMounted] = useState(false)
    const { anchorRef, popoverEl, setPopoverEl } = usePopper(placement, offset)
    useImperativeHandle(anchorRef, () => parentRef.current!)
    useImperativeHandle(ref, () => popoverEl!)

    useEffect(() => {
      setMounted(true)
    }, [])

    useEffect(() => {
      if (isOpen && !modal) {
        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
          const target = e.target as HTMLElement
          if (popoverEl && !popoverEl.contains(target) && !anchorRef.current?.contains(target)) {
            onClose()
          }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('touchstart', handleClickOutside)
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
          document.removeEventListener('touchstart', handleClickOutside)
        }
      }
    }, [popoverEl, modal, isOpen, anchorRef, onClose])

    return (
      <>
        {mounted &&
          createPortal(
            <>
              <div
                className={cn(
                  'Dropdown',
                  dropdownClass,
                  isOpen ? 'visible z-50 opacity-100' : 'invisible opacity-0',
                  className,
                )}
                style={{
                  width: width ? width : parentRef.current?.clientWidth,
                }}
                ref={setPopoverEl}
                data-testid="Dropdown"
                {...rest}
              >
                <Paper
                  className={cn('overflow-hidden', paperProps.className)}
                  variant={variant}
                  color={color}
                  padding={padding}
                  hideShadow={hideShadow}
                  {...filterOutKeys(paperProps, ['className'])}
                >
                  <ScrollShadow height={height} {...scrollShadowProps}>
                    {children}
                  </ScrollShadow>
                </Paper>
              </div>
            </>,
            document.body,
          )}
        {modal && <Overlay isOpen={isOpen} onClose={onClose} />}
      </>
    )
  },
)

Dropdown.displayName = 'Dropdown'
