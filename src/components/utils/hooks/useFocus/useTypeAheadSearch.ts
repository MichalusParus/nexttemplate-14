import { useEffect, useRef } from 'react'

import { TYPE_AHEAD_TIMEOUT } from './constants'
import { UseTypeAheadSearchReturn } from './types'

/**
 * Character buffer with timeout for type-ahead matching.
 * Accumulates typed characters and searches focusable elements by text content.
 * Buffer resets after 500ms of inactivity.
 */
export const useTypeAheadSearch = (
  isActive: boolean,
  enabled: boolean,
): UseTypeAheadSearchReturn => {
  const bufferRef = useRef<string>('')
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isActive) {
      bufferRef.current = ''
    }
  }, [isActive])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleTypeAhead = (
    key: string,
    focusable: HTMLElement[],
    currentIndex: number,
  ): number => {
    if (!enabled || !focusable.length) return -1

    if (timerRef.current) clearTimeout(timerRef.current)
    bufferRef.current += key.toLowerCase()
    timerRef.current = setTimeout(() => {
      bufferRef.current = ''
    }, TYPE_AHEAD_TIMEOUT)

    const search = bufferRef.current
    for (let offset = 1; offset <= focusable.length; offset++) {
      const index = (currentIndex + offset) % focusable.length
      const label = focusable[index].textContent?.trim().toLowerCase() || ''
      if (label.startsWith(search)) {
        return index
      }
    }
    return -1
  }

  const resetTypeAhead = () => {
    bufferRef.current = ''
  }

  return { handleTypeAhead, resetTypeAhead }
}
