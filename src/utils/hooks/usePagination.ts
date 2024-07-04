import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

/** usePagination hook is used for slicing data on client side. */
export const usePagination = <T>(data: T[], itemsPerPage: number) => {
  const searchParams = useSearchParams()
  const loadMoreCountRef = useRef(0)
  const [pagedData, setPagedData] = useState(data.slice(0, itemsPerPage))
  const [selectedPage, setSelectedPage] = useState(1)
  const pages = []
  const maxPageIndex =
    data.length % itemsPerPage === 0 ? data.length / itemsPerPage - 1 : data.length / itemsPerPage
  for (let i = 0; i <= maxPageIndex; i++) {
    pages.push(i + 1)
  }

  if (pages.length && selectedPage > pages.length) {
    setSelectedPage(1)
  }

  useEffect(() => {
    loadMoreCountRef.current = 0
    setPagedData(
      data.slice(
        (selectedPage - 1) * itemsPerPage,
        (selectedPage - 1) * itemsPerPage + itemsPerPage,
      ),
    )
  }, [data, selectedPage, itemsPerPage, setPagedData])

  useEffect(() => {
    setSelectedPage(1)
  }, [searchParams, setSelectedPage])

  const onLoadMore = useCallback(() => {
    loadMoreCountRef.current++
    const nextPageData = data.slice(
      (selectedPage + loadMoreCountRef.current) * itemsPerPage,
      (selectedPage + loadMoreCountRef.current) * itemsPerPage + itemsPerPage,
    )
    setPagedData(prev => [...prev, ...nextPageData])
  }, [data, selectedPage, itemsPerPage, setPagedData])
  return {
    pagedData: pagedData,
    pages: pages,
    selectedPage: selectedPage,
    loadMoreCount: loadMoreCountRef.current,
    setSelectedPage: setSelectedPage,
    onLoadMore: onLoadMore,
  }
}
