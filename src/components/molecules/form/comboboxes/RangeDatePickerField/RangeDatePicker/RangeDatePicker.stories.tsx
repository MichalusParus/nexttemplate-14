import type { Meta, StoryObj } from '@storybook/nextjs'
import { addDays, addMonths } from 'date-fns'
import { useState } from 'react'

import { RangeDatePicker, RangeDatePickerProps } from './RangeDatePicker'

const meta: Meta<typeof RangeDatePicker> = {
  title: 'Molecules/Form/comboboxes/RangeDatePicker',
  component: RangeDatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

const RangeDatePickerWithHooks = (args: RangeDatePickerProps) => {
  const [value, setValue] = useState<{ start?: Date; end?: Date }>({
    start: undefined,
    end: undefined,
  })
  return (
    <div
      className={`flex h-80 justify-center ${args.placement === 'top-start' ? 'items-end' : 'items-start'}`}
    >
      <RangeDatePicker {...args} value={value} onChange={setValue} />
    </div>
  )
}

export default meta
type Story = StoryObj<typeof RangeDatePicker>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'datePickerStory',
    placeholder: 'Placeholder',
    value: { start: undefined, end: undefined },
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    placement: 'bottom-start',
    error: '',
    disabled: false,
    locale: undefined,
    dateFormatOptions: undefined,
    dropdownProps: undefined,
    calendarProps: undefined,
    onOpen: undefined,
    onClose: undefined,
    onChange: value => console.log(value),
  },
  render: args => <RangeDatePickerWithHooks {...args} />,
}

export const Top: Story = {
  args: {
    ...PrimaryDefault.args,
    placement: 'top-start',
    name: 'datePickerStory2',
  },
  render: args => <RangeDatePickerWithHooks {...args} />,
}

export const MinMax: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'datePickerStory2',
    calendarProps: {
      minMaxDate: { min: addMonths(new Date(), -2), max: addMonths(new Date(), 2) },
    },
  },
  render: args => <RangeDatePickerWithHooks {...args} />,
}

export const Unavailable: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'datePickerStory2',
    calendarProps: {
      unavailable: [addDays(new Date(), -2), addDays(new Date(), 2), addDays(new Date(), 4)],
    },
  },
  render: args => <RangeDatePickerWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    error: 'error',
    name: 'datePickerStory5',
  },
  render: args => <RangeDatePickerWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'datePickerStory6',
    disabled: true,
  },
  render: args => <RangeDatePickerWithHooks {...args} />,
}
