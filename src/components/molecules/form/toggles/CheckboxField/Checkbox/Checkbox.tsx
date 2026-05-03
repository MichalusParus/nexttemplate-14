'use client'
import { forwardRef, ReactNode, useCallback } from 'react'

import { CheckIcon, MinusIcon } from '@/components/atoms/icons'
import { disabledVariant, textSize } from '@/components/utils/common.style'
import { FieldProps, InputProps, NativeInputProps, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import {
  checkboxIconSize,
  checkboxMargin,
  checkboxVariant,
  checkboxWrapClass,
  checkIconDisabledVariant,
} from './Checkbox.style'

export type CheckboxProps = NativeInputProps &
  Pick<FieldProps, 'label'> &
  InputProps &
  StyleProps & {
    /** value of input — identity string used by groups and onChange */
    value: string
    /** optional element to display in label */
    content?: ReactNode
    /** optional checked status for Group use */
    isChecked: boolean
    /** isIndeterminate state */
    isIndeterminate?: boolean
    /** visual-only mode without input */
    fake?: boolean
    /** onChange function */
    onChange: (value: string) => void
  }

/** Basic styled Checkbox. For form purposes use CheckboxField. Native InputHTMLAttributes props supported. USE CLIENT */
export const Checkbox = forwardRef<HTMLInputElement | null, CheckboxProps>(
  (
    {
      className,
      name,
      label,
      content,
      value,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      isChecked,
      isIndeterminate = false,
      error,
      fake,
      disabled,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const setRef = useCallback(
      (node: HTMLInputElement | null) => {
        if (node) node.indeterminate = isIndeterminate
        if (typeof ref === 'function') ref(node)
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node
      },
      [isIndeterminate, ref],
    )

    const checkVisibility = isChecked || isIndeterminate ? 'opacity-100' : 'opacity-0'
    return (
      <div
        className={cn(
          'CheckboxWrap',
          'group flex items-start',
          !fake && checkboxMargin[size],
          className,
        )}
        data-testid="CheckboxWrap"
      >
        <div
          className={cn(
            'CheckboxInputWrap',
            'relative flex',
            checkboxWrapClass,
            !fake && 'mr-2',
            checkboxVariant[variant][color],
            checkboxIconSize[size],
            disabled && cn('disabled', disabledVariant[variant]),
          )}
          data-error={error || undefined}
          data-selected={((isChecked || isIndeterminate) && !fake) || undefined}
          aria-disabled={disabled}
          data-testid="CheckboxInputWrap"
        >
          {!fake && (
            <input
              id={name}
              className={cn(
                'absolute left-0 top-0 z-10 cursor-pointer opacity-0 disabled:cursor-not-allowed',
                checkboxIconSize[size],
              )}
              type="checkbox"
              name={name}
              value={value}
              onChange={e => onChange(e.target.value)}
              checked={isChecked}
              aria-invalid={!!error || undefined}
              disabled={disabled}
              ref={setRef}
              {...rest}
            />
          )}
          {isIndeterminate ? (
            <MinusIcon
              className={cn(
                'MinusIcon',
                'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-inherit',
                disabled && 'disabled',
                checkIconDisabledVariant[variant],
                checkboxIconSize[size],
                checkVisibility,
              )}
              data-testid="MinusIcon"
            />
          ) : (
            <CheckIcon
              className={cn(
                'CheckIcon',
                'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-inherit',
                disabled && 'disabled',
                checkIconDisabledVariant[variant],
                checkboxIconSize[size],
                checkVisibility,
              )}
              data-testid="CheckIcon"
            />
          )}
        </div>
        {!fake && (
          <label
            id={`${name}-label`}
            htmlFor={name}
            className={cn('Label', textSize[size])}
            data-testid="Label"
          >
            {content || label}
          </label>
        )}
      </div>
    )
  },
)

Checkbox.displayName = 'Checkbox'
