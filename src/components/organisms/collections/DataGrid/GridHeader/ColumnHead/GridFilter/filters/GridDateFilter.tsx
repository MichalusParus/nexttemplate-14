'use client'
import {
  DatePicker,
  DatePickerProps,
  DateValue,
} from '@/components/molecules/form/comboboxes/DatePickerField/DatePicker'
import {
  MultiDatePicker,
  MultiDatePickerProps,
} from '@/components/molecules/form/comboboxes/MultiDatePickerField/MultiDatePicker'
import {
  RangeDatePicker,
  RangeDatePickerProps,
} from '@/components/molecules/form/comboboxes/RangeDatePickerField/RangeDatePicker'
import { useDataGridContext } from '@/components/organisms/collections/DataGrid/utils/DataGridContext'
import { ColumnDef } from '@/components/organisms/collections/DataGrid/utils/types'
import { removeColumnFilter } from '@/components/organisms/collections/DataGrid/utils/utils'
import { FilterOperator } from '@/utils/hooks/useFilterData'

export type GridDateFilterProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** grid column definition */
  column: ColumnDef
  /** portal container id for nested dropdowns */
  portalContainerId?: string
}

/** GridDateFilter component renders correct DatePicker based on operator. USE CLIENT */
export const GridDateFilter = ({ className, column, portalContainerId }: GridDateFilterProps) => {
  const { variant, color, size, filter, setFilter } = useDataGridContext()
  const currentFilter = filter[column.name]

  const operator = filter[column.name]?.operator || column.filter?.operator || FilterOperator.EQUALS

  const isSimple =
    operator === FilterOperator.EQUALS ||
    operator === FilterOperator.GT ||
    operator === FilterOperator.GTE ||
    operator === FilterOperator.LT ||
    operator === FilterOperator.LTE
  const isMulti = operator === FilterOperator.IN
  const isRange = operator === FilterOperator.BETWEEN

  if (isSimple) {
    const simpleValue = (currentFilter?.value as DateValue) ?? ''

    return (
      <DatePicker
        className={className}
        name="date"
        placeholder={column.label}
        value={simpleValue}
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
        {...(column.filter?.filterProps as Partial<DatePickerProps>)}
      />
    )
  }

  if (isMulti) {
    const multiValue = Array.isArray(currentFilter?.value)
      ? (currentFilter.value as DateValue[])
      : []

    return (
      <MultiDatePicker
        className={className}
        name="date"
        placeholder={column.label}
        value={multiValue}
        variant={variant}
        color={color}
        size={size}
        dropdownProps={{ portalContainerId }}
        onChange={v => {
          if (v.length === 0) {
            setFilter(removeColumnFilter(filter, column.name))
          } else {
            setFilter({
              ...filter,
              [column.name]: { value: v, operator },
            })
          }
        }}
        {...(column.filter?.filterProps as Partial<MultiDatePickerProps>)}
      />
    )
  }

  if (isRange) {
    const rangeValue =
      typeof currentFilter?.value === 'object' &&
      currentFilter.value &&
      'start' in currentFilter.value &&
      'end' in currentFilter.value
        ? (currentFilter.value as { start: DateValue; end: DateValue })
        : { start: '', end: '' }

    return (
      <RangeDatePicker
        className={className}
        name="date"
        placeholder={column.label}
        value={rangeValue}
        variant={variant}
        color={color}
        size={size}
        dropdownProps={{ portalContainerId }}
        onChange={v => {
          if (!v.start && !v.end) {
            setFilter(removeColumnFilter(filter, column.name))
          } else {
            setFilter({
              ...filter,
              [column.name]: {
                value: v as { start: DateValue; end: DateValue },
                operator,
              },
            })
          }
        }}
        {...(column.filter?.filterProps as Partial<RangeDatePickerProps>)}
      />
    )
  }

  return null
}

GridDateFilter.displayName = 'GridDateFilter'
