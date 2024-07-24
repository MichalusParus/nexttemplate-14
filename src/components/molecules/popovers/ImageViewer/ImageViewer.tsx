'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, PropsWithChildren, useEffect, useImperativeHandle, useState } from 'react'

import Button from '@/components/atoms/common/Button'
import Combobox from '@/components/atoms/common/Combobox'
import XIcon from '@/components/atoms/icons/XIcon'
import { useFocusTrap } from '@/utils/hooks/useFocusTrap'
import { cn } from '@/utils/utils'

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
    const t = useTranslations('Components')
    const [isOpen, setIsOpen] = useState(false)
    const { componentRef, startRef } = useFocusTrap(isOpen, () => setIsOpen(false), {})
    useImperativeHandle(ref, () => componentRef.current!)

    const handleClose = () => {
      startRef?.current?.focus()
      setIsOpen(prev => !prev)
    }

    useEffect(() => {
      document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    }, [isOpen])

    return (
      <div
        className={cn('ImageViewer', 'transition-size', isOpen ? openClass : closeClass, className)}
        ref={componentRef}
        data-testid="ImageViewer"
      >
        <Combobox
          className={cn(vieverComboboxClass, isOpen ? 'cursor-zoom-out' : 'cursor-zoom-in')}
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
            className={cn('CloseButton', closeButtonClass)}
            variant="text"
            color="none"
            startIcon={<XIcon />}
            aria-label={t('close')}
            onClick={handleClose}
          />
        ) : null}
      </div>
    )
  },
)

ImageViewer.displayName = 'ImageViewer'
