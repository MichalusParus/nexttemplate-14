import type { Meta, StoryObj } from '@storybook/nextjs'
import { addDays, addMonths, isAfter, isBefore, isSameDay } from 'date-fns'
import { useState } from 'react'

import { Calendar } from '.'
import { CalendarProps } from './Calendar'

const meta: Meta<typeof Calendar> = {
  title: 'Molecules/Common/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

const CalendarWithHooks = (args: CalendarProps) => {
  const [date, setDate] = useState<Date>(args.date || new Date())
  return <Calendar {...args} date={date} onChange={setDate} />
}

const RangeCalendarWithHooks = (args: CalendarProps) => {
  const [range, setRange] = useState<{ start?: Date; end?: Date } | undefined>(args.range)
  const handleChange = (value: Date) => {
    if (!range?.start || (range.start && range.end)) {
      setRange({ start: value, end: undefined })
      return
    } else if (isSameDay(range.start, value)) {
      setRange(undefined)
    } else if (range?.start && !range.end && isBefore(range.start, value)) {
      setRange(prev => ({ start: prev?.start, end: value }))
      return
    } else if (range?.start && !range.end && isAfter(range.start, value)) {
      setRange(prev => ({ start: value, end: prev?.start }))
      return
    }
  }
  return <Calendar {...args} date={range?.start} range={range} onChange={handleChange} />
}

const MultiCalendarWithHooks = (args: CalendarProps) => {
  const [values, setValues] = useState<Date[]>(args.multiValue || [])
  const handleChange = (date: Date) => {
    if (values?.some(v => isSameDay(v, date))) {
      setValues(values.filter(v => !isSameDay(v, date)))
    } else {
      setValues([...values, date])
    }
  }
  return <Calendar {...args} date={values?.[0]} multiValue={values} onChange={handleChange} />
}

export default meta
type Story = StoryObj<typeof Calendar>

export const PrimaryDefault: Story = {
  args: {
    className: 'className',
    name: 'calendarStory',
    date: new Date(),
    range: undefined,
    multiValue: undefined,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    weekStart: 1,
    minMaxDate: undefined,
    unavailable: [],
    buttonProps: undefined,
    paperProps: undefined,
  },
  render: args => <CalendarWithHooks {...args} />,
}

export const MinMaxDate: Story = {
  args: {
    ...PrimaryDefault.args,
    minMaxDate: { min: addMonths(new Date(), -2), max: addMonths(new Date(), 2) },
  },
  render: args => <CalendarWithHooks {...args} />,
}

export const Unavailable: Story = {
  args: {
    ...PrimaryDefault.args,
    unavailable: [addDays(new Date(), -2), addDays(new Date(), 2), addDays(new Date(), 4)],
  },
  render: args => <CalendarWithHooks {...args} />,
}

export const Range: Story = {
  args: {
    ...PrimaryDefault.args,
    range: { start: addDays(new Date(), -2), end: addDays(new Date(), 2) },
  },
  render: args => <RangeCalendarWithHooks {...args} />,
}

export const MultiValue: Story = {
  args: {
    ...PrimaryDefault.args,
    multiValue: [addDays(new Date(), -2), new Date(), addDays(new Date(), 2)],
  },
  render: args => <MultiCalendarWithHooks {...args} />,
}
