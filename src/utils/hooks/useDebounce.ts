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
        return
      }
      timer = setTimeout(() => {
        resolve(fn(args))
        setIsDebouncePending(false)
      }, delay)
    })
  }

  return { debouncedFn: debouncedFn, isDebouncePending: isDebouncePending }
}
