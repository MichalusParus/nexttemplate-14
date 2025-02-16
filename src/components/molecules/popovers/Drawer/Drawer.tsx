'use client'
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
import { useFocus } from '@/utils/hooks/useFocus'
import { cn } from '@/utils/utils'

import { closeClass, drawerClass, openClass } from './Drawer.style'

export type DrawerProps = Omit<StyleProps, 'size'> & {
  /** for passing tailwind classes to Paper through props */
  className?: string
  /** name string serves as id for aria purposes and as secondary aria label */
  name: string
  /** boolean for open state */
  isOpen: boolean
  /** position of drawer */
  placement?: 'left' | 'right'
  /** for setting top or bottom offset from relative parent */
  offsetY?: string
  /** for setting component width as tailwind class */
  width?: string
  /** for setting internal padding of Paper component */
  padding?: string
  /** optional id for portal container */
  portalContainer?: string
  /** for passing aditional props to Paper */
  paperProps?: Partial<PaperProps>
  /** for passing aditional props to Scrollshadow */
  scrollShadowProps?: Partial<ScrollShadowProps>
  /** drawer closing function */
  onClose?: () => void
}

/** Drawer is controled menu popover that appears from sides of relative parent. Should contain somponents with role menuitem. Paper and ScrollShadow props supported. USE CLIENT */
export const Drawer = forwardRef<HTMLDivElement, PropsWithChildren<DrawerProps>>(
  (
    {
      className,
      name,
      isOpen,
      placement = 'left',
      variant = 'outlined',
      color = 'primary',
      offsetY = 'top-0 bottom-0',
      width = 'w-1/3',
      padding = 'p-0',
      portalContainer,
      paperProps = {},
      scrollShadowProps = {},
      children,
      onClose = () => {},
    },
    ref,
  ) => {
    const componentRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => componentRef.current!)
    const [mounted, setMounted] = useState(false)
    const { className: paperClassName, ...restPaperProps } = paperProps
    const container = portalContainer ? document.getElementById(portalContainer) : undefined
    const { focusableEl } = useFocus(
      isOpen,
      componentRef,
      ['[tabindex]:not([tabindex="-1"])', '.Link'],
      onClose,
    )

    const handleClose = () => {
      if (focusableEl[0]) {
        focusableEl[0].focus()
      }
      onClose()
    }

    useEffect(() => {
      document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    }, [isOpen])

    useEffect(() => {
      setMounted(true)
    }, [])

    return (
      <>
        {mounted &&
          createPortal(
            <>
              <div
                id={name}
                className={cn(
                  'Drawer',
                  drawerClass,
                  offsetY,
                  width,
                  isOpen ? openClass[placement] : closeClass[placement],
                  className,
                )}
                ref={componentRef}
                role="menu"
                aria-hidden={!isOpen}
                aria-label={name}
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
              </div>
              <Overlay isOpen={isOpen} onClose={handleClose} />
            </>,
            container ? container : document.body,
          )}
      </>
    )
  },
)

Drawer.displayName = 'Drawer'
