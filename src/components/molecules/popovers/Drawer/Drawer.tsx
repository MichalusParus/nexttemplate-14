'use client'
import { useTranslations } from 'next-intl'
import {
  forwardRef,
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
import { StyleProps } from '@/components/types'
// import { useFocus } from '@/utils/hooks/useFocus'
import { cn } from '@/utils/utils'

import { closeClass, drawerClass, openClass } from './Drawer.style'

export type DrawerProps = Omit<StyleProps, 'size'> & {
  /** for passing tailwind classes to Paper through props */
  className?: string
  /** name string serves as id for aria purposes and as secondary aria label */
  name: string
  /** boolean for open state */
  isOpen: boolean
  /** optional label for drawer */
  label?: string
  /** position of drawer */
  placement?: 'left' | 'right'
  /** for setting top or bottom offset from relative parent */
  offsetY?: string
  /** for setting component width as tailwind class */
  width?: string
  /** for setting internal padding of Paper component */
  padding?: string
  /** optional id for portal container */
  portalContainerId?: string
  /** for passing aditional props to Paper */
  paperProps?: Partial<PaperProps>
  /** for passing aditional props to Scrollshadow */
  scrollShadowProps?: Partial<ScrollShadowProps>
  /** drawer closing function */
  onClose?: () => void
}

// tests
// stories check
// rethink scroll hide or make it optional, modal prop

/** Drawer is controled menu popover that appears from sides of relative parent. Paper and ScrollShadow props supported. USE CLIENT */
export const Drawer = forwardRef<HTMLDivElement | null, PropsWithChildren<DrawerProps>>(
  (
    {
      className,
      name,
      isOpen,
      label,
      placement = 'left',
      variant = 'outlined',
      color = 'primary',
      offsetY = 'top-0 bottom-0',
      width = 'w-1/3',
      padding = 'p-0',
      portalContainerId,
      paperProps = {},
      scrollShadowProps = {},
      children,
      onClose = () => {},
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const componentRef = useRef<HTMLDivElement | null>(null)
    const [isMounted, setIsMounted] = useState(false)
    const [startTransition, setStartTransition] = useState(false)
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
      ref,
      () => componentRef.current,
    )
    const { className: paperClassName, ...restPaperProps } = paperProps
    // const { focusableEl } = useFocus(
    //   isOpen,
    //   componentRef,
    //   ['[tabindex]:not([tabindex="-1"])', '.Link'],
    //   onClose,
    // )

    const handleClose = () => {
      // if (focusableEl[0]) {
      //   focusableEl[0].focus()
      // }
      onClose()
    }

    useEffect(() => {
      setIsMounted(true)
      if (isOpen) {
        document.body.style.overflow = 'hidden'
        setStartTransition(true)
      } else {
        document.body.style.overflow = ''
        setStartTransition(false)
      }
      return () => {
        document.body.style.overflow = ''
      }
    }, [isOpen])

    if (!isMounted || !isOpen) return null

    const container = portalContainerId
      ? document.getElementById(portalContainerId) || document.body
      : document.body

    return createPortal(
      <>
        <aside
          id={name}
          className={cn(
            'Drawer',
            drawerClass,
            offsetY,
            width,
            closeClass[placement],
            startTransition && openClass[placement],
            className,
          )}
          ref={componentRef}
          role="dialog"
          aria-modal="true"
          aria-hidden={!isOpen}
          aria-label={label || t('drawer')}
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
        <Overlay isOpen={isOpen} onClose={handleClose} />
      </>,
      container,
    )
  },
)

Drawer.displayName = 'Drawer'
