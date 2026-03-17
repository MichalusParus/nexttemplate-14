'use client'
import { useTranslations } from 'next-intl'
import { ButtonHTMLAttributes, forwardRef, useEffect, useRef } from 'react'

import { cn } from '@/utils/utils'

import { overlayClass } from './Overlay.style'

export type OverlayProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** boolean value for open state */
  isOpen: boolean
  /** boolean for darker overlay, default is transparent */
  dark?: boolean
  /** onClick for closing function */
  onClose: () => void
}

export const APP_ROOT_ID = '__next'

// Set-based tracking for nested modals — idempotent add/delete prevents desync
const openOverlays = new Set<symbol>()

/** Overlay is used in popover components for closing popover on click outside. USE CLIENT */
export const Overlay = forwardRef<HTMLButtonElement | null, OverlayProps>(
  ({ className, isOpen, dark, onClose, ...rest }, ref) => {
    const t = useTranslations('Components')
    const id = useRef(Symbol()).current

    // Set inert on app root when modal overlay is open
    useEffect(() => {
      if (!isOpen) return
      const appRoot = document.getElementById(APP_ROOT_ID)
      if (!appRoot) return

      openOverlays.add(id)
      appRoot.inert = true

      return () => {
        openOverlays.delete(id)
        if (openOverlays.size === 0) {
          appRoot.inert = false
        }
      }
    }, [isOpen, id])

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
        aria-label={isOpen ? t('close') : undefined}
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
