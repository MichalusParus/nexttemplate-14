// TODO: Enhance to match @nuqs/adapters feature set (debouncing, history mode, serialization)
import { isSameDay } from 'date-fns'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

type FilterValue = string | unknown[] | number | boolean | Date

interface KeyType<T extends FilterValue> {
  key: string
  defaultValue?: T
}

// Serves as hook for managing search params for filtering data. Filters returns value of passed defaultValue of keys prop. UpdateFilters updates search params with new filters. Arrays are converted to string Array on return.
export const useSearchParamsFilter = <T extends Record<string, FilterValue>>(
  keys: KeyType<FilterValue>[],
) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const getValueFromParam = useCallback(
    (key: KeyType<FilterValue>) => {
      if (Array.isArray(key.defaultValue)) {
        const values = searchParams.getAll(key.key)
        return values.length ? values : []
      }
      const paramValue = searchParams.get(key.key)
      if (typeof key.defaultValue === 'number') {
        return paramValue ? Number(paramValue) : key.defaultValue
      } else if (typeof key.defaultValue === 'boolean') {
        return paramValue === 'true'
      } else if (key.defaultValue instanceof Date) {
        return paramValue ? new Date(paramValue) : key.defaultValue
      } else {
        return paramValue !== null ? paramValue : key.defaultValue
      }
    },
    [searchParams],
  )

  const getSearchParamString = useCallback(
    <T extends Record<string, FilterValue>>(
      newFilters: T,
      keys: KeyType<FilterValue>[],
    ): string => {
      const params = new URLSearchParams(searchParams.toString())

      for (const key of keys) {
        const value = newFilters[key.key]

        if (Array.isArray(key.defaultValue) && Array.isArray(value)) {
          params.delete(key.key)
          const arrayValue = value.map(v => String(v))
          arrayValue.forEach(v => params.append(key.key, v))
        } else if (key.defaultValue instanceof Date) {
          const dateValue = value as Date
          if (!isSameDay(dateValue, key.defaultValue)) {
            params.set(key.key, dateValue.toISOString())
          } else {
            params.delete(key.key)
          }
        } else {
          const stringValue = String(value)
          if (stringValue !== String(key.defaultValue)) {
            params.set(key.key, stringValue)
          } else {
            params.delete(key.key)
          }
        }
      }

      return `?${params.toString()}`
    },
    [searchParams],
  )

  const filters = useMemo(() => {
    return Object.fromEntries(keys.map(k => [k.key, getValueFromParam(k)])) as T
  }, [keys, getValueFromParam])

  const updateFilters = useCallback(
    (update: Partial<T>) => {
      const newFilters: T = { ...filters, ...update }
      const newQueryString = getSearchParamString<T>(newFilters, keys)
      if (newQueryString !== window.location.search) {
        router.push(window.location.pathname + newQueryString)
      }
    },
    [filters, keys, router, getSearchParamString],
  )

  return { filters, updateFilters }
}
