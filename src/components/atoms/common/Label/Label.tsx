import { forwardRef, LabelHTMLAttributes } from 'react'

import { Alert } from '@/components/atoms/common/Alert'
import { FieldProps, InputProps, StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { labelClass, textSize } from './Label.style'

type NativeLabelProps = Omit<
  LabelHTMLAttributes<HTMLLabelElement>,
  'className' | 'color' | 'label' | 'name' | 'htmlFor' | 'onChange'
>

export type LabelProps = NativeLabelProps &
  Omit<FieldProps, 'labelProps'> &
  Omit<InputProps, 'placeholder'> & {
    /** size of component, none disable sizes for custom styling via className */
    size?: StyleProps['size']
    /** for setting width than default value as tailwind class */
    width?: string
    /** optional form component description */
    description?: string
    /** optional for legend instead of label */
    legend?: boolean
    /** change label for div FakeLabel */
    fakeLabel?: boolean
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
      size = 'md',
      width = 'w-full',
      error,
      description,
      legend,
      fakeLabel,
      hideLabel,
      hideError,
      children,
      ...rest
    },
    ref,
  ) => {
    const labelVisibility = hideLabel && 'hidden'
    const Element = legend ? 'legend' : 'div'

    return (
      <div
        className={cn('LabelWrap', 'relative flex flex-col items-start gap-0.5', width, className)}
        data-testid="LabelWrap"
      >
        {fakeLabel || legend ? (
          <Element
            id={`${name}-label`}
            className={cn('FakeLabel', labelClass, textSize[size], labelVisibility)}
            data-testid="FakeLabel"
          >
            {label}
          </Element>
        ) : (
          <label
            id={`${name}-label`}
            className={cn('Label', labelClass, textSize[size], labelVisibility)}
            htmlFor={name}
            ref={ref}
            data-testid="Label"
            {...rest}
          >
            {label}
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
