'use client'
import { useTranslations } from 'next-intl'
import { memo } from 'react'

import { FilterIcon } from '@/components/atoms/icons'
import { P } from '@/components/atoms/typography/P'
import { Menu } from '@/components/molecules/popovers/Menu'
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
  const { name, variant, color, size, filter } = useDataGridContext()
  const isFilterApplied = Object.keys(filter).includes(column.name)

  const portalContainerId = `${name}-${column.name}-portalTarget`

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
      <Menu
        className={cn('GridFilterMenu', 'rounded-md pt-0', className)}
        name={`filter${name}${column.name}`}
        variant={variant}
        color={color}
        width="auto"
        placement="bottom-end"
        dropdownProps={{
          id: portalContainerId,
          className: 'mt-1',
          modal: true,
          offset: [0, 28],
        }}
        buttonProps={{
          hideShadow: true,
          className: cn(
            'rounded-none border-transparent pl-0.5 pr-0.5 transition-opacity [&.selected]:opacity-100',
            isFilterApplied
              ? 'opacity-100'
              : 'opacity-0 focus-visible:opacity-100 group-hover:opacity-50',
          ),
          size: size,
          startIcon: <FilterIcon />,
          'aria-label': t('filterIn', { field: column.label }),
        }}
      >
        <div className="flex min-w-[250px] flex-col gap-2 p-2">
          <P className="font-semibold" size={size}>
            {t('filterIn', { field: column.label })}
          </P>
          {renderFilter()}
          <OperatorSelect column={column} portalContainerId={portalContainerId} />
        </div>
      </Menu>
    </Tooltip>
  )
}

export const GridFilter = memo(GridFilterComponent)

GridFilter.displayName = 'GridFilter'
