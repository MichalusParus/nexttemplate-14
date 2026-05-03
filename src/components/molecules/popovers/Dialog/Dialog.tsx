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
import { devWarning } from '@/components/utils/devWarning'
import { useFocus } from '@/components/utils/hooks/useFocus'
import { usePortalContainer } from '@/components/utils/hooks/usePortalContainer'
import { NativeDivProps, StyleProps } from '@/components/utils/types'
import { useTouch } from '@/utils/hooks/useTouch'
import { cn } from '@/utils/utils'

import {
  closeClass,
  closeClassCentered,
  dialogPosition,
  dialogPositionCentered,
  openClass,
  openClassCentered,
} from './Dialog.style'

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
    /** for setting horizontal content padding as tailwind class */
    paddingX?: string
    /** for setting vertical Paper padding as tailwind class */
    paddingY?: string
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
    /** disable bottom sheet on mobile — keep centered dialog at all breakpoints */
    disableBottomSheet?: boolean
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
      paddingX = 'px-2 md:px-5',
      paddingY = 'py-2 md:pb-3',
      dialogActions,
      closeButton,
      hideXButton,
      disableBottomSheet,
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
    const [componentEl, setComponentEl] = useState<HTMLDivElement | null>(null)
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => componentEl)
    const [isVisible, setIsVisible] = useState(false)
    const container = usePortalContainer(portalContainerId)
    const { className: paperClassName, ...restPaperProps } = paperProps

    const positionClass = disableBottomSheet ? dialogPositionCentered : dialogPosition
    const openCls = disableBottomSheet ? openClassCentered : openClass
    const closeCls = disableBottomSheet ? closeClassCentered : closeClass
    const isBottomSheet = !disableBottomSheet

    useTouch({
      element: isBottomSheet ? componentEl : null,
      onSwipeDown: isBottomSheet ? () => setIsOpen(false) : undefined,
      swipeThreshold: 50,
    })

    const containerRef = useRef<HTMLElement | null>(null)
    useFocus(isOpen, containerRef, {
      portalEl: componentEl,
      dismiss: 'modal',
      onToggle: setIsOpen,
    })

    devWarning(
      !title && !label,
      'Dialog: no title or label provided — dialog will only have a generic aria-label. Provide at least one for screen reader context.',
    )

    const handleClose = () => {
      setIsOpen(false)
    }

    useEffect(() => {
      if (typeof window === 'undefined') return

      let timerId: ReturnType<typeof setTimeout>
      if (isOpen) {
        setIsVisible(true)
      } else {
        timerId = setTimeout(() => setIsVisible(false), 150)
      }
      return () => {
        if (timerId) clearTimeout(timerId)
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
            positionClass,
            closeCls,
            isVisible && isOpen && openCls,
            className,
          )}
          role="dialog"
          aria-label={!title ? label || t('dialog') : undefined}
          aria-labelledby={title ? `${name}-title` : undefined}
          aria-modal="true"
          ref={setComponentEl}
          {...rest}
        >
          <Paper
            className={cn('shadow-dialog relative h-full w-full', paperClassName)}
            variant={variant}
            color={color}
            padding={paddingY}
            rounded="rounded-[inherit]"
            {...restPaperProps}
          >
            {!disableBottomSheet && (
              <div className="-mt-1 flex justify-center pb-2 md:hidden">
                <div className="bg-dark-300 h-1 w-10 rounded-full" />
              </div>
            )}
            <div
              className={cn(
                'DialogTitleWrap',
                'relative',
                paddingX,
                title && 'pb-7',
                !title && !hideXButton && (isBottomSheet ? 'md:pb-7' : 'pb-7'),
              )}
            >
              {title && (
                <Title
                  id={`${name}-title`}
                  variant="h3"
                  color={variant === 'contained' ? 'none' : color}
                  align="text-center"
                  size="xl"
                  {...titleProps}
                  className={cn(
                    !hideXButton && (isBottomSheet ? 'md:px-10' : 'px-10'),
                    titleProps.className,
                  )}
                >
                  {title}
                </Title>
              )}
              {!hideXButton && (
                <Button
                  className={cn(
                    'XButton',
                    'absolute top-0 right-1 border-none bg-transparent px-0 py-0 dark:bg-transparent',
                    isBottomSheet && 'hidden md:flex',
                  )}
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
            <ScrollShadow height="max-h-[70vh] md:max-h-[75vh]" padding={cn(paddingX, 'py-1')}>
              {children}
            </ScrollShadow>
            {(closeButton || dialogActions) && (
              <div className={cn('DialogActions', paddingX, 'flex justify-end gap-3 pt-8')}>
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
            )}
          </Paper>
        </div>
        <Overlay isOpen={isOpen} onClose={handleClose} dark />
      </>,
      container,
    )
  },
)

Dialog.displayName = 'Dialog'
