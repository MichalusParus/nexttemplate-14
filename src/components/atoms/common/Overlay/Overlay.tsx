'use client'
import { useTranslations } from 'next-intl'
import { ButtonHTMLAttributes, forwardRef, useEffect } from 'react'

import { cn } from '@/utils/utils'

import { overlayClass } from './Overlay.style'

export type OverlayProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** bolean value for open state */
  isOpen: boolean
  /** boolean for darkr overlay, default is transparentn */
  dark?: boolean
  /** onClick for closing function */
  onClose: () => void
}

// Reference counter for nested modals
let modalCount = 0

/** Overlay is used in popover components for closing popover on click outside. USE CLIENT */
export const Overlay = forwardRef<HTMLButtonElement | null, OverlayProps>(
  ({ className, isOpen, dark, onClose, ...rest }, ref) => {
    const t = useTranslations('Components')

    // Set inert on app root when modal overlay is open
    useEffect(() => {
      if (!isOpen) return
      const appRoot = document.getElementById('__next')
      if (!appRoot) return

      modalCount++
      appRoot.inert = true

      return () => {
        modalCount--
        if (modalCount === 0) {
          appRoot.inert = false
        }
      }
    }, [isOpen])

    return (
      <button
        className={cn(
          'Overlay',
          overlayClass,
          isOpen ? 'opacity-100' : 'invisible opacity-0',
          dark && 'bg-dark-950/25',
          className,
        )}
        type="button"
        tabIndex={-1}
        aria-label={t('close')}
        aria-hidden={!isOpen}
        ref={ref}
        onClick={onClose}
        data-testid="Overlay"
        {...rest}
      />
    )
  },
)

Overlay.displayName = 'Overlay'
