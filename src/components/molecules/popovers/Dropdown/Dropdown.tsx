import { forwardRef, PropsWithChildren } from 'react'

import Overlay from '@/components/atoms/common/Overlay'
import Paper from '@/components/atoms/containers/Paper'
import { PaperProps } from '@/components/atoms/containers/Paper/Paper'
import ScrollShadow from '@/components/atoms/containers/ScrollShadow'
import { ScrollShadowProps } from '@/components/atoms/containers/ScrollShadow/ScrollShadow'
import { cn, filterOutKeys } from '@/utils/utils'

import { closeClass, dropdownClass, openClass } from './Dropdown.style'

export type DropdownProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** boolean for open state */
  isOpen: boolean
  /** position of dropdown */
  placement?: 'relative' | 'left' | 'right' | 'top'
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
  /** for setting component width as tailwind class */
  width?: string
  /** for setting component height or maxHeight as tailwind class */
  height?: string
  /** for setting internal padding of Paper component */
  padding?: string
  /** optional for disabling overlay */
  hideOverlay?: boolean
  /** hide dropdown shadow */
  hideShadow?: boolean
  /** for passing aditional props to Paper */
  paperProps?: Partial<PaperProps>
  /** for passing aditional props to Scrollshadow */
  scrollShadowProps?: Partial<ScrollShadowProps>
  /** dropdown closing function */
  onClose: () => void
}

/** Multirole dropdown popover, dropping down from relative parent. Paper and ScrollShadow props supported. */
export const Dropdown = forwardRef<HTMLDivElement, PropsWithChildren<DropdownProps>>(
  (
    {
      className = '',
      isOpen,
      placement = 'relative',
      variant = 'text',
      color = 'primary',
      width = 'w-full',
      height = 'max-h-[40vh]',
      padding = 'p-0',
      hideOverlay,
      hideShadow,
      paperProps = {},
      scrollShadowProps = {},
      onClose,
      children,
    },
    ref,
  ) => {
    return (
      <>
        <div
          className={cn(
            'Dropdown',
            dropdownClass,
            width,
            isOpen ? openClass[placement] : closeClass[placement],
            className,
          )}
          ref={ref}
          data-testid="Dropdown"
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
        {hideOverlay || placement === 'relative' ? null : (
          <Overlay isOpen={isOpen} onClose={onClose} />
        )}
      </>
    )
  },
)

Dropdown.displayName = 'Dropdown'
