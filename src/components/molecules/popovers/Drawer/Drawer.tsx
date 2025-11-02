'use client'
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
import { useNonModalDropdown } from '@/components/utils/hooks/useNonModalDropdown'
import { NativeDivProps, StyleProps } from '@/components/utils/types'
// import { useFocus } from '@/utils/hooks/useFocus'
import { cn } from '@/utils/utils'

import { closeClass, drawerClass, openClass } from './Drawer.style'

export type DrawerProps = NativeDivProps &
  Omit<StyleProps, 'size'> & {
    /** for passing tailwind classes to Paper through props */
    className?: string
    /** name string serves as id for aria purposes and as secondary aria label */
    name: string
    /** boolean for open state */
    isOpen: boolean
    /** Anchor ref for non-modal behaviour */
    anchorRef: MutableRefObject<HTMLDivElement | HTMLButtonElement | null>
    /** optional label for drawer */
    label?: string
    /** position of drawer */
    placement?: 'left' | 'right'
    /** for setting top or bottom offset from relative parent as tailwind class */
    offsetY?: string
    /** for setting component width as tailwind class */
    width?: string
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
    /** drawer closing function */
    onClose: () => void
  }

/** Drawer is controled menu popover that appears from sides of relative parent. Paper and ScrollShadow props supported. USE CLIENT */
export const Drawer = forwardRef<HTMLDivElement | null, PropsWithChildren<DrawerProps>>(
  (
    {
      className,
      name,
      isOpen,
      anchorRef,
      label,
      placement = 'left',
      offsetY = 'top-0 bottom-0',
      variant = 'outlined',
      color = 'primary',
      width = 'w-1/3',
      padding = 'p-0',
      modal = false,
      portalContainerId,
      paperProps = {},
      scrollShadowProps = {},
      onClose,
      children,
      ...rest
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const componentRef = useRef<HTMLDivElement | null>(null)
    useNonModalDropdown(isOpen, anchorRef, componentRef.current, modal, onClose)
    const [isVisible, setIsVisible] = useState(false)
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
      ref,
      () => componentRef.current,
    )
    const { className: paperClassName, ...restPaperProps } = paperProps

    useEffect(() => {
      let timerId: NodeJS.Timeout
      if (isOpen) {
        setIsVisible(true)
      } else {
        timerId = setTimeout(() => setIsVisible(false), 150)
      }
      if (modal) {
        document.body.style.overflow = isOpen ? 'hidden' : ''
      }
      return () => {
        if (timerId) clearTimeout(timerId)
        if (modal) {
          document.body.style.overflow = ''
        }
      }
    }, [isOpen, modal])

    if (!isOpen && !isVisible) return null

    const container = portalContainerId
      ? document.getElementById(portalContainerId) || document.body
      : document.body

    return createPortal(
      <>
        {modal && <Overlay isOpen={isOpen} onClose={onClose} />}
        <aside
          id={name}
          className={cn(
            'Drawer',
            drawerClass,
            offsetY,
            width,
            closeClass[placement],
            isVisible && isOpen && openClass[placement],
            className,
          )}
          ref={componentRef}
          role={modal ? 'dialog' : undefined}
          aria-label={label || t('drawer')}
          aria-modal={modal}
          data-testid="Drawer"
          {...rest}
        >
          <Paper
            className={cn('relative h-full', paperClassName)}
            variant={variant}
            color={color}
            padding={padding}
            rounded={placement === 'left' ? 'rounded-r-md' : 'rounded-l-md'}
            {...restPaperProps}
          >
            <ScrollShadow {...scrollShadowProps}>{children}</ScrollShadow>
          </Paper>
        </aside>
      </>,
      container,
    )
  },
)

Drawer.displayName = 'Drawer'
