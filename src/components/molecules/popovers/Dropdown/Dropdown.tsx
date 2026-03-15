'use client'
import { Placement } from '@popperjs/core'
import { useTranslations } from 'next-intl'
import {
  forwardRef,
  MutableRefObject,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

import { Overlay } from '@/components/atoms/common/Overlay'
import { Paper } from '@/components/atoms/containers/Paper'
import { PaperProps } from '@/components/atoms/containers/Paper/Paper'
import { ScrollShadow } from '@/components/atoms/containers/ScrollShadow'
import { ScrollShadowProps } from '@/components/atoms/containers/ScrollShadow/ScrollShadow'
import { useFocus } from '@/components/utils/hooks/useFocus'
import { usePortalContainer } from '@/components/utils/hooks/usePortalContainer'
import { NativeDivProps, StyleProps } from '@/components/utils/types'
import { usePopper } from '@/utils/hooks/usePopper'
import { cn } from '@/utils/utils'

export type DropdownProps = NativeDivProps &
  Omit<StyleProps, 'size'> & {
    /** for passing custom tailwind classes */
    className?: string
    /** boolean for open state */
    isOpen: boolean
    /** Anchor ref for portal position */
    anchorRef: MutableRefObject<HTMLDivElement | HTMLButtonElement | null>
    /** optional label for dropdown */
    label?: string
    /** position of dropdown */
    placement?: Placement
    /** offset of dropdown */
    offset?: [number, number]
    /** for setting component width as inline css style */
    width?: number | string
    /** for setting component height or maxHeight as tailwind class */
    height?: string
    /** for setting horizontal content padding as tailwind class */
    paddingX?: string
    /** for setting vertical Paper padding as tailwind class */
    paddingY?: string
    /** optional for modal overlay */
    modal?: boolean
    /** optional id for portal container */
    portalContainerId?: string
    /** optional boolean for disabling portal */
    disablePortal?: boolean
    /** optional function returning array of submenu refs for useNonModalDropdown hook */
    submenuRefs?: () => (HTMLElement | null)[]
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
      anchorRef,
      label,
      placement = 'bottom',
      offset = [0, 5],
      variant = 'text',
      color = 'primary',
      width,
      height = 'max-h-[40vh]',
      paddingX = '',
      paddingY = '',
      modal = false,
      portalContainerId,
      disablePortal,
      submenuRefs,
      paperProps = {},
      scrollShadowProps = {},
      onClose,
      children,
      ...rest
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const nullRef = useRef<HTMLElement | null>(null)
    const { popoverEl, setPopoverEl } = usePopper(anchorRef, placement, offset)
    useFocus(isOpen, modal ? nullRef : anchorRef, {
      portalEl: popoverEl,
      dismiss: modal ? 'modal' : 'non-modal',
      onToggle: (open) => !open && onClose(),
      submenuRefs,
      ...(modal && { triggerRef: nullRef }),
    })
    const [isVisible, setIsVisible] = useState(false)
    const container = usePortalContainer(portalContainerId)
    useImperativeHandle<HTMLElement | null, HTMLElement | null>(ref, () => popoverEl, [popoverEl])
    const { className: paperClassName, ...restPaperProps } = paperProps

    useEffect(() => {
      if (isOpen) setIsVisible(true)
      else {
        const timer = setTimeout(() => setIsVisible(false), 150)
        return () => clearTimeout(timer)
      }
    }, [isOpen])

    if (!isVisible && !isOpen) return null

    const renderDropdown = () => {
      return (
        <>
          {modal && <Overlay isOpen={isOpen} onClose={onClose} />}
          <div
            className={cn(
              'Dropdown',
              'easy-in-out absolute z-modal opacity-0 transition-opacity duration-150',
              isVisible && isOpen && 'opacity-100',
              className,
            )}
            style={{
              width: width ? width : anchorRef.current?.clientWidth,
            }}
            ref={setPopoverEl}
            role={modal ? 'dialog' : undefined}
            aria-label={label || t('dropdown')}
            aria-modal={modal}
            data-testid="Dropdown"
            {...rest}
          >
            <Paper
              className={cn('overflow-hidden', paperClassName)}
              variant={variant}
              color={color}
              padding={paddingY}
              {...restPaperProps}
            >
              <ScrollShadow height={height} padding={paddingX} {...scrollShadowProps}>
                {children}
              </ScrollShadow>
            </Paper>
          </div>
        </>
      )
    }

    if (disablePortal) return renderDropdown()
    if (!container) return null

    return createPortal(renderDropdown(), container)
  },
)

Dropdown.displayName = 'Dropdown'
