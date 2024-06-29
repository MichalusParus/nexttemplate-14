'use client'
import { useCallback, useEffect, useState } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button/Button'
import { useFilterData } from '@/utils/hooks/useFilterData'
import { useFocusTrap } from '@/utils/hooks/useFocusTrap'
import { usePagination } from '@/utils/hooks/usePagination'

import GridBody from './GridBody'
import GridFooter from './GridFooter'
import GridHeader from './GridHeader'
import { ColDef, ColumnDef, RowDef } from './types'

type Props = {
  /** for passing custom tailwind classes */
  className?: string
  /** DataGrid name for id and aria purposes */
  name: string
  /** grid column definition,name = row object key, label, width as basis tailwind class, grow, shrink, hidefilter and hideSort */
  columns: ColumnDef[]
  /** grid rows array */
  rows: RowDef[]
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'none'
  /** size of component, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'none'
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
  /** for passing aditional props to multiselect submit button */
  multiselectButtonProps?: ButtonProps
  /** onSubmit function for selected rows */
  onMultiselectSubmit?: (value: RowDef[]) => void
  /** function for clicable rows */
  onRowClick?: (value: RowDef) => void
}

// aria test, focustrap, autoclose on click outside

/** Grid "table" for displaying data in rows with filter, sort, pagination, data export, onClick and multiselection. */
export const DataGrid = ({
  className = '',
  name,
  columns,
  rows,
  rowsPerPage = 20,
  variant = 'outlined',
  color = 'primary',
  size = 'md',
  isLoading,
  maxHeight = 'max-h-[80vh]',
  hideShadow,
  hideExport,
  multiselectButtonProps = {
    className: 'mt-6 ml-auto',
    variant: variant,
    color: color,
    size: size,
    children: 'Submit',
  },
  onMultiselectSubmit,
  onRowClick,
}: Props) => {
  const [selectedRows, setSelectedRows] = useState<RowDef[]>([])
  const [selectedRowsPerPage, setSelectedRowsPerPage] = useState(rowsPerPage)
  const [isGridFocusOpen, setIsGridFocusOpen] = useState(false)
  const { componentRef, startRef } = useFocusTrap(
    isGridFocusOpen,
    () => setIsGridFocusOpen(false),
    [
      '.RowButton',
      '.SubColButton',
      '.Combobox',
      '.ExportButton',
      '.LeftChevronButton',
      '.RightChevronButton',
    ],
  )
  const { filteredData, sorting, filter, setFilter, handleSorting } = useFilterData(rows)
  const { pagedData, pages, selectedPage, setSelectedPage } = usePagination(
    filteredData,
    selectedRowsPerPage,
  )
  const [selectAll, setSelectAll] = useState('none')
  const haveSubColumns = columns.some(col => col.columns && col.columns.length > 0)
  const mergedSubColumns = columns.map(c => c.columns).flat()
  const columnsInRow = haveSubColumns ? (mergedSubColumns as ColDef[]) : columns

  const handleAll = () => {
    if (selectAll === 'none') {
      setSelectedRows(filteredData)
      setSelectAll(`${name}All`)
    } else {
      setSelectedRows([])
      setSelectAll('none')
    }
  }

  const handleSelect = (row: RowDef) => {
    if (selectedRows.length > 0 && selectedRows.map(r => r.id).includes(row.id)) {
      setSelectedRows(selectedRows.filter(rows => rows.id !== row.id))
    } else {
      setSelectedRows([...selectedRows, row])
    }
  }

  const handleOnRowClick = (row: RowDef) => {
    if (onRowClick) {
      onRowClick(row)
    } else if (onMultiselectSubmit) {
      handleSelect(row)
    }
  }

  const handleCloseFocusTrap = useCallback(() => {
    startRef?.current?.focus()
    setIsGridFocusOpen(true)
  }, [startRef])

  useEffect(() => {
    const handleClick = (e: KeyboardEvent) => {
      const target = e.target as HTMLDivElement
      if ((e.code === 'Space' || e.code === 'Enter') && target.id === `grid-${name}`) {
        e.preventDefault()
        handleCloseFocusTrap()
      }
    }
    window.addEventListener('keydown', handleClick)
    return () => {
      window.removeEventListener('keydown', handleClick)
    }
  }, [name, handleCloseFocusTrap])

  return (
    <>
      <div
        id={`grid-${name}`}
        className={`DataGrid ${className} w-full overflow-x-auto focus:outline-info-900 ${!hideShadow && variant === 'contained' ? 'rounded-md shadow-button' : ''}`}
        ref={componentRef}
        role="grid"
        tabIndex={0}
        aria-label={`table-${name}`}
        aria-multiselectable={Boolean(onMultiselectSubmit)}
        aria-rowcount={rows.length + (haveSubColumns ? 3 : 2)}
      >
        <div className="GridInnerWrap min-w-max overflow-x-hidden">
          <GridHeader
            name={name}
            columns={columns}
            variant={variant}
            color={color}
            size={size}
            allSelected={selectAll === `${name}All`}
            sorting={sorting}
            filter={filter}
            handleAll={onMultiselectSubmit ? handleAll : undefined}
            handleSorting={handleSorting}
            setFilter={setFilter}
          />
          <GridBody
            pagedData={pagedData}
            selectedRows={selectedRows}
            columns={columnsInRow}
            multiselect={Boolean(onMultiselectSubmit)}
            variant={variant}
            color={color}
            size={size}
            isLoading={isLoading}
            rowsPerPage={selectedRowsPerPage}
            maxHeight={maxHeight}
            handleOnRowClick={onRowClick || onMultiselectSubmit ? handleOnRowClick : undefined}
          />
          <GridFooter
            filteredData={filteredData}
            selectedRowsPerPage={selectedRowsPerPage}
            pages={pages}
            selectedPage={selectedPage}
            variant={variant}
            color={color}
            size={size}
            hideExport={hideExport}
            setSelectedPage={setSelectedPage}
            setSelectedRowsPerPage={setSelectedRowsPerPage}
          />
        </div>
      </div>
      {onMultiselectSubmit ? (
        <Button {...multiselectButtonProps} onClick={() => onMultiselectSubmit(selectedRows)} />
      ) : null}
    </>
  )
}
