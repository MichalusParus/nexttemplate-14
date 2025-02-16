'use client'
import { format } from 'date-fns'
import { forwardRef, useMemo } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { ChipProps } from '@/components/atoms/common/Chip'
import { CalendarIcon } from '@/components/atoms/icons'
import { Span } from '@/components/atoms/typography/Span'
import { CalendarProps } from '@/components/molecules/common/Calendar/Calendar'
import { ClearButton } from '@/components/molecules/form/selects/SelectField/Select/ClearButton'
import { ValueChips } from '@/components/molecules/form/selects/SelectField/Select/ValueChips'
import { InputProps, StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

type PartialButtonProps = Omit<
  Partial<ButtonProps>,
  'value' | 'onChange' | 'name' | 'isLoading' | 'onClick' | 'endIcon' | 'startIcon'
>

export type DatePickerComboboxProps = PartialButtonProps &
  InputProps &
  StyleProps & {
    /** open state of component */
    isOpen: boolean
    /** current value of component */
    value?: Date
    /** optional for enabling displayChips type of multiselect, or for displaying option content in combobox in single Select */
    displayChips?: boolean
    /** for passing aditional props to calendar */
    calendarProps?: Partial<CalendarProps>
    /** for passing aditional props to chips */
    chipProps?: Partial<ChipProps>
    /** optional onClear function for MultiDatePicker when multiValue is defined */
    onClear?: () => void
    /** handle onOpen function */
    handleOpen: () => void
    /** handle onChange function */
    handleOnChange: (value: Date) => void
  }

/** Combobox for DatePicker. USE CLIENT */
export const DatePickerCombobox = forwardRef<HTMLButtonElement, DatePickerComboboxProps>(
  (
    {
      className,
      isOpen,
      name,
      placeholder,
      value,
      displayChips,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      disabled,
      error,
      calendarProps = {},
      chipProps = {},
      onClear,
      handleOpen,
      handleOnChange,
      ...rest
    },
    ref,
  ) => {
    const comboboxTitle = useMemo(() => {
      const { range, multiValue } = calendarProps
      if (value && !range && !multiValue) {
        return format(value, 'd.M.y')
      } else if (range?.start) {
        return `${format(range.start, 'd.M.y')} ${range?.end ? `- ${format(range.end, 'd.M.y')}` : '-'}`
      } else if (multiValue?.length) {
        return multiValue.map(v => format(v, 'd.M.y')).join(', ')
      }
      return placeholder
    }, [calendarProps, placeholder, value])

    return (
      <Button
        id={name}
        className={cn(
          'DatePickerCombobox',
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
        aria-haspopup="true"
        aria-controls={`${name}-calendar`}
        aria-owns={`${name}-calendar`}
        onClick={handleOpen}
        ref={ref}
        {...rest}
        endIcon={
          <div className="flex gap-2">
            {!!calendarProps.multiValue?.length && <ClearButton onClear={onClear} />}
            <CalendarIcon aria-hidden data-testid="CalendarIcon" />
          </div>
        }
      >
        {!displayChips || !calendarProps.multiValue?.length ? (
          <Span className={cn('ComboboxTitle', 'truncate', !value && 'text-dark-400')}>
            {comboboxTitle}
          </Span>
        ) : (
          <ValueChips
            selectedOptions={calendarProps.multiValue.map(v => ({
              value: v.toISOString(),
              label: format(v, 'd.M.y'),
            }))}
            multiValue={calendarProps.multiValue.map(v => v.toISOString())}
            chipProps={chipProps}
            handleOnChange={value => handleOnChange(new Date(value))}
          />
        )}
      </Button>
    )
  },
)

DatePickerCombobox.displayName = 'DatePickerCombobox'
