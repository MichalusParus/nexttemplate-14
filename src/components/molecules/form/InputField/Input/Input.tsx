'use client'
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

import Button from '@/components/atoms/common/Button'
import { buttonIconSize } from '@/components/atoms/common/Button/Button.style'
import XIcon from '@/components/atoms/icons/XIcon'

import { Label, LabelProps } from '../../../../atoms/common/Label/Label'
import { checkVariant } from '../../CheckboxField/Checkbox/Checkbox.style'
import {
  disabledVariant,
  inputClass,
  inputIconPosition,
  inputSize,
  inputVariant,
} from './Input.style'
import { cn } from '@/utils/utils'
import { useTranslations } from 'next-intl'

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
    startIcon?: ReactNode
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
    const t = useTranslations('Components')

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
        <div className={cn('InputWrap', 'relative w-full', !hideError && 'mb-1')}>
          <input
            className={cn(
              inputClass,
              inputVariant[variant][color],
              inputSize[size],
              disabledVariant[variant],
              error && 'shadow-error',
              startIcon && 'pl-9',
              type === 'search' && 'pr-7',
            )}
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
              className={cn(
                'left-2 inline-flex',
                inputIconPosition,
                checkVariant[variant][color],
                buttonIconSize[size],
              )}
            >
              {startIcon}
            </span>
          ) : null}
          {type === 'search' && value ? (
            <Button
              className={cn('ClearButton', 'right-1', inputIconPosition, buttonIconSize[size])}
              variant="text"
              color={color}
              size="none"
              startIcon={<XIcon />}
              aria-label={t('clear')}
              onClick={() => onChange('')}
            />
          ) : null}
        </div>
      </Label>
    )
  },
)

Input.displayName = 'Input'
