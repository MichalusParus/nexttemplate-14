import { ReactNode } from 'react'

import { AlertProps, AlertStatusType } from '@/components/atoms/common/Alert'

export const TOASTS_MAX = 20

export type ToastOptions = {
  isPersistent?: boolean
  duration?: number
  alertProps?: AlertProps
}

export type AddToast = (
  status: AlertStatusType,
  message: ReactNode,
  title?: string,
  options?: ToastOptions,
) => void

export type ToastType = {
  id: string
  status: AlertStatusType
  message: ReactNode
  title?: string
  options: ToastOptions
  isVisible?: boolean
}
