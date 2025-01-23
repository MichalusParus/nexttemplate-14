'use client'
import {
  createContext,
  forwardRef,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

import { Alert, AlertStatusType } from '@/components/atoms/common/Alert'
import { cn } from '@/utils/utils'

// research autofocus on display, screen readers

type AddToast = (
  status: AlertStatusType,
  message: string,
  title?: string,
  duration?: number,
) => void

type ToastType = {
  id: number
  message: string
  title?: string
  status: AlertStatusType
}

const ToastContext = createContext<{ addToast: AddToast }>({
  addToast: () => {},
})

export function useToast() {
  return useContext(ToastContext)
}

/** Toast component for displaying informations. Component ToastProvider should wrap content in layout. Creating new toast is possible with useToast hook. USE CLIENT */
export const ToastProvider = forwardRef<HTMLDivElement, PropsWithChildren<Record<never, never>>>(
  ({ children }, ref) => {
    const [mounted, setMounted] = useState(false)
    const [toasts, setToasts] = useState<ToastType[]>([])

    const addToast = (
      status: AlertStatusType,
      message: string,
      title?: string,
      duration = 3000,
    ) => {
      const id = Date.now()
      setToasts(prev => [...prev, { id, message, title, status }])
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id))
      }, duration)
    }

    useEffect(() => {
      setMounted(true)
    }, [])

    return (
      <ToastContext.Provider value={{ addToast }}>
        {children}
        {mounted &&
          createPortal(
            <div
              className={cn('ToastsWrap', 'fixed bottom-4 right-4 z-modal flex flex-col gap-2')}
              ref={ref}
              data-testid="ToastsWrap"
            >
              {toasts.map(toast => (
                <Alert
                  key={toast.id}
                  status={toast.status}
                  variant="contained"
                  size="md"
                  title={toast.title}
                  aria-live="polite"
                  data-testid="Toast"
                >
                  {toast.message}
                </Alert>
              ))}
            </div>,
            document.body,
          )}
      </ToastContext.Provider>
    )
  },
)

ToastProvider.displayName = 'ToastProvider'
