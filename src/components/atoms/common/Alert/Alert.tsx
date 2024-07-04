import { forwardRef, HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utils/utils'

import ErrorIcon from '../../icons/ErrorIcon'
import InfoIcon from '../../icons/InfoIcon'
import SuccessIcon from '../../icons/SuccessIcon'
import WarningIcon from '../../icons/WarningIcon'
import Span from '../../typography/Span'
import { alertClass, alertIconSize, alertSize, alertVariant } from './Alert.style'

export type AlertProps = Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'title'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** status color and icon of component, none disable styles for custom styling via className */
  status?: 'success' | 'info' | 'warning' | 'error' | 'none'
  /** size of component, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'none'
  /** Optional alert heading */
  title?: string
  /** choose status or pass custom svg icon  */
  icon?: ReactNode
}

/** Alert component for diplaying success feedbacks, informations, warnings and errors. Default HTMLAttributes props supported. */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className = '',
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
        {status === 'success' ? <SuccessIcon /> : null}
        {status === 'info' ? <InfoIcon /> : null}
        {status === 'warning' ? <WarningIcon /> : null}
        {status === 'error' ? <ErrorIcon /> : null}
        {icon && status === 'none' ? icon : null}
        <div className="AlertInnerWrap flex flex-col px-1.5">
          <Span variant="bold">{title ? title : null}</Span>
          <Span variant="none">{children}</Span>
        </div>
      </div>
    )
  },
)

Alert.displayName = 'Alert'
