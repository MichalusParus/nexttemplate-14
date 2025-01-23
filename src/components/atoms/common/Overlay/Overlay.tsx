'use client'
import { useTranslations } from 'next-intl'
import { ButtonHTMLAttributes, forwardRef } from 'react'

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

/** Overlay is used in popover components for closing popover on click outside. USE CLIENT */
export const Overlay = forwardRef<HTMLButtonElement, OverlayProps>(
  ({ className, isOpen, dark, onClose, ...rest }, ref) => {
    const t = useTranslations('Components')

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
        ref={ref}
        data-testid="Overlay"
        onClick={onClose}
        {...rest}
      />
    )
  },
)

Overlay.displayName = 'Overlay'
