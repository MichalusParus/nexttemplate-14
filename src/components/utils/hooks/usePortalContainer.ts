import { useLayoutEffect, useState } from 'react'

export const usePortalContainer = (portalContainerId?: string): HTMLElement => {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null)

  useLayoutEffect(() => {
    if (portalContainerId) {
      setPortalContainer(document.getElementById(portalContainerId))
    } else {
      setPortalContainer(document.body)
    }
  }, [portalContainerId])

  return portalContainer || document.body
}
