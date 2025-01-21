import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { RangeInput, RangeProps } from './RangeInput'

const meta: Meta<typeof RangeInput> = {
  title: 'Molecules/Form/RangeInput',
  component: RangeInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

const RangeWithHooks = (args: RangeProps) => {
  const [value, setValue] = useState<string>()
  return <RangeInput {...args} value={value} onChange={value => setValue(value)} />
}

export default meta
type Story = StoryObj<typeof RangeInput>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'rangeStory',
    value: undefined,
    min: 0,
    max: 100,
    color: 'primary',
    size: 'md',
    error: '',
    disabled: false,
    onChange: v => console.log(v),
  },
  render: args => <RangeWithHooks {...args} />,
}

export const MinMax: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'rangeStory2',
    min: 1234,
    max: 4321,
  },
  render: args => <RangeWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'rangeStory3',
    error: 'error',
  },
  render: args => <RangeWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'rangeStory4',
    disabled: true,
  },
  render: args => <RangeWithHooks {...args} />,
}
