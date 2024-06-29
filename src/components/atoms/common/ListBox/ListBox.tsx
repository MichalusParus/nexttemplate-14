import { forwardRef, KeyboardEvent, OlHTMLAttributes, useCallback } from 'react'

import Checkbox from '@/components/molecules/form/CheckboxField/Checkbox'
import { checkboxSize } from '@/components/molecules/form/MultiSelectField/MultiSelect/MultiSelect.style'

import Ghost from '../../loaders/Ghost'
import { buttonContentSize } from '../Button/Button.style'
import { liVariant } from './ListBox.style'

export type ListBoxProps = Omit<OlHTMLAttributes<HTMLUListElement>, 'className' | 'onClick'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** name of the listbox for aria-controls */
  name: string
  /** current values of selected options */
  value: string[]
  /** options for display */
  options: { label: string; value: string }[]
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
  /** size of component, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'none'
  /** loading state for options fetching, loading is delayed for 1 second to prevent flickering */
  isLoading?: boolean
  /** label for no option */
  noOptionLabel?: string
  /** hide option checkbox */
  hideCheckbox?: boolean
  /** on Option click function */
  onClick: (value: string) => void
}

/** Listbox Ul with selectable options. */
export const ListBox = forwardRef<HTMLUListElement, ListBoxProps>(
  (
    {
      className = '',
      name,
      value,
      options,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      isLoading,
      noOptionLabel = 'No options found',
      hideCheckbox,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const optionCursor = isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
    const checkboxVisibility = hideCheckbox ? 'hidden' : 'block'

    const getSelectedClass = useCallback(
      (optionValue: string) => {
        return value.includes(optionValue) ? 'selected' : ''
      },
      [value],
    )

    const handleOnKeyDown = useCallback(
      (e: KeyboardEvent<HTMLLIElement>, value: string) => {
        if (e.code === 'Enter' || e.code === 'Space') {
          e.preventDefault()
          onClick(value)
        }
      },
      [onClick],
    )

    return (
      <ul
        id={name}
        className={`ListBox ${className}`}
        aria-labelledby={'label-' + name}
        role="listbox"
        ref={ref}
        {...rest}
      >
        {options.length ? (
          options.map(({ value: optionValue, label }) => (
            <li
              key={optionValue}
              id={optionValue}
              className={`Option flex focus:outline-none ${getSelectedClass(optionValue)} ${liVariant[variant][color]} ${buttonContentSize[size]} ${optionCursor}`}
              role="option"
              tabIndex={0}
              aria-selected={value.includes(optionValue)}
              onClick={() => !isLoading && onClick(optionValue)}
              onKeyDown={e => !isLoading && handleOnKeyDown(e, optionValue)}
            >
              <>
                <Checkbox
                  className={`mr-4 ${checkboxSize[size]} ${checkboxVisibility}`}
                  name={optionValue}
                  label=""
                  value={optionValue}
                  variant={variant}
                  color={color}
                  size="none"
                  isChecked={value.includes(optionValue)}
                  disabled={isLoading}
                  fake
                  onChange={() => {}}
                />
                {isLoading ? (
                  <Ghost className="w-full [&.Ghost]:ml-0 [&.Ghost]:mr-16" size={size} />
                ) : (
                  label
                )}
              </>
            </li>
          ))
        ) : (
          <li className="py-2 text-center">{noOptionLabel}</li>
        )}
      </ul>
    )
  },
)

ListBox.displayName = 'ListBox'
