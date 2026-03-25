import type { Meta, StoryObj } from '@storybook/nextjs'
import { addDays, addMonths } from 'date-fns'
import { useState } from 'react'

import { MultiDatePicker, MultiDatePickerProps } from './MultiDatePicker'

const meta: Meta<typeof MultiDatePicker> = {
  title: 'Molecules/Form/comboboxes/MultiDatePicker',
  component: MultiDatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

const MultiDatePickerWithHooks = (args: MultiDatePickerProps) => {
  const [value, setValue] = useState<Date[]>([])
  return (
    <div
      className={`flex h-80 justify-center ${args.placement === 'top-start' ? 'items-end' : 'items-start'}`}
    >
      <MultiDatePicker {...args} value={value} onChange={setValue} />
    </div>
  )
}

export default meta
type Story = StoryObj<typeof MultiDatePicker>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'datePickerStory',
    placeholder: 'Placeholder',
    value: [],
    displayChips: false,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    placement: 'bottom-start',
    error: '',
    disabled: false,
    locale: undefined,
    dateFormatOptions: undefined,
    chipProps: undefined,
    dropdownProps: undefined,
    calendarProps: undefined,
    onOpen: undefined,
    onClose: undefined,
    onChange: value => console.log(value),
  },
  render: args => <MultiDatePickerWithHooks {...args} />,
}

export const Top: Story = {
  args: {
    ...PrimaryDefault.args,
    placement: 'top-start',
    name: 'datePickerStory2',
  },
  render: args => <MultiDatePickerWithHooks {...args} />,
}

export const MinMax: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'datePickerStory2',
    calendarProps: {
      minMaxDate: { min: addMonths(new Date(), -2), max: addMonths(new Date(), 2) },
    },
  },
  render: args => <MultiDatePickerWithHooks {...args} />,
}

export const Unavailable: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'datePickerStory2',
    calendarProps: {
      unavailable: [addDays(new Date(), -2), addDays(new Date(), 2), addDays(new Date(), 4)],
    },
  },
  render: args => <MultiDatePickerWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    error: 'error',
    name: 'datePickerStory5',
  },
  render: args => <MultiDatePickerWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'datePickerStory6',
    disabled: true,
  },
  render: args => <MultiDatePickerWithHooks {...args} />,
}
