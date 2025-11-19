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
import { Overlay } from '@/components/atoms/common/Overlay'
import { Paper } from '@/components/atoms/containers/Paper'
import { PaperProps } from '@/components/atoms/containers/Paper/Paper'
import { ScrollShadow } from '@/components/atoms/containers/ScrollShadow'
import { XIcon } from '@/components/atoms/icons'
import { Title } from '@/components/atoms/typography/Title'
import { TitleProps } from '@/components/atoms/typography/Title/Title'
import { usePortalContainer } from '@/components/utils/hooks/usePortalContainer'
import { NativeDivProps, StyleProps } from '@/components/utils/types'
// import { useFocus } from '@/utils/hooks/useFocus'
import { cn } from '@/utils/utils'

import { closeClass, dialogPosition, openClass } from './Dialog.style'

export type DialogProps = NativeDivProps &
  Omit<StyleProps, 'size'> & {
    /** for passing custom tailwind classes */
    className?: string
    /** name string serves as id for aria purposes and as secondary aria label */
    name: string
    /** optional boolean default open or with setIsOpen for controlled open state */
    isOpen: boolean
    /** optional title for dialog window */
    title?: string
    /** optional label for dialog */
    label?: string
    /** for setting different dialog width than default value as tailwind class */
    width?: string
    /** for setting different dialog padding than default value as tailwind class */
    padding?: string
    /** for passing actions buttons to dialog by props */
    dialogActions?: ReactNode
    /** boolean for adding close button into dialog actions */
    closeButton?: boolean
    /** boolean for hiding closing XIcon button */
    hideXButton?: boolean
    /** optional id for portal container */
    portalContainerId?: string
    /** for passing aditional props to paper */
    paperProps?: Partial<PaperProps>
    /** for passing aditional props to title */
    titleProps?: Partial<TitleProps>
    /** optional setOpen function for controlled open state */
    setIsOpen: (value: boolean) => void
  }

/** Modal dialog component with customizable actions. Paper and Title props supported. USE CLIENT */
export const Dialog = forwardRef<HTMLDivElement | null, PropsWithChildren<DialogProps>>(
  (
    {
      className,
      name,
      isOpen,
      title,
      label,
      variant = 'outlined',
      color = 'primary',
      width = 'w-full md:w-auto min-w-64',
      padding = 'py-2 px-2 md:pb-3 md:px-5',
      dialogActions,
      closeButton,
      hideXButton,
      portalContainerId,
      paperProps = {},
      titleProps = {},
      setIsOpen,
      children,
      ...rest
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const componentRef = useRef<HTMLDivElement>(null)
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
      ref,
      () => componentRef.current,
    )
    const [isVisible, setIsVisible] = useState(false)
    const container = usePortalContainer(portalContainerId)
    const { className: paperClassName, ...restPaperProps } = paperProps

    // const { focusableEl } = useFocus(
    //   isOpen,
    //   componentRef,
    //   ['[tabindex]:not([tabindex="-1"])', '.Link'],
    //   () => setIsOpen(!isOpen),
    //   { trap: true },
    // )

    const handleClose = () => {
      setIsOpen(false)
    }

    useEffect(() => {
      if (typeof window === 'undefined') return

      let timerId: NodeJS.Timeout
      if (isOpen) {
        setIsVisible(true)
        document.body.style.overflow = 'hidden'
      } else {
        timerId = setTimeout(() => setIsVisible(false), 150)
        document.body.style.overflow = ''
      }
      return () => {
        if (timerId) clearTimeout(timerId)
        document.body.style.overflow = ''
      }
    }, [isOpen])

    if (!isOpen && !isVisible) return null
    if (!container) return null

    return createPortal(
      <>
        <div
          id={name}
          className={cn(
            'Dialog',
            width,
            dialogPosition,
            closeClass,
            isVisible && isOpen && openClass,
            className,
          )}
          role="dialog"
          aria-label={label || t('dialog')}
          aria-labelledby={title ? `${name}-title` : undefined}
          aria-modal="true"
          ref={componentRef}
          {...rest}
        >
          <Paper
            className={cn('shadow-dialog relative h-full w-full', paperClassName)}
            variant={variant}
            color={color}
            padding={padding}
            {...restPaperProps}
          >
            <div className={cn('DialogTitleWrap', 'pb-8')}>
              {title && (
                <Title
                  id={`${name}-title`}
                  variant="h3"
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
                  data-testid="XButton"
                />
              )}
            </div>
            <ScrollShadow height="max-h-[75vh]">{children}</ScrollShadow>
            <div className={cn('DialogActions', 'flex justify-end gap-3 pt-8')}>
              {closeButton && (
                <Button
                  className={cn('CloseButton', 'border-none')}
                  variant={variant}
                  color={color}
                  hideShadow
                  onClick={handleClose}
                  data-testid="CloseButton"
                >
                  {t('close')}
                </Button>
              )}
              {dialogActions}
            </div>
          </Paper>
        </div>
        <Overlay isOpen={isOpen} onClose={handleClose} dark />
      </>,
      container,
    )
  },
)

Dialog.displayName = 'Dialog'
