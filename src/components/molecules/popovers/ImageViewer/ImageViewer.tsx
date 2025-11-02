'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, PropsWithChildren, useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { XIcon } from '@/components/atoms/icons'
import { useInternalOpenState } from '@/components/utils/hooks/useInternalOpenState'
import { usePortalContainer } from '@/components/utils/hooks/usePortalContainer'
import { cn } from '@/utils/utils'

import { controlClass } from '../../common/Carousel/CarouselControls/CarouselControls.style'
import {
  closeButtonClass,
  viewerButtonClass,
  viewerDialogClass,
  viewerInnerWrapClass,
} from './ImageViewer.style'

export type ImageViewerProps = ButtonProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** Unique name for id when external control is used, otherwise id is generated */
  name?: string
  /** label for modal */
  label?: string
  /** optional boolean for controlled open state */
  isOpen?: boolean
  /** optional id for portal container */
  portalContainerId?: string
  /** optional setOpen function for controlled open state */
  setIsOpen?: (value: boolean) => void
}

/** Fullscreen modal window for image detail. USE CLIENT */
export const ImageViewer = forwardRef<
  HTMLButtonElement | null,
  PropsWithChildren<ImageViewerProps>
>(({ className, name, label, isOpen, portalContainerId, setIsOpen, children, ...rest }, ref) => {
  const t = useTranslations('Components')
  const id = useId().replace(/:/g, '')
  const nameId = name || id
  const [isVisible, setIsVisible] = useState(false)
  const container = usePortalContainer(portalContainerId)
  const { openState, handleOpen } = useInternalOpenState(isOpen, setIsOpen)

  useEffect(() => {
    let timerId: NodeJS.Timeout
    if (openState) {
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
  }, [openState])

  return (
    <>
      <Button
        className={cn('ImageViewer', viewerButtonClass, className)}
        color="none"
        size="none"
        hideShadow
        aria-label={label || t('imageViewer')}
        aria-haspopup="dialog"
        aria-expanded={openState}
        aria-controls={nameId}
        onClick={() => handleOpen(!openState)}
        ref={ref}
        data-testid="ImageViewer"
        {...rest}
      >
        {!openState && children}
      </Button>
      {!openState && !isVisible
        ? null
        : createPortal(
            <div
              id={nameId}
              className={cn(
                'ImageViewerDialog',
                'group',
                viewerDialogClass,
                isVisible && openState && 'scale-100 opacity-100',
              )}
              role="dialog"
              aria-modal="true"
              aria-label={label || t('imageViewer')}
            >
              <div className={cn('ViewerInnerWrap', viewerInnerWrapClass)}>{children}</div>
              <Button
                className={cn('CloseButton', closeButtonClass, controlClass)}
                variant="text"
                color="none"
                size="none"
                startIcon={<XIcon className="h-8 w-8" />}
                aria-label={t('close')}
                onClick={() => handleOpen(false)}
                data-testid="ImageViewerCloseButton"
              />
            </div>,
            container,
          )}
    </>
  )
})

ImageViewer.displayName = 'ImageViewer'
