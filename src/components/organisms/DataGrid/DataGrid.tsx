'use client'
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { devWarning } from '@/components/utils/devWarning'
import { StyleProps } from '@/components/utils/types'
import { FilterDef, SortingState, useFilterData } from '@/utils/hooks/useFilterData'
import { usePagination } from '@/utils/hooks/usePagination'
import { cn } from '@/utils/utils'

const EMPTY_ARRAY: never[] = []

import { GridBody } from './GridBody'
import { GridFooter } from './GridFooter'
import { GridHeader } from './GridHeader'
import { DataGridContextValue, DataGridProvider } from './utils/DataGridContext'
import { ColumnDef } from './utils/types'
import { useDataGridFocus } from './utils/useDataGridFocus'
import { buildGridTemplateColumns, getFlatColumns, getMaxDepth } from './utils/utils'

export type DataGridProps<T extends Record<string, unknown> = Record<string, unknown>> =
  StyleProps & {
    /** for passing custom tailwind classes */
    className?: string
    /** DataGrid name for id and aria purposes */
    name: string
    /** grid column definition,name = row object key, label, width as basis tailwind class, grow, shrink, hidefilter and hideSort */
    columns: ColumnDef<T>[]
    /** grid rows array */
    rows: T[]
    /** loading ghost state */
    isLoading?: boolean
    /** default rowsPerPage option */
    rowsPerPage?: number
    /** maximal datagrid height as tailwind class */
    maxHeight?: string
    /** optional for hiding shadow */
    hideShadow?: boolean
    /** optional for hiding export */
    hideExport?: boolean
    /** initial selected rows for multiselect mode */
    defaultSelectedRows?: T[]
    /** function to extract unique row identifier - defaults to (row) => row.id */
    getRowId?: (row: T) => string | number
    /** callback when selection changes - enables multiselect mode */
    onSelectionChange?: (rows: T[]) => void
    /** function for clickable rows */
    onRowClick?: (value: T) => void
    /** callback when filter state changes - enables server-side filtering */
    onFilterChange?: (filter: FilterDef) => void
    /** callback when sorting state changes - enables server-side sorting */
    onSortingChange?: (sorting: SortingState) => void
    /** total number of pages - required with onPageChange (matches Pagination count prop) */
    count?: number
    /** controlled current page - used with onPageChange (matches Pagination page prop) */
    page?: number
    /** callback when page or rowsPerPage changes - enables server-side pagination */
    onPageChange?: (page: number, rowsPerPage: number) => void
    /** custom export handler - overrides built-in CSV export when provided */
    onExport?: () => void
  }

