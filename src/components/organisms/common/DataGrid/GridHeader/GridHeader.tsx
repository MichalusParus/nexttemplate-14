import { FilterDef, SortingDef } from '@/utils/hooks/useFilterData'

import ColumnHead from '../ColumnHead'
import { ColumnDef } from '../types'
import { rowgroupVariant } from './GridHeader.style'

type Props = {
  /** for passing custom tailwind classes */
  className?: string
  /** DataGrid name for id and aria purposes */
  name: string
  /** grid columns definition */
  columns: ColumnDef[]
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'none'
  /** size of component, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'none'
  /** boolean for all rows selected */
  allSelected?: boolean
  /** current applied sort */
  sorting: SortingDef
  /** current filter */
  filter: FilterDef
  /** function for selecting all rows */
  handleAll?: () => void
  /** function for setting sorting */
  handleSorting?: (key: string) => void
  /** function for setting filter options */
  setFilter?: (value: FilterDef) => void
}

/** Header for DataGrid with select All. */
export const GridHeader = ({
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
}: Props) => {
  const haveSubColumns = columns.some(col => col.columns && col.columns.length > 0)
  const mergedSubColumns = columns.map(c => c.columns).flat()

  return (
    <div
      className={`DataGridHeader ${className} relative rounded-t-md border pr-2 ${rowgroupVariant[variant][color]}`}
      role="rowgroup"
    >
      <div className="GridRow flex" role="row">
        {handleAll ? (
          <ColumnHead
            className={'[&.ColumnHeader]:rounded-none [&.ColumnHeader]:rounded-tl-md'}
            name={name}
            column={columns[0]}
            variant={variant}
            color={color}
            size={size}
            allSelected={allSelected}
            sorting={sorting}
            filter={filter}
            handleAll={handleAll}
            handleSorting={haveSubColumns ? undefined : handleSorting}
            setFilter={haveSubColumns ? undefined : setFilter}
          />
        ) : null}
        {columns.map((col, i) => (
          <ColumnHead
            className={`${i === 0 && !handleAll ? 'rounded-tl-md' : ''} ${i + 1 === columns.length ? 'rounded-tr-md' : ''}`}
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
      {haveSubColumns ? (
        <div className="GridRow flex" role="row">
          {handleAll ? (
            <ColumnHead
              className="[&.ColumnHeader]:rounded-none"
              name={name}
              column={columns[0]}
              variant={variant}
              color={color}
              size={size}
              allSelected={allSelected}
              sorting={sorting}
              filter={filter}
              handleAll={handleAll}
              handleSorting={handleSorting}
              setFilter={setFilter}
            />
          ) : null}
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
      ) : null}
    </div>
  )
}

GridHeader.displayName = 'GridHeader'
