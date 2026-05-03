'use client'
import { useTranslations } from 'next-intl'

import { NumberInput } from '@/components/molecules/form/inputs/NumberField/NumberInput'
import { useDataGridContext } from '@/components/organisms/collections/DataGrid/utils/DataGridContext'
import { ColumnDef } from '@/components/organisms/collections/DataGrid/utils/types'
import { removeColumnFilter } from '@/components/organisms/collections/DataGrid/utils/utils'
import { FilterOperator } from '@/utils/hooks/useFilterData'

export type GridNumberFilterProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** grid column definition */
  column: ColumnDef
}

/** GridNumberFilter component renders input based on operator. USE CLIENT */
export const GridNumberFilter = ({ className, column }: GridNumberFilterProps) => {
  const t = useTranslations('Components')
  const { variant, color, size, filter, setFilter } = useDataGridContext()
  const currentFilter = filter[column.name]

  const operator = filter[column.name]?.operator || column.filter?.operator || FilterOperator.EQUALS

  const isBetween = operator === FilterOperator.BETWEEN

  if (isBetween) {
    const betweenValue =
      typeof currentFilter?.value === 'object' &&
      currentFilter.value &&
      'start' in currentFilter.value &&
      'end' in currentFilter.value
        ? (currentFilter.value as { start: number; end: number })
        : { start: undefined, end: undefined }

    return (
      <div className="flex flex-col gap-2">
        <NumberInput
          className={className}
          name={`${column.name}-start`}
          value={betweenValue.start}
          variant={variant}
          color={color}
          size={size}
          placeholder={t('min')}
          onChange={v => {
            const newValue = { start: v, end: betweenValue.end }
            if (newValue.start == null && newValue.end == null) {
              setFilter(removeColumnFilter(filter, column.name))
            } else {
              setFilter({
                ...filter,
                [column.name]: {
                  operator,
                  value: newValue,
                },
              })
            }
          }}
        />
        <NumberInput
          className={className}
          name={`${column.name}-end`}
          value={betweenValue.end}
          variant={variant}
          color={color}
          size={size}
          placeholder={t('max')}
          onChange={v => {
            const newValue = { start: betweenValue.start, end: v }
            if (newValue.start == null && newValue.end == null) {
              setFilter(removeColumnFilter(filter, column.name))
            } else {
              setFilter({
                ...filter,
                [column.name]: {
                  operator,
                  value: newValue,
                },
              })
            }
          }}
        />
      </div>
    )
  }

  const singleValue = typeof currentFilter?.value === 'number' ? currentFilter.value : undefined

  return (
    <NumberInput
      className={className}
      name={column.name}
      value={singleValue}
      variant={variant}
      color={color}
      size={size}
      placeholder={column.label}
      onChange={v => {
        if (v === undefined || v === null) {
          setFilter(removeColumnFilter(filter, column.name))
        } else {
          setFilter({
            ...filter,
            [column.name]: { operator, value: v },
          })
        }
      }}
    />
  )
}

GridNumberFilter.displayName = 'GridNumberFilter'
