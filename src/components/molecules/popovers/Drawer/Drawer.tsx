import Overlay from '@/components/atoms/common/Overlay'
import Paper from '@/components/atoms/containers/Paper'
import ScrollShadow from '@/components/atoms/containers/ScrollShadow'
import Title from '@/components/atoms/typography/Title'
import { useFocusTrap } from '@/utils/hooks/useFocusTrap'

import { closeClass, drawerClass, openClass } from './Drawer.style'

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
  color?: 'primary' | 'secondary' | 'none'
  /** optional title for modal window */
  title?: string
  /** for choosing heading type */
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /** for setting top offset from relative parent */
  top?: string
  /** for setting component width as tailwind class */
  width?: string
  /** for setting internal padding of Paper component */
  padding?: string
  /** optional for disabling overlay */
  hideOverlay?: boolean
  /** children */
  children: React.ReactNode
  /** drawer closing function */
  onClose: () => void
}

/** Drawer is menu popover that appears from sides of relative parent. */
export const Drawer = ({
  className = '',
  name,
  isOpen,
  placement = 'left',
  variant = 'outlined',
  color = 'primary',
  title,
  titleVariant = 'h3',
  top = 'top-0',
  width = 'w-1/3',
  padding = 'p-0',
  hideOverlay,
  children,
  onClose,
}: DrawerProps) => {
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
        className={`Drawer ${className} ${drawerClass} ${top} ${width} ${isOpen ? openClass[placement] : closeClass[placement]}`}
        ref={componentRef}
        role="menu"
        aria-label={title || name}
      >
        <Paper
          className={`${className} h-full`}
          variant={variant}
          color={color}
          padding={padding}
          rounded={placement === 'left' ? 'rounded-r-md' : 'rounded-l-md'}
        >
          {title ? (
            <Title variant={titleVariant} color={color} align="text-center" size="lg">
              {title}
            </Title>
          ) : null}
          <ScrollShadow height="h-full">{children}</ScrollShadow>
        </Paper>
      </div>
      {!hideOverlay ? <Overlay isOpen={isOpen} onClose={handleClose} dark /> : null}
    </>
  )
}
