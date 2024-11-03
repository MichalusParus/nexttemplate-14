import { forwardRef, HTMLAttributes, ReactNode } from 'react'

import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '../../icons'
import { Span } from '../../typography/Span'
import { alertClass, alertIconSize, alertSize, alertVariant } from './Alert.style'

type NativeAlertProps = Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'title'>

export type AlertStatusType = 'success' | 'info' | 'warning' | 'error' | 'none'

export type AlertProps = NativeAlertProps &
  Omit<StyleProps, 'color'> & {
    /** for passing custom tailwind classes */
    className?: string
    /** status color and icon of component, none disable styles for custom styling via className */
    status?: AlertStatusType
    /** Optional alert heading */
    title?: string
    /** choose status or pass custom svg icon  */
    icon?: ReactNode
  }

/** Alert component for diplaying success feedbacks, informations, warnings and errors. Default HTMLAttributes props supported. */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'outlined',
      status = 'success',
      size = 'md',
      title,
      icon,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          'Alert',
          alertClass,
          alertVariant[variant][status],
          alertSize[size],
          alertIconSize[size],
          className,
        )}
        role="alert"
        ref={ref}
        {...rest}
      >
        {status === 'success' && <SuccessIcon />}
        {status === 'info' && <InfoIcon />}
        {status === 'warning' && <WarningIcon />}
        {status === 'error' && <ErrorIcon />}
        {icon && status === 'none' && icon}
        <div className="AlertInnerWrap flex flex-col px-1.5">
          <Span variant="bold">{title && title}</Span>
          <Span variant="none">{children}</Span>
        </div>
      </div>
    )
  },
)

Alert.displayName = 'Alert'