/** Grid "table" for displaying data in rows with filter, sort, pagination, data export, onClick and multiselection. USE CLIENT */
function DataGridComponent<T extends Record<string, unknown> = Record<string, unknown>>(
  {
    className,
    name,
    columns,
    rows,
    count,
    page,
    maxHeight = 'max-h-[80vh]',
    variant,
    color,
    size,
    isLoading,
    hideShadow,
    hideExport,
    rowsPerPage = 20,
    defaultSelectedRows,
    getRowId,
    onSelectionChange,
    onRowClick,
    onFilterChange,
    onSortingChange,
    onPageChange,
    onExport,
  }: DataGridProps<T>,
  ref: React.ForwardedRef<HTMLDivElement | null>,
) {
  devWarning(Boolean(onPageChange) && (count == null || page == null), 'DataGrid: `onPageChange` requires both `count` and `page` props for server-side pagination.')
  devWarning(Boolean(onPageChange) && !getRowId, 'DataGrid: Server-side pagination without `getRowId` will lose row identity across fetches. Server responses create new objects, so the WeakMap UUID cache misses. Provide `getRowId`.')

  const componentRef = useRef<HTMLDivElement>(null)
  const rowIdCacheRef = useRef(new WeakMap<T, string>())
  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => componentRef.current)

  const handleRowId = useCallback<(row: T) => string | number>(
    (row: T) => {
      if (getRowId) return getRowId(row)
      const id = (row as Record<string, unknown>).id
      if (id != null) return id as string | number
      const cached = rowIdCacheRef.current.get(row)
      if (cached) return cached
      const newId = uuidv4()
      rowIdCacheRef.current.set(row, newId)
      return newId
    },
    [getRowId],
  )

  const [selectedRows, setSelectedRows] = useState<T[]>(defaultSelectedRows || [])
  const [selectedRowsPerPage, setSelectedRowsPerPage] = useState(rowsPerPage)
  const { filteredData, sorting, filter, setFilter, handleSorting } = useFilterData<T>(rows, {
    skipFiltering: Boolean(onFilterChange),
    skipSorting: Boolean(onSortingChange),
    onFilterChange,
    onSortingChange,
  })

  const {
    pagedData: clientPagedData,
    pages: clientPages,
    page: clientPage,
    onChange: clientPageChange,
  } = usePagination(onPageChange ? EMPTY_ARRAY : filteredData, selectedRowsPerPage)

  const pagination = useMemo(() => {
    if (onPageChange) {
      return {
        pagedData: rows,
        pages: Array.from({ length: count ?? 1 }, (_, i) => i + 1),
        selectedPage: page ?? 1,
        totalDataCount: (count ?? 1) * selectedRowsPerPage,
        selectableData: rows,
      }
    }
    return {
      pagedData: clientPagedData,
      pages: clientPages,
      selectedPage: clientPage,
      totalDataCount: filteredData.length,
      selectableData: filteredData,
    }
  }, [
    onPageChange,
    rows,
    count,
    page,
    selectedRowsPerPage,
    clientPagedData,
    clientPages,
    clientPage,
    filteredData,
  ])

  const setSelectedPage = useCallback(
    (newPage: number) => {
      if (onPageChange) {
        onPageChange(newPage, selectedRowsPerPage)
      } else {
        clientPageChange(newPage)
      }
    },
    [onPageChange, selectedRowsPerPage, clientPageChange],
  )

  const handleRowsPerPage = useCallback(
    (value: number) => {
      setSelectedRowsPerPage(value)
      if (onPageChange) {
        onPageChange(1, value)
      }
    },
    [onPageChange],
  )

  const { pagedData, pages, selectedPage, totalDataCount, selectableData } = pagination

  const maxDepth = getMaxDepth(columns)
  const columnsInRow = getFlatColumns(columns)

  const gridTemplateColumns = useMemo(() => buildGridTemplateColumns(columnsInRow), [columnsInRow])

  const allSelected = useMemo(() => {
    if (selectableData.length === 0 || selectedRows.length !== selectableData.length) {
      return false
    }
    const selectedIds = new Set(selectedRows.map(r => handleRowId(r)))
    return selectableData.every(row => selectedIds.has(handleRowId(row)))
  }, [selectedRows, selectableData, handleRowId])

  const isIndeterminate = useMemo(
    () => selectedRows.length > 0 && selectedRows.length < selectableData.length,
    [selectedRows.length, selectableData.length],
  )

  const selectedRowIds = useMemo(
    () => new Set(selectedRows.map(r => handleRowId(r))),
    [selectedRows, handleRowId],
  )

  const handleAll = useCallback(() => {
    const newSelection = allSelected ? [] : selectableData
    setSelectedRows(newSelection)
    onSelectionChange?.(newSelection)
  }, [allSelected, selectableData, onSelectionChange])

  const handleSelect = useCallback(
    (row: T) => {
      const rowId = handleRowId(row)
      const selectedIds = new Set(selectedRows.map(r => handleRowId(r)))
      const newSelection = selectedIds.has(rowId)
        ? selectedRows.filter(r => handleRowId(r) !== rowId)
        : [...selectedRows, row]
      setSelectedRows(newSelection)
      onSelectionChange?.(newSelection)
    },
    [handleRowId, onSelectionChange, selectedRows],
  )

  const handleRowClick = useCallback(
    (row: T) => {
      if (onRowClick) {
        onRowClick(row)
      } else if (onSelectionChange) {
        handleSelect(row)
      }
    },
    [onRowClick, onSelectionChange, handleSelect],
  )

  useDataGridFocus({
    componentRef: componentRef,
    gridColumns: columnsInRow.length + (onSelectionChange ? 1 : 0),
    onRowSelect: rowIndex => {
      const dataRowIndex = rowIndex - maxDepth - 1
      const row = pagedData[dataRowIndex]
      if (row) {
        handleSelect(row)
      }
    },
    onSelectAll: onSelectionChange ? handleAll : undefined,
  })

  const contextValue = useMemo<DataGridContextValue<T>>(
    () => ({
      name,
      columns,
      columnsInRow,
      hideExport,
      onExport,
      variant: variant || 'outlined',
      color: color || 'primary',
      size: size || 'md',
      filter,
      sorting,
      setFilter,
      handleSorting,
      selectedRowsCount: selectedRows.length,
      filteredDataCount: totalDataCount,
    }),
    [
      name,
      columns,
      columnsInRow,
      hideExport,
      onExport,
      variant,
      color,
      size,
      filter,
      sorting,
      setFilter,
      handleSorting,
      selectedRows.length,
      totalDataCount,
    ],
  )

  return (
    <DataGridProvider value={contextValue as DataGridContextValue<Record<string, unknown>>}>
      <div
        id={`grid-${name}`}
        className={cn(
          'DataGrid',
          'grid w-full overflow-x-auto rounded-md',
          !hideShadow && variant === 'contained' && 'shadow-button',
          className,
        )}
        role="grid"
        aria-label={name}
        aria-multiselectable={onSelectionChange ? true : undefined}
        aria-rowcount={totalDataCount + maxDepth}
        aria-colcount={columnsInRow.length + (onSelectionChange ? 1 : 0)}
        aria-busy={isLoading}
        ref={componentRef}
      >
        <GridHeader
          allSelected={allSelected}
          isIndeterminate={isIndeterminate}
          handleAll={onSelectionChange ? handleAll : undefined}
          gridTemplateColumns={gridTemplateColumns}
        />
        <GridBody
          pagedData={pagedData}
          selectedRowIds={selectedRowIds}
          getRowId={handleRowId}
          multiselect={Boolean(onSelectionChange)}
          isLoading={isLoading}
          rowsPerPage={selectedRowsPerPage}
          maxHeight={maxHeight}
          headerDepth={maxDepth}
          gridTemplateColumns={gridTemplateColumns}
          handleRowClick={onRowClick || onSelectionChange ? handleRowClick : undefined}
        />
        <GridFooter
          filteredData={selectableData}
          selectedRowsPerPage={selectedRowsPerPage}
          pages={pages}
          selectedPage={selectedPage}
          isLoading={isLoading}
          setSelectedPage={setSelectedPage}
          setSelectedRowsPerPage={handleRowsPerPage}
        />
      </div>
    </DataGridProvider>
  )
}

type DataGridComponentType = <T extends Record<string, unknown> = Record<string, unknown>>(
  props: DataGridProps<T> & { ref?: React.ForwardedRef<HTMLDivElement | null> },
) => React.ReactElement | null

export const DataGrid = forwardRef(DataGridComponent) as DataGridComponentType & {
  displayName?: string
}

DataGrid.displayName = 'DataGrid'
