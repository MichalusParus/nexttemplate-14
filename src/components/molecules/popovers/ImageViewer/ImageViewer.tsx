'use client'
import { useTranslations } from 'next-intl'
import {
  forwardRef,
  KeyboardEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

import { Button } from '@/components/atoms/common/Button'
import { XIcon } from '@/components/atoms/icons'
import { cn } from '@/utils/utils'

import { controlClass } from '../../common/Carousel/CarouselControls/CarouselControls.style'
import { closeButtonClass, openClass } from './ImageViewer.style'

// should be role combobox, but with button axe error for gallery

export type ImageViewerProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** name of component for aria purposes */
  name: string
  /** optional boolean default open or with setIsOpen for constrolled open state */
  isOpen?: boolean
  /** optional setOpen function for constrolled open state */
  setIsOpen?: (value: boolean) => void
}

/** Fullscreen modal window for image detail. USE CLIENT */
export const ImageViewer = forwardRef<HTMLDivElement | null, PropsWithChildren<ImageViewerProps>>(
  ({ className, name, isOpen, setIsOpen, children }, ref) => {
    const t = useTranslations('Components')
    const componentRef = useRef<HTMLDivElement>(null)
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
      ref,
      () => componentRef.current,
    )
    const [isInternallyOpen, setIsInternallyOpen] = useState(Boolean(isOpen))
    const openState = setIsOpen ? Boolean(isOpen) : isInternallyOpen
    // const { focusableEl } = useFocus(
    //   isOpen,
    //   componentRef,
    //   ['[tabindex]:not([tabindex="-1"])', '.Link'],
    //   () => setIsOpen(prev => !prev),
    //   { trap: true },
    // )

    const handleClose = useCallback(
      (value: boolean) => {
        // if (focusableEl.length) {
        //   focusableEl[0].click()
        // }
        if (setIsOpen) {
          setIsOpen(value)
        } else {
          setIsInternallyOpen(value)
        }
      },
      [
        // focusableEl,
        setIsOpen,
      ],
    )

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        // e.preventDefault()
        if (e.code === 'Space' || e.code === 'Enter') {
          handleClose(false)
        }
      },
      [handleClose],
    )

    useEffect(() => {
      document.body.style.overflow = openState ? 'hidden' : 'unset'
    }, [openState])

    return (
      <div
        className={cn('ImageViewer flex w-full overflow-hidden rounded-xl', className)}
        data-testid="ImageViewer"
      >
        {!openState && (
          <div
            className="h-full w-full cursor-zoom-in items-start justify-start"
            role="combobox"
            aria-haspopup="true"
            aria-controls={name}
            aria-owns={name}
            aria-expanded={openState}
            aria-label={name}
            tabIndex={0}
            onClick={() => handleClose(true)}
            onKeyDown={handleKeyDown}
          >
            {children}
          </div>
        )}
        {typeof window !== 'undefined' &&
          openState &&
          createPortal(
            <div
              id={name}
              className={cn('ImageViewerModal hidden w-full', openState && openClass)}
              role="dialog"
              aria-modal="true"
              aria-label={name}
              ref={componentRef}
              data-testid="ImageViewerModal"
            >
              <div
                className={cn(
                  'ViewerModalInnerWrap',
                  'flex h-full min-w-full flex-col items-center justify-center bg-dark-800 from-dark-800',
                )}
              >
                {children}
              </div>
              <Button
                className={cn('CloseButton', closeButtonClass, controlClass)}
                variant="text"
                color="none"
                size="none"
                startIcon={<XIcon className="h-8 w-8" />}
                aria-label={t('close')}
                onClick={() => handleClose(false)}
                data-testid="ImageViewerCloseButton"
              />
            </div>,
            document.body,
          )}
      </div>
    )
  },
)

ImageViewer.displayName = 'ImageViewer'
