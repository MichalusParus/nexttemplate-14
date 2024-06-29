import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Range, RangeProps } from './Range'

const meta: Meta<typeof Range> = {
  title: 'Molecules/Form/Range',
  component: Range,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

const RangeWithHooks = (args: RangeProps) => {
  const [value, setValue] = useState<string>()
  return <Range {...args} value={value} onChange={value => setValue(value)} />
}

export default meta
type Story = StoryObj<typeof Range>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'rangeStory',
    label: 'Label:',
    min: 0,
    max: 100,
    color: 'primary',
    size: 'md',
    collapsed: 'default',
    width: 'min-w-96',
    description: '',
    hideLabel: false,
    hideError: false,
    error: '',
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
