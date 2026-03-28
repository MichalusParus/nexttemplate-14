import { forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'

import { Alert, type AlertProps } from '@/components/atoms/common/Alert'
import { cn } from '@/utils/utils'

export const FormServerError = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, ...rest }, ref) => {
    const {
      formState: { errors, submitCount },
    } = useFormContext()
    const message = errors.root?.serverError?.message

    if (!message) return null

    return (
      <Alert
        key={submitCount}
        className={cn('FormServerError', className)}
        status="error"
        ref={ref}
        data-testid="FormServerError"
        {...rest}
      >
        {message}
      </Alert>
    )
  },
)

FormServerError.displayName = 'FormServerError'
