'use client'
import { eachDayOfInterval, endOfWeek, getDay, startOfWeek } from 'date-fns'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

import { P } from '@/components/atoms/typography/P'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

type WeekdayHeaderProps = {
  variant: NonNullable<StyleProps['variant']>
  size: NonNullable<StyleProps['size']>
  weekStart?: 0 | 1
}

/** Row of weekday-name column headers (Mon Tue …) above the day grid. */
export const WeekdayHeader = ({ variant, size, weekStart }: WeekdayHeaderProps) => {
  const t = useTranslations('Components')
  const daysInWeek = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(new Date(), { weekStartsOn: weekStart }),
        end: endOfWeek(new Date(), { weekStartsOn: weekStart }),
      }),
    [weekStart],
  )
  return (
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
  )
}

WeekdayHeader.displayName = 'WeekdayHeader'
