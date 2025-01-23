'use client'
import {
  forwardRef,
  KeyboardEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button/Button'
import { StyleProps } from '@/components/types'
import { useFilterData } from '@/utils/hooks/useFilterData'
// import { useFocus } from '@/utils/hooks/useFocus'
import { usePagination } from '@/utils/hooks/usePagination'
import { cn } from '@/utils/utils'

import { tableFocus } from './DataGrid.style'
import { GridBody } from './GridBody'
import { GridFooter } from './GridFooter'
import { GridHeader } from './GridHeader'
import { ColDef, ColumnDef, RowDef } from './types'

export type DataGridProps = StyleProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** DataGrid name for id and aria purposes */
  name: string
  /** grid column definition,name = row object key, label, width as basis tailwind class, grow, shrink, hidefilter and hideSort */
  columns: ColumnDef[]
  /** grid rows array */
  rows: RowDef[]
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
  multiselectButtonProps?: Partial<ButtonProps>
  /** onSubmit function for selected rows */
  onMultiselectSubmit?: (value: RowDef[]) => void
  /** function for clicable rows */
  onRowClick?: (value: RowDef) => void
}

// focus first and pagination, when focus inside, keyboard navigation
// renderCell fn
// check scrollability horozontal, header mainly, columns must have same size

/** Grid "table" for displaying data in rows with filter, sort, pagination, data export, onClick and multiselection. USE CLIENT */
export const DataGrid = forwardRef<HTMLDivElement, DataGridProps>(
  (
    {
      className,
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
    },
    ref,
  ) => {
    const componentRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => componentRef.current!)
    const [selectedRows, setSelectedRows] = useState<RowDef[]>([])
    const [selectedRowsPerPage, setSelectedRowsPerPage] = useState(rowsPerPage)
    const [isGridFocusOpen, setIsGridFocusOpen] = useState(false)
    const { filteredData, sorting, filter, setFilter, handleSorting } = useFilterData(rows)
    const { pagedData, pages, selectedPage, setSelectedPage } = usePagination(
      filteredData,
      selectedRowsPerPage,
    )
    const [selectAll, setSelectAll] = useState('none')
    const haveSubColumns = columns.some(col => col.columns && col.columns.length > 0)
    const mergedSubColumns = columns.map(c => c.columns).flat()
    const columnsInRow = haveSubColumns ? (mergedSubColumns as ColDef[]) : columns
    // const { focusableEl } = useFocus(
    //   isGridFocusOpen,
    //   componentRef,
    //   [
    //     '.RowButton:not(.cursor-default)',
    //     '.SubColButton',
    //     '.Combobox',
    //     '.ExportButton',
    //     '.LeftChevronButton',
    //     '.RightChevronButton',
    //     '.SelectAll:not(.cursor-default)',
    //   ],
    //   () => setIsGridFocusOpen(false),
    // )

    const handleAll = useCallback(() => {
      if (selectAll === 'none') {
        setSelectedRows(filteredData)
        setSelectAll(`${name}All`)
      } else {
        setSelectedRows([])
        setSelectAll('none')
      }
    }, [name, filteredData, setSelectedRows, selectAll])

    const handleSelect = useCallback(
      (row: RowDef) => {
        if (selectedRows.length > 0 && selectedRows.map(r => r.id).includes(row.id)) {
          setSelectedRows(selectedRows.filter(rows => rows.id !== row.id))
        } else {
          setSelectedRows([...selectedRows, row])
        }
      },
      [selectedRows, setSelectedRows],
    )

    const handleRowClick = useCallback(
      (row: RowDef) => {
        if (onRowClick) {
          onRowClick(row)
        } else if (onMultiselectSubmit) {
          handleSelect(row)
        }
      },
      [onRowClick, onMultiselectSubmit, handleSelect],
    )

    const handleClick = useCallback(
      (e: MouseEvent) => {
        const target = e.target as HTMLDivElement
        if (isGridFocusOpen && !componentRef.current?.contains(target)) {
          setIsGridFocusOpen(false)
          // if (focusableEl[0]) {
          //   focusableEl[0].focus()
          // }
        }
      },
      [isGridFocusOpen, componentRef],
    )

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement
        if (e.code === 'Space' || (e.code === 'Enter' && target.id === `grid-${name}`)) {
          e.preventDefault()
          setIsGridFocusOpen(prev => !prev)
        }
      },
      [name, setIsGridFocusOpen],
    )

    useEffect(() => {
      if (typeof window !== 'undefined') {
        window.addEventListener('click', handleClick)
        return () => {
          window.removeEventListener('click', handleClick)
        }
      }
    }, [handleClick])

    return (
      <>
        <div
          id={`grid-${name}`}
          className={cn(
            'DataGrid',
            'w-full overflow-x-auto rounded-md focus-visible:outline-1 focus-visible:outline-offset-1',
            tableFocus[color],
            !hideShadow && variant === 'contained' && 'shadow-button',
            className,
          )}
          ref={componentRef}
          role="grid"
          tabIndex={0}
          aria-label={`table-${name}`}
          aria-multiselectable={Boolean(onMultiselectSubmit)}
          aria-rowcount={rows.length + (haveSubColumns ? 3 : 2)}
          onKeyDown={handleKeyDown}
        >
          <div className={cn('GridInnerWrap', 'min-w-max overflow-x-hidden')}>
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
              handleRowClick={onRowClick || onMultiselectSubmit ? handleRowClick : undefined}
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
        {onMultiselectSubmit && (
          <Button
            {...multiselectButtonProps}
            onClick={() => onMultiselectSubmit(selectedRows)}
            data-testid="gridMultiselectSubmit"
          />
        )}
      </>
    )
  },
)

DataGrid.displayName = 'DataGrid'
