'use client'
import { useTranslations } from 'next-intl'
import { KeyboardEvent, MouseEvent } from 'react'

import { XIcon } from '@/components/atoms/icons'
import { cn } from '@/utils/utils'

type ClearButtonProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** ooptional button aria-label */
  label?: string
  /** onClick fn */
  onClick?: () => void
}

/** fake span button for clearing selected values inside combobox. USE CLIENT */
export const ClearButton = ({ className, label, onClick, ...rest }: ClearButtonProps) => {
  const t = useTranslations('Components')

  const handleClear = (e: MouseEvent<HTMLSpanElement> | KeyboardEvent<HTMLSpanElement>) => {
    e.preventDefault()
    e.stopPropagation()
    onClick?.()
  }

  return (
    <span
      className={cn(
        'ClearButton',
        'shrink-0 rounded-full focus:outline-hidden focus-visible:ring-1 cursor-pointer',
        className,
      )}
      role="button"
      aria-label={label || t('clear')}
      tabIndex={-1}
      onClick={handleClear}
      onKeyDown={e => (e.code === 'Enter' || e.code === 'Space' ? handleClear(e) : null)}
      data-testid="ClearButton"
      {...rest}
    >
      <XIcon aria-hidden data-testid="ClearIcon" />
    </span>
  )
}

ClearButton.displayName = 'ClearButton'
