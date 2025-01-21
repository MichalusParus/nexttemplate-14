'use client'
import { useTranslations } from 'next-intl'
import { forwardRef } from 'react'

import { buttonVariant, iconOnlySize } from '@/components/atoms/common/Button/Button.style'
import { Checkbox } from '@/components/molecules/form/inputs/CheckboxField/Checkbox'
import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

export type SelectAllHeadProps = StyleProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** DataGrid name for id and aria purposes */
  name: string
  /** boolean for all rows selected */
  isChecked?: boolean
  /** function for selecting all rows */
  handleAll: () => void
}

/** SelectAllHeader component for multiselect DataGrid. USE CLIENT */
export const SelectAllHead = forwardRef<HTMLDivElement, SelectAllHeadProps>(
  (
    { className, name, variant = 'outlined', color = 'primary', size = 'md', isChecked, handleAll },
    ref,
  ) => {
    const t = useTranslations('Components')

    return (
      <div
        className={cn(
          'SelectAll',
          isChecked && 'selected',
          iconOnlySize[size],
          buttonVariant[variant][color],
          'group border-transparent dark:border-transparent',
          className,
        )}
        role="columnheader"
        aria-label={t('selectAll')}
        aria-sort="none"
        tabIndex={-1}
        ref={ref}
        onClick={handleAll}
        onKeyDown={e => (e.code === 'Enter' || e.code === 'Space' ? handleAll() : null)}
      >
        <Checkbox
          className={cn('SelectAllCheck', 'cursor-default opacity-0')}
          name={`${name}All`}
          label=""
          value={String(isChecked)}
          variant={variant === 'text' ? 'outlined' : variant}
          color={color}
          size={size}
          isChecked={isChecked || false}
          fake
          onChange={() => {}}
        />
      </div>
    )
  },
)

SelectAllHead.displayName = 'SelectAllHead'
