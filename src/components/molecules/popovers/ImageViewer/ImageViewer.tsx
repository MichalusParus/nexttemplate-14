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
import { useFocus } from '@/utils/hooks/useFocus'
import { cn } from '@/utils/utils'

import { closeButtonClass, openClass } from './ImageViewer.style'

type ImageViewerProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** name of component for aria purposes */
  name: string
}

/** Fullscreen modal window for image detail. USE CLIENT */
export const ImageViewer = forwardRef<HTMLDivElement, PropsWithChildren<ImageViewerProps>>(
  ({ className, name, children }, ref) => {
    const t = useTranslations('Components')
    const componentRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => componentRef.current!)
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const { focusableEl } = useFocus(
      isOpen,
      componentRef,
      ['[tabindex]:not([tabindex="-1"])', '.Link'],
      () => setIsOpen(prev => !prev),
      { trap: true },
    )

    const handleClose = useCallback(() => {
      if (focusableEl.length) {
        focusableEl[0].click()
      }
      setIsOpen(false)
    }, [focusableEl, setIsOpen])

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (e.code === 'Space' || e.code === 'Enter') {
          setIsOpen(true)
        }
      },
      [setIsOpen],
    )

    useEffect(() => {
      setMounted(true)
    }, [])

    useEffect(() => {
      document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    }, [isOpen])

    return (
      <div
        className={cn('ImageViewer flex w-full overflow-hidden rounded-xl', className)}
        data-testid="ImageViewer"
      >
        <div
          className="h-full w-full cursor-zoom-in items-start justify-start"
          role="combobox"
          aria-haspopup="true"
          aria-controls={name}
          aria-owns={name}
          aria-expanded={isOpen}
          aria-label={name}
          tabIndex={0}
          onClick={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        >
          {children}
        </div>
        {mounted &&
          createPortal(
            <div
              id={name}
              className={cn('imageViewerModal hidden w-full', isOpen && openClass)}
              role="dialog"
              aria-modal="true"
              aria-hidden={isOpen}
              aria-label={name}
              ref={componentRef}
            >
              <div
                className={cn(
                  'viewerModalInnerWrap',
                  'flex h-full min-w-full flex-col items-center justify-center bg-dark-800 from-dark-800',
                )}
              >
                {children}
              </div>
              <Button
                className={cn('CloseButton', closeButtonClass)}
                variant="text"
                color="none"
                startIcon={<XIcon />}
                aria-label={t('close')}
                onClick={handleClose}
              />
            </div>,
            document.body,
          )}
      </div>
    )
  },
)

ImageViewer.displayName = 'ImageViewer'
