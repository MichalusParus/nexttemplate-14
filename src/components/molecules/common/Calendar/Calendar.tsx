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
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { calendarSize } from './Calendar.styles'
import { CalendarHeader } from './CalendarHeader'
import { DateButtonType, DayPicker } from './DayPicker'
import { MonthPicker } from './MonthPicker'
import { useCalendarFocus } from './useCalendarFocus'
import { YearPicker } from './YearPicker'

export type CalendarState = 'days' | 'months' | 'years'

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
  /** enables keyboard navigation and roving tabindex */
  isActive?: boolean
  /** focus selected cell on mount — used by DatePicker when dropdown opens */
  focusOnOpen?: boolean
  /** callback to close the dropdown (for Escape key from grid) */
  onClose?: () => void
  /** onChange function */
  onChange: (date: Date) => void
}

/** Calendar component with day, month and year picker. Paper and Button props supported. USE CLIENT */
export const Calendar = forwardRef<HTMLDivElement | null, CalendarProps>(
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
      isActive = true,
      focusOnOpen = false,
      onClose,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const componentRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
      ref,
      () => componentRef.current,
    )
    const [calendarState, setCalendarState] = useState<CalendarState>('days')
    const [currentMonth, setCurrentMonth] = useState<Date>(date || new Date())
    const { className: paperClassName, ...restPaperProps } = paperProps

    useCalendarFocus({
      isActive,
      focusOnOpen,
      gridRef,
      calendarState,
      currentMonth,
      setCurrentMonth,
      onClose,
    })

    const handleOnChange = useCallback(
      (value: Date) => {
        onChange(value)
        setCurrentMonth(value)
      },
      [setCurrentMonth, onChange],
    )

    const isSelected = useCallback(
      (day: Date) => {
        if (date) {
          const selected = isSameDay(day, date)
          const inRange =
            range?.start &&
            range?.end &&
            isWithinInterval(day, { start: startOfDay(range.start), end: endOfDay(range.end) }) &&
            !unavailable.some(d => isSameDay(day, d))
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
          unavailable.some(d => isSameDay(day, d)) ||
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
      setCalendarState,
      setCurrentMonth,
      onChange: handleOnChange,
    }

    return (
      <div
        id={name}
        className={cn('Calendar relative', className)}
        ref={componentRef}
        data-testid="Calendar"
        {...rest}
      >
        <Paper
          className={cn(calendarSize[size], paperClassName)}
          variant={variant}
          color={color}
          padding="py-2"
          hideShadow
          {...restPaperProps}
        >
          <div className="px-2">
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
          </div>
          {calendarState === 'days' && (
            <div className="px-2">
              <DayPicker daysInMonth={daysInMonth} weekStart={weekStart} gridRef={gridRef} {...pickerProps} />
            </div>
          )}
          {calendarState === 'months' && (
            <div className="px-2">
              <MonthPicker month={currentMonth} minMaxDate={minMaxDate} gridRef={gridRef} {...pickerProps} />
            </div>
          )}
          {calendarState === 'years' && (
            <YearPicker year={currentMonth} minMaxDate={minMaxDate} gridRef={gridRef} {...pickerProps} />
          )}
        </Paper>
      </div>
    )
  },
)

Calendar.displayName = 'Calendar'
