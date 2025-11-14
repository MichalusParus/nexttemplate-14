'use client'
import { FieldsetHTMLAttributes, forwardRef } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { Paper } from '@/components/atoms/containers/Paper'
import { InputProps, OptionType, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { disabledVariant } from '../../CheckboxField/Checkbox/Checkbox.style'
import { inputErrorClass } from '../../TextField/TextInput/TextInput.style'

type ToggleOption = OptionType & {
  isDisabled?: boolean
}

export type ToggleGroupProps = Omit<FieldsetHTMLAttributes<HTMLDivElement>, 'value' | 'onChange'> &
  InputProps &
  StyleProps & {
    /** value of toggleGroup */
    value?: string
    /** for multiple toggles */
    multiValue?: string[]
    /** group options for individual radio inputs */
    options: ToggleOption[]
    /** display radio inputs in column */
    column?: boolean
    /** allow deselecting by clicking selected toggle, default true */
    allowEmpty?: boolean
    /** optional radio props */
    buttonProps?: Partial<ButtonProps>
    /** optional callback for clearing selection */
    onClear?: () => void
    /** onChange function */
    onChange: (value: string) => void
  }

/** Basic styled uncontroled ToggleGroup. For form purposes use ToggleGroupField. Native DivHTMLAttributes and Button props supported. USE CLIENT */
export const ToggleGroup = forwardRef<HTMLDivElement | null, ToggleGroupProps>(
  (
    {
      className,
      name,
      value,
      options,
      multiValue,
      column,
      allowEmpty = true,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      disabled,
      error,
      buttonProps = {},
      onClear,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const { className: buttonClassName, ...restButtonProps } = buttonProps

    const handleToggleClick = (toggleValue: string) => {
      if (multiValue) {
        onChange(toggleValue)
        return
      }
      const isSelected = value === toggleValue
      if (isSelected) {
        if (allowEmpty) {
          onClear ? onClear() : onChange('')
        }
        return
      }
      onChange(toggleValue)
    }

    return (
      <Paper
        id={name}
        className={cn(
          'ToggleGroupWrap',
          'flex w-max justify-between overflow-hidden rounded-md',
          column && 'flex-col',
          error && !disabled && 'error ' + inputErrorClass,
          disabled && 'disabled ' + disabledVariant[variant],
          className,
        )}
        variant={variant}
        color={color}
        padding="0"
        hideShadow
        role="group"
        ref={ref}
        {...rest}
      >
        {options.map(({ value: toggleValue, label: radioLabel, content, isDisabled }) => (
          <Button
            key={toggleValue}
            className={cn(
              'ToggleButton',
              'flex-1 rounded-none',
              (multiValue ? multiValue?.includes(toggleValue) : value === toggleValue) &&
                'selected',
              buttonClassName,
            )}
            variant={variant === 'outlined' ? 'text' : variant}
            color={color}
            size={size}
            disabled={disabled || isDisabled}
            aria-pressed={multiValue ? multiValue?.includes(toggleValue) : value === toggleValue}
            onClick={() => handleToggleClick(toggleValue)}
            {...restButtonProps}
          >
            {content || radioLabel}
          </Button>
        ))}
      </Paper>
    )
  },
)

ToggleGroup.displayName = 'ToggleGroup'
