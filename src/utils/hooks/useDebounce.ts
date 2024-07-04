import { useState } from 'react'

/** Hook for Debounce function. */
export const useDebounce = <T, A>(fn: (args: A) => T, delay: number) => {
  const [isDebouncePending, setIsDebouncePending] = useState(false)
  let timer: NodeJS.Timeout

  const debouncedFn = (args: A): Promise<T> => {
    setIsDebouncePending(true)
    return new Promise(resolve => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        setIsDebouncePending(false)
        resolve(fn(args))
      }, delay)
    })
  }

  return { debouncedFn: debouncedFn, isDebouncePending: isDebouncePending }
}
