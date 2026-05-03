'use client'
import { isEqual } from 'lodash'
import { FieldsetHTMLAttributes, ForwardedRef, forwardRef, useCallback, useImperativeHandle, useRef } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { disabledVariant } from '@/components/utils/common.style'
import { devWarning } from '@/components/utils/devWarning'
import { useFocus } from '@/components/utils/hooks/useFocus'
import { InputProps, OptionType, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { toggleVariant, toggleWrapClass } from './ToggleGroup.style'

export type ToggleGroupProps<T = string> = Omit<FieldsetHTMLAttributes<HTMLDivElement>, 'className' | 'color' | 'name' | 'onChange' | 'value'> &
  Omit<InputProps, 'placeholder'> &
  StyleProps & {
    /** value of toggleGroup */
    value?: T
    /** for multiple toggles */
    multiValue?: T[]
    /** group options for individual toggles */
    options: OptionType<T>[]
    /** display toggles in column */
    column?: boolean
    /** allow deselecting by clicking selected toggle, default true */
    allowEmpty?: boolean
    /** optional button props */
    buttonProps?: Partial<Omit<ButtonProps, 'onClick' | 'aria-pressed' | 'tabIndex'>>
    /** optional callback for clearing selection */
    onClear?: () => void
    /** onChange function */
    onChange: (value: T | undefined) => void
  }

/** Basic styled uncontrolled ToggleGroup. For form purposes use ToggleGroupField. Native DivHTMLAttributes and Button props supported. USE CLIENT */
function ToggleGroupComponent<T = string>(
  {
    className,
    name,
    value,
    multiValue,
    options,
    column,
    allowEmpty = true,
    variant = 'outlined',
    color = 'primary',
    size = 'md',
    error,
    disabled,
    buttonProps = {},
    onClear,
    onChange,
    ...rest
  }: ToggleGroupProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
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

  devWarning(
    !rest['aria-label'] && !rest['aria-labelledby'],
    'ToggleGroup: no aria-label or aria-labelledby provided — group has no accessible name. Use ToggleGroupField or pass aria-label manually.',
  )

  const handleToggleClick = useCallback(
    (toggleValue: T) => {
      if (multiValue) {
        if (!allowEmpty && multiValue.length === 1 && multiValue.some(v => isEqual(v, toggleValue))) return
        onChange(toggleValue)
        return
      }
      const isSelected = isEqual(value, toggleValue)
      if (isSelected) {
        if (allowEmpty) {
          onClear ? onClear() : onChange(undefined)
        }
        return
      }
      onChange(toggleValue)
    },
    [multiValue, value, allowEmpty, onClear, onChange],
  )

  return (
    <div
      id={name}
      className={cn(
        'ToggleGroupWrap',
        toggleWrapClass,
        toggleVariant[variant][color],
        column && 'flex-col',
        disabled && 'disabled ' + disabledVariant[variant],
        className,
      )}
      data-error={error || undefined}
      role="group"
      aria-disabled={disabled}
      ref={componentRef}
      {...rest}
    >
      {options.map(({ value: toggleValue, label: toggleLabel, content, isDisabled, buttonProps: optionButtonProps }, index) => {
        const isSelected = multiValue ? multiValue.some(v => isEqual(v, toggleValue)) : isEqual(value, toggleValue)
        const hasSelected = multiValue ? multiValue && multiValue.length > 0 : !!value
        const isFirstNonDisabled = !hasSelected && index === options.findIndex(opt => !opt.isDisabled)
        return (
          <Button
            key={`${name}-${index}-${toggleLabel}`}
            className={cn(
              'ToggleButton',
              'flex-1 rounded-none border-none focus-visible:z-10',
              index === 0 && !column && 'rounded-l-md',
              index === options.length - 1 && !column && 'rounded-r-md',
              index === 0 && column && 'rounded-t-md',
              index === options.length - 1 && column && 'rounded-b-md',
              buttonClassName,
            )}
            data-selected={isSelected || undefined}
            variant={variant}
            color={color}
            size={size}
            hideShadow
            tabIndex={isSelected || isFirstNonDisabled ? 0 : -1}
            disabled={disabled || isDisabled}
            aria-pressed={isSelected}
            onClick={() => handleToggleClick(toggleValue)}
            {...restButtonProps}
            {...optionButtonProps}
          >
            {content || toggleLabel}
          </Button>
        )
      })}
    </div>
  )
}

type ToggleGroupComponentType = {
  <T = string>(
    props: ToggleGroupProps<T> & { ref?: ForwardedRef<HTMLDivElement> },
  ): React.ReactElement | null
  displayName?: string
}

export const ToggleGroup = forwardRef(ToggleGroupComponent) as ToggleGroupComponentType

ToggleGroup.displayName = 'ToggleGroup'
