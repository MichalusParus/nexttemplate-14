'use client'
import { useMemo } from 'react'

import { paperVariant, textVariant } from '@/components/utils/common.style'
import { cn } from '@/utils/utils'

import { useDataGridContext } from '../utils/DataGridContext'
import { getColumnGridPosition, getColumnsAtDepth, getMaxDepth } from '../utils/utils'
import { ColumnHead } from './ColumnHead'
import { SelectAllHead } from './SelectAllHead'

type GridHeaderProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** grid template columns string */
  gridTemplateColumns: string
  /** boolean for all rows selected */
  allSelected?: boolean
  /** indeterminate state */
  isIndeterminate?: boolean
  /** function for selecting all rows */
  handleAll?: () => void
}

/** Header for DataGrid with multi-level nested rows. USE CLIENT */
export const GridHeader = ({
  className,
  gridTemplateColumns,
  allSelected,
  isIndeterminate,
  handleAll,
}: GridHeaderProps) => {
  const { variant, color, columns } = useDataGridContext()
  const maxDepth = useMemo(() => getMaxDepth(columns), [columns])
  const columnsByDepth = useMemo(
    () =>
      Array.from({ length: maxDepth }, (_, depth) =>
        getColumnsAtDepth(columns, depth, 0, maxDepth),
      ),
    [columns, maxDepth],
  )

  return (
    <div
      className={cn(
        'DataGridHeader',
        'relative grid rounded-t-md border pr-2',
        paperVariant[variant][color],
        textVariant[variant][color],
        className,
      )}
      style={{
        gridTemplateColumns: handleAll ? `max-content ${gridTemplateColumns}` : gridTemplateColumns,
        gridTemplateRows: `repeat(${maxDepth}, auto)`,
      }}
      role="rowgroup"
    >
      {handleAll && (
        <>
          <div
            className="rounded-tl-md"
            role="columnheader"
            aria-hidden="true"
            style={{
              gridColumn: '1',
              gridRow: `1 / span ${maxDepth - 1}`,
            }}
          />
          <SelectAllHead
            isChecked={allSelected}
            isIndeterminate={isIndeterminate}
            handleAll={handleAll}
            gridColumn="1"
            gridRow={`${maxDepth}`}
          />
        </>
      )}
      {columnsByDepth.map((columnsAtThisDepth, depth) => {
        const isFirstRow = depth === 0

        return columnsAtThisDepth.map((col, i) => {
          const isFirstCol = i === 0 && !handleAll
          const isLastCol = i + 1 === columnsAtThisDepth.length
          const isLeafColumn = !col.columns || col.columns.length === 0
          const isPlaceholder = col.name.includes('-placeholder-')
          const canInteract = isLeafColumn && !isPlaceholder

          return (
            <ColumnHead
              key={`${depth}-${col.name}`}
              className={cn(
                isFirstRow && isFirstCol && 'rounded-tl-md',
                isFirstRow && isLastCol && 'rounded-tr-md',
              )}
              gridColumn={getColumnGridPosition(columns, col, depth, handleAll ? 1 : 0)}
              gridRow={`${depth + 1}`}
              ariaRowIndex={depth + 1}
              column={col}
              canSort={canInteract}
              canFilter={canInteract}
            />
          )
        })
      })}
    </div>
  )
}

GridHeader.displayName = 'GridHeader'
