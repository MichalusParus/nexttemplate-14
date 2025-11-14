'use client'
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { StyleProps } from '@/components/utils/types'
import { useFilterData } from '@/utils/hooks/useFilterData'
import { usePagination } from '@/utils/hooks/usePagination'
import { cn } from '@/utils/utils'

import { GridBody } from './GridBody'
import { GridFooter } from './GridFooter'
import { GridHeader } from './GridHeader'
import { DataGridContextValue, DataGridProvider } from './utils/DataGridContext'
import { ColumnDef } from './utils/types'
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
    /** function for clicable rows */
    onRowClick?: (value: T) => void
  }

/** Grid "table" for displaying data in rows with filter, sort, pagination, data export, onClick and multiselection. USE CLIENT */
function DataGridComponent<T extends Record<string, unknown> = Record<string, unknown>>(
  {
    className,
    name,
    columns,
    rows,
    rowsPerPage = 20,
    variant,
    color,
    size,
    isLoading,
    maxHeight = 'max-h-[80vh]',
    hideShadow,
    hideExport,
    defaultSelectedRows,
    getRowId,
    onSelectionChange,
    onRowClick,
  }: DataGridProps<T>,
  ref: React.ForwardedRef<HTMLDivElement | null>,
) {
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
  const { filteredData, sorting, filter, setFilter, handleSorting } = useFilterData<T>(rows)
  const {
    pagedData,
    pages,
    page: selectedPage,
    onChange: setSelectedPage,
  } = usePagination(filteredData, selectedRowsPerPage)
  const maxDepth = getMaxDepth(columns)
  const columnsInRow = getFlatColumns(columns)

  const gridTemplateColumns = useMemo(() => buildGridTemplateColumns(columnsInRow), [columnsInRow])

  const allSelected = useMemo(
    () => filteredData.length > 0 && selectedRows.length === filteredData.length,
    [selectedRows.length, filteredData.length],
  )

  const isIndeterminate = useMemo(
    () => selectedRows.length > 0 && selectedRows.length < filteredData.length,
    [selectedRows.length, filteredData.length],
  )

  const selectedRowIds = useMemo(
    () => new Set(selectedRows.map(r => handleRowId(r))),
    [selectedRows, handleRowId],
  )

  const handleAll = useCallback(() => {
    const newSelection = allSelected ? [] : filteredData
    setSelectedRows(newSelection)
    onSelectionChange?.(newSelection)
  }, [allSelected, filteredData, onSelectionChange])

  const handleSelect = useCallback(
    (row: T) => {
      const rowId = handleRowId(row)
      setSelectedRows(prev => {
        const selectedIds = new Set(prev.map(r => handleRowId(r)))
        const newSelection = selectedIds.has(rowId)
          ? prev.filter(r => handleRowId(r) !== rowId)
          : [...prev, row]
        onSelectionChange?.(newSelection)
        return newSelection
      })
    },
    [handleRowId, onSelectionChange],
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

  const contextValue = useMemo<DataGridContextValue<T>>(
    () => ({
      name,
      columns,
      columnsInRow,
      hideExport,
      variant: variant || 'outlined',
      color: color || 'primary',
      size: size || 'md',
      filter,
      sorting,
      setFilter,
      handleSorting,
      selectedRowsCount: selectedRows.length,
      filteredDataCount: filteredData.length,
    }),
    [
      name,
      columns,
      columnsInRow,
      hideExport,
      variant,
      color,
      size,
      filter,
      sorting,
      setFilter,
      handleSorting,
      selectedRows.length,
      filteredData.length,
    ],
  )

  return (
    <DataGridProvider value={contextValue as DataGridContextValue<Record<string, unknown>>}>
      <div
        id={`grid-${name}`}
        className={cn(
          'DataGrid',
          'w-full overflow-x-auto rounded-md focus-visible:outline-1 focus-visible:outline-offset-1',
          !hideShadow && variant === 'contained' && 'shadow-button',
          className,
        )}
        role="grid"
        tabIndex={0}
        aria-label={name}
        aria-multiselectable={Boolean(onSelectionChange)}
        aria-rowcount={filteredData.length + maxDepth}
        aria-colcount={columnsInRow.length + (onSelectionChange ? 1 : 0)}
        aria-busy={isLoading}
        ref={componentRef}
      >
        <div className={cn('GridInnerWrap', 'min-w-max overflow-x-hidden')}>
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
            filteredData={filteredData}
            selectedRowsPerPage={selectedRowsPerPage}
            pages={pages}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            setSelectedRowsPerPage={setSelectedRowsPerPage}
          />
        </div>
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
