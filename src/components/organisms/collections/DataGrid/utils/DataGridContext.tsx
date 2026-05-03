'use client'
import { createContext, useContext } from 'react'

import { StyleProps } from '@/components/utils/types'
import { FilterDef, SortingState } from '@/utils/hooks/useFilterData'

import { ColDef, ColumnDef } from './types'

export type DataGridContextValue<T extends Record<string, unknown> = Record<string, unknown>> = {
  /** DataGrid name for id and aria purposes */
  name: string
  /** Grid column definitions */
  columns: ColumnDef<T>[]
  /** Flat leaf columns for body and footer */
  columnsInRow: ColDef<T>[]
  /** Optional for hiding export */
  hideExport?: boolean
  /** Custom export handler - overrides built-in CSV export */
  onExport?: () => void
  /** Component variant with default fallback */
  variant: NonNullable<StyleProps['variant']>
  /** Component color with default fallback */
  color: NonNullable<StyleProps['color']>
  /** Component size with default fallback */
  size: NonNullable<StyleProps['size']>
  /** Current filter state */
  filter: FilterDef
  /** Current sorting state */
  sorting: SortingState
  /** Function for setting filter */
  setFilter: (value: FilterDef) => void
  /** Function for setting sorting */
  handleSorting: (key: string) => void
  /** Number of selected rows (for multiselect mode) */
  selectedRowsCount: number
  /** Total number of filtered rows */
  filteredDataCount: number
  /** Fit mode: shrink to parent width and truncate cell content (no horizontal scroll) */
  fit?: boolean
}

const DataGridContext = createContext<DataGridContextValue<Record<string, unknown>> | null>(null)

export const DataGridProvider = DataGridContext.Provider

export const useDataGridContext = <
  T extends Record<string, unknown> = Record<string, unknown>,
>() => {
  const context = useContext(DataGridContext)
  if (!context) {
    throw new Error('useDataGridContext must be used within DataGridProvider')
  }
  return context as DataGridContextValue<T>
}
