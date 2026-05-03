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
  startOfYear,
} from 'date-fns'
import {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import { ButtonProps } from '@/components/atoms/common/Button/Button'
import { Paper } from '@/components/atoms/containers/Paper'
import { PaperProps } from '@/components/atoms/containers/Paper/Paper'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { calendarMonthHeight, calendarWidth } from './Calendar.style'
import { CalendarHeader } from './CalendarHeader'
import { DayPicker } from './DayPicker'
import { MonthPicker } from './MonthPicker'
import type { CalendarCellCtx, CalendarState, CalendarView, DateButtonType } from './types'
import { useCalendarFocus } from './useCalendarFocus'
import { YearPicker } from './YearPicker'

export type { CalendarCellCtx, CalendarState, CalendarView, DateButtonType } from './types'

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
  /** Calendar view: 'day' (month grid with drill-down), 'week' (single week row) */
  view?: CalendarView
  /** setting start of week, 0 for Sunday, 1 for Monday */
  weekStart?: 0 | 1
  /** optional min max date for calendar */
  minMaxDate?: { min?: Date; max?: Date }
  /** for passing unavailable, unselectable dates */
  unavailable?: Date[]
  /** enables keyboard navigation and roving tabindex */
  isActive?: boolean
  /** focus selected cell on mount — used by DatePicker when dropdown opens */
  focusOnOpen?: boolean
  /** Whether to show the built-in CalendarHeader (prev/next, label). Defaults to true. */
  showHeader?: boolean
  /** Whether to show a Today button in the CalendarHeader. Defaults to false. */
  showToday?: boolean
  /** Whether to show weekday column headers (Mo Tu We...) above the day grid. Defaults to true. */
  showWeekdayHeader?: boolean
  /** additional props for picker cell buttons */
  buttonProps?: Partial<ButtonProps>
  /** additional props for container Paper */
  paperProps?: Partial<PaperProps>
  /** custom render-prop for day cells; default renders the day number Button */
  renderCell?: (ctx: CalendarCellCtx) => ReactNode
  /** Fires when the displayed range changes via header nav or keyboard boundary crossing.
   *  Does NOT fire when `date` prop changes externally or when a day cell is clicked. */
  onNavigate?: (date: Date) => void
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
      view = 'day',
      weekStart = 1,
      minMaxDate = {},
      unavailable = [],
      isActive = true,
      focusOnOpen = false,
      showHeader,
      showToday = false,
      showWeekdayHeader = true,
      buttonProps = {},
      paperProps = {},
      renderCell,
      onNavigate,
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

    // Sync displayed range to externally-controlled `date` (e.g. URL-driven consumers).
    // Only fires when the calendar day actually changes — avoids feedback loops when
    // a parent passes a fresh Date instance with the same value on every render.
    const lastSyncedRef = useRef<number | undefined>(date?.getTime())
    useEffect(() => {
      if (!date) return
      const t = date.getTime()
      if (lastSyncedRef.current === t) return
      lastSyncedRef.current = t
      setCurrentMonth(date)
    }, [date])

    const handleNavigate = useCallback(
      (next: Date) => {
        setCurrentMonth(next)
        onNavigate?.(next)
      },
      [onNavigate],
    )

    useCalendarFocus({
      isActive,
      focusOnOpen,
      gridRef,
      calendarState,
      view,
      currentMonth,
      setCurrentMonth: handleNavigate,
      onClose,
    })

    const handleOnChange = useCallback(
      (value: Date) => {
        onChange(value)
        setCurrentMonth(value)
      },
      [setCurrentMonth, onChange],
    )

    const handleToday = useCallback(() => {
      handleOnChange(startOfDay(new Date()))
    }, [handleOnChange])

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

    const hasDayGrid = view === 'day' || view === 'week'

    const daysInMonth = useMemo(() => {
      if (!hasDayGrid) return []
      const dateRange =
        view === 'week'
          ? {
              start: startOfWeek(currentMonth, { weekStartsOn: weekStart }),
              end: endOfWeek(currentMonth, { weekStartsOn: weekStart }),
            }
          : {
              start: startOfWeek(startOfMonth(currentMonth), { weekStartsOn: weekStart }),
              end: endOfWeek(endOfMonth(currentMonth), { weekStartsOn: weekStart }),
            }
      const daysToDisplay = eachDayOfInterval(dateRange)
        .map(day => ({
          day,
          isSelected: isSelected(day) || false,
          // In week view every visible cell belongs to the displayed week, so they're all "current".
          isCurrent: view === 'week' ? true : isSameMonth(day, currentMonth),
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
    }, [currentMonth, weekStart, view, hasDayGrid, isSelected, isDisabled])

    const sharedPickerProps = { variant, color, size, buttonProps }
    const resolvedShowHeader = showHeader ?? view !== 'year'

    return (
      <div
        id={name}
        className={cn('Calendar relative', className)}
        ref={componentRef}
        data-testid="Calendar"
        {...rest}
      >
        <Paper
          className={cn(
            calendarWidth[size],
            view === 'day' && calendarMonthHeight[size],
            paperClassName,
          )}
          variant={variant}
          color={color}
          padding="py-2"
          hideShadow
          {...restPaperProps}
        >
          {resolvedShowHeader && (
            <div className="px-2">
              <CalendarHeader
                currentMonth={currentMonth}
                calendarState={calendarState}
                view={view}
                weekStart={weekStart}
                minMaxDate={minMaxDate}
                variant={variant}
                color={color}
                size={size}
                date={date}
                showToday={showToday}
                onToday={handleToday}
                setCalendarState={setCalendarState}
                setCurrentMonth={handleNavigate}
              />
            </div>
          )}
          {/* Day view: uses calendarState state machine (drill-down) */}
          {view === 'day' && calendarState === 'days' && (
            <div className="px-2">
              <DayPicker
                daysInMonth={daysInMonth}
                weekStart={weekStart}
                gridRef={gridRef}
                renderCell={renderCell}
                showWeekdayHeader={showWeekdayHeader}
                onChange={handleOnChange}
                {...sharedPickerProps}
              />
            </div>
          )}
          {view === 'day' && calendarState === 'months' && (
            <div className="px-2">
              <MonthPicker
                month={currentMonth}
                minMaxDate={minMaxDate}
                gridRef={gridRef}
                onSelect={d => {
                  handleNavigate(d)
                  setCalendarState('days')
                }}
                {...sharedPickerProps}
              />
            </div>
          )}
          {view === 'day' && calendarState === 'years' && (
            <YearPicker
              year={currentMonth}
              minMaxDate={minMaxDate}
              gridRef={gridRef}
              onSelect={d => {
                handleNavigate(d)
                setCalendarState('months')
              }}
              {...sharedPickerProps}
            />
          )}
          {/* Week view: DayPicker single row */}
          {view === 'week' && (
            <div className="px-2">
              <DayPicker
                daysInMonth={daysInMonth}
                weekStart={weekStart}
                gridRef={gridRef}
                renderCell={renderCell}
                showWeekdayHeader={showWeekdayHeader}
                onChange={handleOnChange}
                {...sharedPickerProps}
              />
            </div>
          )}
          {/* Month view: standalone month picker */}
          {view === 'month' && (
            <div className="px-2">
              <MonthPicker
                month={currentMonth}
                minMaxDate={minMaxDate}
                gridRef={gridRef}
                onSelect={d => handleOnChange(startOfMonth(d))}
                {...sharedPickerProps}
              />
            </div>
          )}
          {/* Year view: standalone year picker */}
          {view === 'year' && (
            <YearPicker
              year={currentMonth}
              minMaxDate={minMaxDate}
              gridRef={gridRef}
              onSelect={d => handleOnChange(startOfYear(d))}
              {...sharedPickerProps}
            />
          )}
        </Paper>
      </div>
    )
  },
)

Calendar.displayName = 'Calendar'
