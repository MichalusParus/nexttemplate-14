'use client'
import {
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react'

import { ButtonProps } from '@/components/atoms/common/Button/Button'
import { Paper } from '@/components/atoms/containers/Paper'
import { PaperProps } from '@/components/atoms/containers/Paper/Paper'
import { StyleProps } from '@/components/types'
import { cn, filterOutKeys } from '@/utils/utils'

import { calendarSize } from './Calendar.styles'
import { CalendarHeader } from './CalendarHeader'
import { DateButtonType, DayPicker } from './DayPicker'
import { MonthPicker } from './MonthPicker'
import { YearPicker } from './YearPicker'

export type CalendarProps = StyleProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** optional name for id */
  name?: string
  /** current selected date */
  date?: Date
  /** optional range object for selecting range of dates */
  range?: { start?: Date; end?: Date }
  /** optional multiValue for selecting multiple dates */
  multiValue?: Date[]
  /** setting start of week, 0 for Sunday, 1 for Monday */
  weekStart?: 0 | 1
  /** optional min max date for calendar */
  minMaxDate?: { min?: Date; max?: Date }
  /** for passing unavailable, unselectable dates */
  unavailable?: Date[]
  /** optional combobox props for select combobox */
  buttonProps?: Partial<ButtonProps>
  /** for passing aditional props to dropdown */
  paperProps?: Partial<PaperProps>
  /** onChange function */
  onChange: (date: Date) => void
}

/** Calendar component with day, month and year picker. Paper and Button props supported. USE CLIENT */
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      className,
      name,
      date,
      range,
      multiValue,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      weekStart = 1,
      minMaxDate = {},
      unavailable = [],
      buttonProps = {},
      paperProps = {},
      onChange,
    },
    ref,
  ) => {
    const componentRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => componentRef.current!)
    const [calendarState, setCalendarState] = useState<'days' | 'months' | 'years'>('days')
    const [currentMonth, setCurrentMonth] = useState<Date>(date || new Date())

    const handleOnChange = useCallback(
      (value: Date) => {
        onChange(value)
        setCurrentMonth(value)
        if (calendarState === 'years') setCalendarState('months')
        else if (calendarState === 'months') setCalendarState('days')
      },
      [onChange, calendarState],
    )

    const isSelected = useCallback(
      (day: Date) => {
        if (date) {
          const selected = isSameDay(day, date)
          const inRange =
            range?.start &&
            range?.end &&
            isWithinInterval(day, { start: startOfDay(range.start), end: endOfDay(range.end) }) &&
            !unavailable?.some(d => isSameDay(day, d))
          const multiSelected = multiValue && multiValue.some(v => isSameDay(day, v))
          return selected || inRange || multiSelected || false
        }
        return false
      },
      [date, range, multiValue, unavailable],
    )

    const isDisabled = useCallback(
      (day: Date) => {
        return (
          (minMaxDate?.min && isBefore(startOfDay(day), startOfDay(minMaxDate?.min))) ||
          (minMaxDate?.max && isAfter(startOfDay(day), startOfDay(minMaxDate?.max))) ||
          (unavailable && unavailable?.some(d => isSameDay(day, d))) ||
          false
        )
      },
      [unavailable, minMaxDate],
    )

    const daysInMonth = useMemo(() => {
      const daysToDisplay = eachDayOfInterval({
        start: startOfWeek(startOfMonth(currentMonth), { weekStartsOn: weekStart }),
        end: endOfWeek(endOfMonth(currentMonth), { weekStartsOn: weekStart }),
      })
        .map(day => ({
          day,
          isSelected: isSelected(day) || false,
          isCurrent: isSameMonth(day, currentMonth),
          isDisabled: isDisabled(day) || false,
        }))
        .reduce((weeks: DateButtonType[][], day: DateButtonType, index: number) => {
          if (index % 7 === 0) {
            weeks.push([day])
          } else {
            weeks[weeks.length - 1].push(day)
          }
          return weeks
        }, [])
      return daysToDisplay
    }, [currentMonth, weekStart, isSelected, isDisabled])

    const pickerProps = {
      variant,
      color,
      size,
      buttonProps,
      onChange: handleOnChange,
    }

    return (
      <div
        id={name}
        className={cn('Calendar relative', className)}
        ref={componentRef}
        data-testid="Calendar"
      >
        <Paper
          className={cn(calendarSize[size], paperProps.className)}
          variant={variant}
          color={color}
          padding="p-2"
          hideShadow
          {...filterOutKeys(paperProps, ['className'])}
        >
          <CalendarHeader
            currentMonth={currentMonth}
            calendarState={calendarState}
            minMaxDate={minMaxDate}
            variant={variant}
            color={color}
            size={size}
            setCalendarState={setCalendarState}
            setCurrentMonth={setCurrentMonth}
          />
          {calendarState === 'days' && (
            <DayPicker daysInMonth={daysInMonth} weekStart={weekStart} {...pickerProps} />
          )}
          {calendarState === 'months' && (
            <MonthPicker month={currentMonth} minMaxDate={minMaxDate} {...pickerProps} />
          )}
          {calendarState === 'years' && (
            <YearPicker year={currentMonth} minMaxDate={minMaxDate} {...pickerProps} />
          )}
        </Paper>
      </div>
    )
  },
)

Calendar.displayName = 'Calendar'
