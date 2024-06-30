'use client'
import { forwardRef, PropsWithChildren, useImperativeHandle } from 'react'

import Overlay from '@/components/atoms/common/Overlay'
import Paper from '@/components/atoms/containers/Paper'
import { PaperProps } from '@/components/atoms/containers/Paper/Paper'
import ScrollShadow from '@/components/atoms/containers/ScrollShadow'
import { ScrollShadowProps } from '@/components/atoms/containers/ScrollShadow/ScrollShadow'
import { useFocusTrap } from '@/utils/hooks/useFocusTrap'

import { closeClass, drawerClass, openClass } from './Drawer.style'
import { cn, filterOutKeys } from '@/utils/utils'

export type DrawerProps = {
  /** for passing tailwind classes to Paper through props */
  className?: string
  /** name string serves as id for aria purposes and as secondary aria label */
  name: string
  /** boolean for open state */
  isOpen: boolean
  /** position of drawer */
  placement?: 'left' | 'right'
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
  /** for setting top or bottom offset from relative parent */
  offsetY?: string
  /** for setting component width as tailwind class */
  width?: string
  /** for setting internal padding of Paper component */
  padding?: string
  /** optional for disabling overlay */
  hideOverlay?: boolean
  /** for passing aditional props to Paper */
  paperProps?: Partial<PaperProps>
  /** for passing aditional props to Scrollshadow */
  scrollShadowProps?: Partial<ScrollShadowProps>
  /** drawer closing function */
  onClose: () => void
}

/** Drawer is controled menu popover that appears from sides of relative parent. Should contain somponents with role menuitem. Paper and ScrollShadow props supported. USE CLIENT */
export const Drawer = forwardRef<HTMLDivElement, PropsWithChildren<DrawerProps>>(
  (
    {
      className = '',
      name,
      isOpen,
      placement = 'left',
      variant = 'outlined',
      color = 'primary',
      offsetY = 'top-0 bottom-0',
      width = 'w-1/3',
      padding = 'p-0',
      hideOverlay,
      paperProps = {},
      scrollShadowProps = {},
      children,
      onClose,
    },
    ref,
  ) => {
    useImperativeHandle(ref, () => componentRef.current!)
    const { componentRef, startRef } = useFocusTrap(isOpen, onClose, [
      'button',
      '[href]',
      '[tabindex]:not([tabindex="-1"])',
    ])

    const handleClose = () => {
      startRef?.current?.focus()
      onClose()
    }

    return (
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
            className={cn(`relative h-full`, paperProps.className)}
            variant={variant}
            color={color}
            padding={padding}
            rounded={placement === 'left' ? 'rounded-r-md' : 'rounded-l-md'}
            {...filterOutKeys(paperProps, ['className'])}
          >
            <ScrollShadow {...scrollShadowProps}>{children}</ScrollShadow>
          </Paper>
        </div>
        {!hideOverlay ? <Overlay isOpen={isOpen} onClose={handleClose} dark /> : null}
      </>
    )
  },
)

Drawer.displayName = 'Drawer'
