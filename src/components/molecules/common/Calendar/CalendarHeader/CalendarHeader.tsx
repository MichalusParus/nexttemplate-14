'use client'
import { addMonths, format, getMonth, getYear, isSameMonth, isSameYear } from 'date-fns'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/atoms/common/Button'
import { ChevronIcon } from '@/components/atoms/icons'
import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

export type CalendarHeaderProps = StyleProps & {
  /** current month state */
  currentMonth: Date
  /** selected calendar state */
  calendarState: 'days' | 'months' | 'years'
  /** optional min max date for calendar */
  minMaxDate?: { min?: Date; max?: Date }
  /** change calendar state fn */
  setCalendarState: (state: 'days' | 'months' | 'years') => void
  /** change current month fn */
  setCurrentMonth: (date: Date) => void
}

/** Calendar header subcomponent for calendar. USE CLIENT */
export const CalendarHeader = ({
  currentMonth,
  calendarState,
  variant = 'outlined',
  color = 'primary',
  size = 'md',
  minMaxDate,
  setCalendarState,
  setCurrentMonth,
}: CalendarHeaderProps) => {
  const t = useTranslations('Components')

  return (
    <div
      className={cn('CalendarHeader', 'flex items-center justify-between pb-2')}
      data-testid="CalendarHeader"
    >
      <Button
        className={cn('PreviousMonthButton', 'border-none')}
        variant={variant}
        color={color}
        size={size}
        startIcon={<ChevronIcon className="rotate-90" />}
        hideShadow
        disabled={minMaxDate?.min && isSameMonth(currentMonth, minMaxDate?.min)}
        aria-label={t('previousPage', { page: format(addMonths(currentMonth, -1), 'MMMM') })}
        onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
      />
      <Button
        className={cn('MonthSelect', 'border-none font-semibold')}
        variant={variant}
        color={color}
        size={size}
        hideShadow
        disabled={
          minMaxDate?.min && minMaxDate?.max && isSameYear(minMaxDate?.min, minMaxDate?.max)
        }
        onClick={() => setCalendarState(calendarState === 'days' ? 'years' : 'days')}
      >
        {t(`months.${getMonth(currentMonth)}`) + ' ' + getYear(currentMonth)}
        <ChevronIcon
          className={cn(
            'text-inherit transition-transform',
            calendarState !== 'days' && 'rotate-180',
          )}
        />
      </Button>
      <Button
        className={cn('NextMonthButton', 'border-none')}
        variant={variant}
        color={color}
        size={size}
        startIcon={<ChevronIcon className="-rotate-90" />}
        hideShadow
        disabled={minMaxDate?.max && isSameMonth(currentMonth, minMaxDate?.max)}
        aria-label={t('nextPage', { page: format(addMonths(currentMonth, 1), 'MMMM') })}
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
      />
    </div>
  )
}

CalendarHeader.displayName = 'CalendarHeader'
