import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'

import { DateInput, DateInputProps } from '.'

const meta: Meta<typeof DateInput> = {
  title: 'Molecules/Form/inputs/DateInput',
  component: DateInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

const InputWithHooks = (args: DateInputProps) => {
  const [value, setValue] = useState<Date | undefined>(args.value)
  return <DateInput {...args} value={value} onChange={v => setValue(v)} />
}

export default meta
type Story = StoryObj<typeof DateInput>

export const PrimaryDefault: Story = {
  args: {
    className: 'w-96',
    name: 'inputStory',
    value: undefined,
    placeholder: undefined,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    startIcon: undefined,
    endIcon: undefined,
    error: '',
    disabled: false,
    locale: undefined,
    onChange: v => console.log(v),
  },
  render: args => <InputWithHooks {...args} />,
}

export const LocaleCZ: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory4',
    locale: 'cs-CZ',
  },
  render: args => <InputWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory5',
    error: 'error',
  },
  render: args => <InputWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory6',
    disabled: true,
  },
}
