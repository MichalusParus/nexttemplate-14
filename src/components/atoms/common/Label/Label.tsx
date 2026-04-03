import { forwardRef, LabelHTMLAttributes } from 'react'

import { Alert } from '@/components/atoms/common/Alert'
import { textSize } from '@/components/utils/common.style'
import { FieldProps, InputProps, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

type NativeLabelProps = Omit<
  LabelHTMLAttributes<HTMLLabelElement>,
  'className' | 'color' | 'label' | 'name' | 'htmlFor' | 'onChange'
>

export type LabelProps = NativeLabelProps &
  Omit<FieldProps, 'labelProps'> &
  Omit<InputProps, 'placeholder'> & {
    /** rendering variant: label (default), div for custom widgets, legend for fieldset groups */
    variant?: 'label' | 'div' | 'legend'
    /** size of component, none disable sizes for custom styling via className */
    size?: StyleProps['size']
    /** for setting width than default value as tailwind class */
    width?: string
    /** optional form component description */
    description?: string
    /** show required asterisk after label */
    required?: boolean
    /** hide visually label for minimalitic form components */
    hideLabel?: boolean
    /** hide visually error for minimalitic form components */
    hideError?: boolean
  }

/** Label wrapper for form components with inherited font color. Native LabelHTMLAttributes props supported. */
export const Label = forwardRef<HTMLLabelElement | null, LabelProps>(
  (
    {
      className,
      name,
      label,
      description,
      width = 'w-full',
      variant = 'label',
      size = 'md',
      error,
      required,
      hideLabel,
      hideError,
      children,
      ...rest
    },
    ref,
  ) => {
    const labelVisibility = hideLabel && 'sr-only'
    const Element = variant === 'legend' ? 'legend' : 'div'

    return (
      <div
        className={cn('LabelWrap', 'min-w-0 relative flex flex-col items-start gap-0.5', width, className)}
        data-testid="LabelWrap"
      >
        {variant !== 'label' ? (
          <Element
            id={`${name}-label`}
            className={cn('FakeLabel', 'text-inherit', textSize[size], labelVisibility)}
            data-testid="FakeLabel"
          >
            {label}
            {required && <span aria-hidden="true"> *</span>}
          </Element>
        ) : (
          <label
            id={`${name}-label`}
            className={cn('Label', 'text-inherit', textSize[size], labelVisibility)}
            htmlFor={name}
            ref={ref}
            data-testid="Label"
            {...rest}
          >
            {label}
            {required && <span aria-hidden="true"> *</span>}
          </label>
        )}
        {children}
        <Alert
          id={`${name}-description`}
          className={cn(error || description ? 'opacity-100' : 'opacity-0', hideError && 'hidden')}
          variant="text"
          status={description && !error ? 'info' : 'error'}
          size="sm"
          aria-hidden={!description && !error}
        >
          {(description && !error ? description : error) || ' '}
        </Alert>
      </div>
    )
  },
)

Label.displayName = 'Label'
