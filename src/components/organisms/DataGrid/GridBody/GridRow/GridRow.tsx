'use client'
import { memo } from 'react'

import { buttonVariant, iconOnlySize } from '@/components/atoms/common/Button/Button.style'
import { P } from '@/components/atoms/typography/P'
import { Checkbox } from '@/components/molecules/form/toggles/CheckboxField/Checkbox'
import { paddingSize, textSize } from '@/components/utils/common.style'
import { cn } from '@/utils/utils'

import { cellOverflow } from '../../GridHeader/ColumnHead/ColumnHead.style'
import { useDataGridContext } from '../../utils/DataGridContext'

export type GridRowProps<T extends Record<string, unknown> = Record<string, unknown>> = {
  /** for passing custom tailwind classes */
  className?: string
  /** row data */
  row?: T
  /** row index for aria-rowindex */
  rowIndex: number
  /** boolean for if this row is selected */
  isSelected?: boolean
  /** boolean for multiselect mode */
  multiselect: boolean
  /** grid template columns string */
  gridTemplateColumns: string
  /** loading state */
  isLoading?: boolean
  /** function to extract unique row id */
  getRowId?: (row: T) => string | number
  /** on row click handler */
  handleRowClick?: (row: T) => void
}

/** Row component for DataGrid body. USE CLIENT */
const GridRowComponent = <T extends Record<string, unknown> = Record<string, unknown>>({
  className,
  row,
  rowIndex,
  isSelected = false,
  multiselect,
  gridTemplateColumns,
  isLoading = false,
  getRowId,
  handleRowClick,
}: GridRowProps<T>) => {
  const { variant, color, size, columnsInRow } = useDataGridContext()
  const isRowInteractive = Boolean(handleRowClick || multiselect)

  const renderCellContent = (col: (typeof columnsInRow)[number]): React.ReactNode => {
    if (isLoading) {
      return <P size={size} color="none" isLoading />
    }
    if (!row) return null
    if (col.renderCell) {
      return col.renderCell(row)
    }
    const value = row[col.name]
    if (value == null) return null
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return value
    }
    if (typeof value === 'object' && 'type' in value && 'props' in value) {
      return value as React.ReactNode
    }
    return String(value)
  }

  const renderCell = (
    content: React.ReactNode,
    cellKey: string,
    cellClasses: string,
    colIndex: number,
  ) => (
    <div
      key={cellKey}
      role="gridcell"
      className={cn('GridCell', cellClasses, isSelected && 'selected')}
      aria-colindex={colIndex}
    >
      {content}
    </div>
  )

  const renderCells = () => {
    const cells: React.ReactNode[] = []
    const rowId = row && getRowId ? String(getRowId(row)) : `loading-${rowIndex}`

    if (multiselect) {
      cells.push(
        renderCell(
          <Checkbox
            name={rowId}
            label=""
            value={rowId}
            variant={variant === 'text' ? 'outlined' : variant}
            color={color}
            size={size}
            isChecked={isSelected}
            fake
            onChange={() => {}}
          />,
          `${rowId}-checkbox`,
          iconOnlySize[size],
          1,
        ),
      )
    }

    columnsInRow.forEach((col, index) => {
      cells.push(
        renderCell(
          renderCellContent(col),
          `${rowId}-${col.name}`,
          cn(
            'font-normal',
            cellOverflow,
            paddingSize[size],
            textSize[size],
            !isRowInteractive && 'cursor-text',
          ),
          index + (multiselect ? 2 : 1),
        ),
      )
    })

    return cells
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isRowInteractive && !isLoading && row && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      handleRowClick?.(row)
    }
  }

  const rowId = row && getRowId ? String(getRowId(row)) : `loading-${rowIndex}`

  return (
    <div
      id={rowId}
      className={cn('GridRow', className)}
      role="row"
      aria-rowindex={rowIndex}
      aria-selected={isRowInteractive && !isLoading ? isSelected : undefined}
    >
      <div
        className={cn(
          'RowInnerWrap',
          'grid w-full',
          isRowInteractive &&
            !isLoading && [
              'cursor-pointer',
              isSelected && 'selected',
              buttonVariant[variant][color],
            ],
        )}
        style={{
          gridTemplateColumns: multiselect
            ? `max-content ${gridTemplateColumns}`
            : gridTemplateColumns,
        }}
        {...(isRowInteractive &&
          !isLoading &&
          row && {
            role: 'button',
            tabIndex: 0,
            onClick: () => handleRowClick?.(row),
            onKeyDown: handleKeyDown,
          })}
      >
        {renderCells()}
      </div>
    </div>
  )
}

export const GridRow = memo(GridRowComponent, (prevProps, nextProps) => {
  if (prevProps.isLoading !== nextProps.isLoading) return false
  if (prevProps.isLoading && nextProps.isLoading) {
    return prevProps.rowIndex === nextProps.rowIndex
  }
  if (prevProps.row && nextProps.row && prevProps.getRowId && nextProps.getRowId) {
    return (
      prevProps.getRowId(prevProps.row) === nextProps.getRowId(nextProps.row) &&
      prevProps.isSelected === nextProps.isSelected
    )
  }
  return false
}) as typeof GridRowComponent
