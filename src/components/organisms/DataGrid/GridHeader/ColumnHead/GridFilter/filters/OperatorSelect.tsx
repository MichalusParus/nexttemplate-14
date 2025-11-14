'use client'
import { useTranslations } from 'next-intl'

import { Divider } from '@/components/atoms/common/Divider'
import { Select } from '@/components/molecules/form/comboboxes/SelectField/Select'
import { useDataGridContext } from '@/components/organisms/DataGrid/utils/DataGridContext'
import { ColumnDef } from '@/components/organisms/DataGrid/utils/types'
import { FilterOperator } from '@/utils/hooks/useFilterData'

const OPERATOR_SETS = {
  text: [
    FilterOperator.CONTAINS,
    FilterOperator.EQUALS,
    FilterOperator.NOT_EQUALS,
    FilterOperator.STARTS_WITH,
    FilterOperator.ENDS_WITH,
  ],
  number: [
    FilterOperator.EQUALS,
    FilterOperator.NOT_EQUALS,
    FilterOperator.GT,
    FilterOperator.GTE,
    FilterOperator.LT,
    FilterOperator.LTE,
    FilterOperator.BETWEEN,
  ],
  date: [
    FilterOperator.EQUALS,
    FilterOperator.GT,
    FilterOperator.GTE,
    FilterOperator.LT,
    FilterOperator.LTE,
    FilterOperator.BETWEEN,
    FilterOperator.IN,
  ],
  select: [FilterOperator.EQUALS, FilterOperator.IN],
  toggle: [FilterOperator.EQUALS, FilterOperator.IN],
}

const DEFAULT_OPERATORS: Record<keyof typeof OPERATOR_SETS, FilterOperator> = {
  text: FilterOperator.CONTAINS,
  number: FilterOperator.EQUALS,
  date: FilterOperator.EQUALS,
  select: FilterOperator.EQUALS,
  toggle: FilterOperator.EQUALS,
}

type FilterType = keyof typeof OPERATOR_SETS

export type OperatorSelectProps = {
  /** Column definition */
  column: ColumnDef
  /** portal container id for nested dropdowns */
  portalContainerId?: string
}

/** Operator selector that determines available operators based on filter type. USE CLIENT */
export const OperatorSelect = ({ column, portalContainerId }: OperatorSelectProps) => {
  const t = useTranslations('Components')
  const { variant, color, size, filter, setFilter } = useDataGridContext()

  if (!column.filter?.type) return null

  const filterType = column.filter.type as FilterType
  const currentOperator =
    filter[column.name]?.operator || column.filter.operator || DEFAULT_OPERATORS[filterType]
  const options = OPERATOR_SETS[filterType].map(op => ({
    label: t(`operators.${op}`),
    value: op,
  }))

  const handleOperatorChange = (newOperator: FilterOperator) => {
    const currentValue = filter[column.name]?.value
    const prevOperator = filter[column.name]?.operator || DEFAULT_OPERATORS[filterType]
    const needsClear =
      (newOperator === FilterOperator.IN && !Array.isArray(currentValue)) ||
      (prevOperator === FilterOperator.IN && newOperator !== FilterOperator.IN) ||
      (newOperator === FilterOperator.BETWEEN && typeof currentValue !== 'object') ||
      (prevOperator === FilterOperator.BETWEEN && newOperator !== FilterOperator.BETWEEN)

    setFilter({
      ...filter,
      [column.name]: { operator: newOperator, value: needsClear ? undefined : currentValue },
    })
  }

  return (
    <>
      <Divider className="bg-current" />
      <div className="flex items-center justify-between gap-8">
        <label className="text-inherit" htmlFor="operator">
          {t('dataGrid.operatorLabel')}
        </label>
        <Select
          name="operator"
          value={currentOperator}
          options={options}
          variant={variant}
          color={color}
          size={size}
          dropdownProps={{ portalContainerId, width: 'auto' }}
          onChange={handleOperatorChange}
        />
      </div>
    </>
  )
}

OperatorSelect.displayName = 'OperatorSelect'
