'use client'
import { forwardRef, useMemo } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { ChipProps } from '@/components/atoms/common/Chip'
import { ChevronIcon } from '@/components/atoms/icons'
import { Span } from '@/components/atoms/typography/Span'
import { ClearButton } from '@/components/molecules/form/selects/SelectField/Select/ClearButton'
import { InputProps, OptionType, StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { ValueChips } from '../ValueChips'

type PartialButtonProps = Omit<
  Partial<ButtonProps>,
  'value' | 'onChange' | 'name' | 'isLoading' | 'onClick' | 'endIcon' | 'startIcon'
>

export type SelectComboboxProps = PartialButtonProps &
  InputProps &
  StyleProps & {
    /** open state of component */
    isOpen: boolean
    /** optional multiValue for displaing multiselect values */
    multiValue?: string[]
    /** selected options for displaing multiselect values */
    selectedOptions: OptionType[]
    /** optional for enabling displayChips type of multiselect, or for displaying option content in combobox in single Select */
    displayChips?: boolean
    /** for passing aditional props to chips */
    chipProps?: Partial<ChipProps>
    /** optional onClear function for MultiDatePicker when multiValue is defined */
    onClear?: () => void
    /** handle onOpen function */
    handleOpen: () => void
    /** handle onChange function */
    handleOnChange: (value: string) => void
  }

/** Combobox for Select and MultiSelect. USE CLIENT */
export const SelectCombobox = forwardRef<HTMLButtonElement, SelectComboboxProps>(
  (
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
      handleOpen,
      handleOnChange,
      ...rest
    },
    ref,
  ) => {
    const isMulti = selectedOptions?.length > 1
    const comboboxTitle = useMemo(() => {
      if (selectedOptions.length && !isMulti) {
        return selectedOptions[0].label
      } else if (selectedOptions.length && isMulti) {
        return selectedOptions.map(v => v.label).join(', ')
      }
      return placeholder
    }, [isMulti, selectedOptions, placeholder])

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
        disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        hideShadow
        role="combobox"
        aria-label={comboboxTitle || name}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={`${name}-listbox`}
        aria-owns={`${name}-listbox`}
        onClick={handleOpen}
        ref={ref}
        {...rest}
        endIcon={
          <div className="relative flex gap-2">
            {isMulti && onClear && <ClearButton onClear={onClear} data-testid="ClearAllButton" />}
            <ChevronIcon className={cn('transition-transform', isOpen && 'rotate-180')} />
          </div>
        }
      >
        {!displayChips || !selectedOptions.length ? (
          <Span
            className={cn('ComboboxTitle', 'truncate', !selectedOptions.length && 'text-dark-400')}
          >
            {comboboxTitle}
          </Span>
        ) : (
          <ValueChips
            selectedOptions={selectedOptions}
            multiValue={multiValue}
            chipProps={chipProps}
            handleOnChange={handleOnChange}
          />
        )}
      </Button>
    )
  },
)

SelectCombobox.displayName = 'SelectCombobox'
