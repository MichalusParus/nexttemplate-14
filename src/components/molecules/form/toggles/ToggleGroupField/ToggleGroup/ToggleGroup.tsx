'use client'
import { FieldsetHTMLAttributes, forwardRef, useImperativeHandle, useRef } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { disabledVariant } from '@/components/utils/common.style'
import { useFocus } from '@/components/utils/hooks/useFocus'
import { InputProps, OptionType, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { toggleVariant, toggleWrapClass } from './ToggleGroup.style'

type ToggleOption = OptionType & {
  isDisabled?: boolean
}

export type ToggleGroupProps = Omit<FieldsetHTMLAttributes<HTMLDivElement>, 'className' | 'color' | 'name' | 'onChange' | 'value'> &
  Omit<InputProps, 'placeholder'> &
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
    const componentRef = useRef<HTMLDivElement>(null)
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
      ref,
      () => componentRef.current,
    )

    useFocus(true, componentRef, {
      triggerRef: { current: null },
      selectors: ['.ToggleButton'],
    })

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
      <div
        id={name}
        className={cn(
          'ToggleGroupWrap',
          toggleWrapClass,
          toggleVariant[variant][color],
          column && 'flex-col',
          error && 'error',
          disabled && 'disabled ' + disabledVariant[variant],
          className,
        )}
        role="group"
        aria-disabled={disabled}
        ref={componentRef}
        {...rest}
      >
        {options.map(({ value: toggleValue, label: radioLabel, content, isDisabled }, index) => {
          const isSelected = multiValue ? multiValue?.includes(toggleValue) : value === toggleValue
          const hasSelected = multiValue ? multiValue && multiValue.length > 0 : !!value
          const isFirstNonDisabled = !hasSelected && index === 0 && !isDisabled
          return (
            <Button
              key={toggleValue}
              className={cn(
                'ToggleButton',
                'flex-1 rounded-none border-none focus-visible:z-10',
                index === 0 && !column && 'rounded-l-md',
                index === options.length - 1 && !column && 'rounded-r-md',
                index === 0 && column && 'rounded-t-md',
                index === options.length - 1 && column && 'rounded-b-md',
                isSelected && 'selected',
                buttonClassName,
              )}
              variant={variant}
              color={color}
              size={size}
              hideShadow
              tabIndex={isSelected || isFirstNonDisabled ? 0 : -1}
              disabled={disabled || isDisabled}
              aria-pressed={isSelected}
              onClick={() => handleToggleClick(toggleValue)}
              {...restButtonProps}
            >
              {content || radioLabel}
            </Button>
          )
        })}
      </div>
    )
  },
)

ToggleGroup.displayName = 'ToggleGroup'
