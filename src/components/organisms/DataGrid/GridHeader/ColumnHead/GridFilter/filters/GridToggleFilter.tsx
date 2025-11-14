'use client'
import { MultiToggleGroup } from '@/components/molecules/form/inputs/MultiToggleGroupField/MultiToggleGroup'
import { ToggleGroup } from '@/components/molecules/form/inputs/ToggleGroupField/ToggleGroup'
import { useDataGridContext } from '@/components/organisms/DataGrid/utils/DataGridContext'
import { ColumnDef } from '@/components/organisms/DataGrid/utils/types'
import { removeColumnFilter } from '@/components/organisms/DataGrid/utils/utils'
import { FilterOperator } from '@/utils/hooks/useFilterData'
import { cn } from '@/utils/utils'

export type GridToggleFilterProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** grid column definition */
  column: ColumnDef
}

/** GridToggleFilter component renders ToggleGroup or MultiToggleGroup based on operator (EQUALS or IN). USE CLIENT */
export const GridToggleFilter = ({ className, column }: GridToggleFilterProps) => {
  const { variant, color, size, filter, setFilter } = useDataGridContext()
  const currentFilter = filter[column.name]

  // Type assertion: This component is only rendered when column.filter.type === 'toggle'
  if (!column.filter || column.filter.type !== 'toggle') return null

  const operator = filter[column.name]?.operator || column.filter.operator || FilterOperator.EQUALS

  const isMulti = operator === FilterOperator.IN

  if (isMulti) {
    const multiValue = Array.isArray(currentFilter?.value)
      ? currentFilter.value.map((v: string | number | Date) => String(v))
      : []

    return (
      <MultiToggleGroup
        className={cn('w-full', className)}
        name={column.name}
        value={multiValue}
        options={column.filter.options}
        variant={variant}
        color={color}
        size={size}
        onChange={v => {
          setFilter({
            ...filter,
            [column.name]: { value: v, operator },
          })
        }}
      />
    )
  }

  const singleValue = String(currentFilter?.value || '')

  return (
    <ToggleGroup
      className={cn('w-full', className)}
      name={column.name}
      value={singleValue}
      options={column.filter.options}
      variant={variant}
      color={color}
      size={size}
      onChange={v => {
        setFilter({
          ...filter,
          [column.name]: { value: v, operator },
        })
      }}
      onClear={() => setFilter(removeColumnFilter(filter, column.name))}
    />
  )
}

GridToggleFilter.displayName = 'GridToggleFilter'
