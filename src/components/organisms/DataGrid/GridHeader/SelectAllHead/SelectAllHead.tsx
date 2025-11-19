'use client'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/atoms/common/Button'
import { Checkbox } from '@/components/molecules/form/toggles/CheckboxField/Checkbox'
import { Tooltip } from '@/components/molecules/popovers/Tooltip'
import { cn } from '@/utils/utils'

import { useDataGridContext } from '../../utils/DataGridContext'

export type SelectAllHeadProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** boolean for all rows selected */
  isChecked?: boolean
  /** isIndeterminate state */
  isIndeterminate?: boolean
  /** grid column span value (e.g., "1") */
  gridColumn?: string
  /** grid row span value (e.g., "1" or "1 / span 2") */
  gridRow?: string
  /** function for selecting all rows */
  handleAll: () => void
}

/** SelectAllHeader component for multiselect DataGrid. USE CLIENT */
export const SelectAllHead = ({
  className,
  isChecked,
  isIndeterminate,
  handleAll,
  gridColumn,
  gridRow,
}: SelectAllHeadProps) => {
  const t = useTranslations('Components')
  const { name, variant, color, size } = useDataGridContext()

  return (
    <div
      className={cn('SelectAllHeader', className)}
      style={{
        ...(gridColumn && { gridColumn }),
        ...(gridRow && { gridRow }),
      }}
      role="columnheader"
      aria-label={t('selectAll')}
    >
      <Tooltip title={t('selectAll')} placement="top" offset={[0, 15]}>
        <Button
          className={cn('rounded-none border-none', (isChecked || isIndeterminate) && 'selected')}
          variant={variant}
          color={color}
          size={size}
          hideShadow
          aria-label={t('selectAll')}
          startIcon={
            <Checkbox
              name={`${name}All`}
              label=""
              value={String(isChecked)}
              variant={variant === 'text' ? 'outlined' : variant}
              color={color}
              size={size}
              isChecked={isChecked || false}
              isIndeterminate={isIndeterminate}
              fake
              onChange={() => {}}
            />
          }
          data-testid="SelectAllButton"
          onClick={handleAll}
        />
      </Tooltip>
    </div>
  )
}

SelectAllHead.displayName = 'SelectAllHead'
