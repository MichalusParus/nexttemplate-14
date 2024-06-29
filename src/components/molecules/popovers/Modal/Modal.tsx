'use client'
import Overlay from '@atoms/common/Overlay'
import { ReactNode, useEffect } from 'react'

import Button from '@/components/atoms/common/Button'
import Paper from '@/components/atoms/containers/Paper'
import ScrollShadow from '@/components/atoms/containers/ScrollShadow'
import XIcon from '@/components/atoms/icons/XIcon'
import Title from '@/components/atoms/typography/Title'
import { useFocusTrap } from '@/utils/hooks/useFocusTrap'

import { closeClass, openClass, positionClass } from './Modal.style'

export type ModalProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** name string serves as id for aria purposes and as secondary aria label */
  name: string
  /** boolean for open state */
  isOpen: boolean
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'none'
  /** optional title for modal window */
  title?: string
  /** for choosing heading type */
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /** for setting diffrent modal width than default value as tailwind class */
  width?: string
  /** for setting diffrent modal padding than default value as tailwind class */
  padding?: string
  /** for passing actions buttons to modal by props */
  modalActions?: ReactNode
  /** boolean for adding close button into modal actions */
  closeButton?: boolean
  /** boolean for hiding closing XIcon button */
  hideXIcon?: boolean
  /** children */
  children: ReactNode
  /** modal closing function */
  onClose: () => void
}

/** Popover dialog modal component with customizable actions. */
export const Modal = ({
  className = '',
  name,
  isOpen,
  variant = 'outlined',
  color = 'primary',
  title,
  titleVariant = 'h3',
  width = 'w-full md:w-auto min-w-64',
  padding = 'py-2 px-2 md:pb-3 md:px-5',
  modalActions,
  closeButton,
  hideXIcon,
  children,
  onClose,
}: ModalProps) => {
  const { componentRef, startRef } = useFocusTrap(isOpen, onClose)

  const handleClose = () => {
    startRef?.current?.focus()
    onClose()
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
  }, [isOpen])

  return (
    <>
      <div
        id={name}
        className={`Modal ${width} ${positionClass} ${isOpen ? openClass : closeClass}`}
        ref={componentRef}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        aria-label={title || name}
      >
        <Paper
          className={`${className} relative h-full w-full`}
          variant={variant}
          color={color}
          padding={padding}
        >
          <div className="ModalTitleWrap pb-8">
            {title ? (
              <Title
                variant={titleVariant}
                color={variant === 'contained' ? 'none' : color}
                align="text-center"
                size="xl"
              >
                {title}
              </Title>
            ) : null}
            {!hideXIcon ? (
              <Button
                className="absolute right-0 top-0"
                variant={'text'}
                color={variant === 'contained' ? 'none' : color}
                size="lg"
                startIcon={<XIcon />}
                onClick={handleClose}
                aria-label="close"
              />
            ) : null}
          </div>
          <ScrollShadow height="max-h-[75vh]">{children}</ScrollShadow>
          <div className="ComboboxWrap flex justify-end gap-3 pt-8">
            {closeButton ? (
              <Button
                variant="text"
                color={variant === 'contained' ? 'none' : color}
                onClick={handleClose}
              >
                Close
              </Button>
            ) : null}
            {modalActions}
          </div>
        </Paper>
      </div>
      <Overlay isOpen={isOpen} onClose={handleClose} dark />
    </>
  )
}
