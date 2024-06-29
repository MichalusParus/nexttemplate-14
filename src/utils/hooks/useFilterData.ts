import { useEffect, useState } from 'react'

export type SortingDef = { [key: string]: 'asc' | 'dec' | 'none' }
export type FilterDef = { [key: string]: string }

export const useFilterData = <T>(data: T[]) => {
  const [sorting, setSorting] = useState<SortingDef>({})
  const [filter, setFilter] = useState<FilterDef>({})
  const [filteredData, setFilteredData] = useState<T[]>(data)
  const [sortedData, setSortedData] = useState<T[]>(filteredData)

  const handleSorting = (key: string) => {
    if (key in sorting) {
      if (sorting[key] === 'none') {
        setSorting({ [key]: 'asc' })
      } else if (sorting[key] === 'asc') {
        setSorting({ [key]: 'dec' })
      } else if (sorting[key] === 'dec') {
        setSorting({ [key]: 'none' })
      }
    } else {
      setSorting({ [key]: 'asc' })
    }
  }

  const reset = () => {
    setSorting({})
    setFilter({})
  }

  useEffect(() => {
    if (Object.keys(filter).length) {
      let filtered = data
      Object.entries(filter).forEach(
        f =>
          (filtered = filtered.filter(d =>
            String(d[f[0] as keyof (typeof filtered)[0]]).includes(f[1]),
          )),
      )
      setFilteredData(filtered)
    } else {
      setFilteredData(data)
    }
  }, [data, filter])

  useEffect(() => {
    const key = Object.keys(sorting)[0] as keyof (typeof filteredData)[0]
    const handleSort = (a: T, b: T) => (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0)
    if (sorting[key as keyof typeof filter] === 'asc') {
      setSortedData(filteredData.map(x => x).sort((a, b) => handleSort(a, b)))
    } else if (sorting[key as keyof typeof filter] === 'dec') {
      setSortedData(filteredData.map(x => x).sort((a, b) => handleSort(b, a)))
    } else {
      setSortedData(filteredData)
    }
  }, [sorting, filteredData])

  return {
    filteredData: sortedData,
    sorting: sorting,
    filter: filter,
    handleSorting: handleSorting,
    setFilter: setFilter,
    reset: reset,
  }
}
