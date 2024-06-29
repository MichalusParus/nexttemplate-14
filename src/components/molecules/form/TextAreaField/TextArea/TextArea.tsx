'use client'
import { forwardRef, TextareaHTMLAttributes } from 'react'

import { Label, LabelProps } from '../../../../atoms/common/Label/Label'
import {
  disabledVariant,
  inputClass,
  inputSize,
  inputVariant,
} from '../../InputField/Input/Input.style'

export type TextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'color' | 'size' | 'onChange' | 'name' | 'className' | 'width' | 'value'
> &
  Omit<LabelProps, 'name'> & {
    /** name of form field */
    name: string
    /** value of textarea */
    value?: string
    /** style variant of component */
    variant?: 'text' | 'outlined' | 'contained'
    /** theme color of component, none disable styles for custom styling via className */
    color?: 'primary' | 'secondary' | 'terciary' | 'none'
    /** onChange function */
    onChange: (value: string) => void
  }

/** Basic styled uncontroled TextArea inside Label Component. For form purposes use TextAreaField. Default TextareaHTMLAttributes props supported. USE CLIENT */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className = '',
      name,
      label,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      value,
      width,
      description,
      hideLabel,
      hideError,
      collapsed,
      disabled,
      error,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const errorShadow = error ? 'shadow-error' : ''
    const hideMargin = hideError ? '' : 'mb-1'

    return (
      <Label
        className={className}
        name={name}
        label={label}
        size={size}
        width={width}
        error={error}
        description={description}
        hideLabel={hideLabel}
        hideError={hideError}
        collapsed={collapsed}
      >
        <textarea
          className={`${inputClass} ${inputVariant[variant][color]} ${disabledVariant[variant]} ${inputSize[size]} ${errorShadow} ${hideMargin}`}
          id={name}
          name={name}
          value={value}
          disabled={disabled}
          ref={ref}
          tabIndex={disabled ? -1 : 0}
          onChange={e => onChange(e.target.value)}
          {...rest}
        />
      </Label>
    )
  },
)

TextArea.displayName = 'TextArea'
