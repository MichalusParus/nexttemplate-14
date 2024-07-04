import { forwardRef, LabelHTMLAttributes } from 'react'

import Alert from '@/components/atoms/common/Alert'
import { cn } from '@/utils/utils'

import { collapsedState, fieldWrapClass, labelClass, textSize } from './Label.style'

export type LabelProps = Omit<
  LabelHTMLAttributes<HTMLLabelElement>,
  'className' | 'color' | 'label' | 'name' | 'htmlFor' | 'onChange'
> & {
  /** for passing custom tailwind classes */
  className?: string
  /** id of form component for htmlFor */
  name?: string
  /** text content of label */
  label: string
  /** size of component, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'none'
  /** set collapsed state of label. Default is "flex-col md:flex-row" */
  collapsed?: 'always' | 'never' | 'default'
  /** for setting width than default value as tailwind class */
  width?: string
  /** if defined, error alert is vissible with error string */
  error?: string
  /** optional form component description */
  description?: string
  /** change label for div FakeLabel */
  fakeLabel?: boolean
  /** hide visually label for minimalitic form components */
  hideLabel?: boolean
  /** hide visually error for minimalitic form components */
  hideError?: boolean
}

/** Label wrapper for form components with inherited font color. Full or collapsed state. Default LabelHTMLAttributes props supported. */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      className = '',
      name,
      label,
      size = 'md',
      collapsed = 'default',
      width = 'w-full',
      error,
      description,
      fakeLabel,
      hideLabel,
      hideError,
      children,
      ...rest
    },
    ref,
  ) => {
    const labelVisibility = hideLabel ? 'hidden' : ''

    return (
      <div
        className={cn(
          'LabelWrap',
          'relative flex items-start',
          collapsedState[collapsed],
          width,
          className,
        )}
        data-testid="LabelWrap"
      >
        {fakeLabel ? (
          <div className={cn('FakeLabel', labelClass, textSize[size], labelVisibility)}>
            {label}
          </div>
        ) : (
          <label
            id={'label-' + name}
            className={cn('Label', labelClass, textSize[size], labelVisibility)}
            htmlFor={name}
            ref={ref}
            data-testid="Label"
            {...rest}
          >
            {label}
          </label>
        )}
        <div className={cn('FieldWrap', fieldWrapClass)}>
          {children}
          {!hideError ? (
            <Alert
              id={`${name}-description`}
              className={cn('mb-2', error || description ? 'opacity-100' : 'opacity-0')}
              variant="text"
              status={description && !error ? 'info' : 'error'}
              size="sm"
            >
              {description && !error ? description : error}
            </Alert>
          ) : null}
        </div>
      </div>
    )
  },
)

Label.displayName = 'Label'
