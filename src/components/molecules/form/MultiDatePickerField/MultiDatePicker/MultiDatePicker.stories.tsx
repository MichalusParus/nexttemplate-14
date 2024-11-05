import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { MultiDatePicker, MultiDatePickerProps } from './MultiDatePicker'

const meta: Meta<typeof MultiDatePicker> = {
  title: 'Molecules/Form/MultiDatePicker',
  component: MultiDatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    buttonProps: {
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

const MultiDatePickerWithHooks = (args: MultiDatePickerProps) => {
  const [value, setValue] = useState<Date[]>([])
  return (
    <div
      className={`flex h-80 justify-center ${args.placement === 'top-start' ? 'items-end' : ''}`}
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
    label: 'Label',
    placeholder: 'Placeholder',
    value: [],
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    placement: 'bottom-start',
    error: '',
    buttonProps: undefined,
    dropdownProps: undefined,
    calendarProps: undefined,
    labelProps: undefined,
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
