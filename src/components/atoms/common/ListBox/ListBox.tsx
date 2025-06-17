'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, OlHTMLAttributes, PropsWithChildren, useCallback } from 'react'

import { Checkbox } from '@/components/molecules/form/inputs/CheckboxField/Checkbox'
import { CheckboxProps } from '@/components/molecules/form/inputs/CheckboxField/Checkbox/Checkbox'
import { OptionType, StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { Ghost } from '../../loaders/Ghost'
import { Button, ButtonProps } from '../Button'

type NativeListBoxProps = Omit<
  OlHTMLAttributes<HTMLUListElement>,
  'className' | 'onClick' | 'color'
>

export type ListBoxProps<T = string> = NativeListBoxProps &
  StyleProps & {
    /** for passing custom tailwind classes */
    className?: string
    /** name of the listbox for aria-controls */
    name: string
    /** current values of selected options */
    value?: T[]
    /** options for display */
    options: OptionType<T>[]
    /** loading state for options fetching, loading is delayed for 1 second to prevent flickering */
    isLoading?: boolean
    /** label for no option */
    noOptionLabel?: string
    /** hide option checkbox */
    hideCheckbox?: boolean
    /** optional props for option button */
    buttonProps?: Partial<ButtonProps>
    /** optional props for checkbox */
    checkboxProps?: Partial<CheckboxProps>
    /** on Option click function */
    onClick: (value: T) => void
  }

/** Listbox Ul with selectable options. USE CLIENT */
function ListBoxComponent<T = string>(
  {
    className,
    name,
    value = [],
    options,
    variant = 'outlined',
    color = 'primary',
    size = 'md',
    isLoading,
    noOptionLabel,
    hideCheckbox,
    buttonProps = {},
    checkboxProps = {},
    onClick,
    children,
    ...rest
  }: PropsWithChildren<ListBoxProps<T>>,
  ref: React.ForwardedRef<HTMLUListElement>,
) {
  const t = useTranslations('Components')
  const ghostOptions =
    isLoading && !options.length ? [{ value: 'ghost' as T, label: 'ghost', content: '' }] : []
  const completeOptions = [...options, ...ghostOptions]
  const { className: buttonClassName, ...restButtonProps } = buttonProps
  const { className: checkboxClassName, ...restCheckboxProps } = checkboxProps

  const getSelectedClass = useCallback(
    (optionValue: T) => {
      return value.includes(optionValue) ? 'selected' : ''
    },
    [value],
  )

  return (
    <ul
      id={name}
      className={cn('ListBox', className)}
      aria-labelledby={`${name}-label`}
      role="listbox"
      ref={ref}
      data-testid="ListBox"
      {...rest}
    >
      {options.length || isLoading ? (
        completeOptions.map(({ value: optionValue, label, content }) => (
          <li key={`${name}-${optionValue}-option`} role="presentation">
            <Button
              className={cn(
                'Option',
                'flex w-full items-center justify-start rounded-none border border-transparent focus:outline-none dark:border-transparent',
                getSelectedClass(optionValue),
                isLoading ? 'cursor-not-allowed' : 'cursor-pointer',
                buttonClassName,
              )}
              variant={variant}
              color={color}
              size={size}
              startIcon={
                !hideCheckbox && (
                  <Checkbox
                    className={checkboxClassName}
                    name={String(optionValue)}
                    label=""
                    value={String(optionValue)}
                    variant={variant}
                    color={color}
                    size={size}
                    isChecked={value.includes(optionValue)}
                    disabled={isLoading}
                    fake
                    aria-hidden="true"
                    onChange={() => {}}
                    {...restCheckboxProps}
                  />
                )
              }
              role="option"
              tabIndex={-1}
              aria-selected={value.includes(optionValue)}
              aria-disabled={isLoading}
              onClick={() => (!isLoading ? onClick(optionValue) : undefined)}
              {...restButtonProps}
            >
              <>
                {isLoading ? <Ghost className="ml-0 mr-16 w-full" size={size} /> : content || label}
              </>
            </Button>
          </li>
        ))
      ) : (
        <li className="py-2 text-center">{noOptionLabel || t('noOptions')}</li>
      )}
      {children}
    </ul>
  )
}

type ListboxComponentType = {
  <T = string>(
    props: PropsWithChildren<ListBoxProps<T>> & {
      ref?: React.ForwardedRef<HTMLUListElement>
    },
  ): React.ReactElement | null
  displayName?: string
}

export const ListBox = forwardRef(ListBoxComponent) as ListboxComponentType

ListBox.displayName = 'ListBox'
