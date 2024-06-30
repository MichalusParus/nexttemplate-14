'use client'
import { forwardRef, PropsWithChildren, useEffect, useImperativeHandle, useState } from 'react'

import Button from '@/components/atoms/common/Button'
import Combobox from '@/components/atoms/common/Combobox'
import XIcon from '@/components/atoms/icons/XIcon'
import { useFocusTrap } from '@/utils/hooks/useFocusTrap'

import { closeButtonClass, closeClass, openClass, vieverComboboxClass } from './ImageViewer.style'

type ImageViewerProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** alt image label for aria purposes */
  alt: string
}

/** Fullscreen modal window for image detail. USE CLIENT */
export const ImageViewer = forwardRef<HTMLDivElement, PropsWithChildren<ImageViewerProps>>(
  ({ className = '', alt, children }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const { componentRef, startRef } = useFocusTrap(isOpen, () => setIsOpen(false))
    useImperativeHandle(ref, () => componentRef.current!)

    const viewerOpenState = isOpen ? openClass : closeClass
    const viewerCursor = isOpen ? 'cursor-zoom-out' : 'cursor-zoom-in'

    const handleClose = () => {
      startRef?.current?.focus()
      setIsOpen(prev => !prev)
    }

    useEffect(() => {
      document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    }, [isOpen])

    return (
      <div
        className={`ImageViewer ${className} transition-size ${viewerOpenState}`}
        ref={componentRef}
        data-testid="ImageViewer"
      >
        <Combobox
          className={`${vieverComboboxClass} ${viewerCursor}`}
          name={alt}
          isOpen={isOpen}
          hasPopup="dialog"
          color="none"
          size="none"
          hideShadow
          aria-label={alt}
          onClick={handleClose}
        >
          {children}
        </Combobox>
        {isOpen ? (
          <Button
            className={`CloseButton ${closeButtonClass}`}
            variant="text"
            color="none"
            startIcon={<XIcon />}
            aria-label="close"
            onClick={handleClose}
          />
        ) : null}
      </div>
    )
  },
)

ImageViewer.displayName = 'ImageViewer'
