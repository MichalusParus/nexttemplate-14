import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

/** useNavigationBlocker hook is used for preventing navigation from page and showing custom confirmation modal. */
export const useNavigationBlocker = (shouldBlock: boolean = true) => {
  const router = useRouter()
  const pathname = usePathname()
  const isBackRef = useRef(false)
  const [isOpen, setIsOpen] = useState(false)
  const [blockedRoute, setBlockedRoute] = useState<string | null>(null)
  const originalPushRef = useRef(router.push)

  // For force navigation to url without confirmation modal
  const directPush = (url: string) => {
    originalPushRef.current(url)
  }

  // Push override for app navigation
  useEffect(() => {
    const handleNavigation = (url: string) => {
      if (!shouldBlock || url === pathname) {
        directPush(url)
        return
      }
      setBlockedRoute(url)
      setIsOpen(true)
    }

    router.push = (url => {
      handleNavigation(url)
    }) as typeof router.push
    const originalPush = originalPushRef.current
    return () => {
      router.push = originalPush
    }
  }, [shouldBlock, pathname, router])

  // Popstate event for back navigation and Beforeunload event for page reload. Beforeunload dialog cannot be customized.
  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!shouldBlock || isBackRef.current) return
      e.preventDefault()
    }
    const handleBack = (e: PopStateEvent) => {
      if (!shouldBlock || isBackRef.current) return
      e.preventDefault()
      isBackRef.current = true
      history.pushState(null, '', window.location.href)
      setIsOpen(true)
    }
    history.pushState(null, '', window.location.href)

    window.addEventListener('beforeunload', handleBeforeUnload, { signal })
    window.addEventListener('popstate', handleBack, { signal })
    return () => controller.abort()
  }, [shouldBlock])

  // for allowing navigation for confirmation modal. History -3 because of duplicated entries caused by history.pushState
  const proceedNavigation = () => {
    setIsOpen(false)
    setBlockedRoute(null)
    if (isBackRef.current) {
      window.history.go(-3)
      return
    } else if (blockedRoute) {
      directPush(blockedRoute)
    }
  }

  // for cancel navigation for confirmation modal
  const cancelNavigation = () => {
    setIsOpen(false)
    setBlockedRoute(null)
    isBackRef.current = false
  }

  return {
    isOpen,
    cancelNavigation,
    proceedNavigation,
    directPush,
  }
}
