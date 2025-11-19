import { useLayoutEffect, useState } from 'react'

export const usePortalContainer = (portalContainerId?: string): HTMLElement | null => {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    if (portalContainerId) {
      setPortalContainer(document.getElementById(portalContainerId))
    } else {
      setPortalContainer(document.body)
    }
  }, [portalContainerId])

  return portalContainer
}
