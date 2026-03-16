'use client'
import { eachDayOfInterval, endOfWeek, format, getDay, isSameDay, startOfWeek } from 'date-fns'
import { useTranslations } from 'next-intl'
import { MutableRefObject, useMemo } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { P } from '@/components/atoms/typography/P'
import { disabledVariant } from '@/components/utils/common.style'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

export type DateButtonType = {
  day: Date
  isSelected?: boolean
  isCurrent?: boolean
  isDisabled?: boolean
}

export type DayPickerProps = StyleProps & {
  /** days in current month */
  daysInMonth: DateButtonType[][]
  /** setting start of week, 0 for Sunday, 1 for Monday */
  weekStart?: 0 | 1
  /** optional combobox props for select combobox */
  buttonProps?: Partial<ButtonProps>
  /** ref for the grid container (used by useCalendarFocus) */
  gridRef?: MutableRefObject<HTMLDivElement | null>
  /** onChange function */
  onChange: (date: Date) => void
}

/** Day picker subcomponent for calendar. USE CLIENT */
export const DayPicker = ({
  daysInMonth,
  variant = 'outlined',
  color = 'primary',
  size = 'md',
  weekStart,
  buttonProps = {},
  gridRef,
  onChange,
}: DayPickerProps) => {
  const t = useTranslations('Components')
  const { className: buttonClassName, ...restButtonProps } = buttonProps
  const daysInWeek = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(new Date(), { weekStartsOn: weekStart }),
        end: endOfWeek(new Date(), { weekStartsOn: weekStart }),
      }),
    [weekStart],
  )

  return (
    <div className={cn('DayPicker', 'grid grid-cols-7 gap-1')} role="grid" data-testid="DayPicker" ref={gridRef}>
      <div className="contents" role="row">
        {daysInWeek.map(day => (
          <div
            key={day.toDateString()}
            className="flex items-center justify-center px-0.5 font-semibold"
            role="columnheader"
          >
            <P className={cn(variant === 'contained' && 'text-contrast')} size={size}>
              {t(`days.${getDay(day)}` as Parameters<typeof t>[0]).slice(0, 3)}
            </P>
          </div>
        ))}
      </div>
      {daysInMonth.map((week, i) => (
        <div key={`week-${i}`} className="contents" role="row">
          {week.map(({ day, isSelected, isCurrent, isDisabled }) => (
            <Button
              key={day.toDateString()}
              id={day.toDateString()}
              className={cn(
                'DateButton',
                'w-full border-none font-normal',
                isDisabled && 'disabled',
                disabledVariant[variant],
                isSelected && 'selected shadow-ring',
                !isCurrent && 'opacity-50',
                buttonClassName,
              )}
              variant={variant}
              color={color}
              size={size}
              startIcon={format(day, 'd')}
              aria-label={format(day, 'EEEE, MMMM do, yyyy')}
              hideShadow
              tabIndex={-1}
              role="gridcell"
              data-date={day.toISOString()}
              aria-selected={isSelected}
              aria-current={isSameDay(day, new Date()) ? 'date' : undefined}
              aria-disabled={isDisabled || undefined}
              onClick={() => !isDisabled && onChange(day)}
              {...restButtonProps}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

DayPicker.displayName = 'DayPicker'
