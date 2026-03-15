'use client'
import { useTranslations } from 'next-intl'
import { memo, useCallback, useRef, useState } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { FilterIcon } from '@/components/atoms/icons'
import { P } from '@/components/atoms/typography/P'
import { Dropdown } from '@/components/molecules/popovers/Dropdown'
import { Tooltip } from '@/components/molecules/popovers/Tooltip'
import { cn } from '@/utils/utils'

import { useDataGridContext } from '../../../utils/DataGridContext'
import { ColumnDef } from '../../../utils/types'
import { GridDateFilter } from './filters/GridDateFilter'
import { GridNumberFilter } from './filters/GridNumberFilter'
import { GridSelectFilter } from './filters/GridSelectFilter'
import { GridTextFilter } from './filters/GridTextFilter'
import { GridToggleFilter } from './filters/GridToggleFilter'
import { OperatorSelect } from './filters/OperatorSelect'

export type GridFilterProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** grid column definition */
  column: ColumnDef
}

/** GridFilter component for DataGrid with unified operator selection. USE CLIENT */
const GridFilterComponent = ({ className, column }: GridFilterProps) => {
  const t = useTranslations('Components')
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { name, variant, color, size, filter } = useDataGridContext()
  const isFilterApplied = Object.keys(filter).includes(column.name)

  const portalContainerId = `${name}-${column.name}-portalTarget`


  const handleToggle = useCallback(() => setIsOpen(prev => !prev), [])
  const handleClose = useCallback(() => setIsOpen(false), [])

  const renderFilter = () => {
    if (!column.filter?.type) return null

    const commonProps = {
      column,
      portalContainerId,
    }

    switch (column.filter.type) {
      case 'text':
        return <GridTextFilter {...commonProps} />
      case 'number':
        return <GridNumberFilter {...commonProps} />
      case 'date':
        return <GridDateFilter {...commonProps} />
      case 'select':
        return <GridSelectFilter {...commonProps} />
      case 'toggle':
        return <GridToggleFilter {...commonProps} />
      default:
        return null
    }
  }

  return (
    <Tooltip title={t('filterIn', { field: column.label })} placement="top" offset={[0, 15]}>
      <div className={cn('GridFilter', className)}>
        <Button
          variant={variant}
          color={color}
          size={size}
          hideShadow
          className={cn(
            'rounded-none border-none focus-visible:ring-0 pl-0.5 pr-0.5',
            isOpen && 'selected z-combobox',
          )}
          startIcon={
            <FilterIcon
              className={cn(
                'transition-opacity',
                isFilterApplied || isOpen
                  ? 'opacity-100'
                  : 'opacity-0 group-focus-within:opacity-50 group-hover:opacity-50',
              )}
            />
          }
          aria-label={t('filterIn', { field: column.label })}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          tabIndex={-1}
          onClick={e => {
            e?.stopPropagation()
            handleToggle()
          }}
          ref={buttonRef}
          data-testid="FilterButton"
        />
        <Dropdown
          id={portalContainerId}
          className="mt-1"
          isOpen={isOpen}
          anchorRef={buttonRef}
          placement="bottom-end"
          label={t('filterIn', { field: column.label })}
          variant={variant}
          color={color}
          width="auto"
          offset={[0, 28]}
          modal
          onClose={handleClose}
        >
          <div className="flex min-w-[250px] flex-col gap-2 p-2">
            <P className="font-semibold" size={size}>
              {t('filterIn', { field: column.label })}
            </P>
            {renderFilter()}
            <OperatorSelect column={column} portalContainerId={portalContainerId} />
          </div>
        </Dropdown>
      </div>
    </Tooltip>
  )
}

export const GridFilter = memo(GridFilterComponent)

GridFilter.displayName = 'GridFilter'
