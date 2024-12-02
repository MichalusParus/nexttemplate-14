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

/** Basic custom uncontroled MultiDatePicker. For form purposes use MultiDatePicker. Button, Dropdown and Calendar props supported. USE CLIENT */
export const MultiDatePicker = forwardRef<HTMLDivElement, MultiDatePickerProps>(
  ({ name, value, error, calendarProps, onChange, ...rest }, ref) => {
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
        value={value?.[0]}
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
