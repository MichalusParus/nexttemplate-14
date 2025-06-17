import { forwardRef, ReactNode } from 'react'

import { NativeDivProps, StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '../../icons'
import { Span } from '../../typography/Span'
import { alertClass, alertIconSize, alertSize, alertVariant } from './Alert.style'

export type AlertStatusType = 'success' | 'info' | 'warning' | 'error' | 'none'

export type AlertProps = NativeDivProps &
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

/** Alert component for diplaying success feedbacks, informations, warnings and errors. Native HTMLAttributes props supported. */
export const Alert = forwardRef<HTMLDivElement | null, AlertProps>(
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
        role={status === 'error' ? 'alert' : undefined}
        ref={ref}
        data-testid="Alert"
        {...rest}
      >
        {status === 'success' && <SuccessIcon aria-hidden="true" />}
        {status === 'info' && <InfoIcon aria-hidden="true" />}
        {status === 'warning' && <WarningIcon aria-hidden="true" />}
        {status === 'error' && <ErrorIcon aria-hidden="true" />}
        {icon && status === 'none' && icon}
        <div className={cn('AlertInnerWrap', 'flex flex-col px-1.5')}>
          {title && <Span variant="bold">{title}</Span>}
          <Span variant="none">{children}</Span>
        </div>
      </div>
    )
  },
)

Alert.displayName = 'Alert'
