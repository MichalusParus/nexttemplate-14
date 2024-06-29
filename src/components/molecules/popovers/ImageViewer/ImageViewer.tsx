'use client'
import { ReactNode, useEffect, useState } from 'react'

import Button from '@/components/atoms/common/Button'
import Combobox from '@/components/atoms/common/Combobox'
import XIcon from '@/components/atoms/icons/XIcon'
import { useFocusTrap } from '@/utils/hooks/useFocusTrap'

type Props = {
  /** for passing custom tailwind classes */
  className?: string
  /** alt image label for aria purposes */
  alt: string
  /** children */
  children: ReactNode
}

/** Fullscreen modal window for image detail. */
export const ImageViewer = ({ className = '', alt, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { componentRef, startRef } = useFocusTrap(isOpen, () => setIsOpen(false))

  const openClass = 'fixed w-[100vw] h-[100vh] top-0 left-0 z-50'
  const closeClass = 'relative w-full h-full'

  const handleClose = () => {
    startRef?.current?.focus()
    setIsOpen(prev => !prev)
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
  }, [isOpen])

  return (
    <div
      className={`${className} transition-size ${isOpen ? openClass : closeClass}`}
      ref={componentRef}
      data-testid="ImageViewer"
    >
      <Combobox
        className={`flex h-full w-full overflow-hidden border-0 [&>.ButtonInnerWrap]:h-full ${isOpen ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
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
          className="right-4 top-4 z-50 border-0 bg-dark-600 text-dark-50 [&.Button]:fixed"
          variant="text"
          color="none"
          startIcon={<XIcon />}
          aria-label="close"
          onClick={handleClose}
        />
      ) : null}
    </div>
  )
}
