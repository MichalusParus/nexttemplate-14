import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

/** usePagination hook is used for slicing data on client side. */
export const usePagination = <T>(data: T[], itemsPerPage: number) => {
  const searchParams = useSearchParams()
  const loadMoreCountRef = useRef(0)
  const [loadMoreCount, setLoadMoreCount] = useState(0)
  const [pagedData, setPagedData] = useState<T[]>(() =>
    data.length > 0 ? data.slice(0, itemsPerPage) : [],
  )
  const [page, setPage] = useState(1)

  const pages = useMemo(() => {
    const pageCount = Math.ceil(data.length / itemsPerPage)
    return Array.from({ length: pageCount }, (_, i) => i + 1)
  }, [data.length, itemsPerPage])

  useEffect(() => {
    if (pages.length && page > pages.length) {
      setPage(1)
    }
  }, [pages.length, page])

  useEffect(() => {
    loadMoreCountRef.current = 0
    setLoadMoreCount(0)
    setPagedData(data.slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage))
  }, [data, page, itemsPerPage])

  useEffect(() => {
    setPage(1)
  }, [searchParams])

  const onLoadMore = useCallback(() => {
    loadMoreCountRef.current++
    setLoadMoreCount(loadMoreCountRef.current)
    const nextPageData = data.slice(
      (page + loadMoreCountRef.current) * itemsPerPage,
      (page + loadMoreCountRef.current) * itemsPerPage + itemsPerPage,
    )
    setPagedData(prev => [...prev, ...nextPageData])
  }, [data, page, itemsPerPage])

  const onChange = useCallback((newPage: number) => {
    loadMoreCountRef.current = 0
    setLoadMoreCount(0)
    setPage(newPage)
  }, [])

  return {
    pagedData,
    pages,
    page,
    loadMoreCount,
    onChange,
    onLoadMore,
  }
}
