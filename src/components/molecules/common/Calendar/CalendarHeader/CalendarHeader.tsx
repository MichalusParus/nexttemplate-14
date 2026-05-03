'use client'
import {
  addMonths,
  addWeeks,
  addYears,
  endOfWeek,
  format,
  getMonth,
  getYear,
  isSameDay,
  isSameMonth,
  isSameWeek,
  isSameYear,
  startOfDay,
  startOfWeek,
} from 'date-fns'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/atoms/common/Button'
import { ChevronIcon } from '@/components/atoms/icons'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import type { CalendarState, CalendarView } from '../types'

export type CalendarHeaderProps = StyleProps & {
  /** current month state */
  currentMonth: Date
  /** selected calendar state (only relevant for view='day') */
  calendarState: CalendarState
  /** calendar view */
  view?: CalendarView
  /** week-start used for week-view label & nav */
  weekStart?: 0 | 1
  /** optional min max date for calendar */
  minMaxDate?: { min?: Date; max?: Date }
  /** currently selected date — used to disable Today button */
  date?: Date
  /** whether to show a Today button */
  showToday?: boolean
  /** callback when Today button is clicked */
  onToday?: () => void
  /** change calendar state fn (only used in view='day') */
  setCalendarState: (state: CalendarState) => void
  /** change current month fn */
  setCurrentMonth: (date: Date) => void
}

const formatWeekLabel = (date: Date, weekStart: 0 | 1) => {
  const start = startOfWeek(date, { weekStartsOn: weekStart })
  const end = endOfWeek(date, { weekStartsOn: weekStart })
  const sameMonth = isSameMonth(start, end)
  const sameYear = getYear(start) === getYear(end)
  const startFmt = sameYear ? 'MMM d' : 'MMM d, yyyy'
  const endFmt = sameMonth ? 'd, yyyy' : 'MMM d, yyyy'
  return `${format(start, startFmt)} – ${format(end, endFmt)}`
}

/** Calendar header subcomponent for calendar. USE CLIENT */
export const CalendarHeader = ({
  currentMonth,
  calendarState,
  view = 'day',
  weekStart = 1,
  variant = 'outlined',
  color = 'primary',
  size = 'md',
  minMaxDate,
  date,
  showToday = false,
  onToday,
  setCalendarState,
  setCurrentMonth,
}: CalendarHeaderProps) => {
  const t = useTranslations('Components')

  // Navigation step and disabled logic per view
  const { prevDate, nextDate, prevDisabled, nextDisabled, label, prevAriaPage, nextAriaPage } =
    (() => {
      switch (view) {
        case 'week': {
          const prev = addWeeks(currentMonth, -1)
          const next = addWeeks(currentMonth, 1)
          return {
            prevDate: prev,
            nextDate: next,
            prevDisabled: minMaxDate?.min
              ? isSameWeek(currentMonth, minMaxDate.min, { weekStartsOn: weekStart })
              : false,
            nextDisabled: minMaxDate?.max
              ? isSameWeek(currentMonth, minMaxDate.max, { weekStartsOn: weekStart })
              : false,
            label: formatWeekLabel(currentMonth, weekStart),
            prevAriaPage: format(prev, 'MMM d'),
            nextAriaPage: format(next, 'MMM d'),
          }
        }
        case 'month': {
          const prev = addYears(currentMonth, -1)
          const next = addYears(currentMonth, 1)
          return {
            prevDate: prev,
            nextDate: next,
            prevDisabled: minMaxDate?.min ? isSameYear(currentMonth, minMaxDate.min) : false,
            nextDisabled: minMaxDate?.max ? isSameYear(currentMonth, minMaxDate.max) : false,
            label: String(getYear(currentMonth)),
            prevAriaPage: String(getYear(prev)),
            nextAriaPage: String(getYear(next)),
          }
        }
        case 'day':
        default: {
          const prev = addMonths(currentMonth, -1)
          const next = addMonths(currentMonth, 1)
          return {
            prevDate: prev,
            nextDate: next,
            prevDisabled: minMaxDate?.min ? isSameMonth(currentMonth, minMaxDate.min) : false,
            nextDisabled: minMaxDate?.max ? isSameMonth(currentMonth, minMaxDate.max) : false,
            label:
              t(`months.${getMonth(currentMonth)}` as Parameters<typeof t>[0]) +
              ' ' +
              getYear(currentMonth),
            prevAriaPage: format(prev, 'MMMM'),
            nextAriaPage: format(next, 'MMMM'),
          }
        }
      }
    })()

  // Only day view has the MonthSelect drill-down button
  const showMonthSelectButton = view === 'day'

  // MonthSelect disabled when min/max constrain to single month
  const monthSelectDisabled =
    showMonthSelectButton &&
    !!minMaxDate?.min &&
    !!minMaxDate?.max &&
    isSameMonth(minMaxDate.min, minMaxDate.max)

  // Today button disabled when today is selected AND visible in the current range
  const todayDisabled = (() => {
    const today = startOfDay(new Date())
    if (!date || !isSameDay(date, today)) return false
    switch (view) {
      case 'week':
        return isSameWeek(currentMonth, today, { weekStartsOn: weekStart })
      case 'month':
        return isSameYear(currentMonth, today)
      case 'day':
      default:
        return isSameMonth(currentMonth, today)
    }
  })()

  return (
    <div
      className={cn('CalendarHeader', 'flex items-center justify-between pb-2')}
      data-testid="CalendarHeader"
    >
      <Button
        className="PreviousMonthButton"
        variant={variant}
        color={color}
        size={size}
        startIcon={<ChevronIcon className="rotate-90" />}
        hideShadow
        hideBorder
        disabled={prevDisabled}
        aria-label={t('previousPage', { page: prevAriaPage })}
        onClick={() => setCurrentMonth(prevDate)}
      />
      {showMonthSelectButton ? (
        <Button
          className={cn('MonthSelect', 'font-semibold')}
          variant={variant}
          color={color}
          size={size}
          hideShadow
          hideBorder
          disabled={monthSelectDisabled}
          aria-expanded={calendarState !== 'days'}
          onClick={() => setCalendarState(calendarState === 'days' ? 'years' : 'days')}
        >
          <span aria-live="polite" aria-atomic="true">
            {label}
          </span>
          <ChevronIcon
            className={cn(
              'text-inherit transition-transform',
              calendarState !== 'days' && 'rotate-180',
            )}
          />
        </Button>
      ) : (
        <span className="MonthSelect text-sm font-semibold" aria-live="polite" aria-atomic="true">
          {label}
        </span>
      )}
      <Button
        className="NextMonthButton"
        variant={variant}
        color={color}
        size={size}
        startIcon={<ChevronIcon className="-rotate-90" />}
        hideShadow
        hideBorder
        disabled={nextDisabled}
        aria-label={t('nextPage', { page: nextAriaPage })}
        onClick={() => setCurrentMonth(nextDate)}
      />
      {showToday && (
        <Button
          className="TodayButton"
          variant="outlined"
          color={color}
          size={size}
          hideShadow
          hideBorder
          disabled={todayDisabled}
          onClick={onToday}
        >
          {t('today')}
        </Button>
      )}
    </div>
  )
}

CalendarHeader.displayName = 'CalendarHeader'
