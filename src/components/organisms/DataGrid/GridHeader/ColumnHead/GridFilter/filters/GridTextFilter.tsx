'use client'
import { useTranslations } from 'next-intl'

import { SearchInput } from '@/components/molecules/form/inputs/SearchField/SearchInput'
import { useDataGridContext } from '@/components/organisms/DataGrid/utils/DataGridContext'
import { ColumnDef } from '@/components/organisms/DataGrid/utils/types'
import { removeColumnFilter, updateColumnFilter } from '@/components/organisms/DataGrid/utils/utils'
import { FilterOperator } from '@/utils/hooks/useFilterData'

export type GridTextFilterProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** grid column definition */
  column: ColumnDef
}

/** GridTextFilter component for text search with operator support. USE CLIENT */
export const GridTextFilter = ({ className, column }: GridTextFilterProps) => {
  const t = useTranslations('Components')
  const { variant, color, size, filter, setFilter } = useDataGridContext()
  const currentFilter = filter[column.name]

  const operator =
    filter[column.name]?.operator || column.filter?.operator || FilterOperator.CONTAINS

  const value = currentFilter?.value ? String(currentFilter.value) : ''

  return (
    <SearchInput
      className={className}
      name={`searchIn${column.name}`}
      value={value}
      variant={variant}
      color={color}
      size={size}
      placeholder={t('searchIn', { field: column.label })}
      onClick={e => e.stopPropagation()}
      onClear={() => setFilter(removeColumnFilter(filter, column.name))}
      onChange={value => {
        setFilter(updateColumnFilter(filter, column.name, value, operator))
      }}
    />
  )
}

GridTextFilter.displayName = 'GridTextFilter'
