'use client'
import { forwardRef } from 'react'

import { StyleProps } from '@/components/types'
import { FilterDef, SortingDef } from '@/utils/hooks/useFilterData'
import { cn } from '@/utils/utils'

import { ColumnDef } from '../types'
import { ColumnHead } from './ColumnHead'
import { rowgroupVariant } from './GridHeader.style'
import { SelectAllHead } from './SelectAllHead'

type GridHeaderProps = StyleProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** DataGrid name for id and aria purposes */
  name: string
  /** grid columns definition */
  columns: ColumnDef[]
  /** boolean for all rows selected */
  allSelected?: boolean
  /** current applied sort */
  sorting?: SortingDef
  /** current filter */
  filter?: FilterDef
  /** function for selecting all rows */
  handleAll?: () => void
  /** function for setting sorting */
  handleSorting?: (key: string) => void
  /** function for setting filter options */
  setFilter?: (value: FilterDef) => void
}

/** Header for DataGrid with select All and double row. USE CLIENT */
export const GridHeader = forwardRef<HTMLDivElement | null, GridHeaderProps>(
  (
    {
      className,
      name,
      columns,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      allSelected,
      sorting,
      filter,
      handleAll,
      handleSorting,
      setFilter,
    },
    ref,
  ) => {
    const haveSubColumns = columns.some(col => col.columns && col.columns.length > 0)
    const mergedSubColumns = columns.map(c => c.columns).flat()

    return (
      <div
        className={cn(
          'DataGridHeader',
          'relative rounded-t-md border pr-2',
          rowgroupVariant[variant][color],
          className,
        )}
        role="rowgroup"
        ref={ref}
      >
        <div className="GridRow flex" role="row">
          {handleAll && (
            <SelectAllHead
              className="rounded-none rounded-tl-md"
              name={name}
              variant={variant}
              color={color}
              size={size}
              isChecked={allSelected}
              handleAll={handleAll}
            />
          )}
          {columns.map((col, i) => (
            <ColumnHead
              className={cn(
                i === 0 && !handleAll && 'rounded-tl-md',
                i + 1 === columns.length && 'rounded-tr-md',
              )}
              key={col.label}
              name={name}
              column={col}
              variant={variant}
              color={color}
              size={size}
              sorting={sorting}
              filter={filter}
              handleSorting={haveSubColumns ? undefined : handleSorting}
              setFilter={haveSubColumns ? undefined : setFilter}
            />
          ))}
        </div>
        {haveSubColumns && (
          <div className="GridRow flex" role="row">
            {handleAll && (
              <SelectAllHead
                className="rounded-none rounded-tl-md"
                name={name}
                variant={variant}
                color={color}
                size={size}
                isChecked={allSelected}
                handleAll={handleAll}
              />
            )}
            {mergedSubColumns.map(col => (
              <ColumnHead
                key={col!.label}
                name={name}
                column={col!}
                variant={variant}
                color={color}
                size={size}
                sorting={sorting}
                filter={filter}
                handleSorting={handleSorting}
                setFilter={setFilter}
              />
            ))}
          </div>
        )}
      </div>
    )
  },
)

GridHeader.displayName = 'GridHeader'
