'use client'
import {
  MultiSelect,
  MultiSelectProps,
} from '@/components/molecules/form/comboboxes/MultiSelectField/MultiSelect'
import { Select, SelectProps } from '@/components/molecules/form/comboboxes/SelectField/Select'
import { useDataGridContext } from '@/components/organisms/collections/DataGrid/utils/DataGridContext'
import { ColumnDef } from '@/components/organisms/collections/DataGrid/utils/types'
import { removeColumnFilter } from '@/components/organisms/collections/DataGrid/utils/utils'
import { FilterOperator } from '@/utils/hooks/useFilterData'

type SelectFilterValue = string | number | Date

export type GridSelectFilterProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** grid column definition */
  column: ColumnDef
  /** portal container id for nested dropdowns */
  portalContainerId?: string
}

/** GridSelectFilter component renders Select or MultiSelect based on operator (EQUALS or IN). USE CLIENT */
export const GridSelectFilter = ({
  className,
  column,
  portalContainerId,
}: GridSelectFilterProps) => {
  const { variant, color, size, filter, setFilter } = useDataGridContext()
  const currentFilter = filter[column.name]

  // Type assertion: This component is only rendered when column.filter.type === 'select'
  if (!column.filter || column.filter.type !== 'select') return null

  const operator = filter[column.name]?.operator || column.filter.operator || FilterOperator.EQUALS

  const isMulti = operator === FilterOperator.IN

  if (isMulti) {
    const multiValue = Array.isArray(currentFilter?.value)
      ? (currentFilter.value as SelectFilterValue[])
      : []

    return (
      <MultiSelect<SelectFilterValue>
        className={className}
        name={column.name}
        placeholder={column.name}
        value={multiValue}
        options={column.filter.options}
        variant={variant}
        color={color}
        size={size}
        dropdownProps={{ portalContainerId }}
        onChange={v => {
          if (v.length === 0) {
            setFilter(removeColumnFilter(filter, column.name))
          } else {
            setFilter({ ...filter, [column.name]: { value: v, operator } })
          }
        }}
        {...(column.filter?.filterProps as Partial<MultiSelectProps<SelectFilterValue>>)}
      />
    )
  }

  const singleValue = (currentFilter?.value ?? '') as SelectFilterValue

  return (
    <Select<SelectFilterValue>
      className={className}
      name={column.name}
      placeholder={column.name}
      value={singleValue}
      options={column.filter.options}
      variant={variant}
      color={color}
      size={size}
      dropdownProps={{ portalContainerId }}
      onClear={() => setFilter(removeColumnFilter(filter, column.name))}
      onChange={v =>
        setFilter({
          ...filter,
          [column.name]: { value: v, operator },
        })
      }
      {...(column.filter?.filterProps as Partial<SelectProps<SelectFilterValue>>)}
    />
  )
}

GridSelectFilter.displayName = 'GridSelectFilter'
