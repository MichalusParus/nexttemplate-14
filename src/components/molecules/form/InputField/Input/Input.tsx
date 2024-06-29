'use client'
import { forwardRef, InputHTMLAttributes } from 'react'

import { Label, LabelProps } from '../../../../atoms/common/Label/Label'
import {
  disabledVariant,
  inputClass,
  inputIconPosition,
  inputSize,
  inputVariant,
} from './Input.style'
import Button from '@/components/atoms/common/Button'
import XIcon from '@/components/atoms/icons/XIcon'
import { buttonIconSize } from '@/components/atoms/common/Button/Button.style'
import { checkVariant } from '../../CheckboxField/Checkbox/Checkbox.style'

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
    /** pass svg icon before input value */
    startIcon?: React.ReactNode
    /** onChange function */
    onChange: (value: string | number) => void
  }

/** Basic styled uncontroled Input inside Label Component. For form purposes use InputField. Default InputHTMLAttributes props supported. USE CLIENT */
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
      startIcon,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const errorShadow = error ? 'shadow-error' : ''
    const hideMargin = hideError ? '' : 'mb-1'
    const searchPadding = type === 'search' ? 'pr-7' : ''
    const startIconPadding = startIcon ? 'pl-9' : ''

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
        <div className={`relative w-full ${hideMargin}`}>
          <input
            className={`${inputClass} ${inputVariant[variant][color]} ${disabledVariant[variant]} ${inputSize[size]} ${errorShadow} ${searchPadding} ${startIconPadding}`}
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
          {startIcon ? (
            <span
              className={`left-1 ${inputIconPosition} ${checkVariant[variant][color]} ${buttonIconSize[size]}`}
            >
              {startIcon}
            </span>
          ) : null}
          {type === 'search' && value ? (
            <Button
              className={`ClearButton [&.Button]:right-1 ${inputIconPosition} ${buttonIconSize[size]}`}
              variant="text"
              color={color}
              size="none"
              startIcon={<XIcon />}
              onClick={() => onChange('')}
            />
          ) : null}
        </div>
      </Label>
    )
  },
)

Input.displayName = 'Input'
