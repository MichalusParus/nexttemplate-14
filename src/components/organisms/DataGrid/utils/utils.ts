import { isArray, isBoolean, isNil, isNumber, isString } from 'lodash'
import { isValidElement } from 'react'

import { FilterDef, FilterOperator } from '@/utils/hooks/useFilterData'

import { ColDef, ColumnDef } from './types'

export const removeColumnFilter = (filter: FilterDef, columnName: string): FilterDef => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [columnName]: _, ...rest } = filter
  return rest
}

export const updateColumnFilter = (
  filter: FilterDef,
  columnName: string,
  value: unknown,
  operator: FilterOperator,
): FilterDef => {
  if (value === undefined || value === null || value === '') {
    return removeColumnFilter(filter, columnName)
  }
  return {
    ...filter,
    [columnName]: { value, operator },
  }
}

export const getMaxDepth = <T = Record<string, unknown>>(columns: ColumnDef<T>[]): number => {
  if (!columns?.length) return 0
  const childDepths = columns
    .filter(col => col.columns && col.columns.length > 0)
    .map(col => getMaxDepth(col.columns!))

  return 1 + Math.max(0, ...childDepths)
}

export const buildGridTemplateColumns = <T = Record<string, unknown>>(
  columns: ColDef<T>[],
): string => {
  return columns
    .map(c => {
      if (c.shrink) {
        return c.width ? `minmax(0, ${c.width})` : 'auto'
      }

      if (typeof c.grow === 'number') {
        return c.width ? `minmax(${c.width}, ${c.grow}fr)` : `${c.grow}fr`
      }

      if (c.grow === true) {
        return c.width ? `minmax(${c.width}, 1fr)` : '1fr'
      }

      if (c.width) {
        return c.width
      }

      return '1fr'
    })
    .join(' ')
}

export const getFlatColumns = <T = Record<string, unknown>>(
  columns: ColumnDef<T>[],
): ColDef<T>[] => {
  return columns.flatMap(col =>
    col.columns && col.columns.length > 0 ? getFlatColumns(col.columns) : [col],
  )
}

export const getColumnsAtDepth = <T = Record<string, unknown>>(
  columns: ColumnDef<T>[],
  targetDepth: number,
  currentDepth = 0,
  maxDepth?: number,
): ColumnDef<T>[] => {
  return columns.flatMap(col => {
    const isLeaf = !col.columns || col.columns.length === 0

    if (col.columns && col.columns.length > 0) {
      if (currentDepth === targetDepth) {
        return [col]
      }
      return getColumnsAtDepth(col.columns, targetDepth, currentDepth + 1, maxDepth)
    }

    if (isLeaf && maxDepth !== undefined) {
      if (targetDepth === maxDepth - 1) {
        return [col]
      }
      if (currentDepth === targetDepth && targetDepth < maxDepth - 1) {
        return [
          {
            ...col,
            label: '',
            name: `${col.name}-placeholder-${targetDepth}`,
            hideSort: true,
            filter: undefined,
          },
        ]
      }
    }

    return []
  })
}

export const getColumnGridPosition = <T = Record<string, unknown>>(
  columns: ColumnDef<T>[],
  column: ColumnDef<T>,
  depth: number,
  offset = 0,
): string => {
  const columnPositions = new Map<ColumnDef<T>, number>()
  const leafColumnPositions = new Map<string, number>()
  let leafPosition = 1

  const assignPositions = (cols: ColumnDef<T>[], currentDepth: number): void => {
    for (const col of cols) {
      if (currentDepth === depth) {
        columnPositions.set(col, leafPosition)
      }

      if (col.columns && col.columns.length > 0) {
        assignPositions(col.columns, currentDepth + 1)
      } else {
        leafColumnPositions.set(col.name, leafPosition)
        leafPosition++
      }
    }
  }

  assignPositions(columns, 0)

  let position = columnPositions.get(column)

  if (!position) {
    if (column.name.includes('-placeholder-')) {
      const originalName = column.name.split('-placeholder-')[0]
      position = leafColumnPositions.get(originalName)
    } else {
      position = leafColumnPositions.get(column.name)
    }
  }

  const start = (position || 1) + offset
  const span = column.columns ? getFlatColumns([column]).length : 1
  return `${start} / span ${span}`
}

const escapeCsvField = (value: unknown): string => {
  const stringValue = String(value ?? '')
  if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
    return `"${stringValue.replaceAll('"', '""')}"`
  }
  return stringValue
}

export const exportToCSV = <T = Record<string, unknown>>(
  data: T[],
  columns: ColDef<T>[],
  filename = 'data-export.csv',
): boolean => {
  try {
    if (!data || data.length === 0) {
      console.warn('No data to export')
      return false
    }

    if (!columns || columns.length === 0) {
      console.warn('No columns defined for export')
      return false
    }

    const headers = columns.map(col => escapeCsvField(col.label))
    const rows = data.map(row =>
      columns.map(col => {
        if (col.renderCell) {
          const rendered = col.renderCell(row)
          if (rendered && typeof rendered === 'object' && 'props' in rendered) {
            return escapeCsvField(extractTextFromReactNode(rendered))
          }
          return escapeCsvField(rendered)
        }
        const value = (row as Record<string, unknown>)[col.name]
        return escapeCsvField(value)
      }),
    )
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\r\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', filename)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setTimeout(() => {
        URL.revokeObjectURL(url)
      }, 100)

      return true
    }

    return false
  } catch (error) {
    console.error('Failed to export CSV:', error)
    return false
  }
}

const extractTextFromReactNode = (node: unknown): string => {
  if (isNil(node)) return ''
  if (isString(node) || isNumber(node) || isBoolean(node)) {
    return String(node)
  }
  if (isArray(node)) {
    return node.map(extractTextFromReactNode).join(' ')
  }
  if (isValidElement(node)) {
    const props = node.props as Record<string, unknown>
    const children = props.children
    if (children != null) {
      return extractTextFromReactNode(children)
    }
    // Fallback to common text-bearing props
    if (isString(props.label)) return props.label
    if (isString(props.title)) return props.title
    if (isString(props.value)) return String(props.value)
    if (isString(props.text)) return props.text
  }

  return ''
}
