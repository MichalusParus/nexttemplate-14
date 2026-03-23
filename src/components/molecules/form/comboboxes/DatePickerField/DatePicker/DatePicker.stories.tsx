import type { Meta, StoryObj } from '@storybook/nextjs'
import { addDays, addMonths } from 'date-fns'
import { useState } from 'react'

import { DatePicker, DatePickerProps } from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'Molecules/Form/comboboxes/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

const DatePickerWithHooks = (args: DatePickerProps) => {
  const [value, setValue] = useState<Date | undefined>(undefined)
  return (
    <div
      className={`flex h-80 justify-center ${args.placement === 'top-start' ? 'items-end' : 'items-start'}`}
    >
      <DatePicker
        {...args}
        value={value}
        onClear={args.onClear ? () => setValue(undefined) : undefined}
        onChange={setValue}
      />
    </div>
  )
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'datePickerStory',
    placeholder: 'Placeholder',
    value: undefined,
    displayChips: false,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    placement: 'bottom-start',
    error: '',
    disabled: false,
    chipProps: undefined,
    dropdownProps: undefined,
    calendarProps: undefined,
    locale: undefined,
    dateFormatOptions: undefined,
    onClear: undefined,
    onOpen: undefined,
    onClose: undefined,
    onChange: value => console.log(value),
  },
  render: args => <DatePickerWithHooks {...args} />,
}

export const Top: Story = {
  args: {
    ...PrimaryDefault.args,
    placement: 'top-start',
    name: 'datePickerStory2',
  },
  render: args => <DatePickerWithHooks {...args} />,
}

export const OnClear: Story = {
  args: {
    ...PrimaryDefault.args,
    onClear: () => console.log('clear'),
    name: 'datePickerStory3',
  },
  render: args => <DatePickerWithHooks {...args} />,
}

export const MinMax: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'datePickerStory4',
    calendarProps: {
      minMaxDate: { min: addMonths(new Date(), -2), max: addMonths(new Date(), 2) },
    },
  },
  render: args => <DatePickerWithHooks {...args} />,
}

export const Unavailable: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'datePickerStory5',
    calendarProps: {
      unavailable: [addDays(new Date(), -2), addDays(new Date(), 2), addDays(new Date(), 4)],
    },
  },
  render: args => <DatePickerWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'datePickerStory6',
    error: 'error',
  },
  render: args => <DatePickerWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'datePickerStory7',
    disabled: true,
  },
  render: args => <DatePickerWithHooks {...args} />,
}
