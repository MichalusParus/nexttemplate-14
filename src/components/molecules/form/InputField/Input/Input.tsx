import { forwardRef, InputHTMLAttributes } from 'react'

import { Label, LabelProps } from '../../../../atoms/common/Label/Label'
import { disabledVariant, inputClass, inputSize, inputVariant } from './Input.style'

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'onChange' | 'name' | 'className' | 'width' | 'type'
> &
  Omit<LabelProps, 'name'> & {
    /** input type, text, number, password, search, date supported */
    type?: string
    /** name of form field */
    name: string
    /** style variant of component */
    variant?: 'text' | 'outlined' | 'contained'
    /** theme color of component, none disable styles for custom styling via className */
    color?: 'primary' | 'secondary' | 'terciary' | 'none'
    /** onChange function */
    onChange: (value: string | number) => void
  }

/** Basic styled uncontroled Input inside Label Component. For form purposes use InputField. Default InputHTMLAttributes props supported.  */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      type = 'text',
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
        <input
          className={`${inputClass} ${inputVariant[variant][color]} ${disabledVariant[variant]} ${inputSize[size]} ${errorShadow} ${hideMargin}`}
          id={name}
          name={name}
          type={type}
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

Input.displayName = 'Input'
