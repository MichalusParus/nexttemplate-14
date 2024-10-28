'use client'
import { isSameDay } from 'date-fns'
import { forwardRef } from 'react'

import { DatePicker } from '../../DatePickerField/DatePicker'
import { DatePickerProps } from '../../DatePickerField/DatePicker/DatePicker'

export type MultiDatePickerProps = Omit<DatePickerProps, 'value' | 'onChange'> & {
  /** current value of component */
  value: Date[]
  /** onChange function */
  onChange: (value: Date[]) => void
}

/** Basic custom MultiDatePicker inside Label Component. For form purposes use MultiDatePicker. Combobox, Dropdown and Calendar props supported. USE CLIENT */
export const MultiDatePicker = forwardRef<HTMLDivElement, MultiDatePickerProps>(
  ({ name, label, value, error, calendarProps, onChange, ...rest }, ref) => {
    const handleChange = (date: Date) => {
      if (value.some(v => isSameDay(v, date))) {
        onChange(value.filter(v => !isSameDay(v, date)))
      } else {
        onChange([...value, date])
      }
    }

    return (
      <DatePicker
        name={name}
        label={label}
        value={value[0]}
        error={error}
        calendarProps={{ ...calendarProps, multiValue: value }}
        onChange={handleChange}
        ref={ref}
        {...rest}
      />
    )
  },
)

MultiDatePicker.displayName = 'MultiDatePicker'
