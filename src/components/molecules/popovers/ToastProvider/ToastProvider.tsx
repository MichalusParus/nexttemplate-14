'use client'
import {
  createContext,
  forwardRef,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { v4 as uuidv4 } from 'uuid'

import { Alert } from '@/components/atoms/common/Alert'
import { cn } from '@/utils/utils'

import { ClearButton } from '../../form/comboboxes/SelectField/Select/ClearButton'
import { AddToast, TOASTS_MAX, ToastType } from './types'

const ToastContext = createContext<{ addToast: AddToast }>({
  addToast: () => {},
})

export function useToast() {
  return useContext(ToastContext)
}

/** Toast component for displaying informations. Component ToastProvider should wrap content in layout. Creating new toast is possible with useToast hook. USE CLIENT */
export const ToastProvider = forwardRef<HTMLDivElement | null, PropsWithChildren>(
  ({ children }, ref) => {
    const timeoutIds = useRef<NodeJS.Timeout[]>([])
    const [toasts, setToasts] = useState<ToastType[]>([])

    const handleRemove = useCallback((id: string) => {
      setToasts(prev =>
        prev.map(t => (t.id === id && t.isVisible ? { ...t, isVisible: false } : t)),
      )
      const timeoutId = setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, 150)
      timeoutIds.current.push(timeoutId)
    }, [])

    const addToast: AddToast = useCallback(
      (status, message, title, options) => {
        if (toasts.length >= TOASTS_MAX) {
          console.warn('Toasts max count reached')
          return
        }
        const id = uuidv4()
        const newToast = {
          id,
          status,
          message,
          title,
          options: {
            isPersistent: options?.isPersistent || false,
            duration: options?.duration || 3000,
            alertProps: options?.alertProps || {},
          },
          isVisible: false,
        }
        setToasts(prev => [...prev, newToast])
        requestAnimationFrame(() => {
          setToasts(prev => prev.map(t => (t.id === id ? { ...t, isVisible: true } : t)))
        })
        if (options?.isPersistent) return
        const timeoutId = setTimeout(() => {
          handleRemove(id)
        }, options?.duration || 3000)
        timeoutIds.current.push(timeoutId)
      },
      [toasts.length, handleRemove],
    )

    const contextValue = useMemo(() => ({ addToast }), [addToast])

    useEffect(() => {
      return () => {
        timeoutIds.current.forEach(timeoutId => clearTimeout(timeoutId))
        timeoutIds.current = []
      }
    }, [])

    return (
      <ToastContext.Provider value={contextValue}>
        {children}
        {!!toasts.length &&
          createPortal(
            <div
              className={cn(
                'ToastsWrap',
                'fixed bottom-4 right-4 z-modal flex flex-col items-end gap-2',
              )}
              ref={ref}
              data-testid="ToastsWrap"
            >
              {toasts.map(({ id, status, message, title, options, isVisible }) => {
                const {
                  className: alertClassName,
                  variant,
                  size,
                  ...restAlertProps
                } = options.alertProps || {}
                return (
                  <Alert
                    key={id}
                    className={cn(
                      'Toast',
                      'max-w-64 translate-x-52 shadow-paper transition-position',
                      isVisible && 'translate-x-0',
                      alertClassName,
                    )}
                    status={status}
                    title={title}
                    endIcon={
                      options?.isPersistent ? (
                        <ClearButton onClick={() => handleRemove(id)} />
                      ) : undefined
                    }
                    variant={variant || 'contained'}
                    size={size || 'md'}
                    aria-live="polite"
                    aria-atomic="true"
                    data-testid="Toast"
                    {...restAlertProps}
                  >
                    {message}
                  </Alert>
                )
              })}
            </div>,
            document.body,
          )}
      </ToastContext.Provider>
    )
  },
)

ToastProvider.displayName = 'ToastProvider'
