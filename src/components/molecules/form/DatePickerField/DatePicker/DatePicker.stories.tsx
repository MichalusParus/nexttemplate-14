import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { DatePicker, DatePickerProps } from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'Molecules/Form/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    comboboxProps: {
      control: false,
    },
    dropdownProps: {
      control: false,
    },
    calendarProps: {
      control: false,
    },
  },
}

const DatePickerWithHooks = (args: DatePickerProps) => {
  const [value, setValue] = useState<Date | undefined>(undefined)
  return (
    <div
      className={`flex h-80 justify-center ${args.placement === 'top-start' ? 'items-end' : ''}`}
    >
      <DatePicker {...args} value={value} onChange={setValue} />
    </div>
  )
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'datePickerStory',
    label: 'Label',
    placeholder: 'Placeholder',
    value: undefined,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    placement: 'bottom-start',
    error: '',
    comboboxProps: undefined,
    dropdownProps: undefined,
    calendarProps: undefined,
    labelProps: undefined,
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

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    error: 'error',
    name: 'datePickerStory5',
  },
  render: args => <DatePickerWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'datePickerStory6',
    disabled: true,
  },
  render: args => <DatePickerWithHooks {...args} />,
}
