'use client'
import { ForwardedRef, forwardRef, useMemo } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { ChipProps } from '@/components/atoms/common/Chip'
import { ChevronIcon } from '@/components/atoms/icons'
import { Ellipsis } from '@/components/atoms/typography/Ellipsis'
import { ClearButton } from '@/components/molecules/form/comboboxes/SelectField/Select/ClearButton'
import { InputProps, OptionType, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { ValueChips } from '../ValueChips'

type PartialButtonProps = Omit<
  Partial<ButtonProps>,
  'value' | 'onChange' | 'name' | 'isLoading' | 'onClick' | 'endIcon' | 'startIcon' | 'hideShadow'
>

export type SelectComboboxProps<T = string> = PartialButtonProps &
  InputProps &
  StyleProps & {
    /** open state of component */
    isOpen: boolean
    /** optional multiValue for displaing multiselect values */
    multiValue?: T[]
    /** selected options for displaing multiselect values */
    selectedOptions: OptionType<T>[]
    /** optional for enabling displayChips type of multiselect, or for displaying option content in combobox in single Select */
    displayChips?: boolean
    /** for passing aditional props to chips */
    chipProps?: Partial<ChipProps>
    /** optional onClear function that render clear button when value is defined */
    onClear?: () => void
    /** handle toggle function */
    handleToggle: (open?: boolean) => void
    /** handle onChange function */
    handleOnChange: (value: T) => void
  }

/** Combobox for Select and MultiSelect. USE CLIENT */
function SelectComboboxComponent<T = string>(
  {
    className,
    isOpen,
    name,
    placeholder,
    multiValue,
    selectedOptions,
    displayChips,
    variant = 'outlined',
    color = 'primary',
    size = 'md',
    disabled,
    error,
    chipProps = {},
    onClear,
    handleToggle,
    handleOnChange,
    ...rest
  }: SelectComboboxProps<T>,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const comboboxTitle = useMemo(() => {
    if (selectedOptions.length && !multiValue) {
      return selectedOptions[0].label
    } else if (selectedOptions.length) {
      return selectedOptions.map(v => v.label).join(', ')
    }
    return placeholder
  }, [selectedOptions, placeholder, multiValue])

  return (
    <Button
      id={name}
      className={cn(
        'SelectCombobox',
        'w-full justify-between',
        isOpen && 'selected z-combobox',
        error && 'error',
        className,
      )}
      name={name}
      type="button"
      variant={variant}
      color={color}
      size={size}
      endIcon={
        <div className="relative flex gap-2">
          {!!(selectedOptions?.length && onClear) && (
            <ClearButton onClick={onClear} data-testid="ClearAllButton" />
          )}
          <ChevronIcon className={cn('transition-transform', isOpen && 'rotate-180')} />
        </div>
      }
      disabled={disabled}
      hideShadow
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls={`${name}-listbox`}
      aria-owns={`${name}-listbox`}
      onClick={() => handleToggle()}
      ref={ref}
      {...rest}
    >
      {!displayChips || !selectedOptions.length ? (
        <Ellipsis className={!selectedOptions.length ? 'text-placeholder' : ''}>
          {comboboxTitle}
        </Ellipsis>
      ) : (
        <ValueChips
          selectedOptions={selectedOptions}
          multiValue={multiValue}
          variant={variant}
          color={color}
          size={size}
          chipProps={chipProps}
          handleOnChange={handleOnChange}
        />
      )}
    </Button>
  )
}

type SelectComboboxComponentType = {
  <T = string>(
    props: SelectComboboxProps<T> & {
      ref?: React.ForwardedRef<HTMLButtonElement>
    },
  ): React.ReactElement | null
  displayName?: string
}

export const SelectCombobox = forwardRef(SelectComboboxComponent) as SelectComboboxComponentType

SelectCombobox.displayName = 'SelectCombobox'
