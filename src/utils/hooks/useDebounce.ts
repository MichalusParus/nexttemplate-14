import { useEffect, useState } from 'react'

/** Hook for Debounce. */
export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const [isDebouncePending, setIsDebouncePending] = useState(false)

  useEffect(() => {
    setIsDebouncePending(true)
    const handler = setTimeout(() => {
      setDebouncedValue(value)
      setIsDebouncePending(false)
    }, delay)
    return () => {
      clearTimeout(handler)
      setIsDebouncePending(false)
    }
  }, [value, delay])

  return { debouncedValue: debouncedValue, isDebouncePending: isDebouncePending }
}
