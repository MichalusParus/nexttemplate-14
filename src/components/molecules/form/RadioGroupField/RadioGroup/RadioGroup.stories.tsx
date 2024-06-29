import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { options } from '../../../../../../.storybook/helpers'
import { RadioGroup, RadioGroupProps } from './RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  title: 'Molecules/Form/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    options: {
      control: false,
    },
  },
}

const RadioGroupWithHooks = (args: RadioGroupProps) => {
  const [value, setValue] = useState<string>('')
  return <RadioGroup {...args} value={value} onChange={setValue} />
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'radioGroupStory',
    label: 'Label',
    options: options.slice(0, 5),
    column: false,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    width: 'w-full',
    description: '',
    hideLabel: false,
    hideError: false,
    disabled: false,
    collapsed: 'default',
    error: '',
    onChange: () => {},
  },
  render: args => <RadioGroupWithHooks {...args} />,
}

export const Column: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'radioGroupStory2',
    column: true,
  },
  render: args => <RadioGroupWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'radioGroupStory3',
    error: 'error',
  },
  render: args => <RadioGroupWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'radioGroupStory4',
    disabled: true,
  },
  render: args => <RadioGroupWithHooks {...args} />,
}
