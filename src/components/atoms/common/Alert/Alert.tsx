import { forwardRef, ReactNode } from 'react'

import { childrenIconSize } from '@/components/utils/common.style'
import { NativeDivProps, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '../../icons'
import { Span } from '../../typography/Span'
import { alertClass, alertSize, alertVariant } from './Alert.style'

export type AlertStatusType = 'success' | 'info' | 'warning' | 'error' | 'none'

export type AlertProps = NativeDivProps &
  Omit<StyleProps, 'color'> & {
    /** for passing custom tailwind classes */
    className?: string
    /** status color of component, none disable styles for custom styling via className */
    status?: AlertStatusType
    /** Optional alert heading */
    title?: string
    /** choose status or pass custom svg icon on start  */
    startIcon?: ReactNode
    /** optional end icon  */
    endIcon?: ReactNode
  }

/** Alert component for diplaying success feedbacks, informations, warnings and errors. Native HTMLAttributes props supported. */
export const Alert = forwardRef<HTMLDivElement | null, AlertProps>(
  (
    {
      className,
      title,
      variant = 'outlined',
      status = 'success',
      size = 'md',
      startIcon,
      endIcon,
      children,
      ...rest
    },
    ref,
  ) => {
    const statusIcon: Record<AlertStatusType, ReactNode> = {
      success: <SuccessIcon aria-hidden="true" />,
      info: <InfoIcon aria-hidden="true" />,
      warning: <WarningIcon aria-hidden="true" />,
      error: <ErrorIcon aria-hidden="true" />,
      none: startIcon ?? null,
    }

    return (
      <div
        className={cn(
          'Alert',
          alertClass,
          alertVariant[variant][status],
          alertSize[size],
          childrenIconSize[size],
          className,
        )}
        role={status === 'error' ? 'alert' : undefined}
        ref={ref}
        data-testid="Alert"
        {...rest}
      >
        {statusIcon[status]}
        <div className={cn('AlertInnerWrap', 'flex flex-col')}>
          {title && <Span variant="bold">{title}</Span>}
          {children}
        </div>
        {endIcon}
      </div>
    )
  },
)

Alert.displayName = 'Alert'
