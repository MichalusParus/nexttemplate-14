import { get, gt, gte, inRange, isEqual, isNil, isNumber, lt, lte, toLower } from 'lodash'
import { useCallback, useMemo, useState } from 'react'

import { RangeValue } from '@/components/molecules/form/comboboxes/RangeDatePickerField/RangeDatePicker'

import { normalizeDate } from '../utils'

export enum FilterOperator {
  EQUALS = 'equals',
  NOT_EQUALS = 'notEquals',
  IS_EMPTY = 'isEmpty',
  IS_NOT_EMPTY = 'isNotEmpty',
  CONTAINS = 'contains',
  STARTS_WITH = 'startsWith',
  ENDS_WITH = 'endsWith',
  GT = 'gt',
  GTE = 'gte',
  LT = 'lt',
  LTE = 'lte',
  BETWEEN = 'between',
  IN = 'in',
  NOT_IN = 'notIn',
}

export type FilterValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<string | number | Date>
  | Date
  | RangeValue

export type FilterCriteria = {
  value: FilterValue
  operator: FilterOperator
}

export type FilterDef = {
  [key: string]: FilterCriteria
}

export type SortingState = {
  key: string | null
  value: 'asc' | 'desc' | 'none'
}

const filterOperator = (
  value: unknown,
  { operator, value: filterValue }: FilterCriteria,
): boolean => {
  if (operator === FilterOperator.IS_EMPTY) {
    return isNil(value) || value === ''
  }
  if (operator === FilterOperator.IS_NOT_EMPTY) {
    return !isNil(value) && value !== ''
  }

  if (operator === FilterOperator.NOT_EQUALS) {
    if (isNil(filterValue) || filterValue === '') {
      return false
    }
    if (Array.isArray(filterValue) && filterValue.length === 0) {
      return false
    }
    if (isNil(value) || value === '') {
      return true
    }
    const normValue = normalizeDate(value)
    const normFilterValue = normalizeDate(filterValue)
    if (isNumber(normValue) && isNumber(normFilterValue)) {
      return normValue !== normFilterValue
    }
    return !isEqual(toLower(String(normValue)), toLower(String(normFilterValue)))
  }

  if (isNil(value) || value === '') {
    return false
  }

  if (isNil(filterValue) || filterValue === '') {
    return false
  }
  if (Array.isArray(filterValue) && filterValue.length === 0) {
    return false
  }

  const normValue = normalizeDate(value)
  const normFilterValue = normalizeDate(filterValue)

  switch (operator) {
    case FilterOperator.EQUALS:
      if (isNumber(normValue) && isNumber(normFilterValue)) {
        return normValue === normFilterValue
      }
      return isEqual(toLower(String(normValue)), toLower(String(normFilterValue)))

    case FilterOperator.CONTAINS:
      return toLower(String(normValue)).includes(toLower(String(normFilterValue)))

    case FilterOperator.STARTS_WITH:
      return toLower(String(normValue)).startsWith(toLower(String(normFilterValue)))

    case FilterOperator.ENDS_WITH:
      return toLower(String(normValue)).endsWith(toLower(String(normFilterValue)))

    case FilterOperator.GT:
      return gt(normValue, normFilterValue)

    case FilterOperator.GTE:
      return gte(normValue, normFilterValue)

    case FilterOperator.LT:
      return lt(normValue, normFilterValue)

    case FilterOperator.LTE:
      return lte(normValue, normFilterValue)

    case FilterOperator.BETWEEN:
      if (
        typeof filterValue === 'object' &&
        filterValue &&
        'start' in filterValue &&
        'end' in filterValue
      ) {
        const from = normalizeDate(filterValue.start)
        const to = normalizeDate(filterValue.end)
        if (!isNumber(from) || !isNumber(to) || !isNumber(normValue)) {
          return false
        }
        return inRange(normValue, from, to + 1)
      }
      return false

    case FilterOperator.IN:
      if (Array.isArray(filterValue)) {
        return filterValue.some(fv =>
          isEqual(toLower(String(normValue)), toLower(String(normalizeDate(fv)))),
        )
      }
      return false

    case FilterOperator.NOT_IN:
      if (Array.isArray(filterValue)) {
        return !filterValue.some(fv =>
          isEqual(toLower(String(normValue)), toLower(String(normalizeDate(fv)))),
        )
      }
      return false

    default:
      return false
  }
}

const sortComparator = <T>(key: string, direction: 'asc' | 'desc') => {
  return (a: T, b: T): number => {
    const valueA = key.includes('.') ? get(a, key) : a[key as keyof T]
    const valueB = key.includes('.') ? get(b, key) : b[key as keyof T]
    const normA = normalizeDate(valueA)
    const normB = normalizeDate(valueB)

    if (isNil(normA) && isNil(normB)) return 0
    if (isNil(normA)) return 1
    if (isNil(normB)) return -1

    if (isNumber(normA) && isNumber(normB)) {
      return direction === 'asc' ? normA - normB : normB - normA
    }

    const result = String(normA).localeCompare(String(normB))
    return direction === 'asc' ? result : -result
  }
}

/** useFilterData is hook for client side filtering and sorting. Supports dott notations on keys. */
export const useFilterData = <T extends Record<string, unknown>>(data: T[]) => {
  const [filter, setFilter] = useState<FilterDef>({})
  const [sorting, setSorting] = useState<SortingState>({ key: null, value: 'none' })

  const handleSorting = useCallback((key: string) => {
    setSorting(prev => {
      if (prev.key === key) {
        if (prev.value === 'none') return { key, value: 'asc' }
        if (prev.value === 'asc') return { key, value: 'desc' }
        return { key: null, value: 'none' }
      }
      return { key, value: 'asc' }
    })
  }, [])

  const reset = useCallback(() => {
    setSorting({ key: null, value: 'none' })
    setFilter({})
  }, [])

  const filteredData = useMemo(() => {
    if (Object.keys(filter).length === 0) return data

    const activeCriteria = Object.entries(filter).filter(([, criteria]) => {
      if (isNil(criteria.value) || criteria.value === '') return false
      if (Array.isArray(criteria.value) && criteria.value.length === 0) return false
      if (
        criteria.operator === FilterOperator.BETWEEN &&
        typeof criteria.value === 'object' &&
        criteria.value &&
        'start' in criteria.value &&
        'end' in criteria.value &&
        (isNil(criteria.value.start) || isNil(criteria.value.end))
      ) {
        return false
      }
      return true
    })
    if (activeCriteria.length === 0) return data

    return data.filter(item => {
      return activeCriteria.every(([key, criteria]) => {
        const value = get(item, key)
        return filterOperator(value, criteria)
      })
    })
  }, [data, filter])

  const sortedData = useMemo(() => {
    if (!sorting.key || sorting.value === 'none') return filteredData

    return [...filteredData].sort(sortComparator<T>(sorting.key, sorting.value))
  }, [filteredData, sorting])

  return {
    filteredData: sortedData,
    filter,
    sorting,
    reset,
    setFilter,
    handleSorting,
  }
}
