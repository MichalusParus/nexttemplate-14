'use client'

import { useTranslations } from 'next-intl'
import {
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

import { Button } from '@/components/atoms/common/Button'
import { ButtonProps } from '@/components/atoms/common/Button/Button'
import { Combobox } from '@/components/atoms/common/Combobox'
import { ComboboxProps } from '@/components/atoms/common/Combobox/Combobox'
import { Overlay } from '@/components/atoms/common/Overlay'
import { Paper } from '@/components/atoms/containers/Paper'
import { PaperProps } from '@/components/atoms/containers/Paper/Paper'
import { ScrollShadow } from '@/components/atoms/containers/ScrollShadow'
import { XIcon } from '@/components/atoms/icons'
import { Title } from '@/components/atoms/typography/Title'
import { TitleProps } from '@/components/atoms/typography/Title/Title'
import { StyleProps } from '@/components/types'
import { useFocus } from '@/utils/hooks/useFocus'
import { cn, filterOutKeys } from '@/utils/utils'

import { closeClass, modalPosition, openClass } from './Modal.style'

export type ModalProps = Omit<StyleProps, 'size'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** name string serves as id for aria purposes and as secondary aria label */
  name: string
  /** boolean for open state */
  isOpen?: boolean
  /** optional title for modal window */
  title?: string
  /** for setting diffrent modal width than default value as tailwind class */
  width?: string
  /** for setting diffrent modal padding than default value as tailwind class */
  padding?: string
  /** for passing actions buttons to modal by props */
  modalActions?: ReactNode
  /** boolean for adding close button into modal actions */
  closeButton?: boolean
  /** boolean for hiding closing XIcon button */
  hideXButton?: boolean
  /** for passing aditional props to combobox */
  comboboxProps?: Partial<ComboboxProps>
  /** for passing aditional props to paper */
  paperProps?: Partial<PaperProps>
  /** for passing aditional props to title */
  titleProps?: Partial<TitleProps>
  /** for passing aditional props to action close button */
  buttonProps?: Partial<ButtonProps>
  /** modal closing function */
  setIsOpen?: (value: boolean) => void
}

/** Popover dialog modal component with customizable actions. Combobox, Paper, Title and Button props supported. USE CLIENT */
export const Modal = forwardRef<HTMLDivElement, PropsWithChildren<ModalProps>>(
  (
    {
      className,
      name,
      isOpen,
      variant = 'outlined',
      color = 'primary',
      title,
      width = 'w-full md:w-auto min-w-64',
      padding = 'py-2 px-2 md:pb-3 md:px-5',
      modalActions,
      closeButton,
      hideXButton,
      comboboxProps = { children: 'ModalCombobox' },
      paperProps = {},
      titleProps = {},
      buttonProps = {},
      setIsOpen,
      children,
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const componentRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => componentRef.current!)
    const [isLocallyOpen, setIsLocallyOpen] = useState(Boolean(isOpen))
    const [mounted, setMounted] = useState(false)
    const openState = setIsOpen ? Boolean(isOpen) : isLocallyOpen
    const modalOpenClass = openState ? openClass : closeClass
    const { focusableEl } = useFocus(
      openState,
      componentRef,
      ['[tabindex]:not([tabindex="-1"])', '.Link'],
      setIsOpen ? () => setIsOpen(!isOpen) : () => setIsLocallyOpen(prev => !prev),
      { trap: true },
    )

    const handleClose = () => {
      if (setIsOpen) {
        setIsOpen(!isOpen)
      } else {
        setIsLocallyOpen(prev => !prev)
      }
      focusableEl[0].focus()
    }

    useEffect(() => {
      setMounted(true)
    }, [])

    useEffect(() => {
      document.body.style.overflow = openState ? 'hidden' : 'unset'
    }, [openState])

    return (
      <>
        {!setIsOpen && (
          <Combobox
            name={name}
            isOpen={openState}
            hasPopup="menu"
            variant={variant}
            color={color}
            onClick={handleClose}
            {...comboboxProps}
          />
        )}
        {mounted &&
          createPortal(
            <div
              id={name}
              className={cn('Modal', width, modalPosition, modalOpenClass, className)}
              ref={componentRef}
              role="dialog"
              aria-modal="true"
              aria-hidden={!openState}
              aria-label={title || name}
            >
              <Paper
                className={cn('relative h-full w-full shadow-modal', paperProps.className)}
                variant={variant}
                color={color}
                padding={padding}
                {...filterOutKeys(paperProps, ['className'])}
              >
                <div className={cn('ModalTitleWrap', 'pb-8')}>
                  {title && (
                    <Title
                      color={variant === 'contained' ? 'none' : color}
                      align="text-center"
                      size="xl"
                      {...titleProps}
                    >
                      {title}
                    </Title>
                  )}
                  {!hideXButton && (
                    <Button
                      className={cn('XButton', 'absolute right-0 top-0 border-none')}
                      variant={variant}
                      color={color}
                      size="lg"
                      startIcon={<XIcon />}
                      hideShadow
                      onClick={handleClose}
                      aria-label={t('close')}
                    />
                  )}
                </div>
                <ScrollShadow height="max-h-[75vh]">{children}</ScrollShadow>
                <div className={cn('ModalActions', 'flex justify-end gap-3 pt-8')}>
                  {closeButton && (
                    <Button
                      className={cn('CloseButton', 'border-none', buttonProps.className)}
                      variant={variant}
                      color={color}
                      hideShadow
                      onClick={handleClose}
                      {...filterOutKeys(buttonProps, ['className'])}
                    >
                      Close
                    </Button>
                  )}
                  {modalActions}
                </div>
              </Paper>
            </div>,
            document.body,
          )}
        <Overlay isOpen={openState} onClose={handleClose} dark />
      </>
    )
  },
)

Modal.displayName = 'Modal'
