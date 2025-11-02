import { useCallback, useState } from 'react'

export const useInternalOpenState = (isOpen?: boolean, setIsOpen?: (value: boolean) => void) => {
  const isControlled = typeof isOpen !== 'undefined' && typeof setIsOpen === 'function'
  const [isInternallyOpen, setIsInternallyOpen] = useState(Boolean(isOpen))
  const openState = isControlled ? Boolean(isOpen) : isInternallyOpen

  const handleOpen = useCallback(
    (value: boolean) => {
      if (isControlled) setIsOpen(value)
      else setIsInternallyOpen(value)
    },
    [isControlled, setIsOpen],
  )

  return {
    isControlled,
    openState,
    handleOpen,
  }
}
